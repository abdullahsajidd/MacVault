"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
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
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Cta, Footer, Header, SectionHead, Tag, containerClass } from "@/components/site";
import { products } from "@/data/products";

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
  },
  {
    name: "Mariam K.",
    role: "MacBook Air M3 buyer",
    text: "The MacBook cycle count and charger condition were clear from the start. I did not have to ask ten basic questions before reserving.",
  },
  {
    name: "Saad R.",
    role: "PS5 bundle buyer",
    text: "The bundle contents were confirmed on WhatsApp, then pickup was quick. The page made it easy to know what was actually available.",
  },
  {
    name: "Areeba S.",
    role: "iPad Pro buyer",
    text: "I wanted a gift and needed clean box details. The listing showed the important points, then the team confirmed everything quickly.",
  },
  {
    name: "Daniyal M.",
    role: "Apple Watch buyer",
    text: "Battery, band condition, and pickup timing were already clear. It felt like buying from a showroom, not chasing random posts.",
  },
  {
    name: "Zain H.",
    role: "AirPods Pro buyer",
    text: "The sealed status and warranty expectation were simple to check. WhatsApp was fast because the product details were already there.",
  },
];

const marqueeItems = ["IPHONE", "MACBOOK", "IPAD", "IWATCH", "PS5", "AIRPODS", "APPLE TV", "ACCESSORIES"];

const liveSignals = [
  ["12", "verified drops"],
  ["4", "ready today"],
  ["28m", "avg reply"],
];

const categoryLanes = [
  {
    title: "iPhone lane",
    text: "PTA status, battery health, color, storage, and box condition are framed before chat.",
    meta: "PTA / Non-PTA",
    icon: Smartphone,
  },
  {
    title: "Mac lane",
    text: "Chip, cycle count, charger condition, storage, and warranty notes stay visible.",
    meta: "Air / Pro",
    icon: Laptop,
  },
  {
    title: "Console lane",
    text: "PS5 bundle contents, controller condition, region, and pickup timing are clarified.",
    meta: "Disc / Slim",
    icon: Gamepad2,
  },
];

const verificationFlow = [
  "Stock photo or live video confirmation",
  "Condition note written in plain language",
  "Warranty and box contents checked",
  "Reservation details sent through WhatsApp",
];

