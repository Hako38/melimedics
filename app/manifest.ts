import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Melimedics – Ärztliche Ästhetik, Haut & Haare",
    short_name: "Melimedics",
    description: "Ärztliche Ästhetik, Haut- und Haarmedizin in Mainz.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#f4f1ea",
    lang: "de",
    icons: [{ src: "/favicon.png", sizes: "128x128", type: "image/png" }],
  };
}
