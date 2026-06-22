"use client";

import { useEffect } from "react";

const stockSignals = [
  {
    title: "iPhones",
    text: "Sealed, open-box, PTA and Non-PTA options.",
  },
  {
    title: "Macs",
    text: "Air, Pro, chip, storage, cycle count and warranty notes.",
  },
  {
    title: "PS5",
    text: "Console, controller and bundle availability.",
  },
  {
    title: "Accessories",
    text: "AirPods, chargers, cases and Apple essentials.",
  },
  {
    title: "Local Flow",
    text: "WhatsApp, pickup, delivery and reservation support.",
  },
];

const drops = [
  {
    tag: "iPhone",
    title: "iPhone 15 Pro Max",
    text: "PTA status, storage, color, box condition, and warranty shown before CTA.",
    action: "Check stock",
  },
  {
    tag: "Mac",
    title: "MacBook Air & Pro",
    text: "Chip, storage, battery cycle count, condition, and warranty support.",
    action: "See variants",
  },
  {
    tag: "Gaming",
    title: "PS5 Slim Bundles",
    text: "Console editions, controllers, games, and limited availability messaging.",
    action: "Reserve bundle",
  },
];

const whyRows = [
  {
    number: "01",
    title: "Verified stock before commitment.",
    text: "Buyers know what is actually available before they visit, pay, or reserve.",
  },
  {
    number: "02",
    title: "Condition is not hidden.",
    text: "Sealed, open-box, used, PTA, Non-PTA, and warranty details are visible.",
  },
  {
    number: "03",
    title: "WhatsApp-first buying flow.",
    text: "Every CTA moves a serious buyer into a fast conversation with product context.",
  },
  {
    number: "04",
    title: "Local support after the sale.",
    text: "Warranty expectations, delivery, pickup, and support are framed clearly.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose",
    text: "Select an iPhone, Mac, accessory, or PS5 bundle.",
  },
  {
    number: "02",
    title: "Confirm",
    text: "Review condition, PTA status, warranty, storage, and box contents.",
  },
  {
    number: "03",
    title: "Message",
    text: "Open WhatsApp with the selected product details already understood.",
  },
  {
    number: "04",
    title: "Reserve",
    text: "Arrange pickup, delivery, payment, or a short hold on available stock.",
  },
];

const guideRows = [
  {
    title: "Sealed",
    text: "New boxed units with full product details and warranty expectations.",
    note: "Highest trust",
  },
  {
    title: "Open Box",
    text: "Opened packaging, checked condition, usually better value than sealed.",
    note: "Best value",
  },
  {
    title: "Used",
    text: "Clearly listed physical condition, battery health, cycle count, and accessories.",
    note: "Budget option",
  },
  {
    title: "PTA / Non-PTA",
    text: "Shown clearly so phone buyers do not need to ask the same question twice.",
    note: "Critical detail",
  },
];

const services = [
  {
    title: "Before buying",
    text: "Guidance on storage, chip, PTA status, condition, and budget fit.",
  },
  {
    title: "During buying",
    text: "Reservation, pickup, delivery, and stock confirmation through WhatsApp.",
  },
  {
    title: "After buying",
    text: "Warranty expectations and support terms presented in plain language.",
  },
];

function Brand() {
  return (
    <a className="inline-flex min-w-max items-center gap-3 text-[15px] font-semibold" href="#">
      <span className="grid size-[34px] place-items-center rounded-full bg-linear-to-br from-[#007aff] to-[#165cff] text-white">
        M
      </span>
      <span>MacVault</span>
    </a>
  );
}

