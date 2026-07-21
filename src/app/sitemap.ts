import type { MetadataRoute } from "next";
import { metadataBase } from "@/lib/seo";
import { productPath } from "@/lib/product-routes";
import { getCategories, getProducts } from "@/sanity/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const staticPaths = [
    "",
    "/about",
    "/products",
    "/why-us",
    "/contact",
    "/delivery",
    "/returns",
    "/warranty",
    "/privacy",
    "/terms",
  ];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: new URL(path || "/", metadataBase).toString(),
    changeFrequency: path === "/products" ? "daily" : "monthly",
    priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));
  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: new URL(category.href, metadataBase).toString(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: new URL(productPath(product.slug), metadataBase).toString(),
    lastModified: product.lastUpdated ? new Date(product.lastUpdated) : undefined,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
