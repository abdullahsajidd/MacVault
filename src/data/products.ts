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
  lastUpdated?: string;
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
    condition: "Sealed / open-box",
    badge: "Best flagship",
    accent: "#0a84ff",
    summary: "A 256GB flagship iPhone with an A17 Pro chip, USB-C, and Pro cameras. Check the exact condition, PTA status, colour, and warranty before payment.",
    description:
      "Choose this model if you want a large display, strong cameras, long software support, and 256GB storage. Sealed and open-box options may differ in price, PTA status, colour, and warranty.",
    technicalSpecs: [
      { label: "Chip", value: "A17 Pro" },
      { label: "Camera", value: "Pro camera system" },
      { label: "Connectivity", value: "USB-C" },
      { label: "Display", value: "Super Retina XDR" },
    ],
    details: [
      { label: "Storage", value: "256GB" },
      { label: "Condition", value: "Sealed / open-box options" },
      { label: "PTA", value: "Varies by unit. Ask before payment" },
      { label: "Warranty", value: "Varies by unit. Get the terms in writing" },
    ],
    highlights: [
      "Large 6.7-inch display for media and everyday use",
      "Pro camera system with 5x optical zoom",
      "Ask for current photos, PTA status, and box condition",
    ],
    packageItems: ["iPhone unit", "Box if included", "USB-C cable if included", "Written warranty terms"],
    gallery: [
      {
        title: "Device image",
        caption: "Reference view of the model. Ask for current photos of the exact unit.",
        kind: "phone",
      },
      {
        title: "Box status",
        caption: "Check whether the exact unit is sealed or open-box and what comes with it.",
        kind: "phone",
      },
      {
        title: "PTA check",
        caption: "Ask whether the exact phone is PTA approved or non-PTA before payment.",
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
    condition: "Open-box / used",
    badge: "Value Pro",
    accent: "#5856d6",
    summary: "A 128GB Pro iPhone with an A16 Bionic chip, ProMotion display, and 48MP main camera. Check battery health, PTA status, and body condition per unit.",
    description:
      "Choose this model if you want Pro cameras and a smooth 120Hz display at a lower price than newer Pro models. Used and open-box units should be compared by battery health, PTA status, and physical condition.",
    technicalSpecs: [
      { label: "Chip", value: "A16 Bionic" },
      { label: "Display", value: "ProMotion display" },
      { label: "Camera", value: "48MP main camera" },
      { label: "Battery", value: "Health shared per unit" },
    ],
    details: [
      { label: "Storage", value: "128GB" },
      { label: "Condition", value: "Open-box / used options" },
      { label: "Battery", value: "Varies by unit. Ask for the percentage" },
      { label: "PTA", value: "Non-PTA options. Confirm the exact unit" },
    ],
    highlights: [
      "ProMotion display and 48MP main camera",
      "Ask for battery health and current condition photos",
      "Confirm PTA status, Face ID, display, cameras, and buttons",
    ],
    packageItems: ["iPhone unit", "Cable if included", "Box if included", "Written condition and warranty terms"],
    gallery: [
      {
        title: "Device condition",
        caption: "Ask for current photos of the display, edges, camera area, and back glass.",
        kind: "phone",
      },
      {
        title: "Variant notes",
        caption: "Confirm the storage, colour, PTA status, and battery health of the exact unit.",
        kind: "phone",
      },
      {
        title: "Ready to reserve",
        caption: "Ask whether inspection, pickup, delivery, or a short hold is available.",
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
    summary: "A lightweight 13-inch MacBook Air with the Apple M3 chip. Compare memory, storage, colour, cycle count, charger, and warranty before buying.",
    description:
      "Choose this MacBook for study, office work, browsing, coding, and light creative work. Memory and storage cannot be upgraded later, so check the configuration before choosing a unit.",
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
      { label: "Cycle count", value: "Ask for open-box or used units" },
    ],
    highlights: [
      "Lightweight design for study, office work, and travel",
      "Check memory and storage because they cannot be upgraded later",
      "Ask for cycle count, battery condition, charger, and keyboard layout",
    ],
    packageItems: ["MacBook Air unit", "Charger and cable if included", "Battery and cycle details", "Written warranty terms"],
    gallery: [
      {
        title: "Open display",
        caption: "Ask for current photos of the screen, keyboard, ports, and outer body.",
        kind: "laptop",
      },
      {
        title: "Battery note",
        caption: "Ask for the battery cycle count, maximum capacity, and written warranty terms.",
        kind: "laptop",
      },
      {
        title: "Configuration",
        caption: "Confirm the chip, memory, storage, colour, and keyboard layout.",
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
    summary: "A 14-inch MacBook Pro with the M3 Pro chip for demanding work. Check memory, storage, cycle count, charger, condition, and warranty per unit.",
    description:
      "Choose this model for software development, design, video editing, music production, or other demanding work. Compare the exact memory and storage configuration before buying.",
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
      { label: "Condition", value: "Open-box or used. Ask for current photos" },
    ],
    highlights: [
      "M3 Pro performance for demanding professional work",
      "Liquid Retina XDR display with HDMI and SDXC ports",
      "Ask for cycle count, charger condition, keyboard layout, and warranty",
    ],
    packageItems: ["MacBook Pro unit", "Charger and cable if included", "Battery and cycle details", "Written condition and warranty terms"],
    gallery: [
      {
        title: "Pro display",
        caption: "Ask for current photos of the display, keyboard, ports, and outer body.",
        kind: "laptop",
      },
      {
        title: "Port check",
        caption: "Confirm the HDMI, SDXC, Thunderbolt ports, charger, and body condition.",
        kind: "laptop",
      },
      {
        title: "Work ready",
        caption: "Check the chip, memory, and storage against the work you plan to do.",
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
    summary: "An 11-inch iPad Pro with the Apple M4 chip and Ultra Retina XDR display. Check storage, condition, accessories, box, and warranty per unit.",
    description:
      "Choose this iPad for drawing, design, notes, media, travel, and fast everyday work. Confirm whether the Apple Pencil, keyboard, cover, cable, and warranty are included or sold separately.",
    technicalSpecs: [
      { label: "Chip", value: "Apple M4" },
      { label: "Display", value: "11-inch Ultra Retina XDR" },
      { label: "Camera", value: "12MP wide camera" },
      { label: "Connectivity", value: "USB-C and Thunderbolt" },
    ],
    details: [
      { label: "Storage", value: "256GB options" },
      { label: "Condition", value: "Sealed / open-box" },
      { label: "Accessories", value: "Varies by bundle. Check what is included" },
      { label: "Warranty", value: "Varies by unit. Get the terms in writing" },
    ],
    highlights: [
      "M4 performance in a thin 11-inch tablet",
      "Useful for creative work, notes, media, and travel",
      "Ask which Pencil and keyboard models are compatible and included",
    ],
    packageItems: ["iPad unit", "Cable and adapter if included", "Selected accessories if included", "Written warranty terms"],
    gallery: [
      {
        title: "Tablet view",
        caption: "Ask for current photos of the display, corners, back, and camera area.",
        kind: "tablet",
      },
      {
        title: "Accessories",
        caption: "Confirm the Pencil, keyboard, and cover model before adding an accessory.",
        kind: "tablet",
      },
      {
        title: "Storage",
        caption: "Confirm storage, connectivity, colour, and warranty for the exact unit.",
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
    summary: "An Apple Watch Series 9 with an Always-On display and S9 chip. Check size, battery health, case and band condition, charger, box, and warranty.",
    description:
      "Choose this watch for fitness tracking, notifications, calls, and everyday Apple features. The 41mm and 45mm sizes fit differently, so check the size and exact band before buying.",
    technicalSpecs: [
      { label: "Chip", value: "S9 SiP" },
      { label: "Display", value: "Always-On Retina" },
      { label: "Battery", value: "Health shared per unit" },
      { label: "Connectivity", value: "GPS connectivity" },
    ],
    details: [
      { label: "Size", value: "41mm / 45mm options" },
      { label: "Condition", value: "Open-box / used options" },
      { label: "Band", value: "Varies by unit. Check size and condition" },
      { label: "Battery", value: "Varies by unit. Ask for the percentage" },
    ],
    highlights: [
      "Available in 41mm and 45mm sizes",
      "Ask for battery health and current case and screen photos",
      "Confirm band size, charger, box, and warranty",
    ],
    packageItems: ["Apple Watch unit", "Band if included", "Charging cable if included", "Written condition and warranty terms"],
    gallery: [
      {
        title: "Case condition",
        caption: "Ask for current photos of the screen, case, crown, and back sensor.",
        kind: "watch",
      },
      {
        title: "Band check",
        caption: "Confirm the band type, size, colour, and wear on the exact unit.",
        kind: "watch",
      },
      {
        title: "Battery",
        caption: "Ask for the current battery health percentage before payment.",
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
    summary: "AirPods Pro 2 with USB-C charging, active noise cancellation, and Transparency mode. Check seal, model, box, included tips, and warranty before payment.",
    description:
      "Choose these AirPods if you want strong noise cancellation, simple Apple device pairing, and a USB-C charging case. Confirm the model and seal because similar AirPods versions can look alike.",
    technicalSpecs: [
      { label: "Audio", value: "Active Noise Cancellation" },
      { label: "Listening", value: "Transparency mode" },
      { label: "Charging", value: "USB-C and MagSafe" },
      { label: "Controls", value: "Touch controls" },
    ],
    details: [
      { label: "Case", value: "USB-C" },
      { label: "Condition", value: "Sealed" },
      { label: "Warranty", value: "Varies by unit. Get the terms in writing" },
      { label: "Bundle", value: "Can pair with iPhone/Mac" },
    ],
    highlights: [
      "USB-C and MagSafe charging case",
      "Active Noise Cancellation and Transparency mode",
      "Confirm the serial, seal, included tips, cable, and warranty",
    ],
    packageItems: ["AirPods Pro earbuds", "USB-C charging case", "Ear tips and cable as boxed", "Written warranty terms"],
    gallery: [
      {
        title: "Case view",
        caption: "Confirm the USB-C case version and model before payment.",
        kind: "audio",
      },
      {
        title: "Sealed stock",
        caption: "Ask for current photos of the seal, serial label, and packaging.",
        kind: "audio",
      },
      {
        title: "Bundle ready",
        caption: "Check the exact included tips, cable, case, and warranty terms.",
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
    summary: "A PlayStation 5 Slim Disc Edition bundle with a DualSense controller. Check the exact game bundle, seal, box, warranty, and included cables.",
    description:
      "Choose the Disc Edition if you want to use physical PS5 and supported PS4 game discs. Bundle contents can change, so compare the controller, game, stand, cables, and warranty before payment.",
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
      { label: "Hold", value: "Ask whether a short hold is available" },
    ],
    highlights: [
      "Disc drive for physical games and Blu-ray discs",
      "4K gaming support with a DualSense controller",
      "Confirm the exact game, cables, stand, seal, and warranty",
    ],
    packageItems: ["PS5 Slim Disc console", "DualSense controller", "Power, HDMI, and USB cables as boxed", "Game and stand only if listed", "Written warranty terms"],
    gallery: [
      {
        title: "Console view",
        caption: "Confirm the Disc Edition, seal, box, and serial label before payment.",
        kind: "console",
      },
      {
        title: "Bundle check",
        caption: "Check the controller, game, cables, stand, and other bundle contents.",
        kind: "console",
      },
      {
        title: "Reserve",
        caption: "Ask whether inspection, pickup, delivery, or a short hold is available.",
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

export const catalogEditorialVersion = "2026-07-15T18:00:00.000Z";

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
