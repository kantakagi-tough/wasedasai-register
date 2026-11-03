// 更新したらこの番号を上げる（v4 → v5）
const CACHE = "obanyaki-register-v4";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png"];

// インストール時はブラウザのキャッシュを使わず、必ずサーバーから最新を取る
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(FILES.map(u => fetch(u, { cache: "reload" }).then(r => { if (r.ok) return c.put(u, r); }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function timeout(ms) { return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // ページ本体：通信できれば最新、だめ（3秒以内に返らない・オフライン）ならキャッシュ
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      try {
        const r = await Promise.race([fetch(req.url, { cache: "no-cache" }), timeout(3000)]);
        if (r.ok) { c.put("./index.html", r.clone()); return r; }
        throw new Error("bad");
      } catch (_) {
        return (await c.match("./index.html")) || (await c.match("./")) || Response.error();
      }
    })());
    return;
  }
  // それ以外：キャッシュで即返し、裏で更新
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req.url, { cache: "no-cache" }).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
