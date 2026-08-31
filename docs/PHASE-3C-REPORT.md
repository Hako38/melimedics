# Melimedics Phase 3C – Abschlussbericht

Stand: 31. August 2026

## 1. Automation-Architektur

Die zentrale Domäne liegt in `app/_server/automation/core.ts`. `createAutomationService()` koordiniert Ereignisse, Templates, Einwilligung, Scheduler, Provider, Idempotenz, Retries, Audit und datensparsame Analytics. Alle Abhängigkeiten sind Interfaces oder austauschbare Adapter. Der Hair-Check löst nach erfolgreicher Speicherung über `AutomationConsultationNotifier` das Event `consultation_submitted` aus. Ein Fehler in dieser optionalen Nebenwirkung verändert die gespeicherte Anfrage nicht.

Der sichere Runtime-Standard verwendet einen deaktivierten Scheduler und einen deaktivierten Kommunikationsprovider. `app/_server/automation/job-runner.ts` bildet den providerneutralen Entry Point für einen späteren IONOS Cron-Job oder Worker.

## 2. Events

Vorbereitet sind:

- `consultation_submitted`
- `consultation_contacted`
- `appointment_booked`
- `appointment_upcoming`
- `treatment_completed`
- `followup_due`
- `review_request_due`

Zeitpunkte und medizinische Intervalle werden nicht automatisch erfunden. Zukünftige freigegebene Regeln übergeben den Ausführungszeitpunkt als `scheduledFor`.

## 3. Kommunikationsarten

`CommunicationProvider` unterstützt zunächst den Kanal E-Mail. Die Schnittstelle kann später um SMS, WhatsApp oder einen offiziellen Terminprovider ergänzt werden, ohne die Automationsdomäne zu verändern. Es ist kein konkreter Anbieter implementiert oder aktiviert.

## 4. Einwilligungsprüfung

Jedes Patienten-Event enthält einen versionierten Consent-Snapshot. Servicekommunikation benötigt `serviceContact=true`, Bewertungsanfragen sind getrennt als `marketing` eingeordnet und benötigen `marketing=true`. Interne Benachrichtigungen werden nur bei gedeckter Anfragebearbeitung vorbereitet. `ConsentVerifier` prüft die Einwilligung zusätzlich unmittelbar vor dem Versand, damit ein Widerruf einen bereits geplanten Job blockiert.

## 5. Schutz vor Doppelversand

Jeder Job erhält einen stabilen Idempotency-Key aus Event-ID, Template und Empfängerart. Der Scheduler weist denselben Key nur einmal zu. Jobs werden vor der Ausführung atomar in den Status `processing` überführt und nach Erfolg mit `completedAt` abgeschlossen. Bereits abgeschlossene Jobs werden nicht erneut beansprucht. Der Providervertrag erhält den Idempotency-Key ebenfalls.

## 6. Retries

Nur transiente Providerfehler werden erneut versucht. Das Backoff ist exponentiell und die Anzahl über `AUTOMATION_MAX_RETRIES` begrenzt. Permanente Fehler, fehlende Konfiguration, fehlende Freigabe oder fehlende Einwilligung führen zu einem terminalen `failed`- oder `blocked`-Status. Fehlercodes sind technisch und enthalten keine Nachrichtentexte oder Patientendaten.

## 7. Noch erforderliche Arzt-/Inhaltsfreigaben

Folgende Templates bleiben technisch gesperrt (`needs_review`):

- `appointment_preparation`
- `treatment_aftercare`
- `control_reminder`
- `review_request`

Für Vorbereitung, Nachsorge und Kontrolle ist zusätzlich freigegebener behandlungsspezifischer Inhalt im Event erforderlich. Es wurden keine medizinischen Hinweise oder Intervalle erfunden. Der Bewertungslink bleibt leer, bis die echte URL zentral freigegeben und als `REVIEW_URL` eingetragen wurde.

Freigegeben sind ausschließlich kurze administrative Texte für `consultation_received`, `internal_new_consultation` und `followup_open_consultation`. Sie enthalten keine Diagnose, Eignung, Graft-Zahl, Behandlungsempfehlung oder Ergebnisprognose.

