# Portabilität: GitHub → Build → IONOS

Stand: Phase 3A · 26. August 2026

## Ergebnis

Das Projekt verwendet Standard-Next.js 16 mit App Router, React und TypeScript. `output: "standalone"` erzeugt einen portablen Node.js-Server. Es gibt keine Cloudflare-, Vercel-, OpenAI-Sites- oder Worker-Bindung. Phase 3A ergänzt providerneutrale Repository-, private Storage-, Scanner- und Notification-Interfaces.

## A) Anforderungen an das IONOS-Hostingpaket

Empfohlen ist ein IONOS-Paket mit diesen Eigenschaften:

- dauerhaft laufender Node.js-Prozess oder alternativ Container/VPS
- Node.js 22.13 oder neuer
- Build-Schritt mit `npm ci` und `npm run build`
- Startmöglichkeit für `.next/standalone/server.js`
- Bereitstellung von `.next/static` und `public` neben dem Standalone-Server
- HTTPS/SSL, eigene Domain und konfigurierbare Environment Variables
- Reverse Proxy auf den Node-Port sowie kontrollierte Neustarts/Healthchecks
- ein nicht öffentlich ausgeliefertes, persistentes Datenverzeichnis oder ein angebundener privater Object Storage
- Schreibrechte ausschließlich für den Node-Prozess; empfohlene Verzeichnis-/Dateirechte `0700`/`0600`
- externe Back-ups nur mit dokumentierter Verschlüsselungs-, Retention- und Löschstrategie

Für Produktion werden mindestens folgende Werte gesetzt:

```text
NODE_ENV=production
SITE_ENV=production
SITE_URL=https://melimedics.de
STORAGE_PROVIDER=filesystem
CONSULTATION_REPOSITORY=filesystem
CONSULTATION_DATA_DIR=/absoluter/nicht-oeffentlicher/persistenter/pfad
REQUIRE_MALWARE_SCAN=true
RETENTION_DAYS=<rechtlich-freigegebener-wert>
RATE_LIMIT_SALT=<secret>
```

Zusätzlich werden Consent-Versionen, Mailprovider/-absender/-empfänger und gegebenenfalls Storage-/Scanner-Zugangsdaten ausschließlich als serverseitige Environment Variables gesetzt. Die vollständige Liste steht in `.env.example`.

Preview/Staging verwendet `SITE_ENV=staging` oder `development`; dadurch erzeugen Metadata und `robots.txt` automatisch `noindex`/Crawling-Sperren.

## B) Statischer Frontend-Build als Alternative

Der aktuelle Phase-1-Stand besteht überwiegend aus statisch generierten Seiten und könnte technisch separat auf `output: "export"` geprüft werden. Diese Umstellung wurde bewusst nicht vorgenommen. Vor einem statischen Export müssten insbesondere dynamische Metadata-Routen, Header/CSP-Auslieferung, Redirects, 404-Verhalten und die spätere Produkt-Roadmap gegen die Möglichkeiten des konkreten IONOS-Pakets geprüft werden.

Ein statischer Export wäre nur als bewusst begrenzte Phase-1-Variante sinnvoll. Security-Header und Redirects müssten dann auf Webserver-/Hostingebene nachgebildet werden.

## C) Serverseitige Anforderungen ab Phase 3A

Folgende geplante Funktionen benötigen voraussichtlich einen Node-/Backend-Teil oder angebundene Dienste:

- KI-Assistent und sichere serverseitige Modellaufrufe
- serverseitige Schema-, Request- und Same-Origin-Validierung
- private Foto-Uploads inklusive Magic-Byte-/MIME-Prüfung, Zugriffsschutz und zufälliger Dateinamen
- persistent laufender Node-Prozess; serverlose/ephemere Dateisysteme sind für den Filesystem-Adapter ungeeignet
- bei mehreren Instanzen: gemeinsames transaktionales Repository, privater Object Storage und verteilter Rate Limiter statt lokaler Dateien/In-Memory-Buckets
- CRM- und Termin-Schnittstellen
- Behandlungsfinder/Haar-Check mit serverseitiger Logik, sobald personenbezogene Daten verarbeitet werden
- Follow-up-Automatisierungen, Webhooks und Hintergrundprozesse
- serverseitiges Consent-/Conversion-Tracking, falls später fachlich und rechtlich beschlossen

Der mitgelieferte Filesystem-Adapter ist für eine kontrollierte einzelne Node-Instanz mit persistentem privatem Volume geeignet. Für Hochverfügbarkeit wird später ein datenbankgestütztes `ConsultationRepository` plus privater Object Storage empfohlen. API-Schlüssel und Secrets dürfen ausschließlich als serverseitige Environment Variables gepflegt werden. Sie gehören weder ins Repository noch in `NEXT_PUBLIC_*`-Variablen.

## Deployment-Hinweis

In Phase 1D wurde keine Migration, kein Deployment und keine Domainänderung durchgeführt. Vor dem Relaunch folgen ein IONOS-Testdeployment, SSL-/Header-Prüfung, finaler Redirect-Crawl sowie medizinische, rechtliche und redaktionelle Freigaben.
