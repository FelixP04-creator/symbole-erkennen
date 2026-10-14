// Build-Skript: ersetzt alle Platzhalter in index.template.html
// durch Base64-datierte Fonts (fonts/) und Symbolbilder (crops/)
// und schreibt die fertige, selbstständige Datei ../index.html.
//
// Aufruf:  node build.js      (aus diesem src/-Ordner oder von überall)
//
// Platzhalter im Template:
//   __FONT_INTER400__ / __FONT_INTER700__ / __FONT_INTER800__ / __FONT_FRAKTUR__
//   __IMG_<symbol-id>__   (ein Bild je Symbol, z. B. __IMG_hakenkreuz__)
// Jedes Symbol in SYMBOLS (im Template) braucht einen passenden
// Eintrag in ART sowie eine Datei crops/<symbol-id>.png.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE = path.join(__dirname, "index.template.html");
const OUT = path.join(ROOT, "index.html");
const F = path.join(__dirname, "fonts");
const C = path.join(__dirname, "crops");

let html = fs.readFileSync(TEMPLATE, "utf8");
const b64 = p => fs.readFileSync(p).toString("base64");

const map = {
  "__FONT_INTER400__": b64(path.join(F, "inter-400.woff2")),
  "__FONT_INTER700__": b64(path.join(F, "inter-700.woff2")),
  "__FONT_INTER800__": b64(path.join(F, "inter-800.woff2")),
  "__FONT_FRAKTUR__": b64(path.join(F, "unifraktur-400.woff2"))
};
const ids = fs.readdirSync(C).filter(f => f.endsWith(".png")).map(f => f.replace(/\.png$/, ""));
for (const id of ids) {
  map["__IMG_" + id + "__"] = "data:image/png;base64," + b64(path.join(C, id + ".png"));
}
let n = 0;
for (const [k, v] of Object.entries(map)) {
  if (!html.includes(k)) { console.error("MISSING PLACEHOLDER", k); process.exit(1); }
  html = html.split(k).join(v);
  n++;
}
fs.writeFileSync(OUT, html);
console.log("OK:", n, "placeholders replaced (" + ids.length + " images), final size:", (html.length / 1024).toFixed(0), "KB");
