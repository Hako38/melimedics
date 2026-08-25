import Link from "next/link";
import { Arrow, CTA, DoctorTrust, Footer, Header } from "./_components/SiteShell";

export default function Home() {
  return (
    <>
      <Header/>
      <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Privatpraxis für Ästhetik, Haut &amp; Haare</p>
          <h1>Medizinische Präzision. <em>Natürlich Sie.</em></h1>
          <p className="hero-intro">Ärztliche Ästhetik, Haut- und Haarmedizin aus einer Hand – mit persönlicher Beratung und Nachsorge in Mainz.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/termin/">Beratung vereinbaren <Arrow /></Link>
            <Link className="text-link" href="/behandlungen/">Behandlungen entdecken <span>→</span></Link>
          </div>
          <div className="trust-line">
            <span><b>Ärztlich</b> geführt</span>
            <span><b>Individuell</b> beraten</span>
            <span><b>Persönlich</b> begleitet</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Melimedics Praxis in Mainz">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-card">
            <span className="visual-number">01</span>
            <p>Beratung vor Behandlung</p>
            <small>Indikation, Wünsche und ein realistischer Behandlungsplan stehen am Anfang.</small>
          </div>
          <div className="visual-monogram">M</div>
          <p className="visual-caption">MELIMEDICS<br/><span>MAINZ · GONSENHEIM</span></p>
        </div>
      </section>

      <section className="focus" aria-labelledby="focus-title">
        <div className="section-heading">
          <p className="eyebrow">Drei medizinische Schwerpunkte</p>
          <h2 id="focus-title">Was dürfen wir<br/><em>für Sie tun?</em></h2>
        </div>
        <div className="focus-grid">
          <Link href="/behandlungen/gesicht/" className="focus-card focus-card-dark">
            <span>01</span><h3>Ästhetische<br/>Medizin</h3><p>Individuell geplante Behandlungen für natürliche Proportionen und einen frischen Ausdruck.</p><strong>Mehr erfahren <Arrow /></strong>
          </Link>
          <Link href="/behandlungen/haut-laser/" className="focus-card">
            <span>02</span><h3>Haut &amp;<br/>Laser</h3><p>Ärztlich begleitete Konzepte für Hautbild, Struktur und ausgewählte Indikationen.</p><strong>Mehr erfahren <Arrow /></strong>
          </Link>
          <Link href="/haare/" className="focus-card focus-card-accent">
            <span>03</span><h3>Haare &amp;<br/>Haarwurzel</h3><p>Diagnostik und Behandlungswege bei Haarausfall – bis zur Haartransplantation.</p><strong>Mehr erfahren <Arrow /></strong>
          </Link>
        </div>
      </section>
      <section className="promise-section">
        <p className="eyebrow">Unser Behandlungsverständnis</p>
        <blockquote>„Das Ziel ist nicht, anders auszusehen. Sondern sich mit einem medizinisch sinnvollen Ergebnis wieder ganz wie man selbst zu fühlen.“</blockquote>
        <div><span>01 · Verstehen</span><span>02 · Aufklären</span><span>03 · Behandeln</span><span>04 · Nachsorgen</span></div>
      </section>
      <DoctorTrust/>
      <CTA/>
      </main>
      <Footer/>
    </>
  );
}
