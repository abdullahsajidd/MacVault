"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, MessageCircle, Search, Truck } from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header, SectionHead, Tag } from "@/components/site";
import {
  categoryRoutes,
  getCategorySlug,
  type Product,
  productCategories,
  products,
} from "@/data/products";

const buyingModes = [
  {
    title: "Ask first",
    text: "Message with a product page already selected.",
    icon: MessageCircle,
  },
  {
    title: "Check details",
    text: "Confirm condition, PTA, warranty, and package contents.",
    icon: Search,
  },
  {
    title: "Reserve stock",
    text: "Hold serious units for pickup or delivery.",
    icon: BadgeCheck,
  },
  {
    title: "Local handoff",
    text: "Arrange delivery, pickup, and after-sale support.",
    icon: Truck,
  },
];

const allCategory = "All";

function hrefForCategory(category: string) {
  return category === allCategory
    ? "/products#product-grid"
    : `/products/category/${getCategorySlug(category)}#product-grid`;
}

function categoryLabel(category: string) {
  return category === "Mac" ? "MacBook" : category;
}

function categoryFromPathname(pathname: string, fallback: string) {
  if (pathname === "/products") {
    return allCategory;
  }

  const categoryRoute = categoryRoutes.find((route) => pathname === route.href);

  return categoryRoute?.category ?? fallback;
}

function productsForCategory(category: string) {
  return category === allCategory
    ? products
    : products.filter((product) => product.category === category);
}

export function ProductsPageShell({
  items,
  activeCategory = allCategory,
}: {
  items: Product[];
  activeCategory?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const isCategory = selectedCategory !== allCategory;
  const selectedCategoryLabel = categoryLabel(selectedCategory);
  const visibleItems = useMemo(
    () => (selectedCategory === activeCategory ? items : productsForCategory(selectedCategory)),
    [activeCategory, items, selectedCategory],
  );
  const title = isCategory
    ? `${selectedCategoryLabel} drops with verified details before chat.`
    : "Browse drops with details before the chat.";
  const resultLabel = `${visibleItems.length} ${visibleItems.length === 1 ? "drop" : "drops"}`;

  useEffect(() => {
    const syncCategoryFromUrl = () => {
      setSelectedCategory((currentCategory) =>
        categoryFromPathname(window.location.pathname, currentCategory),
      );
    };

    window.addEventListener("popstate", syncCategoryFromUrl);

    return () => {
      window.removeEventListener("popstate", syncCategoryFromUrl);
    };
  }, []);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);

    const nextHref = hrefForCategory(category);

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
                  {selectedCategoryLabel} drops with <span className="animated-text">verified</span>{" "}
                  details.
                </>
              ) : (
                <>
                  Browse drops with <span className="animated-text">details</span> before the
                  chat.
                </>
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#667085]">
              Every product page is designed for quick local buying: condition, variant, warranty,
              package contents, and reservation context are shown before the CTA.
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
            kicker="Available drops"
            title={title}
            accent={isCategory ? "verified" : "details"}
            text={`${resultLabel} shown with gallery, condition, details, and package notes available before chat.`}
          />
          <p className="sr-only" aria-live="polite">
            {`${resultLabel} shown for ${selectedCategory}.`}
          </p>

          <div className="category-filter-bar reveal mb-8 flex flex-wrap justify-center gap-2">
            {productCategories.map((category) => {
              const count =
                category === allCategory
                  ? products.length
                  : products.filter((product) => product.category === category).length;
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
                  {categoryLabel(category)}
                </Cta>
              );
            })}
          </div>

          <div className="product-list-grid" id="product-grid">
            {visibleItems.map((product, index) => (
              <article
                className="listing-card reveal"
                style={{ transitionDelay: `${Math.min(index, 4) * 40}ms` }}
                key={product.slug}
              >
                <ProductVisual
                  accent={product.accent}
                  kind={product.gallery[0].kind}
                  label={product.shortTitle}
                  imageUrl={product.gallery[0].imageUrl}
                  imageAlt={product.gallery[0].imageAlt}
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
                      {categoryLabel(product.category)}
                    </button>
                    <span className="rounded-full bg-[#23c87918] px-2.5 py-1.5 text-[#14773d]">
                      {product.status}
                    </span>
                  </div>
                  <h3 className="text-[26px] leading-[1.08] font-semibold">{product.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-[#667085]">
                    {product.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.specs.slice(0, 3).map((spec) => (
                      <span
                        className="rounded-full border border-[#050b1414] bg-[#f5f5f7] px-3 py-1.5 text-xs font-medium text-[#667085]"
                        key={spec}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6">
                    <p className="mb-3 text-sm font-semibold text-[#050b14]">{product.price}</p>
                    <Cta href={`/products/${product.slug}`} icon={ArrowRight}>
                      View details
                    </Cta>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {visibleItems.length === 0 ? (
            <div className="reveal rounded-[8px] bg-white p-8 text-center shadow-[inset_0_0_0_1px_rgba(5,20,44,0.10)]">
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

export { categoryRoutes };
