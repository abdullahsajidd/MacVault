import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MacVault | Premium Apple & PS5 Drops",
  description:
    "MacVault curates verified iPhones, Macs, Apple accessories, and PS5 bundles with WhatsApp-first ordering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
