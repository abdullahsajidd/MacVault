import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
} from "lucide-react";
import { RevealController } from "@/components/reveal-controller";
import { Cta, Footer, Header, Tag, containerClass } from "@/components/site";

export const metadata: Metadata = {
  title: "Why Buy From Us | MacVault",
  description:
    "Why MacVault is built around verified stock, clear condition notes, WhatsApp-first support, and local Apple and PS5 buying confidence.",
};

const principles = [
  {
    title: "Verified before reserve",
    text: "Stock, variant, color, box state, and local availability are checked before a buyer commits.",
    icon: BadgeCheck,
  },
  {
    title: "Condition in plain words",
    text: "Sealed, open-box, used, PTA, Non-PTA, battery, cycle count, and warranty notes are not buried.",
    icon: ClipboardCheck,
  },
  {
    title: "Human buying flow",
    text: "A real conversation follows the product page, so buyers can confirm exact details fast.",
    icon: MessageCircle,
  },
];

const comparisonRows = [
  {
    typical: "Anonymous listing with missing variant details.",
    macvault: "Product page shows category, condition, status, highlights, and package notes.",
  },
  {
    typical: "Buyer asks the same PTA, warranty, or cycle-count questions repeatedly.",
    macvault: "Critical buying details are placed before the CTA and reconfirmed on WhatsApp.",
  },
  {
    typical: "Stock may already be sold by the time the buyer messages.",
    macvault: "Availability and short reservation options are part of the buying flow.",
  },
  {
    typical: "After-sale expectations are unclear.",
    macvault: "Warranty expectations, pickup, delivery, and support terms are explained before payment.",
  },
];

const supportFlow = [
  {
    number: "01",
    title: "Match the product",
    text: "We help align budget, storage, PTA status, chip, and condition with the buyer’s use case.",
    icon: Search,
  },
  {
    number: "02",
    title: "Share the proof",
    text: "Exact unit information, package notes, and condition media can be shared before reservation.",
    icon: PackageCheck,
  },
  {
    number: "03",
    title: "Hold or handoff",
    text: "A serious buyer can arrange pickup, delivery, payment, or a short stock hold.",
    icon: CalendarCheck,
  },
  {
    number: "04",
    title: "Stay clear after sale",
    text: "Support terms and warranty expectations stay visible instead of being handled vaguely.",
    icon: ShieldCheck,
  },
];

const policies = [
  "Today’s price is confirmed before reservation.",
  "PTA and Non-PTA status is stated clearly for phone buyers.",
  "Open-box and used products include condition-specific notes.",
  "Mac cycle count, battery, charger, and warranty details are shared where relevant.",
  "Pickup, delivery, and reservation support are handled through a direct local flow.",
];

