# Melimedics · Relaunch-Checkliste

Diese Liste muss vor Domainumschaltung vollständig abgearbeitet und dokumentiert werden.

## Medizinische Freigaben

- [ ] Risiken je Behandlung freigeben
- [ ] Kontraindikationen je Behandlung freigeben
- [ ] Wirkungsinformationen und Ergebnisentwicklung prüfen
- [ ] Behandlungsmethoden und Abläufe bestätigen
- [ ] Produkte und Geräte verifizieren
- [ ] Vor- und Nachsorgehinweise freigeben

## Praxisdaten

- [ ] vollständige Straße und Hausnummer bestätigen
- [ ] korrekte Postleitzahl bestätigen
- [ ] Öffnungs-/Sprechzeiten freigeben
- [ ] Maps-Eintrag und Kartenlink bestätigen
- [ ] Telefonnummer erneut gegen Primärquelle prüfen
- [ ] E-Mail-Adresse erneut gegen Primärquelle prüfen

## Arzt

- [ ] vollständigen Namen bestätigen
- [ ] Titel und Berufsbezeichnung bestätigen
- [ ] Vita freigeben
- [ ] Qualifikationen verifizieren
- [ ] Fortbildungen verifizieren
- [ ] Tätigkeitsschwerpunkte freigeben

## Kaufmännisch

- [x] 34 veröffentlichte Planity-Preise und „Ab“-Preise übernehmen (Stand 01.09.2026)
- [x] bei Planity ausgewiesenen PRP-Paketpreis übernehmen
- [ ] nicht bei Planity ausgewiesene Beratungs-, Paket- und Serienpreise intern prüfen
- [ ] Buchungs-, Storno- und Zahlungsregeln freigeben

## Medien

- [ ] freigegebenes Arztporträt bereitstellen
- [ ] freigegebene Praxisbilder bereitstellen
- [ ] Teamdarstellung und Einwilligungen klären
- [ ] gegebenenfalls Behandlungsmaterial rechtlich und medizinisch prüfen
- [ ] Bildausschnitte, responsive Größen und Alt-Texte final prüfen

## Rechtlich

- [ ] Impressum anwaltlich/rechtlich finalisieren
- [ ] Datenschutzerklärung für IONOS und tatsächlich eingesetzte Dienste finalisieren
- [ ] Consent-Lösung vor jedem optionalen Tracking implementieren
- [x] Planity-Verlinkung und Datenschutzhinweis an die aktuelle Website anpassen
- [ ] externe rechtliche Prüfung dokumentieren

## Technisch

- [ ] IONOS-Paket mit Node.js-/Container-Unterstützung bestätigen
- [ ] Testdeployment mit `SITE_ENV=staging` durchführen und noindex prüfen
- [ ] Production-Variablen und Secret-Verwaltung konfigurieren
- [ ] Domain und DNS-Umschaltung planen
- [ ] SSL-Zertifikat und HTTPS-Weiterleitung prüfen
- [ ] Security-Header und CSP auf IONOS verifizieren
- [ ] vollständigen Live-URL-Crawl und Redirect-Mapping abgleichen
- [ ] Analytics/Ads nur nach Consent- und Rechtsfreigabe aktivieren
- [ ] Search Console einrichten und Property bestätigen
- [ ] finale Sitemap einreichen
- [ ] Backup- und Rollback-Plan dokumentieren
