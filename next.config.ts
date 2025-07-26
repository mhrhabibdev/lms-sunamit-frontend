import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows ALL domains (not recommended for production)
      },
    ],
  },
};

export default nextConfig;