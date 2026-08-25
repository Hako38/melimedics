import type { ReactNode } from "react";
import { Breadcrumbs, CTA, DoctorTrust, FAQ, InteriorHero, PageShell, SectionHeader } from "./SiteShell";

export type TreatmentContent = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  concern: string;
  explanation: ReactNode;
  benefits: string[];
  process: { title: string; copy: string }[];
  facts: { label: string; value: string }[];
  price?: string;
  risks?: ReactNode;
  faq: { question: string; answer: string }[];
};

export function TreatmentTemplate({ treatment }: { treatment: TreatmentContent }) {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Behandlungen", href: "/behandlungen/" }, { label: treatment.title }]}/>
    <InteriorHero eyebrow={treatment.eyebrow} title={treatment.title} intro={treatment.intro}/>
    <section className="two-col-section"><SectionHeader eyebrow="Für wen / welches Anliegen?" title="Individuell statt nach Schema."/><div className="prose"><p>{treatment.concern}</p></div></section>
    <section className="soft-section"><SectionHeader eyebrow="Behandlung erklärt" title="Was Sie wissen sollten."/><div className="prose">{treatment.explanation}</div></section>
    <section className="content-section"><SectionHeader eyebrow="Vorteile" title="Auf einen Blick."/><ul className="benefit-grid">{treatment.benefits.map((benefit, index) => <li key={benefit}><span>{String(index + 1).padStart(2,"0")}</span>{benefit}</li>)}</ul></section>
    <section className="process-section"><SectionHeader eyebrow="Behandlungsablauf" title="Von der Beratung bis zur Nachsorge."/><div className="process-grid">{treatment.process.map((step,index) => <article key={step.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
    <section className="facts-section"><SectionHeader eyebrow="Kurzüberblick" title="Die wichtigsten Fakten."/><div className="facts-grid">{treatment.facts.map((fact) => <div key={fact.label}><small>{fact.label}</small><strong>{fact.value}</strong></div>)}<div><small>Preis</small><strong>{treatment.price ?? "TODO · medizinisch/redaktionell freigeben"}</strong></div></div></section>
    <section className="two-col-section"><SectionHeader eyebrow="Risiken & wichtige Hinweise" title="Sicherheit braucht Aufklärung."/><div className="prose">{treatment.risks ?? <p className="content-note">TODO: Medizinisch geprüfte Risiken, Kontraindikationen und Nachsorgehinweise ergänzen. Bis zur Freigabe werden keine Angaben veröffentlicht.</p>}</div></section>
    <DoctorTrust/>
    <section className="content-section"><SectionHeader eyebrow="Häufige Fragen" title="Gut informiert entscheiden."/><FAQ items={treatment.faq}/></section>
    <CTA/>
  </PageShell>;
}
