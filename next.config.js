/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bo-prod.asso-ltdc.org",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
