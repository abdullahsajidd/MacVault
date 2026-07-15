import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  CATEGORIES_QUERY,
  CATEGORY_SLUGS_QUERY,
  PRODUCT_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import type { SanityCategory, SanityProduct } from "@/sanity/types";

export async function getCategories() {
  const { data } = await sanityFetch({ query: CATEGORIES_QUERY, stega: false });
  return data as SanityCategory[];
}

export async function getProducts() {
  const { data } = await sanityFetch({ query: PRODUCTS_QUERY, stega: false });
  return data as SanityProduct[];
}

export async function getProductsByCategorySlug(slug: string) {
  const { data } = await sanityFetch({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: { slug },
    stega: false,
  });
  return data as SanityProduct[];
}

export async function getProduct(slug: string) {
  const { data } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: { slug },
    stega: false,
  });
  return data as SanityProduct | null;
}

export async function getPublishedProductSlugs() {
  return client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(PRODUCT_SLUGS_QUERY);
}

export async function getPublishedCategorySlugs() {
  return client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(CATEGORY_SLUGS_QUERY);
}

export function findCategoryBySlug(categories: SanityCategory[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function findCategoryByName(categories: SanityCategory[], name: string) {
  return categories.find((category) => category.category === name);
}
