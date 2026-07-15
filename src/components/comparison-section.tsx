import { containerClass } from "@/components/layout-classes";
import { Tag } from "@/components/site";

export type ComparisonRow = {
  label: string;
  listing: string;
  confirmation: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Stock",
    listing: "The page shows whether the product is available, limited, arriving soon, reserved, or sold.",
    confirmation: "Ask whether the exact model and variant are still available before you travel or send payment.",
  },
  {
    label: "Condition",
    listing: "The page states whether the product is sealed, open-box, or used, with the known condition notes.",
    confirmation: "Check photos of the exact unit, marks, battery health, or cycle count when they apply.",
  },
  {
    label: "Price and package",
    listing: "The page shows a price when one is published and lists the expected box, cable, charger, controller, or accessories.",
    confirmation: "Get the final price, included items, and warranty terms in writing for the exact unit.",
  },
  {
    label: "Pickup or delivery",
    listing: "The page explains whether pickup or delivery may be available.",
    confirmation: "Agree on timing, charges, inspection, payment, and the handover before the order moves forward.",
  },
];

export function ComparisonSection() {
  return (
    <section className={`${containerClass} py-[60px]`}>
      <div className="reveal mb-10 max-w-[780px]">
        <Tag>What to check</Tag>
        <h2 className="section-title mt-2">
          What you can see now and what to check next.
        </h2>
        <p className="mt-[18px] text-[17px] leading-[1.56] text-[#667085]">
          Use the product page to compare your options. Before payment, make sure the exact unit,
          final price, condition, included items, and warranty match what you were told.
        </p>
      </div>

      <div className="comparison-table overflow-hidden rounded-[8px] border border-[#102a431f] bg-white">
        <div className="comparison-table-head border-b border-[#102a431f] bg-[#f8fbff] text-sm font-semibold text-[#667085]">
          <div className="border-r border-[#102a431f] p-5">Detail</div>
          <div className="border-r border-[#102a431f] p-5">What the page shows</div>
          <div className="p-5">What to check before payment</div>
        </div>

        {comparisonRows.map((row, index) => (
          <div
            className="comparison-table-row reveal border-b border-[#102a431f] last:border-b-0"
            style={{ transitionDelay: `${index * 60}ms` }}
            key={row.label}
          >
            <div className="border-r border-[#102a431f] p-5 text-sm font-bold text-[#0057d8] max-[768px]:border-r-0 max-[768px]:border-b max-[768px]:bg-[#f8fbff]">
              {row.label}
            </div>
            <div className="border-r border-[#102a431f] p-5 text-[15px] leading-normal text-[#667085] max-[768px]:border-r-0 max-[768px]:border-b">
              <span className="comparison-mobile-label mb-2 text-xs font-bold tracking-[0.1em] text-[#98a2b3] uppercase">
                What the page shows
              </span>
              {row.listing}
            </div>
            <div className="p-5 text-[15px] leading-normal font-medium text-[#102a43]">
              <span className="comparison-mobile-label mb-2 text-xs font-bold tracking-[0.1em] text-[#0057d8] uppercase">
                What to check before payment
              </span>
              {row.confirmation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
