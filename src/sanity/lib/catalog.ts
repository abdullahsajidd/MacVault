import { client } from "@/sanity/lib/client";
import {
  catalogEditorialVersion,
  getProduct as getLocalProduct,
} from "@/data/products";
import {
  CATEGORIES_QUERY,
  CATEGORY_SLUGS_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityCategory, SanityProduct } from "@/sanity/types";

const publishedFetchOptions = {
  cache: "force-cache" as const,
  next: { revalidate: 60 },
  perspective: "published" as const,
};

function usesCurrentSanityCopy(product: SanityProduct) {
  return product.editorialVersion === catalogEditorialVersion;
}

function applyEditorialBaseline(product: SanityProduct): SanityProduct {
  const local = getLocalProduct(product.slug);

  if (!local || usesCurrentSanityCopy(product)) {
    return product;
  }

  return {
    ...product,
    title: local.title,
    shortTitle: local.shortTitle,
    condition: local.condition,
    badge: local.badge,
    accent: local.accent,
    summary: local.summary,
    description: local.description,
    specs: local.specs,
    details: local.details,
    technicalSpecs: local.technicalSpecs,
    listingOptions: local.listingOptions,
    highlights: local.highlights,
    packageItems: local.packageItems,
    gallery: product.gallery.map((item, index) => {
      const editorial = local.gallery[index];

      return editorial
        ? {
            ...item,
            title: editorial.title,
            caption: editorial.caption,
            imageAlt: editorial.imageAlt,
          }
        : item;
    }),
  };
}

export async function getCategories() {
  return client.fetch<SanityCategory[]>(CATEGORIES_QUERY, {}, publishedFetchOptions);
}

export async function getProducts() {
  const products = await client.fetch<SanityProduct[]>(PRODUCTS_QUERY, {}, publishedFetchOptions);
  return products.map(applyEditorialBaseline);
}

export async function getProductsByCategorySlug(slug: string) {
  const products = await client.fetch<SanityProduct[]>(
    PRODUCTS_BY_CATEGORY_QUERY,
    { slug },
    publishedFetchOptions,
  );
  return products.map(applyEditorialBaseline);
}

export async function getProduct(slug: string) {
  const product = await client.fetch<SanityProduct | null>(
    PRODUCT_QUERY,
    { slug },
    publishedFetchOptions,
  );
  return product ? applyEditorialBaseline(product) : null;
}

export async function getPublishedProductSlugs() {
  return client.fetch<{ slug: string }[]>(PRODUCT_SLUGS_QUERY, {}, publishedFetchOptions);
}

export async function getPublishedCategorySlugs() {
  return client.fetch<{ slug: string }[]>(CATEGORY_SLUGS_QUERY, {}, publishedFetchOptions);
}

export function findCategoryBySlug(categories: SanityCategory[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function findCategoryByName(categories: SanityCategory[], name: string) {
  return categories.find((category) => category.category === name);
}
