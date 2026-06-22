"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductGalleryItem } from "@/data/products";
import { ProductVisual } from "@/components/product-visual";

export function ProductSlider({
  gallery,
  accent,
  title,
}: {
  gallery: ProductGalleryItem[];
  accent: string;
  title: string;
}) {
  const [active, setActive] = useState(0);
  const current = gallery[active];

  const goTo = (direction: "previous" | "next") => {
    setActive((index) => {
      if (direction === "previous") {
        return index === 0 ? gallery.length - 1 : index - 1;
      }

      return index === gallery.length - 1 ? 0 : index + 1;
    });
  };

  return (
    <div className="reveal">
      <ProductVisual accent={accent} kind={current.kind} label={current.title} />

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#07111f]">{current.title}</p>
          <p className="mt-1 text-sm leading-normal text-[#687386]">{current.caption}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            className="grid size-10 place-items-center rounded-full border border-[#07111f1f] bg-white text-[#07111f] transition-colors hover:border-[#007aff52] hover:text-[#007aff]"
            type="button"
            aria-label={`Show previous ${title} image`}
            onClick={() => goTo("previous")}
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            className="grid size-10 place-items-center rounded-full border border-[#07111f1f] bg-white text-[#07111f] transition-colors hover:border-[#007aff52] hover:text-[#007aff]"
            type="button"
            aria-label={`Show next ${title} image`}
            onClick={() => goTo("next")}
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-2" aria-label={`${title} gallery position`}>
        {gallery.map((item, index) => (
          <button
            className={`h-1 rounded-full transition-colors ${
              index === active ? "w-4 bg-[#007aff]" : "w-1 bg-[#07111f2e]"
            }`}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
}
