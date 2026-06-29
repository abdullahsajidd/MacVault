"use client";

import Image from "next/image";
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
      <div className="product-slider-main">
        <ProductVisual
          key={current.title}
          accent={accent}
          kind={current.kind}
          label={current.title}
          imageUrl={current.imageUrl}
          imageAlt={current.imageAlt}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 max-[560px]:flex-col max-[560px]:items-stretch">
        <div>
          <p className="text-sm font-semibold text-[#050b14]">{current.title}</p>
          <p className="mt-1 text-sm leading-normal text-[#667085]">{current.caption}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            className="icon-button"
            type="button"
            aria-label={`Show previous ${title} image`}
            onClick={() => goTo("previous")}
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={`Show next ${title} image`}
            onClick={() => goTo("next")}
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="gallery-thumbs mt-5 grid grid-cols-3 gap-3" aria-label={`${title} gallery`}>
        {gallery.map((item, index) => (
          <button
            className={`gallery-thumb ${index === active ? "is-active" : ""}`}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            key={item.title}
          >
            <Image
              className="object-contain p-2"
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              sizes="140px"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
}
