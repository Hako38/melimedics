"use client";

import Link from "next/link";
import { Arrow, Footer, Header } from "./_components/SiteShell";

export default function ErrorState({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <><Header/><main id="main-content"><section className="error-state" aria-labelledby="error-title"><p className="eyebrow">Technischer Hinweis</p><h1 id="error-title">Etwas ist<br/><em>schiefgelaufen.</em></h1><p>Die Seite konnte gerade nicht vollständig geladen werden. Versuchen Sie es erneut oder wählen Sie einen der sicheren Wege zurück.</p><div><button className="button button-dark" type="button" onClick={reset}>Erneut versuchen <Arrow/></button><Link className="button button-secondary" href="/">Zur Startseite</Link><Link className="button button-secondary" href="/termin/">Termin buchen</Link></div></section></main><Footer/></>;
}
