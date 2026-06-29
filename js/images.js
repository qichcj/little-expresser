/**
 * 小小表达家 — 图片获取与缓存模块
 * 多源图片策略：LoremFlickr（按关键词匹配真实图片，无需API Key）
 *               → Picsum（高质量随机图回退）
 *               → emoji 占位（最终回退）
 */

const Images = {
  _cache: {},
  _pending: {},  // 防止重复请求
  _imgSize: 400, // 请求图片尺寸

  init() {
    this._cache = Storage.getImageCache();
    // 根据屏幕大小调整请求图片尺寸
    this._imgSize = Math.min(600, Math.max(300, Math.floor(window.innerWidth / 3)));
  },

  /**
   * 获取某个节点的图片 URL
   * @param {object} node - 菜单节点
   * @param {boolean} forceRefresh - 是否强制刷新
   * @returns {Promise<string|null>} 图片 URL 或 null
   */
  async getImage(node, forceRefresh = false) {
    const nodeId = node.id;

    // 1. 检查是否有自定义图片（家长后台设置）
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

    // 4. 多源依次尝试获取
    const query = node.imageQuery || node.name;
    this._pending[nodeId] = this._fetchImage(nodeId, query)
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
   * 多源图片获取策略
   */
  async _fetchImage(nodeId, query) {
    const size = this._imgSize;

    // 来源1：LoremFlickr — 按关键词匹配 Flickr 真实图片，无需 API Key
    try {
      const loremUrl = `https://loremflickr.com/${size}/${size}/${encodeURIComponent(query)}?lock=${this._hashCode(nodeId) % 100}`;
      const ok = await this._checkImage(loremUrl);
      if (ok) return loremUrl;
    } catch (e) {
      console.warn('LoremFlickr 不可用, 尝试下一源...');
    }

    // 来源2：Picsum Photos — 高质量随机图（基于 id 保证一致性）
    try {
      const picsumUrl = `https://picsum.photos/seed/${encodeURIComponent(nodeId)}/${size}/${size}`;
      const ok = await this._checkImage(picsumUrl);
      if (ok) return picsumUrl;
    } catch (e) {
      console.warn('Picsum 不可用');
    }

    // 最终回退：emoji 占位
    return null;
  },

  /**
   * 快速检查图片 URL 是否可访问
   */
  async _checkImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        img.src = '';
        resolve(false);
      }, 3000); // 3秒超时

      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
      img.src = url;
    });
  },

  /**
   * 简单哈希函数，为 loremflickr 生成稳定的 lock 值
   */
  _hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash);
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
   * 预加载某个分类下所有图片
   */
  async preloadCategory(categoryNode) {
    const walk = (node) => {
      if (!node.children || node.children.length === 0) {
        this.getImage(node);
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
