/**
 * 小小表达家 — 图片获取与缓存模块
 * 使用 Pexels API 获取真实图片，localStorage 做缓存
 */

const Images = {
  _cache: {},
  _pending: {},  // 防止重复请求
  _apiKey: '',

  init() {
    this._apiKey = CONFIG.PEXELS_API_KEY;
    this._cache = Storage.getImageCache();
  },

  /**
   * 获取某个节点的图片 URL
   * @param {object} node - 菜单节点
   * @param {boolean} forceRefresh - 是否强制刷新
   * @returns {Promise<string|null>} 图片 URL 或 null
   */
  async getImage(node, forceRefresh = false) {
    const nodeId = node.id;

    // 1. 检查是否有自定义图片
    if (node.customImage && !forceRefresh) {
      return node.customImage;
    }

    // 2. 检查缓存
    if (!forceRefresh && this._cache[nodeId]) {
      const cached = this._cache[nodeId];
      const age = Date.now() - cached.ts;
      if (age < CONFIG.IMAGE_CACHE_TTL) {
        return cached.url;
      }
    }

    // 3. 防止重复请求
    if (this._pending[nodeId]) {
      return this._pending[nodeId];
    }

    // 4. 发起 API 请求
    const query = node.imageQuery || node.name;
    this._pending[nodeId] = this._fetchFromPexels(query)
      .then(url => {
        if (url) {
          this._cache[nodeId] = { url, ts: Date.now() };
          Storage.saveImageCache(this._cache);
        }
        delete this._pending[nodeId];
        return url;
      })
      .catch(err => {
        console.warn('Pexels API 请求失败:', err.message);
        delete this._pending[nodeId];
        return null;
      });

    return this._pending[nodeId];
  },

  /**
   * 从 Pexels API 获取图片
   */
  async _fetchFromPexels(query) {
    // 如果没有 API Key，使用 fallback
    if (!this._apiKey || this._apiKey === 'YOUR_PEXELS_API_KEY_HERE') {
      return this._getFallbackImage(query);
    }

    try {
      const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square&size=medium&locale=zh-CN`;
      const response = await fetch(url, {
        headers: {
          'Authorization': this._apiKey
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium; // medium: 350px, 适合卡片
      }
      return this._getFallbackImage(query);
    } catch (e) {
      console.warn('Pexels 请求异常:', e.message);
      return this._getFallbackImage(query);
    }
  },

  /**
   * 回退方案：使用 SVG 占位图（彩色背景 + emoji）
   */
  _getFallbackImage(query) {
    // 返回 null 将触发 emoji 占位显示
    return null;
  },

  /**
   * 生成 SVG 占位图片 Data URI
   */
  generatePlaceholder(emoji, color) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect fill="${color || '#e9ecef'}" width="200" height="200" rx="16"/>
      <text font-size="80" x="100" y="120" text-anchor="middle" dominant-baseline="middle">${emoji || '📷'}</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  },

  /**
   * 预加载某个分类下所有图片（可选）
   */
  async preloadCategory(categoryNode) {
    const walk = (node) => {
      if (!node.children || node.children.length === 0) {
        this.getImage(node); // fire and forget
      } else {
        node.children.forEach(walk);
      }
    };
    walk(categoryNode);
  },

  /**
   * 清除所有图片缓存
   */
  clearCache() {
    this._cache = {};
    Storage.saveImageCache({});
  }
};
