/**
 * 小小表达家 — 全局配置
 */

const CONFIG = {
  // Pexels API Key — 在 https://www.pexels.com/api/ 免费注册获取
  // 免费额度：200 次请求/小时
  PEXELS_API_KEY: 'YOUR_PEXELS_API_KEY_HERE',

  // 每页显示图片数量（Pexels API）
  PEXELS_PER_PAGE: 1,

  // 图片缓存有效期（毫秒），默认 7 天
  IMAGE_CACHE_TTL: 7 * 24 * 60 * 60 * 1000,

  // 动画持续时间（毫秒）
  ANIMATION_DURATION: 300,

  // 语音播报语速（0.1-10，儿童友好语速稍慢）
  SPEECH_RATE: 0.85,

  // 语音播报音调
  SPEECH_PITCH: 1.1,

  // 语音播报语言
  SPEECH_LANG: 'zh-CN',

  // 应用主题色（暖黄色，适合儿童）
  THEME_COLOR: '#FFD43B',

  // 应用背景色
  BG_COLOR: '#FFF9E6',

  // 卡片圆角
  CARD_RADIUS: '20px',

  // 最大面包屑层级显示（移动端）
  MAX_BREADCRUMB_MOBILE: 3,

  // 管理员默认密码
  DEFAULT_ADMIN_PASSWORD: '123456',

  // 应用名称
  APP_NAME: '小小表达家',

  // 应用版本
  APP_VERSION: '1.0.0'
};
