import type { NextConfig } from "next";

const apiServerBaseUrl = (
  process.env.API_SERVER_BASE_URL || "http://127.0.0.1:8000/api/v1"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiServerBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
