// sw.js (Kill Switch / Self-destruct Service Worker)
// 목적: 기존 캐시 전부 삭제 + SW 자동 해제 + 페이지 자동 새로고침

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // 1) 모든 캐시 삭제
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));

    // 2) 서비스워커 등록 해제
    try {
      await self.registration.unregister();
    } catch (e) {}

    // 3) 열려있는 페이지들 강제 새로고침(최신 index/html 받게)
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    clients.forEach((c) => {
      try { c.navigate(c.url); } catch (e) {}
    });
  })());
});

// fetch 핸들러를 두지 않음 = 더 이상 캐시/가로채기 안 함
