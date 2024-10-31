import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_API_URL;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${domain}sitemap.xml`,
  };
}
