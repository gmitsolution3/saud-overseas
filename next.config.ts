import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "better-auth",
      "@better-auth/kysely-adapter",
    ],
  },
};

export default nextConfig;
