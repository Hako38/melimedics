# Melimedics Phase 3A – Abschlussbericht

Stand: 26. August 2026

## 1. Submission

Der bestehende achtstufige Haar-Check bleibt unverändert als Client-Funnel erhalten. Erst der ausdrückliche Submit baut ein `multipart/form-data`-Paket und sendet es an die Same-Origin-Route `/api/hair-consultations/`. Dort werden Request, strukturierte Angaben, Einwilligungen und optionale Fotos erneut serverseitig validiert. Ein Erfolgszustand mit nicht personenbezogener `HC-…`-Referenz erscheint ausschließlich nach erfolgreicher Persistenz. Bei Fehlern bleiben die Eingaben und lokalen Foto-Previews erhalten und können erneut gesendet werden.

## 2. Gespeicherte Daten

Das Modell `HairConsultation` enthält sichere ID und Zeitstempel, Bearbeitungs-/Löschstatus, Altersgruppe, freiwillige Geschlechtsangabe, Dauer, betroffene Bereiche, Verlauf, aktuellen Haarverlust, bisherige Behandlungsarten und optionalen Hinweis, Interessen, gewünschten Zeitraum, Kontaktdaten, bevorzugten Kontaktweg, optionale Nachricht, Quelle, getrennte Consent-Nachweise mit serverseitigem Zeitstempel und Version sowie ausschließlich opake Foto-Referenzen. Es wird keine Diagnose, Eignungsbewertung, Graft-Zahl oder KI-Auswertung gespeichert. `medicalReviewStatus` bleibt ausdrücklich `needs_review`.

## 3. Aktueller Speicherort

Der sichere Default ist `disabled`: Ohne explizite Provider-Konfiguration wird nichts gespeichert und die API liefert keinen Fake-Erfolg. Mit `CONSULTATION_REPOSITORY=filesystem`, `STORAGE_PROVIDER=filesystem` und einem privaten `CONSULTATION_DATA_DIR` speichert der mitgelieferte Adapter Datensätze und Dateien außerhalb von `public`. Die QA nutzte ausschließlich ein isoliertes Verzeichnis unter `/private/tmp`; alle synthetischen Datensätze und Testbilder wurden danach gelöscht.

## 4. Foto-Storage-Abstraktion

`PrivateFileStorage` trennt privaten Binärspeicher vom `ConsultationRepository`. Der Filesystem-Adapter verwendet UUID-Dateinamen, nie Originaldateinamen, legt Verzeichnisse mit `0700` und Dateien mit `0600` an und erzeugt keine öffentlichen URLs. Die fünf festen Slots sind `front`, `top`, `left`, `right` und `back`. Ein späterer Object-Storage-Adapter kann dieselbe Schnittstelle implementieren.

## 5. Security

Umgesetzt sind Same-Origin-Prüfung, ausschließlich Multipart, Request-/Payload-/Dateigrößenlimits, Feld-Allowlist, Duplikat- und Slot-Prüfung, JPEG-/PNG-MIME-Abgleich mit Magic Bytes, Ablehnung leerer/falscher Dateien, sichere IDs, Pfadvalidierung, private Rechte, atomare JSON-Schreibvorgänge, Upload-Rollback, Rate Limiting mit gehashtem Identifier, Honeypot, sichere generische Fehlermeldungen, `no-store`, keine personenbezogenen Logs, keine sensitiven Analytics-Felder und keine Public-Download-Route. `FileContentScanner` ist vorbereitet und arbeitet bei erforderlichem, aber fehlendem Scanner fail-closed.

## 6. Einwilligungen

Consent A erfasst die Pflicht-Einwilligung zur Verarbeitung und Kontaktaufnahme. Consent B wird separat und nur bei ausgewählten Fotos verlangt. Akzeptanz, serverseitiger Zeitpunkt und konfigurierbare Textversion werden getrennt gespeichert. Die aktuellen Texte und Versionen bleiben bis zur juristischen Freigabe `needs_review`.

## 7. Löschung und Retention

Der interne Service stellt `deletePhoto`, `deleteConsultation` und `deleteExpiredConsultations` bereit. Foto-Löschung entfernt Binärdatei und Referenz; vollständige Löschung entfernt Fotos und Datensatz und schreibt eine minimale Tombstone-Quittung ohne personenbezogene Inhalte. `RETENTION_DAYS` ist konfigurierbar und ohne expliziten Wert deaktiviert. Produktion benötigt eine juristisch freigegebene Dauer und einen geplanten Job, der die Retention-Funktion ausführt. Back-up-Löschung muss beim Hosting separat geregelt werden.

