import type { Metadata } from "next";
import { Breadcrumbs, InteriorHero, PageShell } from "../_components/SiteShell";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterangaben von Melimedics in Mainz.",
  alternates: { canonical: "/impressum/" },
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Impressum" }]}/>
    <InteriorHero eyebrow="Rechtliches" title="Impressum" intro="Anbieterangaben und Kontaktinformationen von Melimedics."/>
    <article className="legal-copy">
      <p className="legal-updated">Angaben gemäß § 5 DDG</p>

      <h2>Diensteanbieter</h2>
      <p>Melih Tayyip Kandemir<br/>Melimedics<br/>Elbestraße 90<br/>55122 Mainz<br/>Deutschland</p>

      <h2>Kontakt</h2>
      <p>Telefon: <a href="tel:+4915758272466">01575 8272466</a><br/>E-Mail: <a href="mailto:info@melimedics.de">info@melimedics.de</a></p>

      <h2>Angaben zum Unternehmen</h2>
      <p>Steuernummer: 08/080/54029</p>

      <h2>Berufsbezeichnung</h2>
      <p>Gesetzliche Berufsbezeichnung: Arzt<br/>Staat, in dem die Berufsbezeichnung verliehen wurde: Deutschland</p>

      <h2>Social Media und weitere Onlinepräsenzen</h2>
      <p>Dieses Impressum gilt auch für das Melimedics-Profil bei Instagram: <a href="https://www.instagram.com/melimedics" target="_blank" rel="noopener noreferrer">instagram.com/melimedics</a></p>
    </article>
  </PageShell>;
}
