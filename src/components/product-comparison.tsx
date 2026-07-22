"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Scale, Trash2, X } from "lucide-react";
import { useCatalog } from "@/components/catalog-provider";
import { useProductComparison } from "@/components/comparison-provider";
import { productPath } from "@/lib/product-routes";
import { getExpectedPriceLabel } from "@/data/products";
import { openConsentAwareWhatsapp } from "@/lib/whatsapp-inquiry";

export function FloatingCompareBar() {
  const { comparedSlugs, clearCompare } = useProductComparison();
  const { products } = useCatalog();
  const [modalOpen, setModalOpen] = useState(false);

  if (comparedSlugs.length === 0) return null;

  const comparedProducts = products.filter((p) => comparedSlugs.includes(p.slug));

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#0a84ff30] bg-[#05142cec] px-4 py-3 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center gap-2">
          <Scale className="size-4 text-[#0a84ff]" />
          <span className="text-xs font-semibold">Comparing {comparedProducts.length} items</span>
        </div>

        <div className="flex items-center -space-x-2">
          {comparedProducts.map((p) => (
            <div
              key={p.slug}
              className="flex size-7 items-center justify-center rounded-full border border-white bg-white text-[10px] font-bold text-[#102a43]"
              title={p.title}
            >
              {p.shortTitle ? p.shortTitle.slice(0, 2) : p.title.slice(0, 2)}
            </div>
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-[#0a84ff] px-3 py-1.5 text-xs font-bold text-white transition-hover hover:bg-[#0066cc]"
        >
          View Specs Matrix
        </button>

        <button
          onClick={clearCompare}
          className="rounded-full p-1 text-[#94a3b8] hover:bg-[#ffffff1f] hover:text-white"
          title="Clear list"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {modalOpen && <ComparisonModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

export function ComparisonModal({ onClose }: { onClose: () => void }) {
  const { comparedSlugs, toggleCompare } = useProductComparison();
  const { products } = useCatalog();
  const [openingWhatsapp, setOpeningWhatsapp] = useState(false);

  const comparedProducts = products.filter((p) => comparedSlugs.includes(p.slug));

  const compareWaText = `Hi MacVault, I am comparing these items on your website:\n${comparedProducts
    .map((p) => `- ${p.title} (${p.unitDetails?.storage || "N/A"})`)
    .join("\n")}\nCan you tell me which unit is available today and the current exact price?`;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#05142c80] p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[#0a84ff26] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#102a4312] pb-4">
          <div className="flex items-center gap-2">
            <Scale className="size-6 text-[#0a84ff]" />
            <h2 className="text-xl font-bold text-[#102a43]">Side-by-Side Product Comparison</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#667085] hover:bg-[#f1f5f9] hover:text-[#102a43]"
          >
            <X className="size-5" />
          </button>
        </div>

        {comparedProducts.length === 0 ? (
          <div className="py-12 text-center text-[#667085]">
            <p>No items selected for comparison.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm text-[#102a43]">
              <thead>
                <tr>
                  <th className="w-1/4 p-3 font-semibold text-[#667085]">Spec / Feature</th>
                  {comparedProducts.map((product) => (
                    <th key={product.slug} className="p-3 text-center align-top">
                      <div className="relative mx-auto flex flex-col items-center">
                        <button
                          onClick={() => toggleCompare(product.slug)}
                          className="absolute -top-2 -right-2 rounded-full bg-[#f1f5f9] p-1 text-[#667085] hover:bg-[#fee2e2] hover:text-[#ef4444]"
                          title="Remove from comparison"
                        >
                          <X className="size-3.5" />
                        </button>
                        <span className="font-bold text-[#102a43]">{product.title}</span>
                        <span className="mt-1 rounded bg-[#0a84ff14] px-2 py-0.5 text-[11px] font-bold uppercase text-[#0057d8]">
                          {product.condition}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#102a4310]">
                <tr>
                  <td className="p-3 font-semibold text-[#667085]">Expected Price</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center font-bold text-[#0057d8]">
                      {getExpectedPriceLabel(p)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-[#667085]">Category</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center capitalize">
                      {p.category}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-[#667085]">Storage / RAM</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center">
                      {p.unitDetails?.storage || "N/A"} {p.unitDetails?.ram ? `/ ${p.unitDetails.ram}` : ""}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-[#667085]">PTA Status</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center">
                      {p.unitDetails?.ptaStatus ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                          <Check className="size-3.5" /> {p.unitDetails.ptaStatus}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-[#667085]">Battery / Cycles</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center">
                      {p.unitDetails?.batteryHealth
                        ? `${p.unitDetails.batteryHealth}% Health`
                        : p.unitDetails?.batteryCycleCount
                        ? `${p.unitDetails.batteryCycleCount} Cycles`
                        : "N/A"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-[#667085]">Warranty</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center">
                      {p.unitDetails?.warranty || "Not Available"}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-semibold text-[#667085]">Action</td>
                  {comparedProducts.map((p) => (
                    <td key={p.slug} className="p-3 text-center">
                      <Link
                        href={productPath(p.slug)}
                        onClick={onClose}
                        className="inline-block rounded-lg border border-[#0a84ff] px-3 py-1.5 text-xs font-bold text-[#0057d8] transition-colors hover:bg-[#eef7ff]"
                      >
                        View Unit
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#102a4312] pt-4">
          <span className="text-xs text-[#667085]">
            Confirm exact battery cycles and physical condition on WhatsApp before payment.
          </span>
          <button
            type="button"
            disabled={openingWhatsapp}
            onClick={async () => {
              setOpeningWhatsapp(true);
              await openConsentAwareWhatsapp(`${compareWaText}\nPage URL: ${window.location.href}`);
            }}
            className="flex items-center gap-2 rounded-xl bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#20bd5a]"
          >
            <MessageCircle className="size-4" />
            {openingWhatsapp ? "Opening WhatsApp" : "Inquire Compared Units on WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
}
