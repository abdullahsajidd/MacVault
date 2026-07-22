import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { buildMetadata, metadataBase } from "@/lib/seo";
import { CatalogProvider } from "@/components/catalog-provider";
import { PrivacyConsent } from "@/components/privacy-consent";
import { ProductComparisonProvider } from "@/components/comparison-provider";
import { FloatingCompareBar } from "@/components/product-comparison";
import { AnalyticsEvents } from "@/components/analytics-events";
import { JsonLd } from "@/components/json-ld";
import { ScrollProgress } from "@/components/scroll-progress";
import { emailAddress, phoneDisplay } from "@/data/contact";
import { getCategories, getProducts } from "@/sanity/lib/catalog";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

const homeDescription =
  "Browse iPhones, MacBooks, iPads, Apple Watch, AirPods, and PS5 products from MacVault in Lahore with clear condition, warranty, and stock details.";
export const revalidate = 60;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "MacVault | Apple and PlayStation Products in Lahore",
    description: homeDescription,
    path: "/",
  }),
  metadataBase,
  title: {
    default: "MacVault | Apple and PlayStation Products in Lahore",
    template: "%s | MacVault",
  },
  applicationName: "MacVault",
  keywords: [
    "MacVault",
    "iPhone Lahore",
    "MacBook Lahore",
    "PlayStation Lahore",
    "PTA iPhone",
    "used iPhone Lahore",
    "Apple products Lahore",
    "PS5 Lahore",
    "Apple accessories Pakistan",
    "MacVault Lahore",
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
    <html lang="en-PK" className="h-full">
      <head>
      </head>
      <body className="min-h-full">
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": ["Organization", "ElectronicsStore"],
              "@id": new URL("/#organization", metadataBase).toString(),
              name: "MacVault",
              url: metadataBase.toString(),
              logo: new URL("/images/brand/macvault-selected-logo.svg", metadataBase).toString(),
              description: homeDescription,
              telephone: phoneDisplay,
              email: emailAddress,
              priceRange: "Expected price ranges confirmed before purchase",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lahore",
                addressRegion: "Punjab",
                addressCountry: "PK",
              },
              areaServed: {
                "@type": "City",
                name: "Lahore",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": new URL("/#website", metadataBase).toString(),
              name: "MacVault",
              url: metadataBase.toString(),
              publisher: { "@id": new URL("/#organization", metadataBase).toString() },
              inLanguage: "en-PK",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: new URL(
                    "/products?search={search_term_string}",
                    metadataBase,
                  ).toString(),
                },
                "query-input": "required name=search_term_string",
              },
            },
          ]}
        />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <CatalogProvider products={products} categories={categories}>
          <ProductComparisonProvider>
            {children}
            <FloatingCompareBar />
          </ProductComparisonProvider>
        </CatalogProvider>
        <AnalyticsEvents />
        <SanityLive />
        <PrivacyConsent />
      </body>
    </html>
  );
}
