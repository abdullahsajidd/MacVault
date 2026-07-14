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
    listing: "The current availability status is shown on the product page.",
    confirmation: "The exact unit and reservation timing are confirmed before you commit.",
  },
  {
    label: "Condition",
    listing: "New, sealed, open-box, or used condition is stated with the known notes.",
    confirmation: "Unit-specific photos, marks, battery health, or cycle count are shared when relevant.",
  },
  {
    label: "Package",
    listing: "Expected box, cable, charger, controller, or accessory details are outlined.",
    confirmation: "The exact included items and warranty expectation are confirmed for the unit.",
  },
  {
    label: "Handoff",
    listing: "Available pickup or delivery support is explained before contact.",
    confirmation: "Timing, charges, inspection, payment, and the next step are agreed directly.",
  },
];

export function ComparisonSection() {
  return (
    <section className={`${containerClass} py-[60px]`}>
      <div className="reveal mb-10 max-w-[780px]">
        <Tag>What gets confirmed</Tag>
        <h2 className="section-title mt-2">
          Know what’s listed and what we <span className="animated-text">confirm</span>.
        </h2>
        <p className="mt-[18px] text-[17px] leading-[1.56] text-[#667085]">
          The product page gives you the useful starting details. A direct conversation then confirms
          the exact unit before you reserve, visit, or pay.
        </p>
      </div>

      <div className="comparison-table overflow-hidden rounded-[8px] border border-[#102a431f] bg-white">
        <div className="comparison-table-head border-b border-[#102a431f] bg-[#f8fbff] text-sm font-semibold text-[#667085]">
          <div className="border-r border-[#102a431f] p-5">Detail</div>
          <div className="border-r border-[#102a431f] p-5">On the listing</div>
          <div className="p-5">Before you buy</div>
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
                On the listing
              </span>
              {row.listing}
            </div>
            <div className="p-5 text-[15px] leading-normal font-medium text-[#102a43]">
              <span className="comparison-mobile-label mb-2 text-xs font-bold tracking-[0.1em] text-[#0057d8] uppercase">
                Before you buy
              </span>
              {row.confirmation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
