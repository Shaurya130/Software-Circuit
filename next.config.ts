import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Ignore ESLint errors during production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Ignore TypeScript errors during production build
    ignoreBuildErrors: true,
  },
  experimental: {
    // ✅ Optional: helps with Appwrite Node SDK (runs in Node, not Edge)
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  images: {
    // ✅ Allow images from external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.appwrite.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
