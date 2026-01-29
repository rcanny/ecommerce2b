import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Cria a pasta "out" com o site estático

  reactStrictMode: true,
  images: {
    unoptimized: true, // Necessário para imagens funcionarem na HostGator
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console.log em produção
  },
};

export default nextConfig;