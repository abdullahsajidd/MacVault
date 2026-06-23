"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  Gamepad2,
  Headphones,
  Laptop,
  MessageCircle,
  PackageCheck,
  Quote,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Cta, Footer, Header, SectionHead, Tag, containerClass } from "@/components/site";
import { featuredProducts } from "@/data/products";

const stockSignals = [
  {
    title: "iPhones",
    text: "Sealed, open-box, PTA and Non-PTA options.",
    icon: Smartphone,
  },
  {
    title: "Macs",
    text: "Air, Pro, chip, storage, cycle count and warranty notes.",
    icon: Laptop,
  },
  {
    title: "PS5",
    text: "Console, controller and bundle availability.",
    icon: Gamepad2,
  },
  {
    title: "Accessories",
    text: "AirPods, chargers, cases and Apple essentials.",
    icon: Headphones,
  },
  {
    title: "Local Flow",
    text: "WhatsApp, pickup, delivery and reservation support.",
    icon: Truck,
  },
];

const whyRows = [
  {
    number: "01",
    title: "Verified stock before commitment.",
    text: "Buyers know what is actually available before they visit, pay, or reserve.",
    icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Condition is not hidden.",
    text: "Sealed, open-box, used, PTA, Non-PTA, battery, cycle count, and warranty details are visible.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "WhatsApp-first buying flow.",
    text: "Every CTA moves a serious buyer into a fast conversation with product context.",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Local support after the sale.",
    text: "Warranty expectations, delivery, pickup, and support terms are framed clearly.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    number: "01",
    title: "Choose",
    text: "Select an iPhone, Mac, iPad, Watch, accessory, or PS5 bundle.",
    icon: Search,
  },
  {
    number: "02",
    title: "Confirm",
    text: "Review condition, PTA status, warranty, storage, and box contents.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Message",
    text: "Open WhatsApp with the selected product details already understood.",
    icon: Send,
  },
  {
    number: "04",
    title: "Reserve",
    text: "Arrange pickup, delivery, payment, or a short hold on available stock.",
    icon: CalendarCheck,
  },
];

const guideRows = [
  {
    title: "Sealed",
    text: "New boxed units with full product details and warranty expectations.",
    note: "Highest trust",
    icon: PackageCheck,
  },
  {
    title: "Open Box",
    text: "Opened packaging, checked condition, usually better value than sealed.",
    note: "Best value",
    icon: BadgeCheck,
  },
  {
    title: "Used",
    text: "Clearly listed physical condition, battery health, cycle count, and accessories.",
    note: "Budget option",
    icon: ClipboardCheck,
  },
  {
    title: "PTA / Non-PTA",
    text: "Shown clearly so phone buyers do not need to ask the same question twice.",
    note: "Critical detail",
    icon: ShieldCheck,
  },
];

const services = [
  {
    title: "Before buying",
    text: "Guidance on storage, chip, PTA status, condition, and budget fit.",
    icon: Search,
  },
  {
    title: "During buying",
    text: "Reservation, pickup, delivery, and stock confirmation through WhatsApp.",
    icon: MessageCircle,
  },
  {
    title: "After buying",
    text: "Warranty expectations and support terms presented in plain language.",
    icon: ShieldCheck,
  },
];

const testimonials = [
  {
    name: "Hamza A.",
    role: "iPhone 15 Pro Max buyer",
    text: "MacVault shared the PTA status, box condition, color, and warranty note before I visited. It felt much cleaner than normal listing chats.",
    active: false,
  },
  {
    name: "Mariam K.",
    role: "MacBook Air M3 buyer",
    text: "The MacBook cycle count and charger condition were clear from the start. I did not have to ask ten basic questions before reserving.",
    active: true,
  },
  {
    name: "Saad R.",
    role: "PS5 bundle buyer",
    text: "The bundle contents were confirmed on WhatsApp, then pickup was quick. The page made it easy to know what was actually available.",
    active: false,
  },
];

const marqueeItems = ["IPHONE", "MACBOOK", "IPAD", "IWATCH", "PS5", "AIRPODS", "APPLE TV", "ACCESSORIES"];