## 8. Kommunikation ohne externen Provider

Aktuell wird keine externe Kommunikation versendet. Templates können kontrolliert gerendert, Jobs in den Domänentests geplant und Abläufe geprüft werden. Im echten Runtime-Pfad melden fehlende Adapter keinen Fake-Erfolg. Website, Haar-Check und Praxisassistent funktionieren unabhängig weiter.

## 9. Fehlende Produktionsprovider

Vor Produktion fehlen:

- ein datenschutzrechtlich und technisch freigegebener E-Mail-Provider
- ein persistenter IONOS-kompatibler Scheduler/Job-Store
- ein persistenter, datensparsamer Audit-Store
- eine maßgebliche Consent-/Widerrufsquelle für die Prüfung vor dem Versand
- optional später ein offizieller Terminprovider mit verifizierter API

Planity wurde nicht integriert, gescrapt oder automatisiert. Der bestehende offizielle Link bleibt erhalten.

## 10. IONOS-Kompatibilität

Die Architektur verwendet Standard-TypeScript/Node.js und keine Vercel-, Cloudflare- oder OpenAI-Sites-Laufzeit. Für IONOS ist Node.js 22.13 oder neuer erforderlich. Die Details für Datenbank, atomare Job-Claims, Idempotenz und mehrere Instanzen stehen in `docs/PHASE-3C-OPERATIONS.md`.

## 11. Jobs und Cron

Ein IONOS Cron-Job oder Worker kann später regelmäßig `runDueAutomationJobs()` aufrufen. Der aktuelle Runtime-Adapter ist absichtlich ein No-op. Für mehrere Instanzen muss der produktive Datenbankadapter Jobs transaktional beanspruchen, eine Lease/Lock-Strategie verwenden und `idempotency_key` eindeutig indizieren.

## 12. Analytics Events

Vorbereitet sind:

- `automation_scheduled`
- `automation_cancelled`
- `message_send_success`
- `message_send_failed`
- `followup_triggered`
- `review_request_triggered`

Das Schema akzeptiert keine E-Mail-Adresse, Telefonnummer, Gesundheitsangaben, Nachrichtentexte oder Upload-Informationen. Der Adapter ist deaktiviert.

## 13. QA-Ergebnis

- TypeScript: bestanden
- ESLint: bestanden
- Tests: bestanden (6 Testsuites einschließlich 12 spezifischer Automationsszenarien)
- Production Build: bestanden, 43 Seiten/Routes erzeugt
- Runtime-Audit: bestanden (27 Sitemap-Seiten, 37 interne Ziele, 8 permanente Weiterleitungen)
- Haar-Check: Desktop und Mobile geprüft, Start und Guardrail-Hinweise funktionieren
- Praxisassistent: geprüft, sicherer Provider-Fallback funktioniert
- Planity: offizieller Link unverändert und funktionsfähig eingebunden
- Mobile: 390 × 844 ohne horizontalen Überlauf
- Desktop: 1440 × 900 ohne horizontalen Überlauf
- Browser-Konsole: keine Warnungen oder Fehler in den geprüften Abläufen

## 14. Geänderte Dateien

- `.env.example`
- `README.md`
- `package.json`
- `package-lock.json`
- `app/_lib/automation-analytics.ts`
- `app/_server/automation/core.ts`
- `app/_server/automation/runtime.ts`
- `app/_server/automation/job-runner.ts`
- `app/_server/hair-consultations/core.ts`
- `app/_server/hair-consultations/runtime.ts`
- `tests/automation.test.mjs`
- `tests/project-structure.test.mjs`
- `docs/PHASE-3C-OPERATIONS.md`
- `docs/PHASE-3C-REPORT.md`

## 15. Commit

Der lokale Git-Commit wird nach Abschluss aller Prüfungen erstellt; der Hash wird im finalen Übergabebericht genannt.

## 16. Veröffentlichung

Es wurde keine Veröffentlichung durchgeführt, keine Domain verändert und kein externer Dienst aktiviert.