export default function WhyBuyFromUsPage() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f8ff_58%,#ffffff_100%)] text-[#07111f]">
      <RevealController />
      <Header />

      <main>
        <section className={`${containerClass} pt-28 pb-20 text-center max-sm:pt-[92px]`}>
          <div className="reveal">
            <Tag>WHY BUY FROM MACVAULT</Tag>
            <h1 className="mx-auto mt-5 max-w-[960px] text-[clamp(48px,8vw,96px)] leading-[0.96] font-semibold tracking-normal">
              A cleaner way to buy local Apple and PS5 drops.
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#687386]">
              MacVault is built for buyers who want product truth before a visit, payment, or
              reservation. The site should reduce doubt before WhatsApp starts.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products">Browse products</Cta>
              <Cta href="/#process" variant="secondary">
                See process
              </Cta>
            </div>
          </div>
        </section>

        <section className="border-y border-[#07111f1f] bg-white py-[86px]">
          <div className={containerClass}>
            <div className="reveal mb-10 text-center">
              <Tag>THE DIFFERENCE</Tag>
              <h2 className="mx-auto mt-2 max-w-[760px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Local buying should feel calm, not confusing.
              </h2>
            </div>

            <div className="grid grid-cols-3 border-y border-[#07111f1f] max-[940px]:grid-cols-1">
              {principles.map((principle, index) => {
                const Icon = principle.icon;

                return (
                  <div
                    className="reveal min-h-[230px] border-r border-[#07111f1f] p-7 last:border-r-0 max-[940px]:border-b max-[940px]:last:border-b-0"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={principle.title}
                  >
                    <Icon className="mb-8 size-6 text-[#007aff]" strokeWidth={2} />
                    <h3 className="text-[26px] leading-tight font-semibold">{principle.title}</h3>
                    <p className="mt-3 text-[15px] leading-[1.55] text-[#687386]">
                      {principle.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${containerClass} py-[104px]`}>
          <div className="reveal mb-10 max-w-[760px]">
            <Tag>COMPARISON</Tag>
            <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Not a generic listing flow.
            </h2>
            <p className="mt-[18px] text-[17px] leading-[1.56] text-[#687386]">
              MacVault pages are designed to answer the practical questions that usually slow down
              local electronics buying.
            </p>
          </div>

          <div className="border-y border-[#07111f1f] bg-white">
            <div className="grid grid-cols-2 border-b border-[#07111f1f] text-sm font-semibold text-[#687386] max-sm:grid-cols-1">
              <div className="border-r border-[#07111f1f] p-5 max-sm:border-r-0 max-sm:border-b">
                Typical listing
              </div>
              <div className="p-5">MacVault flow</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div
                className="reveal grid grid-cols-2 border-b border-[#07111f1f] last:border-b-0 max-sm:grid-cols-1"
                style={{ transitionDelay: `${index * 80}ms` }}
                key={row.typical}
              >
                <div className="border-r border-[#07111f1f] p-5 text-[15px] leading-normal text-[#687386] max-sm:border-r-0 max-sm:border-b">
                  {row.typical}
                </div>
                <div className="p-5 text-[15px] leading-normal font-medium text-[#07111f]">
                  {row.macvault}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f4f8ff] py-[104px]">
          <div className={containerClass}>
            <div className="reveal mb-11 text-center">
              <Tag>LOCAL SUPPORT FLOW</Tag>
              <h2 className="mx-auto mt-2 max-w-[820px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Support before, during, and after the purchase.
              </h2>
            </div>

            <div className="timeline reveal relative grid grid-cols-4 border-t border-[#07111f29] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
              {supportFlow.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    className="min-h-64 border-r border-[#07111f1f] pt-7 pr-7 last:border-r-0 max-[940px]:border-b"
                    key={step.number}
                  >
                    <div className="inline-flex size-[42px] items-center justify-center rounded-full border border-[#007aff42] bg-white text-[#007aff]">
                      <Icon className="size-5" strokeWidth={1.9} />
                    </div>
                    <div className="mt-5 text-[13px] font-bold text-[#007aff]">{step.number}</div>
                    <h3 className="mt-2 mb-2 text-2xl font-semibold">{step.title}</h3>
                    <p className="max-w-[230px] text-[15px] leading-normal text-[#687386]">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#07111f] py-[86px] text-white">
          <div className={`${containerClass} grid grid-cols-[0.9fr_1.1fr] gap-[56px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>BUYING POLICY</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Clear expectations make better buyers.
              </h2>
              <p className="mt-[18px] text-[17px] leading-[1.56] text-white/70">
                The goal is not to overload buyers. The goal is to surface the exact information
                needed to decide with confidence.
              </p>
            </div>

            <div className="border-t border-white/20">
              {policies.map((policy, index) => (
                <div
                  className="reveal flex items-start gap-4 border-b border-white/20 py-5"
                  style={{ transitionDelay: `${index * 80}ms` }}
                  key={policy}
                >
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#007aff]">
                    <ShieldCheck className="size-4" strokeWidth={2} />
                  </span>
                  <p className="text-[17px] leading-normal text-white/75">{policy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-24 text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>READY WHEN YOU ARE</Tag>
            <h2 className="mx-auto mt-2 max-w-[760px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Start with the product page, then confirm on WhatsApp.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
              Browse current drops, compare details, and message with the right context.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products">Browse products</Cta>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#007aff38] bg-white px-5 text-sm font-semibold text-[#0759c7] transition-transform hover:-translate-y-0.5"
                href="/"
              >
                Back home <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
