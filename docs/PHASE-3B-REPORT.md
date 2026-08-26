# Melimedics Phase 3B – Abschlussbericht

Stand: 26. August 2026

## 1. AIProvider-Abstraktion

`AIProvider` definiert die drei getrennten Serverfunktionen `generateAssistantResponse()`, `classifyInquiry()` und `summarizeConsultation()`. `DisabledAIProvider` ist der sichere Default. Der optionale `GenericJsonAIProvider` nutzt ohne Browser-SDK einen konfigurierbaren serverseitigen HTTPS-JSON-Vertrag. Aktivierung setzt `AI_ENABLED=true`, `AI_PROVIDER=generic-json`, Endpoint, Modell und API-Key voraus. Unvollständige oder unsichere Konfiguration fällt auf `disabled` zurück.

## 2. Öffentlicher Praxisassistent

Der „Melimedics Assistent“ wird global als eigener dynamischer Chunk nach Leerlauf geladen. Desktop zeigt einen dezenten Launcher unten rechts; Mobile einen kompakten runden Launcher ohne Kollision mit der Termin-CTA. Das Panel bietet fünf Startvorschläge, kurze Antworten, sichere interne Actions, Eingabe, Lade- und Fehlerzustand sowie Escape-/Close-Bedienung. Der Chat existiert nur im React-State der aktiven Seite.

## 3. Erlaubte Inhalte

Der Assistent darf nur typisierte Einträge aus der serverseitigen Melimedics-Wissensbasis verwenden. Quellen sind bestehende Praxis-, Navigations-, Treatment-, FAQ- und Preisdaten. Providerkontext enthält ausschließlich `medicalApprovalStatus=approved`, derzeit vor allem verifizierte Praxis-/Termin- und administrative Navigationsinformationen.

## 4. Ausschluss von `needs_review` und `missing`

Treatment-/FAQ-Einträge übernehmen ihren vorhandenen medizinischen Freigabestatus; Preise übernehmen den kaufmännisch/medizinischen Status. `retrieveApprovedKnowledge()` filtert technisch vor jedem Provideraufruf strikt auf `approved`. Fehlt freigegebener medizinischer Kontext, entsteht eine ehrliche Beratungsantwort ohne Provideraufruf und ohne erfundene Aussage. Interne TODOs gelangen nicht in die Wissensbasis.

## 5. Medizinische Guardrails

Deterministisch abgefangen werden Diagnose, individuelle Therapie-/Behandlungswahl, Medikamente, Dosierungen, Eignung für Haartransplantationen, Graft-Zahlen, Bilddiagnostik, Ergebnisgarantien/-prognosen und Akutbeurteilungen. Die Antwort verweist je nach Fall auf freigegebene allgemeine Information, persönliche ärztliche Beratung oder professionelle Akuthilfe. Eine zusätzliche Ausgangsprüfung verwirft unsichere Providertexte.

## 6. Prompt-Injection-Schutz

Vor Providerkontakt werden Regelumgehung, Rollenwechsel, Systemprompt-/Konfigurations-/Key-Abfragen, Wissensbasis-/TODO-Exfiltration, fremde Patientendaten sowie erkennbare Kontakt-/Identifikationsdaten blockiert. Vorherige Chatnachrichten bleiben ausschließlich in der Browseransicht und werden nie als Provider-History versendet. Providerantworten können weder eigene URLs noch Actions bestimmen.

## 7. Lead-Kategorisierung

`classifyInquiryLocally()` ordnet serverseitig in die 16 vorgegebenen nicht-diagnostischen Kategorien ein. Zusätzlich werden `intent`, nächste Aktion und eine fest definierte interne URL erzeugt. Diese lokale Klassifizierung funktioniert ohne Modell und entscheidet auch die sicheren CTA-Actions.

## 8. Hair-Check-Zusammenfassung

`summarizeHairConsultationLocally()` erzeugt intern deterministisch eine deutsche Zusammenfassung aus Altersgruppe, freiwilliger Geschlechtsangabe, Dauer, betroffenen Bereichen, Verlauf, weiterem Haarverlust, bisherigen Behandlungsarten, vorhandenem Zusatzhinweis, Interesse, Zeitraum und Fotoanzahl. Kontaktangaben, Diagnose, Norwood-Stadium, Eignung, Grafts, Therapie, Dringlichkeit und Prognose werden nicht ergänzt. Es gibt keine öffentliche Summary-Route.

## 9. Aktuelle Patientendaten an KI-Provider

