# 上下文索引

- 页面结构与启动期设备识别：`index.html`
- 全部页面样式：`styles.css`
- 网站、分类、排名和照片数据：`js/data.js`
- 卡片渲染、分类、搜索、下载与弹窗交互：`js/app.js`
- 当前项目状态与最近验证：`PROJECT_STATUS.md`
- 本阶段范围、决定和验收：`docs/IMPLEMENTATION_PLAN.md`
- 下一任务恢复快照：`docs/HANDOFF_CURRENT.md`

当前为无构建系统的静态站；`index.html` 末尾必须先加载 `js/data.js`，再加载 `js/app.js`。
