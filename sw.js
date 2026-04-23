const CACHE = 'promocam-v1';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  // Network first for API calls, cache first for assets
  if (e.request.url.includes('googleapis') || e.request.url.includes('nominatim')) {
    return; // always network
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
