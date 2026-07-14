import type { Metadata } from "next";
import { ContactPageShell } from "@/components/contact-page-shell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact MacVault on WhatsApp, phone, or email for current iPhone, MacBook, iPad, Watch, AirPods, accessories, and PlayStation stock.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageShell />;
}
