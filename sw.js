const CACHE_NAME="theone-pwa-split-20260220075537";
const CORE=["./","./index.html","./manifest.webmanifest","./sw.js","./icons/icon-192.png","./icons/icon-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));self.clients.claim();});
self.addEventListener("fetch",e=>{
 if(e.request.method!=="GET") return;
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(ca=>ca.put(e.request,copy));return r;})).catch(()=>c)));
});
