/**
 * 小小表达家 — Service Worker
 * 提供离线缓存支持
 */

const CACHE_NAME = 'little-expresser-v1.0.0';

// 需要预缓存的核心资源
const PRECACHE_URLS = [
  './',
  './index.html',
  './admin.html',
  './css/style.css',
  './css/admin.css',
  './js/config.js',
  './js/data.js',
  './js/storage.js',
  './js/voice.js',
  './js/images.js',
  './js/router.js',
  './js/renderer.js',
  './js/admin.js',
  './manifest.json'
];

// ========== 安装：预缓存核心文件 ==========
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 预缓存核心文件');
        return cache.addAll(PRECACHE_URLS).catch(err => {
          // 部分文件失败不影响安装
          console.warn('部分预缓存失败:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// ========== 激活：清理旧缓存 ==========
self.addEventListener('activate', (event) => {
  console.log('📦 Service Worker 激活');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('🗑️ 删除旧缓存:', key);
            return caches.delete(key);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ========== 请求拦截：缓存优先策略 ==========
self.addEventListener('fetch', (event) => {
  // 跳过非 GET 请求和 API 请求
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('api.pexels.com')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // 命中缓存，直接返回
      if (cachedResponse) {
        // 同时在后台更新缓存
        const fetchPromise = fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            const cloned = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, cloned);
            });
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse;
      }

      // 未命中，从网络获取
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || !networkResponse.ok) {
          return networkResponse;
        }

        // 缓存成功的响应
        const cloned = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, cloned);
        });

        return networkResponse;
      }).catch(() => {
        // 网络失败且无缓存，返回离线页面
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('离线状态，请检查网络连接', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});
