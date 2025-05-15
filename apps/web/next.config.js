const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lorioanjlqcungjqjqqa.supabase.co"],
  },
  transpilePackages: ["notes", "twitter"],

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;
