# 当前交接

## 当前目标

保持右侧网站速览、Google 搜索和站内搜索，并消除网站图标刷新及分类切换时的备用标识闪烁。

## Git 状态

- Worktree：`/Users/hellokitty/.codex/worktrees/26a8/indexx`
- 分支：detached HEAD
- 上一基线：`8cad782`。
- 当前图标修复与状态文档已提交并推送至 `origin/main`。

## 已完成与变更文件

- `index.html`：加入右侧第三列速览、响应式隐藏、统一顺序渲染、图标备用标识、点击定位和顺序断言；新增独立标签页 Google 搜索及品牌样式；图标默认显示正确图片，仅加载失败时显示备用标识。
- `PROJECT_STATUS.md`：项目当前状态。
- `docs/CONTEXT_INDEX.md`：上下文入口。
- `docs/IMPLEMENTATION_PLAN.md`：本阶段计划与决定。
- `docs/HANDOFF_CURRENT.md`：本交接快照。

## 关键决定及理由

- 速览直接使用 `renderCards()` 中的 `orderedLinks`，避免复制数据或排序逻辑。
- AI 分类先按现有用途顺序展开，再按 `recommendationRank` 排序；普通分类保留 `officialLinks` 顺序。
- 1080px 以下隐藏速览，保证移动端和较窄桌面不被挤压。
- 点击速览复用 `focusHighlightedCard()`，不改搜索高亮变量，也不触发分类切换。
- Google 搜索通过 `target="_blank"` 提交到 `https://www.google.com/search`，使用标准 `q` 参数和 `rel="noopener"`；原站内搜索表单改用 `#site-search-form` 绑定，避免事件冲突。
- 内联四色 G SVG 位于输入框最前方，按钮使用 Google 蓝；390px 断点内隐藏按钮的“Google”前缀以防挤压。
- `createIcon()` 不再等待 `load` 事件添加 `is-loaded`；CSS 默认显示图片并隐藏备用标识，原生 `error` 事件统一切换失败状态，避免所有调用路径重复修补。

## 实际验证

- `git diff --check` 通过。
- Google Chrome 1160×577：左右栏与卡片、安全提示不重叠；点击最后一个速览项后目标卡片进入视口；页面滚到最底部时左右栏 top 仍均为 70px。
- Google Chrome 1440×900：三栏正常；视频均位于卡片内；播放符号备用标识正常。
- Google Chrome 390×844：速览隐藏，分类栏横向滚动，卡片在视口内，无横向溢出。
- 11 个分类逐项切换：速览数量、图标数量和顺序均与卡片一致。
- 搜索 `Chrome`：切换到浏览器分类、搜索高亮与速览同步；随后切换分类会清除高亮和搜索状态并回到卡片顶部。
- 浏览器控制台没有 warning/error。
- Google Chrome 1160×577：Google 搜索位于站内搜索上方，两个表单分离且无横向溢出。
- 实际提交“烤鸭网址”后跳转到 `https://www.google.com.hk/search?q=烤鸭网址`。
- Google Chrome 390×844：两个搜索框均在视口内；原站内搜索 `Chrome` 仍能定位并高亮浏览器卡片。
- 新标签页验证：提交“烤鸭网址”后，原标签页保持本地烤鸭站，新增标签页为 `https://www.google.com.hk/search?q=烤鸭网址`。
- 品牌样式验证：四色 G 为 22×22px，按钮计算颜色为 `rgb(66, 133, 244)`；390×844 下按钮显示“搜索”，全部元素位于表单内且无横向溢出。
- 图标修复验证：1160×577 下逐项切换 11 个分类，所有非失败图标均为图片可见、备用标识隐藏；国外 AI、国内 AI、其他分类的缺失资源均只显示备用标识；不存在 `is-loaded` 中间态。
- 响应式复验：1440×900、390×844 下图标错误状态计数均为 0，页面无横向溢出。

## 已知问题与下一步

- 部分本地图标路径返回 404 后使用现有字母备用标识，行为符合设计。
- 仓库没有实体 `AGENTS.md`；本任务使用委派消息内规则。
- 委派所述未跟踪 `.gitignore` 在当前 worktree 不存在，未创建或修改。
- 下一步：等待用户确定下一项网站功能需求。

## 允许范围与禁止事项

- 允许：按用户明确需求继续调整网站并验证。
- 禁止：未经用户明确要求创建提交、推送、修改依赖或远端配置。
