/**
 * 小小表达家 — 图片获取与缓存模块
 * 策略：直接返回真实图片 URL，浏览器异步加载
 *       emoji 先展示，图片加载成功后自动替换
 *       加载失败则保留 emoji 占位
 */

const Images = {
  _cache: {},
  _imgSize: 400,

  init() {
    this._cache = Storage.getImageCache();
    this._imgSize = Math.min(600, Math.max(300, Math.floor(window.innerWidth / 3)));
  },

  /**
   * 获取某个节点的图片 URL（同步返回，不阻塞 UI）
   * @param {object} node - 菜单节点
   * @param {boolean} forceRefresh - 是否强制刷新
   * @returns {string|null} 图片 URL 或 null
   */
  async getImage(node, forceRefresh = false) {
    const nodeId = node.id;

    // 1. 自定义图片优先
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

    // 3. 生成图片 URL（不预检，让浏览器自然加载）
    const url = this._buildUrl(node);
    if (url) {
      this._cache[nodeId] = { url, ts: Date.now() };
      Storage.saveImageCache(this._cache);
    }
    return url;
  },

  /**
   * 构建图片 URL
   * LoremFlickr 按关键词匹配 Flickr 真实照片（无需 API Key）
   */
  _buildUrl(node) {
    const size = this._imgSize;
    const query = encodeURIComponent(node.imageQuery || node.name);
    return `https://loremflickr.com/${size}/${size}/${query}`;
  },

  /**
   * 获取回退 URL（关键词不匹配时用）
   */
  getFallbackUrl(node) {
    const size = this._imgSize;
    const seed = encodeURIComponent(node.id);
    return `https://picsum.photos/seed/${seed}/${size}/${size}`;
  },

  /**
   * 生成精致的 SVG 占位图（比纯 emoji 更好看）
   */
  generatePlaceholder(emoji, color) {
    const hue = this._colorToHue(color);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue},60%,85%)"/>
          <stop offset="100%" style="stop-color:hsl(${hue},50%,75%)"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect fill="url(#bg)" width="200" height="200" rx="16"/>
      <circle cx="100" cy="85" r="45" fill="white" opacity="0.3"/>
      <text font-size="72" x="100" y="110" text-anchor="middle" dominant-baseline="middle" filter="url(#shadow)">${emoji || '📷'}</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  },

  _colorToHue(color) {
    // 预定义颜色的 hue 值
    const hues = {
      '#FF6B6B': 0, '#FFA94D': 30, '#FFD43B': 48,
      '#69DB7C': 130, '#4DABF7': 205, '#DA77F2': 280, '#F783AC': 345
    };
    return hues[color] || 200;
  },

  /**
   * 清除所有图片缓存
   */
  clearCache() {
    this._cache = {};
    Storage.saveImageCache({});
  }
};
