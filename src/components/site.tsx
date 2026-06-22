import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Menu, MessageCircle } from "lucide-react";

export const containerClass =
  "mx-auto w-[min(1160px,calc(100%_-_40px))] max-sm:w-[calc(100%_-_28px)]";

export function Brand() {
  return (
    <Link className="inline-flex min-w-max items-center gap-3 text-[15px] font-semibold" href="/">
      <span className="grid size-[34px] place-items-center rounded-full bg-linear-to-br from-[#007aff] to-[#165cff] text-white">
        M
      </span>
      <span>MacVault</span>
    </Link>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#007aff33] bg-white px-3.5 text-[13px] font-medium text-[#0759c7]">
      <span className="size-2 rounded-full bg-[#23c879]" />
      {children}
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
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark";
  icon?: LucideIcon;
  className?: string;
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5";
  const styles = {
    primary: "border border-[#007aff] bg-[#007aff] text-white",
    secondary: "border border-[#007aff38] bg-white text-[#0759c7]",
    dark: "border border-white/20 bg-white text-[#07111f]",
  };

  const content = (
    <>
      {Icon ? <Icon className="size-4" strokeWidth={2} /> : null}
      {children}
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
    <div className="sticky top-[22px] z-20 mx-auto w-[min(1160px,calc(100%_-_40px))] px-5 max-sm:top-3.5 max-sm:w-[calc(100%_-_28px)] max-sm:px-0">
      <header className="mx-auto flex min-h-[66px] items-center justify-between rounded-full border border-[#07111f1f] bg-white py-[9px] pr-2.5 pl-5 shadow-[0_14px_34px_rgba(7,17,31,0.08)]">
        <Brand />

        <nav className="flex items-center gap-1 max-[940px]:hidden" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              className="rounded-full px-3 py-2.5 text-sm font-medium text-[#687386] transition-colors hover:bg-[#007aff14] hover:text-[#07111f]"
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
            className="hidden size-11 place-items-center rounded-full border border-[#07111f1f] bg-white text-[#07111f] max-[940px]:grid"
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
        className={`mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#687386] ${
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
    <footer className="bg-white py-[38px] text-[#687386]">
      <div className={`${containerClass} flex justify-between gap-5 border-t border-[#07111f1f] pt-6 max-sm:flex-col`}>
        <Brand />
        <span>Premium Apple and PS5 drops with WhatsApp-first ordering.</span>
      </div>
    </footer>
  );
}
