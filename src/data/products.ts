export type ProductVisualKind = "phone" | "laptop" | "tablet" | "watch" | "console" | "audio";

export type ProductGalleryItem = {
  title: string;
  caption: string;
  kind: ProductVisualKind;
  imageUrl: string;
  imageAlt: string;
  sourceUrl: string;
};

export type Product = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  status: string;
  condition: string;
  price: string;
  badge: string;
  accent: string;
  summary: string;
  description: string;
  specs: string[];
  details: { label: string; value: string }[];
  highlights: string[];
  packageItems: string[];
  gallery: ProductGalleryItem[];
};

type RawProduct = Omit<Product, "gallery"> & {
  gallery: Omit<ProductGalleryItem, "imageUrl" | "imageAlt" | "sourceUrl">[];
};

const unsplashImage = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=82`;

const productPhotoSets: Record<string, { imageUrl: string; sourceUrl: string }[]> = {
  "iphone-15-pro-max-256": [
    {
      imageUrl: unsplashImage("1695823018812-c684c980ede6"),
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-a-person-holding-a-cell-phone-KX_7S9bXYjY",
    },
    {
      imageUrl: unsplashImage("1736173155820-f81dca2d1661"),
      sourceUrl: "https://unsplash.com/photos/a-cell-phone-with-a-picture-of-a-palm-tree-aBobRTxKsaI",
    },
    {
      imageUrl: unsplashImage("1695823018812-c684c980ede6"),
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-a-person-holding-a-cell-phone-KX_7S9bXYjY",
    },
  ],
  "iphone-14-pro-128": [
    {
      imageUrl: unsplashImage("1736173155820-f81dca2d1661"),
      sourceUrl: "https://unsplash.com/photos/a-cell-phone-with-a-picture-of-a-palm-tree-aBobRTxKsaI",
    },
    {
      imageUrl: unsplashImage("1695823018812-c684c980ede6"),
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-a-person-holding-a-cell-phone-KX_7S9bXYjY",
    },
    {
      imageUrl: unsplashImage("1736173155820-f81dca2d1661"),
      sourceUrl: "https://unsplash.com/photos/a-cell-phone-with-a-picture-of-a-palm-tree-aBobRTxKsaI",
    },
  ],
  "macbook-air-m3-13": [
    {
      imageUrl: unsplashImage("1573166855576-5e6dca380e7d"),
      sourceUrl: "https://unsplash.com/photos/person-using-macbook-air-6bI69ihF3MI",
    },
    {
      imageUrl: unsplashImage("1631025049516-1dfb09ae79ca"),
      sourceUrl: "https://unsplash.com/photos/macbook-pro-on-white-table-K9PXRiSArJA",
    },
    {
      imageUrl: unsplashImage("1637607698934-5e59488c88bd"),
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-an-apple-laptop-on-a-table-UIAGNeMUHdE",
    },
  ],
  "macbook-pro-m3-pro-14": [
    {
      imageUrl: unsplashImage("1627766556564-5d89b3765c46"),
      sourceUrl: "https://unsplash.com/photos/macbook-pro-on-black-background-fLEwqKoIQDo",
    },
    {
      imageUrl: unsplashImage("1637607698934-5e59488c88bd"),
      sourceUrl: "https://unsplash.com/photos/a-close-up-of-an-apple-laptop-on-a-table-UIAGNeMUHdE",
    },
    {
      imageUrl: unsplashImage("1631025049516-1dfb09ae79ca"),
      sourceUrl: "https://unsplash.com/photos/macbook-pro-on-white-table-K9PXRiSArJA",
    },
  ],
  "ipad-pro-m4-11": [
    {
      imageUrl: unsplashImage("1548874468-025d0edfdf8b"),
      sourceUrl: "https://unsplash.com/photos/space-gray-ipad-pro-A5Z9g4xP6Yw",
    },
    {
      imageUrl: unsplashImage("1759820941220-fed6a1010146"),
      sourceUrl: "https://unsplash.com/photos/two-ipads-side-by-side-on-a-blue-surface-S8Y4GCoVU1E",
    },
    {
      imageUrl: unsplashImage("1548874468-025d0edfdf8b"),
      sourceUrl: "https://unsplash.com/photos/space-gray-ipad-pro-A5Z9g4xP6Yw",
    },
  ],
  "apple-watch-series-9": [
    {
      imageUrl: unsplashImage("1546868871-7041f2a55e12"),
      sourceUrl: "https://unsplash.com/photos/space-gray-apple-watch-with-black-sports-band-hbTKIbuMmBI",
    },
    {
      imageUrl: unsplashImage("1624096104992-9b4fa3a279dd"),
      sourceUrl: "https://unsplash.com/photos/black-smart-watch-with-white-background-O43D6CYzxqM",
    },
    {
      imageUrl: unsplashImage("1508685096489-7aacd43bd3b1"),
      sourceUrl: "https://unsplash.com/photos/person-wearing-apple-watch-at-1424-0vsk2_9dkqo",
    },
  ],
  "airpods-pro-2-usb-c": [
    {
      imageUrl: unsplashImage("1679464982201-878a60b941ad"),
      sourceUrl: "https://unsplash.com/photos/a-black-and-white-photo-of-a-pair-of-ear-buds-wDs5bKlvP4U",
    },
    {
      imageUrl: unsplashImage("1770292170233-5d9e235ec739"),
      sourceUrl: "https://unsplash.com/photos/white-wireless-earbuds-and-charging-case-on-dark-background-rN1hLIGV4gE",
    },
    {
      imageUrl: unsplashImage("1624258919367-5dc28f5dc293"),
      sourceUrl: "https://unsplash.com/photos/white-apple-airpods-in-box-oTkAX3MAerc",
    },
  ],
  "ps5-slim-disc-bundle": [
    {
      imageUrl: unsplashImage("1622297845775-5ff3fef71d13"),
      sourceUrl: "https://unsplash.com/photos/white-playstation-five-console-and-controller-ads33nL7V4k",
    },
    {
      imageUrl: unsplashImage("1709587797077-7a2c94411514"),
      sourceUrl: "https://unsplash.com/photos/a-video-game-console-sitting-on-top-of-a-table-CYpPNooT1NA",
    },
    {
      imageUrl: unsplashImage("1731405858377-6de0070d8d65"),
      sourceUrl: "https://unsplash.com/photos/a-video-game-console-sitting-on-top-of-a-wooden-table-uY6ZORCOCAM",
    },
  ],
};

const rawProducts: RawProduct[] = [
  {
    slug: "iphone-15-pro-max-256",
    category: "iPhone",
    title: "iPhone 15 Pro Max 256GB",
    shortTitle: "15 Pro Max",
    status: "Available now",
    condition: "Sealed / PTA options",
    price: "WhatsApp for today's price",
    badge: "Best flagship",
    accent: "#0a84ff",
    summary: "Titanium iPhone with clear PTA, storage, color, and warranty notes before reserve.",
    description:
      "A high-demand flagship drop for buyers who want the Pro Max camera system, premium build, and clean local buying support.",
    specs: ["A17 Pro chip", "256GB storage", "Pro camera system", "USB-C", "PTA and Non-PTA options"],
    details: [
      { label: "Storage", value: "256GB" },
      { label: "Condition", value: "Sealed / open-box options" },
      { label: "PTA", value: "Confirmed before order" },
      { label: "Warranty", value: "Shared before payment" },
    ],
    highlights: [
      "Color and box condition confirmed on WhatsApp",
      "PTA status shown before visit or payment",
      "Reservation available for serious buyers",
    ],
    packageItems: ["iPhone unit", "Box and cable details", "Warranty note", "Pickup or delivery support"],
    gallery: [
      {
        title: "Front view",
        caption: "Display, color, and condition confirmed before reserve.",
        kind: "phone",
      },
      {
        title: "Box status",
        caption: "Sealed, open-box, and accessory state are listed clearly.",
        kind: "phone",
      },
      {
        title: "PTA check",
        caption: "Local status is verified before moving to payment.",
        kind: "phone",
      },
    ],
  },
  {
    slug: "iphone-14-pro-128",
    category: "iPhone",
    title: "iPhone 14 Pro 128GB",
    shortTitle: "14 Pro",
    status: "Low stock",
    condition: "Open-box / Non-PTA",
    price: "WhatsApp for today's price",
    badge: "Value Pro",
    accent: "#5856d6",
    summary: "A strong Pro iPhone choice with condition, battery, PTA, and accessories explained.",
    description:
      "For buyers who want Pro cameras and premium iPhone performance without moving to the newest flagship tier.",
    specs: ["A16 Bionic", "128GB storage", "ProMotion display", "48MP main camera", "PTA status listed"],
    details: [
      { label: "Storage", value: "128GB" },
      { label: "Condition", value: "Open-box / used options" },
      { label: "Battery", value: "Shared per unit" },
      { label: "PTA", value: "Confirmed per variant" },
    ],
    highlights: [
      "Battery health shown before reservation",
      "Physical condition notes are not hidden",
      "Good upgrade option from older Pro models",
    ],
    packageItems: ["iPhone unit", "Cable if included", "Condition video", "Pickup or delivery support"],
    gallery: [
      {
        title: "Device condition",
        caption: "Edges, display, camera area, and battery health are checked.",
        kind: "phone",
      },
      {
        title: "Variant notes",
        caption: "Storage, color, and PTA status are shared before CTA.",
        kind: "phone",
      },
      {
        title: "Ready to reserve",
        caption: "A short hold can be arranged through WhatsApp.",
        kind: "phone",
      },
    ],
  },
  {
    slug: "macbook-air-m3-13",
    category: "Mac",
    title: "MacBook Air M3 13-inch",
    shortTitle: "Air M3",
    status: "Available now",
    condition: "Sealed / open-box",
    price: "WhatsApp for today's price",
    badge: "Daily work",
    accent: "#34c759",
    summary: "Thin, fast MacBook Air with chip, memory, storage, battery, and warranty notes.",
    description:
      "A clean everyday Mac for students, creators, business owners, and remote work buyers who need portable performance.",
    specs: ["M3 chip", "13-inch Liquid Retina", "8GB / 16GB options", "256GB / 512GB options", "Long battery life"],
    details: [
      { label: "Chip", value: "Apple M3" },
      { label: "Memory", value: "8GB / 16GB options" },
      { label: "Storage", value: "256GB / 512GB options" },
      { label: "Cycle count", value: "Shared for open-box units" },
    ],
    highlights: [
      "Cycle count and warranty shown for every open-box unit",
      "Best for office, school, and lightweight creative work",
      "Color and keyboard layout confirmed before reserve",
    ],
    packageItems: ["MacBook unit", "Charger details", "Battery/cycle note", "Warranty expectation"],
    gallery: [
      {
        title: "Open display",
        caption: "Screen, keyboard, and body condition are reviewed.",
        kind: "laptop",
      },
      {
        title: "Battery note",
        caption: "Cycle count and warranty expectations are shared clearly.",
        kind: "laptop",
      },
      {
        title: "Configuration",
        caption: "Chip, memory, storage, and color are confirmed.",
        kind: "laptop",
      },
    ],
  },
  {
    slug: "macbook-pro-m3-pro-14",
    category: "Mac",
    title: "MacBook Pro 14-inch M3 Pro",
    shortTitle: "Pro 14",
    status: "Arriving soon",
    condition: "Open-box / premium used",
    price: "WhatsApp for today's price",
    badge: "Creator pick",
    accent: "#ff9f0a",
    summary: "Powerful MacBook Pro options with cycle count, chip, memory, and warranty details.",
    description:
      "Built for buyers who need stronger sustained performance for development, design, editing, and production workloads.",
    specs: ["M3 Pro chip", "14-inch Liquid Retina XDR", "18GB memory options", "512GB storage options", "Pro ports"],
    details: [
      { label: "Chip", value: "M3 Pro" },
      { label: "Memory", value: "18GB options" },
      { label: "Storage", value: "512GB options" },
      { label: "Condition", value: "Shared with photos/video" },
    ],
    highlights: [
      "Performance-focused configurations only",
      "Cycle count and charger condition explained",
      "Ideal for professional work and long upgrade cycles",
    ],
    packageItems: ["MacBook Pro unit", "Charger details", "Cycle count note", "Condition media"],
    gallery: [
      {
        title: "Pro display",
        caption: "Display, keyboard, and exterior condition are checked.",
        kind: "laptop",
      },
      {
        title: "Port check",
        caption: "Ports, charger, and body condition are confirmed.",
        kind: "laptop",
      },
      {
        title: "Work ready",
        caption: "Configuration is matched to your workload before reserve.",
        kind: "laptop",
      },
    ],
  },
  {
    slug: "ipad-pro-m4-11",
    category: "iPad",
    title: "iPad Pro M4 11-inch",
    shortTitle: "iPad Pro",
    status: "Available now",
    condition: "Sealed / open-box",
    price: "WhatsApp for today's price",
    badge: "Creative tablet",
    accent: "#af52de",
    summary: "Premium iPad Pro variants with storage, accessories, box state, and warranty notes.",
    description:
      "A slim, high-performance iPad for media, design, notes, travel, and serious portable workflows.",
    specs: ["M4 chip", "11-inch Ultra Retina XDR", "256GB options", "Apple Pencil support", "Magic Keyboard support"],
    details: [
      { label: "Storage", value: "256GB options" },
      { label: "Condition", value: "Sealed / open-box" },
      { label: "Accessories", value: "Confirmed per bundle" },
      { label: "Warranty", value: "Shared before payment" },
    ],
    highlights: [
      "Accessory bundles can be reserved together",
      "Box and warranty status are confirmed",
      "Recommended for creative and travel setups",
    ],
    packageItems: ["iPad unit", "Cable details", "Accessory bundle if selected", "Warranty note"],
    gallery: [
      {
        title: "Tablet view",
        caption: "Display and body condition confirmed before purchase.",
        kind: "tablet",
      },
      {
        title: "Accessories",
        caption: "Pencil, keyboard, and cover options can be bundled.",
        kind: "tablet",
      },
      {
        title: "Storage",
        caption: "Storage and connectivity are verified for each unit.",
        kind: "tablet",
      },
    ],
  },
  {
    slug: "apple-watch-series-9",
    category: "Watch",
    title: "Apple Watch Series 9",
    shortTitle: "Watch S9",
    status: "Limited units",
    condition: "Open-box",
    price: "WhatsApp for today's price",
    badge: "Daily wearable",
    accent: "#ff375f",
    summary: "Apple Watch options with size, band, battery, and box condition shared upfront.",
    description:
      "A clean wearable upgrade for fitness, calls, notifications, and Apple ecosystem convenience.",
    specs: ["Series 9", "41mm / 45mm options", "GPS options", "Band condition listed", "Battery health checked"],
    details: [
      { label: "Size", value: "41mm / 45mm options" },
      { label: "Condition", value: "Open-box / used options" },
      { label: "Band", value: "Included band listed" },
      { label: "Battery", value: "Shared per unit" },
    ],
    highlights: [
      "Band and case condition listed clearly",
      "Battery health shared before reserve",
      "Good bundle with iPhone upgrades",
    ],
    packageItems: ["Watch unit", "Band details", "Charger if included", "Condition note"],
    gallery: [
      {
        title: "Case condition",
        caption: "Display and body condition are reviewed.",
        kind: "watch",
      },
      {
        title: "Band check",
        caption: "Band type and wear level are listed.",
        kind: "watch",
      },
      {
        title: "Battery",
        caption: "Battery health is shared where available.",
        kind: "watch",
      },
    ],
  },
  {
    slug: "airpods-pro-2-usb-c",
    category: "Accessories",
    title: "AirPods Pro 2 USB-C",
    shortTitle: "AirPods Pro",
    status: "Available now",
    condition: "Sealed",
    price: "WhatsApp for today's price",
    badge: "Accessory drop",
    accent: "#00c7be",
    summary: "AirPods Pro drops with sealed condition, USB-C case, and warranty expectations.",
    description:
      "A premium Apple accessory drop for buyers who want active noise cancellation and easy pairing.",
    specs: ["USB-C case", "Active Noise Cancellation", "Transparency mode", "MagSafe charging", "Warranty note"],
    details: [
      { label: "Case", value: "USB-C" },
      { label: "Condition", value: "Sealed" },
      { label: "Warranty", value: "Shared before payment" },
      { label: "Bundle", value: "Can pair with iPhone/Mac" },
    ],
    highlights: [
      "Sealed status confirmed before pickup",
      "Good add-on with iPhone or Mac purchases",
      "Warranty expectations explained clearly",
    ],
    packageItems: ["AirPods Pro unit", "Charging case", "Cable/tips as boxed", "Warranty note"],
    gallery: [
      {
        title: "Case view",
        caption: "Box and case version are confirmed.",
        kind: "audio",
      },
      {
        title: "Sealed stock",
        caption: "Packaging state is shown before purchase.",
        kind: "audio",
      },
      {
        title: "Bundle ready",
        caption: "Can be reserved alongside an iPhone or Mac.",
        kind: "audio",
      },
    ],
  },
  {
    slug: "ps5-slim-disc-bundle",
    category: "PS5",
    title: "PlayStation 5 Slim Disc Bundle",
    shortTitle: "PS5 Slim",
    status: "Low stock",
    condition: "Bundle options",
    price: "WhatsApp for today's price",
    badge: "Gaming bundle",
    accent: "#1d4ed8",
    summary: "PS5 Slim bundle availability with controller, game, warranty, and box notes.",
    description:
      "A clean console drop for buyers who want a ready gaming bundle with clear availability before visiting.",
    specs: ["PS5 Slim Disc Edition", "Controller options", "Game bundle options", "Warranty notes", "Reservation support"],
    details: [
      { label: "Edition", value: "Slim Disc" },
      { label: "Bundle", value: "Controller/game options" },
      { label: "Condition", value: "Sealed / bundle options" },
      { label: "Hold", value: "Short reservation available" },
    ],
    highlights: [
      "Bundle contents listed before reservation",
      "Controller and game options confirmed",
      "Pickup and delivery support available",
    ],
    packageItems: ["PS5 console", "Controller details", "Game bundle if selected", "Warranty note"],
    gallery: [
      {
        title: "Console view",
        caption: "Edition and box condition are confirmed.",
        kind: "console",
      },
      {
        title: "Bundle check",
        caption: "Controller and game contents are listed clearly.",
        kind: "console",
      },
      {
        title: "Reserve",
        caption: "A serious buyer can arrange a short hold.",
        kind: "console",
      },
    ],
  },
];

export const products: Product[] = rawProducts.map((product) => {
  const photos = productPhotoSets[product.slug];

  return {
    ...product,
    gallery: product.gallery.map((item, index) => {
      const photo = photos[index % photos.length];

      return {
        ...item,
        imageUrl: photo.imageUrl,
        imageAlt: `${product.title} ${item.title}`,
        sourceUrl: photo.sourceUrl,
      };
    }),
  };
});

export const productCategories = ["All", "iPhone", "Mac", "iPad", "Watch", "Accessories", "PS5"];

export const categorySlugMap = {
  iPhone: "iphone",
  Mac: "mac",
  iPad: "ipad",
  Watch: "watch",
  Accessories: "accessories",
  PS5: "ps5",
} as const;

export type ProductCategory = keyof typeof categorySlugMap;
export type ProductCategorySlug = (typeof categorySlugMap)[ProductCategory];

export const categoryRoutes = Object.entries(categorySlugMap).map(([category, slug]) => ({
  category: category as ProductCategory,
  slug,
  href: `/products/category/${slug}`,
}));

export const featuredProducts = products.filter((product) =>
  ["iphone-15-pro-max-256", "macbook-air-m3-13", "ps5-slim-disc-bundle"].includes(product.slug),
);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategorySlug(category: string) {
  return categorySlugMap[category as ProductCategory] ?? category.toLowerCase();
}

export function getCategoryBySlug(slug: string) {
  return categoryRoutes.find((route) => route.slug === slug)?.category;
}

export function getProductsByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return [];
  }

  return products.filter((product) => product.category === category);
}
