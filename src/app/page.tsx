"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  ChevronDown,
  Gamepad2,
  Headphones,
  Laptop,
  type LucideIcon,
  MessageCircle,
  PackageCheck,
  PackageSearch,
  Search,
  Smartphone,
  Store,
  Tablet,
  Watch as WatchIcon,
} from "lucide-react";
import { ComparisonSection } from "@/components/comparison-section";
import { useCatalog } from "@/components/catalog-provider";
import { ProductVisual } from "@/components/product-visual";
import { RevealController } from "@/components/reveal-controller";
import { Cta } from "@/components/cta";
import { Footer, Header, SectionHead, Tag, containerClass } from "@/components/site";
import { createWhatsappHref, whatsappStockHref } from "@/data/contact";

const categoryIcons: Record<string, LucideIcon> = {
  iPhone: Smartphone,
  Mac: Laptop,
  iPad: Tablet,
  Watch: WatchIcon,
  Accessories: Headphones,
  PlayStation: Gamepad2,
};

const checks = [
  {
    title: "Condition shown clearly",
    text: "You see whether a unit is sealed, open-box or used, plus the marks and accessories that matter.",
    icon: BadgeCheck,
  },
  {
    title: "Device details that matter",
    text: "PTA status and battery health for iPhones; cycle count, charger and configuration for MacBooks.",
    icon: BatteryCharging,
  },
  {
    title: "What comes with it",
    text: "Box contents, warranty expectations and pickup or delivery details are confirmed before payment.",
    icon: PackageCheck,
  },
];

const steps = [
  { number: "01", title: "Browse", text: "See the models and key details currently listed." },
  { number: "02", title: "Confirm", text: "Message us to confirm the exact unit, price and condition." },
  { number: "03", title: "Buy", text: "Inspect in person or arrange the available delivery option." },
];

const faqItems = [
  {
    question: "Can I inspect a device before paying?",
    answer: "Yes. For Lahore pickup, you can inspect the available unit and confirm its stated condition before payment.",
  },
  {
    question: "How do I know whether an iPhone is PTA approved?",
    answer: "The PTA status is shown on the listing and confirmed again for the exact unit before you reserve it.",
  },
  {
    question: "Do products include a warranty?",
    answer: "Warranty differs by product and condition. We confirm the applicable warranty for the exact unit before payment.",
  },
  {
    question: "Do you deliver outside Lahore?",
    answer: "Share your city on WhatsApp. We will confirm whether delivery is available, along with timing, charges and payment details.",
  },
];

