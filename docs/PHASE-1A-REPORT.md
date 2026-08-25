# Melimedics Relaunch · Abschluss Phase 1A

Stand: 25. August 2026

## 1. Vorgefundene Architektur

Im bereitgestellten Workspace war kein bestehendes Website-Projekt vorhanden. Deshalb konnten weder Theme-Dateien noch CMS-Export, Komponenten oder Quellcode des Bestands technisch geprüft werden. Der öffentlich sichtbare Bestand wurde als WordPress-/Template-geprägte Website eingeordnet; für Phase 1A wurde ein neues, schlankes Next-/React-Fundament auf Vinext und Cloudflare Sites angelegt.

## 2. Gefundene Altlasten und Demo-Inhalte

- Englische Template-Sektionen wie „Meet our experts“ und „Success Stories“
- erfundene Beispielbewertungen mit Namen wie Sarah J. und Michael T.
- widersprüchliche Bewertungszahlen (mehr als 100 bzw. 250)
- widersprüchliche Adressdaten: 55122 und 55124 Mainz
- abweichende Verantwortlichenadresse in der alten Datenschutzerklärung
- wiederholte Footer-Links und Tippfehler in Texten/Slugs
- unklare bzw. nicht freigegebene medizinische Fakten und Preisangaben

## 3. Entfernt oder refactored

- keine Demo-Bewertungen oder Statistik-Counter übernommen
- keine Demo-Ärzte oder Stock-Personen eingesetzt
- Header, Desktop- und Mobile-Navigation, Footer, Hero, Kategorien-, Behandlungs-, Preis-, FAQ-, Fakten-, Vertrauens-, CTA- und Breadcrumb-Komponenten neu strukturiert
- semantische Seitenstruktur, responsive Layouts und Reduced-Motion-Basis ergänzt
- Social-Preview und Favicon auf Melimedics ausgerichtet

## 4. Neue Sitemap

- `/`
- `/behandlungen/`
- `/behandlungen/gesicht/`
- `/behandlungen/haut-laser/`
- `/behandlungen/prp/`
- `/haare/`
- `/gesundheit/`
- `/kosmetik/`
- `/preise/`
- `/arzt-praxis/`
- `/ratgeber/`
- `/termin/`
- `/kontakt/`
- `/impressum/`
- `/datenschutz/`

## 5. Komponenten

`Header`, `Footer`, `MobileMenu`, `InteriorHero`, `SectionHeader`, `CategoryCard`, `TreatmentCard`, `DoctorTrust`, `CTA`, `FAQ`, `PriceRow`, `Breadcrumbs`, `TreatmentTemplate` und ein typisiertes `TreatmentContent`-Modell.

## 6. Zu erhaltende SEO-URLs

Gefundene Alt-URLs werden dauerhaft weitergeleitet: `/botox/`, `/gesichtsbehandlung/`, `/ueber-uns/`, `/prp-prf-therapie/`, `/mediziniches-schroepfen/`, `/infusionstherapie/`, `/fett-weg-spritze/` und `/datenschutzerklaerung/`. Vor Domain-Umschaltung ist ein vollständiger Crawl der produktiven Website erforderlich.

## 7. Offene medizinische Inhalte und Preise

Medizinisch zu prüfen und freizugeben sind insbesondere Indikationen, Kontraindikationen, Risiken, Ausfallzeiten, Wirkungsbeginn, Haltbarkeit/Sitzungsanzahl, Nachsorge, Geräte-/Produktangaben, Qualifikationen sowie sämtliche Preise.

## 8. Technische Blocker

Kein Blocker für die Phase-1A-Vorschau. Vor Produktivgang fehlen der vollständige Bestands-Crawl, originale Praxis-/Arztfotografie, freigegebene Vita/Qualifikationen, konsistente Anschrift und rechtlich geprüfte Pflichttexte.

## 9. Wesentlich veränderte Dateien

- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `app/_components/SiteShell.tsx`
- `app/_components/CategoryPage.tsx`
- `app/_components/TreatmentTemplate.tsx`
- alle neuen Routen unter `app/`
- `app/sitemap.ts`, `app/robots.ts`
- `public/og.png`, `public/favicon.png`

## 10. Qualität

Build, Lint und Typecheck laufen fehlerfrei. Render-Tests für Startseite und eine repräsentative Behandlungsseite bestehen. Alle 15 Zielrouten antworten mit HTTP 200; acht geprüfte Alt-URLs liefern permanente HTTP-308-Weiterleitungen.
