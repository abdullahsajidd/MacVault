import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { getCategorySlug } from "@/data/products";
import { metadataBase } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/products", "/why-us", "/contact", "/delivery", "/returns", "/warranty", "/privacy", "/terms"];
  const categoryPaths = [...new Set(products.map((product) => `/products/category/${getCategorySlug(product.category)}`))];
  const productPaths = products.map((product) => `/products/${product.slug}`);
  return [...staticPaths, ...categoryPaths, ...productPaths].map((path) => ({ url: new URL(path || "/", metadataBase).toString(), lastModified: new Date(), changeFrequency: path.startsWith("/products") ? "daily" : "monthly", priority: path === "" ? 1 : path === "/products" ? 0.9 : 0.7 }));
}
