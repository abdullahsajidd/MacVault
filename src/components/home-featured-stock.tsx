import { ArrowRight, Gamepad2, Headphones, Laptop, PackageSearch, Search, Smartphone, Tablet, Watch as WatchIcon, type LucideIcon } from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { ProductVisual } from "@/components/product-visual";
import { ProductWhatsappCta } from "@/components/product-whatsapp-cta";
import { AnimatedText, SectionHead } from "@/components/site-primitives";
import { getExpectedPriceLabel, getProductCardHighlights, getProductStockLabel, getProductStockTone, type Product } from "@/data/products";
import { productPath } from "@/lib/product-routes";
import type { SanityCategory } from "@/sanity/types";

const categoryIcons: Record<string, LucideIcon> = { iPhone: Smartphone, Mac: Laptop, iPad: Tablet, Watch: WatchIcon, Accessories: Headphones, PlayStation: Gamepad2 };

export function HomeFeaturedStock({ products, categories }: { products: Product[]; categories: SanityCategory[] }) {
  const allCategory = "All";
  const categoryItems = [{ _id: "all-products", category: allCategory, label: allCategory, href: "/products", icon: PackageSearch }, ...categories.map((category) => ({ ...category, icon: categoryIcons[category.category] ?? PackageSearch }))];
  if (categoryItems.length === 0) return null;

  return (
    <section id="inventory" className={`${containerClass} inventory-anchor py-[60px]`}>
      <SectionHead kicker="Browse stock" title="Apple and PlayStation products in Lahore" accent="Apple and PlayStation" text="Compare current products by model, condition, specifications, and availability. Open a product to see the facts that matter before you contact us." />
      <div className="category-filter-bar mb-8 flex flex-wrap justify-center gap-3" data-category-rail aria-label="Homepage product categories">
        {categoryItems.map((category) => { const Icon = category.icon; const count = category.category === allCategory ? products.length : products.filter((product) => product.category === category.category).length; return <Cta className={category.category === allCategory ? "" : "button-secondary"} href={`${category.href}${category.category === allCategory ? "#inventory" : "#product-grid"}`} icon={Icon} count={count} aria-current={category.category === allCategory ? "page" : undefined} key={category.category}>{category.label}</Cta>; })}
      </div>
      <div className="product-list-grid home-featured-grid">
        {products.map((product) => <article className="listing-card" key={product.slug}><ProductVisual accent={product.accent} kind={product.gallery[0].kind} label={product.shortTitle} imageUrl={product.gallery[0].imageUrl} imageAlt={product.gallery[0].imageAlt} imageUsage={product.gallery[0].usage} size="compact" className="w-full" /><div className="flex grow flex-col p-5"><div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold"><span className="rounded-full bg-[#0a84ff17] px-2.5 py-1.5 text-[#0057d8]">{product.category === "Mac" ? "MacBook" : product.category}</span><span className={`stock-pill stock-pill-${getProductStockTone(product)}`}>{getProductStockLabel(product)}</span></div><h3 className="text-[25px] leading-[1.08] font-semibold"><AnimatedText>{product.title}</AnimatedText></h3><p className="mt-3 line-clamp-2 text-[15px] leading-[1.55] text-[#667085]">{product.summary}</p><p className="mt-4 text-lg font-semibold text-[#102a43]">{getExpectedPriceLabel(product)}</p><div className="mt-4 flex flex-wrap gap-2" aria-label="Product highlights">{getProductCardHighlights(product).map((highlight, index) => <span className="product-property" key={`${highlight.label}-${highlight.value}-${index}`}><strong>{highlight.label}:</strong> {highlight.value}</span>)}</div><div className="mt-auto flex flex-wrap justify-start gap-2 pt-6"><Cta href={productPath(product.slug)} icon={ArrowRight}>View more</Cta><ProductWhatsappCta productName={product.title} productUrl={productPath(product.slug)} variant="secondary" /></div></div></article>)}
      </div>
      <div className="reveal mt-8 text-center"><Cta href="/products#inventory" variant="secondary" icon={Search}>Open full products page</Cta></div>
    </section>
  );
}
