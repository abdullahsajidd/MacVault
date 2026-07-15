import type { Metadata } from "next";

const defaultSiteUrl = "https://macvault.pk";

export const siteName = "MacVault";
export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl);

type OgImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

const defaultImage: OgImage = {
  url: "/og/macvault-og.svg",
  width: 1200,
  height: 630,
  alt: "MacVault Apple and PlayStation products in Lahore",
};

function fullTitle(title: string) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`;
}

export function buildMetadata({
  title,
  description,
  path,
  images = [defaultImage],
  robots,
}: {
  title: string;
  description: string;
  path: string;
  images?: OgImage[];
  robots?: Metadata["robots"];
}): Metadata {
  const resolvedTitle = fullTitle(title);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: path,
      siteName,
      locale: "en_PK",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: images.map((image) => image.url),
    },
    robots,
  };
}
