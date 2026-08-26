import Link from "next/link";
import type { ReactNode } from "react";
import type { MediaSlot } from "../_data/media";
import { Breadcrumbs, CTA, InteriorHero, PageShell, SectionHeader, TreatmentCard } from "./SiteShell";

type Group = { title: string; items: string[]; href?: string };

export function CategoryPage({ eyebrow, title, intro, groups, path, note, showFinder = false, children, media, mediaLabel }: { eyebrow: string; title: ReactNode; intro: string; groups: Group[]; path: string; note?: string; showFinder?: boolean; children?: ReactNode; media?: MediaSlot; mediaLabel?: string }) {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Behandlungen", href: "/behandlungen/" }, { label: typeof title === "string" ? title : eyebrow, href: path }]}/>
    <InteriorHero eyebrow={eyebrow} title={title} intro={intro} media={media} mediaLabel={mediaLabel}>{showFinder ? <Link className="button button-dark" href="/behandlungsfinder/">Behandlung finden <span aria-hidden="true">↗</span></Link> : null}</InteriorHero>
    <section className="content-section category-section">
      <SectionHeader eyebrow="Behandlungsspektrum" title="Passende Wege für unterschiedliche Anliegen." intro={note}/>
      <div className="treatment-grid">{groups.map((group) => <TreatmentCard key={group.title} title={group.title} items={group.items} href={group.href ?? "/termin/"}/>)}</div>
    </section>
    {children}
    <CTA/>
  </PageShell>;
}
