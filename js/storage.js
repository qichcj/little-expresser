/**
 * 小小表达家 — localStorage 存储封装
 */

const Storage = {
  // ========== 菜单数据 ==========
  getMenuData() {
    try {
      const saved = localStorage.getItem('lse_menuData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('加载菜单数据失败', e);
    }
    // 返回默认数据的深拷贝
    return JSON.parse(JSON.stringify(DEFAULT_MENU_DATA));
  },

  saveMenuData(data) {
    try {
      localStorage.setItem('lse_menuData', JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('保存菜单数据失败', e);
      return false;
    }
  },

  resetMenuData() {
    localStorage.removeItem('lse_menuData');
    return JSON.parse(JSON.stringify(DEFAULT_MENU_DATA));
  },

  // ========== 图片缓存 ==========
  getImageCache() {
    try {
      const cache = localStorage.getItem('lse_imageCache');
      return cache ? JSON.parse(cache) : {};
    } catch (e) {
      return {};
    }
  },

  saveImageCache(cache) {
    try {
      localStorage.setItem('lse_imageCache', JSON.stringify(cache));
    } catch (e) {
      // localStorage 满了，清理旧缓存
      this.clearExpiredCache(cache);
      try {
        localStorage.setItem('lse_imageCache', JSON.stringify(cache));
      } catch (e2) {
        console.warn('图片缓存存储空间不足');
      }
    }
  },

  clearExpiredCache(cache) {
    const now = Date.now();
    for (const key in cache) {
      if (cache[key].ts && (now - cache[key].ts) > CONFIG.IMAGE_CACHE_TTL) {
        delete cache[key];
      }
    }
  },

  // ========== 管理员密码 ==========
  getAdminPassword() {
    return localStorage.getItem('lse_adminPassword') || CONFIG.DEFAULT_ADMIN_PASSWORD;
  },

  setAdminPassword(password) {
    localStorage.setItem('lse_adminPassword', password);
  },

  // ========== 用户偏好 ==========
  getPreference(key, defaultValue) {
    const val = localStorage.getItem('lse_pref_' + key);
    return val !== null ? JSON.parse(val) : defaultValue;
  },

  setPreference(key, value) {
    localStorage.setItem('lse_pref_' + key, JSON.stringify(value));
  },

  // ========== 导出/导入 ==========
  exportAll() {
    const data = {
      version: CONFIG.APP_VERSION,
      exportedAt: new Date().toISOString(),
      menuData: this.getMenuData(),
      imageCache: this.getImageCache(),
      preferences: {}
    };
    // 收集所有偏好
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('lse_pref_')) {
        try {
          data.preferences[key] = JSON.parse(localStorage.getItem(key));
        } catch (e) {
          data.preferences[key] = localStorage.getItem(key);
        }
      }
    }
    return data;
  },

  importAll(data) {
    if (!data || !data.menuData) {
      throw new Error('无效的导入数据');
    }
    this.saveMenuData(data.menuData);
    if (data.imageCache) {
      this.saveImageCache(data.imageCache);
    }
    if (data.preferences) {
      for (const key in data.preferences) {
        localStorage.setItem(key, JSON.stringify(data.preferences[key]));
      }
    }
    return true;
  }
};
