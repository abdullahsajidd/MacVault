import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Why Us",
  description:
    "MacVault's USP: verified local Apple and PS5 stock, clear condition details, WhatsApp-first support, and reservation confidence.",
  path: "/why-buy-from-us",
});

export default function WhyBuyFromUsRedirect() {
  redirect("/why-us");
}
