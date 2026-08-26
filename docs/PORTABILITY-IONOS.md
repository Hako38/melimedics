# Portabilität: GitHub → Build → IONOS

Stand: Phase 1D · 25. August 2026

## Ergebnis

Das Projekt verwendet Standard-Next.js 16 mit App Router, React und TypeScript. `output: "standalone"` erzeugt einen portablen Node.js-Server. Es gibt keine Cloudflare-, Vercel-, OpenAI-Sites-, Worker-, Datenbank- oder Storage-Bindung und keine absoluten lokalen Dateipfade im Anwendungscode.

## A) Anforderungen an das IONOS-Hostingpaket

Empfohlen ist ein IONOS-Paket mit diesen Eigenschaften:

- dauerhaft laufender Node.js-Prozess oder alternativ Container/VPS
- Node.js 22.13 oder neuer
- Build-Schritt mit `npm ci` und `npm run build`
- Startmöglichkeit für `.next/standalone/server.js`
- Bereitstellung von `.next/static` und `public` neben dem Standalone-Server
- HTTPS/SSL, eigene Domain und konfigurierbare Environment Variables
- Reverse Proxy auf den Node-Port sowie kontrollierte Neustarts/Healthchecks
- ausreichender Dateispeicher für Build-Artefakte und spätere Upload-Strategien

Für Produktion werden mindestens folgende Werte gesetzt:

```text
NODE_ENV=production
SITE_ENV=production
SITE_URL=https://melimedics.de
```

Preview/Staging verwendet `SITE_ENV=staging` oder `development`; dadurch erzeugen Metadata und `robots.txt` automatisch `noindex`/Crawling-Sperren.

## B) Statischer Frontend-Build als Alternative

Der aktuelle Phase-1-Stand besteht überwiegend aus statisch generierten Seiten und könnte technisch separat auf `output: "export"` geprüft werden. Diese Umstellung wurde bewusst nicht vorgenommen. Vor einem statischen Export müssten insbesondere dynamische Metadata-Routen, Header/CSP-Auslieferung, Redirects, 404-Verhalten und die spätere Produkt-Roadmap gegen die Möglichkeiten des konkreten IONOS-Pakets geprüft werden.

Ein statischer Export wäre nur als bewusst begrenzte Phase-1-Variante sinnvoll. Security-Header und Redirects müssten dann auf Webserver-/Hostingebene nachgebildet werden.

## C) Serverseitige Anforderungen in Phase 2/3

Folgende geplante Funktionen benötigen voraussichtlich einen Node-/Backend-Teil oder angebundene Dienste:

- KI-Assistent und sichere serverseitige Modellaufrufe
- Formulare mit Validierung, Spam-Schutz und sicherer Übertragung
- Foto-Uploads inklusive Dateiprüfung, Zugriffsschutz und Storage
- CRM- und Termin-Schnittstellen
- Behandlungsfinder/Haar-Check mit serverseitiger Logik, sobald personenbezogene Daten verarbeitet werden
- Follow-up-Automatisierungen, Webhooks und Hintergrundprozesse
- serverseitiges Consent-/Conversion-Tracking, falls später fachlich und rechtlich beschlossen

API-Schlüssel und Secrets dürfen ausschließlich als serverseitige Environment Variables gepflegt werden. Sie gehören weder ins Repository noch in `NEXT_PUBLIC_*`-Variablen.

## Deployment-Hinweis

In Phase 1D wurde keine Migration, kein Deployment und keine Domainänderung durchgeführt. Vor dem Relaunch folgen ein IONOS-Testdeployment, SSL-/Header-Prüfung, finaler Redirect-Crawl sowie medizinische, rechtliche und redaktionelle Freigaben.
