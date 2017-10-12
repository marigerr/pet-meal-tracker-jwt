const CACHE_NAME = 'pet-meals-cache-v1';
const urlsToCache = [
  '/',
  '/meals',
  'images/pawprintWhite24.png',
  'bundle.js'
];

self.addEventListener('activate', function (event) {
  //console.log(event);
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
      )
  );
});

self.addEventListener('install', function (event) {
  //console.log(event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        //console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});