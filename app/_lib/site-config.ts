const defaultSiteUrl = "https://melimedics.de";

export type SiteEnvironment = "development" | "staging" | "production";

function getSiteEnvironment(): SiteEnvironment {
  const value = process.env.SITE_ENV;
  if (value === "production" || value === "staging") return value;
  return "development";
}

function getSiteUrl(): URL {
  try {
    return new URL(process.env.SITE_URL ?? defaultSiteUrl);
  } catch {
    return new URL(defaultSiteUrl);
  }
}

export const siteEnvironment = getSiteEnvironment();
export const siteUrl = getSiteUrl();
export const isIndexableEnvironment = siteEnvironment === "production";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
