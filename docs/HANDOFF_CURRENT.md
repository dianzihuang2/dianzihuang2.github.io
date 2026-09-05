# 当前交接

## 目标与范围

完成 GitHub Pages 主站三个 AI 分类的发布准备。用户明确只改主站，不对 Sites 改造；规则已写入 AGENTS.md。仅用户明确授权后提交、推送或部署。

## 当前状态

- main / 2ea5dc9；本轮未创建提交。
- 8 项新增已落盘：GitHub Copilot Coding Agent、Google Antigravity、Devin Desktop、Kiro、Cline、Qwen Code、OpenHands、Comet Assistant。
- 9 条父子产品关系；Antigravity → Gemini、Qwen Code → 千问、Comet → Perplexity。
- 三个 AI 分类分别 30 / 17 / 8 个唯一条目；国外分类另显示 2 个音乐子入口。
- 来源与验证边界见 AI_CATALOG_AUDIT.md。

## 变更文件

- AGENTS.md：GitHub Pages 范围约束。
- index.html、js/data.js、js/app.js、styles.css：品牌布局、数据更新、用途标签、模型参考区。
- brand-preview.html：此前设计样稿，仍保留。
- tests/brand-catalog.test.mjs：新增入口、关系、分类与搜索回归。
- PROJECT_STATUS.md、docs/IMPLEMENTATION_PLAN.md、docs/CONTEXT_INDEX.md、本文件及 docs/AI_CATALOG_AUDIT.md：当前状态与依据。

## 关键决定

- officialLinks 保持唯一数据源，子产品引用父产品名称；跨分类音乐入口保留。
- 产品排列不再宣称为模型排名；榜单独立注明版本、日期、方法与置信区间限制。
- 新产品没有图标时直接使用 initials，不显示其他产品的错误图标。
- 原有 next.config.ts 删除属于已有改动；未恢复或修改。

## 实际验证

语法、目录回归、diff 格式检查通过；浏览器检查桌面和手机三个 AI 分类、搜索、复制、详情和 OpenCode 下载弹窗。未下载或执行安装包，未测试第三方付费产品能力。

## 下一步

图标修正已落盘：11 个官网或官方仓库资源、显式产品映射与缺图回退，来源和未确认项见 `assets/icons/SOURCES.md`。全目录路径/托管域名误配回归、JS 语法和 diff 检查通过。Chrome 已恢复连接，本轮验证国外/国内 AI 图标正常加载；390px 国内 AI 无横向溢出、无破图。此次未重新完成此前全部布局验收，也未提交、推送或部署。

最新布局已改为同用途内带工具与独立产品分组、组内等高；宽品牌卡片横跨两列。语法和目录回归通过。用户要求 Chrome 验证，但连接三次超时，启动新窗口后仍失败；Chrome/扩展/native-host 只读检查正常。需恢复 Chrome 插件连接后验收桌面上下边缘、手机溢出及搜索/速览顺序，不能将本轮称为已验收。

用户查看主站本地预览后明确授权提交/推送；发布前再次确认最终 diff 与 Git 状态。Sites 文件、配置、构建和部署不在范围内。
