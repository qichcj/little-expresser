/**
 * 小小表达家 — UI 渲染模块
 * 负责根据路由状态渲染所有界面元素
 */

const Renderer = {
  // DOM 元素引用
  _container: null,
  _breadcrumb: null,
  _backBtn: null,
  _homeBtn: null,
  _contentArea: null,
  _leafDisplay: null,

  // 初始化
  init() {
    this._container = document.getElementById('app-container');
    this._breadcrumb = document.getElementById('breadcrumb');
    this._backBtn = document.getElementById('btn-back');
    this._homeBtn = document.getElementById('btn-home');
    this._contentArea = document.getElementById('content-area');
    this._leafDisplay = document.getElementById('leaf-display');

    // 绑定按钮事件
    this._backBtn.addEventListener('click', () => Router.goBack());
    this._homeBtn.addEventListener('click', () => Router.goHome());

    // 监听路由变化
    Router.onChange(state => this.render(state));
  },

  // 主渲染入口
  render(state) {
    this._updateNav(state);
    this._updateBreadcrumb(state);

    if (state.depth === 0) {
      this._renderHome(state);
    } else if (state.isLeaf) {
      this._renderLeaf(state);
    } else {
      this._renderCategory(state);
    }
  },

  // 更新导航按钮状态
  _updateNav(state) {
    // 返回按钮：首页时隐藏
    this._backBtn.style.visibility = state.depth > 0 ? 'visible' : 'hidden';
    this._backBtn.style.opacity = state.depth > 0 ? '1' : '0';

    // 首页按钮：首页时隐藏
    this._homeBtn.style.visibility = state.depth > 0 ? 'visible' : 'hidden';
    this._homeBtn.style.opacity = state.depth > 0 ? '1' : '0';
  },

  // 更新面包屑导航
  _updateBreadcrumb(state) {
    this._breadcrumb.innerHTML = '';

    const crumbs = state.breadcrumb;
    crumbs.forEach((crumb, index) => {
      const span = document.createElement('span');
      span.className = 'breadcrumb-item';
      span.innerHTML = `${crumb.emoji}<span class="breadcrumb-name">${crumb.name}</span>`;

      if (index < crumbs.length - 1) {
        span.classList.add('clickable');
        span.addEventListener('click', () => Router.goToBreadcrumb(index));
        // 添加分隔符
        const sep = document.createElement('span');
        sep.className = 'breadcrumb-sep';
        sep.textContent = '›';
        this._breadcrumb.appendChild(span);
        this._breadcrumb.appendChild(sep);
      } else {
        // 最后一项是当前位置，高亮
        span.classList.add('current');
        this._breadcrumb.appendChild(span);
      }
    });
  },

  // 渲染首页（6 大分类）
  _renderHome(state) {
    // 隐藏叶子展示
    this._leafDisplay.classList.remove('active');
    this._contentArea.style.display = '';

    this._contentArea.innerHTML = '';

    // 欢迎标题（仅首页显示）
    const welcome = document.createElement('div');
    welcome.className = 'welcome';
    welcome.innerHTML = `
      <div class="welcome-icon">🌈</div>
      <div class="welcome-text">想说什么？点一点吧！</div>
    `;
    this._contentArea.appendChild(welcome);

    // 分类卡片网格
    const grid = document.createElement('div');
    grid.className = 'card-grid home-grid';

    state.items.forEach(cat => {
      const card = this._createCard(cat, cat.color);
      card.classList.add('home-card');
      card.addEventListener('click', () => Router.navigateTo(cat.id));
      grid.appendChild(card);
    });

    this._contentArea.appendChild(grid);
  },

  // 渲染子分类
  _renderCategory(state) {
    this._leafDisplay.classList.remove('active');
    this._contentArea.style.display = '';

    this._contentArea.innerHTML = '';

    // 子分类网格
    const grid = document.createElement('div');
    grid.className = 'card-grid category-grid';

    state.items.forEach(item => {
      const card = this._createCard(item, item.color);
      card.addEventListener('click', () => Router.navigateTo(item.id));

      // 异步加载真实图片
      if (item.imageQuery) {
        this._loadCardImage(card, item);
      }

      grid.appendChild(card);
    });

    // 淡入动画
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(10px)';
    this._contentArea.appendChild(grid);

    requestAnimationFrame(() => {
      grid.style.transition = `opacity ${CONFIG.ANIMATION_DURATION}ms ease, transform ${CONFIG.ANIMATION_DURATION}ms ease`;
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
    });
  },

  // 渲染叶子节点（最终表达）
  _renderLeaf(state) {
    const node = state.currentNode;
    if (!node) return;

    // 隐藏普通内容区
    this._contentArea.style.display = 'none';

    // 显示叶子展示区
    this._leafDisplay.classList.add('active');
    this._leafDisplay.innerHTML = '';

    const leafCard = document.createElement('div');
    leafCard.className = 'leaf-card';

    // 大图展示
    const imgContainer = document.createElement('div');
    imgContainer.className = 'leaf-image-container';

    // 先用 emoji 占位
    const emojiPlaceholder = document.createElement('div');
    emojiPlaceholder.className = 'leaf-emoji';
    emojiPlaceholder.textContent = node.emoji;
    emojiPlaceholder.style.backgroundColor = this._getNodeColor(node);
    imgContainer.appendChild(emojiPlaceholder);

    // 异步加载真实图片
    const img = document.createElement('img');
    img.className = 'leaf-img';
    img.alt = node.name;
    img.style.display = 'none';
    imgContainer.appendChild(img);

    Images.getImage(node).then(url => {
      if (url) {
        img.src = url;
        img.onload = () => {
          img.style.display = 'block';
          emojiPlaceholder.style.display = 'none';
        };
        img.onerror = () => {
          emojiPlaceholder.style.display = 'flex';
        };
      }
    });

    leafCard.appendChild(imgContainer);

    // 物品名称
    const nameEl = document.createElement('div');
    nameEl.className = 'leaf-name';
    nameEl.textContent = node.name;
    leafCard.appendChild(nameEl);

    // 操作按钮组
    const actions = document.createElement('div');
    actions.className = 'leaf-actions';

    // 重复播报按钮
    const repeatBtn = document.createElement('button');
    repeatBtn.className = 'leaf-btn leaf-btn-repeat';
    repeatBtn.innerHTML = '🔊 <span>再听一次</span>';
    repeatBtn.addEventListener('click', () => {
      Voice.speakWord(node.customSpeech || node.name);
      this._animateButton(repeatBtn);
    });
    actions.appendChild(repeatBtn);

    // 回首页按钮
    const homeBtn = document.createElement('button');
    homeBtn.className = 'leaf-btn leaf-btn-home';
    homeBtn.innerHTML = '🏠 <span>回首页</span>';
    homeBtn.addEventListener('click', () => Router.goHome());
    actions.appendChild(homeBtn);

    // 返回上级按钮
    const backBtn = document.createElement('button');
    backBtn.className = 'leaf-btn leaf-btn-back';
    backBtn.innerHTML = '⬅ <span>返回</span>';
    backBtn.addEventListener('click', () => Router.goBack());
    actions.appendChild(backBtn);

    leafCard.appendChild(actions);
    this._leafDisplay.appendChild(leafCard);

    // 自动语音播报
    setTimeout(() => {
      Voice.speakWord(node.customSpeech || node.name);
    }, 400);
  },

  // ========== 工具方法 ==========

  // 创建单个卡片
  _createCard(item, color) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', item.id);

    // 图片区域
    const imgWrap = document.createElement('div');
    imgWrap.className = 'card-img-wrap';
    imgWrap.style.backgroundColor = color || '#e9ecef';

    // emoji 占位
    const emoji = document.createElement('span');
    emoji.className = 'card-emoji';
    emoji.textContent = item.emoji || '📷';
    imgWrap.appendChild(emoji);

    // 真实图片（隐藏）
    const img = document.createElement('img');
    img.className = 'card-img';
    img.alt = item.name;
    img.style.display = 'none';
    imgWrap.appendChild(img);

    card.appendChild(imgWrap);

    // 标签
    const label = document.createElement('div');
    label.className = 'card-label';
    label.textContent = item.name;
    card.appendChild(label);

    return card;
  },

  // 异步加载卡片图片
  async _loadCardImage(card, item) {
    const imgWrap = card.querySelector('.card-img-wrap');
    const emoji = card.querySelector('.card-emoji');
    const img = card.querySelector('.card-img');

    // 如果有自定义图片，直接使用
    if (item.customImage) {
      img.src = item.customImage;
      img.onload = () => {
        img.style.display = 'block';
        emoji.style.display = 'none';
      };
      img.onerror = () => {
        emoji.style.display = 'flex';
      };
      return;
    }

    const url = await Images.getImage(item);
    if (url) {
      img.src = url;
      img.onload = () => {
        img.style.display = 'block';
        emoji.style.display = 'none';
      };
      img.onerror = () => {
        emoji.style.display = 'flex';
      };
    }
  },

  // 获取节点的颜色（回溯父级）
  _getNodeColor(node) {
    // 从 menuData 中查找
    const findColor = (items, targetId) => {
      for (const item of items) {
        if (item.id === targetId) return item.color;
        if (item.children) {
          const found = findColor(item.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };
    const path = Router.getPath();
    if (path.length > 0) {
      // 第一个路径元素是一级分类 id
      const rootCat = Router._menuData.find(c => c.id === path[0]);
      if (rootCat) return rootCat.color;
    }
    return '#F783AC';
  },

  // 按钮点击动画
  _animateButton(btn) {
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 150);
  }
};
