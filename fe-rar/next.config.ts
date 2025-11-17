import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Your existing webpack config.
   * This is used for production builds ('next build').
   */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  /**
   * Add this new 'turbopack' config.
   * This is used by the dev server ('next dev').
   */
  turbopack: {
    rules: {
      // Tell Turbopack to use @svgr/webpack for .svg files
      "*.svg": {
        loaders: ["@svgr/webpack"],
        // This is important: it tells Turbopack to treat the
        // output of this loader as a JavaScript module.
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
