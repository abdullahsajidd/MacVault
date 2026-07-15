"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SanityCategory, SanityProduct } from "@/sanity/types";

type CatalogContextValue = {
  categories: SanityCategory[];
  products: SanityProduct[];
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({
  categories,
  products,
  children,
}: CatalogContextValue & { children: ReactNode }) {
  return (
    <CatalogContext.Provider value={{ categories, products }}>
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const catalog = useContext(CatalogContext);

  if (!catalog) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }

  return catalog;
}
