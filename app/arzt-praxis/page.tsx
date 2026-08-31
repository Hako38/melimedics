import Link from "next/link";
import Image from "next/image";
import { Arrow, Breadcrumbs, CTA, DoctorTrust, InteriorHero, PageShell, SectionHeader } from "../_components/SiteShell";
import { mediaSlots } from "../_data/media";
import { visibleContact } from "../_data/practice";
import { pageMetadata } from "../_lib/metadata";

export const metadata = pageMetadata("Arzt & Praxis", "Lernen Sie Melih Kandemir und den persönlichen medizinischen Ansatz von Melimedics in Mainz kennen.", "/arzt-praxis/");

export default function PracticePage(){return <PageShell><Breadcrumbs items={[{label:"Arzt & Praxis"}]}/><InteriorHero eyebrow="Arzt & Praxis" title={<>Medizinische Sorgfalt.<br/><em>Persönlich nah.</em></>} intro="Melimedics steht für verständliche Beratung, eine ehrliche Einordnung von Möglichkeiten und Grenzen sowie einen Behandlungsweg, der zur persönlichen Ausgangssituation passt." media={mediaSlots.homeHero} mediaLabel="Melimedics Praxis in Mainz"><Link className="button button-dark" href="/termin/">Persönlich kennenlernen <Arrow/></Link></InteriorHero><DoctorTrust/>
  <section className="soft-section"><SectionHeader eyebrow="Philosophie" title="Behandlung ist mehr als eine Methode."/><div className="principles-grid"><article><span>01</span><h3>Zuhören</h3><p>Ihr Anliegen, Ihre Erwartungen und Ihre medizinische Ausgangssituation geben die Richtung vor.</p></article><article><span>02</span><h3>Einordnen</h3><p>Möglichkeiten, Alternativen und Grenzen werden verständlich besprochen.</p></article><article><span>03</span><h3>Begleiten</h3><p>Ein klarer Ablauf und persönliche Nachsorge gehören zum Behandlungskonzept.</p></article></div></section>
  <section className="content-section practice-focus"><SectionHeader eyebrow="Behandlungsschwerpunkte" title="Ästhetik, Haut und Haare unter einer medizinischen Perspektive."/><div className="practice-link-grid"><Link href="/behandlungen/gesicht/"><span>01</span><h3>Ästhetische Medizin</h3><Arrow/></Link><Link href="/behandlungen/haut-laser/"><span>02</span><h3>Haut & Laser</h3><Arrow/></Link><Link href="/haare/"><span>03</span><h3>Haarmedizin</h3><Arrow/></Link></div></section>
  <section className="practice-images" aria-labelledby="practice-images-title"><div className="practice-images-heading"><p className="eyebrow">Einblicke in die Behandlung</p><h2 id="practice-images-title">Persönlich. Sorgfältig.<br/><em>In der Praxis.</em></h2><p>Originalaufnahmen der bisherigen Melimedics Website geben einen authentischen Einblick in Praxis und Behandlungssituationen.</p></div><div className="practice-image-grid">{[
    { media: mediaSlots.doctorBotulinumtoxin, area: "Ästhetische Medizin", label: "Persönliche Behandlung" },
    { media: mediaSlots.practiceDetail, area: "Praxis", label: "Ruhige Behandlungsumgebung" },
    { media: mediaSlots.practiceGloves, area: "Vorbereitung", label: "Sorgfältige Abläufe" },
    { media: mediaSlots.facialTreatment, area: "Kosmetik", label: "Professionelle Gesichtspflege" },
    { media: mediaSlots.cuppingBack, area: "Gesundheit", label: "Dokumentierter Praxiseinblick" },
    { media: mediaSlots.practiceDecor, area: "Praxis", label: "Details der Räumlichkeiten" },
  ].map(({media, area, label}) => <figure key={media.id}><div><Image src={media.src} alt={media.alt} fill sizes="(max-width: 768px) calc(100vw - 2rem), 30vw"/></div><figcaption><span>{area}</span><strong>{label}</strong></figcaption></figure>)}</div></section>
  <section className="two-col-section practice-location"><SectionHeader eyebrow="Praxis" title={<>Ruhig. Diskret.<br/><em>In Mainz.</em></>}/><div className="prose"><p><strong>{visibleContact.street}<br/>{visibleContact.location}</strong></p><p>Telefon: <a href={visibleContact.phoneHref}>{visibleContact.phone}</a><br/>E-Mail: <a href={visibleContact.emailHref}>{visibleContact.email}</a></p><p>Die Postleitzahl bleibt wegen widersprüchlicher Bestandsangaben bis zur dokumentierten Klärung unveröffentlicht. Bestätigte Öffnungszeiten und weitergehende Angaben zum Praxisteam liegen noch nicht vor.</p><Link className="text-link" href="/kontakt/">Zum Kontakt <Arrow/></Link></div></section><CTA/></PageShell>}
