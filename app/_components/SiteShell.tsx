import Link from "next/link";
import type { ReactNode } from "react";
import { doctor, type VerifiedTestimonial } from "../_data/home";
import { mediaSlots } from "../_data/media";
import { visibleContact } from "../_data/practice";
import { Header } from "./SiteHeader";
import { StructuredData, breadcrumbSchema, faqSchema } from "./StructuredData";

export { Header } from "./SiteHeader";

export const Arrow = () => <span aria-hidden="true">↗</span>;

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-lead">
        <Link className="brand brand-light" href="/"><span className="brand-mark">M</span><span className="brand-word">MELIMEDICS<small>PRIVATPRAXIS · MAINZ</small></span></Link>
        <p>Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – persönlich in Mainz.</p>
      </div>
      <div className="footer-grid">
        <div><h3>Schwerpunkte</h3><Link href="/behandlungen/gesicht/">Ästhetische Medizin</Link><Link href="/behandlungen/haut-laser/">Haut &amp; Laser</Link><Link href="/haare/">Haare</Link><Link href="/gesundheit/">Gesundheit</Link><Link href="/kosmetik/">Kosmetik</Link></div>
        <div><h3>Praxis</h3><Link href="/arzt-praxis/">Arzt &amp; Praxis</Link><Link href="/preise/">Preise</Link><Link href="/ratgeber/">Ratgeber</Link><Link href="/kontakt/">Kontakt</Link></div>
        <div><h3>Kontakt</h3><a href={visibleContact.phoneHref}>{visibleContact.phone}</a><a href={visibleContact.emailHref}>{visibleContact.email}</a><p>{visibleContact.location}<br/><Link href="/kontakt/">Kontaktdetails</Link></p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Melimedics</span><div><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link></div></div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><Header/><main id="main-content">{children}</main><Footer/></>;
}

const breadcrumbPaths: Record<string, string> = { "Arzt & Praxis": "/arzt-praxis/", "Termin buchen": "/termin/", Kontakt: "/kontakt/", Datenschutz: "/datenschutz/", Gesundheit: "/gesundheit/", Preise: "/preise/", Impressum: "/impressum/", Ratgeber: "/ratgeber/", Haarmedizin: "/haare/", Behandlungen: "/behandlungen/" };

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const normalizedItems = items.map((item) => ({ ...item, href: item.href ?? breadcrumbPaths[item.label] ?? "/" }));
  return <><nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/">Start</Link>{normalizedItems.map((item, index) => <span key={item.href}><i aria-hidden="true">/</i>{index < normalizedItems.length - 1 ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav><StructuredData id="breadcrumb-schema" data={breadcrumbSchema(normalizedItems)}/></>;
}

export function InteriorHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: string; children?: ReactNode }) {
  return <section className="interior-hero"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-intro">{intro}</p>{children}</div><div className="interior-art" aria-hidden="true"><span>M</span><i/><i/></div></section>;
}

export function SectionHeader({ eyebrow, title, intro }: { eyebrow?: string; title: ReactNode; intro?: string }) {
  return <div className="content-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{intro && <p>{intro}</p>}</div>;
}

export function CategoryCard({ number, title, copy, href, tone = "" }: { number: string; title: ReactNode; copy: string; href: string; tone?: string }) {
  return <Link href={href} className={`focus-card ${tone}`}><span>{number}</span><h3>{title}</h3><p>{copy}</p><strong>Mehr erfahren <Arrow/></strong></Link>;
}

export function TreatmentCard({ title, items, href }: { title: string; items: string[]; href: string }) {
  return <article className="treatment-card"><div><h3>{title}</h3><Link href={href} aria-label={`${title} ansehen`}><Arrow/></Link></div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

export function DoctorTrust() {
  return <section className="doctor-trust"><div className="doctor-portrait image-placeholder" aria-label={`Bildplatzhalter: ${mediaSlots.doctorPortrait.alt}`}><span>MK</span><small>Originalporträt folgt.</small></div><div><p className="eyebrow">Persönlich ärztlich beraten</p><h2>Medizinische Ästhetik beginnt mit einer <em>persönlichen Beratung.</em></h2><p>Melimedics wird ärztlich von {doctor.name} geleitet. Im Mittelpunkt stehen eine sorgfältige Einordnung Ihres Anliegens, verständliche Aufklärung und ein Behandlungsplan, der zu Ihnen passt.</p><Link className="text-link" href="/arzt-praxis/">Arzt &amp; Praxis kennenlernen <span>→</span></Link></div></section>;
}

export function CTA({ title = "Lassen Sie uns über Ihr Anliegen sprechen.", copy = "In einem persönlichen Beratungsgespräch klären wir, welcher Weg medizinisch sinnvoll ist und zu Ihren Wünschen passt." }: { title?: string; copy?: string }) {
  return <section className="cta"><p className="eyebrow">Persönliche Beratung in Mainz</p><h2>{title}</h2><p>{copy}</p><div><Link className="button button-light" href="/termin/">Termin buchen <Arrow/></Link><a href={visibleContact.phoneHref}>{visibleContact.phone}</a></div></section>;
}

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return <><div className="faq-list">{items.map((item, index) => <details key={item.question}><summary><span>{String(index + 1).padStart(2,"0")}</span>{item.question}<b aria-hidden="true">+</b></summary><p>{item.answer}</p></details>)}</div>{items.length > 0 ? <StructuredData id="faq-schema" data={faqSchema(items)}/> : null}</>;
}

export function PriceRow({ name, price, note }: { name: string; price?: string; note?: string }) {
  return <div className="price-row"><div><strong>{name}</strong>{note && <small>{note}</small>}</div><span>{price ?? "Noch nicht freigegeben"}</span></div>;
}

export function Testimonials({ items }: { items: VerifiedTestimonial[] }) {
  if (items.length === 0) {
    return <section className="testimonials-empty" aria-labelledby="testimonials-title"><div><p className="eyebrow">Erfahrungen</p><h2 id="testimonials-title">Vertrauen zeigt sich<br/><em>im persönlichen Erleben.</em></h2></div><p>Hier werden ausschließlich echte, nachvollziehbar verifizierte Bewertungen veröffentlicht. Bis zur Freigabe bleibt dieser Bereich bewusst ohne Zitate, Sterne oder Bewertungszahlen.</p></section>;
  }
  return <section className="testimonials"><h2 id="testimonials-title">Verifizierte Erfahrungen</h2><div>{items.map((item) => <figure key={`${item.source}-${item.verifiedAt}`}><blockquote>{item.quote}</blockquote><figcaption>{item.displayName} · {item.source}</figcaption></figure>)}</div></section>;
}
