import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { createWhatsappHref, phoneDisplay, phoneHref, whatsappStockHref } from "@/data/contact";
import type { Product, ProductVisualKind } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import { getProducts } from "@/sanity/lib/catalog";
import styles from "./codex.module.css";

export const metadata: Metadata = buildMetadata({
  title: "The Vault",
  description:
    "MacVault is a Lahore showroom for verified Apple and PlayStation stock, with the details buyers need before they visit or reserve.",
  path: "/codex",
  robots: { index: false, follow: false },
});

const proofPoints = [
  {
    index: "01",
    label: "Live inventory",
    text: "Availability is checked before a serious buyer makes the trip.",
  },
  {
    index: "02",
    label: "Unit-specific notes",
    text: "PTA, battery, cycles, condition, box, and warranty are not afterthoughts.",
  },
  {
    index: "03",
    label: "A direct handoff",
    text: "Reserve, pickup, delivery, or a detailed chat starts with product context.",
  },
];

const inspectionRows = [
  {
    device: "iPhone",
    inspect: "PTA / Non-PTA, storage, battery health, display and body condition.",
    outcome: "The exact version fits your network and your budget.",
  },
  {
    device: "MacBook",
    inspect: "Chip, memory, storage, cycle count, keyboard, charger and display.",
    outcome: "You know the real configuration before you move.",
  },
  {
    device: "PlayStation & accessories",
    inspect: "Edition, bundle contents, controller, box state and warranty notes.",
    outcome: "The setup is clear, not assumed from a photo.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Find your fit.",
    text: "Start with the device, capacity, condition, and daily use that make sense for you.",
  },
  {
    number: "02",
    title: "See the important details.",
    text: "MacVault puts the facts buyers normally repeat in chat beside the product decision.",
  },
  {
    number: "03",
    title: "Message with context.",
    text: "WhatsApp opens a focused conversation to confirm the exact unit, timing, and handoff.",
  },
];

const featuredProductSlugs = [
  "iphone-15-pro-max-256",
  "macbook-air-m3-13",
  "ps5-slim-disc-bundle",
];

function deviceKind(product: Product): ProductVisualKind {
  return product.gallery[0]?.kind ?? "phone";
}

