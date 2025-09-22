const CACHE_NAME = "greenbite-cache-v1";
const urlsToCache = [
  "/",
  "./index.html",
  "./CSS/styles.css",
  "./Script/script.js",
  "./manifest.json"
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch cached resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});