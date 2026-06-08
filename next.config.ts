import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  // @ts-ignore
  reactCompiler: {
    target: "18",
    runtimeModule: "react-compiler-runtime",
  },
};

export default nextConfig;