Aktuell gehen null Patientendaten an einen KI-Provider: `AI_ENABLED=false` und `AI_CONSULTATION_ENHANCER_ENABLED=false`. Der öffentliche Assistent verarbeitet nur die aktuelle öffentliche Frage; erkennbare persönliche Daten werden vor einem Modellaufruf blockiert und frühere Turns nie übertragen.

## 10. Fotos und KI

Es werden keine Fotos, Binärdaten, privaten Foto-IDs oder Foto-URLs an einen KI-Provider übertragen. Der interne optionale Enhancer erhält technisch ausschließlich den deterministischen Text, nie den `HairConsultation`-Datensatz oder `photoReferences`. Er ist standardmäßig deaktiviert.

## 11. Funktionen ohne externen Provider

Ohne Provider funktionieren Launcher und UI, sichere Navigation, Wissens-Retrieval, Approval-Filter, Lead-Kategorisierung, alle Guardrails, Red-Team-Abwehr, sichere Fallbacktexte, CTA-Zuordnung und die deterministische Hair-Check-Zusammenfassung. Es wird keine Fake-KI-Antwort erzeugt.

## 12. Offene Provider-/Datenschutzentscheidungen

Offen sind Anbieter, Modell, EU-/Drittlandregion, AVV, Subprozessoren, Training/Retention, Löschung, Incident-Prozess, Qualitätsfreigabe, Rate-Limit-Infrastruktur und operative Überwachung ohne Inhalte. Eine Aktivierung des internen Enhancers benötigt zusätzlich eine separate Zweck-, Rechtsgrundlagen-, Datenminimierungs- und Zugriffsfreigabe. Es wurden keine juristischen Texte erfunden.

## 13. Analytics Events

Vorbereitet sind `assistant_opened`, `assistant_closed`, `assistant_question_submitted`, `assistant_answer_received`, `assistant_fallback` und `assistant_cta_clicked`. Der Adapter ist ein No-op. Events enthalten keine Fragen, Antworten, Gesundheitsangaben, E-Mail, Telefon oder sonstige Chat-Inhalte.

## 14. Technische Qualität

- TypeScript: bestanden
- ESLint: bestanden
- Automatisierte Tests: fünf Testdateien bestanden, einschließlich aller bestehenden Phase-1/2/3A-Tests
- Production Build: bestanden; `/api/assistant` wird als dynamische Node-Route gebaut
- Runtime-Audit: 27 Seiten, 37 interne Ziele und 8 Redirects bestanden
- Reale API-QA: Provider-Fallback, Approval-Fallback und Systemprompt-Schutz bestanden; fremder Origin liefert `403`
- Desktop und 390 px Mobile: Launcher, Panel, Fallback, Red-Team-Antwort und Navigation bestanden
- Browser-Konsole: leer

## 15. Red-Team-Tests

8/8 der verbindlichen Prompts bestehen kontrolliert: Regelumgehung, Systemprompt, fremde Patientendaten, Bild-/Graft-Analyse, individuelle Haartransplantationsentscheidung, Medikamentenempfehlung, Erfolgsgarantie und API-Key-Abfrage. Ergänzend bestehen Tests für Kontakt-/Identifikationsdaten, individuelle Behandlungsauswahl und unsichere Provider-Ausgabe.

## 16. Geänderte Dateien

- Konfiguration: `.env.example`, `package.json`, `package-lock.json`
- Globale Integration/UI: `app/layout.tsx`, `app/globals.css`, `app/_components/AssistantLoader.tsx`, `app/_components/PracticeAssistant.tsx`
- Client-Telemetrie: `app/_lib/assistant-analytics.ts`
- Server: `app/_server/assistant/core.ts`, `knowledge-base.ts`, `provider.ts`, `runtime.ts`, `consultation-summary.ts`
- API: `app/api/assistant/route.ts`
- Dokumentation: `docs/PORTABILITY-IONOS.md`, `docs/PHASE-3B-OPERATIONS.md`, diese Datei
- Tests: `tests/assistant.test.mjs`, `tests/project-structure.test.mjs`

## 17. Lokaler Commit

Der lokale Phase-3B-Commit wird nach Fertigstellung dieses Berichts erstellt; der unveränderliche Hash wird im Übergabebericht genannt.

## 18. Screenshots und Veröffentlichung

Die finalen Screenshots liegen als `melimedics-phase-3b-assistant-desktop.jpg` (1440 × 1000) und `melimedics-phase-3b-assistant-mobile.jpg` (390 × 844) im Ausgabeverzeichnis. Es wurde nichts veröffentlicht und keine Domain geändert. Phase 3B endet nach dem lokalen Commit; Phase 3C wurde nicht begonnen.
