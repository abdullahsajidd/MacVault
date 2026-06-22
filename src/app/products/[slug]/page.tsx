import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";
import { ProductSlider } from "@/components/product-slider";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Cta, Footer, Header, Tag, containerClass } from "@/components/site";
import { getProduct, products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Product not found | MacVault",
    };
  }

  return {
    title: `${product.title} | MacVault`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .concat(products.filter((item) => item.category !== product.category))
    .slice(0, 3);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `Hi MacVault, I want to check availability for ${product.title}.`,
  )}`;

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_62%,#ffffff_100%)] text-[#07111f]">
      <RevealController />
      <Header />

      <main>
        <section className={`${containerClass} pt-28 pb-[92px] max-sm:pt-[92px]`}>
          <Link
            className="reveal mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#687386] transition-colors hover:text-[#007aff]"
            href="/products"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Back to products
          </Link>

          <div className="grid grid-cols-[1.05fr_0.95fr] gap-[58px] max-[1020px]:grid-cols-1">
            <ProductSlider gallery={product.gallery} accent={product.accent} title={product.title} />

            <div className="reveal self-start">
              <Tag>{product.badge}</Tag>
              <h1 className="mt-4 text-[clamp(42px,7vw,78px)] leading-[0.98] font-semibold tracking-normal">
                {product.title}
              </h1>
              <p className="mt-5 text-[18px] leading-[1.58] text-[#687386]">{product.description}</p>

              <div className="mt-8 border-y border-[#07111f1f]">
                {product.details.map((detail) => (
                  <div
                    className="grid grid-cols-[140px_1fr] gap-4 border-b border-[#07111f1f] py-4 last:border-b-0 max-sm:grid-cols-1"
                    key={detail.label}
                  >
                    <span className="text-sm font-semibold text-[#687386]">{detail.label}</span>
                    <strong className="text-base font-semibold text-[#07111f]">{detail.value}</strong>
                  </div>
                ))}
              </div>

              <div id="reserve" className="mt-8 rounded-lg border border-[#07111f1f] bg-white p-5">
                <div className="flex items-start justify-between gap-4 max-sm:flex-col">
                  <div>
                    <p className="text-xs font-semibold text-[#687386]">Price</p>
                    <p className="mt-1 text-2xl font-semibold text-[#07111f]">{product.price}</p>
                    <p className="mt-2 text-sm leading-normal text-[#687386]">
                      Current market price and exact unit details are confirmed before reservation.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#23c87918] px-3 py-1.5 text-xs font-semibold text-[#14773d]">
                    {product.status}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#007aff] bg-[#007aff] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    href={whatsappHref}
                  >
                    <MessageCircle className="size-4" strokeWidth={2} />
                    Ask on WhatsApp
                  </a>
                  <Cta href="/why-buy-from-us" variant="secondary">
                    Why buy from us
                  </Cta>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#07111f1f] bg-white py-[86px]">
          <div className={`${containerClass} grid grid-cols-[0.8fr_1.2fr] gap-[56px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>PRODUCT DETAILS</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Everything important before you reserve.
              </h2>
              <p className="mt-[18px] max-w-xl text-[17px] leading-[1.56] text-[#687386]">
                The page is structured to answer the questions buyers usually repeat in chat.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
              <div className="reveal border-t border-[#07111f1f] pt-5">
                <BadgeCheck className="mb-5 size-6 text-[#007aff]" strokeWidth={2} />
                <h3 className="text-2xl font-semibold">Highlights</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-normal text-[#687386]">
                  {product.highlights.map((highlight) => (
                    <li className="flex gap-3" key={highlight}>
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#007aff]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="reveal border-t border-[#07111f1f] pt-5 delay-100">
                <PackageCheck className="mb-5 size-6 text-[#007aff]" strokeWidth={2} />
                <h3 className="text-2xl font-semibold">Package</h3>
                <ul className="mt-5 space-y-3 text-[15px] leading-normal text-[#687386]">
                  {product.packageItems.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#007aff]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${containerClass} py-[92px]`}>
          <div className="reveal mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
            <div>
              <Tag>RELATED DROPS</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,58px)] leading-none font-semibold tracking-normal">
                Keep comparing before you message.
              </h2>
            </div>
            <Cta href="/products" variant="secondary">
              All products
            </Cta>
          </div>

          <div className="grid grid-cols-3 gap-[18px] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
            {related.map((item, index) => (
              <article
                className="reveal overflow-hidden rounded-lg border border-[#07111f1f] bg-white transition hover:-translate-y-1 hover:border-[#007aff52]"
                style={{ transitionDelay: `${index * 100}ms` }}
                key={item.slug}
              >
                <ProductVisual
                  accent={item.accent}
                  kind={item.gallery[0].kind}
                  label={item.shortTitle}
                  size="compact"
                />
                <div className="p-[22px]">
                  <span className="text-xs font-semibold text-[#007aff]">{item.category}</span>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-normal text-[#687386]">{item.summary}</p>
                  <Link
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#007aff]"
                    href={`/products/${item.slug}`}
                  >
                    View product <ArrowRight className="size-4" strokeWidth={2} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#07111f] py-[86px] text-white">
          <div className={`${containerClass} grid grid-cols-[0.9fr_1.1fr] gap-[54px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>CONFIDENCE CHECK</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Buy with the details in front of you.
              </h2>
            </div>
            <div className="reveal border-t border-white/20 pt-6">
              <ShieldCheck className="mb-5 size-7 text-[#75baff]" strokeWidth={2} />
              <p className="text-[20px] leading-[1.55] text-white/75">
                MacVault pages are built to reduce uncertainty: condition, price timing, warranty
                expectations, and package contents are checked before a buyer commits.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
