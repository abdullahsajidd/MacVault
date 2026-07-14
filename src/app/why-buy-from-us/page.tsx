import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Us",
  description:
    "How MacVault gives buyers clear product details, verified local stock, and direct support before purchase.",
  path: "/why-buy-from-us",
});

export default function WhyBuyFromUsRedirect() {
  redirect("/why-us");
}
