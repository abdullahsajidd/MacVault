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
import { ComparisonSection } from "@/components/comparison-section";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header, SectionHead, Tag } from "@/components/site";
import { emailAddress, phoneDisplay, whatsappStockHref } from "@/data/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Us",
  description:
    "Why buyers choose MacVault: verified local Apple and PlayStation stock, clear condition details, direct WhatsApp support, and confident reservations.",
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
    text: "PTA, battery health, cycle count, warranty expectations, and package notes are shown clearly on the product page.",
    icon: ClipboardCheck,
  },
  {
    title: "Direct WhatsApp support",
    text: `Buyers can confirm exact details on ${phoneDisplay} with the product context already included.`,
    icon: MessageCircle,
  },
  {
    title: "Category-specific checks",
    text: "iPhone, MacBook, iPad, Watch, AirPods, accessories, and PlayStation stock each get the checks that matter for that product.",
    icon: PackageCheck,
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
  "PTA or non-PTA status is made clear for phone buyers.",
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
              Know what you&apos;re buying <span className="animated-text">before</span> you commit.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[20px] leading-[1.58] text-[#667085] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              See the condition, specifications, available options, package details, and buying
              support before you call, message, reserve, or visit.
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
              kicker="How we help"
              title="Clear details. Direct answers. Local support."
              accent="Clear"
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

        <ComparisonSection />

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

        <section className="border-y border-[#0a84ff14] bg-[#f4f9ff] py-[60px] text-[#102a43]">
          <div className={`${containerClass} grid grid-cols-[0.9fr_1.1fr] gap-[56px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>Buyer policy</Tag>
              <h2 className="section-title mt-2">
                Clear expectations before the <span className="animated-text">purchase</span>.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                The goal is not to add noise. The goal is to make important information visible
                before money or travel is involved.
              </p>
            </div>

            <div className="border-t border-[#102a431a]">
              {policyItems.map((item, index) => (
                <div
                  className="reveal flex items-start gap-4 border-b border-[#102a431a] py-5"
                  style={{ transitionDelay: `${index * 60}ms` }}
                  key={item}
                >
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#0a84ff]">
                    <ShieldCheck className="size-4" />
                  </span>
                  <p className="text-[17px] leading-normal text-[#667085]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-[60px] text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>Ready when you are</Tag>
            <h2 className="section-title mx-auto mt-2 max-w-[820px]">
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
