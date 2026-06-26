/**
 * 小小表达家 — 家长后台管理逻辑
 */

const Admin = {
  // 状态
  _menuData: [],
  _selectedCategoryId: null,
  _editingNodePath: [],       // 当前编辑节点的路径 [categoryId, subId, ...]
  _editingNode: null,          // 当前编辑节点的引用
  _isLoggedIn: false,

  // ========== 初始化 ==========
  init() {
    this._menuData = Storage.getMenuData();

    // 检查是否已登录（session 级别）
    if (sessionStorage.getItem('lse_admin_logged') === 'true') {
      this._showAdmin();
    }

    // 绑定登录
    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleLogin();
    });

    // 绑定操作按钮
    document.getElementById('btn-logout').addEventListener('click', () => this._handleLogout());
    document.getElementById('btn-export').addEventListener('click', () => this._handleExport());
    document.getElementById('btn-import').addEventListener('click', () => this._handleImport());
    document.getElementById('btn-reset').addEventListener('click', () => this._handleReset());
    document.getElementById('btn-change-pwd').addEventListener('click', () => this._handleChangePassword());
    document.getElementById('btn-save').addEventListener('click', () => this._handleSave());
    document.getElementById('btn-delete').addEventListener('click', () => this._handleDelete());
    document.getElementById('btn-add-child').addEventListener('click', () => this._handleAddChild());

    // 文件导入监听
    document.getElementById('import-file').addEventListener('change', (e) => this._handleFileImport(e));
  },

  // ========== 登录/登出 ==========
  _handleLogin() {
    const input = document.getElementById('password-input');
    const password = input.value.trim();
    const storedPwd = Storage.getAdminPassword();

    if (password === storedPwd) {
      sessionStorage.setItem('lse_admin_logged', 'true');
      this._showAdmin();
      input.value = '';
    } else {
      this._toast('密码错误，请重试', 'error');
      input.value = '';
      input.focus();
    }
  },

  _handleLogout() {
    sessionStorage.removeItem('lse_admin_logged');
    location.reload();
  },

  _showAdmin() {
    this._isLoggedIn = true;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-screen').style.display = '';
    this._renderCategories();
  },

  // ========== 侧边栏分类列表 ==========
  _renderCategories() {
    const container = document.getElementById('category-list');
    container.innerHTML = '';

    this._menuData.forEach(cat => {
      const item = document.createElement('div');
      item.className = 'category-item';
      if (cat.id === this._selectedCategoryId) {
        item.classList.add('active');
      }
      item.innerHTML = `
        <span class="category-item-icon">${cat.emoji}</span>
        <span>${cat.name}</span>
      `;
      item.addEventListener('click', () => {
        this._selectedCategoryId = cat.id;
        this._editingNodePath = [cat.id];
        this._editingNode = cat;
        this._renderCategories();
        this._renderEditor();
      });
      container.appendChild(item);
    });
  },

  // ========== 编辑器 ==========
  _renderEditor() {
    const empty = document.getElementById('editor-empty');
    const panel = document.getElementById('editor-panel');

    if (!this._editingNode) {
      empty.style.display = '';
      panel.style.display = 'none';
      return;
    }

    empty.style.display = 'none';
    panel.style.display = '';

    // 面包屑
    this._renderEditorBreadcrumb();

    // 表单
    document.getElementById('edit-name').value = this._editingNode.name || '';
    document.getElementById('edit-emoji').value = this._editingNode.emoji || '';
    document.getElementById('edit-imagequery').value = this._editingNode.imageQuery || '';
    document.getElementById('edit-customimage').value = this._editingNode.customImage || '';
    document.getElementById('edit-customspeech').value = this._editingNode.customSpeech || '';

    // 子节点列表
    this._renderChildrenList();
  },

  _renderEditorBreadcrumb() {
    const container = document.getElementById('editor-breadcrumb');
    container.innerHTML = '';

    // 首页
    const home = document.createElement('span');
    home.className = 'editor-breadcrumb-item';
    home.textContent = '🏠 根';
    home.addEventListener('click', () => {
      this._editingNodePath = [];
      this._editingNode = null;
      this._selectedCategoryId = null;
      this._renderCategories();
      this._renderEditor();
    });
    container.appendChild(home);

    // 沿路径渲染
    let current = { children: this._menuData };
    for (let i = 0; i < this._editingNodePath.length; i++) {
      const id = this._editingNodePath[i];
      const node = current.children.find(c => c.id === id);
      if (!node) break;

      const sep = document.createElement('span');
      sep.className = 'editor-breadcrumb-sep';
      sep.textContent = ' › ';
      container.appendChild(sep);

      const crumb = document.createElement('span');
      crumb.className = 'editor-breadcrumb-item';
      if (i === this._editingNodePath.length - 1) {
        crumb.classList.add('current');
      }
      crumb.textContent = `${node.emoji || ''} ${node.name}`;

      if (i < this._editingNodePath.length - 1) {
        crumb.addEventListener('click', ((idx, nodeRef) => {
          return () => {
            this._editingNodePath = this._editingNodePath.slice(0, idx + 1);
            this._editingNode = nodeRef;
            this._renderEditor();
          };
        })(i, node));
      }

      container.appendChild(crumb);
      current = node;
    }
  },

  _renderChildrenList() {
    const container = document.getElementById('children-list');
    container.innerHTML = '';

    const children = this._editingNode.children || [];
    if (children.length === 0) {
      container.innerHTML = '<p style="color:#888;padding:12px;text-align:center;">暂无子选项（当前为叶子节点）</p>';
      return;
    }

    children.forEach(child => {
      const item = document.createElement('div');
      item.className = 'child-item';
      const hasKids = child.children && child.children.length > 0;
      if (!hasKids) {
        item.classList.add('child-item-leaf');
      }

      item.innerHTML = `
        <div class="child-item-info">
          <span class="child-item-emoji">${child.emoji || '📷'}</span>
          <span class="child-item-name">${child.name}</span>
          ${hasKids ? '<span class="child-item-has-children">有子级</span>' : ''}
        </div>
        <span class="child-item-meta">${hasKids ? child.children.length + '个子项' : '叶子节点'}</span>
      `;

      item.addEventListener('click', () => {
        this._editingNodePath.push(child.id);
        this._editingNode = child;
        this._renderEditor();
      });

      container.appendChild(item);
    });
  },

  // ========== 保存节点 ==========
  _handleSave() {
    if (!this._editingNode) return;

    const name = document.getElementById('edit-name').value.trim();
    if (!name) {
      this._toast('名称不能为空', 'error');
      return;
    }

    this._editingNode.name = name;
    this._editingNode.emoji = document.getElementById('edit-emoji').value.trim() || '📷';
    this._editingNode.imageQuery = document.getElementById('edit-imagequery').value.trim();
    this._editingNode.customImage = document.getElementById('edit-customimage').value.trim() || undefined;
    this._editingNode.customSpeech = document.getElementById('edit-customspeech').value.trim() || undefined;

    // 清理空值
    if (!this._editingNode.customImage) delete this._editingNode.customImage;
    if (!this._editingNode.customSpeech) delete this._editingNode.customSpeech;
    if (!this._editingNode.imageQuery) delete this._editingNode.imageQuery;

    Storage.saveMenuData(this._menuData);
    this._renderCategories();
    this._renderEditor();
    this._toast('✅ 保存成功！请刷新沟通页面查看', 'success');
  },

  // ========== 删除节点 ==========
  _handleDelete() {
    if (!this._editingNode || this._editingNodePath.length === 0) {
      this._toast('无法删除根分类', 'error');
      return;
    }

    const nodeName = this._editingNode.name;
    if (!confirm(`确定要删除「${nodeName}」及其所有子级吗？\n\n此操作不可撤销！`)) {
      return;
    }

    // 找到父节点的 children 数组
    const parentPath = this._editingNodePath.slice(0, -1);
    let parent;
    if (parentPath.length === 0) {
      parent = { children: this._menuData };
    } else {
      parent = this._findByPath(parentPath);
    }

    if (parent && parent.children) {
      const idx = parent.children.findIndex(c => c.id === this._editingNode.id);
      if (idx >= 0) {
        parent.children.splice(idx, 1);
      }
    }

    // 跳转到父节点
    this._editingNodePath = parentPath;
    this._editingNode = parentPath.length === 0 ? null : this._findByPath(parentPath);
    if (parentPath.length === 0) {
      this._selectedCategoryId = null;
    }

    Storage.saveMenuData(this._menuData);
    this._renderCategories();
    this._renderEditor();
    this._toast(`已删除「${nodeName}」`, 'info');
  },

  // ========== 添加子节点 ==========
  _handleAddChild() {
    if (!this._editingNode) return;

    const name = prompt('请输入新选项的名称：');
    if (!name || !name.trim()) return;

    const newId = 'custom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);

    const newNode = {
      id: newId,
      name: name.trim(),
      emoji: '📷',
      imageQuery: '',
      children: []
    };

    if (!this._editingNode.children) {
      this._editingNode.children = [];
    }
    this._editingNode.children.push(newNode);

    Storage.saveMenuData(this._menuData);
    this._renderEditor();
    this._toast(`已添加「${name.trim()}」`, 'success');
  },

  // ========== 导出配置 ==========
  _handleExport() {
    const data = Storage.exportAll();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `小小表达家_配置备份_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this._toast('📤 配置已导出', 'success');
  },

  // ========== 导入配置 ==========
  _handleImport() {
    document.getElementById('import-file').click();
  },

  _handleFileImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.menuData || !Array.isArray(data.menuData)) {
          throw new Error('无效的数据格式');
        }
        if (!confirm(
          `即将导入配置：\n` +
          `• 导出时间：${data.exportedAt || '未知'}\n` +
          `• 分类数：${data.menuData.length}\n\n` +
          `⚠️ 当前配置将被覆盖，确定继续？`
        )) {
          return;
        }

        Storage.importAll(data);
        this._menuData = Storage.getMenuData();
        this._editingNode = null;
        this._editingNodePath = [];
        this._selectedCategoryId = null;
        this._renderCategories();
        this._renderEditor();
        this._toast('📥 配置导入成功！', 'success');
      } catch (err) {
        this._toast('导入失败：文件格式不正确', 'error');
        console.error(err);
      }
    };
    reader.readAsText(file);

    // 重置 input，允许重复导入同一文件
    e.target.value = '';
  },

  // ========== 恢复默认 ==========
  _handleReset() {
    if (!confirm('⚠️ 确定要恢复默认配置吗？\n\n所有自定义修改将丢失！')) {
      return;
    }

    this._menuData = Storage.resetMenuData();
    this._editingNode = null;
    this._editingNodePath = [];
    this._selectedCategoryId = null;
    this._renderCategories();
    this._renderEditor();
    this._toast('🔄 已恢复默认配置', 'success');
  },

  // ========== 修改密码 ==========
  _handleChangePassword() {
    const oldPwd = prompt('请输入当前密码：');
    if (!oldPwd) return;

    if (oldPwd !== Storage.getAdminPassword()) {
      this._toast('当前密码不正确', 'error');
      return;
    }

    const newPwd = prompt('请输入新密码（至少4位）：');
    if (!newPwd || newPwd.length < 4) {
      this._toast('密码至少需要4位', 'error');
      return;
    }

    const confirmPwd = prompt('请再次输入新密码：');
    if (newPwd !== confirmPwd) {
      this._toast('两次密码输入不一致', 'error');
      return;
    }

    Storage.setAdminPassword(newPwd);
    this._toast('🔑 密码修改成功！请牢记新密码', 'success');
  },

  // ========== 工具方法 ==========

  _findByPath(path) {
    let current = { children: this._menuData };
    for (const id of path) {
      if (!current.children) return null;
      current = current.children.find(c => c.id === id);
      if (!current) return null;
    }
    return current;
  },

  _toast(message, type = 'info') {
    // 移除已有 toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
  }
};

// 启动
document.addEventListener('DOMContentLoaded', () => Admin.init());
