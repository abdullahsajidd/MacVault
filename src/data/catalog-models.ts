export type CatalogModelSpec = {
  label: string;
  value: string;
};

export type CatalogModelDefinition = {
  key: string;
  name: string;
  category: string;
  brand: string;
  releaseYear?: number;
  sourceName: string;
  sourceUrl: string;
  specs: CatalogModelSpec[];
};

type IPhoneSeed = {
  key: string;
  name: string;
  year: number;
  display: string;
  chipset: string;
  ram: string;
  storage: string;
  cameras: string;
  battery: string;
  gsmArenaId: string;
};

const iphoneSeeds: IPhoneSeed[] = [
  {key: "iphone-6", name: "iPhone 6", year: 2014, display: "4.7-inch IPS LCD", chipset: "Apple A8", ram: "1GB", storage: "16GB / 32GB / 64GB / 128GB", cameras: "8MP rear · 1.2MP front", battery: "1810mAh", gsmArenaId: "6378"},
  {key: "iphone-6-plus", name: "iPhone 6 Plus", year: 2014, display: "5.5-inch IPS LCD", chipset: "Apple A8", ram: "1GB", storage: "16GB / 64GB / 128GB", cameras: "8MP rear · 1.2MP front", battery: "2915mAh", gsmArenaId: "6665"},
  {key: "iphone-6s", name: "iPhone 6s", year: 2015, display: "4.7-inch IPS LCD", chipset: "Apple A9", ram: "2GB", storage: "16GB / 32GB / 64GB / 128GB", cameras: "12MP rear · 5MP front", battery: "1715mAh", gsmArenaId: "7242"},
  {key: "iphone-6s-plus", name: "iPhone 6s Plus", year: 2015, display: "5.5-inch IPS LCD", chipset: "Apple A9", ram: "2GB", storage: "16GB / 32GB / 64GB / 128GB", cameras: "12MP rear · 5MP front", battery: "2750mAh", gsmArenaId: "7243"},
  {key: "iphone-se-1", name: "iPhone SE (1st generation)", year: 2016, display: "4.0-inch IPS LCD", chipset: "Apple A9", ram: "2GB", storage: "16GB / 32GB / 64GB / 128GB", cameras: "12MP rear · 1.2MP front", battery: "1624mAh", gsmArenaId: "7969"},
  {key: "iphone-7", name: "iPhone 7", year: 2016, display: "4.7-inch IPS LCD", chipset: "Apple A10 Fusion", ram: "2GB", storage: "32GB / 128GB / 256GB", cameras: "12MP rear · 7MP front", battery: "1960mAh", gsmArenaId: "8064"},
  {key: "iphone-7-plus", name: "iPhone 7 Plus", year: 2016, display: "5.5-inch IPS LCD", chipset: "Apple A10 Fusion", ram: "3GB", storage: "32GB / 128GB / 256GB", cameras: "Dual 12MP rear · 7MP front", battery: "2900mAh", gsmArenaId: "8065"},
  {key: "iphone-8", name: "iPhone 8", year: 2017, display: "4.7-inch IPS LCD", chipset: "Apple A11 Bionic", ram: "2GB", storage: "64GB / 128GB / 256GB", cameras: "12MP rear · 7MP front", battery: "1821mAh", gsmArenaId: "8573"},
  {key: "iphone-8-plus", name: "iPhone 8 Plus", year: 2017, display: "5.5-inch IPS LCD", chipset: "Apple A11 Bionic", ram: "3GB", storage: "64GB / 128GB / 256GB", cameras: "Dual 12MP rear · 7MP front", battery: "2691mAh", gsmArenaId: "8131"},
  {key: "iphone-x", name: "iPhone X", year: 2017, display: "5.8-inch OLED", chipset: "Apple A11 Bionic", ram: "3GB", storage: "64GB / 256GB", cameras: "Dual 12MP rear · 7MP front", battery: "2716mAh", gsmArenaId: "8858"},
  {key: "iphone-xr", name: "iPhone XR", year: 2018, display: "6.1-inch IPS LCD", chipset: "Apple A12 Bionic", ram: "3GB", storage: "64GB / 128GB / 256GB", cameras: "12MP rear · 7MP front", battery: "2942mAh", gsmArenaId: "9320"},
  {key: "iphone-xs", name: "iPhone XS", year: 2018, display: "5.8-inch OLED", chipset: "Apple A12 Bionic", ram: "4GB", storage: "64GB / 256GB / 512GB", cameras: "Dual 12MP rear · 7MP front", battery: "2658mAh", gsmArenaId: "9318"},
  {key: "iphone-xs-max", name: "iPhone XS Max", year: 2018, display: "6.5-inch OLED", chipset: "Apple A12 Bionic", ram: "4GB", storage: "64GB / 256GB / 512GB", cameras: "Dual 12MP rear · 7MP front", battery: "3174mAh", gsmArenaId: "9319"},
  {key: "iphone-11", name: "iPhone 11", year: 2019, display: "6.1-inch IPS LCD", chipset: "Apple A13 Bionic", ram: "4GB", storage: "64GB / 128GB / 256GB", cameras: "Dual 12MP rear · 12MP front", battery: "3110mAh", gsmArenaId: "9848"},
  {key: "iphone-11-pro", name: "iPhone 11 Pro", year: 2019, display: "5.8-inch OLED", chipset: "Apple A13 Bionic", ram: "4GB", storage: "64GB / 256GB / 512GB", cameras: "Triple 12MP rear · 12MP front", battery: "3046mAh", gsmArenaId: "9847"},
  {key: "iphone-11-pro-max", name: "iPhone 11 Pro Max", year: 2019, display: "6.5-inch OLED", chipset: "Apple A13 Bionic", ram: "4GB", storage: "64GB / 256GB / 512GB", cameras: "Triple 12MP rear · 12MP front", battery: "3969mAh", gsmArenaId: "9846"},
  {key: "iphone-se-2", name: "iPhone SE (2nd generation)", year: 2020, display: "4.7-inch IPS LCD", chipset: "Apple A13 Bionic", ram: "3GB", storage: "64GB / 128GB / 256GB", cameras: "12MP rear · 7MP front", battery: "1821mAh", gsmArenaId: "10170"},
  {key: "iphone-12-mini", name: "iPhone 12 mini", year: 2020, display: "5.4-inch OLED", chipset: "Apple A14 Bionic", ram: "4GB", storage: "64GB / 128GB / 256GB", cameras: "Dual 12MP rear · 12MP front", battery: "2227mAh", gsmArenaId: "10510"},
  {key: "iphone-12", name: "iPhone 12", year: 2020, display: "6.1-inch OLED", chipset: "Apple A14 Bionic", ram: "4GB", storage: "64GB / 128GB / 256GB", cameras: "Dual 12MP rear · 12MP front", battery: "2815mAh", gsmArenaId: "10509"},
  {key: "iphone-12-pro", name: "iPhone 12 Pro", year: 2020, display: "6.1-inch OLED", chipset: "Apple A14 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB", cameras: "Triple 12MP rear + LiDAR · 12MP front", battery: "2815mAh", gsmArenaId: "10508"},
  {key: "iphone-12-pro-max", name: "iPhone 12 Pro Max", year: 2020, display: "6.7-inch OLED", chipset: "Apple A14 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB", cameras: "Triple 12MP rear + LiDAR · 12MP front", battery: "3687mAh", gsmArenaId: "10507"},
  {key: "iphone-13-mini", name: "iPhone 13 mini", year: 2021, display: "5.4-inch OLED", chipset: "Apple A15 Bionic", ram: "4GB", storage: "128GB / 256GB / 512GB", cameras: "Dual 12MP rear · 12MP front", battery: "2438mAh", gsmArenaId: "11104"},
  {key: "iphone-13", name: "iPhone 13", year: 2021, display: "6.1-inch OLED", chipset: "Apple A15 Bionic", ram: "4GB", storage: "128GB / 256GB / 512GB", cameras: "Dual 12MP rear · 12MP front", battery: "3240mAh", gsmArenaId: "11103"},
  {key: "iphone-13-pro", name: "iPhone 13 Pro", year: 2021, display: "6.1-inch 120Hz OLED", chipset: "Apple A15 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB / 1TB", cameras: "Triple 12MP rear + LiDAR · 12MP front", battery: "3095mAh", gsmArenaId: "11102"},
  {key: "iphone-13-pro-max", name: "iPhone 13 Pro Max", year: 2021, display: "6.7-inch 120Hz OLED", chipset: "Apple A15 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB / 1TB", cameras: "Triple 12MP rear + LiDAR · 12MP front", battery: "4352mAh", gsmArenaId: "11089"},
  {key: "iphone-se-3", name: "iPhone SE (3rd generation)", year: 2022, display: "4.7-inch IPS LCD", chipset: "Apple A15 Bionic", ram: "4GB", storage: "64GB / 128GB / 256GB", cameras: "12MP rear · 7MP front", battery: "2018mAh", gsmArenaId: "11410"},
  {key: "iphone-14", name: "iPhone 14", year: 2022, display: "6.1-inch OLED", chipset: "Apple A15 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB", cameras: "Dual 12MP rear · 12MP front", battery: "3279mAh", gsmArenaId: "11861"},
  {key: "iphone-14-plus", name: "iPhone 14 Plus", year: 2022, display: "6.7-inch OLED", chipset: "Apple A15 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB", cameras: "Dual 12MP rear · 12MP front", battery: "4323mAh", gsmArenaId: "11862"},
  {key: "iphone-14-pro", name: "iPhone 14 Pro", year: 2022, display: "6.1-inch 120Hz LTPO OLED", chipset: "Apple A16 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB / 1TB", cameras: "48MP + dual 12MP rear · 12MP front", battery: "3200mAh", gsmArenaId: "11860"},
  {key: "iphone-14-pro-max", name: "iPhone 14 Pro Max", year: 2022, display: "6.7-inch 120Hz LTPO OLED", chipset: "Apple A16 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB / 1TB", cameras: "48MP + dual 12MP rear · 12MP front", battery: "4323mAh", gsmArenaId: "11773"},
  {key: "iphone-15", name: "iPhone 15", year: 2023, display: "6.1-inch OLED", chipset: "Apple A16 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB", cameras: "48MP + 12MP rear · 12MP front", battery: "3349mAh", gsmArenaId: "12559"},
  {key: "iphone-15-plus", name: "iPhone 15 Plus", year: 2023, display: "6.7-inch OLED", chipset: "Apple A16 Bionic", ram: "6GB", storage: "128GB / 256GB / 512GB", cameras: "48MP + 12MP rear · 12MP front", battery: "4383mAh", gsmArenaId: "12558"},
  {key: "iphone-15-pro", name: "iPhone 15 Pro", year: 2023, display: "6.1-inch 120Hz LTPO OLED", chipset: "Apple A17 Pro", ram: "8GB", storage: "128GB / 256GB / 512GB / 1TB", cameras: "48MP + dual 12MP rear · 12MP front", battery: "3274mAh", gsmArenaId: "12557"},
  {key: "iphone-15-pro-max", name: "iPhone 15 Pro Max", year: 2023, display: "6.7-inch 120Hz LTPO OLED", chipset: "Apple A17 Pro", ram: "8GB", storage: "256GB / 512GB / 1TB", cameras: "48MP + dual 12MP rear · 12MP front", battery: "4441mAh", gsmArenaId: "12548"},
  {key: "iphone-16", name: "iPhone 16", year: 2024, display: "6.1-inch OLED", chipset: "Apple A18", ram: "8GB", storage: "128GB / 256GB / 512GB", cameras: "48MP + 12MP rear · 12MP front", battery: "3561mAh", gsmArenaId: "13317"},
  {key: "iphone-16-plus", name: "iPhone 16 Plus", year: 2024, display: "6.7-inch OLED", chipset: "Apple A18", ram: "8GB", storage: "128GB / 256GB / 512GB", cameras: "48MP + 12MP rear · 12MP front", battery: "4674mAh", gsmArenaId: "13318"},
  {key: "iphone-16-pro", name: "iPhone 16 Pro", year: 2024, display: "6.3-inch 120Hz LTPO OLED", chipset: "Apple A18 Pro", ram: "8GB", storage: "128GB / 256GB / 512GB / 1TB", cameras: "48MP + 48MP + 12MP rear · 12MP front", battery: "3582mAh", gsmArenaId: "13319"},
  {key: "iphone-16-pro-max", name: "iPhone 16 Pro Max", year: 2024, display: "6.9-inch 120Hz LTPO OLED", chipset: "Apple A18 Pro", ram: "8GB", storage: "256GB / 512GB / 1TB", cameras: "48MP + 48MP + 12MP rear · 12MP front", battery: "4685mAh", gsmArenaId: "13320"},
  {key: "iphone-16e", name: "iPhone 16e", year: 2025, display: "6.1-inch OLED", chipset: "Apple A18", ram: "8GB", storage: "128GB / 256GB / 512GB", cameras: "48MP rear · 12MP front", battery: "4005mAh", gsmArenaId: "13395"},
];

