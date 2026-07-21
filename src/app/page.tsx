import { ArrowRight, BadgeCheck, BatteryCharging, MessageCircle, PackageCheck, Search, Store } from "lucide-react";
import { ComparisonSection } from "@/components/comparison-section";
import { Cta } from "@/components/cta";
import { HomeCategoryRail } from "@/components/home-category-rail";
import { HomeFaq } from "@/components/home-faq";
import { HomeFeaturedStock } from "@/components/home-featured-stock";
import { containerClass } from "@/components/layout-classes";
import { RevealController } from "@/components/reveal-controller";
import { Footer, Header } from "@/components/site";
import { AnimatedText, Tag } from "@/components/site-primitives";
import { whatsappStockHref } from "@/data/contact";
import { getCategories, getProducts } from "@/sanity/lib/catalog";

const checks = [
  { title: "Know the condition", text: "See whether the product is sealed, open-box, or used, along with the condition notes that affect your decision.", icon: BadgeCheck },
  { title: "Check the right facts", text: "For iPhones, check PTA status and battery health. For MacBooks, check the chip, memory, storage, cycle count, and charger.", icon: BatteryCharging },
  { title: "Know what is included", text: "Check the box, cable, charger, controller, accessories, and written warranty terms before you pay.", icon: PackageCheck },
];

const steps = [
  { number: "01", title: "Choose a product", text: "Start with the model, storage, condition, and budget that suit you." },
  { number: "02", title: "Check the facts", text: "Review the price, condition, PTA status, battery or cycle count, warranty, and included items." },
  { number: "03", title: "Talk to MacVault", text: "Ask about the exact unit, then arrange inspection, pickup, or delivery before payment." },
];

function HeroVisual() {
  return (
    <div className="home-showcase reveal" aria-label="A preview of MacVault device checks">
      <div className="home-showcase-topline"><span><span className="status-dot" /> Unit available</span><span>MacVault check</span></div>
      <div className="home-showcase-body"><div className="home-showcase-device">
        <svg className="hero-stock-svg" viewBox="0 0 720 430" role="img" aria-labelledby="hero-stock-svg-title hero-stock-svg-description">
          <title id="hero-stock-svg-title">MacVault product checks</title>
          <desc id="hero-stock-svg-description">An animated MacBook and iPhone are checked for condition, PTA status, battery health and box contents.</desc>
          <rect className="hero-svg-stage" x="18" y="18" width="684" height="394" rx="30" />
          <path className="hero-svg-grid" d="M18 130H702M18 242H702M180 18V412M360 18V412M540 18V412" />
          <g className="hero-svg-label hero-svg-label-one"><rect x="45" y="45" width="126" height="38" rx="19" /><circle cx="67" cy="64" r="5" /><text x="82" y="69">UNIT CHECK</text></g>
          <g className="hero-svg-laptop"><rect className="hero-svg-device-shell" x="102" y="107" width="360" height="226" rx="20" /><rect className="hero-svg-screen" x="119" y="124" width="326" height="190" rx="10" /><circle className="hero-svg-camera" cx="282" cy="116" r="3" /><path className="hero-svg-laptop-base" d="M88 333H476L456 354H108Z" /><path className="hero-svg-laptop-edge" d="M108 354H456" /></g>
          <g className="hero-svg-phone"><rect className="hero-svg-device-shell" x="484" y="134" width="116" height="220" rx="26" /><rect className="hero-svg-phone-screen" x="494" y="145" width="96" height="198" rx="19" /><rect className="hero-svg-phone-island" x="517" y="154" width="50" height="14" rx="7" /></g>
          <g className="hero-svg-scan"><rect x="132" y="143" width="300" height="3" rx="1.5" /><path d="M132 151H432" /></g>
          <g className="hero-svg-check hero-svg-check-one"><circle cx="163" cy="184" r="17" /><path pathLength="1" d="M154 184L161 191L173 176" /><text x="191" y="184">PTA APPROVED</text></g>
          <g className="hero-svg-check hero-svg-check-two"><circle cx="163" cy="232" r="17" /><path pathLength="1" d="M154 232L161 239L173 224" /><text x="191" y="232">BATTERY HEALTH</text></g>
          <g className="hero-svg-check hero-svg-check-three"><circle cx="163" cy="280" r="17" /><path pathLength="1" d="M154 280L161 287L173 272" /><text x="191" y="280">BOX &amp; CONDITION</text></g>
          <g className="hero-svg-verified"><circle className="hero-svg-verified-ring" cx="542" cy="256" r="34" /><circle className="hero-svg-verified-fill" cx="542" cy="256" r="25" /><path pathLength="1" d="M529 256L538 265L556 246" /><text x="542" y="309" textAnchor="middle">CHECKED</text></g>
          <path className="hero-svg-route" pathLength="1" d="M448 220C490 206 505 214 518 232" />
          <g className="hero-svg-footer-label"><text x="46" y="390">MACVAULT / LAHORE</text><text x="674" y="390" textAnchor="end">READY TO CONFIRM</text></g>
        </svg>
      </div></div>
    </div>
  );
}

