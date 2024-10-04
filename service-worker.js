// Tentukan nama cache
const CACHE_NAME = 'my-site';
const urlsToCache = [
  '/',
  'index.html',
  'about.html',
  'contact.html',
  'app.js',
  'logo.jpeg',
];

// Event 'install' untuk meng-cache aset-aset statis
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch' untuk mengambil aset dari cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Jika ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }

        // Jika tidak ada di cache, fetch dari jaringan
        return fetch(event.request).catch(function() {
          // Tampilkan fallback offline page jika request gagal (misalnya offline)
          return caches.match('/index.html');
        });
      })
  );
});

// Event 'activate' untuk membersihkan cache lama
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then(function(cache) {
          return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
      caches.match(event.request)
      .then(function(response) {
          return response || fetch(event.request);
      })
  );
}

