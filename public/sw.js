// LivRise Infrastructure Service Worker
const CACHE_NAME = 'livrise-shell-v2';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline',
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

  // Security critical: NEVER cache private client data, API, Supabase, app portal, or admin requests
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/app') ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/portal') ||
    url.hostname.includes('supabase') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // Handle navigation requests (pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;
        const offlineFallback = await cache.match('/offline');
        return offlineFallback || new Response('Offline', { status: 503, statusText: 'Offline' });
      })
    );
    return;
  }

  // Cache fallback for static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        // Cache successful image or font assets
        if (
          response &&
          response.status === 200 &&
          (url.pathname.startsWith('/images/') || url.pathname.endsWith('.png') || url.pathname.endsWith('.ico'))
        ) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      });
    }).catch(() => {
      // If asset fetch fails, return empty or fallback
      return new Response('', { status: 408, statusText: 'Request Timeout' });
    })
  );
});
