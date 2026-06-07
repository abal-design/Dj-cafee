import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.10.101", "*.loca.lt", "*.localtunnel.me"],
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
