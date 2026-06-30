"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Gamepad2,
  Headphones,
  Laptop,
  Menu,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import { Cta } from "@/components/cta";
import { containerClass } from "@/components/layout-classes";
import { QuoteButton } from "@/components/quote-modal";

export { Cta } from "@/components/cta";
export { containerClass };

const navigationLinks = [
  { label: "Products", href: "/products" },
  { label: "Why Buy", href: "/why-buy-from-us" },
  { label: "Process", href: "/#process" },
  { label: "Guide", href: "/#guide" },
  { label: "FAQ", href: "/#faq" },
];

export function AnimatedText({ children }: { children: ReactNode }) {
  return <span className="animated-text">{children}</span>;
}

export function Brand() {
  return (
    <Link className="inline-flex min-h-12 min-w-max items-center" href="/" aria-label="MacVault home">
      <Image
        className="h-12 w-auto max-sm:h-10"
        src="/images/brand/macvault-selected-logo.svg"
        alt="MacVault"
        width={600}
        height={180}
        priority
      />
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="tag-pill inline-flex min-h-9 w-fit max-w-full items-center justify-start gap-3 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)] max-[425px]:text-[11px] max-[425px]:tracking-[0.1em]">
      <span className="tag-dot size-2 shrink-0 rounded-full bg-[#0a84ff]" />
      {children}
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        menuRootRef.current &&
        !menuRootRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.body.classList.add("mobile-menu-open");
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div
      className="site-header site-container fixed inset-x-0 top-5 z-50 w-full max-sm:top-3"
      ref={menuRootRef}
    >
      <header className="relative z-10 mx-auto flex min-h-[72px] items-center justify-between rounded-[18px] border border-white/70 bg-white/92 p-2.5 pl-5 text-[#102a43] shadow-[0_18px_60px_rgba(5,20,44,0.10)] backdrop-blur-xl max-sm:min-h-[64px] max-sm:p-2 max-sm:pl-4">
        <Brand />

        <nav className="flex items-center gap-1 max-[940px]:hidden" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link
              className="rounded-full px-3 py-2.5 text-sm font-medium text-[#475467] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#eef7ff] hover:text-[#0057d8]"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <QuoteButton />
          <Cta className="max-[1120px]:hidden" href="/products" icon={MessageCircle}>
            WhatsApp
          </Cta>
          <button
            className="icon-button hidden max-[940px]:grid"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-navigation"
        className={`mobile-navigation absolute inset-x-[50px] top-[82px] overflow-hidden rounded-[8px] border border-[#0a84ff24] bg-white p-3 shadow-[0_24px_64px_rgba(5,20,44,0.16)] min-[941px]:hidden max-[768px]:inset-x-6 max-[425px]:inset-x-5 ${
          menuOpen ? "is-open" : ""
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="grid gap-1" aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <Link
              className="flex min-h-12 items-center justify-between rounded-[6px] px-4 text-[15px] font-semibold text-[#102a43] transition-colors hover:bg-[#eef7ff] hover:text-[#0057d8]"
              href={link.href}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
              key={link.label}
            >
              {link.label}
              <PackageSearch className="size-4 text-[#0a84ff]" />
            </Link>
          ))}
        </nav>
        <div className="mt-3 grid grid-cols-2 gap-2 max-[425px]:grid-cols-1">
          <Cta
            asButton
            icon={PackageSearch}
            variant="secondary"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => {
              setMenuOpen(false);
              window.location.href = "/products";
            }}
          >
            Browse stock
          </Cta>
          <Cta
            href="https://wa.me/?text=Hi%20MacVault%2C%20I%20want%20to%20check%20current%20stock."
            icon={MessageCircle}
            className={menuOpen ? "" : "pointer-events-none"}
          >
            WhatsApp
          </Cta>
        </div>
      </div>
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  accent,
  text,
  align = "center",
}: {
  kicker: string;
  title: string;
  accent: string;
  text: string;
  align?: "center" | "left";
}) {
  const accentIndex = title.toLowerCase().indexOf(accent.toLowerCase());
  const before = accentIndex >= 0 ? title.slice(0, accentIndex) : `${title} `;
  const highlighted = accentIndex >= 0 ? title.slice(accentIndex, accentIndex + accent.length) : accent;
  const after = accentIndex >= 0 ? title.slice(accentIndex + accent.length) : "";

  return (
    <div
      className={`reveal mb-11 max-w-[760px] ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } max-sm:mb-8`}
    >
      <Tag>{kicker}</Tag>
      <h2 className="mt-2 text-[clamp(32px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
        {before}
        <AnimatedText>{highlighted}</AnimatedText>
        {after}
      </h2>
      <p
        className={`mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] max-sm:text-base ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export function Footer() {
  const columns = [
    {
      title: "Shop",
      icon: PackageSearch,
      links: [
        { label: "All products", href: "/products" },
        { label: "Why Buy From Us", href: "/why-buy-from-us" },
      ],
    },
    {
      title: "Categories",
      icon: Smartphone,
      links: [
        { label: "iPhones", href: "/products/category/iphone" },
        { label: "MacBooks", href: "/products/category/mac" },
        { label: "PS5", href: "/products/category/ps5" },
      ],
    },
    {
      title: "Support",
      icon: ShieldCheck,
      links: [
        { label: "Our process", href: "/#process" },
        { label: "Buying guide", href: "/#guide" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#102a4312] bg-[#f6fbff] text-[#667085]">
      <div className={`${containerClass} py-[60px]`}>
        <div className="grid gap-5 rounded-[22px] border border-[#0a84ff14] bg-white p-5 shadow-[0_28px_90px_rgba(5,20,44,0.07)]">
          <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] gap-5 max-[1024px]:grid-cols-1">
            <div className="rounded-[18px] bg-[#f4f9ff] p-8 max-[425px]:p-6">
              <Brand />
              <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] text-[#475467]">
                Premium Apple and PlayStation stock with clear condition notes, direct WhatsApp
                confirmation, and local buying support before you visit or reserve.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-[#102a43]">
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-white px-3">
                  <BadgeCheck className="size-4 text-[#0a84ff]" /> Checked stock
                </span>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-white px-3">
                  <Laptop className="size-4 text-[#0a84ff]" /> Apple specialists
                </span>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-white px-3">
                  <Gamepad2 className="size-4 text-[#0a84ff]" /> Console bundles
                </span>
                <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-white px-3">
                  <Headphones className="size-4 text-[#0a84ff]" /> Accessories
                </span>
              </div>
            </div>

            <div className="grid content-between rounded-[18px] border border-[#0a84ff14] bg-white p-8 max-[425px]:p-6">
              <div>
                <span className="inline-flex min-h-9 items-center rounded-full bg-[#eef7ff] px-3 text-xs font-bold tracking-[0.12em] text-[#0057d8] uppercase">
                  Current stock
                </span>
                <h2 className="mt-4 text-[clamp(30px,4vw,48px)] leading-[1.02] font-semibold tracking-[-0.04em] text-[#102a43]">
                  Confirm availability before you move.
                </h2>
                <p className="mt-4 text-[16px] leading-[1.65] text-[#667085]">
                  Ask for today&apos;s iPhone, MacBook, iPad, Watch, accessories, or PS5 stock and
                  get the exact condition and package details.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Cta
                  href="https://wa.me/?text=Hi%20MacVault%2C%20I%20want%20to%20check%20current%20stock."
                  icon={MessageCircle}
                >
                  Ask MacVault
                </Cta>
                <Cta href="/products" icon={PackageSearch} variant="secondary">
                  Browse stock
                </Cta>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(240px,0.7fr)_1fr] gap-8 rounded-[18px] border border-[#102a4310] p-8 max-[900px]:grid-cols-1 max-[425px]:p-6">
            <div>
              <h3 className="text-sm font-semibold tracking-[0.12em] text-[#102a43] uppercase">
                MacVault
              </h3>
              <p className="mt-4 max-w-[360px] text-sm leading-[1.7]">
                A cleaner local buying flow for high-intent buyers who want product truth before a
                visit, payment, or reservation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1">
              {columns.map((column) => {
                const Icon = column.icon;
                return (
                  <div key={column.title}>
                    <div className="mb-4 flex items-center gap-2 text-[#102a43]">
                      <Icon className="size-4 text-[#0a84ff]" />
                      <h3 className="text-sm font-semibold">{column.title}</h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      {column.links.map((link) => (
                        <Link
                          className="flex min-h-10 items-center text-sm transition-colors hover:text-[#0057d8]"
                          href={link.href}
                          key={link.label}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 px-3 pb-1 text-sm text-[#667085] max-sm:flex-col max-sm:items-start">
            <span>© MacVault</span>
            <span>Verified local Apple and PlayStation buying flow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
