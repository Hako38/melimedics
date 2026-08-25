# Melimedics Website · Phase 1B

Portables Standard-Next.js-Projekt für den Relaunch von Melimedics.de.

## Aktueller Umfang

- Designsystem mit zentralen Farben, Typografie-, Spacing-, Grid-, Radius-, Shadow- und Motion-Tokens
- vollständig neu gestaltete mobile-first Startseite
- bestehende Informationsarchitektur, Rechtsseiten und SEO-Weiterleitungen aus Phase 1A
- typisiertes Behandlungsmodell und wiederverwendbare Komponenten
- keine Phase-2-Funktionen: kein Behandlungsfinder, keine KI, kein Haar-Check, kein CRM

## Lokale Entwicklung

Voraussetzung: Node.js 22.13 oder neuer.

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

## Deployment-Ziel

Das Projekt verwendet Standard-Next.js mit `output: "standalone"` und enthält keine Cloudflare-, Vinext-, Wrangler- oder OpenAI-Sites-Laufzeitabhängigkeit. Dadurch kann der Quellcode über GitHub gebaut und auf einem IONOS-Angebot mit Node.js-Unterstützung betrieben werden.

Für statisches IONOS-Webhosting wäre vorab zu prüfen, ob alle dynamischen Next.js-Funktionen entfallen können. Die aktuelle Empfehlung ist ein IONOS-Produkt mit Node.js-Prozess oder Container/VPS, auf dem `.next/standalone/server.js` gestartet werden kann.

Weitere Dokumentation: `docs/PHASE-1B-REPORT.md`, `docs/PORTABILITY-IONOS.md`, `docs/SEO-REDIRECTS.md` und `docs/CONTENT-TODOS.md`.
