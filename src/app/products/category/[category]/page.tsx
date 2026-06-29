import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsPageShell } from "@/components/products-page-shell";
import { categoryRoutes, getCategoryBySlug, getProductsByCategorySlug } from "@/data/products";

export function generateStaticParams() {
  return categoryRoutes.map((route) => ({ category: route.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category | MacVault",
    };
  }

  return {
    title: `${category} Products | MacVault`,
    description: `Browse verified MacVault ${category} drops with clear condition, warranty, and reservation details.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <ProductsPageShell items={getProductsByCategorySlug(slug)} activeCategory={category} />;
}
