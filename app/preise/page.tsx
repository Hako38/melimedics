import type { Metadata } from "next";
import { Breadcrumbs, CTA, InteriorHero, PageShell, PriceRow, SectionHeader } from "../_components/SiteShell";
export const metadata: Metadata = { title: "Preise", description: "Preisübersicht der Behandlungen bei Melimedics in Mainz." };
export default function PricesPage(){return <PageShell><Breadcrumbs items={[{label:"Preise"}]}/><InteriorHero eyebrow="Preise" title={<>Transparent beraten.<br/><em>Individuell planen.</em></>} intro="Der genaue Preis hängt von Indikation, Behandlungsumfang und dem gemeinsam festgelegten Plan ab. Verbindliche Angaben erhalten Sie vor der Behandlung."/>
  <section className="content-section price-section"><SectionHeader eyebrow="Preisübersicht" title="Medizinisch geprüft vor Veröffentlichung." intro="In Phase 1A werden keine Preise aus nicht freigegebenen Quellen übernommen. Die Werte werden nach fachlicher und kaufmännischer Freigabe ergänzt."/><div className="price-groups">
    <div><h3>Ästhetische Medizin</h3><PriceRow name="Botulinumtoxin"/><PriceRow name="Hyaluronsäure"/><PriceRow name="Biostimulatoren"/><PriceRow name="Polynukleotide"/></div>
    <div><h3>Haut & Laser</h3><PriceRow name="CO₂-Laser"/><PriceRow name="Tattoo-Laser"/><PriceRow name="HIFU"/></div>
    <div><h3>Haare & PRP</h3><PriceRow name="PRP Haare"/><PriceRow name="Haartransplantation" note="Umfang nach persönlicher Planung"/></div>
    <div><h3>Gesundheit & Kosmetik</h3><PriceRow name="Gewichtsmanagement"/><PriceRow name="Blutuntersuchungen & Diagnostik"/><PriceRow name="Microneedling"/><PriceRow name="Aquafacial"/></div>
  </div></section><CTA title="Ihr persönlicher Behandlungsplan beginnt mit einem Gespräch."/></PageShell>}
