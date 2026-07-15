import type { Metadata, Viewport } from "next";
import { buildMetadata, metadataBase } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { CatalogProvider } from "@/components/catalog-provider";
import { getCategories, getProducts } from "@/sanity/lib/catalog";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const homeDescription =
  "MacVault curates verified iPhones, MacBooks, iPads, Apple Watch, AirPods, accessories, and PlayStation stock in Lahore with WhatsApp-first confirmation.";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "MacVault | Verified Apple and PlayStation Stock in Lahore",
    description: homeDescription,
    path: "/",
  }),
  metadataBase,
  title: {
    default: "MacVault | Verified Apple and PlayStation Stock in Lahore",
    template: "%s | MacVault",
  },
  applicationName: "MacVault",
  keywords: [
    "MacVault",
    "iPhone Lahore",
    "MacBook Lahore",
    "PlayStation Lahore",
    "PTA iPhone",
    "Apple accessories Pakistan",
    "verified Apple stock",
  ],
  authors: [{ name: "MacVault" }],
  creator: "MacVault",
  publisher: "MacVault",
  category: "technology retail",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#0a84ff",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "MacVault",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f6fbff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <CatalogProvider products={products} categories={categories}>
          {children}
        </CatalogProvider>
        <SanityLive />
        <Analytics />
      </body>
    </html>
  );
}
