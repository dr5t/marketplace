import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/drei", "@react-three/fiber"],
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
