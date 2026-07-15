import type { MetadataRoute } from "next";
import { metadataBase } from "@/lib/seo";
import { getCategories, getProducts } from "@/sanity/lib/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const staticPaths = ["", "/about", "/products", "/why-us", "/contact", "/delivery", "/returns", "/warranty", "/privacy", "/terms"];
  const categoryPaths = categories.map((category) => category.href);
  const productPaths = products.map((product) => `/products/${product.slug}`);
  return [...staticPaths, ...categoryPaths, ...productPaths].map((path) => ({ url: new URL(path || "/", metadataBase).toString(), lastModified: new Date(), changeFrequency: path.startsWith("/products") ? "daily" : "monthly", priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7 }));
}
