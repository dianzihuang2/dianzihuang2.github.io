# 当前交接

## 当前目标

为网站补充自托管安装包；Chrome、OpenCode、Python、Node.js、Git 已完成，LibreOffice 因 CNB 网页附件大小限制暂缓。

## Git 状态

- Worktree：`/Users/hellokitty/codexwork/opentool/indexx`
- 分支：`main`
- 本次 Chrome 下载入口已提交并推送至 GitHub；Sites 使用独立轻量源码分支发布。

## 已完成与变更文件

- `index.html`、`styles.css`、`js/`、`assets/`：通过快进和恢复远端文件，统一为当前线上版本。
- `app/route.ts`：原样返回线上 HTML，仅在 Sites 响应中注入分享元数据，并把视频地址指向现有 GitHub Pages 原文件。
- `public/`：仅映射 Sites 需要打包的样式、脚本、图片、图标和 `og.png`，不复制大视频。
- `.openai/hosting.json`、`vite.config.ts`、`package.json` 等：Sites/Vinext 构建配置。
- `.gitignore`：忽略依赖、构建产物和本地环境文件。
- `js/data.js`：为 OpenCode 1.18.25、Python 3.14.7、Node.js 24.20.0 LTS、Git for Windows 2.55.0.5 增加 `downloadInfo`。
- `js/data.js`：Chrome 复用 CNB 现有 `chorme` Release，增加 Windows 安装包下载入口。
- CNB `kaoyawei/downloads`：新增 4 个 Release、5 个 Tag 和 6 个带许可证的 ZIP；额外创建的 LibreOffice Tag 尚无 Release。

## 关键决定及理由

- 线上页面与 `origin/main` 的 `index.html` 哈希完全一致，因此直接使用远端提交，不重做页面。
- 三个原视频均超过 Sites 静态资源单文件限制；为保持当前版本和画质，Sites 运行时复用已有 GitHub Pages 视频，暂不引入 R2。
- Sites 元数据在 Worker 响应中注入，不修改原始 `index.html`，便于持续核对线上版本。
- 只镜像明确允许再分发的开源软件；安装程序保持原样，外层 ZIP 附带许可证并在页面展示 SHA-256。
- CNB 网页上传约 64 MiB 以上不稳定，不使用分卷包；因此 Python 仅提供 Windows x64，LibreOffice 暂不接入。

## 实际验证

- 线上与本地 `index.html` SHA-256：`af5c89aac1b5f57ebf8d913b600940ce57bd2a86ce096aff86900957fb8b204a`。
- `node --check js/data.js`、`node --check js/app.js`、`npx tsc --noEmit`、`npm audit`、`npm run build`：通过。
- 本地 Wrangler 对 `/`、`/styles.css`、`/js/data.js`、`/js/app.js`、`/og.png` 均返回 HTTP 200。
- 三个远端视频均返回 HTTP 200 和 `video/mp4`。
- Sites 打包脚本通过；构建产物约 3.1 MB，未包含视频目录。
- Sites 版本 2 公开部署成功：`https://kaoya.wei1399464323.chatgpt.site`，并确认线上数据包含 Chrome 下载地址。
- 7 个已接入的 CNB 文件均通过 Range GET 返回 HTTP 206；Chrome 数据语法、下载结构、SHA-256、生产构建和 `git diff --check` 通过。

## 已知问题与下一步

- 当前 Sites 视频依赖 GitHub Pages；需要独立托管时迁移到 R2。
- Python macOS 包约 75 MiB，LibreOffice 包约 285–358 MiB，超过当前 CNB 网页附件可用范围；需要支持大文件的存储方式后再补。
- 下一步仅在用户明确要求后调整 Sites 访问范围。

## 允许范围与禁止事项

- 允许：继续验证或按用户要求发布。
- 禁止：未经明确要求创建提交、推送或部署。
