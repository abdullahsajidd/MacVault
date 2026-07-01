import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header, SectionHead, Tag } from "@/components/site";
import { emailAddress, phoneDisplay, whatsappStockHref } from "@/data/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Us",
  description:
    "MacVault's USP: verified local Apple and PS5 stock, clear condition details, WhatsApp-first support, and reservation confidence.",
  path: "/why-us",
});

const uspCards = [
  {
    title: "Verified local stock",
    text: "Availability, variant, condition, color, box, package, and hold timing are checked before a serious buyer moves.",
    icon: BadgeCheck,
  },
  {
    title: "Product truth first",
    text: "PTA, battery health, cycle count, warranty expectations, and package notes are placed before the WhatsApp CTA.",
    icon: ClipboardCheck,
  },
  {
    title: "Direct WhatsApp support",
    text: `Buyers can confirm exact details on ${phoneDisplay} instead of filling dead-end forms or starting a blind chat.`,
    icon: MessageCircle,
  },
  {
    title: "Category-specific checks",
    text: "iPhone, MacBook, iPad, Watch, AirPods, accessories, and PS5 stock each get the checks that matter for that product.",
    icon: PackageCheck,
  },
];

const comparisonRows = [
  {
    label: "Stock",
    typical: "Listings stay online after a unit is sold.",
    macvault: "Current stock and reservation timing are confirmed before the buyer commits.",
  },
  {
    label: "Condition",
    typical: "Important details are scattered across chat messages.",
    macvault: "Condition, PTA, warranty, battery, cycle count, and package notes are visible earlier.",
  },
  {
    label: "Support",
    typical: "The buyer has to explain everything from zero.",
    macvault: "The product page gives the conversation context before WhatsApp opens.",
  },
  {
    label: "Trust",
    typical: "The buying process feels anonymous.",
    macvault: `MacVault keeps contact clear through ${phoneDisplay} and ${emailAddress}.`,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Browse",
    text: "Open a product or category page and compare the practical details first.",
    icon: Search,
  },
  {
    number: "02",
    title: "Confirm",
    text: "Message MacVault with the product already selected and ask for the exact unit check.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Reserve",
    text: "Arrange pickup, delivery, payment, or a short hold after stock and price are confirmed.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Handoff",
    text: "Get the device, package, and warranty expectations clearly before closing the purchase.",
    icon: Truck,
  },
];

const policyItems = [
  "PTA or Non PTA status is made clear for phone buyers.",
  "Battery health and cycle count are shared where they affect the decision.",
  "Sealed, open-box, and used status are not treated like the same product.",
  "Package contents and warranty expectations are confirmed before payment.",
  "Pickup, delivery, and short reservation support are handled directly.",
];

