# 项目状态

- 项目：烤鸭网址 / 烤鸭笔记
- 当前目标：以线上 GitHub Pages 版本统一本地源码，同时保留可发布到 Sites 的适配层。
- 当前阶段：网页源码已同步至 `origin/main` 的 `8b604eb`；Sites 构建与本地 Worker 验证通过，尚未部署。
- Git：`main` 与 `origin/main` 指向同一提交；Sites 适配文件仍为未提交文件。

## 已完成

- 抓取 `https://dianzihuang2.github.io/`，确认线上 `index.html` 与 `origin/main` 内容一致。
- 本地 `main` 快进至 `8b604eb`；`index.html`、`styles.css`、`js/` 和 `assets/` 与线上对应版本保持一致。
- 保留最小 Sites 适配：Vinext/Vite 构建、Cloudflare Worker 路由、社交分享元数据和静态资源映射。
- Sites 构建不复制三个超过单文件限制的视频，运行时复用 GitHub Pages 上的原视频地址，页面内容和视频质量不变。

## 最近验证

- 线上与本地 `index.html` SHA-256 均为 `af5c89aac1b5f57ebf8d913b600940ce57bd2a86ce096aff86900957fb8b204a`。
- `node --check js/data.js`、`node --check js/app.js`、`npx tsc --noEmit`：通过。
- `npm audit`：0 个漏洞。
- `npm run build`：通过；Sites 产物约 3.1 MB，未包含大视频。
- 本地 Wrangler：主页、CSS、两份 JS 和 `og.png` 均返回 HTTP 200。
- 三个 GitHub Pages 视频地址均返回 HTTP 200、`video/mp4`。
- Sites 打包脚本成功生成 `/tmp/indexx-sites-live-sync.tar.gz`。

## 当前问题与限制

- Sites 版本的视频目前依赖现有 GitHub Pages 地址；只有需要完全独立部署时才迁移到 R2。
- 尚未执行 Sites 部署，也未创建提交或推送本次适配文件。
