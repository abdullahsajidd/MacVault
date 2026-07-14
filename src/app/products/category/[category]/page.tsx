import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductsPageShell } from "@/components/products-page-shell";
import {
  categoryRoutes,
  getCategoryBySlug,
  getCategoryLabel,
  getProductsByCategorySlug,
} from "@/data/products";
import { buildMetadata } from "@/lib/seo";

function categoryLabel(category: string) {
  return getCategoryLabel(category);
}

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
    return buildMetadata({
      title: "Category",
      description: "Browse verified MacVault product listings with clear condition and reservation details.",
      path: `/products/category/${slug}`,
      robots: { index: false, follow: true },
    });
  }

  const label = categoryLabel(category);

  return buildMetadata({
    title: `${label} Products`,
    description: `Browse verified MacVault ${label} listings with clear condition, warranty, package, and reservation details.`,
    path: `/products/category/${slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <ProductsPageShell
      items={getProductsByCategorySlug(slug)}
      activeCategory={category}
      key={category}
    />
  );
}
