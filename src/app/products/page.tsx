import type { Metadata } from "next";
import { ProductsPageShell } from "@/components/products-page-shell";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getProducts } from "@/sanity/lib/catalog";

export const metadata: Metadata = buildMetadata({
  title: "Apple and PlayStation Products in Lahore",
  description:
    "Browse iPhones, MacBooks, iPads, Apple Watch, AirPods, accessories, and PlayStation products in Lahore with condition, specifications, warranty, and stock details.",
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
