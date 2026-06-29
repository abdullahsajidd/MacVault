import type { Metadata } from "next";
import { ProductsPageShell } from "@/components/products-page-shell";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products | MacVault",
  description:
    "Browse MacVault iPhone, Mac, iPad, Apple Watch, accessories, and PS5 product drops with clear condition and reservation details.",
};

export default function ProductsPage() {
  return <ProductsPageShell items={products} />;
}
