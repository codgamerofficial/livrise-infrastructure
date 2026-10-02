// LivRise Infrastructure Service Worker
const CACHE_NAME = 'livrise-shell-v1';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/images/logo-dark.png',
  '/images/logo-light.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Security critical: NEVER cache API, Supabase, portal, or admin requests
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/portal') ||
    url.pathname.startsWith('/admin') ||
    url.hostname.includes('supabase') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // Network-first for dynamic navigation, cache fallback for static assets
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
