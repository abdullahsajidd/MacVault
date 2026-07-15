"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeCheck,
  Mail,
  Menu,
  MessageCircle,
  PackageSearch,
  PhoneCall,
  X,
} from "lucide-react";
import { Cta } from "@/components/cta";
import { useCatalog } from "@/components/catalog-provider";
import { containerClass } from "@/components/layout-classes";
import { QuoteButton } from "@/components/quote-modal";
import { emailAddress, emailHref, phoneDisplay, phoneHref, whatsappStockHref } from "@/data/contact";

export { containerClass };

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
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
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

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
      <header className="relative z-10 mx-auto flex min-h-[72px] items-center justify-between rounded-[18px] border border-[#102a4314] bg-white p-2.5 pl-5 text-[#102a43] shadow-[0_18px_60px_rgba(5,20,44,0.10)] max-sm:min-h-[64px] max-sm:p-2 max-sm:pl-4">
        <Brand />

        <nav className="flex items-center gap-1 max-[940px]:hidden" aria-label="Main navigation">
          {navigationLinks.map((link) => (
            <Link
              className={`rounded-full border px-3 py-2.5 text-sm font-medium transition-colors duration-300 ${
                isActive(link.href)
                  ? "border-[#0a84ff38] bg-[#eef7ff] text-[#0057d8]"
                  : "border-transparent text-[#475467] hover:border-[#0a84ff24] hover:bg-[#f4f9ff] hover:text-[#0057d8]"
              }`}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <QuoteButton />
          <Cta className="max-[1120px]:hidden" href={whatsappStockHref} icon={MessageCircle}>
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
              className={`flex min-h-12 items-center justify-between rounded-[6px] border px-4 text-[15px] font-semibold transition-colors ${
                isActive(link.href)
                  ? "border-[#0a84ff38] bg-[#eef7ff] text-[#0057d8]"
                  : "border-transparent text-[#102a43] hover:border-[#0a84ff24] hover:bg-[#f4f9ff] hover:text-[#0057d8]"
              }`}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
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
              router.push("/products#inventory");
            }}
          >
            Browse stock
          </Cta>
          <Cta
            href={whatsappStockHref}
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
      <h2 className="section-title mt-2">
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
  const { categories } = useCatalog();
  const columns = [
    {
      title: "Explore",
      icon: PackageSearch,
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Products", href: "/products" },
        { label: "Why Us", href: "/why-us" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Policies",
      icon: BadgeCheck,
      links: [
        { label: "Pickup & delivery", href: "/delivery" },
        { label: "Returns & refunds", href: "/returns" },
        { label: "Warranty", href: "/warranty" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
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

              <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-[#102a43]">
                <a
                  className="inline-flex min-h-10 max-w-full min-w-0 items-center gap-2 break-all rounded-full border border-[#0a84ff1f] bg-white px-3 transition-colors hover:border-[#0a84ff66] hover:text-[#0057d8]"
                  href={phoneHref}
                >
                  <PhoneCall className="size-4 text-[#0a84ff]" />
                  {phoneDisplay}
                </a>
                <a
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#0a84ff1f] bg-white px-3 transition-colors hover:border-[#0a84ff66] hover:text-[#0057d8]"
                  href={emailHref}
                >
                  <Mail className="size-4 text-[#0a84ff]" />
                  {emailAddress}
                </a>
              </div>

              <div className="mt-6 border-t border-[#102a4314] pt-5">
                <h3 className="text-xs font-bold tracking-[0.12em] text-[#667085] uppercase">
                  Categories
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      className="inline-flex min-h-10 items-center rounded-full border border-[#0a84ff1f] bg-white px-3 text-sm font-semibold text-[#102a43] transition-colors hover:border-[#0a84ff66] hover:text-[#0057d8]"
                      href={`${category.href}#product-grid`}
                      key={category._id}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            <div className="grid content-between rounded-[18px] border border-[#0a84ff14] bg-white p-8 max-[425px]:p-6">
              <div>
                <span className="inline-flex min-h-9 items-center rounded-full bg-[#eef7ff] px-3 text-xs font-bold tracking-[0.12em] text-[#0057d8] uppercase">
                  Current stock
                </span>
                <h2 className="section-title mt-4 text-[#102a43]">
                  Confirm availability before you move.
                </h2>
                <p className="mt-4 text-[16px] leading-[1.65] text-[#667085]">
                  Ask for today&apos;s iPhone, MacBook, iPad, Watch, accessories, or PlayStation stock and
                  get the exact condition and package details on {phoneDisplay}.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Cta
                  href={whatsappStockHref}
                  icon={MessageCircle}
                >
                  Ask MacVault
                </Cta>
                <Cta href="/products#inventory" icon={PackageSearch} variant="secondary">
                  Browse stock
                </Cta>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(240px,0.7fr)_1fr] gap-8 rounded-[18px] border border-[#102a4310] p-8 max-[900px]:grid-cols-1 max-[425px]:p-6">
            <div>
              <Brand />
              <p className="mt-4 max-w-[360px] text-sm leading-[1.7]">
                Clear product details and a direct local buying flow before a visit, payment, or
                reservation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 max-[640px]:grid-cols-1">
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
                        link.href.startsWith("/") ? (
                          <Link
                            className="flex min-h-10 items-center break-words text-sm transition-colors hover:text-[#0057d8]"
                            href={link.href}
                            key={link.label}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            className="flex min-h-10 items-center break-words text-sm transition-colors hover:text-[#0057d8]"
                            href={link.href}
                            key={link.label}
                          >
                            {link.label}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 px-3 pb-1 text-sm text-[#667085] max-sm:flex-col max-sm:items-start">
            <span>© MacVault</span>
            <span>Apple and PlayStation tech with clear condition details.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
