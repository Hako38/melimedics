import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { StructuredData, medicalClinicSchema } from "./_components/StructuredData";
import { isIndexableEnvironment, siteUrl } from "./_lib/site-config";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Melimedics | Ärztliche Ästhetik, Haut & Haare in Mainz", template: "%s | Melimedics Mainz" },
  description: "Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – mit persönlicher Beratung und Nachsorge in Mainz.",
  metadataBase: siteUrl,
  applicationName: "Melimedics",
  authors: [{ name: "Melimedics" }],
  creator: "Melimedics",
  publisher: "Melimedics",
  robots: { index: isIndexableEnvironment, follow: isIndexableEnvironment, googleBot: { index: isIndexableEnvironment, follow: isIndexableEnvironment } },
  openGraph: {
    title: "Melimedics | Ärztliche Ästhetik, Haut & Haare in Mainz",
    description: "Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – persönlich in Mainz.",
    type: "website",
    locale: "de_DE",
    siteName: "Melimedics",
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Melimedics – Ärztliche Ästhetik, Haut & Haare in Mainz" }],
  },
  twitter: { card: "summary_large_image", title: "Melimedics | Ärztliche Ästhetik, Haut & Haare in Mainz", description: "Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – persönlich in Mainz.", images: ["/og.jpg"] },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" data-scroll-behavior="smooth"><body className={`${display.variable} ${sans.className}`}><a className="skip-link" href="#main-content">Zum Hauptinhalt springen</a><StructuredData id="medical-clinic-schema" data={medicalClinicSchema}/>{children}</body></html>;
}
