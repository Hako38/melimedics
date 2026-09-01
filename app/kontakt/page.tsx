import Link from "next/link";
import { Arrow, Breadcrumbs, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { mediaSlots } from "../_data/media";
import { visibleContact } from "../_data/practice";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata("Kontakt", "Kontaktmöglichkeiten und Standort von Melimedics in Mainz-Gonsenheim.", "/kontakt/");

export default function ContactPage() {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Kontakt" }]}/>
    <InteriorHero eyebrow="Kontakt" title={<>Wir sind gern<br/><em>für Sie da.</em></>} intro="Telefonisch, per E-Mail oder über die Online-Terminbuchung: Wählen Sie den Kontaktweg, der für Sie am besten passt." media={mediaSlots.practiceDecor} mediaLabel="Detail aus der Melimedics Praxis"/>
    <section className="content-section contact-page">
      <SectionHeader eyebrow="Praxis kontaktieren" title="Direkt und unkompliziert."/>
      <div className="contact-card-grid">
        <a href={visibleContact.phoneHref}><span>Telefon</span><h2>{visibleContact.phone}</h2><p>Für Terminfragen und persönliche Rückfragen.</p><strong>Anrufen <Arrow/></strong></a>
        <a href={visibleContact.emailHref}><span>E-Mail</span><h2>{visibleContact.email}</h2><p>Bitte keine sensiblen medizinischen Unterlagen senden.</p><strong>E-Mail öffnen <Arrow/></strong></a>
        <Link href="/termin/"><span>Termin</span><h2>Online buchen</h2><p>Freie Termine über Planity ansehen.</p><strong>Zur Terminseite <Arrow/></strong></Link>
      </div>
    </section>
    <section className="contact-location">
      <div><p className="eyebrow">Standort &amp; Anfahrt</p><h2>{visibleContact.street}<br/>{visibleContact.postalCode} Mainz</h2><p>Melimedics befindet sich in Mainz-Gonsenheim. Über den Kartenlink können Sie Ihre individuelle Route planen.</p><p>Für einen Behandlungstermin nutzen Sie bitte die Online-Buchung oder kontaktieren Sie uns persönlich.</p></div>
      <a className="map-placeholder map-link" href={visibleContact.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Melimedics bei Google Maps öffnen"><span>M</span><strong>Route bei Google Maps öffnen <Arrow/></strong><small>Mainz · Gonsenheim</small></a>
    </section>
  </PageShell>;
}
