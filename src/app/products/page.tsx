import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ProductsPageShell } from "@/components/products-page-shell";
import { buildMetadata, metadataBase } from "@/lib/seo";
import { getCategories, getProducts } from "@/sanity/lib/catalog";

export const metadata: Metadata = buildMetadata({
  title: "Apple and PlayStation Products in Lahore",
  description:
    "Browse iPhones, MacBooks, iPads, Apple Watch, AirPods, accessories, and PlayStation products in Lahore with condition, specifications, warranty, and stock details.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const { search } = await searchParams;
  const initialSearch = Array.isArray(search) ? search[0] ?? "" : search ?? "";
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MacVault Apple and PlayStation products in Lahore",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: new URL(`/products/${product.slug}`, metadataBase).toString(),
      name: product.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />
      <ProductsPageShell
        items={products}
        allProducts={products}
        categories={categories}
        initialSearch={initialSearch}
        key="All"
      />
    </>
  );
}
