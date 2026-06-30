/**
 * 小小表达家 — 卡通图片模块
 * 生成精美的彩色 SVG 占位图，零网络依赖，瞬间加载
 */

const Images = {
  _imgSize: 400,

  init() {
    this._imgSize = Math.min(600, Math.max(300, Math.floor(window.innerWidth / 3)));
  },

  /**
   * 生成节点对应的卡通图片 Data URI
   */
  getImage(node) {
    // 自定义图片优先
    if (node.customImage) return node.customImage;
    return this.generateSVG(node.emoji || '📷', node.color);
  },

  /**
   * 生成精美的卡通风格 SVG 图片
   */
  generateSVG(emoji, colorHex) {
    const hue = this._colorToHue(colorHex);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue},70%,88%)"/>
          <stop offset="100%" style="stop-color:hsl(${hue},60%,72%)"/>
        </linearGradient>
      </defs>
      <rect fill="url(#g)" width="200" height="200" rx="24"/>
      <circle cx="100" cy="80" r="44" fill="white" opacity="0.45"/>
      <circle cx="80" cy="65" r="8" fill="white" opacity="0.5"/>
      <text font-size="70" x="100" y="108" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
    </svg>`;
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  },

  _colorToHue(colorHex) {
    const hues = {
      '#FF6B6B': 0, '#FFA94D': 28, '#FFD43B': 48,
      '#69DB7C': 135, '#4DABF7': 205, '#DA77F2': 280, '#F783AC': 345
    };
    return hues[colorHex] || 200;
  }
};
