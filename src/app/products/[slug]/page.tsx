import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, PackageCheck, ShieldCheck } from "lucide-react";
import { Cta } from "@/components/cta";
import { JsonLd } from "@/components/json-ld";
import { containerClass } from "@/components/layout-classes";
import { ProductSlider } from "@/components/product-slider";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header, Tag } from "@/components/site";
import { createWhatsappHref } from "@/data/contact";
import { getProductBadge } from "@/data/products";
import { buildMetadata, metadataBase } from "@/lib/seo";
import {
  findCategoryByName,
  getCategories,
  getProduct,
  getProducts,
  getPublishedProductSlugs,
} from "@/sanity/lib/catalog";
import type { SanityCategory } from "@/sanity/types";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function categoryLabel(categories: SanityCategory[], category: string) {
  return findCategoryByName(categories, category)?.label ?? category;
}

function schemaAvailability(status: string) {
  if (status === "Sold" || status === "Reserved") {
    return "https://schema.org/OutOfStock";
  }

  if (status === "Arriving soon") {
    return "https://schema.org/PreOrder";
  }

  return "https://schema.org/InStock";
}

function schemaCondition(condition: string) {
  const normalized = condition.toLowerCase();

  if (normalized.includes("used")) {
    return "https://schema.org/UsedCondition";
  }

  if (normalized.includes("refurbished")) {
    return "https://schema.org/RefurbishedCondition";
  }

  return "https://schema.org/NewCondition";
}

