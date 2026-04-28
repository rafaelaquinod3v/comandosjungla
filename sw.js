/**
 * Ghost Engine Service Worker
 * Pure browser APIs for offline caching.
 */
const CACHE_NAME = 'jcore-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/tokens.css',
  '/css/layout.css',
  '/css/components.css',
  '/css/a11y.css',
  '/js/app.js',
  '/lang/en.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
