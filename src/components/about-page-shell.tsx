"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Mail,
  MessageCircle,
  PackageCheck,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { ComparisonSection } from "@/components/comparison-section";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header } from "@/components/site";
import { AnimatedText, SectionHead, Tag } from "@/components/site-primitives";
import {
  createWhatsappHref,
  emailAddress,
  emailHref,
  phoneDisplay,
  phoneHref,
} from "@/data/contact";

const storyMilestones = [
  {
    year: "01",
    label: "Start",
    title: "Begin with the product you actually need.",
    text: "Choose an iPhone, MacBook, iPad, Apple Watch, AirPods, accessory, or PlayStation product. Compare the model and specifications before thinking about payment.",
    proof: "The right product for your use and budget",
    icon: Search,
  },
  {
    year: "02",
    label: "Read",
    title: "Check the facts shown on the product page.",
    text: "Read the listed condition, price status, specifications, PTA or battery information where relevant, package contents, and warranty notes.",
    proof: "Useful facts in plain language",
    icon: ClipboardCheck,
  },
  {
    year: "03",
    label: "Verify",
    title: "Ask about anything that changes by unit.",
    text: "Get the current price, exact photos, condition, battery or cycle count, warranty, and included items in writing before you travel or send payment.",
    proof: "The exact unit matches the agreed details",
    icon: MessageCircle,
  },
  {
    year: "04",
    label: "Buy",
    title: "Inspect, collect, or receive the product.",
    text: `Arrange the available inspection, pickup, or delivery option directly with MacVault through ${phoneDisplay}. Keep the written price, condition, package, and warranty details.`,
    proof: "A clear handover with written terms",
    icon: Store,
  },
];

const checks = [
  {
    title: "iPhone checks",
    text: "Check the model, storage, colour, condition, PTA status, battery health, display, cameras, box, included cable, and written warranty.",
    icon: BadgeCheck,
  },
  {
    title: "MacBook checks",
    text: "Check the chip, memory, storage, battery cycle count, charger, keyboard, screen, body condition, box, and written warranty.",
    icon: PackageCheck,
  },
  {
    title: "PlayStation checks",
    text: "Check the console edition, storage, controller, cables, box, game bundle, seal or condition, and written warranty.",
    icon: ShieldCheck,
  },
];

const buyerPromises = [
  "Product names include the model and important variant information when it is known.",
  "Ask for current photos or video when the exact unit condition matters.",
  "Final price, condition, included items, and warranty terms should be agreed in writing before payment.",
  "You can contact MacVault directly through the phone number, WhatsApp link, or email published on this site.",
];

