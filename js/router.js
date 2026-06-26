/**
 * 小小表达家 — 路由/状态管理
 * 管理当前导航路径：从根到当前节点的 id 数组
 */

const Router = {
  // 当前路径（节点 id 数组）
  // 例如: ['clothes', 'clothes-outdoor', 'clothes-outdoor-upper', 'clothes-outdoor-upper-jacket']
  _path: [],

  // 完整菜单数据引用
  _menuData: [],

  // 状态变更监听器
  _listeners: [],

  // 初始化
  init() {
    this._menuData = Storage.getMenuData();
    this._path = [];
  },

  // 获取当前路径
  getPath() {
    return [...this._path];
  },

  // 获取路径深度（0 = 首页, 1+ = 子菜单）
  getDepth() {
    return this._path.length;
  },

  // 获取当前层级的节点列表
  getCurrentLevel() {
    if (this._path.length === 0) {
      // 首页：返回一级分类
      return this._menuData.map(cat => ({
        id: cat.id,
        name: cat.name,
        emoji: cat.emoji,
        color: cat.color,
        hasChildren: true,
        imageQuery: null
      }));
    }

    // 沿路径找到当前节点，返回其 children
    let current = this._findNodeByPath(this._path);
    if (!current || !current.children || current.children.length === 0) {
      return []; // 叶子节点，无子级
    }
    return current.children.map(child => ({
      id: child.id,
      name: child.name,
      emoji: child.emoji,
      color: current.color, // 继承父级颜色
      hasChildren: child.children && child.children.length > 0,
      imageQuery: child.imageQuery,
      customImage: child.customImage
    }));
  },

  // 获取当前完整节点（如果是叶子节点）
  getCurrentNode() {
    if (this._path.length === 0) return null;
    return this._findNodeByPath(this._path);
  },

  // 检查当前是否为叶子节点
  isLeafNode() {
    const items = this.getCurrentLevel();
    return items.length === 0;
  },

  // 获取面包屑数据
  getBreadcrumb() {
    const crumbs = [
      { id: '__home__', name: '首页', emoji: '🏠' }
    ];

    let current = null;
    for (let i = 0; i < this._path.length; i++) {
      const searchPath = this._path.slice(0, i + 1);
      const node = this._findNodeByPath(searchPath);
      if (node) {
        crumbs.push({
          id: node.id,
          name: node.name,
          emoji: node.emoji
        });
        current = node;
      }
    }

    return crumbs;
  },

  // 导航到指定节点
  navigateTo(nodeId) {
    if (nodeId === '__home__') {
      return this.goHome();
    }

    // 检查该节点在当前层是否存在
    const items = this.getCurrentLevel();
    const found = items.find(item => item.id === nodeId);
    if (found) {
      this._path.push(nodeId);
      this._notify();
      return true;
    }
    return false;
  },

  // 返回上一级
  goBack() {
    if (this._path.length > 0) {
      this._path.pop();
      this._notify();
      return true;
    }
    return false;
  },

  // 返回首页
  goHome() {
    if (this._path.length > 0) {
      this._path = [];
      this._notify();
      return true;
    }
    return false;
  },

  // 跳转到面包屑中的某个位置
  goToBreadcrumb(index) {
    if (index === 0) {
      return this.goHome();
    }
    if (index > 0 && index <= this._path.length) {
      this._path = this._path.slice(0, index);
      this._notify();
      return true;
    }
    return false;
  },

  // 注册状态变更监听器
  onChange(listener) {
    this._listeners.push(listener);
  },

  // 通知所有监听器
  _notify() {
    const state = {
      path: this.getPath(),
      depth: this.getDepth(),
      items: this.getCurrentLevel(),
      breadcrumb: this.getBreadcrumb(),
      isLeaf: this.isLeafNode(),
      currentNode: this.getCurrentNode()
    };
    this._listeners.forEach(fn => fn(state));
  },

  // 刷新菜单数据（用于管理员修改数据后）
  refreshMenuData() {
    this._menuData = Storage.getMenuData();
    // 验证当前路径在新数据中是否仍然有效
    if (this._path.length > 0) {
      const node = this._findNodeByPath(this._path);
      if (!node) {
        // 路径失效，回到首页
        this._path = [];
      }
    }
    this._notify();
  },

  // 沿路径查找节点
  _findNodeByPath(path) {
    let current = { children: this._menuData };
    for (const id of path) {
      if (!current.children) return null;
      current = current.children.find(c => c.id === id);
      if (!current) return null;
    }
    return current;
  }
};
