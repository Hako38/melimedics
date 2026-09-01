import type { Metadata } from "next";
import { Breadcrumbs, InteriorHero, PageShell } from "../_components/SiteShell";
import { mediaSlots } from "../_data/media";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von Melimedics in Mainz.",
  alternates: { canonical: "/datenschutz/" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <PageShell>
    <Breadcrumbs items={[{ label: "Datenschutz" }]}/>
    <InteriorHero eyebrow="Rechtliches" title="Datenschutz" intro="Transparente Informationen zur Verarbeitung personenbezogener Daten auf dieser Website." media={mediaSlots.practiceDecor} mediaLabel="Detail aus der Melimedics Praxis"/>
    <article className="legal-copy">
      <p className="legal-updated">Stand: 1. September 2026</p>

      <h2>1. Verantwortlicher</h2>
      <p>Melih Tayyip Kandemir / Melimedics<br/>Elbestraße 90<br/>55122 Mainz<br/>Deutschland</p>
      <p>Telefon: <a href="tel:+4915758272466">01575 8272466</a><br/>E-Mail: <a href="mailto:info@melimedics.de">info@melimedics.de</a></p>

      <h2>2. Bereitstellung der Website und Hosting</h2>
      <p>Beim Aufruf dieser Website werden technisch erforderliche Verbindungsdaten verarbeitet. Dazu können IP-Adresse, Zeitpunkt des Abrufs, aufgerufene Adresse, übertragene Datenmenge, Referrer, Browser und Betriebssystem gehören. Die Verarbeitung dient der sicheren, stabilen und fehlerfreien Bereitstellung der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.</p>
      <p>Die Website wird derzeit über Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, bereitgestellt. Vercel kann dabei als Auftragsverarbeiter technische Verbindungs- und Protokolldaten verarbeiten. Für Übermittlungen in die USA nennt Vercel das EU-US Data Privacy Framework und die EU-Standardvertragsklauseln als Schutzmechanismen. Weitere Informationen: <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Datenschutzhinweise von Vercel</a>.</p>

      <h2>3. Kontaktaufnahme</h2>
      <p>Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder vertraglichen Anliegen und im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Bitte senden Sie sensible Gesundheitsdaten nicht unverschlüsselt per E-Mail.</p>

      <h2>4. Haar-Check und Beratungsanfragen</h2>
      <p>Im Haar-Check können Sie Angaben zu Ihrer Ausgangssituation, bisherigen Behandlungen, Interessen und Kontaktdaten machen. Optionale Fotos werden zunächst ausschließlich lokal in Ihrem Browser als Vorschau verarbeitet. Erst wenn Sie die Beratungsanfrage absenden, werden die ausgewählten Angaben und Fotos an Melimedics übertragen.</p>
      <p>Die Angaben werden ausschließlich zur Prüfung und Bearbeitung Ihrer Beratungsanfrage verwendet. Soweit Gesundheitsdaten oder Fotos betroffen sind, erfolgt die Verarbeitung nur auf Grundlage Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a und Art. 9 Abs. 2 lit. a DSGVO. Die Foto-Einwilligung ist freiwillig und getrennt von der Kontakt-Einwilligung. Sie können eine Einwilligung jederzeit mit Wirkung für die Zukunft über die oben genannten Kontaktdaten widerrufen.</p>
      <p>In der aktuellen Vorschau ist keine produktive Speicherung oder automatische medizinische Auswertung eingerichtet. Ein Erfolgszustand wird nur angezeigt, wenn eine sichere Speicherung technisch verfügbar ist. Eine automatisierte Diagnose oder KI-Auswertung der Fotos findet nicht statt.</p>

      <h2>5. Website-Assistent</h2>
      <p>Der Website-Assistent dient der allgemeinen Orientierung und ersetzt keine medizinische Beratung oder Diagnose. Die Unterhaltung bleibt in der aktiven Browsersitzung; es wird kein dauerhafter Chatverlauf im Browser angelegt. Der Assistent übermittelt keine Angaben an Analyse- oder Werbedienste. Bitte geben Sie dort keine Namen, Kontaktdaten oder Gesundheitsdaten ein.</p>

      <h2>6. Externe Terminbuchung und Bewertungen</h2>
      <p>Links zur Terminbuchung führen zu Planity. Erst wenn Sie einen solchen Link anklicken, verlassen Sie diese Website; anschließend gelten die Datenschutzbestimmungen von Planity. Planity wird nicht als eingebetteter Inhalt geladen. Weitere Informationen: <a href="https://www.planity.com/de-DE/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Planity</a>.</p>
      <p>Links zu Google-Bewertungen und zum Standort führen zu Google Maps. Auch hier findet eine Verbindung zu Google erst nach Ihrem Klick statt. Weitere Informationen: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.</p>

      <h2>7. Social Media</h2>
      <p>Diese Website verlinkt auf das Melimedics-Profil bei Instagram. Die Inhalte werden nicht automatisch eingebettet. Erst beim Anklicken des Links wird eine Verbindung zu Meta Platforms Ireland Limited hergestellt. Weitere Informationen: <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer">Datenschutzrichtlinie von Instagram</a>.</p>

      <h2>8. Cookies und Reichweitenmessung</h2>
      <p>Diese Website verwendet derzeit keine Analyse-, Marketing- oder Social-Media-Cookies und lädt keine entsprechenden Tracking-Skripte. Sollten künftig einwilligungspflichtige Dienste eingesetzt werden, werden diese erst nach Ihrer Einwilligung aktiviert und diese Datenschutzhinweise entsprechend aktualisiert.</p>

      <h2>9. Speicherdauer und Sicherheit</h2>
      <p>Personenbezogene Daten werden gelöscht, sobald der Verarbeitungszweck entfällt und keine gesetzlichen Aufbewahrungspflichten oder berechtigten Gründe für eine weitere Speicherung bestehen. Wir treffen angemessene technische und organisatorische Maßnahmen, um Daten vor Verlust, Manipulation und unbefugtem Zugriff zu schützen.</p>

      <h2>10. Ihre Rechte</h2>
      <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.</p>
      <p>Zuständige Aufsichtsbehörde in Rheinland-Pfalz: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz. Informationen und Kontaktmöglichkeiten finden Sie unter <a href="https://www.datenschutz.rlp.de/" target="_blank" rel="noopener noreferrer">datenschutz.rlp.de</a>.</p>
    </article>
  </PageShell>;
}