function Cta({
  children,
  href = "#",
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      className={
        variant === "primary"
          ? "inline-flex min-h-12 items-center justify-center rounded-full border border-[#007aff] bg-[#007aff] px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          : "inline-flex min-h-12 items-center justify-center rounded-full border border-[#007aff38] bg-white px-5 text-sm font-semibold text-[#0759c7] transition-transform duration-200 hover:-translate-y-0.5"
      }
      href={href}
    >
      {children}
    </a>
  );
}

function SectionHead({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="reveal mx-auto mb-11 max-w-[760px] text-center">
      <div className="text-[13px] font-bold text-[#007aff]">{kicker}</div>
      <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
        {title}
      </h2>
      <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
        {text}
      </p>
    </div>
  );
}

function ProductShowcase() {
  return (
    <div className="showcase reveal relative mx-auto mt-[58px] min-h-[330px] delay-100 max-sm:mt-10 max-sm:min-h-[250px]">
      <div className="absolute bottom-9 left-1/2 h-px w-[min(720px,88%)] -translate-x-1/2 bg-linear-to-r from-transparent via-[#07111f38] to-transparent" />
      <div className="mx-auto grid min-h-[330px] w-[min(780px,92%)] grid-cols-[0.72fr_1.16fr_0.72fr] items-end gap-[22px] max-sm:min-h-[250px] max-sm:gap-2">
        <div className="device-card relative justify-self-end rounded-[32px] border border-[#07111f1a] bg-white shadow-[0_18px_42px_rgba(7,17,31,0.1)] h-[236px] w-[138px] rotate-[-7deg] translate-y-1.5 max-sm:h-[138px] max-sm:w-[76px] max-sm:rounded-[22px]">
          <div className="absolute inset-[11px] rounded-[23px] bg-[linear-gradient(145deg,#111827_0_9%,#eaf4ff_9%_100%)] max-sm:rounded-[15px]" />
          <div className="absolute top-5 left-1/2 h-3.5 w-[52px] -translate-x-1/2 rounded-full bg-[#111827] max-sm:h-2.5 max-sm:w-8" />
        </div>

        <div className="device-card relative h-[230px] w-full rounded-t-[20px] rounded-b-lg border border-[#07111f1a] bg-white shadow-[0_18px_42px_rgba(7,17,31,0.1)] max-sm:h-[122px]">
          <div className="absolute inset-x-3.5 top-3.5 bottom-[26px] rounded-[10px] bg-[linear-gradient(155deg,#0d1628,#17243a_44%,#e7f2ff_44%_100%)]" />
          <div className="absolute bottom-[-18px] left-1/2 h-[22px] w-[108%] -translate-x-1/2 rounded-b-[18px] bg-linear-to-r from-[#c3ccda] via-white to-[#b6c0d0]" />
        </div>

        <div className="device-card relative justify-self-start rounded-[34px_16px_26px_34px] border border-[#07111f1a] bg-linear-to-br from-white via-[#dce7f5] to-white shadow-[0_18px_42px_rgba(7,17,31,0.1)] h-[230px] w-[138px] rotate-[6deg] translate-y-2 max-sm:h-[138px] max-sm:w-[76px] max-sm:rounded-[22px]">
          <div className="absolute top-4 right-[30px] h-[198px] w-8 rounded-full bg-[#101828] max-sm:top-[11px] max-sm:right-3.5 max-sm:h-28 max-sm:w-4" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal, .showcase, .timeline");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_36%,#f4f8ff_62%,#ffffff_100%)] text-[#07111f]">
      <div className="sticky top-[22px] z-20 mx-auto w-[min(1160px,calc(100%_-_40px))] px-5 max-sm:top-3.5 max-sm:w-[min(100%-28px,1160px)] max-sm:px-0">
        <header className="mx-auto flex min-h-[66px] items-center justify-between rounded-full border border-[#07111f1f] bg-white/98 py-[9px] pr-2.5 pl-5 shadow-[0_14px_34px_rgba(7,17,31,0.08)]">
          <Brand />

          <nav className="flex items-center gap-1 max-[940px]:hidden" aria-label="Main navigation">
            {["Drops", "Why Us", "Process", "Guide", "Support"].map((item) => (
              <a
                className="rounded-full px-3 py-2.5 text-sm font-medium text-[#687386] transition-colors hover:bg-[#007aff14] hover:text-[#07111f]"
                href={`#${item === "Why Us" ? "why" : item.toLowerCase()}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Cta>WhatsApp Stock</Cta>
            <button
              className="hidden size-11 place-items-center rounded-full border border-[#07111f1f] bg-white max-[940px]:grid"
              aria-label="Open menu"
            >
              &#9776;
            </button>
          </div>
        </header>
      </div>

      <main>
        <section className="relative mx-auto min-h-[calc(100vh-88px)] w-[min(1160px,calc(100%_-_40px))] pt-28 pb-[58px] text-center max-sm:w-[min(100%-28px,1160px)] max-sm:pt-[92px]">
          <div className="reveal">
            <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#007aff33] bg-white px-3.5 text-[13px] font-medium text-[#0759c7]">
              <span className="size-2 rounded-full bg-[#23c879]" />
              Premium Apple and PS5 drops
            </span>

            <h1 className="mx-auto mt-6 max-w-[1060px] text-[clamp(56px,9vw,118px)] leading-[0.94] font-semibold tracking-normal">
              Your next upgrade is <span className="text-[#007aff]">already here.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#687386]">
              MacVault curates verified iPhones, Macs, Apple accessories, and PS5 bundles with clear
              condition, warranty options, and fast WhatsApp ordering.
            </p>

            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta>Reserve a Drop</Cta>
              <Cta href="#drops" variant="secondary">
                View Highlights
              </Cta>
            </div>
          </div>

          <ProductShowcase />
        </section>

        <div className="border-y border-[#07111f1f] bg-white/70">
          <div className="mx-auto grid w-[min(1160px,calc(100%_-_40px))] grid-cols-5 max-[940px]:grid-cols-2 max-sm:w-[min(100%-28px,1160px)] max-sm:grid-cols-1">
            {stockSignals.map((item, index) => (
              <div
                className="reveal min-h-[92px] border-r border-[#07111f1f] px-[22px] py-5 last:border-r-0 max-[940px]:border-b max-sm:border-r-0"
                style={{ transitionDelay: `${Math.min(index, 3) * 100}ms` }}
                key={item.title}
              >
                <strong className="block text-[15px]">{item.title}</strong>
                <span className="mt-2 block text-[13px] leading-[1.35] text-[#687386]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <section id="drops" className="mx-auto w-[min(1160px,calc(100%_-_40px))] py-[104px] max-sm:w-[min(100%-28px,1160px)]">
          <SectionHead
            kicker="CURRENT DROPS"
            title="Product pages that sell through clarity, not clutter."
            text="Only the product-drop area uses cards. Everything else is built with spacing, dividers, bands, and useful buying information."
          />

          <div className="grid grid-cols-3 gap-[18px] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
            {drops.map((drop, index) => (
              <article
                className="reveal flex min-h-[430px] flex-col justify-between overflow-hidden rounded-lg border border-[#07111f1f] bg-white transition hover:-translate-y-1 hover:border-[#007aff52]"
                style={{ transitionDelay: `${index * 100}ms` }}
                key={drop.title}
              >
                <div className="min-h-[210px] border-b border-[#07111f1f] bg-linear-to-br from-white to-[#eaf4ff]" />
                <div className="p-[22px]">
                  <span className="inline-flex min-h-[30px] items-center rounded-full bg-[#007aff17] px-2.5 text-xs font-semibold text-[#0759c7]">
                    {drop.tag}
                  </span>
                  <h3 className="mt-4 mb-2 text-[25px] leading-[1.08] font-semibold">
                    {drop.title}
                  </h3>
                  <p className="text-[15px] leading-normal text-[#687386]">{drop.text}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#07111f1f] px-[22px] py-[18px] text-sm font-semibold text-[#007aff]">
                  <span>{drop.action}</span>
                  <span>&rarr;</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="border-y border-[#07111f1f] bg-white py-[104px]">
          <div className="mx-auto grid w-[min(1160px,calc(100%_-_40px))] grid-cols-[0.95fr_1.05fr] items-start gap-[60px] max-[940px]:grid-cols-1 max-sm:w-[min(100%-28px,1160px)]">
            <div className="reveal sticky top-[120px] max-[940px]:static">
              <div className="text-[13px] font-bold text-[#007aff]">WHY CHOOSE MACVAULT</div>
              <h2 className="mt-2 max-w-[500px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Less marketplace. More confidence.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
                MacVault should feel like a local showroom with clear product truth, not another
                grid of anonymous listings.
              </p>
            </div>

            <div className="border-t border-[#07111f1f]">
              {whyRows.map((row, index) => (
                <div
                  className="reveal grid grid-cols-[150px_1fr] gap-[26px] border-b border-[#07111f1f] py-[30px] max-sm:grid-cols-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={row.number}
                >
                  <span className="text-[13px] font-bold text-[#007aff]">{row.number}</span>
                  <div>
                    <h3 className="mb-2 text-[26px] font-semibold">{row.title}</h3>
                    <p className="max-w-[520px] text-base leading-[1.55] text-[#687386]">
                      {row.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#f4f8ff] py-[104px]">
          <div className="mx-auto w-[min(1160px,calc(100%_-_40px))] max-sm:w-[min(100%-28px,1160px)]">
            <SectionHead
              kicker="OUR PROCESS"
              title="From browsing to reservation in four steps."
              text="A direct flow for high-intent buyers who want details first and a human reply fast."
            />

            <div className="timeline reveal relative mt-12 grid grid-cols-4 border-t border-[#07111f29] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
              {steps.map((step) => (
                <div
                  className="min-h-60 border-r border-[#07111f1f] pt-7 pr-7 last:border-r-0 max-[940px]:border-b"
                  key={step.number}
                >
                  <div className="inline-flex size-[38px] items-center justify-center rounded-full border border-[#007aff42] bg-white text-[13px] font-bold text-[#007aff]">
                    {step.number}
                  </div>
                  <h3 className="mt-5 mb-2 text-2xl font-semibold">{step.title}</h3>
                  <p className="max-w-[230px] text-[15px] leading-normal text-[#687386]">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="guide" className="mx-auto w-[min(1160px,calc(100%_-_40px))] py-[104px] max-sm:w-[min(100%-28px,1160px)]">
          <div className="grid grid-cols-[0.8fr_1.2fr] items-start gap-[50px] max-[940px]:grid-cols-1">
            <div className="reveal">
              <div className="text-[13px] font-bold text-[#007aff]">BUYING GUIDE</div>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Make condition easy to understand.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
                This section gives MacVault a professional dealer feel and reduces repeated
                questions on WhatsApp.
              </p>
            </div>

            <div className="border-t border-[#07111f1f]">
              {guideRows.map((row, index) => (
                <div
                  className="reveal grid grid-cols-[150px_1fr_140px] items-start gap-5 border-b border-[#07111f1f] py-[22px] max-sm:grid-cols-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={row.title}
                >
                  <strong className="text-lg">{row.title}</strong>
                  <p className="text-[15px] leading-normal text-[#687386]">{row.text}</p>
                  <span className="text-right text-[13px] font-semibold text-[#0759c7] max-sm:text-left">
                    {row.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="support" className="bg-[#07111f] py-[86px] text-white">
          <div className="mx-auto grid w-[min(1160px,calc(100%_-_40px))] grid-cols-2 items-center gap-[54px] max-[940px]:grid-cols-1 max-sm:w-[min(100%-28px,1160px)]">
            <div className="reveal">
              <div className="text-[13px] font-bold text-[#75baff]">MACVAULT CONCIERGE</div>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Support around the sale, not just a product list.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-white/70">
                Give buyers enough help to choose confidently, then move them to WhatsApp when they
                are ready.
              </p>
            </div>

            <div className="border-t border-white/20">
              {services.map((service, index) => (
                <div
                  className="reveal grid grid-cols-[140px_1fr] gap-5 border-b border-white/20 py-[22px] max-sm:grid-cols-1"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={service.title}
                >
                  <strong>{service.title}</strong>
                  <span className="text-[15px] leading-normal text-white/70">{service.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-linear-to-b from-white to-[#eef7ff] py-28 text-center">
          <div className="reveal mx-auto w-[min(1160px,calc(100%_-_40px))] max-sm:w-[min(100%-28px,1160px)]">
            <div className="text-[13px] font-bold text-[#007aff]">TODAY&apos;S STOCK</div>
            <h2 className="mx-auto mt-2 max-w-[820px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Ask what is available before it is gone.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
              Get current iPhone, Mac, Apple accessory, and PS5 availability directly on WhatsApp.
            </p>
            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta>WhatsApp MacVault</Cta>
              <Cta href="#drops" variant="secondary">
                Review Drops
              </Cta>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-[38px] text-[#687386]">
        <div className="mx-auto flex w-[min(1160px,calc(100%_-_40px))] justify-between gap-5 border-t border-[#07111f1f] pt-6 max-sm:w-[min(100%-28px,1160px)] max-sm:flex-col">
          <Brand />
          <span>Premium Apple and PS5 drops with WhatsApp-first ordering.</span>
        </div>
      </footer>
    </div>
  );
}
