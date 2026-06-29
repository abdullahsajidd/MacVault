import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-tech-sans",
  display: "swap",
});

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
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className={`${geist.className} min-h-full`}>{children}</body>
    </html>
  );
}
