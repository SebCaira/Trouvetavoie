// sw.js — cache applicative minimale pour l'usage hors-ligne de « Trouve ta voie ».
// Les appels à l'Annuaire de l'éducation (data.education.gouv.fr) et à l'API
// géo (geo.api.gouv.fr) ne sont volontairement pas mis en cache : ce sont des
// données vivantes, pas la coquille de l'app.
const CACHE_VERSION = 'ttv-shell-v1';
const APP_SHELL = [
  './',
  './index.html',
  './ui.jsx',
  './data.jsx',
  './screens.jsx',
  './extras.jsx',
  './extras2.jsx',
  './ios-frame.jsx',
  './tweaks-panel.jsx',
  './manifest.webmanifest',
  './deploy/icon-192.png',
  './deploy/icon-512.png',
];

const isLiveApi = (url) =>
  url.hostname === 'data.education.gouv.fr' || url.hostname === 'geo.api.gouv.fr';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (isLiveApi(url)) return; // laisse passer au réseau, jamais de cache

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
