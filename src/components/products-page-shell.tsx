"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, MessageCircle, Scale, Search, Truck } from "lucide-react";
import { Cta } from "@/components/cta";
import { useProductComparison } from "@/components/comparison-provider";
import { containerClass } from "@/components/layout-classes";
import { ProductWhatsappCta } from "@/components/product-whatsapp-cta";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header } from "@/components/site";
import { AnimatedText, SectionHead, Tag } from "@/components/site-primitives";
import { productPath } from "@/lib/product-routes";
import {
  getExpectedPriceLabel,
  getProductCardHighlights,
  isPtaApprovedProduct,
  type Product,
} from "@/data/products";
import type { SanityCategory } from "@/sanity/types";

const buyingModes = [
  {
    title: "Choose a model",
    text: "Filter by iPhone, MacBook, iPad, Apple Watch, AirPods, or PlayStation.",
    icon: Search,
  },
  {
    title: "Read the facts",
    text: "Check the condition, specifications, price, warranty, and what comes in the box.",
    icon: BadgeCheck,
  },
  {
    title: "Ask about the exact unit",
    text: "Get current photos and confirm any detail that can change from one unit to another.",
    icon: MessageCircle,
  },
  {
    title: "Inspect or receive",
    text: "Agree on inspection, pickup or delivery, payment, and written warranty terms.",
    icon: Truck,
  },
];

const allCategory = "All";
type PtaFilter = "all" | "approved" | "rest";

function normalizePtaFilter(value: string | null): PtaFilter {
  return value === "approved" || value === "rest" ? value : "all";
}

function hrefForCategory(category: string, categories: SanityCategory[]) {
  return category === allCategory
    ? "/products#product-grid"
    : `${categories.find((item) => item.category === category)?.href ?? "/products"}#product-grid`;
}

function categoryLabel(category: string, categories: SanityCategory[]) {
  return category === allCategory
    ? allCategory
    : categories.find((item) => item.category === category)?.label ?? category;
}

function categoryFromPathname(pathname: string, fallback: string, categories: SanityCategory[]) {
  if (pathname === "/products") {
    return allCategory;
  }

  const categoryRoute = categories.find((route) => pathname === route.href);

  return categoryRoute?.category ?? fallback;
}

function syncStateFromLocation(
  pathname: string,
  searchParams: URLSearchParams,
  fallbackCategory: string,
  categories: SanityCategory[],
) {
  return {
    category: categoryFromPathname(pathname, fallbackCategory, categories),
    search: searchParams.get("search") ?? "",
    ptaFilter: normalizePtaFilter(searchParams.get("pta")),
  };
}

function buildCategoryHref(
  category: string,
  categories: SanityCategory[],
  search: string,
  ptaFilter: PtaFilter,
) {
  const nextUrl = new URL(hrefForCategory(category, categories), window.location.origin);

  if (search.trim()) {
    nextUrl.searchParams.set("search", search.trim());
  }

  if (ptaFilter !== "all" && (category === allCategory || category === "iPhone")) {
    nextUrl.searchParams.set("pta", ptaFilter);
  }

  return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
}

function productsForCategory(category: string, allProducts: Product[]) {
  return category === allCategory
    ? allProducts
    : allProducts.filter((product) => product.category === category);
}

