import type { Metadata } from "next";
import { ProductsPageShell } from "@/components/products-page-shell";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getProducts } from "@/sanity/lib/catalog";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Browse MacVault iPhone, MacBook, iPad, Apple Watch, AirPods, accessories, and PlayStation listings with clear condition and reservation details.",
  path: "/products",
});

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <ProductsPageShell
      items={products}
      allProducts={products}
      categories={categories}
      key="All"
    />
  );
}
