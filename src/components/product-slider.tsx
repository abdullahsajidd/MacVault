"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductGalleryItem } from "@/data/products";
import { ProductVisual } from "@/components/product-visual";

const categoryGalleryCopy: Record<string, { title: string; description: string }> = {
  iPhone: {
    title: "iPhone gallery",
    description:
      "Review the available views, then confirm current photos, PTA status, battery health, and condition before payment.",
  },
  Mac: {
    title: "MacBook gallery",
    description:
      "Review the available views, then confirm the configuration, battery cycle count, keyboard, charger, and condition.",
  },
  iPad: {
    title: "iPad gallery",
    description:
      "Review the available views, then confirm storage, connectivity, battery condition, accessories, and warranty.",
  },
  Watch: {
    title: "Apple Watch gallery",
    description:
      "Review the available views, then confirm case condition, battery health, band, size, and included accessories.",
  },
  Accessories: {
    title: "Accessories gallery",
    description:
      "Review the available views, then confirm compatibility, condition, included items, and warranty before payment.",
  },
  PlayStation: {
    title: "PlayStation gallery",
    description:
      "Review the available views, then confirm the edition, controller, included games, condition, and warranty.",
  },
  Cables: {
    title: "Cable gallery",
    description:
      "Review the available views, then confirm the connector, length, compatibility, condition, and warranty.",
  },
};

export function ProductSlider({
  gallery,
  accent,
  title,
  category,
}: {
  gallery: ProductGalleryItem[];
  accent: string;
  title: string;
  category: string;
}) {
  const [active, setActive] = useState(0);
  const thumbnailRailRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef(new Map<number, HTMLButtonElement>());
  const current = gallery[active];
  const galleryCopy = categoryGalleryCopy[category] ?? {
    title: "Product gallery",
    description:
      "Review the available views, then confirm current photos, exact condition, included items, and warranty before payment.",
  };

  useEffect(() => {
    if (gallery.length <= 3) return;

    const rail = thumbnailRailRef.current;
    const thumbnail = thumbnailRefs.current.get(active);
    if (!rail || !thumbnail) return;

    const railBounds = rail.getBoundingClientRect();
    const thumbnailBounds = thumbnail.getBoundingClientRect();

    if (thumbnailBounds.left < railBounds.left) {
      rail.scrollTo({
        left: rail.scrollLeft + thumbnailBounds.left - railBounds.left,
        behavior: "smooth",
      });
    } else if (thumbnailBounds.right > railBounds.right) {
      rail.scrollTo({
        left: rail.scrollLeft + thumbnailBounds.right - railBounds.right,
        behavior: "smooth",
      });
    }
  }, [active, gallery.length]);

  const goTo = (direction: "previous" | "next") => {
    const nextIndex =
      direction === "previous"
        ? active === 0
          ? gallery.length - 1
          : active - 1
        : active === gallery.length - 1
          ? 0
          : active + 1;

    setActive(nextIndex);
  };

  return (
    <div className="product-slider reveal w-full max-w-full min-w-0 overflow-hidden">
      <div className="product-slider-main">
        <div className="product-slider-media" key={active}>
          <ProductVisual
            accent={accent}
            kind={current.kind}
            label={current.title}
            imageUrl={current.imageUrl}
            imageAlt={current.imageAlt}
            imageUsage={current.usage}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 max-[560px]:flex-col max-[560px]:items-stretch">
        <div>
          <p className="text-sm font-semibold text-[#050b14]">{galleryCopy.title}</p>
          <p className="mt-1 text-sm leading-normal text-[#667085]">
            {galleryCopy.description}
          </p>
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

      <div
        className={`gallery-thumbs mt-5 ${gallery.length > 3 ? "is-scrollable" : ""}`}
        style={{ "--gallery-columns": Math.min(gallery.length, 3) } as CSSProperties}
        aria-label={`${title} gallery`}
        ref={thumbnailRailRef}
      >
        {gallery.map((item, index) => (
          <button
            className={`gallery-thumb relative min-h-24 overflow-hidden rounded-lg border bg-white transition ${
              index === active
                ? "is-active border-[#0a84ff] shadow-[0_0_0_3px_rgba(10,132,255,0.12)]"
                : "border-[#102a431f]"
            }`}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => setActive(index)}
            ref={(node) => {
              if (node) {
                thumbnailRefs.current.set(index, node);
              } else {
                thumbnailRefs.current.delete(index);
              }
            }}
            key={`${item.title}-${index}`}
          >
            <Image
              className="object-contain p-2"
              src={item.imageUrl}
              alt={item.imageAlt}
              fill
              sizes="140px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
