// scripts/build-www.js — copie l'app statique (sans build) dans www/, le
// dossier que Capacitor embarque dans l'app iOS/Android. Le site web
// (Netlify/GitHub Pages) sert directement les fichiers à la racine du dépôt ;
// www/ n'existe que pour l'emballage natif, il n'est jamais commité.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WWW = path.join(ROOT, 'www');

const FILES = [
  'index.html', 'ui.jsx', 'data.jsx', 'screens.jsx', 'extras.jsx', 'extras2.jsx',
  'ios-frame.jsx', 'tweaks-panel.jsx', 'manifest.webmanifest', 'sw.js', 'privacy.html',
];
const DIRS = ['vendor', 'deploy'];

fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(WWW, { recursive: true });

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

for (const f of FILES) fs.copyFileSync(path.join(ROOT, f), path.join(WWW, f));
for (const d of DIRS) copyDir(path.join(ROOT, d), path.join(WWW, d));

console.log(`www/ prêt (${FILES.length} fichiers + ${DIRS.join(', ')})`);
