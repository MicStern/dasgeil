# dasgeil — Konzept 5, Blau

Responsive Onepage-Prototyp in HTML, CSS und JavaScript.

## Start

`index.html` direkt im Browser öffnen.

## Enthalten

- Schwarz-weißes Editorial-Layout mit sattem Blau
- Analoge Pinselgrafiken als Textmarkierungen
- Bewusst breite Display-Typografie mit Outlines
- Interaktive Leistungskarten
- Scroll-Reveal-Animationen
- Responsives Layout

## Typography
The design is configured for Nexa Heavy and Nexa Light. Due to font licensing, font files are not included. Add your licensed WOFF2 files to `assets/fonts/` as described in `assets/fonts/README.txt`.

## Markierungen
Alle markierten Wörter und Zeilen verwenden dieselbe SVG-Datei:
`assets/brushes/brush-stroke.svg`

Die Farbe wird in CSS über `background-color: var(--blue)` gesetzt. Die Grafik wird als SVG-Maske verwendet und kann dadurch ohne Qualitätsverlust auf jede Textlänge gedehnt werden.

## SVG-Brush-Fix
Der Brush wird direkt als blau eingefärbtes SVG-Hintergrundbild geladen. Dadurch funktioniert er auch beim lokalen Öffnen per `file://` und ist nicht von Browser-Unterstützung für externe SVG-Masks abhängig.
