import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
  },
  async rewrites() {
    return [
      // Support singular vs plural invite links from backend
      { source: "/invites", destination: "/invite" },
      { source: "/invites/:id", destination: "/invite?id=:id" },
    ];
  },
};

export default nextConfig;
