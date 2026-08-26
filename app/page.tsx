import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "./_components/Reveal";
import { Arrow, DoctorTrust, FAQ, Footer, Header, Testimonials } from "./_components/SiteShell";
import { concerns, featuredTreatments, generalFaq, verifiedTestimonials } from "./_data/home";
import { mediaSlots } from "./_data/media";
import { pageMetadata } from "./_lib/metadata";

export const metadata: Metadata = pageMetadata("Ärztliche Ästhetik, Haut & Haare", "Ärztliche Ästhetik, Haut- und Haarmedizin mit persönlicher Beratung bei Melimedics in Mainz.", "/");

const coreAreas = [
  { number: "01", title: "Ästhetische Medizin", copy: "Individuell geplante Gesichtsbehandlungen mit Blick für Mimik, Proportionen und Natürlichkeit.", href: "/behandlungen/gesicht/" },
  { number: "02", title: "Haut & Laser", copy: "Ärztlich begleitete Konzepte für Hautbild, Struktur und ausgewählte Anliegen.", href: "/behandlungen/haut-laser/" },
  { number: "03", title: "Haarmedizin", copy: "Haarausfall einordnen, Haare stärken und die Perspektive Haartransplantation sorgfältig planen.", href: "/haare/", featured: true },
];

const process = [
  ["01", "Beratung", "Wir hören zu und besprechen Ihr Anliegen, Ihre Erwartungen und die medizinische Ausgangssituation."],
  ["02", "Individuelle Planung", "Möglichkeiten, Grenzen und der passende Ablauf werden verständlich und persönlich eingeordnet."],
  ["03", "Behandlung", "Die vereinbarte Behandlung folgt einem klaren, zuvor besprochenen Plan."],
  ["04", "Nachsorge", "Fragen nach der Behandlung und die weitere Begleitung sind Teil unseres Verständnisses."],
];

