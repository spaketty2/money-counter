// sw.js — Service Worker แบบเรียบง่าย สำหรับ PWA
const CACHE = 'money-counter-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
  // จะพรีแคชไฟล์ล่วงหน้าก็เพิ่มได้ เช่น:
  // event.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./index.html','./manifest.webmanifest'])));
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(()=>{});
      return response;
    }).catch(() => caches.match(event.request))
  );
});
