import Image from "next/image";
import { BadgeCheck, CircleHelp, ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { containerClass } from "@/components/layout-classes";
import { AnimatedText, Tag } from "@/components/site-primitives";

const otherBrandPoints = [
  "Listings often focus on the model name, storage, and a broad condition label.",
  "PTA status, battery health, box contents, warranty, or current photos may need a separate question.",
  "The buyer usually has to collect details from chat messages before deciding whether to visit or pay.",
  "Final price and availability can change after the listing is opened.",
];

const macVaultPoints = [
  "Product pages put model, condition, PTA where relevant, battery or cycle details, package, warranty, and availability in one place.",
  "Ask for current photos or video before payment when exact-unit condition matters.",
  "WhatsApp starts with useful product context, making it easier to confirm the exact unit before payment.",
  "Lahore buyers can compare first, then ask for current photos, inspection, pickup, delivery, and written terms.",
];

export function ComparisonSection() {
  return (
    <section className={`${containerClass} py-[60px]`}>
      <div className="reveal mb-10 w-full max-w-none">
        <Tag>Buying compare</Tag>
        <h2 className="section-title mt-2 max-w-[980px]">
          Generic listings vs <AnimatedText>MacVault</AnimatedText> product detail.
        </h2>
        <p className="mt-[18px] max-w-[920px] text-[17px] leading-[1.56] text-[#667085]">
          A good product page should answer the questions that affect a real purchase before the
          buyer starts a long chat.
        </p>
      </div>

      <div className="brand-compare-grid reveal">
        <div className="brand-compare-panel">
          <div className="brand-compare-logo">
            <div className="grid size-20 place-items-center rounded-[8px] border border-[#102a4314] bg-[#f8fbff] text-[#667085]">
              <CircleHelp className="size-9" />
            </div>
          </div>
          <div>
            <h3 className="brand-compare-title">
              Other <AnimatedText>brands</AnimatedText>
            </h3>
            <ul className="brand-compare-list mt-6">
              {otherBrandPoints.map((point) => (
                <li key={point}>
                  <ClipboardCheck className="size-5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="brand-compare-panel">
          <div className="brand-compare-logo">
            <Image
              src="/images/brand/macvault-selected-logo.svg"
              alt="MacVault"
              width={340}
              height={102}
              className="h-auto w-[min(340px,100%)]"
            />
          </div>
          <div>
            <h3 className="brand-compare-title">
              Built for the <AnimatedText>exact unit</AnimatedText>.
            </h3>
            <ul className="brand-compare-list mt-6">
              {macVaultPoints.map((point, index) => {
                const Icon = index === 0 ? BadgeCheck : index === 1 ? ShieldCheck : MessageCircle;

                return (
                  <li key={point}>
                    <Icon className="size-5" />
                    <span>{point}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
