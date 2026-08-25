# Portabilität: GitHub → Build → IONOS

## Ergebnis

Das Projekt wurde in Phase 1B von der Vinext-/Cloudflare-Sites-Laufzeit auf Standard-Next.js umgestellt. Der Website-Code verwendet keine Cloudflare-only APIs.

## Entfernte Bindungen

- `vinext`
- `vite` und die Vite-RSC-Plugins
- `wrangler`
- `@cloudflare/vite-plugin`
- `@openai/sites-vite-plugin`
- Cloudflare Worker Entry Point
- `.openai/hosting.json`
- Cloudflare-/Sites-spezifische Build- und Start-Skripte

## Zielarchitektur

- Next.js App Router
- React und TypeScript
- standardmäßige Skripte `next dev`, `next build`, `next start`
- `output: "standalone"` für einen portablen Node.js-Produktionsprozess
- keine Datenbank, kein Storage und keine Serverless-Bindings

## IONOS-Anforderung

Empfohlen wird ein IONOS-Produkt, das einen dauerhaften Node.js-Prozess, Container oder VPS unterstützt. Nach `npm run build` kann der Standalone-Server über `.next/standalone/server.js` gestartet werden; zusätzlich werden `.next/static` und `public` benötigt.

Ein klassisches rein statisches Webhosting wäre nur nach einer separaten Export-Prüfung geeignet. Wegen der vorhandenen Next.js-Routen und serverseitigen Metadaten ist dies nicht die aktuelle Zielvariante.

## GitHub

Es wurde kein GitHub-Remote konfiguriert oder externer Push durchgeführt. Nach Bereitstellung des Kunden-Repositories kann der aktuelle lokale Stand regulär versioniert und über eine GitHub-Actions- oder IONOS-Build-Pipeline gebaut werden.
