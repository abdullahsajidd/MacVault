import type { CSSProperties } from "react";
import type { ProductVisualKind } from "@/data/products";

export function ProductVisual({
  kind,
  accent,
  label,
  size = "large",
  className = "",
}: {
  kind: ProductVisualKind;
  accent: string;
  label: string;
  size?: "large" | "compact";
  className?: string;
}) {
  const style = { "--accent": accent } as CSSProperties;

  return (
    <div
      className={`relative grid overflow-hidden rounded-lg border border-[#050b141f] bg-[linear-gradient(145deg,#ffffff,#f5f5f7)] ${
        size === "compact" ? "min-h-[230px]" : "min-h-[360px]"
      } ${className}`}
      style={style}
      aria-label={label}
    >
      <div className="absolute inset-x-8 top-8 h-px bg-linear-to-r from-transparent via-[#050b1424] to-transparent" />
      <div className="absolute right-8 bottom-8 left-8 h-px bg-linear-to-r from-transparent via-[#050b1424] to-transparent" />
      <div className="absolute top-8 right-8 rounded-full border border-[#050b141f] bg-white px-3 py-1 text-xs font-semibold text-[#667085]">
        {label}
      </div>
      <div className={`relative grid place-items-center p-8 ${size === "compact" ? "scale-[0.72]" : ""}`}>
        {kind === "phone" ? <PhoneMock /> : null}
        {kind === "laptop" ? <LaptopMock /> : null}
        {kind === "tablet" ? <TabletMock /> : null}
        {kind === "watch" ? <WatchMock /> : null}
        {kind === "console" ? <ConsoleMock /> : null}
        {kind === "audio" ? <AudioMock /> : null}
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative h-[250px] w-[132px] rotate-[-4deg] rounded-[34px] border border-[#050b142e] bg-white shadow-[0_18px_42px_rgba(5,20,44,0.12)]">
      <div className="absolute inset-[10px] rounded-[26px] bg-[linear-gradient(155deg,#0d1628_0_13%,var(--accent)_13%_47%,#f5f5f7_47%_100%)]" />
      <div className="absolute top-5 left-1/2 h-3.5 w-[46px] -translate-x-1/2 rounded-full bg-[#101828]" />
      <div className="absolute right-5 bottom-8 left-5 h-px bg-white/50" />
    </div>
  );
}

function LaptopMock() {
  return (
    <div className="relative h-[214px] w-[min(420px,78vw)] rounded-t-[20px] rounded-b-lg border border-[#050b142a] bg-white shadow-[0_18px_42px_rgba(5,20,44,0.12)]">
      <div className="absolute inset-x-3.5 top-3.5 bottom-[28px] rounded-[10px] bg-[linear-gradient(150deg,#101828,#17243a_40%,var(--accent)_40%_56%,#f5f5f7_56%_100%)]" />
      <div className="absolute bottom-[-18px] left-1/2 h-[22px] w-[108%] -translate-x-1/2 rounded-b-[18px] bg-linear-to-r from-[#c3ccda] via-white to-[#b6c0d0]" />
    </div>
  );
}

function TabletMock() {
  return (
    <div className="relative h-[244px] w-[178px] rotate-[3deg] rounded-[28px] border border-[#050b142e] bg-white shadow-[0_18px_42px_rgba(5,20,44,0.12)]">
      <div className="absolute inset-[12px] rounded-[19px] bg-[linear-gradient(145deg,#0d1628_0_18%,var(--accent)_18%_56%,#f5f5f7_56%_100%)]" />
      <div className="absolute bottom-[18px] left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-white/70" />
    </div>
  );
}

function WatchMock() {
  return (
    <div className="relative h-[250px] w-[120px]">
      <div className="absolute top-0 left-1/2 h-[72px] w-[48px] -translate-x-1/2 rounded-t-[24px] bg-[#050b14]" />
      <div className="absolute bottom-0 left-1/2 h-[72px] w-[48px] -translate-x-1/2 rounded-b-[24px] bg-[#050b14]" />
      <div className="absolute top-[62px] left-1/2 h-[128px] w-[104px] -translate-x-1/2 rounded-[32px] border border-[#050b1438] bg-white p-2 shadow-[0_18px_42px_rgba(5,20,44,0.12)]">
        <div className="h-full rounded-[24px] bg-[linear-gradient(145deg,#101828,var(--accent)_45%,#f5f5f7)]" />
      </div>
    </div>
  );
}

function ConsoleMock() {
  return (
    <div className="relative h-[260px] w-[230px]">
      <div className="absolute top-8 left-6 h-[210px] w-[82px] rounded-[34px_12px_20px_34px] border border-[#050b1424] bg-white shadow-[0_18px_42px_rgba(5,20,44,0.12)]" />
      <div className="absolute top-4 left-[82px] h-[238px] w-[68px] rounded-[18px] bg-[#101828]" />
      <div className="absolute top-8 right-6 h-[210px] w-[82px] rounded-[12px_34px_34px_20px] border border-[#050b1424] bg-[linear-gradient(145deg,#ffffff,var(--accent))] shadow-[0_18px_42px_rgba(5,20,44,0.12)]" />
    </div>
  );
}

function AudioMock() {
  return (
    <div className="relative h-[236px] w-[250px]">
      <div className="absolute top-20 left-1/2 h-[112px] w-[172px] -translate-x-1/2 rounded-[38px] border border-[#050b1424] bg-white shadow-[0_18px_42px_rgba(5,20,44,0.12)]">
        <div className="absolute top-5 left-1/2 h-1.5 w-14 -translate-x-1/2 rounded-full bg-[#050b1424]" />
        <div className="absolute bottom-5 left-1/2 size-2 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
      </div>
      <div className="absolute top-2 left-[70px] h-[102px] w-9 rounded-full bg-white shadow-[0_16px_30px_rgba(5,20,44,0.12)]" />
      <div className="absolute top-2 right-[70px] h-[102px] w-9 rounded-full bg-white shadow-[0_16px_30px_rgba(5,20,44,0.12)]" />
    </div>
  );
}
