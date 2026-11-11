import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img02.restaurantguru.com",
      },
      {
        protocol: "https",
        hostname: "img3.restaurantguru.com",
      },
    ],
  },
};

export default nextConfig;
