/** @type {import('next').NextConfig} */
const path = require("path");

// Le BO courant (NEXT_PUBLIC_BO_URL, figé au build) est toujours autorisé pour next/image.
const boUrl = process.env.NEXT_PUBLIC_BO_URL
  ? new URL(process.env.NEXT_PUBLIC_BO_URL)
  : undefined;

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
        hostname: "bo-stage.asso-ltdc.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bo-prod.asso-ltdc.org",
        port: "",
      },
      ...(boUrl
        ? [
            {
              protocol: boUrl.protocol.replace(":", ""),
              hostname: boUrl.hostname,
              port: boUrl.port,
            },
          ]
        : []),
    ],
  },
  redirects: async () => [
    // La page « Notre histoire » était exposée sous /esf-program et figurait
    // dans le sitemap : on preserve les liens existants et le referencement.
    {
      source: "/esf-program",
      destination: "/our-story",
      permanent: true,
    },
  ],
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
