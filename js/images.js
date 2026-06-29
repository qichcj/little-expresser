/**
 * 小小表达家 — 图片获取与缓存模块
 * 主源：Pexels API 关键词搜索 → 100%匹配真实图片
 * 回退：Picsum 随机摄影图 → emoji 占位
 */

const Images = {
  _cache: {},
  _pending: {},
  _imgSize: 400,

  init() {
    this._cache = Storage.getImageCache();
    this._imgSize = Math.min(600, Math.max(300, Math.floor(window.innerWidth / 3)));
  },

  /**
   * 获取节点图片 URL
   */
  async getImage(node, forceRefresh = false) {
    const nodeId = node.id;

    // 1. 自定义图片优先
    if (node.customImage && !forceRefresh) return node.customImage;

    // 2. 缓存命中
    if (!forceRefresh && this._cache[nodeId]) {
      const cached = this._cache[nodeId];
      if (Date.now() - cached.ts < CONFIG.IMAGE_CACHE_TTL) {
        return cached.url;
      }
    }

    // 3. 防止重复请求
    if (this._pending[nodeId]) return this._pending[nodeId];

    // 4. 发起请求（带超时保护）
    const query = node.imageQuery || node.name;
    this._pending[nodeId] = Promise.race([
      this._fetchFromPexels(query),
      new Promise(r => setTimeout(() => r(null), 5000)) // 5秒超时
    ])
      .then(url => {
        if (url) {
          this._cache[nodeId] = { url, ts: Date.now() };
          Storage.saveImageCache(this._cache);
        }
        delete this._pending[nodeId];
        return url;
      })
      .catch(() => {
        delete this._pending[nodeId];
        return null;
      });

    return this._pending[nodeId];
  },

  /**
   * Pexels API — 关键词搜索真实图片
   */
  async _fetchFromPexels(query) {
    const apiKey = CONFIG.PEXELS_API_KEY;
    if (!apiKey || apiKey === 'YOUR_PEXELS_API_KEY_HERE') return null;

    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square&size=medium&locale=zh-CN`;
      const resp = await fetch(url, { headers: { 'Authorization': apiKey } });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium;
      }
    } catch (e) {
      console.warn('Pexels API 失败:', e.message);
    }
    return null;
  },

  /**
   * 回退 URL（Pexels 失败时用）
   */
  getFallbackUrl(node) {
    const size = this._imgSize;
    const seed = encodeURIComponent(node.id);
    return `https://picsum.photos/seed/${seed}/${size}/${size}`;
  },

  clearCache() {
    this._cache = {};
    Storage.saveImageCache({});
  }
};
