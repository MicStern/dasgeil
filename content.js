/**
 * Content-Modell der dasgeil Mainpage.
 *
 * Trennung von Inhalt und Darstellung: script.js liest diese Arrays und
 * rendert sie in die dafür vorgesehenen Container (#projectsList,
 * #servicesPanel, #teamList, #showcaseStage). Reale Projekte, Team-Mitglieder
 * und Showcase-Freischaltungen werden ausschließlich HIER eingetragen -
 * an script.js oder index.html muss dafür nichts geändert werden.
 *
 * Siehe README.md, Abschnitt "Inhalte pflegen".
 */

// -----------------------------------------------------------------------
// Projekte / Case Studies
// -----------------------------------------------------------------------
// status: "placeholder" | "concept" | "in-progress" | "published"
// layout: "full-width" | "split" | "identity" - bestimmt die Renderfunktion
//         in script.js (renderProjectFullWidth / renderProjectSplit /
//         renderProjectIdentity). Ein echtes, veröffentlichtes Projekt kann
//         weiterhin eines dieser drei Layouts nutzen, oder es wird bei
//         Bedarf eine vierte Renderfunktion ergänzt.
// result: wird nur angezeigt, wenn status "published" ist. Bei Platzhaltern
//         immer null lassen - erfundene Ergebniszahlen sind nicht erlaubt.
const projects = [
  {
    id: "relaunch-etabliert",
    status: "placeholder",
    type: "Case Study in Vorbereitung",
    title: "Digitaler Relaunch für ein etabliertes Unternehmen",
    subtitle: "Struktur, Design und Technik neu gedacht.",
    description:
      "Eine bestehende Website wird strukturell, visuell und technisch modernisiert, ohne ihre gewachsene Identität zu verlieren.",
    services: [
      "Strategie",
      "Informationsarchitektur",
      "UX/UI",
      "Visuelles Design",
      "Responsive Entwicklung",
    ],
    images: [], // Projektbild(er) ergänzen - siehe README "Projekte pflegen"
    result: null,
    caseStudyUrl: null,
    layout: "full-width",
    ctaLabel: "Case folgt",
    ctaNote: "Diese Case Study befindet sich aktuell in Vorbereitung.",
  },
  {
    id: "digitale-anwendung",
    status: "concept",
    type: "Konzeptprojekt",
    title: "Digitale Anwendung mit komplexen Nutzerwegen",
    subtitle: "Komplexität, verständlich gemacht.",
    description:
      "Komplexe Funktionen werden in eine verständliche, zugängliche und effiziente Benutzeroberfläche übersetzt.",
    services: [
      "UX-Research",
      "User Flows",
      "Prototyping",
      "Interface Design",
      "Usability Testing",
    ],
    images: [],
    result: null,
    caseStudyUrl: null,
    layout: "split",
    ctaLabel: "Konzept ansehen",
    ctaNote: "Ausführliche Dokumentation folgt.",
  },
  {
    id: "visuelle-identitaet",
    status: "placeholder",
    type: "Interne Designstudie",
    title: "Visuelle Identität für eine digitale Marke",
    subtitle: "Ein System, viele Anwendungen.",
    description:
      "Eine flexible Markenwelt, die über Website, mobile Anwendungen und digitale Kommunikation hinweg konsistent funktioniert.",
    services: [
      "Art Direction",
      "Typografie",
      "Farb- und Formensystem",
      "Digitale Markenanwendungen",
    ],
    images: [],
    result: null,
    caseStudyUrl: null,
    layout: "identity",
    ctaLabel: "Designstudie ansehen",
    ctaNote: "Ausführliche Dokumentation folgt.",
  },
];