export function AboutPageShell() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCheck, setActiveCheck] = useState(0);
  const activeMilestone = storyMilestones[activeIndex];
  const ActiveIcon = activeMilestone.icon;
  const activeCheckItem = checks[activeCheck];
  const ActiveCheckIcon = activeCheckItem.icon;
  const storyHref = useMemo(
    () => createWhatsappHref("Hi MacVault, I want to know more about your buying process."),
    [],
  );

  const moveTimeline = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction;

      if (next < 0) {
        return storyMilestones.length - 1;
      }

      if (next >= storyMilestones.length) {
        return 0;
      }

      return next;
    });
  };

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f9ff_58%,#ffffff_100%)] text-[#050b14]">
      <RevealController />
      <Header />

      <main className="pt-[50px]">
        <section className={`${containerClass} pt-32 pb-20 text-center max-sm:pt-[106px]`}>
          <div className="reveal">
            <Tag>About MacVault</Tag>
            <h1 className="page-title mx-auto mt-5 max-w-[1280px]">
              A simpler way to buy <AnimatedText>Apple</AnimatedText> and <AnimatedText>PlayStation</AnimatedText> products in Lahore.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[20px] leading-[1.58] text-[#667085] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              MacVault helps you compare the product, understand the important details, and speak
              directly with the seller before you inspect, collect, or arrange delivery.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href={storyHref} icon={MessageCircle}>
                WhatsApp MacVault
              </Cta>
              <Cta href="/products#inventory" icon={ArrowRight} variant="secondary">
                Browse products
              </Cta>
            </div>
          </div>
        </section>

        <section className="border-y border-[#050b141f] bg-white py-[60px]">
          <div className={`${containerClass} grid grid-cols-[0.85fr_1.15fr] gap-[56px] max-[1024px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>How it works</Tag>
              <h2 className="section-title mt-2">
                From finding a <AnimatedText>product</AnimatedText> to receiving it.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                These four steps show how to choose a product, read the important facts, check the
                exact unit, and complete the handover with written terms.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-[#f4f9ff] px-4 text-sm font-semibold text-[#102a43] transition-colors hover:border-[#0a84ff66] hover:text-[#0057d8]"
                  href={phoneHref}
                >
                  <PhoneCall className="size-4 text-[#0a84ff]" />
                  {phoneDisplay}
                </a>
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-[#f4f9ff] px-4 text-sm font-semibold text-[#102a43] transition-colors hover:border-[#0a84ff66] hover:text-[#0057d8]"
                  href={emailHref}
                >
                  <Mail className="size-4 text-[#0a84ff]" />
                  {emailAddress}
                </a>
              </div>
            </div>

            <div className="reveal min-w-0">
              <div className="overflow-hidden rounded-[8px] border border-[#102a4314] bg-[#f8fbff]">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-5 border-b border-[#102a4314] bg-white p-5 max-[425px]:grid-cols-1">
                  <div className="min-w-0">
                    <span className="text-xs font-bold tracking-[0.12em] text-[#0057d8] uppercase">
                      {activeMilestone.year} / {activeMilestone.label}
                    </span>
                    <h3 className="mt-3 text-[34px] leading-tight font-semibold max-[425px]:text-[28px]">
                      <AnimatedText>{activeMilestone.title.split(" ")[0]}</AnimatedText>{activeMilestone.title.includes(" ") ? ` ${activeMilestone.title.split(" ").slice(1).join(" ")}` : ""}
                    </h3>
                  </div>
                  <div className="flex items-start gap-2">
                    <button
                      className="icon-button"
                      type="button"
                      aria-label="Previous story milestone"
                      onClick={() => moveTimeline(-1)}
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      className="icon-button"
                      type="button"
                      aria-label="Next story milestone"
                      onClick={() => moveTimeline(1)}
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 p-5 max-[425px]:grid-cols-1">
                  <div className="grid size-[72px] place-items-center rounded-full bg-[#0a84ff] text-white">
                    <ActiveIcon className="size-8" />
                  </div>
                  <div aria-live="polite">
                    <p className="text-[17px] leading-[1.62] text-[#667085]">
                      {activeMilestone.text}
                    </p>
                    <div className="mt-6 rounded-[8px] border border-[#0a84ff24] bg-white p-4">
                      <span className="text-xs font-bold tracking-[0.12em] text-[#0057d8] uppercase">
                        What you should know
                      </span>
                      <p className="mt-2 text-lg font-semibold text-[#102a43]">
                        {activeMilestone.proof}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#102a4314] bg-white p-4">
                  <div className="h-2 overflow-hidden rounded-full bg-[#eef7ff]">
                    <div
                      className="h-full rounded-full bg-[#0a84ff] transition-all duration-300 ease-out"
                      style={{
                        width: `${((activeIndex + 1) / storyMilestones.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2 max-[640px]:grid-cols-2">
                    {storyMilestones.map((item, index) => (
                      <button
                        className={`min-h-14 rounded-[8px] border px-3 text-left text-sm font-semibold transition-colors ${
                          activeIndex === index
                            ? "border-[#0a84ff] bg-[#eef7ff] text-[#0057d8]"
                            : "border-[#102a4314] bg-white text-[#667085] hover:border-[#0a84ff66] hover:text-[#0057d8]"
                        }`}
                        type="button"
                        aria-pressed={activeIndex === index}
                        onClick={() => setActiveIndex(index)}
                        key={item.year}
                      >
                        <span className="block text-xs font-bold">{item.year}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${containerClass} py-[60px]`}>
          <SectionHead
            kicker="Right details"
            title="Different products need different checks."
            accent="checks"
            text="An iPhone buyer, a MacBook buyer, and a PlayStation buyer should not receive the same generic checklist."
          />

          <div className="grid grid-cols-[0.75fr_1.25fr] gap-5 max-[940px]:grid-cols-1">
            <div className="reveal grid gap-3">
              {checks.map((item, index) => {
                const Icon = item.icon;

                return (
                  <button
                    className={`flex min-h-[76px] items-center justify-between gap-4 rounded-[8px] border p-4 text-left transition-colors ${
                      activeCheck === index
                        ? "border-[#0a84ff] bg-white text-[#102a43] shadow-[0_18px_44px_rgba(10,132,255,0.11)]"
                        : "border-[#102a4314] bg-white/70 text-[#667085] hover:border-[#0a84ff66]"
                    }`}
                    type="button"
                    aria-pressed={activeCheck === index}
                    onClick={() => setActiveCheck(index)}
                    key={item.title}
                  >
                    <span className="inline-flex items-center gap-3 font-semibold">
                      <span className="grid size-10 place-items-center rounded-full bg-[#eef7ff] text-[#0a84ff]">
                        <Icon className="size-5" />
                      </span>
                      {item.title}
                    </span>
                    <ChevronRight className="size-4 text-[#0a84ff]" />
                  </button>
                );
              })}
            </div>

            <div className="reveal rounded-[8px] border border-[#102a4314] bg-white p-8 shadow-[0_20px_60px_rgba(5,20,44,0.06)] max-[425px]:p-6">
              <div className="grid size-14 place-items-center rounded-full bg-[#0a84ff] text-white">
                <ActiveCheckIcon className="size-7" />
              </div>
              <h3 className="mt-6 text-[38px] leading-none font-semibold max-[425px]:text-[30px]">
                <AnimatedText>{activeCheckItem.title.split(" ")[0]}</AnimatedText>{activeCheckItem.title.includes(" ") ? ` ${activeCheckItem.title.split(" ").slice(1).join(" ")}` : ""}
              </h3>
              <p className="mt-4 max-w-[760px] text-[17px] leading-[1.65] text-[#667085]">
                {activeCheckItem.text}
              </p>
              <div className="mt-7">
                <Cta href="/products#inventory" icon={ArrowRight} variant="secondary">
                  See product pages
                </Cta>
              </div>
            </div>
          </div>
        </section>

        <ComparisonSection />

        <section className="border-y border-[#0a84ff14] bg-[#f4f9ff] py-[60px] text-[#102a43]">
          <div className={`${containerClass} grid grid-cols-[0.9fr_1.1fr] gap-[56px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>What to expect</Tag>
              <h2 className="section-title mt-2">
                Clear <AnimatedText>information</AnimatedText> before payment.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                The page gives you a starting point. The exact unit, final price, and written terms
                still need to match before you complete the purchase.
              </p>
            </div>

            <div className="border-t border-[#102a431a]">
              {buyerPromises.map((promise, index) => (
                <div
                  className="reveal flex items-start gap-4 border-b border-[#102a431a] py-5"
                  style={{ transitionDelay: `${index * 60}ms` }}
                  key={promise}
                >
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#0a84ff]">
                    <Sparkles className="size-4" />
                  </span>
                  <p className="text-[17px] leading-normal text-[#667085]">{promise}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-[60px] text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>Ask MacVault</Tag>
            <h2 className="section-title mx-auto mt-2 max-w-[820px]">
              Speak directly with <AnimatedText>MacVault</AnimatedText> before you pay.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
              Call {phoneDisplay}, email {emailAddress}, or send the product name on WhatsApp. Ask
              for the current price, exact condition, warranty, included items, and available handover options.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href={storyHref} icon={MessageCircle}>
                WhatsApp MacVault
              </Cta>
              <Cta href="/contact" icon={PhoneCall} variant="secondary">
                Contact page
              </Cta>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
