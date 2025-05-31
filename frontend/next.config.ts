import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable SSR for client components to avoid hydration issues
  experimental: {
    // This ensures more consistent behavior between server and client
    optimizeCss: true,
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',
};

export default nextConfig;