function HeroMacbookAnimation() {
  const [showTick, setShowTick] = useState(false);

  // Giant checkmark pop trigger synced on a 4s loop
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setShowTick(true);
      const timeout = setTimeout(() => setShowTick(false), 2000);
      return () => clearTimeout(timeout);
    }, 4000);
    return () => clearInterval(tickInterval);
  }, []);

  return (
    <div className="reveal mt-12 mb-6 flex flex-col items-center justify-center relative select-none w-full max-w-[800px] mx-auto px-4">
      {/* MacBook Screen Lid Frame */}
      <div className="relative w-full max-w-[620px] aspect-[16/10] bg-[#0c0d0e] border-[10px] sm:border-[12px] border-[#1d1f21] rounded-t-[20px] rounded-b-[4px] shadow-[0_25px_55px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
        {/* Notch */}
        <div className="absolute h-[15px] w-[80px] bg-[#1d1f21] rounded-b-md top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          {/* Webcam Lens */}
          <div className="size-1 rounded-full bg-[#050608] border border-neutral-700/50" />
        </div>

        {/* Screen Content Wrapper: Bright Wallpaper (Indigo-Purple-Pink gradient) */}
        <div className="relative w-full h-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 overflow-hidden flex items-center justify-center font-sans">
          {/* Internal screen grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] pointer-events-none" />

          {/* Soft central static glow (optimizes cpu/gpu layers by removing scale/opacity animations) */}
          <div className="absolute w-[50%] h-[50%] rounded-full bg-white/10 blur-[40px] pointer-events-none" />

          {/* Giant Tick Icon overlay pop */}
          {showTick && (
            <div className="absolute top-1/2 left-1/2 z-20 animate-tick select-none pointer-events-none">
              <svg className="size-20 text-white stroke-current filter drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}

          {/* Floating Gold-to-Blue 'MACVAULT' Brand Tag */}
          <div className="absolute left-[15%] top-[18%] animate-brand flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-[#0a84ff] font-extrabold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(10,132,255,0.15)] select-none">
            <BadgeCheck className="size-3.5 text-[#0a84ff]" />
            <span>MACVAULT</span>
          </div>

          {/* Floating 'VERIFIED' check badge */}
          <div className="absolute left-[10%] bottom-[22%] animate-verified flex items-center gap-2 rounded-full border border-emerald-400/30 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-emerald-400 font-extrabold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.12)] select-none">
            <span className="relative flex size-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500"></span>
            </span>
            <span>VERIFIED STOCK</span>
          </div>

          {/* Floating 'SOLD' badge */}
          <div className="absolute right-[10%] bottom-[30%] animate-sold flex items-center gap-2 rounded-full border border-rose-400/30 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-rose-400 font-extrabold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.12)] select-none">
            <span className="relative flex size-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-1.5 bg-rose-500"></span>
            </span>
            <span>SOLD DROP</span>
          </div>

          {/* Abstract floating bubbles for context */}
          <div className="absolute left-[38%] top-[20%] animate-verified [animation-delay:1.5s] flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-xs px-2 py-1 text-white/80 text-[9px] sm:text-[10px] font-semibold tracking-wide">
            <span>+ PTA Confirmed</span>
          </div>

          <div className="absolute right-[32%] top-[24%] animate-sold [animation-delay:4.5s] flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-xs px-2 py-1 text-white/80 text-[9px] sm:text-[10px] font-semibold tracking-wide">
            <span>+ 8 Cycles</span>
          </div>

          {/* Watermark inside screen */}
          <div className="absolute bottom-[10%] text-[11px] sm:text-[12px] font-bold tracking-[0.06em] text-white/10 select-none font-sans uppercase">
            MacVault Showroom
          </div>
        </div>
      </div>

      {/* Laptop Keyboard Base */}
      <div className="relative w-[114%] h-[12px] sm:h-[14px] bg-gradient-to-r from-[#d1d5db] via-[#e5e7eb] to-[#9ca3af] border-t border-white/70 rounded-b-[12px] shadow-[0_12px_36px_rgba(0,0,0,0.15)] flex flex-col justify-start">
        {/* Notch indentation for opening screen */}
        <div className="w-[70px] h-[4px] bg-[#4b5563] mx-auto rounded-b-[3px]" />
      </div>

      {/* Floor reflection shadow */}
      <div className="w-[104%] h-[8px] bg-black/15 rounded-full blur-[6px] mt-1 pointer-events-none" />
    </div>
  );
}

function ProductMarquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-[#050b141f] bg-white">
      <div className="marquee-track flex w-max items-center py-8">
        {loop.map((item, index) => (
          <div className="flex items-center" key={`${item}-${index}`}>
            <span className="px-7 text-[clamp(42px,8vw,104px)] leading-none font-semibold tracking-normal whitespace-nowrap text-[#050b14]">
              {item}
            </span>
            <span className="size-2 rounded-full bg-[#0a84ff]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_42%,#ffffff_100%)] text-[#050b14]">
      <RevealController />
      <Header />

      <main>
        <section className={`${containerClass} relative min-h-[calc(100vh-88px)] pt-28 pb-[60px] text-center max-sm:pt-[92px]`}>
          <div className="reveal hero-content mx-auto max-w-[980px]">
            <Tag>Curated Apple and PS5 stock</Tag>

            <h1 className="hero-title mx-auto mt-6 max-w-[980px] text-[70px] leading-[0.98] font-semibold tracking-normal max-[768px]:text-[64px] max-[425px]:text-[46px] max-[375px]:text-[42px]">
              Verified Apple and PS5 drops, ready when you are.
            </h1>

            <p className="hero-copy mx-auto mt-6 max-w-[760px] text-[21px] leading-[1.58] text-[#667085] max-[1024px]:text-[19px] max-[768px]:text-[18px] max-[425px]:text-[17px]">
              MacVault brings iPhones, Macs, Apple accessories, and PS5 bundles into a cleaner
              buying flow: condition first, warranty context clear, and reservation handled with
              intent.
            </p>

            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products">Explore drops</Cta>
              <Cta href="#drops" variant="secondary">
                View highlights
              </Cta>
            </div>

            <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-4 border-y border-[#050b141f] text-center max-[768px]:grid-cols-2 max-sm:grid-cols-1">
              {[
                ["Verified", "stock status"],
                ["Clear", "condition notes"],
                ["Direct", "WhatsApp reserve"],
                ["Protected", "warranty notes"],
              ].map(([title, text]) => (
                <div className="border-r border-[#050b141f] px-5 py-4 last:border-r-0 max-[768px]:border-b max-[768px]:even:border-r-0 max-sm:border-r-0 max-sm:last:border-b-0" key={title}>
                  <strong className="block text-[15px] font-semibold">{title}</strong>
                  <span className="mt-1 block text-[13px] leading-normal text-[#667085]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroMacbookAnimation />
        </section>

        <div className="border-y border-[#050b141f] bg-white">
          <div className={`${containerClass} grid grid-cols-5 max-[1040px]:grid-cols-3 max-[720px]:grid-cols-2 max-sm:grid-cols-1`}>
            {stockSignals.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="reveal min-h-[78px] border-r border-[#050b141f] px-5 py-4 last:border-r-0 max-[1040px]:border-b max-sm:border-r-0"
                  style={{ transitionDelay: `${Math.min(index, 3) * 100}ms` }}
                  key={item.title}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#0a84ff12] text-[#0a84ff]">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <div>
                      <strong className="block text-[15px] leading-tight">{item.title}</strong>
                      <span className="mt-1.5 block text-[13px] leading-[1.35] text-[#667085]">
                        {item.text}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <ProductMarquee />

        <section id="drops" className={`${containerClass} py-[60px]`}>
          <SectionHead
            kicker="CURRENT DROPS"
            title="Focused product pages built for serious buyers."
            text="Each drop leads to a detail page with gallery, condition notes, specs, package contents, and a direct WhatsApp-style CTA."
          />

          <div className="flex flex-col gap-6">
            {featuredProducts.map((product, index) => {
              const storageVal = product.details.find((d) => d.label === "Storage")?.value?.replace("GB", "") || "256";
              const ptaStatus = product.category === "iPhone" ? "PTA Approved" : null;

              return (
                <article
                  className="reveal overflow-hidden rounded-2xl border border-[#050b141f] bg-white p-5 transition hover:shadow-[0_12px_36px_rgba(5,20,44,0.05)] hover:border-[#0a84ff52] grid grid-cols-1 md:grid-cols-[0.3fr_0.7fr] gap-6 items-center"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={product.slug}
                >
                  <ProductVisual
                    accent={product.accent}
                    kind={product.gallery[0].kind}
                    label={product.shortTitle}
                    size="compact"
                    className="w-full h-full min-h-[220px]"
                  />
                  <div className="flex flex-col items-start text-left">
                    <div className="mb-3 flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                      <span className="rounded-full bg-[#0a84ff17] px-2.5 py-1 text-[#0057d8]">
                        {product.category}
                      </span>
                      <span className="text-[#667085]">{product.status}</span>
                    </div>

                    <h3 className="mb-2 text-2xl md:text-3xl font-extrabold text-[#050b14] leading-snug">
                      {product.title}
                    </h3>

                    {/* Spec Pill Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="rounded-md border border-[#050b1414] bg-[#f5f5f7] px-2.5 py-1 text-xs font-bold text-[#667085]">
                        {product.shortTitle}
                      </span>
                      <span className="rounded-md border border-[#050b1414] bg-[#f5f5f7] px-2.5 py-1 text-xs font-bold text-[#667085]">
                        {storageVal}GB
                      </span>
                      {ptaStatus && (
                        <span className="rounded-md border border-[#0a84ff26] bg-[#0a84ff0d] px-2.5 py-1 text-xs font-bold text-[#0057d8]">
                          {ptaStatus}
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-[#667085] mb-5 max-w-2xl">
                      {product.summary}
                    </p>

                    <Cta className="min-h-10 px-5 text-xs font-bold" href={`/products/${product.slug}`} icon={ArrowRight} variant="secondary">
                      View product
                    </Cta>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="reveal mt-9 text-center">
            <Cta href="/products" variant="secondary">
              See all products
            </Cta>
          </div>
        </section>

        <section id="testimonials" className="border-y border-[#050b141f] bg-white py-[60px]">
          <div className={`${containerClass} grid grid-cols-[0.82fr_1.18fr] items-start gap-[58px] max-[940px]:grid-cols-1`}>
            <div className="reveal sticky top-[120px] max-[940px]:static">
              <Tag>BUYER FEEDBACK</Tag>
              <h2 className="mt-2 max-w-[520px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                The experience should feel clear before the chat starts.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
                MacVault’s product pages remove the usual uncertainty around PTA status, warranty,
                package contents, and local availability.
              </p>
              <div className="mt-7 flex gap-2" aria-label="Active testimonial">
                {testimonials.map((testimonial) => (
                  <span
                    className={`h-1 rounded-full ${
                      testimonial.active ? "w-1 bg-[#0a84ff]" : "w-[3px] bg-[#050b142e]"
                    }`}
                    key={testimonial.name}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-[#050b141f]">
              {testimonials.map((testimonial, index) => (
                <article
                  className={`reveal grid grid-cols-[64px_1fr] gap-5 border-b border-[#050b141f] py-7 max-sm:grid-cols-1 ${
                    testimonial.active ? "bg-[#f6fbff]" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={testimonial.name}
                >
                  <span className="grid size-11 place-items-center rounded-full border border-[#0a84ff24] bg-white text-[#0a84ff]">
                    <Quote className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <div className="mb-3 flex gap-1 text-[#0a84ff]" aria-label="5 star rating">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Star className="size-4 fill-current" strokeWidth={1.8} key={item} />
                      ))}
                    </div>
                    <p className="text-[21px] leading-[1.42] font-medium text-[#050b14]">
                      “{testimonial.text}”
                    </p>
                    <div className="mt-5 text-sm">
                      <strong className="block text-[#050b14]">{testimonial.name}</strong>
                      <span className="text-[#667085]">{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="border-b border-[#050b141f] bg-white py-[60px]">
          <div className={`${containerClass} grid grid-cols-[0.95fr_1.05fr] items-start gap-[60px] max-[940px]:grid-cols-1`}>
            <div className="reveal sticky top-[120px] max-[940px]:static">
              <Tag>WHY CHOOSE MACVAULT</Tag>
              <h2 className="mt-2 max-w-[500px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Less marketplace. More confidence.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
                MacVault should feel like a local showroom with clear product truth, not another
                grid of anonymous listings.
              </p>
              <Cta className="mt-7" href="/why-buy-from-us" icon={ArrowRight} variant="secondary">
                Read why buy from us
              </Cta>
            </div>

            <div className="border-t border-[#050b141f]">
              {whyRows.map((row, index) => {
                const Icon = row.icon;

                return (
                  <div
                    className="reveal grid grid-cols-[150px_1fr] gap-[26px] border-b border-[#050b141f] py-[30px] max-sm:grid-cols-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={row.number}
                  >
                    <span className="flex items-center gap-3 text-[13px] font-bold text-[#0a84ff]">
                      <Icon className="size-5" strokeWidth={1.9} />
                      {row.number}
                    </span>
                    <div>
                      <h3 className="mb-2 text-[26px] font-semibold">{row.title}</h3>
                      <p className="max-w-[520px] text-base leading-[1.55] text-[#667085]">
                        {row.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#f4f9ff] py-[60px]">
          <div className={containerClass}>
            <SectionHead
              kicker="OUR PROCESS"
              title="From browsing to reservation in four steps."
              text="A direct flow for high-intent buyers who want details first and a human reply fast."
            />

            <div className="timeline reveal relative mt-12 grid grid-cols-4 border-t border-[#050b1429] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    className="min-h-60 border-r border-[#050b141f] pt-7 pr-7 last:border-r-0 max-[940px]:border-b"
                    key={step.number}
                  >
                    <div className="inline-flex size-[42px] items-center justify-center rounded-full border border-[#0a84ff42] bg-white text-[#0a84ff]">
                      <Icon className="size-5" strokeWidth={1.9} />
                    </div>
                    <div className="mt-5 text-[13px] font-bold text-[#0a84ff]">{step.number}</div>
                    <h3 className="mt-2 mb-2 text-2xl font-semibold">{step.title}</h3>
                    <p className="max-w-[230px] text-[15px] leading-normal text-[#667085]">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="guide" className={`${containerClass} py-[60px]`}>
          <div className="grid grid-cols-[0.8fr_1.2fr] items-start gap-[50px] max-[940px]:grid-cols-1">
            <div className="reveal">
              <Tag>BUYING GUIDE</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Make condition easy to understand.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
                This section gives MacVault a professional dealer feel and reduces repeated
                questions on WhatsApp.
              </p>
            </div>

            <div className="border-t border-[#050b141f]">
              {guideRows.map((row, index) => {
                const Icon = row.icon;

                return (
                  <div
                    className="reveal grid grid-cols-[180px_1fr_140px] items-start gap-5 border-b border-[#050b141f] py-[22px] max-sm:grid-cols-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={row.title}
                  >
                    <strong className="inline-flex items-center gap-3 text-lg">
                      <Icon className="size-5 text-[#0a84ff]" strokeWidth={1.9} />
                      {row.title}
                    </strong>
                    <p className="text-[15px] leading-normal text-[#667085]">{row.text}</p>
                    <span className="text-right text-[13px] font-semibold text-[#0057d8] max-sm:text-left">
                      {row.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="support" className="bg-[#050b14] py-[60px] text-white">
          <div className={`${containerClass} grid grid-cols-2 items-center gap-[54px] max-[940px]:grid-cols-1`}>
            <div className="reveal">
              <Tag>MACVAULT CONCIERGE</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Support around the sale, not just a product list.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-white/70">
                Give buyers enough help to choose confidently, then move them to WhatsApp when they
                are ready.
              </p>
            </div>

            <div className="border-t border-white/20">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <div
                    className="reveal grid grid-cols-[180px_1fr] gap-5 border-b border-white/20 py-[22px] max-sm:grid-cols-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={service.title}
                  >
                    <strong className="inline-flex items-center gap-3">
                      <Icon className="size-5 text-[#0a84ff]" strokeWidth={1.9} />
                      {service.title}
                    </strong>
                    <span className="text-[15px] leading-normal text-white/70">
                      {service.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-linear-to-b from-white to-[#eef7ff] py-[60px] text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>TODAY&apos;S STOCK</Tag>
            <h2 className="mx-auto mt-2 max-w-[820px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Ask what is available before it is gone.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
              Get current iPhone, Mac, iPad, Apple Watch, accessory, and PS5 availability directly
              on WhatsApp.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products">WhatsApp MacVault</Cta>
              <Cta href="/products" variant="secondary">
                Review Products
              </Cta>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