export default function WhyUsPage() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_58%,#ffffff_100%)] text-[#050b14]">
      <RevealController />
      <Header />

      <main className="pt-[50px]">
        <section className={`${containerClass} pt-32 pb-20 text-center max-sm:pt-[106px]`}>
          <div className="reveal">
            <Tag>Why MacVault</Tag>
            <h1 className="mx-auto mt-5 max-w-[980px] text-[72px] leading-[0.96] font-semibold max-[768px]:text-[56px] max-[425px]:text-[42px] max-[375px]:text-[40px]">
              Our USP is simple: <span className="animated-text">verified</span> local stock before
              the buyer commits.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[20px] leading-[1.58] text-[#667085] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              MacVault is not trying to feel like a generic marketplace. The site exists to show the
              details serious buyers need before they call, message, reserve, or visit.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products#inventory" icon={Search}>
                Browse products
              </Cta>
              <Cta href={whatsappStockHref} icon={MessageCircle} variant="secondary">
                {`WhatsApp ${phoneDisplay}`}
              </Cta>
            </div>
          </div>
        </section>

        <section className="border-y border-[#050b141f] bg-white py-[60px]">
          <div className={containerClass}>
            <SectionHead
              kicker="USP"
              title="What MacVault does differently."
              accent="differently"
              text="The buying flow is built around confidence: fewer vague claims, clearer checks, and a direct local support path."
            />

            <div className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-sm:grid-cols-1">
              {uspCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <article
                    className="benefit-card reveal min-h-[250px]"
                    style={{ transitionDelay: `${index * 60}ms` }}
                    key={card.title}
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-full border border-[#0a84ff24] bg-white text-[#0a84ff]">
                        <Icon className="size-5" />
                      </span>
                      <Sparkles className="size-4 text-[#0a84ff]" />
                    </div>
                    <h3 className="mb-3 text-[24px] leading-tight font-semibold">{card.title}</h3>
                    <p className="text-base leading-[1.55] text-[#667085]">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${containerClass} py-[60px]`}>
          <div className="reveal mb-10 max-w-[780px]">
            <Tag>Comparison</Tag>
            <h2 className="mt-2 text-[58px] leading-none font-semibold max-[768px]:text-[44px] max-[425px]:text-[34px]">
              Not another anonymous <span className="animated-text">listing</span>.
            </h2>
            <p className="mt-[18px] text-[17px] leading-[1.56] text-[#667085]">
              MacVault pages are designed to answer the same questions buyers usually repeat in
              chat, then let the team confirm the exact unit directly.
            </p>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[#050b141f] bg-white">
            <div className="grid grid-cols-[160px_1fr_1fr] border-b border-[#050b141f] bg-[#f8fbff] text-sm font-semibold text-[#667085] max-[768px]:hidden">
              <div className="border-r border-[#050b141f] p-5">Point</div>
              <div className="border-r border-[#050b141f] p-5">Typical listing</div>
              <div className="p-5">MacVault flow</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div
                className="reveal grid grid-cols-[160px_1fr_1fr] border-b border-[#050b141f] last:border-b-0 max-[768px]:grid-cols-1"
                style={{ transitionDelay: `${index * 60}ms` }}
                key={row.label}
              >
                <div className="border-r border-[#050b141f] p-5 text-sm font-bold text-[#0057d8] max-[768px]:border-r-0 max-[768px]:border-b max-[768px]:bg-[#f8fbff]">
                  {row.label}
                </div>
                <div className="border-r border-[#050b141f] p-5 text-[15px] leading-normal text-[#667085] max-[768px]:border-r-0 max-[768px]:border-b">
                  {row.typical}
                </div>
                <div className="p-5 text-[15px] leading-normal font-medium text-[#050b14]">
                  {row.macvault}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f9ff] py-[60px]">
          <div className={containerClass}>
            <SectionHead
              kicker="Buying flow"
              title="Confidence from browsing to handoff."
              accent="Confidence"
              text="The site should keep the buyer moving without forcing reloads, vague pages, or repeated questions."
            />

            <div className="grid grid-cols-4 gap-4 max-[940px]:grid-cols-2 max-sm:grid-cols-1">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    className="process-card reveal min-h-64"
                    style={{ transitionDelay: `${index * 60}ms` }}
                    key={step.number}
                  >
                    <div className="inline-flex size-[42px] items-center justify-center rounded-full border border-[#0a84ff42] bg-white text-[#0a84ff]">
                      <Icon className="size-5" />
                    </div>
                    <div className="mt-5 text-[13px] font-bold text-[#0a84ff]">{step.number}</div>
                    <h3 className="mt-2 mb-2 text-2xl font-semibold">{step.title}</h3>
                    <p className="text-[15px] leading-normal text-[#667085]">{step.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#050b14] py-[60px] text-white">
          <div className={`${containerClass} grid grid-cols-[0.9fr_1.1fr] gap-[56px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>Buyer policy</Tag>
              <h2 className="mt-2 text-[58px] leading-none font-semibold max-[768px]:text-[44px] max-[425px]:text-[34px]">
                Clear expectations before the <span className="animated-text">purchase</span>.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-white/70">
                The goal is not to add noise. The goal is to make important information visible
                before money or travel is involved.
              </p>
            </div>

            <div className="border-t border-white/20">
              {policyItems.map((item, index) => (
                <div
                  className="reveal flex items-start gap-4 border-b border-white/20 py-5"
                  style={{ transitionDelay: `${index * 60}ms` }}
                  key={item}
                >
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#0a84ff]">
                    <ShieldCheck className="size-4" />
                  </span>
                  <p className="text-[17px] leading-normal text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-[60px] text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>Ready when you are</Tag>
            <h2 className="mx-auto mt-2 max-w-[820px] text-[54px] leading-none font-semibold max-[768px]:text-[42px] max-[425px]:text-[34px]">
              Start with the page, then <span className="animated-text">confirm</span> the unit.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
              Browse the product, message {phoneDisplay}, or email {emailAddress} for direct
              confirmation.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href={whatsappStockHref} icon={MessageCircle}>
                WhatsApp MacVault
              </Cta>
              <Cta href="/contact" icon={ArrowRight} variant="secondary">
                Contact us
              </Cta>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
