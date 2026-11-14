// Sube el número de versión cada vez que cambies index.html para que los teléfonos descarguen la nueva
const CACHE = "mike-tracker-v11";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./vendor/three.min.js"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // La página: primero red (para recibir cambios), si no hay internet usa la copia guardada
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return res; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  })));
});
