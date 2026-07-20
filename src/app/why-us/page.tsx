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
import { Footer, Header } from "@/components/site";
import { AnimatedText, SectionHead, Tag } from "@/components/site-primitives";
import { emailAddress, phoneDisplay, whatsappStockHref } from "@/data/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Buy from MacVault Lahore",
  description:
    "See how MacVault helps Lahore buyers check Apple and PlayStation product condition, PTA status, battery, warranty, package, and availability before payment.",
  path: "/why-us",
});

const uspCards = [
  {
    title: "Start with current stock",
    text: "Product pages show the current stock status and model details, so you can rule out the wrong option before contacting us.",
    icon: BadgeCheck,
  },
  {
    title: "Check the facts that matter",
    text: "Read the condition, PTA status, battery or cycle information, specifications, warranty notes, and package details that are available for the product.",
    icon: ClipboardCheck,
  },
  {
    title: "Speak directly with MacVault",
    text: `Ask about the exact unit through ${phoneDisplay}. The product name is included in the message, so the conversation starts with useful context.`,
    icon: MessageCircle,
  },
  {
    title: "Inspect before payment",
    text: "Where Lahore pickup is available, arrange inspection and compare the exact unit with the price, condition, package, and warranty you received in writing.",
    icon: PackageCheck,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Choose",
    text: "Pick the model, specifications, and condition that fit your use and budget.",
    icon: Search,
  },
  {
    number: "02",
    title: "Check",
    text: "Read the product page and note anything that is missing or can change by unit.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Ask",
    text: "Get the current price, photos, condition, warranty, and included items in writing.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Buy",
    text: "Inspect the product or agree on delivery, then pay only when the details match.",
    icon: Truck,
  },
];

const policyItems = [
  "For an iPhone, check whether the exact unit is PTA approved or non-PTA.",
  "For used phones and watches, check battery health. For open-box or used MacBooks, check cycle count.",
  "Do not treat sealed, open-box, and used products as the same condition.",
  "Get the final price, included items, and warranty duration in writing before payment.",
  "Agree on inspection, pickup, delivery, payment, and any reservation terms before the handover.",
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
            <h1 className="page-title mx-auto mt-5 max-w-[1280px]">
              A direct way to buy <AnimatedText>Apple</AnimatedText> and <AnimatedText>PlayStation</AnimatedText> products in Lahore.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[20px] leading-[1.58] text-[#667085] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              Compare the product first, speak directly with MacVault, inspect the exact unit when
              available, and keep the final price and terms in writing before payment.
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
              kicker="What is different"
              title="Product facts first. Direct contact next."
              accent="facts"
              text="The website helps you understand the product before WhatsApp. The conversation is for the exact unit, not for repeating basic model information."
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
                    <h3 className="mb-3 text-[24px] leading-tight font-semibold">
                      <AnimatedText>{card.title.split(" ")[0]}</AnimatedText>{card.title.includes(" ") ? ` ${card.title.split(" ").slice(1).join(" ")}` : ""}
                    </h3>
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
              kicker="Buying steps"
              title="Four steps from search to handover."
              accent="steps"
              text="A simple path for someone who may not know technical terms and does not want to make an expensive mistake."
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
                    <h3 className="mt-2 mb-2 text-2xl font-semibold">
                      <AnimatedText>{step.title}</AnimatedText>
                    </h3>
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
              <Tag>Before you pay</Tag>
              <h2 className="section-title mt-2">
                Check these points on the <AnimatedText>exact</AnimatedText> unit.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                The product page is the starting point. The exact unit and written terms are what
                matter when money, travel, or delivery is involved.
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
            <Tag>Next step</Tag>
            <h2 className="section-title mx-auto mt-2 max-w-[820px]">
              Browse first. <AnimatedText>Ask</AnimatedText> when you are ready.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
              Open a product page, note the facts you need, then message {phoneDisplay} or email
              {emailAddress} about the exact unit.
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
