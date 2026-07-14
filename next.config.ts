import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
  async redirects() {
    return [
      { source: "/why-buy-from-us", destination: "/why-us", permanent: true },
      {
        source: "/products/category/ps5",
        destination: "/products/category/playstation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
