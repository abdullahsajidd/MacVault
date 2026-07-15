"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, MessageCircle, Search, Truck } from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header, SectionHead, Tag } from "@/components/site";
import { createWhatsappHref } from "@/data/contact";
import { getProductBadge, type Product } from "@/data/products";
import type { SanityCategory } from "@/sanity/types";

const buyingModes = [
  {
    title: "Browse clearly",
    text: "Open a listing with its key condition and specification notes.",
    icon: Search,
  },
  {
    title: "Check details",
    text: "Review options, PTA, warranty, and expected package contents.",
    icon: BadgeCheck,
  },
  {
    title: "Confirm the unit",
    text: "Message MacVault for exact stock, price, and unit-specific details.",
    icon: MessageCircle,
  },
  {
    title: "Local handoff",
    text: "Agree the pickup, delivery, inspection, and payment steps.",
    icon: Truck,
  },
];

const allCategory = "All";

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

function productsForCategory(category: string, allProducts: Product[]) {
  return category === allCategory
    ? allProducts
    : allProducts.filter((product) => product.category === category);
}

export function ProductsPageShell({
  items,
  allProducts,
  categories,
  activeCategory = allCategory,
}: {
  items: Product[];
  allProducts: Product[];
  categories: SanityCategory[];
  activeCategory?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const isCategory = selectedCategory !== allCategory;
  const selectedCategoryLabel = categoryLabel(selectedCategory, categories);
  const productCategories = [allCategory, ...categories.map((category) => category.category)];
  const visibleItems = useMemo(
    () =>
      selectedCategory === activeCategory
        ? items
        : productsForCategory(selectedCategory, allProducts),
    [activeCategory, allProducts, items, selectedCategory],
  );
  const inventoryTitle = isCategory
    ? `Current ${selectedCategoryLabel} listings.`
    : "What’s available right now.";
  const resultLabel = `${visibleItems.length} ${visibleItems.length === 1 ? "listing" : "listings"}`;

  useEffect(() => {
    const syncCategoryFromUrl = () => {
      setSelectedCategory((currentCategory) =>
        categoryFromPathname(window.location.pathname, currentCategory, categories),
      );
    };

    window.addEventListener("popstate", syncCategoryFromUrl);

    return () => {
      window.removeEventListener("popstate", syncCategoryFromUrl);
    };
  }, [categories]);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);

    const nextHref = hrefForCategory(category, categories);

    if (`${window.location.pathname}${window.location.hash}` !== nextHref) {
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
            <Tag>{isCategory ? `${selectedCategoryLabel} products` : "MacVault products"}</Tag>
            <h1 className="mx-auto mt-5 max-w-[920px] text-[clamp(48px,8vw,96px)] leading-[0.96] font-semibold tracking-normal">
              {isCategory ? (
                <>
                  {selectedCategoryLabel} listings with <span className="animated-text">verified</span>{" "}
                  details.
                </>
              ) : (
                <>
                  Browse products with <span className="animated-text">details</span> before the
                  chat.
                </>
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#667085]">
              Each listing covers condition, variant, warranty, package contents, and reservation
              context, then lets you confirm the exact unit directly.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="#inventory" icon={Search}>
                View inventory
              </Cta>
              <Cta href="/why-us" icon={BadgeCheck} variant="secondary">
                Why Us
              </Cta>
            </div>
          </div>
        </section>

        <section className="border-y border-[#050b141f] bg-white">
          <h2 className="sr-only">How buying from MacVault works</h2>
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
                  <h3 className="text-xl font-semibold">{mode.title}</h3>
                  <p className="mt-2 text-sm leading-normal text-[#667085]">{mode.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="inventory" className={`${containerClass} inventory-anchor py-[60px]`}>
          <SectionHead
            kicker="Available listings"
            title={inventoryTitle}
            accent={isCategory ? selectedCategoryLabel : "available"}
            text={`${resultLabel} shown with gallery, condition, details, and package notes available before chat.`}
          />
          <p className="sr-only" aria-live="polite">
            {`${resultLabel} shown for ${selectedCategory}.`}
          </p>

          <div className="category-filter-bar reveal mb-8 flex flex-wrap justify-center gap-2">
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
                className="listing-card"
                key={product.slug}
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
                      {getProductBadge(product.category)}
                    </button>
                    <span className="rounded-full bg-[#23c87918] px-2.5 py-1.5 text-[#14773d]">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-[26px] leading-[1.08] font-semibold">{product.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#667085]">
                    {product.summary}
                  </p>
                  <div className="mt-5 grid gap-3">
                    <div className="flex flex-wrap gap-2" aria-label="Technical specifications">
                      {product.technicalSpecs.slice(0, 3).map((spec) => (
                        <span className="product-property" key={spec.id} title={spec.label}>
                          <strong>{spec.label}:</strong> {spec.value}
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
                  <div className="mt-auto flex flex-wrap justify-start gap-2 pt-6">
                    <Cta href={`/products/${product.slug}`} icon={ArrowRight}>
                      View more
                    </Cta>
                    <Cta
                      href={createWhatsappHref(`Hi MacVault, I want to check ${product.title}.`)}
                      icon={MessageCircle}
                      variant="secondary"
                    >
                      Chat now
                    </Cta>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleItems.length === 0 ? (
            <div className="rounded-[8px] bg-white p-8 text-center shadow-[inset_0_0_0_1px_rgba(5,20,44,0.10)]">
              <p className="text-lg font-semibold">No products are available in this category yet.</p>
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
