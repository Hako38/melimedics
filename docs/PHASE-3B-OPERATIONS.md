# Phase 3B – Assistent, Datenschutz und Betrieb

Stand: 26. August 2026

## Sicherer Standardzustand

`AI_ENABLED=false` ist der Default. In diesem Zustand gibt es keine externen Modellaufrufe und keine Fake-KI-Antwort. Der öffentliche Melimedics Assistent bleibt als sichere Navigation nutzbar, kategorisiert die Anfrage lokal, wendet Guardrails an und zeigt bei fehlender freigegebener Information oder Provider-Verfügbarkeit verständliche Fallbacks.

## Providervertrag

`AIProvider` trennt `generateAssistantResponse()`, `classifyInquiry()` und `summarizeConsultation()` von einem konkreten Anbieter. Der vorhandene Adapter `generic-json` sendet serverseitig per HTTPS ein minimales JSON-Paket an einen später freizugebenden Endpunkt. Er benötigt `AI_ENABLED=true`, `AI_PROVIDER=generic-json`, `AI_BASE_URL`, `AI_MODEL` und `AI_API_KEY`. Es wurde kein KI-Anbieter ausgewählt oder aktiviert.

Vor Aktivierung sind Provider, Modell, Region, Auftragsverarbeitung, Training/Retention des Anbieters, Subprozessoren, Löschung, Incident-Prozess und die fachliche Qualität der Antworten freizugeben. Der Endpoint muss den in `provider.ts` dokumentierten Operationsvertrag erfüllen.

## Öffentliche Wissensbasis

Die Wissensbasis wird serverseitig aus den bestehenden Treatment-, Preis- und Praxisdaten aufgebaut. Retrieval gibt ausschließlich Einträge mit `medicalApprovalStatus=approved` an einen Provider weiter. Treatment-/FAQ-Inhalte mit `needs_review` und Preise mit `missing` bleiben zwar als überprüfbare Quellen im Katalog, werden aber technisch ausgeschlossen. Interne TODOs werden nie Teil des Providerkontexts.

## Konversation und Analytics

Die Unterhaltung lebt ausschließlich im React-State der aktiven Seite. Es gibt keine Chat-Datenbank, kein Cookie, kein `localStorage` und keine Übergabe an einen Analytics-Anbieter. Analytics-Ereignisse enthalten nur Eventname, technischen Modus/Code oder eine interne CTA-Route, niemals Fragen, Antworten, Kontaktdaten oder medizinische Angaben. Allgemeine Serverlogs dürfen Request-Bodies nicht protokollieren.

## Öffentlicher Assistent und interne Services

`/api/assistant/` verarbeitet ausschließlich öffentliche Fragen. Same-Origin-, Größen-, Schema-, Honeypot- und Rate-Limit-Prüfungen laufen vor der Antwort. Eine öffentliche Route für Consultation-Summaries existiert nicht.

Die Hair-Check-Zusammenfassung ist ein interner deterministischer Service. Sie verwendet nur vorhandene strukturierte Felder, lässt Kontaktangaben aus und überträgt keine Fotos oder privaten Foto-IDs. Der optionale Enhancer bleibt mit `AI_CONSULTATION_ENHANCER_ENABLED=false` aus. Eine Aktivierung benötigt eine separate Datenschutz- und Providerfreigabe.

## Guardrails und Incident-Verhalten

Injection-, Prompt-/Secret-, Patientendaten-, Bildanalyse-, Graft-, Medikamenten-, Diagnose-, Therapie-, Eignungs-, Garantie- und Akutfragen werden deterministisch vor einem Provideraufruf abgefangen. Providerantworten erhalten zusätzlich eine Ausgangsprüfung. Unsichere oder fehlerhafte Antworten werden verworfen und durch den sicheren Beratungs-/Navigationshinweis ersetzt.

Bei Providerstörung bleibt die Website verfügbar. Es werden keine technischen Fehlermeldungen, Keys, Prompts oder internen Konfigurationen ausgegeben. Der lokale In-Memory-Rate-Limiter ist für eine einzelne Instanz geeignet; mehrere IONOS-Instanzen benötigen einen verteilten Limiter.
