import type { Metadata } from "next";
import { ProductsPageShell } from "@/components/products-page-shell";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Browse MacVault iPhone, MacBook, iPad, Apple Watch, AirPods, accessories, and PS5 drops with clear condition and reservation details.",
  path: "/products",
});

export default function ProductsPage() {
  return <ProductsPageShell items={products} key="All" />;
}
