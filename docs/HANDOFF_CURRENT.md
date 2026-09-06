# 当前交接

## 目标与范围

解决 GitHub Pages 主站首次进入或切换分类后图标延迟显示。仅调整主站图标交付方式及必要维护工具；Sites、发布配置、依赖和原图保持原状。用户已明确授权本轮提交并推送 GitHub。

## 当前状态

- 分支 main，修改基线 5b8776a；开始时工作区干净，当前进入已授权的提交/推送步骤。
- 原因已复现：渲染卡片后才发起图标图片请求，阻塞请求时 6 个首屏图标空白，放行后显示；透明度始终为 1。
- 新增生成的 js/icons.js，按 data.js → icons.js → app.js 加载。
- createIcon 统一使用内嵌图片数据与 decoding="sync"；无映射时直接显示备用标识。
- 原有品牌/目录数据、图标映射和全部原图未改。

## 变更文件

- index.html、js/app.js、js/icons.js：脚本加载与统一图标渲染。
- scripts/build-icons.mjs：Node 标准库生成图标数据；图标变更后运行并更新 HTML 中图标脚本版本参数。
- tests/brand-catalog.test.mjs：保留目录回归，增加原图/内嵌数据一致性、渲染来源、缺图与加载顺序检查。
- README.md、PROJECT_STATUS.md、docs/IMPLEMENTATION_PLAN.md、docs/CONTEXT_INDEX.md、本文件：维护说明与状态。

## 决定与理由

- 保留 officialLinks 为唯一网址数据源；内嵌映射仅保存原图的字节数据。
- 统一函数覆盖卡片、子产品、速览和下载弹窗，无需逐处增加预加载逻辑。
- 接受首次访问先下载整份图标数据的成本，消除卡片出现后的独立图片网络等待；不承诺网页无需下载或解码。

## 实际验证

- node tests/brand-catalog.test.mjs：回归先失败后通过。
- node --check js/data.js、js/app.js、js/icons.js，以及 git diff --check 通过。
- 本地静态服务器 http://127.0.0.1:8765/，真实 Chrome headless 全新上下文拦截 assets/icons 请求：首屏、1280px/390px 的 11 分类、搜索、OpenCode 下载弹窗均通过；零独立图标请求、破图、页面异常和横向溢出。
- 临时浏览器复现/验收脚本在 /tmp/indexx-icon-check.mjs、/tmp/indexx-icon-delay.mjs、/tmp/indexx-icons-browser.mjs；回归测试已落盘仓库，不依赖这些临时文件。

## 已知限制与下一步

- 初次页面及脚本加载仍需时间；线上尚未部署或验收。
- 桌面截图中 OpenCode 标题较窄，原有布局未改，不属于本轮图标修复范围。
- 用户本轮明确要求推送到 GitHub；当前 HTTPS/TLS 连接失败，提交/推送最终结果以 Git 状态及远端查询为准。
- 不修改 Sites 专项文件，不新增依赖，不自动扩展为布局重构。
