import { cache } from "react";
import {
  categoryDefinitions,
  categoryRoutes,
  getProduct as getLocalProduct,
  products as localProducts,
} from "@/data/products";
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
import { client } from "@/sanity/lib/client";

const visualKindByCategory = {
  iPhone: "phone",
  Mac: "laptop",
  iPad: "tablet",
  Watch: "watch",
  Accessories: "audio",
  Cables: "audio",
  PlayStation: "console",
} as const;

const productsQuery = PRODUCTS_QUERY;
const productsByCategoryQuery = PRODUCTS_BY_CATEGORY_QUERY;
const productQuery = PRODUCT_QUERY;
const productSlugsQuery = PRODUCT_SLUGS_QUERY;

function normalizedGallery(product: SanityProduct) {
  if (product.gallery?.length) {
    return product.gallery;
  }

  return [
    {
      title: product.title || "Product image",
      caption: "Ask MacVault for current photos of the exact unit.",
      kind: visualKindByCategory[product.category as keyof typeof visualKindByCategory] ?? "audio",
      imageUrl: "",
      imageAlt: product.title || "MacVault product",
      sourceUrl: "",
      usage: "reference" as const,
    },
  ];
}

function cleanLegacyDescription(description?: string) {
  if (!description) return "";

  const paragraphs = description.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  if (paragraphs.length >= 2 && paragraphs[1].startsWith(`${paragraphs[0]} |`)) {
    paragraphs.shift();
    paragraphs[0] = paragraphs[0].slice(paragraphs[0].indexOf("|") + 1).trim();
  }

  return paragraphs.join("\n\n");
}

function normalizeProductArrays(product: SanityProduct): SanityProduct {
  const description = cleanLegacyDescription(product.description || product.summary);
  return {
    ...product,
    summary: product.summary || description,
    description,
    specs: product.specs ?? [],
    details: product.details ?? [],
    technicalSpecs: product.technicalSpecs ?? [],
    listingOptions: product.listingOptions ?? [],
    highlights: product.highlights ?? [],
    packageItems: product.packageItems ?? [],
    gallery: normalizedGallery(product),
  };
}

function localCategoryRecords(): SanityCategory[] {
  return categoryDefinitions.map((category, index) => ({
    _id: `local-category-${category.slug}`,
    category: category.category,
    label: category.label,
    pluralLabel: category.pluralLabel,
    slug: category.slug,
    href: categoryRoutes[index]?.href ?? `/products/category/${category.slug}`,
  }));
}

function localProductRecords(): SanityProduct[] {
  return localProducts.map((product, index) => ({
    ...product,
    _id: `local-product-${product.slug}`,
    sourceKey: `product:${product.slug}`,
    editorialVersion: "local-fallback",
    lastUpdated: new Date().toISOString(),
    categoryKey: product.category,
    model: undefined,
    unitDetails: product.unitDetails,
    specs: product.specs,
    details: product.details,
    technicalSpecs: product.technicalSpecs,
    listingOptions: product.listingOptions,
    highlights: product.highlights,
    packageItems: product.packageItems,
    gallery: product.gallery,
    sortOrder: index,
    visibility: "active",
  }));
}

function localProductSlugs() {
  return localProducts.map((product) => ({slug: product.slug}));
}

function localCatalogFallback() {
  return {
    categories: localCategoryRecords(),
    products: localProductRecords(),
    productSlugs: localProductSlugs(),
    categorySlugs: localCategoryRecords().map((category) => ({slug: category.slug})),
  };
}

function mergeModelSpecifications(product: SanityProduct): SanityProduct {
  const modelSpecs = (product.model?.specs ?? []).map((spec, index) => ({
    ...spec,
    id: `model-${product.model?.key ?? "spec"}-${spec.id ?? index}`,
  }));
  const productSpecs = product.technicalSpecs.map((spec, index) => ({
    ...spec,
    id: `product-${product.slug}-${spec.id ?? index}`,
  }));

  if (!modelSpecs.length) {
    return {
      ...product,
      technicalSpecs: productSpecs,
    };
  }

  const mergedSpecs = [...modelSpecs, ...productSpecs].filter(
    (spec, index, specs) =>
      specs.findIndex(
        (candidate) => candidate.label.trim().toLowerCase() === spec.label.trim().toLowerCase(),
      ) === index,
  );

  return {
    ...product,
    model: product.model ? {...product.model, specs: modelSpecs} : product.model,
    specs: mergedSpecs.map((spec) => spec.value),
    technicalSpecs: mergedSpecs,
  };
}

function applyEditorialBaseline(product: SanityProduct): SanityProduct {
  const normalizedProduct = normalizeProductArrays(product);
  const sourceSlug = normalizedProduct.sourceKey?.startsWith("product:")
    ? normalizedProduct.sourceKey.slice("product:".length)
    : normalizedProduct.slug;
  const local = getLocalProduct(sourceSlug);

  if (!local) {
    return mergeModelSpecifications(normalizedProduct);
  }

  return mergeModelSpecifications({
    ...normalizedProduct,
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
    gallery: normalizedProduct.gallery.map((item, index) => {
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
  });
}

async function fetchCategories() {
  try {
    const { data } = await sanityFetch({
      query: CATEGORIES_QUERY,
      perspective: "published",
      stega: false,
    });

    return data as SanityCategory[];
  } catch {
    return localCatalogFallback().categories;
  }
}

export const getCategories = cache(fetchCategories);

async function fetchProducts() {
  try {
    const products = (await client.fetch<SanityProduct[]>(productsQuery, {}, {perspective: "published", cache: "no-store"})) as SanityProduct[];

    return products.map(applyEditorialBaseline);
  } catch {
    return [];
  }
}

export const getProducts = cache(fetchProducts);

async function fetchProductsByCategorySlug(slug: string) {
  try {
    const products = (await client.fetch<SanityProduct[]>(productsByCategoryQuery, {slug}, {perspective: "published", cache: "no-store"})) as SanityProduct[];

    return products.map(applyEditorialBaseline);
  } catch {
    return [];
  }
}

export const getProductsByCategorySlug = cache(fetchProductsByCategorySlug);

async function fetchProduct(slug: string) {
  try {
    const product = await client.fetch<SanityProduct | null>(productQuery, {slug}, {perspective: "published", cache: "no-store"});

    return product ? applyEditorialBaseline(product) : null;
  } catch {
    return null;
  }
}

export const getProduct = cache(fetchProduct);

async function fetchPublishedProductSlugs(): Promise<{ slug: string }[]> {
  try {
    return await client.fetch<{ slug: string }[]>(productSlugsQuery, {}, {perspective: "published", cache: "no-store"});
  } catch {
    return [];
  }
}

export const getPublishedProductSlugs = cache(fetchPublishedProductSlugs);

async function fetchPublishedCategorySlugs(): Promise<{ slug: string }[]> {
  try {
    const { data } = await sanityFetch({
      query: CATEGORY_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data as { slug: string }[];
  } catch {
    return localCatalogFallback().categorySlugs;
  }
}

export const getPublishedCategorySlugs = cache(fetchPublishedCategorySlugs);

export function findCategoryBySlug(categories: SanityCategory[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function findCategoryByName(categories: SanityCategory[], name: string) {
  return categories.find((category) => category.category === name);
}
