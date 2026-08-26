# Hair-Check: Production-Anforderungen

Stand Phase 2B: Die UI ist vollständig vorbereitet, verarbeitet Antworten und optionale Fotos jedoch ausschließlich im flüchtigen React-State der aktuellen Browser-Sitzung. `submitHairConsultation()` nutzt ohne freigegebenen Transportadapter keinen Netzwerkaufruf und liefert bewusst `secure_backend_unavailable`. Es gibt weder Speicherung noch Übertragung noch einen Fake-Erfolg.

## Vor Produktivbetrieb erforderlich

1. Ein serverseitiger, authentifizierter Submission-Endpunkt unter derselben kontrollierten Infrastruktur; keine Secrets, Storage-Credentials oder signierten Ziel-URLs im Client.
2. Privater, nicht öffentlich lesbarer Object Storage in einer fachlich und rechtlich freigegebenen Region. Objekte erhalten serverseitig generierte IDs; Originaldateinamen werden weder als Schlüssel noch als Vertrauenssignal verwendet.
3. Transport ausschließlich über TLS, strikte Größen-/MIME-Prüfung auch serverseitig, Prüfung des tatsächlichen Dateiinhalts und Malware-Scan vor Freigabe für Mitarbeitende.
4. Rollenbasierter Zugriff für den kleinsten erforderlichen Personenkreis, nachvollziehbare Zugriffsaudits ohne Bildinhalte, Freitexte oder medizinische Angaben in allgemeinen Logs.
5. Definierter Fallbezug zwischen Beratungsanfrage und privaten Objekten, keine direkten öffentlichen Upload- oder Download-URLs. Kurzlebige, autorisierte Abrufwege erst nach Zugriffskontrolle.
6. Dokumentiertes Löschkonzept mit freigegebener Aufbewahrungsdauer, automatischer Löschung, Bearbeitung von Widerruf/Löschersuchen sowie überprüfbaren Back-up-Regeln.
7. Belastbarer Fehler- und Wiederholungsprozess ohne doppelte Anfrage, unvollständige Datensätze oder verwaiste Fotos.
8. Juristisch freigegebene Datenschutz- und Foto-Einwilligungen (`needs_review`), definierte Zwecke, Verantwortlichkeiten, Empfänger, Aufbewahrung, Betroffenenrechte und Nachweis der Einwilligung.
9. Datenschutz-Folgen-/Risikoprüfung, Auftragsverarbeitungsverträge und technische-organisatorische Maßnahmen nach interner rechtlicher und datenschutzfachlicher Bewertung.
10. Automatisierte Integrations-, Berechtigungs-, Upload-, Lösch-, Retention- und Wiederherstellungstests vor Aktivierung des Produktionsadapters.

## Derzeit bewusst nicht unterstützt

- HEIC: wegen uneinheitlicher Browser-Decodierung und Vorschau. Eine spätere Unterstützung braucht sichere serverseitige Inhaltsprüfung und Konvertierung.
- KI-Bildanalyse, automatische Eignungsbewertung, Graft-Berechnung, CRM, E-Mail und Automation.
- Persistenz im Browser (`localStorage`, `sessionStorage`, IndexedDB) oder Übergabe an Drittanbieter-Analytics.

## Analytics-Grenze

Die vorbereiteten Events enthalten ausschließlich technische Funnel-Signale. Beschwerden, Auswahlwerte, Freitexte, Kontaktdaten, Dateinamen und Bilder dürfen niemals Teil des Analytics-Payloads werden. Der Adapter bleibt deaktiviert, bis ein einwilligungsabhängiger Anbieter freigegeben ist.
