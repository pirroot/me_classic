import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: SITE_URL + r.path,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
