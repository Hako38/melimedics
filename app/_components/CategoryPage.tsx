import type { ReactNode } from "react";
import { Breadcrumbs, CTA, InteriorHero, PageShell, SectionHeader, TreatmentCard } from "./SiteShell";

type Group = { title: string; items: string[]; href?: string };

export function CategoryPage({ eyebrow, title, intro, groups, note, children }: { eyebrow: string; title: ReactNode; intro: string; groups: Group[]; note?: string; children?: ReactNode }) {
  return <PageShell>
    <Breadcrumbs items={[{ label: typeof title === "string" ? title : eyebrow }]}/>
    <InteriorHero eyebrow={eyebrow} title={title} intro={intro}/>
    <section className="content-section category-section">
      <SectionHeader eyebrow="Behandlungsspektrum" title="Passende Wege für unterschiedliche Anliegen." intro={note}/>
      <div className="treatment-grid">{groups.map((group) => <TreatmentCard key={group.title} title={group.title} items={group.items} href={group.href ?? "/termin/"}/>)}</div>
    </section>
    {children}
    <CTA/>
  </PageShell>;
}
