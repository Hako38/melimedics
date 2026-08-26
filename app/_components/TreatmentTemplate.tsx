import Link from "next/link";
import { mediaSlots, type MediaSlot } from "../_data/media";
import { treatmentBySlug, type TreatmentCategory, type TreatmentContent } from "../_data/treatments";
import { Arrow, Breadcrumbs, CTA, DoctorTrust, FAQ, InteriorHero, PageShell, SectionHeader } from "./SiteShell";

const categoryRoutes: Record<TreatmentCategory, { label: string; href: string }> = {
  aesthetics: { label: "Ästhetische Medizin", href: "/behandlungen/gesicht/" },
  skin_laser: { label: "Haut & Laser", href: "/behandlungen/haut-laser/" },
  prp: { label: "PRP", href: "/behandlungen/prp/" },
  hair: { label: "Haarmedizin", href: "/haare/" },
  health: { label: "Gesundheit", href: "/gesundheit/" },
  cosmetics: { label: "Kosmetik", href: "/kosmetik/" },
};

const treatmentMedia: Partial<Record<string, MediaSlot>> = {
  botulinumtoxin: mediaSlots.botulinumtoxinTreatment,
  "prp-behandlung": mediaSlots.doctorPortrait,
  "prp-haare": mediaSlots.doctorPortrait,
  aquafacial: mediaSlots.facialTreatment,
};

export function TreatmentTemplate({ treatment }: { treatment: TreatmentContent }) {
  const category = categoryRoutes[treatment.category];
  const related = treatment.relatedTreatments?.map((slug) => treatmentBySlug[slug]).filter(Boolean) ?? [];
  const isHairTreatment = treatment.category === "hair";

  return <PageShell>
    <Breadcrumbs items={[{ label: "Behandlungen", href: "/behandlungen/" }, { label: category.label, href: category.href }, { label: treatment.title, href: treatment.href }]}/>
    <div className={treatment.theme === "hair" ? "treatment-theme-hair" : "treatment-theme-default"}>
      <InteriorHero eyebrow={treatment.eyebrow} title={treatment.hero} intro={treatment.shortDescription} media={treatmentMedia[treatment.slug]} mediaLabel={treatment.title}>
        <div className="hero-actions">{isHairTreatment ? <Link className="button button-dark" href="/haare/haar-check/">Haar-Check starten <Arrow/></Link> : null}<Link className={isHairTreatment ? "button button-secondary" : "button button-dark"} href="/termin/">Beratung vereinbaren <Arrow/></Link></div>
      </InteriorHero>
    </div>

    {treatment.concerns?.length ? <section className="content-section concern-list-section">
      <SectionHeader eyebrow="Typische Anliegen" title="Wann ein persönliches Gespräch sinnvoll sein kann."/>
      <ul className="editorial-list">{treatment.concerns.map((concern, index) => <li key={concern}><span>{String(index + 1).padStart(2, "0")}</span><strong>{concern}</strong></li>)}</ul>
    </section> : null}

    {treatment.explanation?.length ? <section className="soft-section explanation-section">
      <SectionHeader eyebrow="Behandlung erklärt" title="Eine erste Orientierung."/>
      <div className="prose prose-large">{treatment.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section> : null}

    {treatment.facts?.length ? <section className="facts-section"><SectionHeader eyebrow="Treatment Facts" title="Kurz zusammengefasst."/><div className="facts-grid">{treatment.facts.map((fact) => <div key={fact.label}><small>{fact.label}</small><strong>{fact.value}</strong></div>)}</div></section> : null}

    {treatment.procedure?.length ? <section className="process-section treatment-process"><SectionHeader eyebrow="Möglicher Ablauf" title="Sorgfältig von Anfang an."/><div className="process-grid">{treatment.procedure.map((step,index) => <article key={step.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section> : null}

    {treatment.benefits?.length ? <section className="content-section"><SectionHeader eyebrow="Vorteile" title="Auf einen Blick."/><ul className="benefit-grid">{treatment.benefits.map((benefit, index) => <li key={benefit}><span>{String(index + 1).padStart(2,"0")}</span>{benefit}</li>)}</ul></section> : null}

    {treatment.risks?.length ? <section className="two-col-section"><SectionHeader eyebrow="Risiken & Hinweise" title="Sicherheit braucht Aufklärung."/><div className="prose">{treatment.risks.map((risk) => <p key={risk}>{risk}</p>)}</div></section> : null}

    {treatment.price ? <section className="facts-section"><SectionHeader eyebrow="Preis" title="Transparent vor der Behandlung."/><p className="treatment-price">{treatment.price}</p></section> : null}

    <DoctorTrust/>

    {treatment.faq?.length ? <section className="content-section"><SectionHeader eyebrow="Häufige Fragen" title="Gut informiert entscheiden."/><FAQ items={treatment.faq}/></section> : null}

    {treatment.slug === "haartransplantation" ? <section className="two-col-section hair-transplant-trust"><SectionHeader eyebrow="Sorgfältig vorbereitet" title="Beratung, Ablauf und Nachsorge gehören zusammen."/><div className="prose"><p>Eine operative Perspektive wird erst nach persönlicher Untersuchung und realistischer Erwartungsklärung weiterverfolgt. Die Nachsorge wird von Anfang an in die individuelle Planung einbezogen.</p><p><strong>Noch offen:</strong> Operateur, Methode, OP-Standort, Eignungskriterien, Risiken, Heilungsverlauf und Preise werden erst nach medizinischer und vertraglicher Freigabe ergänzt.</p></div></section> : null}

    {isHairTreatment ? <section className="hair-check-inline"><div><p className="eyebrow">Nächster Schritt</p><h2>Angaben für die persönliche Beratung vorbereiten.</h2><p>Der Haar-Check ordnet Ihre Antworten nicht medizinisch ein. Optional ausgewählte Fotos bleiben aktuell ausschließlich in Ihrer Browser-Sitzung.</p></div><Link className="button button-light" href="/haare/haar-check/">Haar-Check starten <Arrow/></Link></section> : null}

    {related.length ? <section className="content-section related-section"><SectionHeader eyebrow="Verwandte Behandlungen" title="Weitere mögliche Perspektiven."/><div className="related-grid">{related.map((item) => <Link key={item.slug} href={item.href}><span>{categoryRoutes[item.category].label}</span><h3>{item.title}</h3><p>{item.shortDescription}</p><strong>Mehr erfahren <Arrow/></strong></Link>)}</div></section> : null}
    <CTA title={treatment.bookingType === "consultation" ? "Ihre Beratung beginnt mit einer persönlichen Einordnung." : "Lassen Sie uns die passende Behandlung besprechen."}/>
  </PageShell>;
}
