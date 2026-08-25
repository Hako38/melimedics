import Link from "next/link";
import { Arrow, Breadcrumbs, CTA, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { treatmentBySlug } from "../_data/treatments";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata("Haarmedizin", "Haarausfall verstehen, PRP Haare und eine mögliche Haartransplantation persönlich bei Melimedics in Mainz besprechen.", "/haare/");

const paths = [
  { number: "01", slug: "haarausfall", label: "Haarausfall verstehen", route: "Beratung / Diagnostik" },
  { number: "02", slug: "prp-haare", label: "Haare stärken", route: "PRP" },
  { number: "03", slug: "haartransplantation", label: "Haartransplantation", route: "Operative Option nach ärztlicher Beratung" },
];

export default function HairPage(){return <PageShell><Breadcrumbs items={[{label:"Haarmedizin"}]}/><div className="hair-page-hero"><InteriorHero eyebrow="Haarmedizin bei Melimedics" title={<>Haarausfall verstehen.<br/><em>Gezielt handeln.</em></>} intro="Haarmedizin braucht Ursachenklärung, einen realistischen Blick auf Möglichkeiten und einen persönlichen Plan – von der Beratung bis zu einer möglichen operativen Option."><Link className="button button-light" href="/termin/">Haarberatung vereinbaren <Arrow/></Link></InteriorHero></div>
  <section className="content-section hair-paths"><SectionHeader eyebrow="Drei Wege" title="Der nächste Schritt richtet sich nach Ihrer Ausgangssituation." intro="Kein automatischer Haar-Check ersetzt die ärztliche Einordnung. Wir beginnen bewusst mit einem persönlichen Gespräch."/><div className="hair-path-grid">{paths.map((path) => {const item=treatmentBySlug[path.slug]; return <Link key={path.slug} href={item.href}><span>{path.number}</span><small>{path.route}</small><h2>{path.label}</h2><p>{item.shortDescription}</p><strong>Bereich ansehen <Arrow/></strong></Link>})}</div></section>
  <section className="hair-statement"><div><p className="eyebrow">Unser Ansatz</p><h2>Diagnostik vor Methode.<br/><em>Planung vor Versprechen.</em></h2></div><p>Wir betrachten Haarausfall nicht als isolierte kosmetische Frage. Erst wenn Ausgangssituation und Erwartungen eingeordnet sind, lässt sich ein sinnvoller Weg besprechen.</p></section>
  <section className="content-section hair-journey-section"><SectionHeader eyebrow="Orientierung" title="Von der ersten Frage bis zur langfristigen Perspektive."/><ol className="process-timeline"><li><div className="timeline-marker"><span>01</span><i/></div><div><h3>Verstehen</h3><p>Anliegen und Verlauf werden persönlich besprochen.</p></div></li><li><div className="timeline-marker"><span>02</span><i/></div><div><h3>Einordnen</h3><p>Mögliche diagnostische und therapeutische Wege werden ärztlich bewertet.</p></div></li><li><div className="timeline-marker"><span>03</span><i/></div><div><h3>Planen</h3><p>PRP oder eine operative Perspektive werden nur bei Eignung weiterverfolgt.</p></div></li><li><div className="timeline-marker"><span>04</span></div><div><h3>Begleiten</h3><p>Verlauf und Nachsorge bleiben Teil des persönlichen Konzepts.</p></div></li></ol></section><CTA title="Lassen Sie uns Ihre Haarsituation persönlich einordnen."/></PageShell>}
