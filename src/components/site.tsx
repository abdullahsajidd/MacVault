import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Menu, MessageCircle } from "lucide-react";
import { QuoteButton } from "./quote-modal";

export const containerClass =
  "site-container";

export function Brand() {
  return (
    <Link className="inline-flex min-h-11 min-w-max items-center gap-3 text-[15px] font-semibold tracking-[0.02em]" href="/">
      <span className="grid size-[36px] place-items-center rounded-[14px] bg-linear-to-br from-[#0a84ff] to-[#0057d8] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
        M
      </span>
      <span>MacVault</span>
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)] max-[425px]:text-[11px] max-[425px]:tracking-[0.1em]">
      <span className="size-2 rounded-full bg-[#0a84ff]" />
      {children}
    </span>
  );
}

function AnimatedButtonLabel({ children }: { children: string }) {
  const letters = Array.from(children);

  return (
    <span className="button-label" aria-hidden="true">
      {[0, 1].map((row) => (
        <span className="button-label-row" key={row}>
          {letters.map((letter, index) => (
            <span
              className="button-label-letter"
              style={{ transitionDelay: `${index * 18}ms` } as CSSProperties}
              key={`${row}-${letter}-${index}`}
            >
              {letter === " " ? "\u00a0" : letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export function Cta({
  children,
  href = "/products",
  variant = "primary",
  icon: Icon,
  className = "",
}: {
  children: string;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
  icon?: LucideIcon;
  className?: string;
}) {
  const base =
    "premium-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-[transform,box-shadow,border-color,background-color] duration-300 hover:-translate-y-0.5";
  const styles = {
    primary:
      "border border-[#0a84ff] bg-[#0a84ff] text-white shadow-[0_14px_34px_rgba(10,132,255,0.22)] hover:border-[#0057d8] hover:bg-[#0057d8] hover:shadow-[0_18px_42px_rgba(10,132,255,0.28)]",
    secondary:
      "border border-[#0a84ff30] bg-white/90 text-[#0057d8] hover:border-[#0a84ff] hover:bg-[#f4f9ff] hover:shadow-[0_14px_34px_rgba(5,20,44,0.07)]",
    dark: "border border-[#102a43] bg-[#102a43] text-white shadow-[0_14px_34px_rgba(5,20,44,0.16)] hover:border-[#0057d8] hover:bg-[#0057d8]",
  };

  const content = (
    <>
      {Icon ? <Icon className="size-4" strokeWidth={2} /> : null}
      <AnimatedButtonLabel>{children}</AnimatedButtonLabel>
      <span className="sr-only">{children}</span>
    </>
  );
  const classes = `${base} ${styles[variant]} ${className}`;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a className={classes} href={href}>
      {content}
    </a>
  );
}

export function Header() {
  const links = [
    { label: "Products", href: "/products" },
    { label: "Why Buy", href: "/why-buy-from-us" },
    { label: "Process", href: "/#process" },
    { label: "Guide", href: "/#guide" },
    { label: "Support", href: "/#support" },
  ];

  return (
    <div className="site-container fixed top-5 inset-x-0 z-50 w-full max-sm:top-3">
      <header className="mx-auto flex min-h-[72px] items-center justify-between rounded-[18px] border border-white/70 bg-white/88 p-2.5 pl-5 text-[#102a43] shadow-[0_18px_60px_rgba(5,20,44,0.10)] backdrop-blur-2xl max-sm:min-h-[64px] max-sm:rounded-[18px] max-sm:p-2.5 max-sm:pl-4">
        <Link className="inline-flex min-h-11 min-w-max items-center gap-3 text-[15px] font-semibold tracking-[0.02em]" href="/">
          <span className="grid size-[38px] place-items-center rounded-[13px] bg-[#102a43] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            M
          </span>
          <span>MacVault</span>
        </Link>

        <nav className="flex items-center gap-1 max-[940px]:hidden" aria-label="Main navigation">
          {links.map((link) => (
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
          <Cta className="min-h-11 px-4 max-sm:hidden" icon={MessageCircle}>
            WhatsApp
          </Cta>
          <Link
            className="hidden size-11 place-items-center rounded-[16px] border border-[#0a84ff2e] bg-white text-[#0057d8] max-[940px]:grid"
            href="/products"
            aria-label="Browse products"
          >
            <Menu className="size-5" strokeWidth={2} />
          </Link>
        </div>
      </header>
    </div>
  );
}

export function SectionHead({
  kicker,
  title,
  text,
  align = "center",
}: {
  kicker: string;
  title: string;
  text: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`reveal mb-11 max-w-[760px] ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } max-sm:mb-8`}
    >
      <Tag>{kicker}</Tag>
      <h2 className="mt-2 text-[clamp(32px,5vw,64px)] leading-none font-semibold tracking-normal max-sm:text-[34px]">
        {title}
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
      links: [
        { label: "Products", href: "/products" },
        { label: "Why Buy", href: "/why-buy-from-us" },
        { label: "Current Drops", href: "/#drops" },
      ],
    },
    {
      title: "Categories",
      links: [
        { label: "iPhones", href: "/products" },
        { label: "MacBooks", href: "/products" },
        { label: "PS5 & Accessories", href: "/products" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Process", href: "/#process" },
        { label: "Buying Guide", href: "/#guide" },
        { label: "Concierge", href: "/#support" },
      ],
    },
  ];

  return (
    <footer className="border-t border-[#102a431f] bg-white text-[#667085]">
      <div className={`${containerClass} py-12 max-sm:py-10`}>
        <div className="grid grid-cols-[1.4fr_2fr] gap-10 max-[900px]:grid-cols-1">
          <div>
            <Brand />
            <p className="mt-5 max-w-[430px] text-[15px] leading-[1.6]">
              Premium Apple and PS5 drops with verified stock details, clear condition notes, and
              WhatsApp-first ordering.
            </p>
            <div className="mt-6">
              <Cta href="/products" icon={MessageCircle}>
                WhatsApp
              </Cta>
            </div>
          </div>

          <div className="grid grid-cols-3 border-y border-[#102a431f] max-sm:grid-cols-1">
            {columns.map((column) => (
              <div
                className="border-r border-[#102a431f] p-5 last:border-r-0 max-sm:border-r-0 max-sm:border-b max-sm:last:border-b-0"
                key={column.title}
              >
                <h3 className="mb-4 text-sm font-semibold text-[#102a43]">{column.title}</h3>
                <div className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <Link
                      className="flex min-h-11 items-center text-sm transition-colors hover:text-[#0a84ff]"
                      href={link.href}
                      key={link.label}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-5 border-t border-[#102a431f] pt-5 text-sm max-sm:flex-col max-sm:items-start">
          <span>MacVault</span>
          <span>Curated Apple, PS5, and accessory stock.</span>
        </div>
      </div>
    </footer>
  );
}
