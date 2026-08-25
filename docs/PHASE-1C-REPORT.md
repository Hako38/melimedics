# Melimedics Relaunch · Abschluss Phase 1C

Stand: 25. August 2026

## 1. Fertiggestellte Seiten

Vollständig neu aufgebaut wurden Behandlungsübersicht, Ästhetik/Gesicht, Haut & Laser, PRP, Haarmedizin, Gesundheit, Kosmetik, Preise, Arzt & Praxis, Termin und Kontakt. Ergänzt wurden 13 statisch generierte Detailseiten für Botulinumtoxin, Hyaluronsäure, Biostimulatoren, Polynukleotide, CO₂-Laser, Tattoo-Laser, HIFU, PRP-Behandlung, PRP Haare, Haarausfall, Haartransplantation, Microneedling und Aquafacial.

## 2. Behandlungstemplate

`TreatmentTemplate` rendert Hero, Anliegen, Erklärung, Fakten, Ablauf, Vorteile, Risiken, Preis, Arztvertrauen, FAQ, verwandte Behandlungen und Termin-CTA ausschließlich dann, wenn der jeweilige Inhalt vorhanden ist. Leere oder noch nicht freigegebene Module erscheinen nicht öffentlich.

## 3. Haarbereich

Haarmedizin besitzt eine eigenständige dunkle visuelle Bühne und drei klar verlinkte Wege: Haarausfall verstehen, Haare mit PRP stärken und Haartransplantation als operative Option nach Beratung. Die Haartransplantationsseite enthält Beratung, Planung, Eingriff, Heilungsphase, Nachsorge, FAQ und CTA, ohne Operateur, Methode, Standort, Graft-Zahl oder Preis zu erfinden.

## 4. Fehlende medizinische Inhalte

Offen bleiben insbesondere freigegebene Indikationen, Differenzialdiagnostik, Kontraindikationen, Risiken, Wirkprinzipien, Produkte/Geräte, Behandlungsparameter, Sitzungsanzahlen, Ergebnisentwicklung, Ausfallzeiten sowie Vor- und Nachsorge. Die konkreten TODOs liegen pro Behandlung ausschließlich im Datenmodell.

## 5. Fehlende Preise

Es liegt keine freigegebene Preisliste vor. Alle neun Kategorien und ihre Leistungen sind zentral strukturiert; `price` bleibt `null`, bis medizinische und kaufmännische Freigaben vorliegen. Es werden keine Schätzwerte oder Fake-Zahlen angezeigt.

## 6. Fehlende Arzt- und Praxisinformationen

Zu bestätigen sind vollständiger Name, Berufsbezeichnung/Titel, Vita, Qualifikationen, Weiterbildungen, Tätigkeitsschwerpunkte, Originalporträt, Praxisfotografie, Praxisteam und weitere Praxisinformationen.

## 7. Zu bestätigende Kontaktdaten

Telefon, E-Mail und Standort Mainz-Gonsenheim werden zentral als verifiziert geführt. Straße, Hausnummer, Postleitzahl, Öffnungszeiten, Maps-Link und konkrete Anfahrt bleiben wegen der widersprüchlichen Bestandsanschrift verborgen. Auch die Rechtstexte geben diese Daten nicht mehr ungeprüft aus.

## 8. Zentrale Content-Struktur

`app/_data/treatments.ts` enthält typisierte Behandlungsobjekte mit `slug`, `title`, `category`, `shortDescription`, `hero`, `concerns`, `facts`, `procedure`, `benefits`, `risks`, `price`, `faq`, `relatedTreatments`, `bookingType`, `medicalApprovalStatus` und internen `contentTodos`. Der Freigabestatus unterstützt `approved`, `needs_review` und `missing` und wird nicht öffentlich angezeigt. Preise und Praxisdaten besitzen eigene zentrale Modelle.

## 9. SEO

Alle Phase-1C-Zielseiten besitzen eindeutigen Title, Meta Description und Canonical. Detailseiten generieren ihre Metadaten aus dem zentralen Content-Modell. Jede Seite nutzt genau eine H1, semantische Überschriften, Breadcrumbs und kontextbezogene interne Links. Die Sitemap enthält alle 13 Detailseiten; bestehende Redirects wurden nicht verändert.

## 10. Qualität

ESLint, TypeScript-Typecheck, automatisierte Tests und der optimierte Next.js-Production-Build sind erfolgreich. Der Build erzeugt 40 statische Seiten. 28 Zielrouten liefern HTTP 200, acht Legacy-Routen liefern HTTP 308 mit korrektem Ziel, und der Planity-Link liefert HTTP 200. Browser-QA erfolgte auf 390, 834, 1280 und 1440 Pixel Breite einschließlich Mobile-Menü, FAQ-Akkordeon, Touch-Zielen, Überschriften, Links und horizontalem Overflow.

## 11. Technische Blocker

Es besteht kein technischer Blocker für Phase 1C. Vor Veröffentlichung bleiben medizinische, kaufmännische, rechtliche sowie Praxis-/Adressfreigaben erforderlich. Der Production-Build benötigt beim ersten Build Zugriff auf die verwendeten Google-Font-Dateien; Next.js bündelt sie anschließend lokal.

## 12. Wesentlich geänderte Dateien

- `app/_data/treatments.ts`, `app/_data/practice.ts`, `app/_data/home.ts`
- `app/_components/TreatmentTemplate.tsx`, `app/_components/CategoryPage.tsx`, `app/_components/SiteShell.tsx`, `app/_components/SiteHeader.tsx`
- `app/behandlungen/page.tsx`, `app/behandlungen/[slug]/page.tsx` und alle Kategorie-Routen
- `app/haare/page.tsx`, `app/gesundheit/page.tsx`, `app/kosmetik/page.tsx`
- `app/preise/page.tsx`, `app/arzt-praxis/page.tsx`, `app/termin/page.tsx`, `app/kontakt/page.tsx`
- `app/globals.css`, `app/sitemap.ts`, `tests/project-structure.test.mjs`

## 13. Preview

Screenshots wurden für die Behandlungsübersicht, den Haarmedizin-Hero, die Haartransplantationsseite und die mobile Haarmedizin erstellt. Die lokale Vorschau bleibt auf `http://localhost:3000/`; es wurde nichts veröffentlicht.
