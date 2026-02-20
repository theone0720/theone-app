const CACHE_NAME = "theone-split-20260220091518";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./sw.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./assets/img_001.webp",
  "./assets/img_002.webp",
  "./assets/img_003.webp",
  "./assets/img_004.webp",
  "./assets/img_005.webp",
  "./assets/img_006.webp",
  "./assets/img_007.webp",
  "./assets/img_008.webp",
  "./assets/img_009.webp",
  "./assets/img_010.webp",
  "./assets/img_011.webp",
  "./assets/img_012.webp",
  "./assets/img_013.webp",
  "./assets/img_014.webp",
  "./assets/img_015.webp",
  "./assets/img_016.webp",
  "./assets/img_017.webp",
  "./assets/img_018.webp",
  "./assets/img_019.webp",
  "./assets/img_020.webp",
  "./assets/img_021.webp",
  "./assets/img_022.webp",
  "./assets/img_023.webp",
  "./assets/img_024.webp",
  "./assets/img_025.webp",
  "./assets/img_026.webp",
  "./assets/img_027.webp",
  "./assets/img_028.webp",
  "./assets/img_029.webp",
  "./assets/img_030.webp",
  "./assets/img_031.webp",
  "./assets/img_032.webp",
  "./assets/img_033.webp",
  "./assets/img_034.webp",
  "./assets/img_035.webp",
  "./assets/img_036.webp",
  "./assets/img_037.webp",
  "./assets/img_038.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return res;
    }).catch(() => cached))
  );
});
