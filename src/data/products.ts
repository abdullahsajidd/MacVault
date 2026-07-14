export type ProductVisualKind = "phone" | "laptop" | "tablet" | "watch" | "console" | "audio";

export type ProductGalleryItem = {
  title: string;
  caption: string;
  kind: ProductVisualKind;
  imageUrl: string;
  imageAlt: string;
  sourceUrl: string;
  usage: "reference" | "exact-unit";
};

export type ProductProperty = {
  id: string;
  label: string;
  value: string;
};

export type ProductOption = {
  id: string;
  label: string;
  values: string[];
};

export type Product = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  status: string;
  condition: string;
  price?: string;
  badge: string;
  accent: string;
  summary: string;
  description: string;
  specs: string[];
  details: { label: string; value: string }[];
  technicalSpecs: ProductProperty[];
  listingOptions: ProductOption[];
  highlights: string[];
  packageItems: string[];
  gallery: ProductGalleryItem[];
};

type RawProduct = Omit<Product, "gallery" | "specs" | "technicalSpecs" | "listingOptions"> & {
  technicalSpecs: Omit<ProductProperty, "id">[];
  gallery: Omit<ProductGalleryItem, "imageUrl" | "imageAlt" | "sourceUrl" | "usage">[];
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
    badge: "Best flagship",
    accent: "#0a84ff",
    summary: "Titanium iPhone with clear PTA, storage, color, and warranty notes before reserve.",
    description:
      "A high-demand flagship listing for buyers who want the Pro Max camera system, premium build, and clear local buying support.",
    technicalSpecs: [
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "Pro camera system" },
      { label: "Connectivity", value: "USB-C" },
      { label: "Display", value: "Super Retina XDR" },
    ],
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
        title: "Device image",
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
    badge: "Value Pro",
    accent: "#5856d6",
    summary: "A strong Pro iPhone choice with condition, battery, PTA, and accessories explained.",
    description:
      "For buyers who want Pro cameras and premium iPhone performance without moving to the newest flagship tier.",
    technicalSpecs: [
      { label: "Chip", value: "A16 Bionic" },
      { label: "Display", value: "ProMotion display" },
      { label: "Camera", value: "48MP main camera" },
      { label: "Battery", value: "Health shared per unit" },
    ],
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
    badge: "Daily work",
    accent: "#34c759",
    summary: "Thin, fast MacBook Air with chip, memory, storage, battery, and warranty notes.",
    description:
      "A clean everyday Mac for students, creators, business owners, and remote work buyers who need portable performance.",
    technicalSpecs: [
      { label: "Chip", value: "Apple M3" },
      { label: "Display", value: "13-inch Liquid Retina" },
      { label: "Battery", value: "All-day battery life" },
      { label: "Connectivity", value: "MagSafe and Thunderbolt" },
    ],
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
    badge: "Creator pick",
    accent: "#ff9f0a",
    summary: "Powerful MacBook Pro options with cycle count, chip, memory, and warranty details.",
    description:
      "Built for buyers who need stronger sustained performance for development, design, editing, and production workloads.",
    technicalSpecs: [
      { label: "Chip", value: "Apple M3 Pro" },
      { label: "Display", value: "14-inch Liquid Retina XDR" },
      { label: "Battery", value: "Cycle count shared per unit" },
      { label: "Connectivity", value: "HDMI, SDXC and Thunderbolt" },
    ],
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
    badge: "Creative tablet",
    accent: "#af52de",
    summary: "Premium iPad Pro variants with storage, accessories, box state, and warranty notes.",
    description:
      "A slim, high-performance iPad for media, design, notes, travel, and serious portable workflows.",
    technicalSpecs: [
      { label: "Chip", value: "Apple M4" },
      { label: "Display", value: "11-inch Ultra Retina XDR" },
      { label: "Camera", value: "12MP wide camera" },
      { label: "Connectivity", value: "USB-C and Thunderbolt" },
    ],
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
    badge: "Daily wearable",
    accent: "#ff375f",
    summary: "Apple Watch options with size, band, battery, and box condition shared upfront.",
    description:
      "A clean wearable upgrade for fitness, calls, notifications, and Apple ecosystem convenience.",
    technicalSpecs: [
      { label: "Chip", value: "S9 SiP" },
      { label: "Display", value: "Always-On Retina" },
      { label: "Battery", value: "Health shared per unit" },
      { label: "Connectivity", value: "GPS connectivity" },
    ],
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
    badge: "Apple accessories",
    accent: "#00c7be",
    summary: "AirPods Pro stock with sealed condition, USB-C case, and warranty expectations.",
    description:
      "A premium Apple accessory for buyers who want active noise cancellation and easy pairing.",
    technicalSpecs: [
      { label: "Audio", value: "Active Noise Cancellation" },
      { label: "Listening", value: "Transparency mode" },
      { label: "Charging", value: "USB-C and MagSafe" },
      { label: "Controls", value: "Touch controls" },
    ],
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
    category: "PlayStation",
    title: "PlayStation 5 Slim Disc Bundle",
    shortTitle: "PS5 Slim",
    status: "Low stock",
    condition: "Bundle options",
    badge: "Gaming bundle",
    accent: "#1d4ed8",
    summary: "PS5 Slim bundle availability with controller, game, warranty, and box notes.",
    description:
      "A ready console bundle with clear availability and package details before you visit.",
    technicalSpecs: [
      { label: "Console", value: "PlayStation 5 Slim" },
      { label: "Drive", value: "Disc edition" },
      { label: "Video", value: "4K gaming support" },
      { label: "Connectivity", value: "HDMI, USB and Wi-Fi" },
    ],
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

