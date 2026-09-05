# 项目状态

- 项目：烤鸭笔记，原生 GitHub Pages 网址导航。
- 当前目标：三个 AI 分类的发布准备；仅主站，Sites 适配不在范围内。
- 分支 / HEAD：main / 2ea5dc9；修改尚未提交、推送或部署。

## 当前完成项

- 同品牌内嵌布局覆盖 9 条产品关系，使用编程 Agent、音乐生成等用途标签。
- 新增用户指定 8 项；国外 AI 30、国内 AI 17、音乐 AI 8，全站 90 个唯一入口。
- 更新文心、Notebook、Runway 入口、TRAE 描述、Suno 下载政策，保留已核实的 Udio 下载限制。
- 模型榜单与产品展示分离；核实 AA 与 Arena 当前公开数据，删除旧卡片的能力名次断言。
- AGENTS.md 明确仅针对 GitHub Pages；核查记录见 docs/AI_CATALOG_AUDIT.md。

## 最近验证

- node --check js/data.js、node --check js/app.js、node tests/brand-catalog.test.mjs、git diff --check 通过。
- 浏览器验证三个 AI 分类、子产品搜索定位、Comet 复制和 OpenCode 下载弹窗。
- 1280px 桌面与 375px 手机检查；三个 AI 分类手机端无横向溢出。

## 限制与下一步

- 最新布局调整：同用途内按含扩展工具/独立产品分组，桌面组内等高，手机自然高度；Gemini 等多工具品牌横跨两列。
- 最新调整的 Chrome 验收未完成：浏览器运行、扩展启用、native-host 配置均正常，但连接持续超时。此前浏览器验证结果不覆盖本次分组布局。

- 外部产品登录、付费功能、地区可达性未实测；资料整理日期不等于全产品实测。
- 用户已有 next.config.ts 删除保持不动；Sites 适配未改造、未验证。
- 下一步由用户确认主站效果并明确授权提交/推送后发布；不自动部署。
