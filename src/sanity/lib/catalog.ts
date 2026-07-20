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

function normalizeProductArrays(product: SanityProduct): SanityProduct {
  return {
    ...product,
    summary: product.summary || product.description,
    description: product.description || product.summary,
    specs: product.specs ?? [],
    details: product.details ?? [],
    technicalSpecs: product.technicalSpecs ?? [],
    listingOptions: product.listingOptions ?? [],
    highlights: product.highlights ?? [],
    packageItems: product.packageItems ?? [],
    gallery: product.gallery ?? [],
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

const modelSpecLabelsByCategory: Record<string, string[]> = {
  iPhone: ["Display", "Chipset", "Cameras", "Charging port"],
  Mac: ["Processor", "Chipset", "Display", "Ports", "Charging"],
  iPad: ["Chipset", "Display", "Camera", "Cameras", "Port", "Connectivity", "Input"],
  Watch: ["Chipset", "Display", "Water"],
  Accessories: ["Chipset", "Audio", "Controls", "Water", "Design"],
  Cables: ["Connector", "Data", "Power", "Compatibility"],
  PlayStation: ["Output"],
};

function stableModelSpecs(product: SanityProduct) {
  const allowed = new Set(
    (modelSpecLabelsByCategory[product.category] ?? []).map((item) => item.toLowerCase()),
  );

  if (!allowed.size) {
    return product.model?.specs ?? [];
  }

  return (product.model?.specs ?? []).filter((spec) => allowed.has(spec.label.toLowerCase()));
}

function mergeModelSpecifications(product: SanityProduct): SanityProduct {
  const filteredModelSpecs = stableModelSpecs(product);
  const modelSpecs = filteredModelSpecs.map((spec, index) => ({
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
  const local = getLocalProduct(normalizedProduct.slug);

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

export async function getCategories() {
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

export async function getProducts() {
  try {
    const { data } = await sanityFetch({
      query: PRODUCTS_QUERY,
      perspective: "published",
      stega: false,
    });
    const products = data as SanityProduct[];

    return products.map(applyEditorialBaseline);
  } catch {
    return localCatalogFallback().products.map(applyEditorialBaseline);
  }
}

export async function getProductsByCategorySlug(slug: string) {
  try {
    const { data } = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { slug },
      perspective: "published",
      stega: false,
    });
    const products = data as SanityProduct[];

    return products.map(applyEditorialBaseline);
  } catch {
    return localCatalogFallback()
      .products.filter((product) => product.category === categoryRoutes.find((route) => route.slug === slug)?.category)
      .map(applyEditorialBaseline);
  }
}

export async function getProduct(slug: string) {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_QUERY,
      params: { slug },
      perspective: "published",
      stega: false,
    });
    const product = data as SanityProduct | null;

    return product ? applyEditorialBaseline(product) : null;
  } catch {
    const fallback = getLocalProduct(slug);

    return fallback
      ? applyEditorialBaseline({
          ...fallback,
          _id: `local-product-${fallback.slug}`,
          editorialVersion: "local-fallback",
          categoryKey: fallback.category,
        } as SanityProduct)
      : null;
  }
}

export async function getPublishedProductSlugs(): Promise<{ slug: string }[]> {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data as { slug: string }[];
  } catch {
    return localCatalogFallback().productSlugs;
  }
}

export async function getPublishedCategorySlugs(): Promise<{ slug: string }[]> {
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

export function findCategoryBySlug(categories: SanityCategory[], slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function findCategoryByName(categories: SanityCategory[], name: string) {
  return categories.find((category) => category.category === name);
}
