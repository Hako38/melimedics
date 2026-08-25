import type { Metadata } from "next";
import { Breadcrumbs, CategoryCard, CTA, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";

export const metadata: Metadata = { title: "Behandlungen", description: "Ärztliche Behandlungen für Ästhetik, Haut, Haare und ausgewählte gesundheitliche Anliegen bei Melimedics in Mainz." };

export default function TreatmentsPage() {
  return <PageShell><Breadcrumbs items={[{label:"Behandlungen"}]}/><InteriorHero eyebrow="Alle Behandlungen" title={<>Medizinisch gedacht.<br/><em>Persönlich geplant.</em></>} intro="Drei medizinische Kernbereiche, ergänzt um ausgewählte Gesundheits- und Kosmetikangebote. Welche Behandlung geeignet ist, klären wir immer individuell."/>
    <section className="content-section"><SectionHeader eyebrow="Unsere Schwerpunkte" title="Ästhetik, Haut und Haare aus einer Hand."/><div className="focus-grid"><CategoryCard number="01" title={<>Ästhetische<br/>Medizin</>} copy="Gesichtsbehandlungen mit Blick für Proportionen und Natürlichkeit." href="/behandlungen/gesicht/" tone="focus-card-dark"/><CategoryCard number="02" title={<>Haut &amp;<br/>Laser</>} copy="Individuelle Konzepte für Hautbild, Struktur und ausgewählte Indikationen." href="/behandlungen/haut-laser/"/><CategoryCard number="03" title={<>Haare &amp;<br/>Haarwurzel</>} copy="Diagnostik, PRP und Perspektiven bis zur Haartransplantation." href="/haare/" tone="focus-card-accent"/></div></section>
    <section className="secondary-grid"><CategoryCard number="04" title="PRP" copy="Aufbereitung aus Eigenblut für ausgewählte Haut- und Haaranliegen." href="/behandlungen/prp/"/><CategoryCard number="05" title="Gesundheit" copy="Gewichtsmanagement sowie Blutuntersuchungen und Diagnostik." href="/gesundheit/"/><CategoryCard number="06" title="Kosmetik" copy="Microneedling und Aquafacial als ergänzende Behandlungen." href="/kosmetik/"/></section><CTA/></PageShell>;
}