// -----------------------------------------------------------------------
// Leistungen (interaktive Sektion: Liste links/oben, Vorschau rechts/unten)
// -----------------------------------------------------------------------
// visual: steuert, welches abstrakte Vorschau-Artefakt script.js rendert
//         ("website" | "research" | "identity" | "growth").
const services = [
  {
    id: "websites",
    title: "Websites und digitale Auftritte",
    description:
      "Von der Strategie bis zum Launch - eine Website, die auffällt und funktioniert.",
    items: [
      "Strategie",
      "Informationsarchitektur",
      "UX/UI",
      "Visuelles Design",
      "Entwicklung",
      "Testing",
      "Launch",
    ],
    visual: "website",
  },
  {
    id: "ux-research",
    title: "UX-Research",
    description:
      "Entscheidungen auf Basis von echtem Nutzerverhalten statt Bauchgefühl.",
    items: [
      "Nutzerinterviews",
      "Usability Testing",
      "Analyse bestehender Systeme",
      "Prototyping",
    ],
    visual: "research",
  },
  {
    id: "identitaet",
    title: "Visuelle Identität",
    description:
      "Eine grafische Sprache, die zur Marke passt und über alle Kanäle funktioniert.",
    items: [
      "Art Direction",
      "Typografie",
      "Farb- und Formensystem",
      "Digitale Markenanwendungen",
    ],
    visual: "identity",
  },
  {
    id: "weiterentwicklung",
    title: "Weiterentwicklung",
    description:
      "Was nach dem Launch passiert, entscheidet oft mehr als der Launch selbst.",
    items: [
      "Optimierung",
      "Landingpages",
      "Neue Funktionen",
      "Betreuung nach dem Launch",
    ],
    visual: "growth",
  },
];

// -----------------------------------------------------------------------
// Team
// -----------------------------------------------------------------------
// photo: Pfad zu einem Foto (z.B. "assets/images/team/vorname.jpg") oder
//        null für den Platzhalter. Siehe README "Team pflegen".
const team = [
  {
    id: "psychologie",
    name: null, // "Name ergänzen" wird angezeigt, solange dies null ist
    role: "Psychologie",
    bio: "Versteht, wie Menschen denken, fühlen und entscheiden - und übersetzt das in klare Anforderungen.",
    photo: null,
    linkedin: null,
  },
  {
    id: "ux-research-entwicklung",
    name: null,
    role: "UX-Research & Entwicklung",
    bio: "Verbindet Nutzerforschung mit sauberer technischer Umsetzung.",
    photo: null,
    linkedin: null,
  },
  {
    id: "grafikdesign",
    name: null,
    role: "Grafikdesign",
    bio: "Baut aus Form, Farbe und Typografie Auftritte, die hängen bleiben.",
    photo: null,
    linkedin: null,
  },
];

// -----------------------------------------------------------------------
// "Was wäre wenn ..." - vorbereitete Showcase-Welten
// -----------------------------------------------------------------------
// enabled: false -> Klick öffnet das Lade-Overlay und endet in der
//          "wird gerade gebaut"-Meldung. Sobald eine Unterseite live ist,
//          hier auf true setzen und targetUrl prüfen - mehr ist nicht
//          nötig, script.js braucht dafür keine Änderung.
const showcaseWorlds = [
  {
    id: "kita",
    label: "dasgeil.kita",
    question: "Was wäre, wenn wir eine Kita wären?",
    direction: "Kidcore. Verspielt. Sticker, illustrative Figuren, starke Formen.",
    ctaLabel: "Kita eröffnen",
    transitionText: "Wir machen mal eben eine Kita auf …",
    targetUrl: "/kita/",
    enabled: false,
  },
  {
    id: "werkstatt",
    label: "dasgeil.werkstatt",
    question: "Was wäre, wenn wir eine Werkstatt wären?",
    direction: "Hochwertiger Punk-Grunge. Warmes Papier, Xerox, Tape.",
    ctaLabel: "Werkstatt öffnen",
    transitionText: "Wir schrauben mal eben eine Werkstatt zusammen …",
    targetUrl: "/werkstatt/",
    enabled: false,
  },
  {
    id: "beauty",
    label: "dasgeil.beauty",
    question: "Was wäre, wenn wir ein Beauty Studio wären?",
    direction: "Grainy Blur. Floral, weich, atmosphärisch.",
    ctaLabel: "Studio betreten",
    transitionText: "Wir bringen mal eben alles zum Glänzen …",
    targetUrl: "/beauty/",
    enabled: false,
  },
  {
    id: "arcade",
    label: "dasgeil.arcade",
    question: "Was wäre, wenn wir eine Arcade-Halle wären?",
    direction: "Signal Graphics. Frühe 90er-3D-Ästhetik, sichtbare Pixel.",
    ctaLabel: "Insert Coin",
    transitionText: "Wir booten mal eben die Arcade …",
    targetUrl: "/arcade/",
    enabled: false,
  },
];
