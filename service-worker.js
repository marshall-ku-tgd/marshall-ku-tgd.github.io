const CACHE_NAME = "static-cache-v2.0.2";
const FILES_TO_CACHE = [
    "/offline.html",
    "/favicon.ico",
    "/main.js",
    "/style.css",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (CACHE_NAME !== key) return caches.delete(key);
                })
            )
        )
    );
});

self.addEventListener("fetch", (event) => {
    caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
            return response || fetch(event.request);
        });
    });
});