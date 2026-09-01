import { Arrow, Breadcrumbs, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { mediaSlots } from "../_data/media";
import { visibleContact } from "../_data/practice";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata("Termin buchen", "Online oder persönlich einen Beratungstermin bei Melimedics in Mainz vereinbaren.", "/termin/");

export default function AppointmentPage() {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Termin buchen" }]}/>
    <InteriorHero
      eyebrow="Termin buchen"
      title={<>Ihr Anliegen.<br/><em>In Ruhe besprochen.</em></>}
      intro="Wählen Sie direkt einen Termin über Planity oder kontaktieren Sie uns persönlich. Bei Haartransplantation und medizinisch komplexeren Anliegen empfehlen wir zunächst eine Beratung."
      media={mediaSlots.practiceReception}
      mediaLabel="Empfang der Melimedics Praxis"
    />
    <section className="booking-section">
      <SectionHeader eyebrow="Direkt zum Termin" title="Wählen Sie Ihren Kontaktweg."/>
      <div className="booking-primary">
        <a href={visibleContact.bookingUrl} target="_blank" rel="noreferrer">
          <span>Online-Terminbuchung</span>
          <h2>Freien Termin bei Planity auswählen.</h2>
          <p>Sie verlassen melimedics.de und öffnen den bestehenden externen Buchungsdienst.</p>
          <strong>Planity öffnen <Arrow/></strong>
        </a>
        <div>
          <p className="eyebrow">Alternative Kontaktmöglichkeiten</p>
          <a href={visibleContact.phoneHref}><span>Telefon</span><strong>{visibleContact.phone}</strong><Arrow/></a>
          <a href={visibleContact.emailHref}><span>E-Mail</span><strong>{visibleContact.email}</strong><Arrow/></a>
          <div className="booking-location"><span>Standort</span><strong>{visibleContact.location}</strong></div>
        </div>
      </div>
      <p className="privacy-note">Bitte senden Sie per E-Mail keine sensiblen medizinischen Unterlagen. Medizinische Fragen werden im persönlichen Gespräch geklärt.</p>
    </section>
  </PageShell>;
}