## 8. Fehlende Mail-/Storage-Provider

`ConsultationNotifier` ist optional; ein Benachrichtigungsfehler macht eine bereits persistierte Anfrage nicht ungültig und Fotos werden nie verlinkt. Ein konkreter SMTP/API-Mailadapter, ein Malware-Scanner und gegebenenfalls ein privater Object-Storage-/Datenbankadapter fehlen bewusst bis zur Providerentscheidung. Der Filesystem-Adapter ist für eine einzelne kontrollierte Node-Instanz mit privatem persistentem Volume vorhanden.

## 9. IONOS-Anforderungen

Benötigt werden Node.js 22 LTS, eine dauerhaft laufende Standard-Next.js-Node-Runtime, HTTPS/Reverse Proxy, serverseitige Environment Variables, ein privates persistentes und beschreibbares Volume oder später privater Object Storage, Prozessrechte für `0700`/`0600`, ein Repository mit passenden Transaktions-/Back-up-Regeln sowie ein Mail- und Scanner-Dienst. Bei mehreren Instanzen sind gemeinsames Repository/Object Storage und ein verteilter Rate Limiter erforderlich. Details stehen in `docs/PORTABILITY-IONOS.md` und `.env.example`.

## 10. Rechtliche Freigaben

Offen sind finale Kontakt- und Foto-Einwilligungstexte samt Versionskennungen, Zwecke/Empfänger, freigegebene Aufbewahrungsfrist, Widerruf-/Löschprozess, Back-up-Regeln, TOMs, Provider/Region, Auftragsverarbeitung, Zugriffsrollen/Audits und die Datenschutz-/Risikobewertung. Diese Punkte sind im Content-Status weiterhin als `needs_review` beziehungsweise `missing` markiert.

## 11. Verifikation

- TypeScript: bestanden
- ESLint: bestanden
- Automatisierte Tests: 4 Testdateien bestanden; valide/ungültige Submission, Einwilligung, E-Mail, Dateityp/-größe, Scanner-, Upload-, Storage-/Rollback-, Notification-, Foto-/Komplettlöschung, Retention, Analytics und Serverfehler abgedeckt
- Production Build: bestanden; API-Route dynamisch gebaut
- Runtime-Audit: 27 Seiten, 37 interne Ziele und 8 Redirects bestanden
- Desktop: vollständiger Acht-Schritt-Flow bestanden
- Upload: hinzufügen, ersetzen, löschen und erneut hinzufügen bestanden
- Fehlerzustand: ohne Provider kein Erfolg, Daten für Retry erhalten
- Erfolgszustand: erst nach realer temporärer Persistenz, anschließend Testdaten gelöscht
- 390 px Mobile: nach behobenem Heading-Overflow und Fokusrahmen bestanden
- Browser-Konsole: leer
- API-Negativtests: fremder Origin `403`, falscher Content-Type `415`

## 12. Geänderte Dateien

- Konfiguration: `.env.example`, `.gitignore`, `package.json`, `package-lock.json`
- Client/UI: `app/_components/HairCheck.tsx`, `app/_data/hair-check.ts`, `app/_lib/hair-check-analytics.ts`, `app/_lib/hair-check-submission.ts`, `app/globals.css`
- Server/API: `app/_server/hair-consultations/core.ts`, `filesystem.ts`, `rate-limit.ts`, `runtime.ts`, `app/api/hair-consultations/route.ts`
- Dokumentation: `docs/HAIR-CHECK-PRODUCTION-REQUIREMENTS.md`, `docs/PORTABILITY-IONOS.md`, `docs/PHASE-3A-OPERATIONS.md`, diese Datei
- Tests: `tests/hair-check.test.mjs`, `tests/hair-consultation-server.test.mjs`, `tests/project-structure.test.mjs`

## 13. Lokaler Commit

Der finale lokale Commit und sein Hash werden nach Abschluss dieses Berichts erzeugt und im Übergabebericht genannt.

## 14. Veröffentlichung

Es wurde nichts veröffentlicht, keine Domain verändert und kein externer Dienst aktiviert. Phase 3A endet nach dem lokalen Commit. KI-Auswertung, Chatbot und Follow-up-Automatisierung wurden nicht implementiert.
