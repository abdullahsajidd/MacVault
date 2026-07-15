import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsPageShell } from "@/components/products-page-shell";
import {
  findCategoryBySlug,
  getCategories,
  getProducts,
  getProductsByCategorySlug,
  getPublishedCategorySlugs,
} from "@/sanity/lib/catalog";
import { buildMetadata } from "@/lib/seo";

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
      description: "Browse verified MacVault product listings with clear condition and reservation details.",
      path: `/products/category/${slug}`,
      robots: { index: false, follow: true },
    });
  }

  const label = category.label;

  return buildMetadata({
    title: `${label} Products`,
    description: `Browse verified MacVault ${label} listings with clear condition, warranty, package, and reservation details.`,
    path: `/products/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const [categories, products, allProducts] = await Promise.all([
    getCategories(),
    getProductsByCategorySlug(slug),
    getProducts(),
  ]);
  const category = findCategoryBySlug(categories, slug);

  if (!category) {
    notFound();
  }

  return (
    <ProductsPageShell
      items={products}
      allProducts={allProducts}
      categories={categories}
      activeCategory={category.category}
      key={category.category}
    />
  );
}
