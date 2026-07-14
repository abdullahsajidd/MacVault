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
import { Footer, Header, SectionHead, Tag } from "@/components/site";
import {
  createWhatsappHref,
  emailAddress,
  emailHref,
  phoneDisplay,
  phoneHref,
} from "@/data/contact";

const storyMilestones = [
  {
    year: "2023",
    label: "Local demand",
    title: "Buyers wanted verified Apple stock without guessing.",
    text: "The first MacVault idea came from repeated questions around PTA, battery, cycle count, charger, box, warranty, and whether the exact unit was still available.",
    proof: "Product truth before chat",
    icon: Search,
  },
  {
    year: "2024",
    label: "Better checks",
    title: "The listing format moved from simple posts to inspection-led listings.",
    text: "Each product started getting clearer condition notes, package details, status labels, and reservation context so buyers could compare faster.",
    proof: "Condition notes made visible",
    icon: ClipboardCheck,
  },
  {
    year: "2025",
    label: "Direct flow",
    title: "WhatsApp became the main handoff, not the whole product page.",
    text: "The site now gives buyers enough context before the conversation, then WhatsApp handles the exact unit check, hold timing, pickup, or delivery.",
    proof: "Focused WhatsApp support",
    icon: MessageCircle,
  },
  {
    year: "Now",
    label: "MacVault",
    title: "A cleaner local buying flow for Apple and PlayStation stock.",
    text: `MacVault now keeps product discovery, buying confidence, and direct support connected through ${phoneDisplay} and ${emailAddress}.`,
    proof: "Local support with real details",
    icon: Store,
  },
];

const checks = [
  {
    title: "iPhone checks",
    text: "PTA or non-PTA status, battery health, storage, color, box, body, display, camera, and warranty expectations.",
    icon: BadgeCheck,
  },
  {
    title: "MacBook checks",
    text: "Chip, RAM, storage, battery cycle count, charger, keyboard, screen, body condition, and package notes.",
    icon: PackageCheck,
  },
  {
    title: "PlayStation checks",
    text: "Console edition, controller condition, cables, box, game bundle, pickup timing, and delivery options.",
    icon: ShieldCheck,
  },
];

const buyerPromises = [
  "No vague product names when variant, status, or condition changes the decision.",
  "No hidden PTA, battery, warranty, package, or stock-hold information.",
  "No forced form journey. Product pages lead straight to a real WhatsApp confirmation.",
  "No mismatched page widths or cramped browsing flow across desktop, tablet, and mobile.",
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
            <h1 className="mx-auto mt-5 max-w-[980px] text-[72px] leading-[0.96] font-semibold max-[768px]:text-[56px] max-[425px]:text-[42px] max-[375px]:text-[40px]">
              Built for local buyers who want <span className="animated-text">product truth</span>{" "}
              first.
            </h1>
            <p className="mx-auto mt-6 max-w-[760px] text-[20px] leading-[1.58] text-[#667085] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              MacVault is a clean local buying flow for iPhones, MacBooks, iPads, Apple Watch,
              AirPods, accessories, and PlayStation stock. The point is simple: show the details before the
              buyer has to ask.
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
              <Tag>Our story</Tag>
              <h2 className="section-title mt-2">
                From listings to a <span className="animated-text">verified</span> buying flow.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                The timeline shows how MacVault moved toward a more useful experience: less
                marketplace confusion, more product clarity before a buyer messages.
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
                      {activeMilestone.title}
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
                        What changed
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
            kicker="What we check"
            title="Built around the questions buyers already ask."
            accent="questions"
            text="MacVault keeps the most important buying details near the product decision, not hidden at the end of a chat."
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
                {activeCheckItem.title}
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
              <Tag>Buyer promise</Tag>
              <h2 className="section-title mt-2">
                Premium should feel <span className="animated-text">clear</span>.
              </h2>
              <p className="mt-[18px] max-w-[620px] text-[17px] leading-[1.56] text-[#667085]">
                The site is designed to reduce repeated questions and make each serious buyer easier
                to support.
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
            <Tag>Talk to MacVault</Tag>
            <h2 className="section-title mx-auto mt-2 max-w-[820px]">
              Ask for the exact unit before you <span className="animated-text">move</span>.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
              Call {phoneDisplay}, email {emailAddress}, or message on WhatsApp with the product you
              want checked.
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
