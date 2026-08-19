/** @type {import('next').NextConfig} */

const internalBackendUrl =
  process.env.BACKEND_INTERNAL_URL || "http://localhost:8080/api";

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${internalBackendUrl}/:path*`
      }
    ];
  }
};

export default nextConfig;
