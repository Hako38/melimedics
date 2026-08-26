# Hair-Check: Production-Anforderungen

Stand Phase 3A: Vor dem Absenden bleiben Antworten und optionale Fotos ausschließlich im flüchtigen React-State. `submitHairConsultation()` überträgt erst nach ausdrücklichem Klick an die Same-Origin-API. Die API validiert serverseitig und bestätigt Erfolg nur nach persistierter Anfrage. Ohne konfiguriertes Repository/Storage oder bei einem erforderlichen, aber fehlenden Malware-Scanner gibt es keine Speicherung und keinen Fake-Erfolg.

## Vor Produktivbetrieb erforderlich

1. Die vorhandene Same-Origin-API hinter TLS betreiben; keine Secrets, Storage-Credentials oder signierten Ziel-URLs im Client.
2. Den vorhandenen `PrivateFileStorage` an privaten, nicht öffentlich lesbaren Storage in einer fachlich und rechtlich freigegebenen Region binden. Der Filesystem-Adapter benötigt ein persistentes privates Volume; alternativ folgt ein Object-Storage-Adapter.
3. Einen freigegebenen Malware-/Content-Scanner an das vorhandene `FileContentScanner`-Interface binden. Größen-, MIME- und Magic-Byte-Prüfung sind bereits serverseitig aktiv.
4. Rollenbasierter Zugriff für den kleinsten erforderlichen Personenkreis, nachvollziehbare Zugriffsaudits ohne Bildinhalte, Freitexte oder medizinische Angaben in allgemeinen Logs.
5. Definierter Fallbezug zwischen Beratungsanfrage und privaten Objekten, keine direkten öffentlichen Upload- oder Download-URLs. Kurzlebige, autorisierte Abrufwege erst nach Zugriffskontrolle.
6. Dokumentiertes Löschkonzept mit freigegebener Aufbewahrungsdauer, automatischer Löschung, Bearbeitung von Widerruf/Löschersuchen sowie überprüfbaren Back-up-Regeln.
7. Belastbarer Fehler- und Wiederholungsprozess ohne doppelte Anfrage, unvollständige Datensätze oder verwaiste Fotos.
8. Juristisch freigegebene Datenschutz- und Foto-Einwilligungen (`needs_review`), definierte Zwecke, Verantwortlichkeiten, Empfänger, Aufbewahrung, Betroffenenrechte und Nachweis der Einwilligung.
9. Datenschutz-Folgen-/Risikoprüfung, Auftragsverarbeitungsverträge und technische-organisatorische Maßnahmen nach interner rechtlicher und datenschutzfachlicher Bewertung.
10. Automatisierte Integrations-, Berechtigungs-, Upload-, Lösch-, Retention- und Wiederherstellungstests mit den konkret ausgewählten Produktionsprovidern vor Aktivierung.

## Derzeit bewusst nicht unterstützt

- HEIC: wegen uneinheitlicher Browser-Decodierung und Vorschau. Eine spätere Unterstützung braucht sichere serverseitige Inhaltsprüfung und Konvertierung.
- KI-Bildanalyse, automatische Eignungsbewertung, Graft-Berechnung, CRM, E-Mail und Automation.
- Persistenz im Browser (`localStorage`, `sessionStorage`, IndexedDB) oder Übergabe an Drittanbieter-Analytics.

## Analytics-Grenze

Die vorbereiteten Events enthalten ausschließlich technische Funnel-Signale. Beschwerden, Auswahlwerte, Freitexte, Kontaktdaten, Dateinamen und Bilder dürfen niemals Teil des Analytics-Payloads werden. Der Adapter bleibt deaktiviert, bis ein einwilligungsabhängiger Anbieter freigegeben ist.
