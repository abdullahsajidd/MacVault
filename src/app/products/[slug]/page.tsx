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
import { Footer, Header } from "@/components/site";
import { AnimatedText, Tag } from "@/components/site-primitives";
import { createWhatsappHref } from "@/data/contact";
import {
  getExpectedPriceLabel,
  getExpectedPriceRange,
  getProductBadge,
  getProductStockLabel,
  getProductStockTone,
  getProductTemplate,
} from "@/data/products";
import type { Product, ProductProperty, ProductUnitDetails } from "@/data/products";
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

function schemaAvailability(status?: string) {
  const stockLabel = getProductStockLabel({ status });

  if (stockLabel === "Sold" || stockLabel === "Reserved") {
    return "https://schema.org/OutOfStock";
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

const modelSpecLabelsByCategory: Record<string, string[]> = {
  iPhone: ["Display", "Chipset", "Cameras", "Charging port"],
  Mac: ["Processor", "Chipset", "Display", "Ports", "Charging"],
  iPad: ["Chipset", "Display", "Camera", "Cameras", "Port", "Connectivity", "Input"],
  Watch: ["Chipset", "Display", "Water"],
  Accessories: ["Chipset", "Audio", "Controls", "Water", "Design"],
  Cables: ["Connector", "Data", "Power", "Compatibility"],
  PlayStation: ["Output"],
};

const boxRelevantCategories = new Set(["iPhone", "iPad", "Watch", "Accessories", "PlayStation", "Cables"]);

function displayModelSpecs(product: Product): ProductProperty[] {
  const modelSpecs = product.model?.specs?.length ? product.model.specs : product.technicalSpecs;
  const allowed = new Set((modelSpecLabelsByCategory[product.category] ?? []).map((item) => item.toLowerCase()));

  if (!allowed.size) {
    return modelSpecs;
  }

  return modelSpecs.filter((spec) => allowed.has(spec.label.toLowerCase()));
}

function yesNo(value: boolean) {
  return value ? "Yes" : "No";
}

function unitDetailRows(product: Product) {
  const details = product.unitDetails as ProductUnitDetails | undefined;
  const rows: { label: string; value: string }[] = [];

  if (!details) {
    return boxRelevantCategories.has(product.category)
      ? [{ label: "Box", value: "Confirm on WhatsApp" }]
      : rows;
  }

  if (details.storage) rows.push({ label: "Storage", value: details.storage });
  if (details.ram) rows.push({ label: "RAM", value: details.ram });
  if (details.colour) rows.push({ label: "Colour", value: details.colour });
  if (details.batteryHealth != null) rows.push({ label: "Battery health", value: `${details.batteryHealth}%` });
  if (details.batteryCycleCount != null) rows.push({ label: "Battery cycle count", value: String(details.batteryCycleCount) });
  if (details.ptaStatus) rows.push({ label: "PTA status", value: details.ptaStatus });

  if (details.boxStatus) {
    rows.push({ label: "Box", value: details.boxStatus });
  } else if (boxRelevantCategories.has(product.category)) {
    rows.push({ label: "Box", value: "Confirm on WhatsApp" });
  }

  if (details.warranty) rows.push({ label: "Warranty", value: details.warranty });
  if (details.keyboardLayout) rows.push({ label: "Keyboard layout", value: details.keyboardLayout });
  if (details.chargerIncluded != null) rows.push({ label: "Charger included", value: yesNo(details.chargerIncluded) });
  if (details.connectivity) rows.push({ label: "Connectivity", value: details.connectivity });
  if (details.size) rows.push({ label: "Size", value: details.size });
  if (details.edition) rows.push({ label: "Edition", value: details.edition });
  if (details.controllerIncluded != null) rows.push({ label: "Controller included", value: yesNo(details.controllerIncluded) });
  if (details.gamesIncluded?.length) rows.push({ label: "Games included", value: details.gamesIncluded.join(" · ") });
  if (details.connector) rows.push({ label: "Connector", value: details.connector });
  if (details.cableLength) rows.push({ label: "Cable length", value: details.cableLength });
  if (details.serialStatus) rows.push({ label: "Serial status", value: details.serialStatus });
  if (details.includedItems?.length) rows.push({ label: "Included items", value: details.includedItems.join(" · ") });
  if (details.notes) rows.push({ label: "Notes", value: details.notes });

  return rows;
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
    title: product.title,
    description: `Shop ${product.title}. Check current stock, price, condition, specifications, included items, warranty, and exact unit details with MacVault.`,
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
    `Hi MacVault, I want to confirm today’s price for ${product.title}. Please share the final price range, exact condition, current photos, warranty, and included items.`,
  );
  const productCategory = findCategoryByName(categories, product.category);
  const productUrl = new URL(`/products/${product.slug}`, metadataBase).toString();
  const priceRange = getExpectedPriceRange(product.price);
  const expectedPriceLabel = getExpectedPriceLabel(product);
  const stockLabel = getProductStockLabel(product);
  const productTemplate = getProductTemplate(product);
  const modelSpecs = displayModelSpecs(product);
  const productDetailRows = unitDetailRows(product);
  const itemCondition = schemaCondition(product.condition);
  const availability = schemaAvailability(product.status);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.title,
    description: product.description,
    url: productUrl,
    image: product.gallery.map((item) => item.imageUrl),
    sku: product.slug,
    category: categoryLabel(categories, product.category),
    brand: {
      "@type": "Brand",
      name: product.category === "PlayStation" ? "Sony" : "Apple",
    },
    itemCondition,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Availability",
        value: stockLabel,
      },
      {
        "@type": "PropertyValue",
        name: "Expected price",
        value: expectedPriceLabel,
      },
    ],
    ...(priceRange
      ? {
          offers: {
            "@type": "AggregateOffer",
            url: productUrl,
            priceCurrency: "PKR",
            lowPrice: priceRange.min,
            highPrice: priceRange.max,
            offerCount: 1,
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
      <JsonLd data={[productSchema, breadcrumbSchema]} />
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

          <div className="grid grid-cols-[1.05fr_0.95fr] gap-[58px] max-[1120px]:grid-cols-1">
            <div className="max-[1120px]:order-2">
              <ProductSlider
                gallery={product.gallery}
                accent={product.accent}
                title={product.title}
              />
            </div>

            <div className="reveal self-start max-[1120px]:order-1">
              <Tag>{getProductBadge(product.category)}</Tag>
              <h1 className="page-title mt-4">
                <AnimatedText>{product.title.split(" ")[0]}</AnimatedText>{product.title.includes(" ") ? ` ${product.title.split(" ").slice(1).join(" ")}` : ""}
              </h1>
              <p className="mt-5 text-[18px] leading-[1.58] text-[#667085]">{product.description}</p>

              <div id="reserve" className="reserve-card mt-7 rounded-lg border border-[#050b141f] bg-white p-5 shadow-[0_18px_54px_rgba(5,20,44,0.06)]">
                <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-[#667085] uppercase">Expected price</p>
                    <p className="mt-1 text-2xl font-semibold text-[#050b14]">{expectedPriceLabel}</p>
                    <p className="mt-2 text-sm leading-normal text-[#667085]">
                      Before payment, confirm today&apos;s final price, current photos, exact condition,
                      warranty, included items, and availability.
                    </p>
                  </div>
                  <span className={`stock-pill stock-pill-${getProductStockTone(product)}`}>
                    {stockLabel}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap justify-start gap-3">
                  <Cta href={whatsappHref}>Confirm today&apos;s price</Cta>
                  <Cta href="/why-us" variant="secondary">How buying works</Cta>
                </div>
              </div>

              <div className="mt-7 border-y border-[#050b141f]">
                {product.details.map((detail, index) => (
                  <div
                    className="grid grid-cols-[140px_1fr] gap-4 border-b border-[#050b141f] py-4 last:border-b-0 max-sm:grid-cols-1"
                    key={`${detail.label}-${detail.value}-${index}`}
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
                Check the <AnimatedText>details</AnimatedText> that affect your decision.
              </h2>
              <p className="mt-[18px] max-w-xl text-[17px] leading-[1.56] text-[#667085]">
                Start with the model specifications and listed options. Then confirm anything that
                can change from one unit to another, including condition, battery, warranty, and box contents.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <div className="reveal col-span-2 rounded-lg border border-[#0a84ff24] bg-[#f4f9ff] p-6 max-sm:col-span-1">
                <h3 className="text-2xl font-semibold">
                  <AnimatedText>{productTemplate.title.split(" ")[0]}</AnimatedText>{productTemplate.title.includes(" ") ? ` ${productTemplate.title.split(" ").slice(1).join(" ")}` : ""}
                </h3>
                <p className="mt-2 text-[15px] leading-normal text-[#667085]">{productTemplate.text}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                  {productTemplate.fields.map((field, index) => (
                    <div className="rounded-[8px] bg-white p-4 shadow-[inset_0_0_0_1px_rgba(5,20,44,0.08)]" key={`${field.label}-${index}`}>
                      <p className="text-xs font-semibold tracking-[0.1em] text-[#667085] uppercase">{field.label}</p>
                      <p className="mt-1 text-sm leading-normal font-semibold text-[#102a43]">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal border-t border-[#050b141f] pt-5">
                <h3 className="text-2xl font-semibold"><AnimatedText>Model</AnimatedText> specifications</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {modelSpecs.map((spec) => (
                    <span className="product-property" key={spec.id}>
                      <strong>{spec.label}:</strong> {spec.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="reveal border-t border-[#050b141f] pt-5 delay-75">
                <h3 className="text-2xl font-semibold"><AnimatedText>Product</AnimatedText> details</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {productDetailRows.length ? (
                    productDetailRows.map((detail) => (
                      <span className="product-option" key={`${detail.label}-${detail.value}`}>
                        <strong>{detail.label}:</strong> {detail.value}
                      </span>
                    ))
                  ) : (
                    <span className="product-option">
                      <strong>Exact details:</strong> Confirm on WhatsApp
                    </span>
                  )}
                </div>
              </div>

              <div className="reveal border-t border-[#050b141f] pt-5">
                <BadgeCheck className="mb-5 size-6 text-[#0a84ff]" strokeWidth={2} />
                <h3 className="text-2xl font-semibold"><AnimatedText>Why</AnimatedText> it may suit you</h3>
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
                <h3 className="text-2xl font-semibold"><AnimatedText>What</AnimatedText> to confirm before payment</h3>
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
              <Tag>Compare options</Tag>
              <h2 className="section-title mt-2">
                Check another <AnimatedText>option</AnimatedText> before you decide.
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
                  <h3 className="mt-2 text-2xl font-semibold">
                    <AnimatedText>{item.title.split(" ")[0]}</AnimatedText>{item.title.includes(" ") ? ` ${item.title.split(" ").slice(1).join(" ")}` : ""}
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-[#667085]">{item.summary}</p>
                  <p className="mt-4 text-base font-semibold text-[#102a43]">{getExpectedPriceLabel(item)}</p>
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
                Make sure the <AnimatedText>exact</AnimatedText> unit matches the page.
              </h2>
            </div>
            <div className="reveal border-t border-[#102a431a] pt-6">
              <ShieldCheck className="mb-5 size-7 text-[#0a84ff]" strokeWidth={2} />
              <p className="text-[20px] leading-[1.55] text-[#667085]">
                Compare the confirmed price, condition, PTA status where relevant, battery or cycle
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
