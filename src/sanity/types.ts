import type { Product } from "@/data/products";

export type SanityCategory = {
  _id: string;
  category: string;
  label: string;
  pluralLabel: string;
  slug: string;
  href: string;
};

export type SanityProduct = Product & {
  _id: string;
};
