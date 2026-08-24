# 烤鸭网址 / 烤鸭笔记

<img src="assets/avatar.jpeg" alt="烤鸭笔记头像" width="96">

一个面向日常使用的网址导航静态站，集中整理常用工具、AI 服务、开发资源、办公服务和下载入口。

[在线访问](https://dianzihuang2.github.io/)

## 主要功能

- 按 11 个分类浏览网址，并通过右侧速览快速定位卡片。
- 支持站内关键词搜索，也可将当前关键词提交到 Google 搜索。
- 提供官网跳转、链接复制，以及部分工具的安装包版本、平台和 SHA-256 信息。
- AI 分类按用途分组，展示推荐顺序、适用场景和核验来源。
- 支持照片预览、本地视频播放和桌面/移动端响应式布局。

## 技术特点

- 纯 HTML、CSS 和 JavaScript，无框架、无构建工具、无第三方运行时依赖。
- `js/data.js` 保存静态数据，`js/app.js` 负责渲染与交互。
- 使用经典脚本按顺序加载，可直接部署到 GitHub Pages 或其他静态托管服务。

## 目录结构

```text
.
├── index.html              # 页面结构与资源加载入口
├── styles.css              # 全部页面样式
├── js/
│   ├── data.js             # 网站、分类、排名、照片和视频数据
│   └── app.js              # 卡片渲染、搜索、筛选、下载与弹窗交互
├── assets/
│   ├── avatar.jpeg         # 头像、favicon 和 Apple 主屏图标
│   ├── gallery/            # 照片资源
│   ├── icons/              # 网站图标
│   └── videos/             # 本地视频
├── docs/                   # 项目计划、上下文索引与交接记录
└── PROJECT_STATUS.md       # 当前项目状态
```

## 本地预览

在仓库根目录启动一个静态文件服务器：

```bash
python3 -m http.server 8000
```

然后访问 <http://localhost:8000/>。页面不需要安装依赖或执行构建。

## 静态托管

当前仓库可直接通过 GitHub Pages 发布：在仓库 Pages 设置中选择用于发布的分支和仓库根目录即可。其他静态托管服务也只需把仓库根目录作为发布目录，并保持现有文件层级。

## 常用维护入口

| 需求 | 文件 |
| --- | --- |
| 增删网站、修改分类、AI 推荐信息、照片数据或视频名称 | [`js/data.js`](js/data.js) |
| 修改搜索、筛选、卡片、下载和弹窗行为 | [`js/app.js`](js/app.js) |
| 调整颜色、排版和响应式布局 | [`styles.css`](styles.css) |
| 修改页面结构、标题、导航或资源加载 | [`index.html`](index.html) |
| 替换头像、图标、照片或视频文件 | [`assets/`](assets/) |

`index.html` 末尾必须先加载 `js/data.js`，再加载 `js/app.js`；交互脚本依赖数据脚本中定义的内容。