function HeroVisual() {
  return (
    <div className="home-showcase reveal" aria-label="A preview of MacVault device checks">
      <div className="home-showcase-topline">
        <span><span className="status-dot" /> Unit available</span>
        <span>MacVault check</span>
      </div>
      <div className="home-showcase-body">
        <div className="home-showcase-device">
          <svg
            className="hero-stock-svg"
            viewBox="0 0 680 430"
            role="img"
            aria-labelledby="hero-stock-svg-title hero-stock-svg-description"
          >
            <title id="hero-stock-svg-title">MacVault product verification</title>
            <desc id="hero-stock-svg-description">
              An animated MacBook and iPhone are checked for condition, PTA status, battery health
              and box contents.
            </desc>

            <rect className="hero-svg-stage" x="18" y="18" width="644" height="394" rx="30" />
            <path className="hero-svg-grid" d="M18 130H662M18 242H662M180 18V412M340 18V412M500 18V412" />

            <g className="hero-svg-label hero-svg-label-one">
              <rect x="45" y="45" width="126" height="38" rx="19" />
              <circle cx="67" cy="64" r="5" />
              <text x="82" y="69">UNIT CHECK</text>
            </g>

            <g className="hero-svg-laptop">
              <rect className="hero-svg-device-shell" x="102" y="107" width="360" height="226" rx="20" />
              <rect className="hero-svg-screen" x="119" y="124" width="326" height="190" rx="10" />
              <circle className="hero-svg-camera" cx="282" cy="116" r="3" />
              <path className="hero-svg-laptop-base" d="M75 333H489L462 355H102Z" />
              <path className="hero-svg-laptop-edge" d="M102 355H462" />
            </g>

            <g className="hero-svg-phone">
              <rect className="hero-svg-device-shell" x="484" y="134" width="116" height="220" rx="26" />
              <rect className="hero-svg-phone-screen" x="494" y="145" width="96" height="198" rx="19" />
              <rect className="hero-svg-phone-island" x="517" y="154" width="50" height="14" rx="7" />
            </g>

            <g className="hero-svg-scan">
              <rect x="132" y="143" width="300" height="3" rx="1.5" />
              <path d="M132 151H432" />
            </g>

            <g className="hero-svg-check hero-svg-check-one">
              <circle cx="163" cy="184" r="17" />
              <path pathLength="1" d="M154 184L161 191L173 176" />
              <text x="191" y="190">PTA STATUS</text>
            </g>
            <g className="hero-svg-check hero-svg-check-two">
              <circle cx="163" cy="232" r="17" />
              <path pathLength="1" d="M154 232L161 239L173 224" />
              <text x="191" y="238">BATTERY HEALTH</text>
            </g>
            <g className="hero-svg-check hero-svg-check-three">
              <circle cx="163" cy="280" r="17" />
              <path pathLength="1" d="M154 280L161 287L173 272" />
              <text x="191" y="286">BOX &amp; CONDITION</text>
            </g>

            <g className="hero-svg-verified">
              <circle className="hero-svg-verified-ring" cx="542" cy="256" r="34" />
              <circle className="hero-svg-verified-fill" cx="542" cy="256" r="25" />
              <path pathLength="1" d="M529 256L538 265L556 246" />
              <text x="542" y="309" textAnchor="middle">CHECKED</text>
            </g>

            <path className="hero-svg-route" pathLength="1" d="M448 220C490 206 505 214 518 232" />

            <g className="hero-svg-footer-label">
              <text x="46" y="390">MACVAULT / LAHORE</text>
              <text x="634" y="390" textAnchor="end">READY TO CONFIRM</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FeaturedStock() {
  const { categories: sanityCategories, products } = useCatalog();
  const categories = sanityCategories.map((category) => ({
    ...category,
    icon: categoryIcons[category.category] ?? PackageSearch,
  }));
  const [requestedCategory, setRequestedCategory] = useState(
    sanityCategories[0]?.category ?? "",
  );

  if (categories.length === 0) {
    return null;
  }

  const selectedCategory = categories.some(
    (category) => category.category === requestedCategory,
  )
    ? requestedCategory
    : categories[0].category;
  const selected = categories.find((item) => item.category === selectedCategory) ?? categories[0];
  const categoryProducts = products.filter((product) => product.category === selectedCategory);
  const visibleProducts = categoryProducts.slice(0, 6);

  return (
    <section id="inventory" className={`${containerClass} inventory-anchor py-[60px]`}>
      <SectionHead
        kicker="Current listings"
        title={`${selected.label} available now`}
        accent="available"
        text={`Browse up to six current ${selected.label} listings here. Open a product for its exact condition, specifications and available options.`}
      />
      <div className="category-filter-bar mb-8 flex flex-wrap justify-center gap-3" aria-label="Homepage product categories">
        {categories.map((category) => {
          const Icon = category.icon;
          const count = products.filter((product) => product.category === category.category).length;
          return (
            <Cta
              asButton
              className={selectedCategory === category.category ? "" : "button-secondary"}
              icon={Icon}
              count={count}
              aria-pressed={selectedCategory === category.category}
              onClick={() => setRequestedCategory(category.category)}
              key={category.category}
            >
              {category.label}
            </Cta>
          );
        })}
      </div>
      <div className="product-list-grid home-featured-grid">
        {visibleProducts.map((product) => (
          <article className="listing-card" key={product.slug}>
            <ProductVisual
              accent={product.accent}
              kind={product.gallery[0].kind}
              label={product.shortTitle}
              imageUrl={product.gallery[0].imageUrl}
              imageAlt={product.gallery[0].imageAlt}
              imageUsage={product.gallery[0].usage}
              size="compact"
              className="w-full"
            />
            <div className="flex grow flex-col p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-[#0a84ff17] px-2.5 py-1.5 text-[#0057d8]">
                  {product.category === "Mac" ? "MacBook" : product.category}
                </span>
                <span className="rounded-full bg-[#23c87918] px-2.5 py-1.5 text-[#14773d]">{product.status}</span>
              </div>
              <h3 className="text-[25px] leading-[1.08] font-semibold">{product.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.55] text-[#667085]">{product.summary}</p>
              <div className="mt-auto flex flex-wrap justify-start gap-2 pt-6">
                <Cta href={`/products/${product.slug}`} icon={ArrowRight}>View more</Cta>
                <Cta
                  href={createWhatsappHref(`Hi MacVault, I want to check ${product.title}.`)}
                  icon={MessageCircle}
                  variant="secondary"
                >
                  Chat now
                </Cta>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="reveal mt-8 text-center">
        <Cta href={`${selected.href}#product-grid`} variant="secondary" icon={Search}>
          {`View all ${selected.label}`}
        </Cta>
      </div>
    </section>
  );
}

function CategoryRail() {
  const { categories } = useCatalog();

  return (
    <section className="border-y border-[#102a4314] bg-white py-[60px]">
      <div className={containerClass}>
        <div className="reveal grid grid-cols-[minmax(240px,.7fr)_minmax(0,1.3fr)] items-stretch gap-10 max-[900px]:grid-cols-1">
          <div className="flex flex-col justify-center">
            <Tag>Shop by type</Tag>
            <h2 className="section-title mt-5 max-w-[520px]">Find the tech you came for.</h2>
          </div>
          <div className="home-category-list">
            {categories.map(({ _id, label, category, href }) => {
              const Icon = categoryIcons[category] ?? PackageSearch;

              return (
              <Link href={`${href}#product-grid`} key={_id}>
                <span><Icon aria-hidden="true" />{label}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className={`${containerClass} py-[60px]`}>
      <div className="home-trust-layout reveal">
        <div className="home-trust-intro">
          <Tag>Why MacVault</Tag>
          <h2>The details you should know, shared upfront.</h2>
          <p>MacVault sells new, open-box and used Apple and PlayStation products in Lahore. We explain the exact unit in plain language so you can decide with fewer surprises.</p>
          <div className="flex justify-start"><Cta href="/why-us" variant="secondary" icon={ArrowRight}>How we help</Cta></div>
        </div>
        <div className="home-check-list">
          {checks.map(({ title, text, icon: Icon }, index) => (
            <div className="home-check-row" key={title}>
              <span className="home-check-number">0{index + 1}</span>
              <Icon aria-hidden="true" />
              <div><h3>{title}</h3><p>{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuyingFlow() {
  return (
    <section className="bg-[#f4f9ff] py-[60px]">
      <div className={containerClass}>
        <SectionHead kicker="A simple buying flow" title="From browsing to buying" accent="buying" text="A short, human process for people who want the facts first and a quick reply when they are ready." />
        <div className="home-steps reveal">
          {steps.map((step) => (
            <div className="home-step" key={step.number}>
              <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>
            </div>
          ))}
        </div>
        <div className="home-help reveal">
          <div><Store aria-hidden="true" /><div><h3>Need help choosing?</h3><p>Tell us your budget and what you need the device for. We’ll suggest suitable in-stock options and explain the trade-offs clearly.</p><div className="mt-5 flex justify-start"><Cta href={whatsappStockHref} icon={MessageCircle}>Get a recommendation</Cta></div></div></div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section id="faq" className={`${containerClass} py-[60px]`}>
      <SectionHead kicker="Questions, answered" title="Before you message us" accent="message" text="The practical things most buyers want to know before choosing a unit." />
      <div className="faq-list mx-auto max-w-[1100px]">
        {faqItems.map((item, index) => {
          const isOpen = openFaq === index;
          return (
            <article className={`faq-accordion ${isOpen ? "is-open" : ""}`} key={item.question}>
              <h3><button className="faq-trigger" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)}><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><span className="faq-toggle" aria-hidden="true"><ChevronDown /></span></button></h3>
              <div className="faq-answer" id={`faq-answer-${index}`} aria-hidden={!isOpen}><div><p>{item.answer}</p></div></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="overflow-hidden bg-white text-[#102a43]">
      <RevealController />
      <Header />
      <main id="main-content">
        <section className={`${containerClass} hero-section relative pt-[154px] pb-[60px] text-center max-[768px]:pt-[126px]`}>
          <div className="hero-content mx-auto max-w-[820px]">
            <div className="reveal"><Tag>Apple & gaming tech in Lahore</Tag></div>
            <h1 className="reveal hero-title mx-auto mt-6 max-w-[860px] text-[clamp(44px,6vw,78px)] leading-[0.98] font-semibold tracking-[-0.045em] max-[425px]:text-[38px] max-[375px]:text-[36px]">Apple and PlayStation tech. <span className="animated-text">Checked before you buy.</span></h1>
            <p className="reveal mx-auto mt-6 max-w-[700px] text-[clamp(17px,1.7vw,21px)] leading-[1.6] text-[#667085]">MacVault sells new, open-box and used iPhones, MacBooks, iPads, Apple Watch, AirPods and PlayStation products. See the condition and key details, then confirm the exact unit with us on WhatsApp.</p>
            <div className="reveal mt-8 flex flex-wrap justify-center gap-3"><Cta href="/products#inventory" icon={Search}>Browse available stock</Cta><Cta href={whatsappStockHref} variant="secondary" icon={MessageCircle}>Ask on WhatsApp</Cta></div>
            <div className="home-proof-line reveal" aria-label="Key buying information"><span>PTA status</span><span>Battery & cycle details</span><span>Pickup or delivery</span></div>
          </div>
          <HeroVisual />
        </section>
        <FeaturedStock />
        <CategoryRail />
        <TrustSection />
        <ComparisonSection />
        <BuyingFlow />
        <FaqSection />
        <section className="home-final-cta py-[60px] text-center"><div className={`reveal ${containerClass}`}><Tag>Talk to a person</Tag><h2>Ask about the exact unit you want.</h2><p>We’ll confirm availability, condition, price and the next step before you visit or pay.</p><div className="mt-8"><Cta href={whatsappStockHref} icon={MessageCircle}>Check today’s stock</Cta></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
