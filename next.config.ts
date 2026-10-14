import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  // The public site talks to the backend through the same-origin `/api/*` proxy
  // (like Bonde-Admin), so the browser never needs a CORS allowance.
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${API_URL}/api/:path*`,
    },
  ],
};

export default nextConfig;
