import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname : "9ilv68byiw.ufs.sh"
      },
      { // Nueva entrada para Clerk
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  devIndicators: false,
};

export default nextConfig;
