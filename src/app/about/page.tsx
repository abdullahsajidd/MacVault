import type { Metadata } from "next";
import { AboutPageShell } from "@/components/about-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Learn the MacVault story, buying flow, and product checks for local iPhone, MacBook, iPad, Apple Watch, AirPods, accessories, and PS5 buyers.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageShell />;
}
