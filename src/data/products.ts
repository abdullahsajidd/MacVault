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

export type ProductUnitDetails = {
  storage?: string;
  ram?: string;
  colour?: string;
  batteryHealth?: number;
  batteryCycleCount?: number;
  ptaStatus?: string;
  boxStatus?: string;
  warranty?: string;
  keyboardLayout?: string;
  chargerIncluded?: boolean;
  connectivity?: string;
  size?: string;
  edition?: string;
  controllerIncluded?: boolean;
  gamesIncluded?: string[];
  connector?: string;
  cableLength?: string;
  serialStatus?: string;
  includedItems?: string[];
  notes?: string;
};

export type ProductModel = {
  id: string;
  key: string;
  name: string;
  brand: string;
  releaseYear?: number;
  sourceName?: string;
  sourceUrl?: string;
  specs: ProductProperty[];
};

export type Product = {
  slug: string;
  category: string;
  title: string;
  shortTitle: string;
  model?: ProductModel;
  unitDetails?: ProductUnitDetails;
  status?: string;
  condition: string;
  price?: number | string;
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
    status: "Available",
    condition: "Sealed / open-box",
    price: 475000,
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
    status: "Limited stock",
    condition: "Open-box / used",
    price: 175000,
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
    status: "Available",
    condition: "Sealed / open-box",
    price: 325000,
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
    status: "Available",
    condition: "Open-box / premium used",
    price: 575000,
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
    status: "Available",
    condition: "Sealed / open-box",
    price: 310000,
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
    status: "Limited stock",
    condition: "Open-box",
    price: 95000,
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
    status: "Available",
    condition: "Sealed",
    price: 65000,
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
    status: "Limited stock",
    condition: "Bundle options",
    price: 245000,
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
  {
    category: "Cables",
    label: "Cables",
    pluralLabel: "Cables",
    slug: "cables",
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
  Cables: "Cable stock",
};

export function getProductBadge(category: string) {
  return categoryBadgeMap[category] ?? "Current stock";
}

const expectedPriceRangeOffset = 5000;
const fallbackTemplateValue = "Not Available";

type DetailLike = {
  label: string;
  value: string;
};

type ProductTemplateFieldDefinition = {
  label: string;
  aliases?: string[];
  value?: (product: Product) => string;
};

export type ProductTemplateField = {
  label: string;
  value: string;
};

export type ProductTemplate = {
  title: string;
  text: string;
  fields: ProductTemplateField[];
};

function normalizeLabel(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function formatPkr(value: number) {
  return `Rs ${Math.round(value).toLocaleString("en-PK")}`;
}

export function parseBasePrice(price?: Product["price"] | null) {
  if (typeof price === "number") {
    return Number.isFinite(price) && price > 0 ? price : null;
  }

  if (typeof price !== "string") {
    return null;
  }

  const value = Number(price.replace(/[^0-9.]/g, ""));

  return Number.isFinite(value) && value > 0 ? value : null;
}

export function getExpectedPriceRange(price?: Product["price"] | null) {
  const basePrice = parseBasePrice(price);

  if (!basePrice) {
    return null;
  }

  return {
    min: Math.max(0, basePrice - expectedPriceRangeOffset),
    max: basePrice + expectedPriceRangeOffset,
  };
}

export function getExpectedPriceLabel(product: Pick<Product, "price">) {
  const range = getExpectedPriceRange(product.price);

  if (!range) {
    return "Confirm today’s price";
  }

  return `Expected ${formatPkr(range.min)}–${formatPkr(range.max).replace("Rs ", "")}`;
}

export function getProductStockLabel(product: Pick<Product, "status">) {
  const status = product.status?.trim().toLowerCase();

  if (!status) {
    return "Available";
  }

  if (status.includes("sold")) {
    return "Sold";
  }

  if (status.includes("reserved")) {
    return "Reserved";
  }

  if (status.includes("low") || status.includes("limited")) {
    return "Limited stock";
  }

  return "Available";
}

export function getProductStockTone(product: Pick<Product, "status">) {
  const label = getProductStockLabel(product);

  if (label === "Sold") {
    return "negative";
  }

  if (label === "Reserved" || label === "Limited stock") {
    return "warning";
  }

  return "positive";
}

function productFacts(product: Product): DetailLike[] {
  const unitDetails = product.unitDetails;
  const exactUnitFacts: DetailLike[] = unitDetails
    ? [
        unitDetails.storage ? {label: "Storage", value: unitDetails.storage} : null,
        unitDetails.ram ? {label: "RAM", value: unitDetails.ram} : null,
        unitDetails.colour ? {label: "Colour", value: unitDetails.colour} : null,
        unitDetails.batteryHealth ? {label: "Battery health", value: `${unitDetails.batteryHealth}%`} : null,
        unitDetails.batteryCycleCount !== undefined ? {label: "Battery cycle count", value: String(unitDetails.batteryCycleCount)} : null,
        unitDetails.ptaStatus ? {label: "PTA status", value: unitDetails.ptaStatus} : null,
        unitDetails.boxStatus ? {label: "Box status", value: unitDetails.boxStatus} : null,
        unitDetails.warranty ? {label: "Warranty", value: unitDetails.warranty} : null,
        unitDetails.keyboardLayout ? {label: "Keyboard layout", value: unitDetails.keyboardLayout} : null,
        unitDetails.chargerIncluded !== undefined ? {label: "Charger included", value: unitDetails.chargerIncluded ? "Yes" : "No"} : null,
        unitDetails.connectivity ? {label: "Connectivity", value: unitDetails.connectivity} : null,
        unitDetails.size ? {label: "Size", value: unitDetails.size} : null,
        unitDetails.edition ? {label: "Edition", value: unitDetails.edition} : null,
        unitDetails.controllerIncluded !== undefined ? {label: "Controller included", value: unitDetails.controllerIncluded ? "Yes" : "No"} : null,
        unitDetails.gamesIncluded?.length ? {label: "Games included", value: unitDetails.gamesIncluded.join(" · ")} : null,
        unitDetails.connector ? {label: "Connector", value: unitDetails.connector} : null,
        unitDetails.cableLength ? {label: "Cable length", value: unitDetails.cableLength} : null,
        unitDetails.serialStatus ? {label: "Serial status", value: unitDetails.serialStatus} : null,
      ].filter(Boolean) as DetailLike[]
    : [];

  return [
    ...exactUnitFacts,
    ...product.details,
    ...product.technicalSpecs.map(({ label, value }) => ({ label, value })),
    ...(product.model?.specs ?? []).map(({label, value}) => ({label, value})),
    ...product.listingOptions.map(({ label, values }) => ({
      label,
      value: values.join(" / "),
    })),
  ];
}

function findProductFact(product: Product, aliases: string[]) {
  const aliasSet = new Set(aliases.map(normalizeLabel));

  return productFacts(product).find((fact) => aliasSet.has(normalizeLabel(fact.label)))?.value;
}

function includedItems(product: Product) {
  if (product.unitDetails?.includedItems?.length) {
    return product.unitDetails.includedItems.join(" · ");
  }

  return product.packageItems.length > 0
    ? product.packageItems.slice(0, 4).join(" · ")
    : fallbackTemplateValue;
}

function conditionValue(product: Product) {
  return findProductFact(product, ["Condition"]) ?? product.condition;
}

function templateField(
  definition: ProductTemplateFieldDefinition,
  product: Product,
): ProductTemplateField {
  return {
    label: definition.label,
    value:
      definition.value?.(product) ??
      findProductFact(product, definition.aliases ?? [definition.label]) ??
      fallbackTemplateValue,
  };
}

const productTemplateDefinitions: Record<
  string,
  {
    title: string;
    text: string;
    fields: ProductTemplateFieldDefinition[];
  }
> = {
  iPhone: {
    title: "iPhone unit checklist",
    text: "Confirm the phone-specific details that change the final decision before payment.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "PTA status", aliases: ["PTA", "PTA status"] },
      { label: "Battery health", aliases: ["Battery", "Battery health"] },
      { label: "Storage", aliases: ["Storage"] },
      { label: "Colour", aliases: ["Color", "Colour"] },
      { label: "Condition", value: conditionValue },
      { label: "Box status", aliases: ["Box", "Box status"] },
      { label: "Warranty", aliases: ["Warranty"] },
      { label: "Included items", value: includedItems },
      { label: "Checks", value: () => "Face ID, True Tone, display, cameras, buttons, speakers, and charging" },
    ],
  },
  Mac: {
    title: "MacBook unit checklist",
    text: "Confirm the MacBook details that affect value, battery confidence, and daily use.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "Model/chip", aliases: ["Chip", "Model", "Processor"] },
      { label: "RAM", aliases: ["Memory", "RAM"] },
      { label: "Storage", aliases: ["Storage"] },
      { label: "Battery cycle count", aliases: ["Cycle count", "Battery cycle count"] },
      { label: "Battery health", aliases: ["Battery", "Battery health"] },
      { label: "Keyboard layout", aliases: ["Keyboard", "Keyboard layout"] },
      { label: "Charger included", aliases: ["Charger", "Power adapter"] },
      { label: "Condition", value: conditionValue },
      { label: "Warranty", aliases: ["Warranty"] },
      { label: "Checks", value: () => "Display, keyboard, trackpad, ports, speakers, camera, charger, and battery report" },
    ],
  },
  iPad: {
    title: "iPad unit checklist",
    text: "Confirm the iPad details that affect compatibility, accessories, and condition.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "Storage", aliases: ["Storage"] },
      { label: "Wi‑Fi or cellular", aliases: ["Connectivity", "Network", "Cellular"] },
      { label: "Apple Pencil support", aliases: ["Pencil", "Apple Pencil", "Accessories"] },
      { label: "Keyboard compatibility", aliases: ["Keyboard", "Accessories"] },
      { label: "Battery/condition", aliases: ["Battery", "Condition"] },
      { label: "Box/accessories", aliases: ["Box", "Accessories", "Bundle"] },
      { label: "Warranty", aliases: ["Warranty"] },
    ],
  },
  Watch: {
    title: "Apple Watch unit checklist",
    text: "Confirm the watch details that affect fit, battery life, and warranty.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "Size", aliases: ["Size"] },
      { label: "GPS or cellular", aliases: ["Connectivity", "GPS", "Cellular"] },
      { label: "Battery health", aliases: ["Battery", "Battery health"] },
      { label: "Strap/box status", aliases: ["Band", "Strap", "Box"] },
      { label: "Condition", value: conditionValue },
      { label: "Warranty", aliases: ["Warranty"] },
    ],
  },
  Accessories: {
    title: "AirPods and accessories checklist",
    text: "Confirm the accessory details that affect originality, battery confidence, and included items.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "Generation/model", aliases: ["Model", "Generation", "Audio"] },
      { label: "Serial/box status", aliases: ["Serial", "Box", "Case"] },
      { label: "Battery/listening condition", aliases: ["Battery", "Listening"] },
      { label: "Warranty", aliases: ["Warranty"] },
      { label: "Included items", value: includedItems },
    ],
  },
  PlayStation: {
    title: "PlayStation unit checklist",
    text: "Confirm the console details that affect the bundle value and setup.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "Disc or digital", aliases: ["Edition", "Drive"] },
      { label: "Storage", aliases: ["Storage", "Console"] },
      { label: "Region/version", aliases: ["Region", "Version", "Edition"] },
      { label: "Controller included", aliases: ["Controller", "Bundle"] },
      { label: "Games included", aliases: ["Games", "Bundle"] },
      { label: "Warranty", aliases: ["Warranty"] },
      { label: "Condition", value: conditionValue },
    ],
  },
  Cables: {
    title: "Cable unit checklist",
    text: "Confirm the connector, length, power rating, condition, and included packaging before payment.",
    fields: [
      { label: "Expected price", value: getExpectedPriceLabel },
      { label: "Connector", aliases: ["Connector"] },
      { label: "Cable length", aliases: ["Cable length", "Length"] },
      { label: "Power rating", aliases: ["Power", "Power rating"] },
      { label: "Condition", value: conditionValue },
      { label: "Box status", aliases: ["Box", "Box status"] },
      { label: "Warranty", aliases: ["Warranty"] },
      { label: "Included items", value: includedItems },
    ],
  },
};

