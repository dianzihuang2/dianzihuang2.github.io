# 上下文索引

- AI 分类、品牌关系、模型榜单与资料核查边界：`docs/AI_CATALOG_AUDIT.md`
- AI 目录回归验证：`tests/brand-catalog.test.mjs`
- 当前工作仅针对 GitHub Pages 主站；Sites 相关条目仅为历史定位参考。

- 项目介绍、本地预览、静态托管与常用维护入口：`README.md`
- 页面结构与启动期设备识别：`index.html`
- 全部页面样式：`styles.css`
- 网站、分类、排名和照片数据：`js/data.js`
- 卡片渲染、分类、搜索、下载与弹窗交互：`js/app.js`
- Sites Worker 页面入口与运行时元数据：`app/route.ts`
- Sites 构建和资源映射：`package.json`、`vite.config.ts`、`.openai/hosting.json`、`public/`
- 当前项目状态与最近验证：`PROJECT_STATUS.md`
- 本阶段范围、决定和验收：`docs/IMPLEMENTATION_PLAN.md`
- 下一任务恢复快照：`docs/HANDOFF_CURRENT.md`

GitHub Pages 仍为无构建系统的静态站；`index.html` 末尾必须先加载 `js/data.js`，再加载 `js/app.js`。Sites 使用独立 Vinext/Vite 适配层，不修改该加载顺序。
