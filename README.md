# Symbole erkennen – Quiz zur rechtsextremen Szene

Interaktive Website mit **Symbolatlas** (51 Erkennungszeichen der rechtsextremen Szene) und **Quiz**
(173 Fragen: Rechts-Status, Bedeutung, Kategorie, Kontext-Aussagen).

**Live:** https://felixp04-creator.github.io/symbole-erkennen/ (QR-Code: [`qr-code.png`](qr-code.png))

> ⚖️ **Hinweis:** Dieses Projekt dient ausschließlich Bildungszwecken (Schulen, Jugendarbeit).
> Die Inhalte stützen sich auf *fluter Nr. 42* der Bundeszentrale für politische Bildung (bpb).
> Rechtslage: § 86a StGB – diese Seite ist keine Rechtsberatung.

## Quellen der Inhalte

- Infografik: *fluter Nr. 42* (bpb), Grafik: Ole Härtzschel
- Symbolabbildungen: 1:1-Crops aus der Infografik + Symbole aus „Versteckspiel" (asp e. V.)
- Die **51 Symbolbilder** liegen als PNG in [`src/crops/`](src/crops/) – eine Datei pro Symbol,
  Dateiname = Symbol-`id` (z. B. `src/crops/hakenkreuz.png`)

## Repository-Struktur

```
├── index.html            ← FERTIGE Website (Build-Output, wird von GitHub Pages ausgeliefert)
│                           NICHT von Hand bearbeiten – sie wird beim nächsten Build überschrieben!
├── qr-code.png           ← QR-Code zur Live-URL
├── LICENSE               ← MIT-Lizenz
└── src/                  ← QUELLE: hier ändern
    ├── index.template.html  ← ALLE Inhalte + Layout + Logik (einzige Datei mit Text/Inhalten)
    ├── build.js             ← Build-Skript (Platzhalter → Base64)
    ├── crops/               ← 51 Symbolbilder (PNG)
    └── fonts/               ← 4 Schriften (woff2, Base64 eingebettet)
```

## Inhalte ändern (z. B. mit einer KI)

**Alle Inhalte stecken in einer Datei: `src/index.template.html`.**
Die Website besteht aus HTML + CSS + JavaScript in dieser einen Datei.

### Die wichtigsten Blöcke (in `index.template.html`)

| Block | Inhalt | Was man dort ändern kann |
|---|---|---|
| `const CATS` | 7 Kategorien mit Label + Kurzform | Kategorie-Namen |
| `const STATUS` | 3 Rechts-Statusse (verboten / kontext / erlaubt) | Status-Beschriftungen |
| `const ART` | Bild-Verweis je Symbol-`id` (Platzhalter `__IMG_<id>__`) | Bild je Symbol |
| `const SYMBOLS` | **Die 51 Symbole** – Herzstück des Atlas | Alle Texte zu den Symbolen |
| `const STATEMENTS` | 20 Aussage-Fragen („Richtig/Falsch") mit Begründung | Aussagen + Begründungen |
| Quiz-Logik (weiter unten) | Erzeugt aus den Daten automatisch 173 Fragen | Fragetypen, Auswertung |

### Ein Symbol hat dieses Format (`const SYMBOLS`):

```js
{ id:"hakenkreuz", name:"Hakenkreuz", cat:"ns", st:"verboten",
  short:"Staatssymbol des „Dritten Reichs“",
  def:"Das Hakenkreuz war das zentrale Symbol des Nationalsozialismus …",
  ctx:"Bis heute eines der deutlichsten Kennzeichen neonazistischer Gesinnung …" },
```

- `id` – eindeutiger Name, **muss** zur Bilddatei `src/crops/<id>.png` passen
- `name` – Anzeigename
- `cat` – Kategorie (Schlüssel aus `CATS`: `ns`, `org`, `germ`, `code`, `brand`, `neutral`, `left`)
- `st` – Rechts-Status (Schlüssel aus `STATUS`: `verboten`, `kontext`, `erlaubt`)
- `short` – Einzeiler für die Atlas-Karte
- `def` – Definition/Erläuterung
- `ctx` – Kontext & Einordnung in der Szene

**Pro Symbol entstehen automatisch 3 Quizfragen** (Status, Definition, Kategorie) –
zusätzlich die 20 Aussagen aus `STATEMENTS` = **173 Fragen gesamt**.
Neue Symbole: Eintrag in `SYMBOLS` + Bild in `src/crops/` + Zeile in `ART` mit
`'<img src="__IMG_<neue-id>__" alt="">'` – fertig, der Rest funktioniert automatisch.

### Eine Aussage-Frage (`const STATEMENTS`):

```js
{ t:"Wer einen Thorshammer trägt, ist automatisch ein Neonazi.", ok:false,
  why:"Nein. Der Thorshammer ist auch in der Metal-Szene …" },
```

## Nach Änderungen: bauen & veröffentlichen

Voraussetzung: [Node.js](https://nodejs.org/)

```bash
# 1) Änderungen in src/index.template.html (ggf. neue Bilder in src/crops/)
# 2) Neue index.html bauen (überschreibt die alte):
cd src
node build.js
#    → "OK: 55 placeholders replaced (51 images), final size: ~1386 KB"

# 3) Lokal testen (optional), z. B. aus dem Projekt-Ordner:
python -m http.server 8000      # dann http://localhost:8000/index.html

# 4) Veröffentlichen:
git add index.html
git commit -m "Inhalt angepasst: …"
git push
```

Nach dem `git push` dauert es ca. 1–2 Minuten, bis GitHub Pages die neue Seite
unter der Live-URL ausliefert (URL und QR-Code bleiben unverändert).

## Wichtige Regeln beim Bearbeiten

1. **Nur `src/index.template.html` bearbeiten** – `index.html` ist Build-Output.
2. Nach jeder inhaltlichen Änderung immer `node build.js` laufen lassen und
   die neue `index.html` mit committen, sonst erscheint nichts auf der Live-Seite.
3. Jede neue Symbol-`id` braucht drei Dinge: Eintrag in `SYMBOLS`, Bild `crops/<id>.png`,
   Platzhalter-Eintrag in `ART` (`__IMG_<id>__`).
4. Keine weiteren Dateien ins Projekt-Root legen, die `index.html` heißt –
   GitHub Pages liefert immer die `index.html` im Root aus.
5. Texte: Deutsch, klare und pädagogisch neutrale Formulierungen,
   immer den bildungszweck-fokussierten Ton beibehalten.

## Lizenz

- Code, Layout und Texte: [MIT](LICENSE)
- Symbolbilder: stammen aus der bpb-Infografik *fluter Nr. 42* (Grafik Ole Härtzschel)
  und aus „Versteckspiel" (asp e. V.) – Verwendung hier im Bildungszweck.
  Für eine Weiterveröffentlichung außerhalb dieses Projekts bitte die
  Originalanbieter um Freigabe bitten.
