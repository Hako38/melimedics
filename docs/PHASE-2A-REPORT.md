# Melimedics Phase 2A · Abschlussbericht Behandlungsfinder

Stand: 26. August 2026

## 1. Technischer Aufbau

Der Finder ist eine einzelne interaktive Client-Komponente innerhalb der bestehenden Next.js-App. Kategorien, Anliegen, Folgefragen, Ergebnisgruppen, medizinische Freigabestatus und Mapping liegen zentral in `app/_data/treatment-finder.ts`. Die Oberfläche verwaltet nur den lokalen Sitzungszustand; zwischen den Schritten gibt es keinen Seitenreload, keine Speicherung und keine Datenübertragung.

Die reine Mapping- und Schrittlogik ist von der UI getrennt und automatisiert testbar. Ergebnisse werden auf maximal drei Gruppen begrenzt; ein neutraler Beratungs-Fallback verhindert leere Ergebniszustände.

## 2. Kategorien und Anliegen

- Gesicht: 13 Anliegen
- Haut: 9 Anliegen
- Haare: 9 Anliegen
- Körper & Gesundheit: 3 Anliegen
- Ich bin noch unsicher: direkter Weg in die allgemeine Beratung

Zusätzlich werden „Was ist Ihnen besonders wichtig?“ und „Wann möchten Sie starten?“ abgefragt. Der unsichere Pfad überspringt die Anliegenfrage und bleibt dadurch bewusst kürzer.

## 3. Mapping

35 Concern-IDs werden über 60 explizite Mapping-Einträge auf 16 neutrale Ergebnisgruppen abgebildet. Das Mapping basiert auf Bereichen, nicht auf Diagnosen oder Eignungsaussagen. Die Priorität „Zunächst nur Beratung“ stellt eine allgemeine Beratung vor mögliche Behandlungsbereiche; andere Präferenzen verändern die medizinische Zuordnung nicht automatisch.

## 4. `needs_review`

56 behandlungsbezogene Zuordnungen stehen konservativ auf `needs_review`. Dazu zählen insbesondere:

- mimische und anatomische Gesichtszuordnungen
- Augenbereich/Augenringe und Hautqualität
- Aknenarben, Pigmentierung, Poren, Hautalterung und Straffung
- alle Haarmuster sowie PRP- und Haartransplantationsperspektiven
- Gewichtsmanagement und diagnostische Beratung

Vier rein offene Beratungszuordnungen sind `approved`: allgemeine Beratung aus Gesicht, Haut und „unsicher“ sowie allgemeine Gesundheitsberatung. Der Status wird nicht öffentlich angezeigt und ist in den zentralen Content-Statusreport integriert.

## 5. Neue Komponenten und Module

- `TreatmentFinder.tsx`: barrierearme Schrittoberfläche, Ergebnisse und Steuerung
- `treatment-finder.ts`: Kategorien, Anliegen, Fragen, Ergebnisse, Mapping und Zustandslogik
- `finder-analytics.ts`: lokale, typisierte Event-Abstraktion ohne Netzwerkrequest
- `/behandlungsfinder/`: SEO-fähige Route mit Canonical, Breadcrumb und Sicherheitskommunikation
- `treatment-finder.test.mjs`: Datenmodell-, Mapping-, Journey- und Zustandsmaschinentests

## 6. Refactorings

- `CategoryPage` unterstützt gezielt einen Finder-Einstieg für Gesicht und Haut & Laser.
- Startseite, Behandlungsübersicht und Haarmedizin erhielten zurückhaltende Finder-CTAs.
- Sitemap und zentraler Content-Freigabereport wurden um Phase 2A erweitert.
- Das Responsive-CSS wurde nur um finder-spezifische Regeln ergänzt; das Phase-1-Designsystem blieb unverändert.

## 7. Vorbereitete Analytics-Events

- `finder_started`
- `category_selected`
- `finder_completed`
- `result_clicked`
- `booking_clicked`

Die Events werden ausschließlich als lokales `CustomEvent` ausgelöst. Es gibt keine Google-/Meta-Skripte, Cookies, Beacon-, Fetch- oder sonstige Tracking-Requests.

## 8. Qualitätssicherung

- TypeScript: bestanden
- ESLint: bestanden
- Struktur- und Mappingtests: bestanden
- Production Build: bestanden
- Runtime-Audit: 26 indexierbare Seiten, 36 interne Ziele und 8 permanente Redirects im finalen Standalone-Build bestanden
- Browser-Konsole: keine Fehler oder Warnungen
- Responsive: 360, 390, 430, 768, 1280 und 1600 px ohne horizontalen Überlauf

## 9. Geprüfte User Journeys

- Gesicht → Stirnfalten → Botulinumtoxin
- Gesicht → Lippen → Hyaluronsäure
- Haut → Aknenarben → CO₂-Laser / Microneedling
- Haare → Geheimratsecken → Haarberatung / PRP Haare / Haartransplantationsberatung
- Haare → Interesse an Haartransplantation
- Körper & Gesundheit → Blutuntersuchungen / Diagnostik
- Unsicher → allgemeine ärztliche Beratung

Zusätzlich geprüft: Zurück-Funktion mit erhaltener Auswahl, Auswahländerung, Neustart, native Radio-Semantik, Fokusführung, Touch-Targets, Sicherheits-Hinweis und mobile Ergebnisdarstellung.

## 10. Blocker

Es bestehen keine technischen Blocker. Vor einer Veröffentlichung müssen die 56 behandlungsbezogenen Mapping-Zuordnungen ärztlich freigegeben oder angepasst werden. Der Finder gibt bis dahin bewusst nur mögliche Gesprächsbereiche aus und formuliert keine Diagnose, Eignungsbestätigung oder verbindliche Empfehlung.

Phase 2B und Phase 3 wurden nicht vorweggenommen. Es gibt keinen Foto-Upload, keine Haaranalyse, keine KI, kein Lead-Scoring, kein CRM und keine Automation.

## 11. Git

Der lokale Commit-Hash wird in der Abschlussantwort genannt, da ein Commit seinen eigenen finalen Hash nicht stabil in seiner Inhaltsdatei speichern kann.

## 12. Screenshots

- `melimedics-phase-2a-finder-desktop.png`
- `melimedics-phase-2a-finder-mobile.png`

Es wurde nichts deployt, veröffentlicht oder an der Produktionsdomain verändert.
