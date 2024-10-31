import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_API_URL;

  return [
    {
      url: `${domain}`,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      url: `${domain}about`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}activities`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}actualities`,
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: `${domain}contact/as-beneficiary`,
      changefreq: "yearly",
      priority: 0.7,
    },
    {
      url: `${domain}contact/as-sponsor`,
      changefreq: "yearly",
      priority: 0.7,
    },
    {
      url: `${domain}contact/as-volunteer`,
      changefreq: "yearly",
      priority: 0.7,
    },
    {
      url: `${domain}contact/general`,
      changefreq: "yearly",
      priority: 0.7,
    },
    {
      url: `${domain}esf-program`,
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}events`,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}projects`,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}terms-of-use`,
      changefreq: "yearly",
      priority: 0.5,
    },
  ];
}
