# 烤鸭笔记开发指引

## 项目定位

这是一个中文官方网址导航站。主站是可直接部署到 GitHub Pages 的原生 HTML/CSS/JavaScript；另有独立的 Sites/Vinext 适配层。网址内容是核心，优先做局部数据修改，不引入框架或新依赖。

## 工作范围

- 网站完善、测试和发布准备仅针对 GitHub Pages 主站（`index.html`、`styles.css`、`js/`、`assets/`）。
- 保留 Sites 适配层原状；除非用户另行明确要求，不修改 `app/`、`vite.config.ts`、`.openai/hosting.json`、`public/`，不运行 Sites 构建或部署流程。主站共享资源自然变化不属于 Sites 专项改造。
- “可发布”表示完成主站内容与验证；提交、推送和正式发布仍需用户明确要求。

## 先读什么

1. 先运行 `git status --short --branch`，保留用户已有改动。
2. 只读取本次任务相关文件；涉及当前阶段、部署或交接时，再读 `PROJECT_STATUS.md` 和 `docs/HANDOFF_CURRENT.md`。
3. 需要追溯既有设计决定时读 `docs/IMPLEMENTATION_PLAN.md`；不要默认通读历史。

## 修改入口

- 增删网址、分类、AI 排名、下载信息、照片或视频：`js/data.js`
- 搜索、筛选、卡片、复制、下载弹窗和照片预览：`js/app.js`
- 页面结构、导航、搜索区和脚本加载：`index.html`
- 样式和响应式布局：`styles.css`
- 图片、图标和视频：`assets/`
- Sites 响应与分享元数据：`app/route.ts`
- Sites 构建与静态资源映射：`vite.config.ts`、`.openai/hosting.json`、`public/`

## 必守约定

- `index.html` 末尾先加载 `js/data.js`，再加载 `js/app.js`。
- 网站条目只维护在 `officialLinks`；复用现有字段和分类，不创建第二份数据。
- 默认图标路径为 `assets/icons/<去掉 www. 的小写域名>.png`；没有图标时使用现有 initials 备用标识。
- `public/` 中多数内容是指向根目录资源的 Sites 软链接，不复制或手工同步同一资源。
- 三个大视频是页面“其他”分类内容；Sites 通过 `app/route.ts` 复用 GitHub Pages 地址。
- 保持原生实现和最小改动；新增依赖、提交、推送或部署需用户明确要求。

## 最小验证

- 数据或交互修改：`node --check js/data.js && node --check js/app.js`
- Sites/TypeScript 修改：先确保已运行 `npm ci`，再运行 `npx tsc --noEmit && npm run build`
- 页面行为或样式修改：用本地静态服务器在受影响的桌面和移动端视口检查。
- 完成前检查 `git diff --check`、最终 diff 和 `git status --short --branch`。

完成标准：需求已实现，相关验证通过或明确披露未验证项，没有改动无关文件。
