import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Menu, MessageCircle } from "lucide-react";

export const containerClass =
  "site-container";

export function Brand() {
  return (
    <Link className="inline-flex min-w-max items-center gap-3 text-[15px] font-semibold tracking-[0.02em]" href="/">
      <span className="grid size-[36px] place-items-center rounded-[14px] bg-linear-to-br from-[#0a84ff] to-[#0057d8] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]">
        M
      </span>
      <span>MacVault</span>
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)]">
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
      "border border-[#050b14] bg-[#050b14] text-white hover:border-[#0a84ff] hover:bg-[#111827]",
    secondary:
      "border border-[#0a84ff30] bg-white/90 text-[#0057d8] hover:border-[#0a84ff] hover:bg-[#f4f9ff]",
    dark: "border border-white/25 bg-white text-[#050b14] hover:border-[#8fc7ff]",
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
    <div className="site-container fixed top-5 inset-x-0 z-50 w-full max-sm:top-3.5">
      <header className="mx-auto flex min-h-[70px] items-center justify-between rounded-[26px] border border-[#050b1414] bg-white/86 py-2.5 pr-2.5 pl-5 shadow-[0_18px_54px_rgba(5,20,44,0.10)] backdrop-blur-2xl">
        <Brand />

        <nav className="flex items-center gap-1 max-[940px]:hidden" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              className="rounded-full px-3 py-2.5 text-sm font-medium text-[#667085] transition-colors hover:bg-[#0a84ff12] hover:text-[#050b14]"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Cta className="max-sm:hidden" icon={MessageCircle}>
            WhatsApp Stock
          </Cta>
          <Link
            className="hidden size-11 place-items-center rounded-full border border-[#050b141f] bg-white text-[#050b14] max-[940px]:grid"
            href="/products"
            aria-label="Open products"
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
      }`}
    >
      <Tag>{kicker}</Tag>
      <h2 className="mt-2 text-[clamp(34px,5vw,64px)] leading-none font-semibold tracking-normal">
        {title}
      </h2>
      <p
        className={`mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {text}
      </p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-white py-[38px] text-[#667085]">
      <div className={`${containerClass} flex justify-between gap-5 border-t border-[#050b141f] pt-6 max-sm:flex-col`}>
        <Brand />
        <span>Premium Apple and PS5 drops with WhatsApp-first ordering.</span>
      </div>
    </footer>
  );
}
