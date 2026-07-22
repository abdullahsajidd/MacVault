"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ProductComparisonContextType = {
  comparedSlugs: string[];
  toggleCompare: (slug: string) => void;
  isCompared: (slug: string) => boolean;
  clearCompare: () => void;
};

const ProductComparisonContext = createContext<ProductComparisonContextType | null>(null);
const COMPARE_STORAGE_KEY = "macvault_compared_items";

export function ProductComparisonProvider({ children }: { children: ReactNode }) {
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const compared = localStorage.getItem(COMPARE_STORAGE_KEY);
        if (compared) setComparedSlugs(JSON.parse(compared));
      } catch {
        // Comparison remains available for the current page when storage is unavailable.
      }
    });
  }, []);

  function toggleCompare(slug: string) {
    setComparedSlugs((previous) => {
      const next = previous.includes(slug)
        ? previous.filter((item) => item !== slug)
        : previous.length >= 3
          ? [...previous.slice(1), slug]
          : [...previous, slug];

      try {
        localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Keep the in-memory comparison when storage is unavailable.
      }

      return next;
    });
  }

  function clearCompare() {
    setComparedSlugs([]);
    try {
      localStorage.removeItem(COMPARE_STORAGE_KEY);
    } catch {
      // The in-memory list is already cleared.
    }
  }

  return (
    <ProductComparisonContext.Provider
      value={{
        comparedSlugs,
        toggleCompare,
        isCompared: (slug) => comparedSlugs.includes(slug),
        clearCompare,
      }}
    >
      {children}
    </ProductComparisonContext.Provider>
  );
}

export function useProductComparison() {
  const context = useContext(ProductComparisonContext);
  if (!context) {
    throw new Error("useProductComparison must be used within ProductComparisonProvider");
  }
  return context;
}
