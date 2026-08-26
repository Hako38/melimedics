import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, PageShell } from "./_components/SiteShell";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  description: "Die angeforderte Seite wurde nicht gefunden.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <PageShell><section className="error-state" aria-labelledby="not-found-title"><p className="eyebrow">Fehler 404</p><h1 id="not-found-title">Diese Seite ist<br/><em>nicht mehr hier.</em></h1><p>Die Adresse ist möglicherweise veraltet oder wurde nicht korrekt eingegeben. Über die folgenden Wege finden Sie sicher weiter.</p><div><Link className="button button-dark" href="/">Zur Startseite <Arrow/></Link><Link className="button button-secondary" href="/behandlungen/">Behandlungen ansehen</Link><Link className="button button-secondary" href="/termin/">Termin buchen</Link></div></section></PageShell>;
}
