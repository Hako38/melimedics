import Link from "next/link";
import { Arrow, Breadcrumbs, CTA, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { treatmentBySlug } from "../_data/treatments";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata("Behandlungen", "Ästhetische Medizin, Haut, Laser, PRP, Haarmedizin, Gesundheit und Kosmetik bei Melimedics in Mainz.", "/behandlungen/");

const groups = [
  { number: "01", title: "Ästhetische Medizin", copy: "Ärztlich geplante Behandlungen mit Blick auf Mimik, Proportionen und das persönliche Gesamtbild.", href: "/behandlungen/gesicht/", slugs: ["botulinumtoxin", "hyaluronsaeure", "biostimulatoren", "polynukleotide"] },
  { number: "02", title: "Haut & Laser", copy: "Individuelle Konzepte auf Grundlage von Hautzustand, Anliegen und ärztlicher Einschätzung.", href: "/behandlungen/haut-laser/", slugs: ["co2-laser", "tattoo-laser", "hifu"] },
  { number: "03", title: "PRP", copy: "Aufbereitung aus Eigenblut für ausgewählte ästhetische und haarmedizinische Anliegen.", href: "/behandlungen/prp/", slugs: ["prp-behandlung", "prp-haare"] },
  { number: "04", title: "Haare", copy: "Haarausfall verstehen, mögliche Wege einordnen und langfristig persönlich begleiten.", href: "/haare/", slugs: ["haarausfall", "prp-haare", "haartransplantation"] },
  { number: "05", title: "Gesundheit", copy: "Ärztlich ausgerichtetes Gewichtsmanagement sowie Blutuntersuchungen und Diagnostik.", href: "/gesundheit/", labels: ["Gewichtsmanagement / Abnehmen", "Blutuntersuchungen & Diagnostik"] },
  { number: "06", title: "Kosmetik", copy: "Gezielte kosmetische Ergänzungen innerhalb derselben ruhigen Premium-Marke.", href: "/kosmetik/", slugs: ["microneedling", "aquafacial"] },
];

export default function TreatmentsPage() {
  return <PageShell><Breadcrumbs items={[{label:"Behandlungen"}]}/><InteriorHero eyebrow="Alle Leistungen" title={<>Medizinisch gedacht.<br/><em>Persönlich geplant.</em></>} intro="Entdecken Sie das vollständige Behandlungsspektrum von Melimedics in Mainz – klar nach medizinischen Schwerpunkten geordnet und immer mit persönlicher Beratung als Ausgangspunkt."><div className="hero-actions"><Link className="button button-dark" href="/termin/">Beratung vereinbaren <Arrow/></Link><Link className="button button-secondary" href="/behandlungsfinder/">Behandlung finden <Arrow direction="right"/></Link></div></InteriorHero>
    <section className="content-section service-overview"><SectionHeader eyebrow="Behandlungsspektrum" title="Sechs Bereiche. Ein persönlicher Blick auf Ihr Anliegen." intro="Die Übersichten dienen der Orientierung. Ob eine konkrete Behandlung geeignet ist, wird individuell ärztlich eingeordnet."/><div className="service-directory">{groups.map((group) => <article key={group.title} className={group.title === "Haare" ? "is-priority" : ""}><div className="service-directory-head"><span>{group.number}</span><div><h2>{group.title}</h2><p>{group.copy}</p></div><Link href={group.href} aria-label={`${group.title} öffnen`}><Arrow/></Link></div><div className="service-links">{group.slugs?.map((slug) => <Link key={slug} href={treatmentBySlug[slug].href}>{treatmentBySlug[slug].title}<Arrow direction="right"/></Link>)}{group.labels?.map((label) => <Link key={label} href={group.href}>{label}<Arrow direction="right"/></Link>)}</div></article>)}</div></section><CTA/></PageShell>;
}
