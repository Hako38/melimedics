import Link from "next/link";
import { Arrow, Breadcrumbs, CTA, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { mediaSlots } from "../_data/media";
import { priceCategories, priceSourceUrl, treatmentBySlug } from "../_data/treatments";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata(
  "Preise",
  "Aktuelle Preisübersicht der bei Melimedics in Mainz über Planity buchbaren Behandlungen.",
  "/preise/",
);

export default function PricesPage() {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Preise" }]}/>
    <InteriorHero
      eyebrow="Preise"
      title={<>Transparent vergleichen.<br/><em>Persönlich planen.</em></>}
      intro="Hier finden Sie die aktuell über Planity veröffentlichten Preise. Der konkrete Behandlungsumfang wird vor dem Termin individuell besprochen."
      media={mediaSlots.facialConsultation}
      mediaLabel="Persönliche Planung bei Melimedics"
    />
    <section className="content-section price-section">
      <SectionHeader
        eyebrow="Aktuelle Preisliste"
        title="Klar gegliedert nach Behandlung."
        intro="Alle Werte wurden am 1. September 2026 mit dem öffentlichen Melimedics-Profil bei Planity abgeglichen. „Ab“-Preise können je nach Umfang variieren."
      />
      <div className="price-category-grid">
        {priceCategories.map((category, index) => <section key={category.title}>
          <div><span>{String(index + 1).padStart(2, "0")}</span><h2>{category.title}</h2></div>
          {category.items.map((item) => {
            const treatment = item.treatmentSlug ? treatmentBySlug[item.treatmentSlug] : undefined;
            return <div className="price-row" key={item.id}>
              <div>
                <strong>{treatment ? <Link href={treatment.href}>{item.label}</Link> : item.label}</strong>
                <small>{item.duration}</small>
              </div>
              <span>{item.price}</span>
            </div>;
          })}
        </section>)}
      </div>
      <div className="price-source">
        <span><Arrow/></span>
        <div><strong>Quelle und Online-Buchung</strong><p>Aktuelle Verfügbarkeit und Preise werden im Melimedics-Profil bei Planity geführt.</p></div>
        <a href={priceSourceUrl} target="_blank" rel="noopener noreferrer">Zu Planity</a>
      </div>
      <div className="price-notice">
        <p className="eyebrow">Gut zu wissen</p>
        <h2>Verbindlichkeit entsteht vor der Behandlung.</h2>
        <p>Der endgültige Preis kann von Indikation, Material und Behandlungsumfang abhängen. Sie erhalten vor der Durchführung eine nachvollziehbare Auskunft.</p>
        <Link className="text-link" href="/termin/">Beratung vereinbaren <Arrow/></Link>
      </div>
    </section>
    <CTA title="Ihr persönlicher Behandlungsplan beginnt mit einem Gespräch."/>
  </PageShell>;
}
