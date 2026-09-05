# 官方产品图标补充核查

核查日期：2026-09-05。仅下载静态图片，不运行下载的软件；不改动 Sites。

| 产品 | 本地资源 | 官方证据与资源直链 |
| --- | --- | --- |
| Devin Desktop | `assets/icons/devin-desktop.png` | [Desktop 入门文档](https://docs.devin.ai/desktop/getting-started) 的 `rel=icon` 指向 [192px PNG](https://docs.devin.ai/mintlify-assets/_mintlify/favicons/cognitionai/Ycul7J1XWDV1FX48/_generated/favicon/android-chrome-192x192.png)。已下载检查为 192×192 PNG，黑色六边形连接图形。采用当前官方文档标识，不使用旧 Windsurf 图标。 |
| Comet Assistant | `assets/icons/comet.jpg` | [App Store 官方产品](https://apps.apple.com/na/app/comet-ai-browser-assistant/id6748622471)；[Apple 查询接口](https://itunes.apple.com/lookup?id=6748622471&country=us) 返回 `trackName=Comet - AI Browser & Assistant`、`sellerName=Perplexity AI Inc.`、`sellerUrl=https://www.perplexity.ai/comet`，其 `artworkUrl512` 为 [512px 官方应用图标](https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ba/a1/df/baa1df7f-51b0-77e6-4a6a-a848349d623d/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/512x512bb.jpg)。已下载并目视确认银色彗星线条黑底图标，不是 Perplexity 通用图标。 |
| 文心 | `assets/icons/wenxin.png` | [官网](https://wenxin.baidu.com/) 加载的 [主脚本](https://ms.bdstatic.com/se/chat-search/static/pc/search-Dk-e4m86.js) 中 `brandLogoUrl` 指向 [官方字标](https://psstatic.cdn.bcebos.com/basics/aichat/new_bra_2_1773714613000.png)，并用于侧栏标题图像。已下载并目视确认蓝紫色符号及“文心”字样，186×63 PNG；保留完整标识，没有裁造独立徽标。 |
| Excel | `assets/icons/excel.svg` | [Microsoft Excel 产品页](https://www.microsoft.com/en-us/microsoft-365/excel) 的产品列表以 `alt=Excel` 引用 [Excel-Icon-FY26.svg](https://www.microsoft.com/content/dam/microsoft/bade/images/icons/en-us/m365-app-icons-fy26/Excel-Icon-FY26.svg)。已下载确认是 48×48 SVG，未发现脚本、foreignObject 或外部 href。 |

## 限制

- Devin Desktop 官网直取受到 429 限制；采用其官方 Desktop 文档明确提供的站点标识，未声称它是特定操作系统安装包中的 Dock 图标。
- Comet 官网直取受到 Cloudflare 限制；使用开发者身份及官网交叉对应的 Apple 官方分发图标。此图标属于 Comet 产品，不声称 Assistant 有独立品牌图标。
- 文心官网通用 favicon 当前是百度标识，不能据此将百度通用图标作为文心产品图标；使用官方页面真实字标，未确认独立方形产品徽标。
- 图标映射、浏览器展示与全站回归检查由主代理集成执行，本文件不声称它们已经通过。
