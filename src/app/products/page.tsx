import type { Metadata } from "next";
import { ArrowRight, BadgeCheck, MessageCircle, Search, Truck } from "lucide-react";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Cta, Footer, Header, SectionHead, Tag, containerClass } from "@/components/site";
import { productCategories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products | MacVault",
  description:
    "Browse MacVault iPhone, Mac, iPad, Apple Watch, accessories, and PS5 product drops with clear condition and reservation details.",
};

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

export default function ProductsPage() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_58%,#ffffff_100%)] text-[#050b14]">
      <RevealController />
      <Header />

      <main>
        <section className={`${containerClass} pt-28 pb-20 text-center max-sm:pt-[92px]`}>
          <div className="reveal">
            <Tag>MACVAULT PRODUCTS</Tag>
            <h1 className="mx-auto mt-5 max-w-[920px] text-[clamp(48px,8vw,96px)] leading-[0.96] font-semibold tracking-normal">
              Browse drops with details before the chat.
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#667085]">
              Every product page is designed for quick local buying: condition, variant, warranty,
              package contents, and reservation context are shown before the CTA.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="#inventory">View inventory</Cta>
              <Cta href="/why-buy-from-us" variant="secondary">
                Why buy from us
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
                  style={{ transitionDelay: `${index * 90}ms` }}
                  key={mode.title}
                >
                  <Icon className="mb-5 size-5 text-[#0a84ff]" strokeWidth={2} />
                  <h2 className="text-xl font-semibold">{mode.title}</h2>
                  <p className="mt-2 text-sm leading-normal text-[#667085]">{mode.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="inventory" className={`${containerClass} py-[60px]`}>
          <SectionHead
            kicker="AVAILABLE DROPS"
            title="Inventory built for reservation, not endless browsing."
            text="Use the categories as quick signals, then open a product page for gallery, condition, details, and package notes."
          />

          <div className="reveal mb-8 flex flex-wrap justify-center gap-2">
            {productCategories.map((category) => {
              const count =
                category === "All"
                  ? products.length
                  : products.filter((product) => product.category === category).length;

              return (
                <span
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#050b141f] bg-white px-4 text-sm font-semibold text-[#050b14]"
                  key={category}
                >
                  {category}
                  <span className="text-[#667085]">{count}</span>
                </span>
              );
            })}
          </div>

          <div className="border-y border-[#050b141f] bg-white">
            {products.map((product, index) => (
              <article
                className="reveal grid grid-cols-[230px_1fr_190px] gap-7 border-b border-[#050b141f] p-5 last:border-b-0 max-[940px]:grid-cols-[180px_1fr] max-sm:grid-cols-1"
                style={{ transitionDelay: `${Math.min(index, 4) * 80}ms` }}
                key={product.slug}
              >
                <ProductVisual
                  accent={product.accent}
                  kind={product.gallery[0].kind}
                  label={product.shortTitle}
                  size="compact"
                />

                <div className="self-center">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-[#0a84ff17] px-2.5 py-1.5 text-[#0057d8]">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-[#23c87918] px-2.5 py-1.5 text-[#14773d]">
                      {product.status}
                    </span>
                    <span className="text-[#667085]">{product.condition}</span>
                  </div>
                  <h2 className="text-[30px] leading-[1.08] font-semibold">{product.title}</h2>
                  <p className="mt-3 max-w-[620px] text-[15px] leading-[1.55] text-[#667085]">
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
                </div>

                <div className="flex flex-col justify-between gap-5 border-l border-[#050b141f] pl-6 max-[940px]:col-span-2 max-[940px]:border-l-0 max-[940px]:border-t max-[940px]:pt-5 max-[940px]:pl-0 max-sm:col-span-1">
                  <div>
                    <p className="text-xs font-semibold text-[#667085]">Price</p>
                    <p className="mt-1 text-lg font-semibold text-[#050b14]">{product.price}</p>
                  </div>
                  <Cta href={`/products/${product.slug}`} icon={ArrowRight}>
                    View details
                  </Cta>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
