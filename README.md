# dasgeil — Mainpage

Professionelle, eigenständige Agentur-Mainpage für dasgeil (Berlin × Wien).
Statisches Projekt aus reinem HTML, CSS und JavaScript — keine Build-Tools,
keine externen Bibliotheken, keine Frameworks.

Die vier "Was wäre wenn"-Unterseiten (Kita, Werkstatt, Beauty, Arcade) sind
in diesem Arbeitsschritt **bewusst nicht** umgesetzt. Die Mainpage ist aber
so vorbereitet, dass sie unabhängig voneinander ergänzt werden können, siehe
[Showcase-Unterseiten aktivieren](#showcase-unterseiten-aktivieren).

## Lokal starten

Kein Build-Schritt nötig, aber `index.html` sollte über einen lokalen
Webserver geöffnet werden (nicht per Doppelklick/`file://`), da `content.js`
und `script.js` als separate Module geladen werden und einige Browser das
bei `file://` einschränken:

```bash
python -m http.server 8000
# dann im Browser: http://localhost:8000/
```

Alternativ z.B. mit Node: `npx serve .`

## Dateistruktur

```
/
  index.html        Struktur & Inhalt aller statischen Sektionen
  styles.css         Gesamtes Styling (CSS Custom Properties, Breakpoints)
  content.js         Content-Modell: projects, services, team, showcaseWorlds
  script.js          Verhalten: rendert content.js, Interaktion, Formular
  CNAME               GitHub-Pages-Domain-Konfiguration

/assets/
  /fonts/            Nexa Heavy + Nexa Light (WOFF2)
  /images/           Allgemeine Bild-Assets, z.B. Social-Preview-Bild
    /team/           Team-Fotos
  /icons/            Für spätere Icon-Assets (aktuell ungenutzt)
  /studies/          Für spätere echte Projekt-Screenshots (aktuell ungenutzt)
  /showcase/         Für spätere Vorschaubilder der vier Showcase-Welten
  /brushes/          brush-stroke.svg (Pinselmarkierung im Hero)

Geplante, aber in diesem Schritt noch nicht angelegte Verzeichnisse für die
vier Showcase-Unterseiten:
  /kita/
  /werkstatt/
  /beauty/
  /arcade/
```

## Inhalte pflegen

Alle wiederkehrenden Inhalte (Projekte, Leistungen, Team, Showcase-Welten)
liegen strukturiert in **`content.js`** als einfache JavaScript-Arrays. Um
Inhalte zu ändern, muss nur `content.js` bearbeitet werden — `script.js`
rendert daraus automatisch die passenden DOM-Strukturen. Feste Fließtexte
(Hero, Ansatz, Prozess, Kontakt-Intro etc.) stehen direkt in `index.html`.

### Projekte pflegen

`content.js` → `projects`-Array, ein Objekt pro Projektfläche in
`#arbeiten`. Relevante Felder:

| Feld | Bedeutung |
|---|---|
| `status` | `"placeholder"` \| `"concept"` \| `"in-progress"` \| `"published"` |
| `type` | sichtbares Status-Label, z.B. "Case Study in Vorbereitung" |
| `layout` | `"full-width"` \| `"split"` \| `"identity"` — bestimmt die Renderfunktion in `script.js` |
| `images` | Pfade zu echten Screenshots, sobald vorhanden (aktuell leer, siehe `assets/studies/README.txt`) |
| `result` | wird nur bei `status: "published"` angezeigt — bei Platzhaltern immer `null` lassen |
| `caseStudyUrl` | Ziel-URL einer echten Case-Study-Detailseite. Solange `null`, zeigt der CTA-Klick die `ctaNote` an statt zu navigieren |

Ein viertes Layout lässt sich ergänzen, indem in `script.js` (Abschnitt 7)
eine weitere `renderProjectXyz()`-Funktion geschrieben und in
`projectRenderers` unter einem neuen Layout-Namen registriert wird.

### Leistungen pflegen

`content.js` → `services`-Array. Jeder Eintrag erzeugt einen Tab in der
Leistungs-Liste (`#leistungen`) und die zugehörige Vorschau. `visual` wählt
eines der vier vorbereiteten abstrakten Vorschau-Artefakte
(`website` | `research` | `identity` | `growth`, definiert in `script.js`
Abschnitt 6).

### Team pflegen

`content.js` → `team`-Array. Solange `name` bzw. `photo` `null` sind, zeigt
die Seite bewusst sichtbare Platzhalter ("Name ergänzen" / "Foto ergänzen")
statt erfundener Personen. Fotos gehören nach `assets/images/team/`, siehe
dortige `README.txt`.

### Showcase-Unterseiten aktivieren

`content.js` → `showcaseWorlds`-Array. Sobald eine der vier Unterseiten
(`/kita/`, `/werkstatt/`, `/beauty/`, `/arcade/`) live ist:

1. Verzeichnis unter dem jeweiligen `targetUrl` anlegen.
2. Im passenden Eintrag `enabled: true` setzen.

Danach leitet ein Klick auf den jeweiligen Teaser nach dem Lade-Overlay
direkt zur Zielseite weiter, statt die "wird gerade gebaut"-Meldung zu
zeigen. An `script.js` muss dafür nichts geändert werden.

### Footer-Links pflegen

LinkedIn, Instagram, Impressum und Datenschutz sind in `index.html` aktuell
als reine `<span>`-Platzhalter markiert (kein `href`, keine toten Links).
Sobald echte URLs feststehen, den jeweiligen `<span class="footer-link-placeholder">`
durch ein `<a>` mit echtem `href` ersetzen.

## Kontaktformular konfigurieren

Das Formular (`#contactForm`) ist strukturell auf einen echten Versand
vorbereitet, läuft aber ohne Konfiguration bewusst in einem klar erkennbaren
**Entwicklungsmodus** — es validiert normal, zeigt aber nie eine
Erfolgsmeldung vor, die nicht stimmt.

Genutzter Dienst: [Web3Forms](https://web3forms.com) — kostenlos, kein
Backend nötig, kein Account/Login erforderlich.

1. Auf web3forms.com die Ziel-Mailadresse eintragen.
2. Der zugehörige Access Key wird sofort per Mail zugeschickt.
3. In `index.html` im `#contactForm` das versteckte Feld

   ```html
   <input type="hidden" name="access_key" value="REPLACE_WITH_WEB3FORMS_ACCESS_KEY">
   ```

   auf den echten Key ändern.

Solange dort der Platzhalter-Wert steht, erkennt `script.js` (Abschnitt
"11. Kontaktformular", `isConfigured`-Prüfung) das und zeigt statt eines
fehlschlagenden API-Aufrufs direkt den Entwicklungsmodus-Hinweis.

## Fonts

- **Nexa Heavy** — Headlines, Labels, Buttons (`font-weight: 900`)
- **Nexa Light** — Fließtext (`font-weight: 300`)

Lizenzierte WOFF2-Dateien liegen in `assets/fonts/` (`Nexa-Heavy.woff2`,
`Nexa-Light.woff2`). Ohne diese Dateien fällt die Seite automatisch auf
Arial/Helvetica zurück (`font-display: swap`).

## Animationen & Motion

- Alle Bewegungen (Scroll-Reveal, Hero-Designstudie, Header-Kompaktierung,
  Lade-Overlay) sind kurz, subtil und blockieren nie Inhalte.
- `prefers-reduced-motion: reduce` wird global respektiert (siehe
  `styles.css`, Abschnitt 17, und die entsprechenden Checks in `script.js`):
  Reveal-Elemente sind sofort sichtbar, die Hero-Designstudie zeigt sofort
  den finalen Zustand, das Lade-Overlay im Showcase-Bereich läuft nahezu
  ohne Verzögerung durch.
- Der Custom-Cursor wird nur bei Geräten mit Maus (`pointer: fine`) und ohne
  `prefers-reduced-motion` geladen.

## Bildformate & Optimierung

Aktuell werden **keine** Fotos verwendet — alle "Designstudien"-Vorschauen
(Hero, Projekte, Leistungen) sind reine CSS-Konstruktionen. Sobald echte
Bilder ergänzt werden:

- Format: WebP oder komprimiertes JPEG.
- Team-Fotos: Seitenverhältnis 4:5, max. ~200 KB.
- Projekt-/Showcase-Bilder: max. ~300 KB, sinnvolle `width`/`height`-Attribute
  setzen (verhindert Layout-Shift).
- Alles unterhalb des ersten Bildschirms sollte `loading="lazy"` erhalten
  (bei Team-Fotos bereits vorbereitet, siehe `script.js`).

## SEO / Open Graph

`index.html` enthält Meta-Description, `theme-color` sowie Open-Graph- und
Twitter-Card-Tags. Ein Social-Preview-Bild (`og:image`, empfohlen
1200×630px) ist vorbereitet, aber auskommentiert — sobald
`assets/images/og-cover.jpg` existiert, den Tag im `<head>` aktivieren.
