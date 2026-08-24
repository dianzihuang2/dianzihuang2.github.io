import siteHtml from '../index.html?raw';

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const metadata = `
    <meta name="description" content="精选网络工具、AI 导航、软件下载与效率资源。" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="zh_CN" />
    <meta property="og:title" content="烤鸭笔记" />
    <meta property="og:description" content="精选网络工具、AI 导航、软件下载与效率资源。" />
    <meta property="og:url" content="${origin}" />
    <meta property="og:image" content="${origin}/og.png" />
    <meta property="og:image:alt" content="烤鸭笔记：网络工具、AI 导航与效率资源" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="烤鸭笔记" />
    <meta name="twitter:description" content="精选网络工具、AI 导航、软件下载与效率资源。" />
    <meta name="twitter:image" content="${origin}/og.png" />
  `;
  // ponytail: reuse the original GitHub Pages videos; move them to R2 if this site must become independent.
  const videoBridge = `<script>
    for (const link of officialLinks) {
      if (link.videoSrc) link.videoSrc = new URL(link.videoSrc, "https://dianzihuang2.github.io/").href;
    }
  </script>`;
  const responseHtml = siteHtml
    .replace('</head>', `${metadata}</head>`)
    .replace('<script src="js/app.js"></script>', `${videoBridge}\n    <script src="js/app.js"></script>`);

  return new Response(responseHtml, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
