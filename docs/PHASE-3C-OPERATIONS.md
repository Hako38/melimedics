# Phase 3C – Automation, Kommunikation und IONOS-Betrieb

Stand: 31. August 2026

## Sicherer Standardzustand

`AUTOMATION_ENABLED=false` und `COMMUNICATION_ENABLED=false` sind die sicheren Defaults. Ohne beide Freigaben werden keine Jobs angelegt und keine Nachrichten versendet. Der Haar-Check bleibt davon unabhängig: Eine gespeicherte Anfrage ist erfolgreich, auch wenn Automationen oder ein Kommunikationsanbieter nicht verfügbar sind. Die Benutzeroberfläche behauptet nie, eine E-Mail sei versendet worden.

Der Runtime-Adapter nutzt aktuell absichtlich `DisabledAutomationScheduler` und `DisabledCommunicationProvider`. Es gibt keinen Live-Versand, keinen hart verdrahteten Mailanbieter und keinen Fake-Erfolg. Die vorhandene Vorschau oder eine lokale Umgebung darf deshalb nicht durch das Setzen einzelner Environment-Variablen versehentlich E-Mails versenden.

## Zentrale Architektur

`app/_server/automation/core.ts` enthält die providerneutrale Domäne:

- `AutomationService` wird mit `createAutomationService()` aufgebaut und plant, storniert und verarbeitet Automationen zentral.
- `CommunicationProvider` kapselt zunächst E-Mail. SMS, WhatsApp oder ein offizieller Terminprovider können später als getrennte Adapter ergänzt werden.
- `AutomationScheduler` definiert `schedule()`, `cancel()`, `executeDueJobs()`, `markCompleted()` und `markFailed()`.
- `CommunicationTemplate` hält Version, Freigabestatus, Zweck und typisierte Variablen.
- `ConsentVerifier` prüft die Einwilligung bei der Planung und erneut direkt vor dem Versand.
- `AutomationAuditSink` speichert nur Event, Automation, Zeitpunkt, Status, Template-Version, Provider und technischen Fehlercode – keine Nachrichtentexte.

Die Anfragebestätigung und interne Benachrichtigung sind als kurze administrative Klartexte freigegeben. Terminvorbereitung, Nachsorge, Kontrollhinweise und Bewertungsanfrage bleiben `needs_review`. Sie können dadurch nicht automatisch versendet werden. Medizinische Inhalte müssen zusätzlich im auslösenden Event als `approved` gekennzeichnet sein.

## Idempotenz, Retries und Stornierung

Jeder Job erhält einen stabilen Idempotency-Key aus Event-ID, Template und Empfängerart. Der Scheduler muss darauf einen eindeutigen Index führen. Ein erneuter HTTP-Request oder Page Refresh erzeugt daher keinen zweiten Job. Der Kommunikationsadapter erhält denselben Key und sollte ihn, soweit vom Provider unterstützt, ebenfalls idempotent behandeln.

Nur transiente Providerfehler werden begrenzt wiederholt. Das Backoff ist exponentiell; `AUTOMATION_MAX_RETRIES` begrenzt die Versuche. Permanente Fehler, fehlende Provider, widerrufene Einwilligungen und nicht freigegebene Templates werden terminal als `failed` oder `blocked` markiert. Erfolgreiche Jobs erhalten `completedAt` und werden nicht erneut beansprucht. Offene Follow-ups lassen sich über `cancel(jobId)` stornieren.

## IONOS-Betriebsmodell

Benötigt wird eine von IONOS unterstützte Node.js-Runtime gemäß `package.json` (Node.js 22.13 oder neuer) sowie eine persistente relationale Datenbank. Empfohlen sind mindestens Tabellen für `automation_jobs`, `automation_audit` und die maßgebliche Consent-/Anfragereferenz.

Ein IONOS Cron-Job oder dauerhafter Worker kann in einem freigegebenen Produktionsadapter regelmäßig den Entry Point `runDueAutomationJobs()` aufrufen. Aktuell ist dieser Aufruf ein sicherer No-op. Vor Aktivierung müssen ein persistenter Scheduler, ein Audit-Speicher und ein Mailprovider implementiert und getestet werden. Es wird keine Vercel-, Cloudflare- oder andere proprietäre Cron-Funktion vorausgesetzt.

Für mehrere Instanzen muss der Datenbankadapter Jobs atomar beanspruchen, beispielsweise über Transaktion plus Lease/Lock, und `idempotency_key` eindeutig indizieren. Statuswechsel und Retry-Zähler müssen transaktional gespeichert werden. Der mitgelieferte `InMemoryAutomationScheduler` ist ausschließlich für automatisierte Tests und lokale Domänenprüfungen geeignet, nicht für Produktion.

Zeitpunkte und Wiederholungsintervalle kommen ausschließlich aus freigegebenen Regeln als `scheduledFor` in ein Event. Es wurden keine medizinischen Kontroll- oder Wiederholungsintervalle erfunden. Planity bleibt ein normaler externer Link; es gibt weder Scraping noch Browser-Automation oder simulierte Termine.

## Anforderungen vor Produktionsaktivierung

Vor einem Live-Betrieb sind erforderlich:

- Auswahl und Datenschutzprüfung eines Mailproviders inklusive AV-Vertrag, Region, Löschung und Subprozessoren
- persistenter IONOS-kompatibler Scheduler mit atomarem Claiming und eindeutigem Idempotency-Key
- persistenter, datensparsamer Audit-Speicher
- zentrale Quelle für aktuelle Einwilligung und Widerruf
- ärztliche Freigabe aller medizinischen Vorbereitungs-, Nachsorge- und Kontrollinhalte
- Freigabe der neutralen Bewertungsanfrage und Eintragung der echten `REVIEW_URL`
- technische Absenderkonfiguration (`MAIL_FROM`) und interne Zieladresse (`MELIMEDICS_NOTIFICATION_RECIPIENT`)
- Betriebsüberwachung ohne Request-Bodies, Nachrichtentexte, Kontaktdaten oder Gesundheitsangaben in Logs

## Analytics

Vorbereitet sind ausschließlich `automation_scheduled`, `automation_cancelled`, `message_send_success`, `message_send_failed`, `followup_triggered` und `review_request_triggered`. Ihr Schema nimmt keine E-Mail-Adresse, Telefonnummer, Gesundheitsangaben, Nachrichtentexte oder Upload-Metadaten an. Der Adapter bleibt bis zu einer separaten Freigabe deaktiviert.