function TrustSection() {
  return <section className={`${containerClass} py-[60px]`}><div className="home-trust-layout reveal"><div className="home-trust-intro"><Tag>Buyer checks</Tag><h2>Understand the <AnimatedText>product</AnimatedText> before you spend.</h2><p>You should not need technical knowledge to buy an iPhone, MacBook, iPad, Apple Watch, AirPods, or PlayStation. We explain the important facts in plain language and tell you what still needs to be checked on the exact unit.</p><div className="flex justify-start"><Cta href="/why-us" variant="secondary" icon={ArrowRight}>How buying works</Cta></div></div><div className="home-check-list">{checks.map(({ title, text, icon: Icon }) => <div className="home-check-row" key={title}><span className="home-check-number">0{checks.findIndex((check) => check.title === title) + 1}</span><Icon aria-hidden="true" /><div><h3><AnimatedText>{title.split(" ")[0]}</AnimatedText>{title.includes(" ") ? ` ${title.split(" ").slice(1).join(" ")}` : ""}</h3><p>{text}</p></div></div>)}</div></div></section>;
}

function BuyingFlow() {
  return <section className="bg-[#f4f9ff] py-[60px]"><div className={containerClass}><div className="reveal mb-11 w-full max-w-none text-center max-sm:mb-8"><Tag>3 steps</Tag><h2 className="section-title mt-2">Choose, <AnimatedText>check</AnimatedText>, then buy.</h2><p className="mx-auto mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085]">Start with the product page. Ask about anything that is not clear. Pay only after the exact unit and terms match what you were told.</p></div><div className="home-steps reveal">{steps.map((step) => <div className="home-step" key={step.number}><span>{step.number}</span><div><h3><AnimatedText>{step.title.split(" ")[0]}</AnimatedText>{step.title.includes(" ") ? ` ${step.title.split(" ").slice(1).join(" ")}` : ""}</h3><p>{step.text}</p></div></div>)}</div><div className="home-help reveal"><div><Store aria-hidden="true" /><div><h3><AnimatedText>Not</AnimatedText> sure which model to buy?</h3><p>Tell us your budget and what you use the device for. We will suggest suitable options and explain the difference in simple words.</p><div className="mt-5 flex justify-start"><Cta href={whatsappStockHref} icon={MessageCircle}>Ask for help choosing</Cta></div></div></div></div></div></section>;
}

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return <div className="overflow-hidden bg-white text-[#102a43]"><RevealController /><Header /><main id="main-content"><section className={`${containerClass} hero-section relative pt-[154px] pb-[60px] text-center max-[768px]:pt-[126px]`}><div className="hero-content mx-auto w-full max-w-[1280px]"><div className="reveal"><Tag>Apple &amp; PlayStation</Tag></div><h1 className="reveal hero-title page-title mx-auto mt-6 max-w-[1080px]"><AnimatedText>Apple</AnimatedText> and <AnimatedText>PlayStation</AnimatedText> products in Lahore.</h1><p className="reveal mx-auto mt-6 max-w-[840px] text-[clamp(17px,1.7vw,21px)] leading-[1.6] text-[#667085]">We are MacVault, a verified product-listing platform for Apple devices, Sony PlayStations, gaming CDs, codes, and accounts. We do not use a blind checkout flow. You review the exact product details on WhatsApp, then confirm your order.</p><div className="reveal mt-8 flex flex-wrap justify-center gap-3"><Cta href="/products#inventory" icon={Search}>See current products</Cta><Cta href={whatsappStockHref} variant="secondary" icon={MessageCircle}>Talk to MacVault</Cta></div><div className="home-proof-line reveal" aria-label="Key buying information"><span>Current stock status</span><span>Clear condition notes</span><span>Direct local support</span></div></div><HeroVisual /></section><HomeFeaturedStock products={products} categories={categories} /><HomeCategoryRail categories={categories} /><TrustSection /><ComparisonSection /><BuyingFlow /><HomeFaq /><section className="home-final-cta py-[60px] text-center"><div className={`reveal ${containerClass}`}><Tag>Ask MacVault</Tag><h2>Talk directly to <AnimatedText>MacVault</AnimatedText>.</h2><p>Send the product name and confirm today&apos;s price, exact condition, warranty, included items, and inspection or delivery options.</p><div className="mt-8"><Cta href={whatsappStockHref} icon={MessageCircle}>Confirm current stock</Cta></div></div></section></main><Footer /></div>;
}
