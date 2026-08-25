import Link from "next/link";
import type { ReactNode } from "react";

export const Arrow = () => <span aria-hidden="true">↗</span>;

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Melimedics Startseite">
        <span className="brand-mark">M</span>
        <span>MELIMEDICS<small>ÄRZTLICHE PRIVATPRAXIS · MAINZ</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        <Link href="/behandlungen/">Behandlungen</Link>
        <Link href="/haare/">Haare</Link>
        <Link href="/preise/">Preise</Link>
        <Link href="/arzt-praxis/">Arzt &amp; Praxis</Link>
        <Link href="/ratgeber/">Ratgeber</Link>
      </nav>
      <Link className="button button-dark header-cta" href="/termin/">Termin buchen <Arrow /></Link>
      <details className="mobile-menu">
        <summary aria-label="Menü öffnen"><span/><span/></summary>
        <nav aria-label="Mobile Navigation">
          <Link href="/behandlungen/">Behandlungen</Link>
          <Link href="/haare/">Haare</Link>
          <Link href="/preise/">Preise</Link>
          <Link href="/arzt-praxis/">Arzt &amp; Praxis</Link>
          <Link href="/ratgeber/">Ratgeber</Link>
          <Link href="/termin/">Termin buchen</Link>
        </nav>
      </details>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-lead">
        <Link className="brand brand-light" href="/"><span className="brand-mark">M</span><span>MELIMEDICS<small>ÄRZTLICHE PRIVATPRAXIS · MAINZ</small></span></Link>
        <p>Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – persönlich in Mainz.</p>
      </div>
      <div className="footer-grid">
        <div><h3>Schwerpunkte</h3><Link href="/behandlungen/gesicht/">Ästhetische Medizin</Link><Link href="/behandlungen/haut-laser/">Haut &amp; Laser</Link><Link href="/haare/">Haare</Link><Link href="/gesundheit/">Gesundheit</Link><Link href="/kosmetik/">Kosmetik</Link></div>
        <div><h3>Praxis</h3><Link href="/arzt-praxis/">Arzt &amp; Praxis</Link><Link href="/preise/">Preise</Link><Link href="/ratgeber/">Ratgeber</Link><Link href="/kontakt/">Kontakt</Link></div>
        <div><h3>Kontakt</h3><a href="tel:+4915758272466">01575 8272466</a><a href="mailto:info@melimedics.de">info@melimedics.de</a><p>Elbestraße 90<br/>55124 Mainz</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Melimedics</span><div><Link href="/impressum/">Impressum</Link><Link href="/datenschutz/">Datenschutz</Link></div></div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <><Header/><main>{children}</main><Footer/></>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Brotkrümelnavigation"><Link href="/">Start</Link>{items.map((item) => <span key={item.label}><i aria-hidden="true">/</i>{item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav>;
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
  return <section className="doctor-trust"><div className="doctor-portrait" aria-label="Porträtbereich der ärztlichen Leitung"><span>MK</span><small>Bild der ärztlichen Leitung wird nach Freigabe ergänzt.</small></div><div><p className="eyebrow">Ärztliche Leitung</p><h2>Beratung, die mit<br/><em>Zuhören beginnt.</em></h2><p>Melimedics wird ärztlich von Melih Kandemir geleitet. Im Mittelpunkt stehen eine sorgfältige Einordnung Ihres Anliegens, verständliche Aufklärung und ein Behandlungsplan, der zu Ihnen passt.</p><p className="content-note">Qualifikationen und ärztliche Vita werden nach redaktioneller Freigabe ergänzt.</p><Link className="text-link" href="/arzt-praxis/">Arzt &amp; Praxis kennenlernen <span>→</span></Link></div></section>;
}

export function CTA({ title = "Lassen Sie uns über Ihr Anliegen sprechen.", copy = "In einem persönlichen Beratungsgespräch klären wir, welcher Weg medizinisch sinnvoll ist und zu Ihren Wünschen passt." }: { title?: string; copy?: string }) {
  return <section className="cta"><p className="eyebrow">Persönliche Beratung in Mainz</p><h2>{title}</h2><p>{copy}</p><div><Link className="button button-light" href="/termin/">Termin buchen <Arrow/></Link><a href="tel:+4915758272466">01575 8272466</a></div></section>;
}

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map((item, index) => <details key={item.question}><summary><span>{String(index + 1).padStart(2,"0")}</span>{item.question}<b aria-hidden="true">+</b></summary><p>{item.answer}</p></details>)}</div>;
}

export function PriceRow({ name, price, note }: { name: string; price?: string; note?: string }) {
  return <div className="price-row"><div><strong>{name}</strong>{note && <small>{note}</small>}</div><span>{price ?? "Preis nach Beratung"}</span></div>;
}
