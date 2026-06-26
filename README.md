# 🌈 小小表达家 — 儿童辅助沟通网站

专为语言表达障碍儿童（自闭症、言语迟缓）设计的图片点击式沟通工具。

## ✨ 功能特点

- 🖼️ **零文字依赖**：全图片 + emoji 交互，孩子轻松上手
- 🗣️ **语音播报**：点击最终选项后自动用中文朗读
- 📱 **全平台支持**：电脑、安卓手机、苹果手机均可使用
- 📶 **离线可用**：PWA 技术支持，首次加载后可离线使用
- 🔑 **家长后台**：编辑菜单、自定义图片和语音、导出/导入配置

## 🚀 快速开始

### 方式一：直接打开（本地使用）
1. 双击 `index.html` 即可在浏览器中打开
2. 管理后台：点击页面底部 🔑 图标，或直接打开 `admin.html`
3. 默认管理密码：`123456`

### 方式二：部署到服务器
将整个文件夹上传到任意静态服务器（GitHub Pages / Vercel / Netlify 等）

```bash
# 本地预览（需要 Python）
python -m http.server 8080
# 然后访问 http://localhost:8080
```

## 📂 项目结构

```
little-expresser/
├── index.html              # 儿童沟通主界面
├── admin.html              # 家长管理后台
├── css/
│   ├── style.css           # 主界面样式
│   └── admin.css           # 后台样式
├── js/
│   ├── config.js           # 全局配置（API Key 等）
│   ├── data.js             # 菜单数据（6大分类层级树）
│   ├── storage.js          # localStorage 读写封装
│   ├── voice.js            # 语音播报模块（Web Speech API）
│   ├── images.js           # 图片获取与缓存（Pexels API）
│   ├── router.js           # 页面路由/状态管理
│   ├── renderer.js         # UI 渲染引擎
│   └── admin.js            # 后台管理逻辑
├── manifest.json           # PWA 清单
├── sw.js                   # Service Worker（离线缓存）
└── README.md
```

## 🔧 配置图片 API（可选）

默认使用 emoji 图标作为图片。如需启用真实图片搜索：

1. 访问 [pexels.com/api](https://www.pexels.com/api/) 免费注册
2. 获取 API Key
3. 在 `js/config.js` 中替换 `PEXELS_API_KEY` 的值

## 📋 菜单结构

6 大一级分类，每类 3-4 层深度，共 150+ 个可选节点：

| 分类 | 内容 |
|------|------|
| 👔 衣 | 在家穿、外出穿、睡觉穿、按天气穿 |
| 🍽️ 食 | 主食、菜肴、水果、饮品、零食 |
| 🏠 住 | 房间、家具、电器、常用物品 |
| 🚗 行 | 交通工具、去哪里、路上安全、出门带什么 |
| 🎮 娱 | 玩具、游戏、看和听、户外活动、看书 |
| ❤️ 情绪/身体 | 我的心情、身体部位、身体感觉、我需要帮助 |

## 🔑 家长后台功能

- ✏️ 编辑任意节点的名称、图标、图片和播报文字
- ➕ 添加自定义选项
- 🗑️ 删除不需要的选项
- 📤 导出配置为 JSON 文件（跨设备同步）
- 📥 导入配置
- 🔄 一键恢复默认设置
- 🔑 修改管理密码

## 🌐 浏览器兼容性

- ✅ Chrome / Edge（推荐）
- ✅ Safari（iOS/macOS）
- ✅ Firefox
- ✅ Android Chrome
- ⚠️ 语音播报需要浏览器支持 Web Speech API

## 📄 许可

本项目仅供个人和教育用途使用。
