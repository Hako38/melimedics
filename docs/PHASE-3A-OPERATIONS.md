# Hair Consultation · Betrieb und Datenfluss

## Datenfluss

1. Die achtstufige UI hält Angaben und Bilder zunächst nur im React-State.
2. Nach „Beratungsanfrage senden“ erstellt der Client `multipart/form-data` und sendet ausschließlich an `/api/hair-consultations/`.
3. Die API prüft Same-Origin, Content-Type, Request-Größe und Rate Limit, liest Payload und maximal fünf Bilder und übergibt sie an den serverseitigen Service.
4. Der Service validiert alle Auswahlwerte, Kontaktfelder und Einwilligungen erneut. Bildtyp wird anhand von MIME-Type und Datei-Signatur geprüft.
5. Bilder werden über `PrivateFileStorage` unter zufälligen IDs abgelegt. Originaldateinamen werden verworfen. Danach wird die strukturierte Anfrage über `ConsultationRepository` persistiert.
6. Erst nach bestätigter Persistenz erhält der Client HTTP 201 und eine nicht-personenbezogene Referenz. Fehler führen nie zum Success-State.
7. `ConsultationNotifier` läuft nach der Persistenz als optionale Nebenwirkung. Ein fehlender Mailprovider macht eine gespeicherte Anfrage nicht ungültig.

## Aktuelle Provider

- `disabled` ist der sichere Standard: keine Speicherung, kein Erfolg.
- `filesystem` implementiert Repository und privaten Dateispeicher für eine einzelne kontrollierte Node-Instanz mit persistentem, nicht öffentlich ausgeliefertem Volume.
- Mail und Malware-Scanning haben in Phase 3A nur Interfaces. Es ist kein Anbieter und kein Zugangsschlüssel eingebaut.
- Für lokale QA darf `REQUIRE_MALWARE_SCAN=false` ausschließlich mit neutralen Testdateien gesetzt werden. Produktion bleibt fail-closed.

## Daten im strukturierten Record

Gespeichert werden ID, Zeitpunkte, Workflow-/Reviewstatus, die strukturierten Antworten des Haar-Checks, Name, E-Mail, Telefon, optionale Nachricht, Source, Consent-Booleans, serverseitige Consent-Zeitpunkte/-Versionen sowie opaque Foto-Referenzen. Es werden keine Diagnose, Eignungsentscheidung, Graft-Zahl, öffentlichen Foto-URLs oder Originaldateinamen gespeichert.

## Löschen und Retention

Der interne Service stellt `deletePhoto()`, `deleteConsultation()` und `deleteExpiredConsultations()` bereit. Eine Gesamtlöschung markiert den Record zunächst als `pending`, löscht alle zugehörigen Objekte und ersetzt den sensiblen Record anschließend durch einen minimalen Tombstone aus ID, Löschzeitpunkt und Fotoanzahl. Fehlgeschlagene Löschungen bleiben wiederholbar.

`RETENTION_DAYS` ist konfigurierbar, aber in Phase 3A rechtlich nicht freigegeben. Ein späterer kontrollierter Scheduler/Operator muss `deleteExpiredConsultations()` aufrufen; es wurde keine Automation vorweggenommen.

## Noch vor Produktion erforderlich

- juristische Freigabe beider Einwilligungstexte und ihrer Versionskennungen
- rechtlich/organisatorisch freigegebene Retention und Löschfrequenz
- Malware-/Content-Scanner und Betriebsprozess für Quarantäne
- Mailprovider, Absender, Empfänger und Retry-/Monitoring-Prozess
- Entscheidung: privates IONOS-Volume oder Object Storage plus Datenbank
- TLS, Reverse Proxy, sichere Secrets, persistente Back-ups, Restore- und Berechtigungstests
- verteilter Rate Limiter bei mehreren App-Instanzen

Es gibt keine öffentliche Admin-Route. Phase 3B kann den vorhandenen Service-Layer für eine authentifizierte interne Ansicht verwenden.
