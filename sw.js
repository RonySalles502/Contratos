/* Service worker — Gestão de Contratos CFCC/DPE-RN
   Cacheia o app shell para uso offline. Os DADOS não passam por aqui:
   ficam em localStorage (local) e na pasta compartilhada (File System Access API). */
const CACHE = 'cfcc-contratos-gh-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  e.respondWith(
    caches.match(r).then(cached => cached || fetch(r).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(r, copy)).catch(() => {});
      return resp;
    }).catch(() => caches.match('./index.html')))
  );
});