const productListingHighlightAliases: Record<string, string[][]> = {
  iPhone: [["PTA", "PTA status"], ["Battery", "Battery health", "Storage"]],
  Mac: [["Cycle count", "Battery cycle count", "Battery"], ["Storage"]],
  iPad: [["Storage"], ["Connectivity", "Accessories"]],
  Watch: [["Battery", "Battery health"], ["Size", "Band"]],
  Accessories: [["Condition", "Case"], ["Warranty", "Bundle"]],
  PlayStation: [["Edition", "Drive"], ["Bundle", "Controller"]],
  Cables: [["Connector"], ["Cable length", "Length", "Power"]],
};

export function getProductTemplate(product: Product): ProductTemplate {
  const definition =
    productTemplateDefinitions[product.category] ??
    productTemplateDefinitions.Accessories;

  return {
    title: definition.title,
    text: definition.text,
    fields: definition.fields.map((field) => templateField(field, product)),
  };
}

export function getProductCardHighlights(product: Product): ProductTemplateField[] {
  const aliasGroups = productListingHighlightAliases[product.category] ?? [["Condition"], ["Warranty"]];
  const usedLabels = new Set<string>();
  const highlights = aliasGroups
    .map((aliases) => {
      const found = productFacts(product).find((fact) =>
        aliases.map(normalizeLabel).includes(normalizeLabel(fact.label)),
      );

      if (!found) {
        return null;
      }

      usedLabels.add(normalizeLabel(found.label));

      return {
        label: found.label,
        value: found.value,
      };
    })
    .filter(Boolean) as ProductTemplateField[];

  for (const fact of product.details) {
    if (highlights.length >= 2) {
      break;
    }

    const normalized = normalizeLabel(fact.label);

    if (!usedLabels.has(normalized)) {
      highlights.push(fact);
      usedLabels.add(normalized);
    }
  }

  return highlights.slice(0, 2);
}

export function isPtaApprovedProduct(product: Product) {
  const pta = findProductFact(product, ["PTA", "PTA status"])?.toLowerCase();

  return Boolean(
    product.category === "iPhone" &&
      pta &&
      pta.includes("approved") &&
      !pta.includes("non-pta") &&
      !pta.includes("varies"),
  );
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
