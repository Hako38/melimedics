import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = path.endsWith("/") ? path : `${path}/`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, images: [] },
    twitter: { title, description, images: [] },
  };
}