function DeviceScene({ kind, accent }: { kind: ProductVisualKind; accent: string }) {
  const sceneStyle = { "--product-accent": accent } as CSSProperties;

  if (kind === "laptop") {
    return (
      <div className={`${styles.deviceScene} ${styles.laptopScene}`} style={sceneStyle}>
        <span className={styles.sceneOrbit} />
        <div className={styles.laptopObject}>
          <div className={styles.laptopScreen}>
            <span className={styles.screenMark}>M</span>
          </div>
          <div className={styles.laptopBase} />
        </div>
        <span className={styles.sceneCaption}>WORK / READY</span>
      </div>
    );
  }

  if (kind === "console") {
    return (
      <div className={`${styles.deviceScene} ${styles.consoleScene}`} style={sceneStyle}>
        <span className={styles.sceneOrbit} />
        <div className={styles.consoleObject}>
          <span className={styles.consoleWing} />
          <span className={styles.consoleCore} />
          <span className={`${styles.consoleWing} ${styles.consoleWingRight}`} />
        </div>
        <span className={styles.sceneCaption}>PLAY / READY</span>
      </div>
    );
  }

  return (
    <div className={`${styles.deviceScene} ${styles.phoneScene}`} style={sceneStyle}>
      <span className={styles.sceneOrbit} />
      <div className={styles.phoneObject}>
        <span className={styles.phoneIsland} />
        <span className={styles.phoneShine} />
      </div>
      <span className={styles.sceneCaption}>DAILY / READY</span>
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const messageHref = createWhatsappHref(
    `Hi MacVault, I want to check availability for ${product.title}.`,
  );

  return (
    <article className={styles.productRow}>
      <div className={styles.productIndex}>0{index + 1}</div>
      <div className={styles.productCopy}>
        <div className={styles.productMeta}>
          <span>{product.badge}</span>
          <span className={styles.metaDot} />
          <span>{product.status}</span>
        </div>
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <div className={styles.productFacts}>
          <span>{product.condition}</span>
          <span>{product.specs[0]}</span>
        </div>
        <div className={styles.productActions}>
          <Cta href={`/products/${product.slug}`} icon={ArrowRight} variant="secondary">
            View details
          </Cta>
          <a className={styles.textLink} href={messageHref}>
            Check this unit <ArrowDownRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <DeviceScene kind={deviceKind(product)} accent={product.accent} />
    </article>
  );
}

export default async function CodexPage() {
  const products = await getProducts();
  const featuredProducts = featuredProductSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product) => product !== undefined);

  return (
    <div className={styles.page}>
      <header className={`${containerClass} ${styles.header}`}>
        <Link className={styles.wordmark} href="/codex" aria-label="MacVault The Vault">
          <Image
            src="/images/brand/macvault-selected-logo.svg"
            alt="MacVault"
            width={600}
            height={180}
            priority
          />
          <span>THE VAULT</span>
        </Link>

        <nav className={styles.navigation} aria-label="The Vault navigation">
          <a href="#collection">Collection</a>
          <a href="#standard">Our standard</a>
          <a href="#visit">Talk to us</a>
        </nav>

        <Cta href="/products" icon={ArrowRight} className={styles.headerCta}>
          See full stock
        </Cta>
      </header>

      <main>
        <section className={`${containerClass} ${styles.hero}`}>
          <div className={styles.heroEyebrow}>
            <span className={styles.liveDot} />
            Lahore&apos;s considered tech showroom
          </div>
          <h1>
            Better devices.
            <span>Better decisions.</span>
          </h1>
          <p className={styles.heroCopy}>
            MacVault is for people who want the important details before they make the move. Verified
            Apple and PlayStation stock, with a buying flow that feels considered from first look to
            final handoff.
          </p>
          <div className={styles.heroActions}>
            <Cta href="#collection" icon={ChevronDown}>
              Explore the vault
            </Cta>
            <Cta href={whatsappStockHref} icon={MessageCircle} variant="secondary">
              Check today&apos;s stock
            </Cta>
          </div>

          <div className={styles.heroStage} aria-label="MacVault product showroom">
            <div className={styles.stageTopline}>
              <span>CURATED TECHNOLOGY</span>
              <span>LAHORE / PAKISTAN</span>
            </div>
            <div className={styles.stageSideLabel}>EST. FOR THE DETAIL-ORIENTED</div>
            <div className={styles.stageDeviceRack}>
              <span className={styles.rackLaptop}>
                <span className={styles.rackLaptopScreen}>MAC</span>
              </span>
              <span className={styles.rackPhone}>
                <span className={styles.rackPhoneIsland} />
              </span>
              <span className={styles.rackConsole}>
                <span />
                <span />
                <span />
              </span>
            </div>
            <div className={styles.stageFooter}>
              <span>INVENTORY, CHECKED</span>
              <strong>MACVAULT</strong>
              <span>MOVE WITH CLARITY</span>
            </div>
          </div>
        </section>

        <section className={styles.proofBand}>
          <div className={`${containerClass} ${styles.proofGrid}`}>
            {proofPoints.map((item) => (
              <article key={item.index}>
                <span>{item.index}</span>
                <div>
                  <h2>{item.label}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="collection" className={`${containerClass} ${styles.collection}`}>
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionLabel}>01 / THE COLLECTION</span>
              <h2>Three ways into the vault.</h2>
            </div>
            <p>
              Not a wall of products. Start with the device that changes your day, then get the
              facts that make it yours.
            </p>
          </div>

          <div className={styles.productRows}>
            {featuredProducts.map((product, index) => (
              <ProductRow product={product} index={index} key={product.slug} />
            ))}
          </div>

          <div className={styles.collectionFooter}>
            <p>
              Looking for a specific configuration? Ask us to check color, storage, box condition,
              PTA, cycles, or the exact bundle.
            </p>
            <Cta href="/products" icon={ArrowRight} variant="secondary">
              Browse every category
            </Cta>
          </div>
        </section>

        <section id="standard" className={styles.standardSection}>
          <div className={`${containerClass} ${styles.standardInner}`}>
            <div className={styles.standardIntro}>
              <span className={styles.sectionLabel}>02 / THE MACVAULT STANDARD</span>
              <h2>Clarity is the premium part.</h2>
              <p>
                The experience is designed around the questions that matter when you&apos;re spending
                seriously—so your product page does real work before the conversation begins.
              </p>
            </div>

            <div className={styles.inspectionTable}>
              <div className={`${styles.tableRow} ${styles.tableHead}`}>
                <span>Device</span>
                <span>What we make visible</span>
                <span>What that gives you</span>
              </div>
              {inspectionRows.map((row) => (
                <div className={styles.tableRow} key={row.device}>
                  <strong>{row.device}</strong>
                  <p>{row.inspect}</p>
                  <p>{row.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${containerClass} ${styles.processSection}`}>
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionLabel}>03 / THE HANDOFF</span>
              <h2>Less back and forth. More certainty.</h2>
            </div>
            <p>
              A straightforward path from looking to knowing what will be waiting for you.
            </p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <article key={step.number}>
                <div className={styles.processNumber}>{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <Check className={styles.processCheck} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section id="visit" className={styles.visitSection}>
          <div className={`${containerClass} ${styles.visitInner}`}>
            <div className={styles.visitCopy}>
              <span className={styles.lightLabel}>MACVAULT / LAHORE</span>
              <h2>Know the exact unit before you leave home.</h2>
              <p>
                Ask for live stock, condition, or a reservation. We&apos;ll keep the handoff direct,
                useful, and focused on the device you actually want.
              </p>
              <div className={styles.visitActions}>
                <Cta href={whatsappStockHref} icon={MessageCircle}>
                  WhatsApp MacVault
                </Cta>
                <Cta href={phoneHref} icon={PhoneCall} variant="secondary">
                  {`Call ${phoneDisplay}`}
                </Cta>
              </div>
            </div>
            <div className={styles.visitMark} aria-hidden="true">
              <div>
                <ShieldCheck />
                <span>THE BETTER WAY TO BUY TECH LOCALLY</span>
              </div>
              <MapPin />
              <strong>MV</strong>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${containerClass} ${styles.footer}`}>
        <div className={styles.footerBrand}>
          <Image
            src="/images/brand/macvault-selected-logo.svg"
            alt="MacVault"
            width={600}
            height={180}
          />
          <p>Verified Apple and PlayStation stock in Lahore, with the detail before the decision.</p>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/products">Full stock</Link>
          <Link href="/why-us">Why MacVault</Link>
          <a href={whatsappStockHref}>WhatsApp</a>
          <a href={phoneHref}>{phoneDisplay}</a>
        </div>
        <p className={styles.footerNote}>© {new Date().getFullYear()} MacVault. The Vault Edition.</p>
      </footer>
    </div>
  );
}
