import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Melimedics | Ärztliche Ästhetik, Haut & Haare in Mainz", template: "%s | Melimedics Mainz" },
  description: "Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – mit persönlicher Beratung und Nachsorge in Mainz.",
  metadataBase: new URL("https://melimedics.de"),
  openGraph: {
    title: "Melimedics | Ärztliche Ästhetik, Haut & Haare in Mainz",
    description: "Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – persönlich in Mainz.",
    type: "website",
    locale: "de_DE",
    images: [{ url: "/og.png", width: 1732, height: 908, alt: "Melimedics – Ärztliche Ästhetik, Haut & Haare in Mainz" }],
  },
  twitter: { card: "summary_large_image", title: "Melimedics | Ärztliche Ästhetik, Haut & Haare in Mainz", description: "Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – persönlich in Mainz.", images: ["/og.png"] },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body className={`${display.variable} ${sans.className}`}>{children}</body></html>;
}
