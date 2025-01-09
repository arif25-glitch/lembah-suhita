import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