const iphoneModels: CatalogModelDefinition[] = iphoneSeeds.map((model) => ({
  key: model.key,
  name: model.name,
  category: "iPhone",
  brand: "Apple",
  releaseYear: model.year,
  sourceName: "GSMArena",
  sourceUrl: `https://www.gsmarena.com/${
    ({
      "iphone-se-1": "apple_iphone_se",
      "iphone-se-2": "apple_iphone_se_(2020)",
      "iphone-se-3": "apple_iphone_se_(2022)",
    } as Record<string, string>)[model.key] ?? `apple_${model.key.replaceAll("-", "_")}`
  }-${model.gsmArenaId}.php`,
  specs: [
    {label: "Display", value: model.display},
    {label: "Chipset", value: model.chipset},
    {label: "RAM", value: model.ram},
    {label: "Factory storage options", value: model.storage},
    {label: "Cameras", value: model.cameras},
    {label: "Battery capacity", value: model.battery},
    {label: "Charging port", value: model.year >= 2023 ? "USB-C" : "Lightning"},
  ],
}));

const currentAppleModels: CatalogModelDefinition[] = [
  model("iphone-17", "iPhone 17", "iPhone", "Apple", "https://www.apple.com/iphone-17/", {
    Display: "6.3-inch LTPO Super Retina XDR OLED, 120Hz",
    Chipset: "Apple A19",
    RAM: "8GB",
    Storage: "256GB / 512GB",
    Cameras: "48MP dual Fusion rear · 18MP Center Stage front",
    Charging: "MagSafe, Qi2, and USB-C fast-charge",
  }),
  model("iphone-air", "iPhone Air", "iPhone", "Apple", "https://www.apple.com/iphone-air/", {
    Display: "6.5-inch Super Retina XDR OLED, 120Hz",
    Chipset: "Apple A19 Pro",
    RAM: "12GB",
    Storage: "256GB / 512GB / 1TB",
    Cameras: "48MP Fusion rear · 18MP Center Stage front",
    Charging: "MagSafe, Qi2, and USB-C fast-charge",
  }),
  model("iphone-17-pro", "iPhone 17 Pro", "iPhone", "Apple", "https://www.apple.com/iphone-17-pro/", {
    Display: "6.3-inch LTPO Super Retina XDR OLED, 120Hz",
    Chipset: "Apple A19 Pro",
    RAM: "12GB",
    Storage: "256GB / 512GB / 1TB",
    Cameras: "48MP triple Fusion rear · 18MP Center Stage front",
    Charging: "MagSafe, Qi2, and USB-C fast-charge",
  }),
  model("iphone-17-pro-max", "iPhone 17 Pro Max", "iPhone", "Apple", "https://www.apple.com/iphone-17-pro/", {
    Display: "6.9-inch LTPO Super Retina XDR OLED, 120Hz",
    Chipset: "Apple A19 Pro",
    RAM: "12GB",
    Storage: "256GB / 512GB / 1TB / 2TB",
    Cameras: "48MP triple Fusion rear · 18MP Center Stage front",
    Charging: "MagSafe, Qi2, and USB-C fast-charge",
  }),
  model("macbook-air-m4-13", "MacBook Air M4 13-inch", "Mac", "Apple", "https://support.apple.com/en-us/122209", {
    Chipset: "Apple M4",
    Display: "13.6-inch Liquid Retina",
    Memory: "16GB / 24GB / 32GB unified memory",
    Storage: "256GB / 512GB / 1TB / 2TB SSD",
    Ports: "MagSafe 3 and two Thunderbolt 4 ports",
    Battery: "Up to 18 hours video playback",
  }),
  model("macbook-air-m4-15", "MacBook Air M4 15-inch", "Mac", "Apple", "https://support.apple.com/en-us/122210", {
    Chipset: "Apple M4",
    Display: "15.3-inch Liquid Retina",
    Memory: "16GB / 24GB / 32GB unified memory",
    Storage: "256GB / 512GB / 1TB / 2TB SSD",
    Ports: "MagSafe 3 and two Thunderbolt 4 ports",
    Battery: "Up to 18 hours video playback",
  }),
  model("macbook-pro-m4-14", "MacBook Pro 14-inch M4", "Mac", "Apple", "https://support.apple.com/en-us/121552", {
    Chipset: "Apple M4",
    Display: "14.2-inch Liquid Retina XDR",
    Memory: "16GB / 24GB / 32GB unified memory",
    Storage: "512GB / 1TB / 2TB SSD",
    Ports: "Three Thunderbolt 4 ports, HDMI, SDXC, MagSafe 3",
    Battery: "Up to 24 hours video playback",
  }),
  model(
    "macbook-pro-m4-pro-14",
    "MacBook Pro 14-inch M4 Pro / M4 Max",
    "Mac",
    "Apple",
    "https://support.apple.com/en-us/121553",
    {
      Chipset: "Apple M4 Pro / M4 Max",
      Display: "14.2-inch Liquid Retina XDR",
      Memory: "Up to 128GB unified memory",
      Storage: "Up to 8TB SSD",
      Ports: "Three Thunderbolt 5 ports, HDMI, SDXC, MagSafe 3",
      Battery: "Up to 22 hours video playback",
    },
  ),
  model(
    "macbook-pro-m4-pro-16",
    "MacBook Pro 16-inch M4 Pro / M4 Max",
    "Mac",
    "Apple",
    "https://support.apple.com/en-us/121554",
    {
      Chipset: "Apple M4 Pro / M4 Max",
      Display: "16.2-inch Liquid Retina XDR",
      Memory: "Up to 128GB unified memory",
      Storage: "Up to 8TB SSD",
      Ports: "Three Thunderbolt 5 ports, HDMI, SDXC, MagSafe 3",
      Battery: "Up to 24 hours video playback",
    },
  ),
  model("ipad-pro-m4-13", "iPad Pro M4 13-inch", "iPad", "Apple", "https://support.apple.com/en-us/119891", {
    Chipset: "Apple M4",
    Display: "13-inch Ultra Retina XDR",
    Storage: "256GB / 512GB / 1TB / 2TB",
    Camera: "12MP rear and 12MP front",
    Connectivity: "USB-C and Thunderbolt",
    Input: "Face ID, Apple Pencil Pro, Magic Keyboard",
  }),
  model("ipad-air-m4-11", "iPad Air M4 11-inch", "iPad", "Apple", "https://support.apple.com/en-us/126471", {
    Chipset: "Apple M4",
    Display: "11-inch Liquid Retina",
    Storage: "128GB / 256GB / 512GB / 1TB",
    Connectivity: "USB-C",
    Input: "Touch ID, Apple Pencil, Magic Keyboard",
    Colors: "Blue, Purple, Starlight, Space Gray",
  }),
  model("ipad-air-m4-13", "iPad Air M4 13-inch", "iPad", "Apple", "https://support.apple.com/en-us/126472", {
    Chipset: "Apple M4",
    Display: "13-inch Liquid Retina",
    Storage: "128GB / 256GB / 512GB / 1TB",
    Connectivity: "USB-C",
    Input: "Touch ID, Apple Pencil, Magic Keyboard",
    Colors: "Blue, Purple, Starlight, Space Gray",
  }),
  model("watch-series-10", "Apple Watch Series 10", "Watch", "Apple", "https://support.apple.com/en-us/121202", {
    Chipset: "S10 SiP",
    Sizes: "42mm / 46mm",
    Display: "Always-On Retina LTPO OLED",
    Connectivity: "GPS / GPS + Cellular",
    Storage: "64GB",
    Water: "50m water resistance",
  }),
  model("watch-ultra-2", "Apple Watch Ultra 2", "Watch", "Apple", "https://support.apple.com/en-us/111832", {
    Chipset: "S9 SiP",
    Sizes: "49mm",
    Display: "Always-On Retina LTPO OLED",
    Connectivity: "GPS + Cellular",
    Storage: "64GB",
    Water: "100m water resistance",
  }),
  model("airpods-4", "AirPods 4", "Accessories", "Apple", "https://support.apple.com/en-us/121203", {
    Chipset: "H2 headphone chip",
    Charging: "USB-C charging case",
    Controls: "Press once, twice, or three times",
    Water: "IP54 dust, sweat, and water resistant",
    Battery: "Up to 5 hours listening time",
  }),
  model("airpods-4-anc", "AirPods 4 with Active Noise Cancellation", "Accessories", "Apple", "https://support.apple.com/en-us/121204", {
    Chipset: "H2 headphone chip",
    Charging: "USB-C charging case",
    Controls: "Press once, twice, or three times",
    Water: "IP54 dust, sweat, and water resistant",
    Battery: "Up to 5 hours listening time",
  }),
  model("airpods-pro-3", "AirPods Pro 3", "Accessories", "Apple", "https://support.apple.com/en-us/125135", {
    Chipset: "H2 headphone chip",
    Charging: "USB-C MagSafe case",
    Audio: "Active Noise Cancellation and Live Translation",
    Water: "Dust, sweat, and water resistant",
    Battery: "Up to 6 hours listening time",
  }),
  model("airpods-max-2", "AirPods Max 2", "Accessories", "Apple", "https://support.apple.com/en-us/126620", {
    Chipset: "H2 headphone chip",
    Charging: "USB-C",
    Audio: "Active Noise Cancellation",
    Design: "Over-ear",
    Battery: "Wireless listening and spatial audio",
  }),
];