const buyerMatches = [
  ["Budget buyer", "Used iPhone, clear PTA status, battery health first"],
  ["Creator", "MacBook Air or Pro with chip, RAM, storage, cycle count"],
  ["Gift buyer", "Sealed or open-box units with cleaner packaging notes"],
  ["Gamer", "PS5 bundle with controller, game, and pickup confirmation"],
];

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
    <div className="reveal relative mx-auto mt-12 mb-6 flex w-full max-w-[800px] select-none flex-col items-center justify-center px-5 max-sm:mt-8">
      {/* MacBook Screen Lid Frame */}
      <div className="relative flex aspect-[16/10] w-full max-w-[620px] flex-col overflow-hidden rounded-t-[20px] rounded-b-[4px] border-[10px] border-[#d9e8f8] bg-[#eef7ff] shadow-[0_25px_55px_-12px_rgba(10,132,255,0.22)] sm:border-[12px]">
        {/* Notch */}
        <div className="absolute h-[15px] w-[80px] bg-[#d9e8f8] rounded-b-md top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
          {/* Webcam Lens */}
          <div className="size-1 rounded-full border border-[#0a84ff40] bg-[#0a84ff]" />
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
          <div className="absolute left-[15%] top-[18%] animate-brand flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-white/50 backdrop-blur-md px-3.5 py-1.5 text-[#0057d8] font-extrabold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(10,132,255,0.15)] select-none">
            <BadgeCheck className="size-3.5 text-[#0a84ff]" />
            <span>MACVAULT</span>
          </div>

          {/* Floating 'VERIFIED' check badge */}
          <div className="absolute left-[10%] bottom-[22%] animate-verified flex items-center gap-2 rounded-full border border-emerald-400/30 bg-white/50 backdrop-blur-md px-3.5 py-1.5 text-emerald-600 font-extrabold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.12)] select-none">
            <span className="relative flex size-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500"></span>
            </span>
            <span>VERIFIED STOCK</span>
          </div>

          {/* Floating 'SOLD' badge */}
          <div className="absolute right-[10%] bottom-[30%] animate-sold flex items-center gap-2 rounded-full border border-rose-400/30 bg-white/50 backdrop-blur-md px-3.5 py-1.5 text-rose-600 font-extrabold text-[10px] sm:text-xs tracking-wider shadow-[0_0_20px_rgba(244,63,94,0.12)] select-none">
            <span className="relative flex size-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-1.5 bg-rose-500"></span>
            </span>
            <span>SOLD DROP</span>
          </div>

          {/* Abstract floating bubbles for context */}
          <div className="absolute left-[38%] top-[20%] animate-verified [animation-delay:1.5s] flex items-center gap-1.5 rounded-full border border-white/35 bg-white/35 backdrop-blur-xs px-2 py-1 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide">
            <span>+ PTA Confirmed</span>
          </div>

          <div className="absolute right-[32%] top-[24%] animate-sold [animation-delay:4.5s] flex items-center gap-1.5 rounded-full border border-white/35 bg-white/35 backdrop-blur-xs px-2 py-1 text-white text-[9px] sm:text-[10px] font-semibold tracking-wide">
            <span>+ 8 Cycles</span>
          </div>

          {/* Watermark inside screen */}
          <div className="absolute bottom-[10%] text-[11px] sm:text-[12px] font-bold tracking-[0.06em] text-white/10 select-none font-sans uppercase">
            MacVault Showroom
          </div>
        </div>
      </div>

      {/* Laptop Keyboard Base */}
      <div className="relative flex h-[12px] w-[108%] flex-col justify-start rounded-b-[12px] border-t border-white/70 bg-gradient-to-r from-[#d1d5db] via-[#e5e7eb] to-[#9ca3af] shadow-[0_12px_36px_rgba(10,132,255,0.15)] sm:h-[14px]">
        {/* Notch indentation for opening screen */}
        <div className="w-[70px] h-[4px] bg-[#4b5563] mx-auto rounded-b-[3px]" />
      </div>

      {/* Floor reflection shadow */}
      <div className="w-[104%] h-[8px] bg-[#0a84ff1f] rounded-full blur-[6px] mt-1 pointer-events-none" />
    </div>
  );
}

function ProductMarquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-[#102a431f] bg-white">
      <div className="marquee-track flex w-max items-center py-8">
        {loop.map((item, index) => (
          <div className="flex items-center" key={`${item}-${index}`}>
            <span className="px-7 text-[clamp(42px,8vw,104px)] leading-none font-semibold tracking-normal whitespace-nowrap text-[#102a43]">
              {item}
            </span>
            <span className="size-2 rounded-full bg-[#0a84ff]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveAvailabilitySection() {
  return (
    <section className="section-anchor bg-[#eef7ff] py-[64px] text-[#102a43] max-sm:py-12">
      <div className={`${containerClass} flex flex-col gap-6`}>
        <div className="reveal flex items-end justify-between gap-8 rounded-[8px] bg-white p-6 shadow-[0_22px_60px_rgba(10,132,255,0.08)] max-[900px]:items-start max-[900px]:flex-col">
          <div className="max-w-[760px]">
            <Tag>LIVE AVAILABILITY</Tag>
            <h2 className="mt-4 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Current drops with real product context.
            </h2>
            <p className="mt-5 max-w-[560px] text-[17px] leading-[1.56] text-[#667085]">
              Availability should feel current, visual, filtered, and worth messaging about.
            </p>
          </div>
          <div className="grid min-w-[420px] grid-cols-3 overflow-hidden rounded-[8px] bg-[#f4f9ff] max-[900px]:min-w-0 max-[900px]:w-full">
            {liveSignals.map(([value, label]) => (
              <div className="hover-lift border-r border-white p-5 last:border-r-0" key={label}>
                <strong className="block text-3xl leading-none text-[#0057d8]">{value}</strong>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#667085]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[1120px]:grid-cols-2 max-[720px]:grid-cols-1">
          {products.slice(0, 6).map((product, index) => (
            <article
              className="reveal hover-lift overflow-hidden rounded-[8px] bg-white p-4 shadow-[0_18px_45px_rgba(5,20,44,0.06)]"
              style={{ transitionDelay: `${index * 70}ms` }}
              key={product.slug}
            >
              <ProductVisual
                accent={product.accent}
                kind={product.gallery[0].kind}
                label={product.shortTitle}
                size="compact"
                className="min-h-[190px] border-0"
              />
              <div className="mt-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-[#e9f4ff] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0057d8]">
                    {product.status}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#667085]">
                    {product.category}
                  </span>
                </div>
                <h3 className="mt-3 text-[22px] font-semibold leading-tight text-[#102a43]">{product.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-[1.55] text-[#667085]">{product.summary}</p>
                <div className="mt-4">
                  <Cta className="min-h-10 px-4 text-xs" href={`/products/${product.slug}`} icon={ArrowRight} variant="secondary">
                    View more
                  </Cta>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryLanesSection() {
  return (
    <section className="section-anchor bg-white py-[64px] max-sm:py-12">
      <div className={containerClass}>
        <div className="reveal mb-10 flex items-end justify-between gap-8 max-[900px]:items-start max-[900px]:flex-col">
          <div>
            <Tag>SHOP BY INTENT</Tag>
            <h2 className="mt-3 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Three lanes, cleaner decisions.
            </h2>
          </div>
          <p className="max-w-[680px] text-[17px] leading-[1.6] text-[#667085]">
            Buyers should enter through the kind of product they want, then see the details that
            actually matter for that category.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[980px]:grid-cols-1">
          {categoryLanes.map((lane, index) => {
            const Icon = lane.icon;
            const tones = [
              "bg-[#f7fbff] text-[#102a43] shadow-[inset_0_0_0_1px_rgba(10,132,255,0.10)]",
              "bg-[#edf8f3] text-[#102a43] shadow-[inset_0_0_0_1px_rgba(35,200,121,0.14)]",
              "bg-[#fff7ec] text-[#102a43] shadow-[inset_0_0_0_1px_rgba(255,159,10,0.16)]",
            ];

            return (
              <article
                className={`reveal hover-lift min-h-[330px] rounded-[8px] p-6 ${tones[index]}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                key={lane.title}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid size-12 place-items-center rounded-full ${
                      index === 1 ? "bg-white text-[#0057d8]" : "bg-white text-[#0a84ff]"
                    }`}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0057d8]">
                    {lane.meta}
                  </span>
                </div>
                <h3 className="mt-20 text-[30px] leading-none font-semibold max-sm:mt-14">{lane.title}</h3>
                <p className="mt-5 text-[15px] leading-[1.6] text-[#667085]">
                  {lane.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VerificationWorkflowSection() {
  return (
    <section className="section-anchor bg-[#f4f9ff] py-[64px] max-sm:py-12">
      <div className={`${containerClass} grid grid-cols-[1.05fr_0.95fr] gap-10 max-[980px]:grid-cols-1`}>
        <div className="reveal">
          <Tag>WHY TRUST US</Tag>
          <h2 className="mt-3 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
            Trust details before price pressure.
          </h2>
          <p className="mt-5 max-w-[650px] text-[17px] leading-[1.6] text-[#667085]">
            A premium reseller page should calm the buyer before it sells. The layout now gives
            verification its own moment instead of hiding it inside product text.
          </p>
        </div>

        <div className="reveal grid gap-3">
          {verificationFlow.map((item, index) => (
            <div className="hover-lift grid grid-cols-[56px_1fr] rounded-[8px] bg-white shadow-[0_12px_34px_rgba(5,20,44,0.05)]" key={item}>
              <div className="grid place-items-center text-sm font-bold text-[#0a84ff]">
                0{index + 1}
              </div>
              <div className="flex min-h-[84px] items-center gap-4 p-5">
                <ShieldCheck className="size-5 shrink-0 text-[#0a84ff]" strokeWidth={2} />
                <p className="text-[17px] font-medium leading-snug text-[#102a43]">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuyerMatchSection() {
  return (
    <section className="section-anchor bg-white py-[64px] max-sm:py-12">
      <div className={containerClass}>
        <div className="reveal mb-10 max-w-[780px]">
          <Tag>BUYER MATCH</Tag>
          <h2 className="mt-3 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
            Make the right drop feel obvious.
          </h2>
        </div>

        <div className="reveal overflow-hidden rounded-[8px] border border-[#102a431f]">
          {buyerMatches.map(([buyer, detail], index) => (
            <div
              className="grid grid-cols-[260px_1fr_auto] items-center gap-5 border-b border-[#102a431f] bg-white p-5 last:border-b-0 max-[820px]:grid-cols-1"
              key={buyer}
            >
              <strong className="text-[22px] leading-tight text-[#102a43]">{buyer}</strong>
              <p className="text-[15px] leading-[1.55] text-[#667085]">{detail}</p>
              <span className="rounded-full bg-[#0a84ff12] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0057d8] max-[820px]:w-fit">
                Match 0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const visibleTestimonials = [
    testimonials[activeSlide],
    testimonials[(activeSlide + 1) % testimonials.length],
    testimonials[(activeSlide + 2) % testimonials.length],
  ];

  const moveSlide = (direction: "prev" | "next") => {
    setActiveSlide((current) =>
      direction === "next"
        ? (current + 1) % testimonials.length
        : (current - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="section-anchor bg-white py-[56px] max-sm:py-11">
      <div className={containerClass}>
        <div className="reveal mb-10 flex items-end justify-between gap-8 max-[820px]:items-start max-[820px]:flex-col">
          <div className="max-w-[780px]">
            <Tag>BUYER FEEDBACK</Tag>
            <h2 className="mt-2 max-w-[720px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
              Clear before the chat starts.
            </h2>
            <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] max-sm:text-base">
              Six buyer stories around PTA status, warranty, package contents, and local availability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="grid size-11 place-items-center rounded-full bg-[#eef7ff] text-[#0057d8] transition hover:-translate-y-0.5 hover:bg-[#0a84ff] hover:text-white"
              type="button"
              onClick={() => moveSlide("prev")}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <button
              className="grid size-11 place-items-center rounded-full bg-[#eef7ff] text-[#0057d8] transition hover:-translate-y-0.5 hover:bg-[#0a84ff] hover:text-white"
              type="button"
              onClick={() => moveSlide("next")}
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1">
          {visibleTestimonials.map((testimonial, index) => (
            <article
              className="reveal hover-lift flex min-h-[300px] flex-col justify-between rounded-[8px] bg-[#f7fbff] p-6 shadow-[inset_0_0_0_1px_rgba(10,132,255,0.10)]"
              style={{ transitionDelay: `${index * 90}ms` }}
              key={`${testimonial.name}-${activeSlide}`}
            >
              <div>
                <span className="grid size-11 place-items-center rounded-full bg-white text-[#0a84ff] shadow-[0_10px_24px_rgba(10,132,255,0.12)]">
                  <Quote className="size-5" strokeWidth={2} />
                </span>
                <div className="mt-7 mb-3 flex gap-1 text-[#0a84ff]" aria-label="5 star rating">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <Star className="size-4 fill-current" strokeWidth={1.8} key={item} />
                  ))}
                </div>
                <p className="text-[20px] leading-[1.42] font-medium text-[#102a43] max-sm:text-[18px]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
              <div className="mt-7 text-sm">
                <strong className="block text-[#102a43]">{testimonial.name}</strong>
                <span className="text-[#667085]">{testimonial.role}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex justify-center gap-2" aria-label="Testimonial pagination">
          {testimonials.map((testimonial, index) => (
            <button
              className={`h-2.5 rounded-full transition-all ${
                index === activeSlide ? "w-9 bg-[#0a84ff]" : "w-2.5 bg-[#d8eafd] hover:bg-[#8fc9ff]"
              }`}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show testimonial ${index + 1}: ${testimonial.name}`}
              key={testimonial.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_42%,#ffffff_100%)] text-[#102a43]">
      <RevealController />
      <Header />

      <main className="pt-[50px]">
        <section className={`${containerClass} relative min-h-[calc(100vh-88px)] pt-32 pb-12 text-center max-sm:min-h-0 max-sm:pt-[106px] max-sm:pb-9`}>
          <div className="reveal hero-content mx-auto max-w-[980px]">
            <Tag>Curated Apple and PS5 stock</Tag>

            <h1 className="hero-title mx-auto mt-6 max-w-[980px] text-[70px] leading-[0.98] font-semibold tracking-normal max-[768px]:text-[60px] max-[425px]:text-[42px] max-[375px]:text-[40px]">
              Premium Apple drops, <span className="hero-accent-word">verified</span> before you chat.
            </h1>

            <p className="hero-copy mx-auto mt-6 max-w-[760px] text-[21px] leading-[1.58] text-[#667085] max-[1024px]:text-[19px] max-[768px]:text-[18px] max-[425px]:text-[16px]">
              MacVault brings iPhones, Macs, Apple accessories, and PS5 bundles into a cleaner
              buying flow: condition first, warranty context clear, and reservation handled with
              intent.
            </p>

            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products">Request a quote</Cta>
              <Cta href="#drops" variant="secondary" icon={MessageCircle}>
                WhatsApp
              </Cta>
            </div>

            <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-4 overflow-hidden rounded-[8px] border border-[#102a431f] bg-white/70 text-center max-[768px]:grid-cols-2 max-sm:grid-cols-1">
              {[
                ["Verified", "stock status"],
                ["Clear", "condition notes"],
                ["Direct", "WhatsApp reserve"],
                ["Protected", "warranty notes"],
              ].map(([title, text]) => (
                <div className="hover-lift border-r border-[#102a431f] p-5 last:border-r-0 max-[768px]:border-b max-[768px]:even:border-r-0 max-sm:border-r-0 max-sm:last:border-b-0" key={title}>
                  <strong className="block text-[15px] font-semibold">{title}</strong>
                  <span className="mt-1 block text-[13px] leading-normal text-[#667085]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <HeroMacbookAnimation />
        </section>

        <div className="border-y border-[#102a431f] bg-white">
          <div className={`${containerClass} grid grid-cols-5 max-[1040px]:grid-cols-3 max-[720px]:grid-cols-2 max-sm:grid-cols-1`}>
            {stockSignals.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="reveal hover-lift min-h-[78px] border-r border-[#102a431f] p-5 last:border-r-0 max-[1040px]:border-b max-sm:border-r-0"
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

        <LiveAvailabilitySection />
        <CategoryLanesSection />
        <VerificationWorkflowSection />
        <BuyerMatchSection />
        <section id="drops" className={`section-anchor ${containerClass} py-[56px] max-sm:py-11`}>
          <SectionHead
            kicker="CURRENT DROPS"
            title="Focused product pages built for serious buyers."
            text="Each drop leads to a detail page with gallery, condition notes, specs, package contents, and a direct WhatsApp-style CTA."
          />

          <div className="flex flex-col gap-5">
            {products.slice(0, 6).map((product, index) => {
              const storageVal = product.details.find((d) => d.label === "Storage")?.value?.replace("GB", "") || "256";
              const ptaStatus = product.category === "iPhone" ? "PTA Approved" : null;

              return (
                <article
                  className="reveal hover-lift grid grid-cols-1 items-center gap-5 overflow-hidden rounded-[8px] bg-white p-5 md:grid-cols-[0.32fr_0.68fr]"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={product.slug}
                >
                  <ProductVisual
                    accent={product.accent}
                    kind={product.gallery[0].kind}
                    label={product.shortTitle}
                    size="compact"
                    className="h-full min-h-[220px] w-full rounded-[8px] max-sm:min-h-[200px]"
                  />
                  <div className="flex flex-col items-start p-0 text-left max-sm:pt-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                      <span className="rounded-full bg-[#0a84ff17] px-2.5 py-1 text-[#0057d8]">
                        {product.category}
                      </span>
                      <span className="rounded-full bg-[#23c87917] px-2.5 py-1 text-[#14773d]">{product.status}</span>
                    </div>

                    <h3 className="mb-2 text-2xl md:text-3xl font-extrabold text-[#102a43] leading-snug">
                      {product.title}
                    </h3>

                    {/* Spec Pill Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="rounded-md border border-[#102a4314] bg-[#f5f5f7] px-2.5 py-1 text-xs font-bold text-[#667085]">
                        {product.shortTitle}
                      </span>
                      <span className="rounded-md border border-[#102a4314] bg-[#f5f5f7] px-2.5 py-1 text-xs font-bold text-[#667085]">
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

          <div className="reveal mt-6 text-center">
            <Cta href="/products" variant="secondary">
              See all products
            </Cta>
          </div>
        </section>

        <TestimonialsSection />

        <section id="why" className="section-anchor border-b border-[#102a431f] bg-white py-[56px] max-sm:py-11">
          <div className={containerClass}>
            <div className="reveal mb-10 max-w-[740px]">
              <Tag>WHY CHOOSE MACVAULT</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
                Less marketplace. More confidence.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
                MacVault should feel like a local showroom with clear product truth, not another
                grid of anonymous listings.
              </p>
            </div>

            <div className="grid grid-cols-4 border-t border-[#102a431f] max-[1180px]:grid-cols-2 max-sm:grid-cols-1">
              {whyRows.map((row, index) => {
                const Icon = row.icon;

                return (
                  <article
                    className="reveal min-h-[240px] border-r border-b border-[#102a431f] p-5 last:border-r-0 max-[1180px]:even:border-r-0 max-sm:border-r-0"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={row.number}
                  >
                    <div className="mb-8 flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-full border border-[#0a84ff24] bg-white text-[#0a84ff]">
                        <Icon className="size-5" strokeWidth={1.9} />
                      </span>
                      <span className="text-[13px] font-bold text-[#0a84ff]">{row.number}</span>
                    </div>
                    <h3 className="mb-3 text-[24px] leading-tight font-semibold">{row.title}</h3>
                    <p className="text-base leading-[1.55] text-[#667085]">{row.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="reveal mt-8">
              <Cta href="/why-buy-from-us" icon={ArrowRight} variant="secondary">
                Read why buy from us
              </Cta>
            </div>
          </div>
        </section>

        <section id="process" className="section-anchor bg-[#f4f9ff] py-[56px] max-sm:py-11">
          <div className={containerClass}>
            <SectionHead
              kicker="OUR PROCESS"
              title="From browsing to reservation in four steps."
              text="A direct flow for high-intent buyers who want details first and a human reply fast."
            />

            <div className="timeline reveal relative mt-10 grid grid-cols-4 overflow-hidden rounded-[8px] border border-[#102a4329] bg-white/35 max-[940px]:grid-cols-2 max-sm:mt-8 max-sm:grid-cols-1">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    className="min-h-56 border-r border-[#102a431f] p-5 last:border-r-0 max-[940px]:border-b max-sm:min-h-0 max-sm:border-r-0"
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

        <section id="guide" className="section-anchor border-y border-[#102a431f] bg-white py-[56px] max-sm:py-11">
          <div className={containerClass}>
            <div className="reveal mx-auto mb-10 max-w-[760px] text-center">
              <Tag>BUYING GUIDE</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
                Make condition easy to understand.
              </h2>
              <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] max-sm:text-base">
                This section gives MacVault a professional dealer feel and reduces repeated
                questions on WhatsApp.
              </p>
            </div>

            <div className="border-y border-[#102a431f]">
              {guideRows.map((row, index) => {
                const Icon = row.icon;

                return (
                  <div
                    className="reveal grid grid-cols-[220px_1fr_160px] items-center gap-5 border-b border-[#102a431f] bg-white p-5 last:border-b-0 max-[760px]:grid-cols-1"
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

        <section id="support" className="section-anchor bg-[#eef7ff] py-[56px] text-[#102a43] max-sm:py-11">
          <div className={containerClass}>
            <div className="reveal mx-auto mb-10 max-w-[760px] text-center">
              <Tag>MACVAULT CONCIERGE</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
                Support around the sale, not just a product list.
              </h2>
              <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] max-sm:text-base">
                Give buyers enough help to choose confidently, then move them to WhatsApp when they
                are ready.
              </p>
            </div>

            <div className="grid grid-cols-3 border-y border-[#0a84ff24] max-[940px]:grid-cols-1">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <article
                    className="reveal min-h-[210px] border-r border-[#0a84ff24] bg-white p-5 last:border-r-0 max-[940px]:border-r-0 max-[940px]:border-b max-[940px]:last:border-b-0"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={service.title}
                  >
                    <span className="mb-8 grid size-11 place-items-center rounded-full border border-[#0a84ff24] bg-[#0a84ff12] text-[#0a84ff]">
                      <Icon className="size-5" strokeWidth={1.9} />
                    </span>
                    <h3 className="mb-3 text-[24px] font-semibold">{service.title}</h3>
                    <p className="text-[15px] leading-normal text-[#667085]">
                      {service.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-linear-to-b from-white to-[#eef7ff] py-[56px] text-center max-sm:py-11">
          <div className={`reveal ${containerClass}`}>
            <Tag>TODAY&apos;S STOCK</Tag>
            <h2 className="mx-auto mt-2 max-w-[820px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
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