function numericPrice(price?: string) {
  if (!price) {
    return null;
  }

  const value = Number(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export async function generateStaticParams() {
  return getPublishedProductSlugs();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return buildMetadata({
      title: "Product not found",
      description: "The requested MacVault product could not be found.",
      path: `/products/${slug}`,
      robots: { index: false, follow: true },
    });
  }

  const productImage = product.gallery[0]?.imageUrl;

  return buildMetadata({
    title: `${product.title} in Lahore`,
    description: `Shop ${product.title} in Lahore. Check current stock, price, condition, specifications, included items, warranty, and exact unit details with MacVault.`,
    path: `/products/${product.slug}`,
    images: productImage
      ? [
          {
            url: productImage,
            alt: product.title,
          },
        ]
      : undefined,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, products, categories] = await Promise.all([
    getProduct(slug),
    getProducts(),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .concat(products.filter((item) => item.category !== product.category))
    .slice(0, 3);
  const whatsappHref = createWhatsappHref(
    `Hi MacVault, I want to ask about ${product.title}. Please share today’s price, exact condition, current photos, warranty, and included items.`,
  );
  const productCategory = findCategoryByName(categories, product.category);
  const productUrl = new URL(`/products/${product.slug}`, metadataBase).toString();
  const price = numericPrice(product.price);
  const itemCondition = schemaCondition(product.condition);
  const availability = schemaAvailability(product.status);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.title,
    description: product.description,
    image: product.gallery.map((item) => item.imageUrl),
    sku: product.slug,
    category: categoryLabel(categories, product.category),
    brand: {
      "@type": "Brand",
      name: product.category === "PlayStation" ? "Sony" : "Apple",
    },
    itemCondition,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "PKR",
            price,
            availability,
            itemCondition,
            seller: { "@id": new URL("/#organization", metadataBase).toString() },
          },
        }
      : {}),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: new URL("/products", metadataBase).toString(),
      },
      ...(productCategory
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: productCategory.label,
              item: new URL(productCategory.href, metadataBase).toString(),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: productCategory ? 3 : 2,
        name: product.title,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_62%,#ffffff_100%)] text-[#050b14]">
      <JsonLd data={price ? [productSchema, breadcrumbSchema] : breadcrumbSchema} />
      <RevealController />
      <Header />

      <main className="pt-[50px]">
        <section className={`${containerClass} pt-32 pb-[92px] max-sm:pt-[106px]`}>
          <Link
            className="reveal mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#667085] transition-colors hover:text-[#0a84ff]"
            href="/products"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Back to products
          </Link>

          <div className="grid grid-cols-[1.05fr_0.95fr] gap-[58px] max-[1020px]:grid-cols-1">
            <div className="max-[1020px]:order-2">
              <ProductSlider
                gallery={product.gallery}
                accent={product.accent}
                title={product.title}
              />
            </div>

            <div className="reveal self-start max-[1020px]:order-1">
              <Tag>{getProductBadge(product.category)}</Tag>
              <h1 className="mt-4 text-[clamp(42px,7vw,78px)] leading-[0.98] font-semibold tracking-normal">
                {product.title} in Lahore
              </h1>
              <p className="mt-5 text-[18px] leading-[1.58] text-[#667085]">{product.description}</p>

              <div id="reserve" className="reserve-card mt-7 rounded-lg border border-[#050b141f] bg-white p-5 shadow-[0_18px_54px_rgba(5,20,44,0.06)]">
                <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#667085] uppercase">Current price</p>
                    <p className="mt-1 text-2xl font-semibold text-[#050b14]">{product.price ?? "Ask for today’s price"}</p>
                    <p className="mt-2 text-sm leading-normal text-[#667085]">
                      Before payment, ask for current photos and confirm the exact condition,
                      warranty, included items, and availability.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#23c87918] px-3 py-1.5 text-xs font-semibold text-[#14773d]">
                    {product.status}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap justify-start gap-3">
                  <Cta href={whatsappHref}>Ask about this product</Cta>
                  <Cta href="/why-us" variant="secondary">How buying works</Cta>
                </div>
              </div>

              <div className="mt-7 border-y border-[#050b141f]">
                {product.details.map((detail) => (
                  <div
                    className="grid grid-cols-[140px_1fr] gap-4 border-b border-[#050b141f] py-4 last:border-b-0 max-sm:grid-cols-1"
                    key={detail.label}
                  >
                    <span className="text-sm font-semibold text-[#667085]">{detail.label}</span>
                    <strong className="text-base font-semibold text-[#050b14]">{detail.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#050b141f] bg-white py-[60px]">
          <div className={`${containerClass} grid grid-cols-[0.8fr_1.2fr] gap-[56px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>Product facts</Tag>
              <h2 className="section-title mt-2">
                Check the details that affect your decision.
              </h2>
              <p className="mt-[18px] max-w-xl text-[17px] leading-[1.56] text-[#667085]">
                Start with the model specifications and listed options. Then confirm anything that
                can change from one unit to another, including condition, battery, warranty, and box contents.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <div className="reveal border-t border-[#050b141f] pt-5">
                <h3 className="text-2xl font-semibold">Model specifications</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.technicalSpecs.map((spec) => (
                    <span className="product-property" key={spec.id}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reveal border-t border-[#050b141f] pt-5 delay-75">
                <h3 className="text-2xl font-semibold">Options shown</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.listingOptions.map((option) => (
                    <span className="product-option" key={option.id}>
                      <strong>{option.label}:</strong> {option.values.join(" · ")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reveal border-t border-[#050b141f] pt-5">
                <BadgeCheck className="mb-5 size-6 text-[#0a84ff]" strokeWidth={2} />
                <h3 className="text-2xl font-semibold">Why it may suit you</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-normal text-[#667085]">
                  {product.highlights.map((highlight) => (
                    <li className="flex gap-3" key={highlight}>
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0a84ff]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal border-t border-[#050b141f] pt-5 delay-100">
                <PackageCheck className="mb-5 size-6 text-[#0a84ff]" strokeWidth={2} />
                <h3 className="text-2xl font-semibold">What to check in the box</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-normal text-[#667085]">
                  {product.packageItems.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0a84ff]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${containerClass} py-[60px]`}>
          <div className="reveal mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
            <div>
              <Tag>Compare other products</Tag>
              <h2 className="section-title mt-2">
                Check another option before you decide.
              </h2>
            </div>
            <Cta href="/products" variant="secondary">All products</Cta>
          </div>

          <div className="grid grid-cols-3 gap-[18px] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
            {related.map((item, index) => (
              <article
                className="reveal overflow-hidden rounded-lg border border-[#050b141f] bg-white transition hover:-translate-y-1 hover:border-[#0a84ff52]"
                style={{ transitionDelay: `${index * 100}ms` }}
                key={item.slug}
              >
                <ProductVisual
                  accent={item.accent}
                  kind={item.gallery[0].kind}
                  label={item.shortTitle}
                  imageUrl={item.gallery[0].imageUrl}
                  imageAlt={item.gallery[0].imageAlt}
                  imageUsage={item.gallery[0].usage}
                  size="compact"
                />
                <div className="p-[22px]">
                  <Link
                    className="text-xs font-semibold text-[#0a84ff] transition-colors duration-300 ease-out hover:text-[#0057d8]"
                    href={`${findCategoryByName(categories, item.category)?.href ?? "/products"}#product-grid`}
                  >
                    {categoryLabel(categories, item.category)}
                  </Link>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-normal text-[#667085]">{item.summary}</p>
                  <div className="mt-5 flex justify-start"><Cta href={`/products/${item.slug}`} variant="secondary">View product</Cta></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#0a84ff14] bg-[#f4f9ff] py-[60px] text-[#102a43]">
          <div className={`${containerClass} grid grid-cols-[0.9fr_1.1fr] gap-[54px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>Before you pay</Tag>
              <h2 className="section-title mt-2">
                Make sure the exact unit matches the page.
              </h2>
            </div>
            <div className="reveal border-t border-[#102a431a] pt-6">
              <ShieldCheck className="mb-5 size-7 text-[#0a84ff]" strokeWidth={2} />
              <p className="text-[20px] leading-[1.55] text-[#667085]">
                Compare the final price, condition, PTA status where relevant, battery or cycle
                details, warranty, and included items with the exact unit. If anything is different,
                ask before you pay.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
