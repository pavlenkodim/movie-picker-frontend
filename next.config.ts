import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.*.*"],
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
};

export default nextConfig;
