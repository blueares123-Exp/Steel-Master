/* SteelBook offline support. Keep this file next to index.html. */
const CACHE = 'steelbook-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Online: always fetch the newest copy and remember it. Offline (or a slow network): use the remembered copy.
function networkFirst(req, timeoutMs) {
  return caches.open(CACHE).then(cache => {
    const fresh = fetch(req, { cache: 'no-store' }).then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; });
    const cached = cache.match(req, { ignoreSearch: true });
    const timer = new Promise(resolve => setTimeout(resolve, timeoutMs)).then(() => cached);
    return Promise.race([fresh.catch(() => cached), timer.then(r => r || fresh)]).then(r => r || cached).then(r => r || fresh);
  });
}
// Fonts never change: use the remembered copy, fetch once if missing.
function cacheFirst(req) {
  return caches.open(CACHE).then(cache => cache.match(req).then(hit => hit || fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; })));
}
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) e.respondWith(networkFirst(req, 4000));
  else if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) e.respondWith(cacheFirst(req));
});
