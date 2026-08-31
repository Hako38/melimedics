# Bildquellen und Asset-Status

Stand: 31. August 2026

Die öffentliche Bestandswebsite `https://melimedics.de/` wurde einschließlich ihrer XML-Sitemaps, öffentlichen Inhaltsseiten und WordPress-Medienbibliothek inventarisiert. Alle 235 öffentlich abrufbaren Bilder wurden lokal gespeichert; die neue Website verwendet keine Hotlinks.

## Klassifizierung

| Klasse | Anzahl | Öffentliche Verwendung |
| --- | ---: | --- |
| A – verifiziert/authentisch | 26 | 17 Praxis- und Behandlungsfotos werden passend eingesetzt; 4 weitere authentische Behandlungsfotos und 5 Marken-/Logo-Dateien bleiben lokal dokumentiert. |
| B – Herkunft unklar | 0 | Keine. Sechs zunächst unklare Stock-/Texturdateien konnten dem importierten Templatebestand zugeordnet werden. |
| C – Template/Demo | 209 | Ausschließlich im lokalen Archiv `public/images/legacy/template-demo/`; keine öffentliche Referenz im App-Code. |

Die maschinenlesbare Einzelinventur mit WordPress-ID, Originalquelle, Dateiformat, Abmessungen, Fundstellen, Klassifizierung und lokalen Pfaden liegt in `docs/LEGACY-ASSET-INVENTORY.json`.

## Öffentliche A-Assets

| Bereich | Optimierte Dateien | Verwendung |
| --- | --- | --- |
| Arzt & Behandlung | `public/images/doctor/*.webp` | Startseite, Arzt-/Praxisbereich, ästhetische und haarmedizinische Detailseiten |
| Praxis | `public/images/practice/*.webp` | Startseite, Gesundheit, Arzt & Praxis |
| Ästhetik | `public/images/treatments/aesthetics/*.webp` | Gesichtsbereich, Detailseiten, Kosmetik |
| Haut & Laser | `public/images/skin-laser/*.webp` | Kategorie und Detailseiten für Laser/HIFU |
| PRP/Haar | `public/images/hair/*.webp` | PRP- und Haarseiten sowie Diagnostik |
| Gesundheit | `public/images/treatments/health/*.webp` | Authentische Praxiseinblicke in der Galerie; keine Ableitung nicht bestätigter aktueller Leistungen |
| Markenmaterial | `public/images/miscellaneous/*.webp` | Lokal bewahrt; die authentische Wort-/Bildmarke wird in Header und Footer verwendet |

Die Webvarianten sind auf maximal 1.600 × 1.800 Pixel begrenzt und als WebP mit einer qualitätsorientierten Komprimierung erzeugt. Die Quelldateien bleiben jeweils im Unterordner `originals/` erhalten. Bilder werden über `next/image` mit intrinsischen Abmessungen beziehungsweise responsiven `sizes` eingebunden.

Für Header und Footer wird zusätzlich `melimedics-logo-header.webp` verwendet: eine verlustfreie Randbereinigung der authentischen transparenten Logoquelle `melimedics-logo-signatur.webp`, ohne inhaltliche oder gestalterische Änderung der Wort-/Bildmarke.

## Redaktionelle Regeln

- Personen und Räume werden nur als Melimedics-Aufnahmen bezeichnet, wenn Bildinhalt und Bestandskontext dies tragen.
- Eine Aufnahme dokumentiert nicht automatisch, dass ein bestimmtes Gerät, Produkt oder eine Leistung aktuell angeboten wird.
- Keine Vorher-Nachher-, Demoarzt-, Stock-Testimonial- oder Templatebilder werden öffentlich verwendet.
- Alt-Texte beschreiben den sichtbaren Inhalt und vermeiden Behandlungs- oder Erfolgsbehauptungen.
- Vor dem Produktivgang bleiben Bild- und Personenrechte sowie die interne Freigabe Teil der abschließenden rechtlichen Prüfung.