function model(
  key: string,
  name: string,
  category: string,
  brand: string,
  sourceUrl: string,
  specs: Record<string, string>,
): CatalogModelDefinition {
  return {
    key,
    name,
    category,
    brand,
    sourceName: brand === "Sony" ? "PlayStation" : brand,
    sourceUrl,
    specs: Object.entries(specs).map(([label, value]) => ({label, value})),
  };
}

const otherModels: CatalogModelDefinition[] = [
  model("macbook-pro-13-2017", "MacBook Pro 13-inch (2017)", "Mac", "Apple", "https://support.apple.com/en-us/111951", {Processor: "Intel Core i5 / i7", RAM: "8GB / 16GB", Storage: "128GB / 256GB / 512GB / 1TB SSD", Display: "13.3-inch Retina", Ports: "Two Thunderbolt 3 ports"}),
  model("macbook-pro-15-2017", "MacBook Pro 15-inch (2017)", "Mac", "Apple", "https://support.apple.com/en-us/111947", {Processor: "Intel Core i7", RAM: "16GB", Storage: "256GB / 512GB / 1TB / 2TB SSD", Display: "15.4-inch Retina", Ports: "Four Thunderbolt 3 ports"}),
  model("macbook-air-m1-13", "MacBook Air M1 13-inch", "Mac", "Apple", "https://support.apple.com/en-us/111883", {Chipset: "Apple M1", RAM: "8GB / 16GB", Storage: "256GB / 512GB / 1TB / 2TB SSD", Display: "13.3-inch Retina", Ports: "Two Thunderbolt / USB 4 ports"}),
  model("macbook-air-m2-13", "MacBook Air M2 13-inch", "Mac", "Apple", "https://support.apple.com/en-us/111867", {Chipset: "Apple M2", RAM: "8GB / 16GB / 24GB", Storage: "256GB / 512GB / 1TB / 2TB SSD", Display: "13.6-inch Liquid Retina", Charging: "MagSafe 3"}),
  model("macbook-air-m3-13", "MacBook Air M3 13-inch", "Mac", "Apple", "https://support.apple.com/en-us/118551", {Chipset: "Apple M3", RAM: "8GB / 16GB / 24GB", Storage: "256GB / 512GB / 1TB / 2TB SSD", Display: "13.6-inch Liquid Retina", Charging: "MagSafe 3"}),
  model("macbook-pro-m1-pro-14", "MacBook Pro 14-inch M1 Pro", "Mac", "Apple", "https://support.apple.com/en-us/111902", {Chipset: "Apple M1 Pro", RAM: "16GB / 32GB", Storage: "512GB to 8TB SSD", Display: "14.2-inch Liquid Retina XDR", Ports: "Thunderbolt 4, HDMI, SDXC"}),
  model("macbook-pro-m2-pro-14", "MacBook Pro 14-inch M2 Pro", "Mac", "Apple", "https://support.apple.com/en-us/111340", {Chipset: "Apple M2 Pro", RAM: "16GB / 32GB", Storage: "512GB to 8TB SSD", Display: "14.2-inch Liquid Retina XDR", Ports: "Thunderbolt 4, HDMI, SDXC"}),
  model("macbook-pro-m3-pro-14", "MacBook Pro 14-inch M3 Pro", "Mac", "Apple", "https://support.apple.com/en-us/117735", {Chipset: "Apple M3 Pro", RAM: "18GB / 36GB", Storage: "512GB to 4TB SSD", Display: "14.2-inch Liquid Retina XDR", Ports: "Thunderbolt 4, HDMI, SDXC"}),
  model("ipad-pro-m4-11", "iPad Pro M4 11-inch", "iPad", "Apple", "https://support.apple.com/en-us/119892", {Chipset: "Apple M4", Storage: "256GB / 512GB / 1TB / 2TB", Display: "11-inch Ultra Retina XDR", Cameras: "12MP rear · 12MP front", Port: "USB-C / Thunderbolt"}),
  model("apple-watch-series-9", "Apple Watch Series 9", "Watch", "Apple", "https://support.apple.com/en-us/111833", {Chipset: "S9 SiP", Sizes: "41mm / 45mm", Display: "Always-On Retina", Connectivity: "GPS / GPS + Cellular", Water: "50m water resistance"}),
  model("airpods-1", "AirPods (1st generation)", "Accessories", "Apple", "https://support.apple.com/en-us/112041", {Chipset: "Apple W1", Charging: "Lightning case", Controls: "Double-tap", Listening: "Up to 5 hours"}),
  model("airpods-2", "AirPods (2nd generation)", "Accessories", "Apple", "https://support.apple.com/en-us/111856", {Chipset: "Apple H1", Charging: "Lightning / wireless case", Controls: "Hey Siri", Listening: "Up to 5 hours"}),
  model("airpods-3", "AirPods (3rd generation)", "Accessories", "Apple", "https://support.apple.com/en-us/111863", {Chipset: "Apple H1", Charging: "Lightning / MagSafe case", Audio: "Spatial Audio", Listening: "Up to 6 hours"}),
  model("airpods-pro-1", "AirPods Pro (1st generation)", "Accessories", "Apple", "https://support.apple.com/en-us/111859", {Chipset: "Apple H1", Charging: "Lightning / MagSafe case", Audio: "Active Noise Cancellation", Tips: "Silicone ear tips"}),
  model("airpods-pro-2-usb-c", "AirPods Pro (2nd generation, USB-C)", "Accessories", "Apple", "https://support.apple.com/en-us/111851", {Chipset: "Apple H2", Charging: "USB-C / MagSafe case", Audio: "Active Noise Cancellation and Transparency", Listening: "Up to 6 hours"}),
  model("airpods-max", "AirPods Max", "Accessories", "Apple", "https://support.apple.com/en-us/111858", {Chipset: "Apple H1", Charging: "USB-C / Lightning by version", Audio: "Active Noise Cancellation", Design: "Over-ear"}),
  model("ps4-slim", "PlayStation 4 Slim", "PlayStation", "Sony", "https://www.playstation.com/en-us/ps4/tech-specs/", {Edition: "Disc", Storage: "500GB / 1TB", Controller: "DualShock 4", Output: "HDR gaming"}),
  model("ps4-pro", "PlayStation 4 Pro", "PlayStation", "Sony", "https://www.playstation.com/en-us/ps4/tech-specs/", {Edition: "Disc", Storage: "1TB", Controller: "DualShock 4", Output: "4K gaming support"}),
  model("ps5-disc", "PlayStation 5 Disc Edition", "PlayStation", "Sony", "https://www.playstation.com/en-us/ps5/tech-specs/", {Edition: "Ultra HD Blu-ray disc", Storage: "825GB SSD", Controller: "DualSense", Output: "Up to 4K 120Hz"}),
  model("ps5-digital", "PlayStation 5 Digital Edition", "PlayStation", "Sony", "https://www.playstation.com/en-us/ps5/tech-specs/", {Edition: "Digital", Storage: "825GB SSD", Controller: "DualSense", Output: "Up to 4K 120Hz"}),
  model("ps5-slim-disc-bundle", "PlayStation 5 Slim Disc Edition", "PlayStation", "Sony", "https://www.playstation.com/en-us/ps5/tech-specs/", {Edition: "Ultra HD Blu-ray disc", Storage: "1TB SSD", Controller: "DualSense", Output: "Up to 4K 120Hz"}),
  model("ps5-slim-digital", "PlayStation 5 Slim Digital Edition", "PlayStation", "Sony", "https://www.playstation.com/en-us/ps5/tech-specs/", {Edition: "Digital", Storage: "1TB SSD", Controller: "DualSense", Output: "Up to 4K 120Hz"}),
  model("lightning-to-usb-a-1m", "Lightning to USB-A Cable (1m)", "Cables", "Apple", "https://www.apple.com/shop/product/MXLY2AM/A/usb-a-to-lightning-cable-1-m", {Connector: "USB-A to Lightning", Length: "1 metre", Use: "Charging and data", Compatibility: "Lightning devices"}),
  model("usb-c-to-lightning-1m", "USB-C to Lightning Cable (1m)", "Cables", "Apple", "https://www.apple.com/shop/product/MUQ93AM/A/usb-c-to-lightning-cable-1-m", {Connector: "USB-C to Lightning", Length: "1 metre", Use: "Fast charging and data", Compatibility: "Lightning devices"}),
  model("usb-c-charge-cable-1m", "USB-C Charge Cable (1m)", "Cables", "Apple", "https://www.apple.com/shop/product/MQKJ3AM/A/60w-usb-c-charge-cable-1-m", {Connector: "USB-C to USB-C", Length: "1 metre", Power: "Up to 60W", Use: "Charging and data"}),
  model("usb-c-charge-cable-2m", "USB-C Charge Cable (2m)", "Cables", "Apple", "https://www.apple.com/shop/product/MLL82AM/A/usb-c-charge-cable-2-m", {Connector: "USB-C to USB-C", Length: "2 metres", Use: "Charging and data", Compatibility: "USB-C devices"}),
  model("thunderbolt-4-pro-1m", "Thunderbolt 4 Pro Cable (1m)", "Cables", "Apple", "https://www.apple.com/shop/product/MW5J3AM/A/thunderbolt-4-usb%E2%80%91c-pro-cable-1-m", {Connector: "USB-C / Thunderbolt 4", Length: "1 metre", Data: "Up to 40Gb/s", Power: "Up to 100W"}),
];

