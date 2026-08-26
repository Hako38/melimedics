import type { Metadata } from "next";
import { absoluteUrl } from "./site-config";

export function pageMetadata(title: string, description: string, path: string, options: { shareImage?: boolean } = {}): Metadata {
  const canonical = path.endsWith("/") ? path : `${path}/`;
  const shareImage = options.shareImage !== false ? [{ url: "/og.jpg", width: 1200, height: 630, alt: "Melimedics – Ärztliche Ästhetik, Haut & Haare in Mainz" }] : [];
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: absoluteUrl(canonical), siteName: "Melimedics", type: "website", locale: "de_DE", images: shareImage },
    twitter: { card: "summary_large_image", title, description, images: shareImage.map(({ url }) => url) },
  };
}
