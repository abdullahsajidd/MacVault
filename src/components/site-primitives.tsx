import type { ReactNode } from "react";

export function AnimatedText({ children }: { children: ReactNode }) {
  return <span className="animated-text">{children}</span>;
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="tag-pill inline-flex min-h-9 w-fit max-w-full items-center justify-start gap-3 rounded-full border border-[#0a84ff26] bg-white/90 px-3.5 text-[13px] font-semibold tracking-[0.12em] whitespace-nowrap text-[#0057d8] uppercase shadow-[0_10px_30px_rgba(5,20,44,0.05)] max-[425px]:text-[11px] max-[425px]:tracking-[0.1em]">
      <span className="tag-dot size-2 shrink-0 rounded-full bg-[#0a84ff]" />
      {children}
    </span>
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
    <div className={`reveal mb-11 w-full max-w-none ${align === "center" ? "mx-auto text-center" : "text-left"} max-sm:mb-8`}>
      <Tag>{kicker}</Tag>
      <h2 className="section-title mt-2">{before}<AnimatedText>{highlighted}</AnimatedText>{after}</h2>
      <p className={`mt-[18px] max-w-2xl text-[17px] leading-[1.56] text-[#667085] max-sm:text-base ${align === "center" ? "mx-auto" : ""}`}>{text}</p>
    </div>
  );
}
