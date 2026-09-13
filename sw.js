const CACHE_NAME = 'cyberdoctor-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/bat-icon.svg',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          if(e.request.method === 'GET' && e.request.url.startsWith('http')) {
            cache.put(e.request, fetchRes.clone());
          }
          return fetchRes;
        });
      });
    }).catch(() => {
        if (e.request.mode === 'navigate') {
            return caches.match('/index.html');
        }
    })
  );
});