export default function Home() {
  return <>
    <Header/>
    <main id="main-content">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-hero-copy">
          <p className="eyebrow hero-reveal hero-delay-1">Privatpraxis · Mainz-Gonsenheim</p>
          <h1 id="home-hero-title" className="hero-reveal hero-delay-2">Ästhetische Medizin, <em>Haut &amp; Haare</em> in Mainz</h1>
          <p className="home-hero-intro hero-reveal hero-delay-3">Individuelle ärztliche Behandlungen mit Fokus auf natürliche Ergebnisse, moderne Verfahren und persönliche Betreuung.</p>
          <div className="hero-actions hero-reveal hero-delay-4">
            <Link className="button button-primary" href="/termin/">Termin vereinbaren <Arrow/></Link>
            <Link className="button button-secondary" href="/behandlungsfinder/">Behandlung finden <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="hero-trust hero-reveal hero-delay-4" aria-label="Vertrauenshinweise">
            <li><span aria-hidden="true"/>Ärztlich geführt</li>
            <li><span aria-hidden="true"/>Persönliche Beratung</li>
            <li><span aria-hidden="true"/>Standort Mainz</li>
          </ul>
        </div>
        <div className="home-hero-media image-placeholder" aria-label={`Bildplatzhalter: ${mediaSlots.homeHero.alt}`}>
          <div className="media-grid" aria-hidden="true"/>
          <span className="media-monogram" aria-hidden="true">M</span>
          <div className="media-note"><small>Bildkonzept</small><strong>Originalfoto der Praxis oder ärztlichen Beratung</strong><span>Praxisaufnahme folgt</span></div>
          <p>ÄRZTLICHE PRIVATPRAXIS<br/><span>MAINZ · GONSENHEIM</span></p>
        </div>
      </section>

      <Reveal><section className="home-section concerns-section" aria-labelledby="concerns-title">
        <div className="home-section-head"><div><p className="eyebrow">Von Ihrem Anliegen aus gedacht</p><h2 id="concerns-title">Was möchten Sie <em>verändern?</em></h2></div><p>Eine gute Beratung beginnt nicht bei einer Methode, sondern bei dem, was Sie beschäftigt.</p></div>
        <div className="concern-grid">{concerns.map((item, index) => <Link key={item.title} href={item.href} className={`concern-card concern-${index + 1}`}><div><span>0{index + 1}</span><small>{item.label}</small></div><h3>{item.title}</h3><p>{item.copy}</p><b aria-hidden="true">↗</b></Link>)}</div>
      </section></Reveal>

      <Reveal><section className="home-section treatments-section" aria-labelledby="treatments-title">
        <div className="home-section-head"><div><p className="eyebrow">Behandlungsschwerpunkte</p><h2 id="treatments-title">Sorgfältig geplant.<br/><em>Persönlich abgestimmt.</em></h2></div><Link className="text-link" href="/behandlungen/">Alle Behandlungen <span>→</span></Link></div>
        <div className="featured-treatment-grid">{featuredTreatments.map((item, index) => <Link href={item.href} key={item.title} className="featured-treatment-card"><div className="treatment-card-top"><small>{item.label}</small><span>{String(index + 1).padStart(2,"0")}</span></div><div className="treatment-visual" aria-hidden="true"><i/><i/></div><h3>{item.title}</h3><p>{item.copy}</p><strong>Behandlung ansehen <Arrow/></strong></Link>)}</div>
      </section></Reveal>

      <Reveal><DoctorTrust/></Reveal>

      <Reveal><section className="home-section core-section" aria-labelledby="core-title">
        <div className="home-section-head"><div><p className="eyebrow">Drei Kernbereiche</p><h2 id="core-title">Medizinische Kompetenz.<br/><em>Unter einem Dach.</em></h2></div><p>Die Bereiche greifen ineinander und werden immer aus Ihrer individuellen Situation heraus betrachtet.</p></div>
        <div className="core-grid">{coreAreas.map((area) => <Link href={area.href} key={area.number} className={`core-card ${area.featured ? "is-featured" : ""}`}><span>{area.number}</span><div><h3>{area.title}</h3><p>{area.copy}</p></div><b aria-hidden="true">↗</b></Link>)}</div>
      </section></Reveal>

      <Reveal><section className="hair-feature" aria-labelledby="hair-title">
        <div className="hair-feature-heading"><p className="eyebrow">Haarmedizin bei Melimedics</p><h2 id="hair-title">Haare ganzheitlich <em>betrachten.</em></h2><p>Vom ersten Gespräch über mögliche stärkende Behandlungen bis zur sorgfältig geplanten Haartransplantation.</p><Link className="button button-light" href="/haare/">Haarmedizin entdecken <Arrow/></Link></div>
        <ol className="hair-journey"><li><span>01</span><div><small>Verstehen</small><h3>Haarausfall einordnen</h3><p>Anamnese und persönliche Ausgangssituation geben die Richtung vor.</p></div></li><li><span>02</span><div><small>Stärken</small><h3>PRP Haare besprechen</h3><p>Ob PRP ein sinnvoller Baustein ist, wird individuell ärztlich geprüft.</p></div></li><li><span>03</span><div><small>Planen</small><h3>Haartransplantation</h3><p>Persönliche Beratung, realistische Planung und Nachsorge zusammendenken.</p></div></li></ol>
      </section></Reveal>

      <Reveal><section className="home-section process-home" aria-labelledby="process-title">
        <div className="home-section-head"><div><p className="eyebrow">Ihr Weg bei Melimedics</p><h2 id="process-title">Klar begleitet.<br/><em>Von Anfang an.</em></h2></div><p>Ein ruhiger, nachvollziehbarer Ablauf schafft die Grundlage für eine informierte Entscheidung.</p></div>
        <ol className="process-timeline">{process.map(([number,title,copy]) => <li key={number}><div className="timeline-marker"><span>{number}</span><i/></div><h3>{title}</h3><p>{copy}</p></li>)}</ol>
      </section></Reveal>

      <Reveal><Testimonials items={verifiedTestimonials}/></Reveal>

      <Reveal><section className="home-section home-faq" aria-labelledby="faq-title">
        <div className="home-section-head"><div><p className="eyebrow">Gut informiert entscheiden</p><h2 id="faq-title">Häufige <em>Fragen.</em></h2></div><p>Allgemeine Orientierung vor Ihrem persönlichen Beratungsgespräch.</p></div><FAQ items={generalFaq}/>
      </section></Reveal>

      <Reveal><section className="final-cta" aria-labelledby="final-cta-title"><div><p className="eyebrow">Persönliche Beratung</p><h2 id="final-cta-title">Welche Behandlung zu Ihnen passt, <em>klären wir persönlich.</em></h2></div><p>Vereinbaren Sie einen Termin für ein ärztliches Beratungsgespräch in Mainz.</p><div className="final-cta-actions"><Link className="button button-light" href="/termin/">Termin vereinbaren <Arrow/></Link><Link className="button button-ghost-light" href="/behandlungen/">Behandlungen ansehen <span aria-hidden="true">→</span></Link></div></section></Reveal>
    </main>
    <Footer/>
  </>;
}