export const catalogModels: CatalogModelDefinition[] = [...iphoneModels, ...currentAppleModels, ...otherModels];

export const productModelKeyBySlug: Record<string, string> = {
  "iphone-15-pro-max-256": "iphone-15-pro-max",
  "iphone-14-pro-128": "iphone-14-pro",
  "macbook-air-m3-13": "macbook-air-m3-13",
  "macbook-pro-m3-pro-14": "macbook-pro-m3-pro-14",
  "ipad-pro-m4-11": "ipad-pro-m4-11",
  "apple-watch-series-9": "apple-watch-series-9",
  "airpods-pro-2-usb-c": "airpods-pro-2-usb-c",
  "ps5-slim-disc-bundle": "ps5-slim-disc-bundle",
};

export const productUnitDetailsBySlug: Record<string, Record<string, unknown>> = {
  "iphone-15-pro-max-256": {
    storage: "256GB",
    ptaStatus: "Unknown",
    includedItems: ["iPhone unit", "Box if included", "USB-C cable if included"],
  },
  "iphone-14-pro-128": {
    storage: "128GB",
    ptaStatus: "Non-PTA",
    includedItems: ["iPhone unit", "Cable if included", "Box if included"],
  },
  "macbook-air-m3-13": {
    ram: "8GB / 16GB options",
    storage: "256GB / 512GB options",
    chargerIncluded: true,
  },
  "macbook-pro-m3-pro-14": {
    ram: "18GB options",
    storage: "512GB options",
    chargerIncluded: true,
  },
  "ipad-pro-m4-11": {
    storage: "256GB options",
    connectivity: "Confirm Wi-Fi or cellular per unit",
  },
  "apple-watch-series-9": {
    size: "41mm / 45mm options",
    connectivity: "GPS",
  },
  "airpods-pro-2-usb-c": {
    connector: "USB-C charging case",
    includedItems: ["AirPods Pro earbuds", "USB-C charging case", "Ear tips and cable as boxed"],
  },
  "ps5-slim-disc-bundle": {
    storage: "1TB SSD",
    edition: "Disc Edition",
    controllerIncluded: true,
  },
};
