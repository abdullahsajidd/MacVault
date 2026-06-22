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
import Link from "next/link";
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

function ProductShowcase() {
  return (
    <div className="showcase reveal relative mx-auto mt-[58px] min-h-[330px] delay-100 max-sm:mt-10 max-sm:min-h-[250px]">
      <div className="absolute bottom-9 left-1/2 h-px w-[min(720px,88%)] -translate-x-1/2 bg-linear-to-r from-transparent via-[#07111f38] to-transparent" />
      <div className="mx-auto grid min-h-[330px] w-[min(780px,92%)] grid-cols-[0.72fr_1.16fr_0.72fr] items-end gap-[22px] max-sm:min-h-[250px] max-sm:gap-2">
        <div className="device-card relative h-[236px] w-[138px] rotate-[-7deg] translate-y-1.5 justify-self-end rounded-[32px] border border-[#07111f1a] bg-white shadow-[0_18px_42px_rgba(7,17,31,0.1)] max-sm:h-[138px] max-sm:w-[76px] max-sm:rounded-[22px]">
          <div className="absolute inset-[11px] rounded-[23px] bg-[linear-gradient(145deg,#111827_0_9%,#eaf4ff_9%_100%)] max-sm:rounded-[15px]" />
          <div className="absolute top-5 left-1/2 h-3.5 w-[52px] -translate-x-1/2 rounded-full bg-[#111827] max-sm:h-2.5 max-sm:w-8" />
        </div>

        <div className="device-card relative h-[230px] w-full rounded-t-[20px] rounded-b-lg border border-[#07111f1a] bg-white shadow-[0_18px_42px_rgba(7,17,31,0.1)] max-sm:h-[122px]">
          <div className="absolute inset-x-3.5 top-3.5 bottom-[26px] rounded-[10px] bg-[linear-gradient(155deg,#0d1628,#17243a_44%,#e7f2ff_44%_100%)]" />
          <div className="absolute bottom-[-18px] left-1/2 h-[22px] w-[108%] -translate-x-1/2 rounded-b-[18px] bg-linear-to-r from-[#c3ccda] via-white to-[#b6c0d0]" />
        </div>

        <div className="device-card relative h-[230px] w-[138px] rotate-[6deg] translate-y-2 justify-self-start rounded-[34px_16px_26px_34px] border border-[#07111f1a] bg-linear-to-br from-white via-[#dce7f5] to-white shadow-[0_18px_42px_rgba(7,17,31,0.1)] max-sm:h-[138px] max-sm:w-[76px] max-sm:rounded-[22px]">
          <div className="absolute top-4 right-[30px] h-[198px] w-8 rounded-full bg-[#101828] max-sm:top-[11px] max-sm:right-3.5 max-sm:h-28 max-sm:w-4" />
        </div>
      </div>
    </div>
  );
}

function ProductMarquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-[#07111f1f] bg-white">
      <div className="marquee-track flex w-max items-center py-8">
        {loop.map((item, index) => (
          <div className="flex items-center" key={`${item}-${index}`}>
            <span className="px-7 text-[clamp(42px,8vw,104px)] leading-none font-semibold tracking-normal whitespace-nowrap text-[#07111f]">
              {item}
            </span>
            <span className="size-2 rounded-full bg-[#007aff]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_36%,#f4f8ff_62%,#ffffff_100%)] text-[#07111f]">
      <RevealController />
      <Header />

      <main>
        <section className={`${containerClass} relative min-h-[calc(100vh-88px)] pt-28 pb-[58px] text-center max-sm:pt-[92px]`}>
          <div className="reveal">
            <Tag>Premium Apple and PS5 drops</Tag>

            <h1 className="mx-auto mt-6 max-w-[1060px] text-[clamp(56px,9vw,118px)] leading-[0.94] font-semibold tracking-normal">
              Your next upgrade is <span className="text-[#007aff]">already here.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-[720px] text-[clamp(17px,2vw,21px)] leading-[1.58] text-[#687386]">
              MacVault curates verified iPhones, Macs, iPads, Apple Watch, accessories, and PS5
              bundles with clear condition, warranty notes, and fast WhatsApp ordering.
            </p>

            <div className="mt-[30px] flex flex-wrap justify-center gap-3">
              <Cta href="/products">Reserve a Drop</Cta>
              <Cta href="#drops" variant="secondary">
                View Highlights
              </Cta>
            </div>
          </div>

          <ProductShowcase />
        </section>

        <div className="border-y border-[#07111f1f] bg-white">
          <div className={`${containerClass} grid grid-cols-5 max-[1040px]:grid-cols-3 max-[720px]:grid-cols-2 max-sm:grid-cols-1`}>
            {stockSignals.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  className="reveal min-h-[78px] border-r border-[#07111f1f] px-5 py-4 last:border-r-0 max-[1040px]:border-b max-sm:border-r-0"
                  style={{ transitionDelay: `${Math.min(index, 3) * 100}ms` }}
                  key={item.title}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#007aff12] text-[#007aff]">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <div>
                      <strong className="block text-[15px] leading-tight">{item.title}</strong>
                      <span className="mt-1.5 block text-[13px] leading-[1.35] text-[#687386]">
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

        <section id="drops" className={`${containerClass} py-[104px]`}>
          <SectionHead
            kicker="CURRENT DROPS"
            title="Focused product pages built for serious buyers."
            text="Each drop leads to a detail page with gallery, condition notes, specs, package contents, and a direct WhatsApp-style CTA."
          />

          <div className="grid grid-cols-3 gap-[18px] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
            {featuredProducts.map((product, index) => (
              <article
                className="reveal overflow-hidden rounded-lg border border-[#07111f1f] bg-white transition hover:-translate-y-1 hover:border-[#007aff52]"
                style={{ transitionDelay: `${index * 100}ms` }}
                key={product.slug}
              >
                <ProductVisual
                  accent={product.accent}
                  kind={product.gallery[0].kind}
                  label={product.shortTitle}
                  size="compact"
                />
                <div className="p-[22px]">
                  <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold">
                    <span className="rounded-full bg-[#007aff17] px-2.5 py-1.5 text-[#0759c7]">
                      {product.category}
                    </span>
                    <span className="text-[#687386]">{product.status}</span>
                  </div>
                  <h3 className="mb-2 text-[25px] leading-[1.08] font-semibold">{product.title}</h3>
                  <p className="text-[15px] leading-normal text-[#687386]">{product.summary}</p>
                  <Link
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#007aff]"
                    href={`/products/${product.slug}`}
                  >
                    View product <ArrowRight className="size-4" strokeWidth={2} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="reveal mt-9 text-center">
            <Cta href="/products" variant="secondary">
              See all products
            </Cta>
          </div>
        </section>

        <section id="testimonials" className="border-y border-[#07111f1f] bg-white py-[104px]">
          <div className={`${containerClass} grid grid-cols-[0.82fr_1.18fr] items-start gap-[58px] max-[940px]:grid-cols-1`}>
            <div className="reveal sticky top-[120px] max-[940px]:static">
              <Tag>BUYER FEEDBACK</Tag>
              <h2 className="mt-2 max-w-[520px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                The experience should feel clear before the chat starts.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
                MacVault’s product pages remove the usual uncertainty around PTA status, warranty,
                package contents, and local availability.
              </p>
              <div className="mt-7 flex gap-2" aria-label="Active testimonial">
                {testimonials.map((testimonial) => (
                  <span
                    className={`h-1 rounded-full ${
                      testimonial.active ? "w-1 bg-[#007aff]" : "w-[3px] bg-[#07111f2e]"
                    }`}
                    key={testimonial.name}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-[#07111f1f]">
              {testimonials.map((testimonial, index) => (
                <article
                  className={`reveal grid grid-cols-[64px_1fr] gap-5 border-b border-[#07111f1f] py-7 max-sm:grid-cols-1 ${
                    testimonial.active ? "bg-[#f6fbff]" : ""
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  key={testimonial.name}
                >
                  <span className="grid size-11 place-items-center rounded-full border border-[#007aff24] bg-white text-[#007aff]">
                    <Quote className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <div className="mb-3 flex gap-1 text-[#007aff]" aria-label="5 star rating">
                      {[0, 1, 2, 3, 4].map((item) => (
                        <Star className="size-4 fill-current" strokeWidth={1.8} key={item} />
                      ))}
                    </div>
                    <p className="text-[21px] leading-[1.42] font-medium text-[#07111f]">
                      “{testimonial.text}”
                    </p>
                    <div className="mt-5 text-sm">
                      <strong className="block text-[#07111f]">{testimonial.name}</strong>
                      <span className="text-[#687386]">{testimonial.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="border-b border-[#07111f1f] bg-white py-[104px]">
          <div className={`${containerClass} grid grid-cols-[0.95fr_1.05fr] items-start gap-[60px] max-[940px]:grid-cols-1`}>
            <div className="reveal sticky top-[120px] max-[940px]:static">
              <Tag>WHY CHOOSE MACVAULT</Tag>
              <h2 className="mt-2 max-w-[500px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Less marketplace. More confidence.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
                MacVault should feel like a local showroom with clear product truth, not another
                grid of anonymous listings.
              </p>
              <Link
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#007aff]"
                href="/why-buy-from-us"
              >
                Read why buy from us <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </div>

            <div className="border-t border-[#07111f1f]">
              {whyRows.map((row, index) => {
                const Icon = row.icon;

                return (
                  <div
                    className="reveal grid grid-cols-[150px_1fr] gap-[26px] border-b border-[#07111f1f] py-[30px] max-sm:grid-cols-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={row.number}
                  >
                    <span className="flex items-center gap-3 text-[13px] font-bold text-[#007aff]">
                      <Icon className="size-5" strokeWidth={1.9} />
                      {row.number}
                    </span>
                    <div>
                      <h3 className="mb-2 text-[26px] font-semibold">{row.title}</h3>
                      <p className="max-w-[520px] text-base leading-[1.55] text-[#687386]">
                        {row.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#f4f8ff] py-[104px]">
          <div className={containerClass}>
            <SectionHead
              kicker="OUR PROCESS"
              title="From browsing to reservation in four steps."
              text="A direct flow for high-intent buyers who want details first and a human reply fast."
            />

            <div className="timeline reveal relative mt-12 grid grid-cols-4 border-t border-[#07111f29] max-[940px]:grid-cols-2 max-sm:grid-cols-1">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    className="min-h-60 border-r border-[#07111f1f] pt-7 pr-7 last:border-r-0 max-[940px]:border-b"
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

        <section id="guide" className={`${containerClass} py-[104px]`}>
          <div className="grid grid-cols-[0.8fr_1.2fr] items-start gap-[50px] max-[940px]:grid-cols-1">
            <div className="reveal">
              <Tag>BUYING GUIDE</Tag>
              <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
                Make condition easy to understand.
              </h2>
              <p className="mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
                This section gives MacVault a professional dealer feel and reduces repeated
                questions on WhatsApp.
              </p>
            </div>

            <div className="border-t border-[#07111f1f]">
              {guideRows.map((row, index) => {
                const Icon = row.icon;

                return (
                  <div
                    className="reveal grid grid-cols-[180px_1fr_140px] items-start gap-5 border-b border-[#07111f1f] py-[22px] max-sm:grid-cols-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    key={row.title}
                  >
                    <strong className="inline-flex items-center gap-3 text-lg">
                      <Icon className="size-5 text-[#007aff]" strokeWidth={1.9} />
                      {row.title}
                    </strong>
                    <p className="text-[15px] leading-normal text-[#687386]">{row.text}</p>
                    <span className="text-right text-[13px] font-semibold text-[#0759c7] max-sm:text-left">
                      {row.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="support" className="bg-[#07111f] py-[86px] text-white">
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
                      <Icon className="size-5 text-[#75baff]" strokeWidth={1.9} />
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

        <section className="bg-linear-to-b from-white to-[#eef7ff] py-28 text-center">
          <div className={`reveal ${containerClass}`}>
            <Tag>TODAY&apos;S STOCK</Tag>
            <h2 className="mx-auto mt-2 max-w-[820px] text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
              Ask what is available before it is gone.
            </h2>
            <p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386]">
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
