# 产品图标来源

2026-09-05 本次图标修正。以下资源下载自官网 HTML 声明的图标，或官方项目仓库；未改绘品牌标志。品牌权利属于各权利人。

| 本地文件 | 直接来源 |
| --- | --- |
| antigravity.png | https://antigravity.google/assets/image/antigravity-logo.png |
| copilot.svg | https://raw.githubusercontent.com/primer/octicons/main/icons/copilot-24.svg |
| kiro.png | https://kiro.dev/apple-icon.png?4cefa8c54a20b098 |
| cline.png | https://cline.bot/assets/branding/favicons/favicon-256x256.png |
| qwen-code.png | https://raw.githubusercontent.com/QwenLM/qwen-code/main/packages/desktop-shell/src-tauri/icons/128x128.png |
| openhands.svg | https://openhands.dev/favicon.svg |
| opencode.png | https://opencode.ai/favicon-96x96-v3.png |
| trae.png | https://lf-cdn.trae.com.cn/obj/trae-com-cn/trae_website_prod_cn/favicon.png |
| claude-code.png | https://cdn.sanity.io/images/4zrzovbb/claude-com/369b14e80ac643cc09dccd581ccb91f82b559190-32x32.png |
| reasonix.svg | https://reasonix.io/favicon.svg |
| clash-verge-rev.png | https://raw.githubusercontent.com/clash-verge-rev/clash-verge-rev/main/src-tauri/icons/128x128.png |
| codex.png | https://openai.gallerycdn.vsassets.io/extensions/openai/chatgpt/26.5901.22334/1788458585118/Microsoft.VisualStudio.Services.Icons.Default |
| deepseek-harness.svg | https://www.deepseek.com/harness/favicon.svg |
| wsl.png | https://raw.githubusercontent.com/microsoft/WSL/master/Images/Square44x44Logo.targetsize-256.png |
| comet.jpg | https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ba/a1/df/baa1df7f-51b0-77e6-4a6a-a848349d623d/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/512x512bb.jpg |
| wenxin.png | https://psstatic.cdn.bcebos.com/basics/aichat/new_bra_2_1773714613000.png |

## 回退与核查边界

- Codex 图标来自 [OpenAI 官方扩展商店条目](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) 声明的 og:image；不是从 ChatGPT 条目借用的图标。
- DeepSeek Harness 图标来自其产品官网声明的 favicon；WSL 图标来自微软应用资源目录。
- ripgrep 的[官方仓库](https://github.com/BurntSushi/ripgrep)、README 和 FAQ 未找到独立 Logo，保留命令名 `rg` 文字标识；不将作者头像、GitHub 图标或第三方设计称为官方 Logo。
- Claude Code 使用其产品官网声明的 Claude 品牌 favicon，不宣称为独立应用图标。
- 其余既有图片未全部重新取得官网版本；全目录检查只证明路径存在，不能证明所有既有图标均是最新品牌设计。
- 更新入口域名时同步检查 iconUrl；托管在 GitHub 的项目不能自动使用 GitHub 图标。运行 `node tests/brand-catalog.test.mjs` 检查路径、已修正映射和回退。
