import Link from "next/link";
import { guideArticles } from "../_data/guides";
import { mediaSlots } from "../_data/media";
import { Breadcrumbs, CTA, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { pageMetadata } from "../_lib/metadata";
export const metadata = pageMetadata("Ratgeber", "Der Melimedics Ratgeber zu ästhetischer Medizin, Haut und Haarmedizin in Mainz.", "/ratgeber/");

export default function GuidePage(){return <PageShell><Breadcrumbs items={[{label:"Ratgeber"}]}/><InteriorHero eyebrow="Ratgeber" title={<>Wissen für<br/><em>gute Entscheidungen.</em></>} intro="Verständliche Orientierung rund um Ästhetik, Haut und Haare – sorgfältig formuliert und ohne leere Versprechen." media={mediaSlots.consultationVisualization} mediaLabel="Persönlich beraten"/><section className="content-section"><SectionHeader eyebrow="Aktuelle Beiträge" title="Orientierung vor der persönlichen Beratung." intro="Drei kompakte Beiträge helfen Ihnen, Fragen zu strukturieren und die nächsten Schritte besser einzuordnen."/><div className="article-grid">{guideArticles.map((article)=><Link href={`/ratgeber/${article.slug}/`} key={article.slug} className="guide-card"><small>{article.tag}</small><h3>{article.title}</h3><p>{article.teaser}</p><span>{article.readingTime} <b aria-hidden="true">↗</b></span></Link>)}</div></section><CTA/></PageShell>}
