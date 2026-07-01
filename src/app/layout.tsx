import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { buildMetadata, metadataBase } from "@/lib/seo";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-tech-sans",
  display: "swap",
});

const homeDescription =
  "MacVault curates verified iPhones, MacBooks, iPads, Apple Watch, AirPods, accessories, and PS5 stock in Lahore with WhatsApp-first confirmation.";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "MacVault | Verified Apple and PS5 Stock in Lahore",
    description: homeDescription,
    path: "/",
  }),
  metadataBase,
  title: {
    default: "MacVault | Verified Apple and PS5 Stock in Lahore",
    template: "%s | MacVault",
  },
  applicationName: "MacVault",
  keywords: [
    "MacVault",
    "iPhone Lahore",
    "MacBook Lahore",
    "PS5 Lahore",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className={`${geist.className} min-h-full`}>{children}</body>
    </html>
  );
}
