const CACHE_NAME = 'vjenix-v1';
const urlsToCache = ['/','/index.html','/manifest.json','/images/icon-192.png','/images/icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache).catch(()=>{})));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request).catch(()=>caches.match('/'))));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));
});
