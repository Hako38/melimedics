# Zentraler Content-Freigabestatus

Stand: Phase 1D · 25. August 2026

Die öffentliche Website zeigt diese internen Statuswerte nicht an. Die programmatische Quelle ist `getContentStatusReport()` in `app/_lib/content-status.ts`; sie aggregiert Behandlungen, Preise, Praxisdaten, Arztdaten und Medien zentral.

## Zusammenfassung

| Status | Anzahl | Bedeutung |
|---|---:|---|
| `approved` | 4 | verifizierte Praxis-/Kontaktdaten |
| `needs_review` | 16 | 13 Behandlungstexte, 2 Praxisfelder und der Arztname |
| `missing` | 26 | 15 Preise, 2 Praxisfelder, 3 Medien und 6 Arztdaten |
| **Gesamt** | **46** | zentral erfasste Freigabepunkte |

## Approved

- Ort: Mainz-Gonsenheim
- Telefon: 01575 8272466
- E-Mail: info@melimedics.de
- Planity-Buchungslink

## Needs review

- alle 13 Behandlungstexte: medizinische Angaben, Risiken, Kontraindikationen, Wirkung, Ablauf und Nachsorge gemäß jeweiliger TODOs
- Praxis: Straße/Hausnummer und PLZ; insbesondere den Widerspruch 55122/55124 auflösen
- Arzt: vollständige Namensschreibweise „Melih Kandemir“ anhand einer Primärquelle bestätigen

## Missing

- alle 15 kaufmännischen Preispositionen
- Öffnungs-/Sprechzeiten und verifizierter Maps-Link
- Hero-/Praxisfoto, Arztporträt und Praxis-Innenaufnahme
- Arzttitel/Berufsbezeichnung, Vita, Qualifikationen, Fortbildungen, Tätigkeitsschwerpunkte und freigegebenes Porträt

Vor dem Relaunch ist die separate `RELAUNCH-CHECKLIST.md` verbindlich abzuarbeiten.