function productSearchText(product: Product) {
  return [
    product.title,
    product.shortTitle,
    product.category,
    product.summary,
    product.description,
    product.condition,
    product.status,
    getExpectedPriceLabel(product),
    ...product.details.flatMap((detail) => [detail.label, detail.value]),
    ...product.technicalSpecs.flatMap((spec) => [spec.label, spec.value]),
    ...product.listingOptions.flatMap((option) => [option.label, ...option.values]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesPtaFilter(product: Product, ptaFilter: PtaFilter) {
  if (ptaFilter === "all") {
    return true;
  }

  const isApproved = isPtaApprovedProduct(product);

  return ptaFilter === "approved" ? isApproved : !isApproved;
}

export function ProductsPageShell({
  items,
  allProducts,
  categories,
  activeCategory = allCategory,
  initialSearch = "",
}: {
  items: Product[];
  allProducts: Product[];
  categories: SanityCategory[];
  activeCategory?: string;
  initialSearch?: string;
}) {
  const { isCompared, toggleCompare } = useProductComparison();
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [ptaFilter, setPtaFilter] = useState<PtaFilter>("all");
  const isCategory = selectedCategory !== allCategory;
  const showPtaFilter = selectedCategory === allCategory || selectedCategory === "iPhone";
  const selectedCategoryLabel = categoryLabel(selectedCategory, categories);
  const productCategories = [allCategory, ...categories.map((category) => category.category)];
  const visibleItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const categoryItems =
      selectedCategory === activeCategory
        ? items
        : productsForCategory(selectedCategory, allProducts);

    return categoryItems.filter((product) => {
      const matchesSearch = !query || productSearchText(product).includes(query);

      return matchesSearch && matchesPtaFilter(product, ptaFilter);
    });
  }, [activeCategory, allProducts, items, ptaFilter, searchQuery, selectedCategory]);
  const inventoryTitle = isCategory
    ? `${selectedCategoryLabel} products in Lahore.`
    : "Available Apple and PlayStation products in Lahore.";
  const resultLabel = `${visibleItems.length} ${visibleItems.length === 1 ? "product" : "products"}`;

  useEffect(() => {
    const syncCategoryFromUrl = () => {
      const nextState = syncStateFromLocation(
        window.location.pathname,
        new URLSearchParams(window.location.search),
        activeCategory,
        categories,
      );

      setSelectedCategory(nextState.category);
      setSearchQuery(nextState.search);
      setPtaFilter(nextState.ptaFilter);
    };

    syncCategoryFromUrl();
    window.addEventListener("popstate", syncCategoryFromUrl);

    return () => {
      window.removeEventListener("popstate", syncCategoryFromUrl);
    };
  }, [activeCategory, categories]);

  const selectCategory = (category: string) => {
    const nextPtaFilter =
      category === allCategory || category === "iPhone" ? ptaFilter : "all";

    setSelectedCategory(category);

    if (nextPtaFilter !== ptaFilter) {
      setPtaFilter(nextPtaFilter);
    }

    const nextHref = buildCategoryHref(category, categories, searchQuery, nextPtaFilter);

    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextHref) {
      window.history.pushState({ category }, "", nextHref);
    }

    window.requestAnimationFrame(() => {
      document.getElementById("product-grid")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  };

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_58%,#ffffff_100%)] text-[#050b14]">
      <RevealController />
      <Header />

      <main className="pt-[50px]">
        <section className={`${containerClass} pt-32 pb-20 text-center max-sm:pt-[106px]`}>
          <div className="reveal">
            <Tag>{isCategory ? "Category stock" : "Current stock"}</Tag>
            <h1 className="page-title mx-auto mt-5 max-w-[1280px]">
              {isCategory ? (
                <>
                  Compare <AnimatedText>{selectedCategoryLabel}</AnimatedText> products before you buy.
                </>
              ) : (
                <>
                  Find the <AnimatedText>product</AnimatedText> you need. Check the facts first.
                </>
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#667085]">
              Compare models, condition, specifications, price, package contents, and warranty
              information in one place. Then ask MacVault about the exact unit before you pay.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="#inventory" icon={Search}>
                See current products
              </Cta>
              <Cta href="/why-us" icon={BadgeCheck} variant="secondary">
                How buying works
              </Cta>
            </div>
          </div>
        </section>

        <section className="border-y border-[#050b141f] bg-white">
          <h2 className="sr-only">How to buy from MacVault</h2>
          <div className={`${containerClass} grid grid-cols-4 max-[940px]:grid-cols-2 max-sm:grid-cols-1`}>
            {buyingModes.map((mode, index) => {
              const Icon = mode.icon;

              return (
                <div
                  className="reveal min-h-[142px] border-r border-[#050b141f] p-6 last:border-r-0 max-[940px]:border-b max-sm:border-r-0"
                  style={{ transitionDelay: `${index * 40}ms` }}
                  key={mode.title}
                >
                  <Icon className="mb-5 size-5 text-[#0a84ff]" strokeWidth={2} />
                  <h3 className="text-xl font-semibold">
                    <AnimatedText>{mode.title.split(" ")[0]}</AnimatedText>{mode.title.includes(" ") ? ` ${mode.title.split(" ").slice(1).join(" ")}` : ""}
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-[#667085]">{mode.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="inventory" className={`${containerClass} inventory-anchor py-[60px]`}>
          <SectionHead
            kicker="Product range"
            title={inventoryTitle}
            accent={isCategory ? selectedCategoryLabel : "available"}
            text={`${resultLabel} shown with photos, condition, specifications, price status, package details, and a direct way to ask about the exact unit.`}
          />
          <p className="sr-only" aria-live="polite">
            {`${resultLabel} shown for ${selectedCategory}.`}
          </p>

          <div className="inventory-tools reveal mb-6">
            <label className="inventory-search" htmlFor="product-search">
              <Search className="size-5 text-[#0a84ff]" strokeWidth={2} />
              <span className="sr-only">Search products</span>
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  const nextSearch = event.target.value;
                  const nextUrl = new URL(window.location.href);
                  setSearchQuery(nextSearch);

                  if (nextSearch.trim()) {
                    nextUrl.searchParams.set("search", nextSearch.trim());
                  } else {
                    nextUrl.searchParams.delete("search");
                  }

                  if (ptaFilter !== "all" && (selectedCategory === allCategory || selectedCategory === "iPhone")) {
                    nextUrl.searchParams.set("pta", ptaFilter);
                  } else {
                    nextUrl.searchParams.delete("pta");
                  }

                  window.history.replaceState(
                    window.history.state,
                    "",
                    `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`,
                  );
                }}
                placeholder="Search model, PTA, storage..."
              />
            </label>

            {showPtaFilter ? <div className="pta-filter" aria-label="PTA filter">
              {[
                { label: "All", value: "all" },
                { label: "PTA approved", value: "approved" },
                { label: "Rest", value: "rest" },
              ].map((item) => (
                <button
                  className={ptaFilter === item.value ? "is-active" : ""}
                  type="button"
                  aria-pressed={ptaFilter === item.value}
                  onClick={() => {
                    const nextPtaFilter = item.value as PtaFilter;
                    setPtaFilter(nextPtaFilter);

                    const nextHref = buildCategoryHref(
                      selectedCategory,
                      categories,
                      searchQuery,
                      nextPtaFilter,
                    );

                    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextHref) {
                      window.history.replaceState(window.history.state, "", nextHref);
                    }
                  }}
                  key={item.value}
                >
                  {item.label}
                </button>
              ))}
            </div> : null}
          </div>

          <div className="category-filter-bar reveal mb-8 flex flex-wrap justify-center gap-2" data-category-rail>
            {productCategories.map((category) => {
              const count =
                category === allCategory
                  ? allProducts.length
                  : allProducts.filter((product) => product.category === category).length;
              const isActive = category === selectedCategory;

              return (
                <Cta
                  asButton
                  className={isActive ? "category-filter-active" : ""}
                  icon={Search}
                  type="button"
                  variant={isActive ? "primary" : "secondary"}
                  count={count}
                  aria-controls="product-grid"
                  aria-pressed={isActive}
                  onClick={() => selectCategory(category)}
                  key={category}
                >
                  {categoryLabel(category, categories)}
                </Cta>
              );
            })}
          </div>

          <div className="product-list-grid" id="product-grid">
            {visibleItems.map((product) => (
              <article
                className="listing-card product-filter-card"
                key={`${selectedCategory}-${ptaFilter}-${product.slug}`}
              >
                <ProductVisual
                  accent={product.accent}
                  kind={product.gallery[0].kind}
                  label={product.shortTitle}
                  imageUrl={product.gallery[0].imageUrl}
                  imageAlt={product.gallery[0].imageAlt}
                  imageUsage={product.gallery[0].usage}
                  size="compact"
                  className="w-full"
                />

                <div className="flex grow flex-col p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <button
                      aria-label={`Show ${product.category} products`}
                      className="rounded-full bg-[#0a84ff17] px-2.5 py-1.5 text-[#0057d8] transition-colors duration-300 ease-out hover:bg-[#0a84ff] hover:text-white"
                      type="button"
                      onClick={() => selectCategory(product.category)}
                    >
                      {product.category}
                    </button>
                  </div>
                  <h3 className="text-[26px] leading-[1.08] font-semibold">
                    <AnimatedText>{product.shortTitle || product.title}</AnimatedText>
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-[1.55] text-[#667085]">
                    {product.summary}
                  </p>
                  <p className="mt-4 text-lg font-semibold text-[#102a43]">
                    {getExpectedPriceLabel(product)}
                  </p>
                  <div className="mt-5 grid gap-3">
                    <div className="flex flex-wrap gap-2" aria-label="Technical specifications">
                      {getProductCardHighlights(product).map((highlight, index) => (
                        <span className="product-property" key={`${highlight.label}-${highlight.value}-${index}`} title={highlight.label}>
                          <strong>{highlight.label}:</strong> {highlight.value}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2" aria-label="Available options">
                      {product.listingOptions.slice(0, 2).map((option) => (
                        <span className="product-option" key={option.id}>
                          <strong>{option.label}:</strong> {option.values.join(" · ")}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-start gap-2 pt-6">
                    <Cta href={productPath(product.slug)} icon={ArrowRight}>
                      View details
                    </Cta>
                    <ProductWhatsappCta
                      productName={product.title}
                      productUrl={productPath(product.slug)}
                      label="Confirm price"
                      variant="secondary"
                    />
                    <button
                      type="button"
                      onClick={() => toggleCompare(product.slug)}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-semibold transition-all ${
                        isCompared(product.slug)
                          ? "border-[#0a84ff] bg-[#0a84ff] text-white"
                          : "border-[#102a431a] bg-[#f8fafc] text-[#475467] hover:border-[#0a84ff40] hover:text-[#0057d8]"
                      }`}
                      title={isCompared(product.slug) ? "Remove from comparison" : "Add to specs comparison"}
                    >
                      <Scale className="size-3.5" />
                      <span>{isCompared(product.slug) ? "Comparing" : "Compare"}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleItems.length === 0 ? (
            <div className="rounded-[8px] bg-white p-8 text-center shadow-[inset_0_0_0_1px_rgba(5,20,44,0.10)]">
              <p className="text-lg font-semibold">There are no current products in this category.</p>
              <p className="mt-2 text-sm text-[#667085]">Try another search, adjust the PTA filter, or browse all products.</p>
              <div className="mt-5">
                <Cta
                  asButton
                  type="button"
                  icon={ArrowRight}
                  variant="secondary"
                  onClick={() => selectCategory(allCategory)}
                >
                  Back to all products
                </Cta>
              </div>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />
    </div>
  );
}
