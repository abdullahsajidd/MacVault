import type { Metadata } from "next";
import { ContactPageShell } from "@/components/contact-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact MacVault Lahore",
  description:
    "Contact MacVault in Lahore by WhatsApp, phone, or email about current iPhone, MacBook, iPad, Apple Watch, AirPods, accessories, and PlayStation products.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageShell />;
}
