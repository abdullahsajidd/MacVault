"use client";

import Link from "next/link";
import { type CSSProperties, type PointerEvent, useEffect, useMemo, useState } from "react";
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
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Cta, Footer, Header, SectionHead, Tag, containerClass } from "@/components/site";
import { getCategorySlug, products } from "@/data/products";

const marqueeItems = ["IPHONE", "MACBOOK", "IPAD", "WATCH", "PS5", "AIRPODS", "ACCESSORIES"];

const verifiedCards = [
  {
    title: "Live stock checked",
    text: "Availability, color, box, and hold status confirmed before the visit.",
    icon: BadgeCheck,
  },
  {
    title: "Condition upfront",
    text: "PTA, battery, cycle count, warranty, and bundle contents listed early.",
    icon: ClipboardCheck,
  },
  {
    title: "Fast reserve flow",
    text: "WhatsApp starts with product context, not another blank conversation.",
    icon: MessageCircle,
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
  { number: "01", title: "Choose", text: "Select a product category or open a verified listing.", icon: Search },
  { number: "02", title: "Confirm", text: "Review condition, PTA status, warranty, and package contents.", icon: ClipboardCheck },
  { number: "03", title: "Message", text: "Open WhatsApp with the selected product details already understood.", icon: Send },
  { number: "04", title: "Reserve", text: "Arrange pickup, delivery, payment, or a short hold on available stock.", icon: CalendarCheck },
];

const guideRows = [
  { title: "Sealed", text: "New boxed units with clear warranty expectations.", note: "Highest trust", icon: PackageCheck },
  { title: "Open Box", text: "Checked packaging and condition for better value.", note: "Best value", icon: BadgeCheck },
  { title: "Used", text: "Battery, physical condition, accessories, and limits stated clearly.", note: "Budget option", icon: ClipboardCheck },
  { title: "PTA / Non-PTA", text: "Phone status is shown before the buyer has to ask.", note: "Critical detail", icon: ShieldCheck },
];

const benefits = [
  { title: "Verification", text: "Stock, box status, and product condition are confirmed before a buyer commits.", icon: BadgeCheck },
  { title: "Warranty clarity", text: "Warranty expectations and support terms are written in plain language.", icon: ShieldCheck },
  { title: "Pickup or delivery", text: "Local handoff options are part of the buying flow, not an afterthought.", icon: Truck },
  { title: "After-sale support", text: "Buyers can return to MacVault for practical help after the purchase.", icon: Headphones },
];

const services = [
  { title: "Before buying", text: "Guidance on storage, chip, PTA status, condition, and budget fit.", icon: Search },
  { title: "During buying", text: "Reservation, pickup, delivery, and stock confirmation through WhatsApp.", icon: MessageCircle },
  { title: "After buying", text: "Warranty expectations and support terms presented in plain language.", icon: ShieldCheck },
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

function ProductMarquee() {
  return (
    <section className="overflow-hidden border-y border-[#102a4314] bg-[#07111f] py-4 text-white">
      <div className="marquee-track flex w-max items-center gap-10">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span
            className="inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.22em] text-white/72"
            key={`${item}-${index}`}
          >
            <Sparkles className="size-4 text-[#45a3ff]" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function HeroVisual() {
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const tickInterval = setInterval(() => {
      setShowTick(true);
      const timeout = setTimeout(() => setShowTick(false), 2000);
      return () => clearTimeout(timeout);
    }, 4000);

    return () => clearInterval(tickInterval);
  }, []);

  return (
    <div
      className="hero-step hero-visual reveal relative mx-auto mt-12 mb-6 flex w-full max-w-[800px] select-none flex-col items-center justify-center px-5 max-sm:mt-8"
      style={{ "--step-delay": "240ms" } as CSSProperties}
      aria-label="MacVault verified stock animation"
    >
      <div className="relative flex aspect-[16/10] w-full max-w-[620px] flex-col overflow-hidden rounded-t-[20px] rounded-b-[4px] border-[10px] border-[#d9e8f8] bg-[#eef7ff] shadow-[0_25px_55px_-12px_rgba(10,132,255,0.22)] sm:border-[12px]">
        <div className="absolute top-0 left-1/2 z-30 flex h-[15px] w-[80px] -translate-x-1/2 items-center justify-center rounded-b-md bg-[#d9e8f8]">
          <div className="size-1 rounded-full border border-[#0a84ff40] bg-[#0a84ff]" />
        </div>

        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 font-sans">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem]" />
          <div className="pointer-events-none absolute h-[50%] w-[50%] rounded-full bg-white/10 blur-[40px]" />

          {showTick ? (
            <div className="animate-tick pointer-events-none absolute top-1/2 left-1/2 z-20 select-none">
              <svg
                className="size-20 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] filter"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ) : null}

          <div className="animate-brand absolute top-[18%] left-[15%] flex select-none items-center gap-1.5 rounded-full border border-blue-400/30 bg-white/50 px-3.5 py-1.5 text-[10px] font-extrabold tracking-wider text-[#0057d8] shadow-[0_0_20px_rgba(10,132,255,0.15)] backdrop-blur-md sm:text-xs">
            <BadgeCheck className="size-3.5 text-[#0a84ff]" />
            <span>MACVAULT</span>
          </div>

          <div className="animate-verified absolute bottom-[22%] left-[10%] flex select-none items-center gap-2 rounded-full border border-emerald-400/30 bg-white/50 px-3.5 py-1.5 text-[10px] font-extrabold tracking-wider text-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.12)] backdrop-blur-md sm:text-xs">
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>VERIFIED STOCK</span>
          </div>

          <div className="animate-sold absolute right-[10%] bottom-[30%] flex select-none items-center gap-2 rounded-full border border-rose-400/30 bg-white/50 px-3.5 py-1.5 text-[10px] font-extrabold tracking-wider text-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.12)] backdrop-blur-md sm:text-xs">
            <span className="relative flex size-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-rose-500" />
            </span>
            <span>SOLD DROP</span>
          </div>

          <div className="animate-verified absolute top-[20%] left-[38%] flex items-center gap-1.5 rounded-full border border-white/35 bg-white/35 px-2 py-1 text-[9px] font-semibold tracking-wide text-white backdrop-blur-xs [animation-delay:1.5s] sm:text-[10px]">
            <span>+ PTA Confirmed</span>
          </div>

          <div className="animate-sold absolute top-[24%] right-[32%] flex items-center gap-1.5 rounded-full border border-white/35 bg-white/35 px-2 py-1 text-[9px] font-semibold tracking-wide text-white backdrop-blur-xs [animation-delay:4.5s] sm:text-[10px]">
            <span>+ 8 Cycles</span>
          </div>

          <div className="absolute bottom-[10%] select-none font-sans text-[11px] font-bold tracking-[0.06em] text-white/10 uppercase sm:text-[12px]">
            MacVault Showroom
          </div>
        </div>
      </div>

      <div className="relative flex h-[12px] w-[108%] flex-col justify-start rounded-b-[12px] border-t border-white/70 bg-gradient-to-r from-[#d1d5db] via-[#e5e7eb] to-[#9ca3af] shadow-[0_12px_36px_rgba(10,132,255,0.15)] sm:h-[14px]">
        <div className="mx-auto h-[4px] w-[70px] rounded-b-[3px] bg-[#4b5563]" />
      </div>

      <div className="pointer-events-none mt-1 h-[8px] w-[104%] rounded-full bg-[#0a84ff1f] blur-[6px]" />
    </div>
  );
}

function LiveAvailabilitySection() {
  const categories = new Set(products.map((product) => product.category));
  const stats = [
    [String(products.length), "total products"],
    [String(categories.size), "active categories"],
    ["100%", "verified inventory"],
  ];

  return (
    <section className={`${containerClass} py-[60px]`}>
      <div className="reveal grid grid-cols-[0.8fr_1.2fr] gap-8 rounded-[8px] bg-white p-6 shadow-[0_18px_60px_rgba(5,20,44,0.08)] max-[940px]:grid-cols-1">
        <div>
          <Tag>Live availability</Tag>
          <h2 className="mt-3 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
            Product count, category coverage, and <span className="animated-text">verified</span>{" "}
            status.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-[#667085]">
            The availability section now reflects the actual product data instead of placeholder
            response metrics.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 max-[640px]:grid-cols-1">
          {stats.map(([value, label]) => (
            <div className="availability-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryLanesSection() {
  const categories = [
    {
      category: "iPhone",
      title: "iPhone",
      text: "PTA status, battery health, color, storage, and box condition framed before chat.",
      meta: "PTA / Non-PTA",
      icon: Smartphone,
      product: products.find((item) => item.category === "iPhone"),
    },
    {
      category: "Mac",
      title: "Mac",
      text: "Chip, cycle count, charger condition, storage, and warranty notes stay visible.",
      meta: "Air / Pro",
      icon: Laptop,
      product: products.find((item) => item.category === "Mac"),
    },
    {
      category: "PS5",
      title: "PS5",
      text: "Bundle contents, controller condition, warranty notes, and pickup timing clarified.",
      meta: "Disc / Slim",
      icon: Gamepad2,
      product: products.find((item) => item.category === "PS5"),
    },
  ];

  return (
    <section className={`${containerClass} py-[60px]`}>
      <SectionHead
        kicker="Product categories"
        title="Cleaner category lanes for faster decisions."
        accent="category"
        text="Each card links directly to a filtered category page and carries product context before the click."
      />

      <div className="grid grid-cols-3 gap-5 max-[940px]:grid-cols-1">
        {categories.map((item, index) => {
          const Icon = item.icon;
          const count = products.filter((product) => product.category === item.category).length;
          const product = item.product ?? products[0];

          return (
            <Link
              className="category-card reveal group"
              href={`/products/category/${getCategorySlug(item.category)}`}
              style={{ transitionDelay: `${index * 40}ms` }}
              key={item.title}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex min-h-9 items-center gap-2 rounded-full bg-[#0a84ff12] px-3 text-xs font-bold text-[#0057d8]">
                  <Icon className="size-4" />
                  {item.meta}
                </span>
                <span className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-bold text-[#14773d]">
                  {count} products
                </span>
              </div>
              <ProductVisual
                accent={product.accent}
                kind={product.gallery[0].kind}
                label={product.shortTitle}
                imageUrl={product.gallery[0].imageUrl}
                imageAlt={product.gallery[0].imageAlt}
                size="compact"
                className="mt-5 w-full"
              />
              <div className="mt-5">
                <h3 className="text-[30px] leading-none font-semibold">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#667085]">{item.text}</p>
                <span className="mt-5 inline-flex min-h-12 items-center gap-2 text-sm font-bold text-[#0057d8]">
                  Open category <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ProductListingSection() {
  return (
    <section id="inventory" className={`${containerClass} py-[60px]`}>
      <SectionHead
        kicker="Featured listings"
        title="Three lanes, cleaner decisions, full product images."
        accent="cleaner"
        text="The homepage listing uses uniform contained media frames so portrait and landscape images stay fully visible."
      />

      <div className="product-list-grid">
        {products.slice(0, 6).map((product, index) => (
          <article className="listing-card reveal" style={{ transitionDelay: `${index * 40}ms` }} key={product.slug}>
            <ProductVisual
              accent={product.accent}
              kind={product.gallery[0].kind}
              label={product.shortTitle}
              imageUrl={product.gallery[0].imageUrl}
              imageAlt={product.gallery[0].imageAlt}
              size="compact"
              className="w-full"
            />
            <div className="flex grow flex-col p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <Link
                  className="rounded-full bg-[#0a84ff17] px-2.5 py-1.5 text-[#0057d8] transition-colors duration-300 ease-out hover:bg-[#0a84ff] hover:text-white"
                  href={`/products/category/${getCategorySlug(product.category)}`}
                >
                  {product.category}
                </Link>
                <span className="rounded-full bg-[#23c87918] px-2.5 py-1.5 text-[#14773d]">
                  {product.status}
                </span>
              </div>
              <h3 className="text-[26px] leading-[1.08] font-semibold">{product.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#667085]">{product.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.specs.slice(0, 3).map((spec) => (
                  <span className="rounded-full border border-[#050b1414] bg-[#f5f5f7] px-3 py-1.5 text-xs font-medium text-[#667085]" key={spec}>
                    {spec}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <Cta href={`/products/${product.slug}`} icon={ArrowRight}>
                  View product
                </Cta>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BuyingBenefitsSection() {
  return (
    <section className="bg-white py-[60px]">
      <div className={containerClass}>
        <SectionHead
          kicker="Buying benefits"
          title="Support that covers more than the sale."
          accent="Support"
          text="Buyer Match is replaced with practical benefits that explain how MacVault reduces risk."
        />
        <div className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-sm:grid-cols-1">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <article className="benefit-card reveal" style={{ transitionDelay: `${index * 40}ms` }} key={benefit.title}>
                <Icon className="size-5 text-[#0a84ff]" />
                <h3 className="mt-8 text-2xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-[#667085]">{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const visibleTestimonials = useMemo(
    () => [0, 1, 2].map((offset) => testimonials[(activeSlide + offset) % testimonials.length]),
    [activeSlide],
  );

  const moveSlide = (direction: "prev" | "next") => {
    setActiveSlide((current) =>
      direction === "prev"
        ? (current - 1 + testimonials.length) % testimonials.length
        : (current + 1) % testimonials.length,
    );
  };

  return (
    <section className="bg-[#f4f9ff] py-[60px]">
      <div className={containerClass}>
        <div className="mb-10 flex items-end justify-between gap-6 max-[720px]:items-start">
          <div className="reveal max-w-[720px]">
            <Tag>Buyer notes</Tag>
            <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
              Real stories, smoother <span className="animated-text">transitions</span>.
            </h2>
            <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] max-sm:text-base">
              Six buyer stories around PTA status, warranty, package contents, and local
              availability.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="icon-button" type="button" onClick={() => moveSlide("prev")} aria-label="Previous testimonial">
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <button className="icon-button" type="button" onClick={() => moveSlide("next")} aria-label="Next testimonial">
              <ChevronRight className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="testimonial-stage">
          <div className="testimonial-track grid grid-cols-3 gap-5 max-[1040px]:grid-cols-2 max-[720px]:grid-cols-1" key={activeSlide}>
            {visibleTestimonials.map((testimonial) => (
              <article className="flex min-h-[300px] flex-col justify-between rounded-[8px] bg-white p-6 shadow-[inset_0_0_0_1px_rgba(10,132,255,0.10)]" key={testimonial.name}>
                <div>
                  <span className="grid size-11 place-items-center rounded-full bg-[#eef7ff] text-[#0a84ff]">
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
        </div>

        <div className="mt-7 flex justify-center gap-2" aria-label="Testimonial pagination">
          {testimonials.map((testimonial, index) => (
            <button
              className={`testimonial-dot ${index === activeSlide ? "is-active" : ""}`}
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

function WhyChooseSection() {
  const handleTilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--tilt-x", `${-y * 8}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 10}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <section id="why" className="section-anchor border-b border-[#102a431f] bg-white py-[60px]">
      <div className={containerClass}>
        <SectionHead
          kicker="Why choose MacVault"
          title="Less marketplace. More confidence."
          accent="confidence"
          text="MacVault should feel like a local showroom with clear product truth, not another grid of anonymous listings."
          align="left"
        />

        <div className="grid grid-cols-4 gap-4 max-[1180px]:grid-cols-2 max-sm:grid-cols-1">
          {whyRows.map((row, index) => {
            const Icon = row.icon;

            return (
              <article
                className="why-tilt-card reveal"
                style={{ transitionDelay: `${index * 40}ms` }}
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
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
  );
}

function ProcessSection() {
  return (
    <section id="process" className="section-anchor bg-[#f4f9ff] py-[60px]">
      <div className={containerClass}>
        <SectionHead
          kicker="Our process"
          title="From browsing to reservation in four steps."
          accent="reservation"
          text="A direct flow for high-intent buyers who want details first and a human reply fast."
        />

        <div className="grid grid-cols-4 gap-4 max-[940px]:grid-cols-2 max-sm:grid-cols-1">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article className="process-card reveal" style={{ transitionDelay: `${index * 40}ms` }} key={step.number}>
                <div className="inline-flex size-[42px] items-center justify-center rounded-full border border-[#0a84ff42] bg-white text-[#0a84ff]">
                  <Icon className="size-5" strokeWidth={1.9} />
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
  );
}

function GuideSection() {
  return (
    <section id="guide" className="section-anchor border-y border-[#102a431f] bg-white py-[60px]">
      <div className={containerClass}>
        <SectionHead
          kicker="Buying guide"
          title="Make condition easy to understand."
          accent="condition"
          text="This section gives MacVault a professional dealer feel and reduces repeated questions on WhatsApp."
        />

        <div className="overflow-hidden rounded-[8px] border border-[#102a431f]">
          {guideRows.map((row, index) => {
            const Icon = row.icon;

            return (
              <div className="reveal grid grid-cols-[220px_1fr_160px] items-center gap-5 border-b border-[#102a431f] bg-white p-5 last:border-b-0 max-[760px]:grid-cols-1" style={{ transitionDelay: `${index * 40}ms` }} key={row.title}>
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
  );
}

function SupportSection() {
  return (
    <section id="support" className="section-anchor bg-[#eef7ff] py-[60px] text-[#102a43]">
      <div className={containerClass}>
        <SectionHead
          kicker="MacVault concierge"
          title="Support around the sale, not just a product list."
          accent="Support"
          text="Give buyers enough help to choose confidently, then move them to WhatsApp when they are ready."
        />

        <div className="grid grid-cols-3 gap-4 max-[940px]:grid-cols-1">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article className="benefit-card reveal" style={{ transitionDelay: `${index * 40}ms` }} key={service.title}>
                <span className="mb-8 grid size-11 place-items-center rounded-full border border-[#0a84ff24] bg-[#0a84ff12] text-[#0a84ff]">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <h3 className="mb-3 text-[24px] font-semibold">{service.title}</h3>
                <p className="text-[15px] leading-normal text-[#667085]">{service.text}</p>
              </article>
            );
          })}
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
        <section className={`${containerClass} hero-section relative min-h-[calc(100vh-88px)] pt-32 pb-12 text-center max-sm:min-h-0 max-sm:pt-[106px] max-sm:pb-9`}>
          <div className="hero-content mx-auto max-w-[980px]">
            <div className="hero-step reveal" style={{ "--step-delay": "40ms" } as CSSProperties}>
              <Tag>Curated Apple and PS5 stock</Tag>
            </div>

            <h1 className="hero-step reveal hero-title mx-auto mt-6 max-w-[980px] text-[70px] leading-[0.98] font-semibold tracking-normal max-[768px]:text-[60px] max-[425px]:text-[42px] max-[375px]:text-[40px]" style={{ "--step-delay": "80ms" } as CSSProperties}>
              Premium Apple drops, <span className="animated-text">verified</span> before you chat.
            </h1>

            <p className="hero-step reveal hero-copy mx-auto mt-6 max-w-[760px] text-[21px] leading-[1.58] text-[#667085] max-[1024px]:text-[19px] max-[768px]:text-[18px] max-[425px]:text-[16px]" style={{ "--step-delay": "120ms" } as CSSProperties}>
              MacVault brings iPhones, Macs, Apple accessories, and PS5 bundles into a cleaner
              buying flow: condition first, warranty context clear, and reservation handled with
              intent.
            </p>

            <div className="hero-step reveal mt-[30px] flex flex-wrap justify-center gap-3" style={{ "--step-delay": "160ms" } as CSSProperties}>
              <Cta href="/products" icon={Search}>
                Browse stock
              </Cta>
              <Cta href="/products" variant="secondary" icon={MessageCircle}>
                WhatsApp
              </Cta>
            </div>

            <div className="hero-step reveal mx-auto mt-10 grid max-w-[960px] grid-cols-3 gap-3 max-[820px]:grid-cols-1" style={{ "--step-delay": "200ms" } as CSSProperties}>
              {verifiedCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article className="verified-stock-card" key={card.title}>
                    <Icon className="size-5 text-[#0a84ff]" />
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <HeroVisual />
        </section>

        <ProductMarquee />
        <LiveAvailabilitySection />
        <ProductListingSection />
        <CategoryLanesSection />
        <BuyingBenefitsSection />
        <TestimonialsSection />
        <WhyChooseSection />
        <ProcessSection />
        <GuideSection />
        <SupportSection />

        <section className="bg-linear-to-b from-white to-[#eef7ff] py-[60px] text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>Today&apos;s stock</Tag>
            <h2 className="mx-auto mt-2 max-w-[820px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
              Ask what is <span className="animated-text">available</span> before it is gone.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">
              Get current iPhone, Mac, iPad, Apple Watch, accessory, and PS5 availability directly
              on WhatsApp.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products" icon={MessageCircle}>
                WhatsApp MacVault
              </Cta>
              <Cta href="/products" icon={ArrowRight} variant="secondary">
                Review products
              </Cta>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
