import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableEnvironment } from "./_lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexableEnvironment ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
