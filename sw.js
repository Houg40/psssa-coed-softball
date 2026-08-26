/**
 * PSSSA Offline Service Worker
 * Caches core static assets for offline ballfield reference.
 */

const CACHE_NAME = 'psssa-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './schedule/',
  './schedule/index.html',
  './locations/',
  './locations/index.html',
  './rules/',
  './rules/index.html',
  './join/',
  './join/index.html',
  './standings/',
  './standings/index.html',
  './teams/',
  './teams/index.html',
  './css/style.css',
  './js/data.js',
  './js/calendar.js',
  './js/app.js',
  './images/logo.svg',
  './images/favicon.svg',
  './data/schedule.json',
  './data/locations.json',
  './data/teams.json',
  './data/rules.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network first with cache fallback for fresh schedule data
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