const optionLabels = new Set([
  "Storage",
  "Condition",
  "PTA",
  "Memory",
  "Size",
  "Color",
  "Bundle",
  "Band",
  "Edition",
]);

function optionValues(value: string) {
  return value
    .replace(/\s+options?$/i, "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
}

export const products: Product[] = rawProducts.map((product) => {
  const photos = productPhotoSets[product.slug];

  return {
    ...product,
    specs: product.technicalSpecs.map((spec) => spec.value),
    technicalSpecs: product.technicalSpecs.map((spec, index) => ({
      id: `${product.slug}-spec-${index}`,
      ...spec,
    })),
    listingOptions: product.details
      .filter((detail) => optionLabels.has(detail.label))
      .map((detail, index) => ({
        id: `${product.slug}-option-${index}`,
        label: detail.label,
        values: optionValues(detail.value),
      })),
    gallery: product.gallery.map((item, index) => {
      const photo = photos[index % photos.length];

      return {
        ...item,
        imageUrl: `/images/products/${product.slug}-${index + 1}.jpg`,
        imageAlt: `${product.title} ${item.title}`,
        sourceUrl: photo.sourceUrl,
        usage: "reference",
      };
    }),
  };
});

export const categoryDefinitions = [
  { category: "iPhone", label: "iPhone", pluralLabel: "iPhones", slug: "iphone" },
  { category: "Mac", label: "MacBook", pluralLabel: "MacBooks", slug: "mac" },
  { category: "iPad", label: "iPad", pluralLabel: "iPads", slug: "ipad" },
  { category: "Watch", label: "Apple Watch", pluralLabel: "Apple Watch", slug: "watch" },
  {
    category: "Accessories",
    label: "AirPods & Accessories",
    pluralLabel: "AirPods & Accessories",
    slug: "accessories",
  },
  {
    category: "PlayStation",
    label: "PlayStation",
    pluralLabel: "PlayStation",
    slug: "playstation",
  },
] as const;

export type ProductCategory = (typeof categoryDefinitions)[number]["category"];
export type ProductCategorySlug = (typeof categoryDefinitions)[number]["slug"];

export const productCategories = ["All", ...categoryDefinitions.map((item) => item.category)];

export const categoryRoutes = categoryDefinitions.map(({ category, slug }) => ({
  category,
  slug,
  href: `/products/category/${slug}`,
}));

export const featuredProducts = products.filter((product) =>
  ["iphone-15-pro-max-256", "macbook-air-m3-13", "ps5-slim-disc-bundle"].includes(product.slug),
);

const categoryBadgeMap: Record<string, string> = {
  iPhone: "iPhone stock",
  Mac: "MacBook stock",
  iPad: "iPad stock",
  Watch: "Apple Watch stock",
  Accessories: "Apple accessories",
  PlayStation: "PlayStation stock",
};

export function getProductBadge(category: string) {
  return categoryBadgeMap[category] ?? "Current stock";
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategorySlug(category: string) {
  return categoryDefinitions.find((item) => item.category === category)?.slug ?? category.toLowerCase();
}

export function getCategoryBySlug(slug: string) {
  return categoryRoutes.find((route) => route.slug === slug)?.category;
}

export function getCategoryLabel(category: string) {
  return categoryDefinitions.find((item) => item.category === category)?.label ?? category;
}

export function getProductsByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return [];
  }

  return products.filter((product) => product.category === category);
}
