# Melimedics Website · Phase 1D

Portables Standard-Next.js-Projekt für den Relaunch von Melimedics.de.

## Aktueller Umfang

- Designsystem mit zentralen Farben, Typografie-, Spacing-, Grid-, Radius-, Shadow- und Motion-Tokens
- vollständige mobile-first Website mit Startseite, Kategorien und 13 Treatment-Detailseiten
- typisierte Behandlungs-, Preis-, Praxis-, Medien- und Freigabemodelle
- technisches SEO mit Environment-gesteuertem Indexing, Sitemap, Canonicals und Structured Data
- Security-Header, CSP, Skip-Link, Fehlerseiten und erweiterte Qualitätsprüfungen
- bestehende SEO-Weiterleitungen aus Phase 1A
- keine Phase-2-Funktionen: kein Behandlungsfinder, keine KI, kein Haar-Check, kein CRM

## Lokale Entwicklung

Voraussetzung: Node.js 22.13 oder neuer.

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run test:runtime
npm run build
```

Die lokale Vorschau und Staging-Builds bleiben mit `SITE_ENV=development` beziehungsweise `staging` nicht indexierbar. Erst ein freigegebener Produktionsbuild verwendet `SITE_ENV=production`. Beispielwerte stehen in `.env.example`.

## Deployment-Ziel

Das Projekt verwendet Standard-Next.js mit `output: "standalone"` und enthält keine Cloudflare-, Vinext-, Wrangler- oder OpenAI-Sites-Laufzeitabhängigkeit. Dadurch kann der Quellcode über GitHub gebaut und auf einem IONOS-Angebot mit Node.js-Unterstützung betrieben werden.

Für statisches IONOS-Webhosting wäre vorab zu prüfen, ob alle dynamischen Next.js-Funktionen entfallen können. Die aktuelle Empfehlung ist ein IONOS-Produkt mit Node.js-Prozess oder Container/VPS, auf dem `.next/standalone/server.js` gestartet werden kann.

Weitere Dokumentation: `docs/PORTABILITY-IONOS.md`, `docs/RELAUNCH-CHECKLIST.md`, `docs/SEO-REDIRECTS.md` und `docs/CONTENT-TODOS.md`.
