import type { Metadata } from "next";
import { AboutPageShell } from "@/components/about-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About MacVault Lahore",
  description:
    "Learn how MacVault helps Lahore buyers compare iPhones, MacBooks, iPads, Apple Watch, AirPods, accessories, and PlayStation products before payment.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageShell />;
}
