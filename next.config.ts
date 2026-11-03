import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.*.*"],
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**"), new URL("https://flagcdn.com/**")],
  },
};

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");
export default withNextIntl(nextConfig);
