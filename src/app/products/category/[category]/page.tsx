import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProductsPageShell } from "@/components/products-page-shell";
import {
  findCategoryBySlug,
  getCategories,
  getProducts,
  getProductsByCategorySlug,
  getPublishedCategorySlugs,
} from "@/sanity/lib/catalog";
import { buildMetadata, metadataBase } from "@/lib/seo";

export async function generateStaticParams() {
  const categories = await getPublishedCategorySlugs();
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findCategoryBySlug(await getCategories(), slug);

  if (!category) {
    return buildMetadata({
      title: "Category",
      description: "Browse current Apple and PlayStation products from MacVault in Lahore.",
      path: `/products/category/${slug}`,
      robots: { index: false, follow: true },
    });
  }

  const label = category.label;

  return buildMetadata({
    title: `${label} in Lahore`,
    description: `Browse current ${label} products in Lahore with model, condition, specifications, warranty, package, and availability details from MacVault.`,
    path: `/products/category/${slug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const { category: slug } = await params;
  const { search } = await searchParams;
  const [categories, products, allProducts] = await Promise.all([
    getCategories(),
    getProductsByCategorySlug(slug),
    getProducts(),
  ]);
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    notFound();
  }

  const initialSearch = Array.isArray(search) ? search[0] ?? "" : search ?? "";

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Products",
                item: new URL("/products", metadataBase).toString(),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: category.label,
                item: new URL(category.href, metadataBase).toString(),
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${category.label} products in Lahore`,
            numberOfItems: products.length,
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: new URL(`/products/${product.slug}`, metadataBase).toString(),
              name: product.title,
            })),
          },
        ]}
      />
      <ProductsPageShell
        items={products}
        allProducts={allProducts}
        categories={categories}
        activeCategory={category.category}
        initialSearch={initialSearch}
        key={category.category}
      />
    </>
  );
}
