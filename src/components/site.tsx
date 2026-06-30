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
  { label: "Support", href: "/#support" },
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
    <span className="tag-pill inline-flex min-h-9 items-center gap-2 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)] max-[425px]:text-[11px] max-[425px]:tracking-[0.1em]">
      <span className="tag-dot size-2 rounded-full bg-[#0a84ff]" />
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
        { label: "Why buy from us", href: "/why-buy-from-us" },
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
        { label: "Concierge", href: "/#support" },
      ],
    },
  ];

  return (
    <footer className="bg-[#07111f] text-white/65">
      <div className={`${containerClass} py-[60px]`}>
        <div className="grid grid-cols-[1.3fr_2fr] gap-16 max-[1024px]:grid-cols-1">
          <div>
            <Brand />
            <p className="mt-5 max-w-[430px] text-[15px] leading-[1.7]">
              Premium Apple and PS5 stock with verified details, clear condition notes, and a
              direct local buying flow.
            </p>
            <div className="mt-7">
              <Cta
                href="https://wa.me/?text=Hi%20MacVault%2C%20I%20want%20to%20check%20current%20stock."
                icon={MessageCircle}
              >
                Ask MacVault
              </Cta>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 max-[768px]:grid-cols-2 max-[425px]:grid-cols-1">
            {columns.map((column) => {
              const Icon = column.icon;
              return (
                <div key={column.title}>
                  <div className="mb-5 flex items-center gap-2 text-white">
                    <Icon className="size-4 text-[#45a3ff]" />
                    <h3 className="text-sm font-semibold">{column.title}</h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    {column.links.map((link) => (
                      <Link
                        className="flex min-h-11 items-center text-sm transition-colors hover:text-[#45a3ff]"
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

        <div className="mt-12 flex items-center justify-between gap-5 border-t border-white/12 pt-6 text-sm max-sm:flex-col max-sm:items-start">
          <span>MacVault</span>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="size-4 text-[#45a3ff]" /> Verified stock
            </span>
            <span className="inline-flex items-center gap-2">
              <Laptop className="size-4 text-[#45a3ff]" /> Apple specialists
            </span>
            <span className="inline-flex items-center gap-2">
              <Gamepad2 className="size-4 text-[#45a3ff]" /> Console bundles
            </span>
            <span className="sr-only">
              <Headphones /> Accessories
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
