import { client } from "@/sanity/lib/client";
import {
  CATEGORIES_QUERY,
  CATEGORY_SLUGS_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityCategory, SanityProduct } from "@/sanity/types";

const freshFetchOptions = {
  cache: "no-store" as const,
  perspective: "published" as const,
};

export async function getCategories() {
  return client.fetch<SanityCategory[]>(CATEGORIES_QUERY, {}, freshFetchOptions);
}

export async function getProducts() {
  return client.fetch<SanityProduct[]>(PRODUCTS_QUERY, {}, freshFetchOptions);
}

export async function getProductsByCategorySlug(slug: string) {
  return client.fetch<SanityProduct[]>(
    PRODUCTS_BY_CATEGORY_QUERY,
    { slug },
    freshFetchOptions,
  );
}

export async function getProduct(slug: string) {
  return client.fetch<SanityProduct | null>(PRODUCT_QUERY, { slug }, freshFetchOptions);
}

export async function getPublishedProductSlugs() {
  return client.fetch<{ slug: string }[]>(PRODUCT_SLUGS_QUERY, {}, freshFetchOptions);
}

export async function getPublishedCategorySlugs() {
  return client.fetch<{ slug: string }[]>(CATEGORY_SLUGS_QUERY, {}, freshFetchOptions);
}

export function findCategoryBySlug(categories: SanityCategory[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function findCategoryByName(categories: SanityCategory[], name: string) {
  return categories.find((category) => category.category === name);
}
