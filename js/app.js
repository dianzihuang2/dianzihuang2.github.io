const cardGrid = document.querySelector("#card-grid");
const totalCount = document.querySelector("#total-count");
const categoryCount = document.querySelector("#category-count");
const filterButtons = document.querySelectorAll(".filter-pill");
const emptyState = document.querySelector("#empty-state");
const rankingMethodology = document.querySelector("#ranking-methodology");
const toast = document.querySelector("#toast");
const searchForm = document.querySelector("#site-search-form");
const searchInput = document.querySelector("#site-search-input");
const searchStatus = document.querySelector("#search-status");
const siteHeader = document.querySelector(".site-header");
const avatarMark = document.querySelector(".brand-mark");
const heroPhoto = document.querySelector(".hero-photo");
const siteOverviewTitle = document.querySelector("#site-overview-title");
const siteOverviewCount = document.querySelector("#site-overview-count");
const siteOverviewList = document.querySelector("#site-overview-list");

let activeFilter = "network";
let activeHighlightName = "";
let toastTimer;
let avatarLightbox;
let photoLightbox;
let activePhotoIndex = 0;
let downloadDialog;

function domainFromUrl(url) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function faviconFromUrl(url) {
  return `assets/icons/${domainFromUrl(url).toLowerCase()}.png`;
}

function normalizeSearchText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\s+/g, "");
}

function searchableText(link) {
  return [
    link.name,
    ...(link.aliases || []),
    link.url ? domainFromUrl(link.url) : "",
    link.url,
    link.description,
    link.strength,
    link.weakness,
    link.useCase,
    link.bestFor,
    link.rankingNote,
    link.categoryLabel,
    link.initials,
    link.downloadInfo?.version,
    ...(link.downloadInfo?.files || []).flatMap((file) => [file.label, file.platform, file.architecture, file.format]),
  ].join(" ");
}

function findBestLink(query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return null;

  return officialLinks
    .map((link) => {
      const name = normalizeSearchText(link.name);
      const domain = normalizeSearchText(link.url ? domainFromUrl(link.url) : "");
      const fullText = normalizeSearchText(searchableText(link));
      let score = 0;

      if (name === normalizedQuery || domain === normalizedQuery) score = 100;
      else if (name.startsWith(normalizedQuery) || domain.startsWith(normalizedQuery)) score = 80;
      else if (name.includes(normalizedQuery) || domain.includes(normalizedQuery)) score = 60;
      else if (fullText.includes(normalizedQuery)) score = 30;

      return { link, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.link || null;
}

function setActiveFilter(category) {
  activeFilter = category;
  filterButtons.forEach((item) => {
    const isActive = item.dataset.filter === category;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });
}

function createActions(link) {
  return `
    <div class="card-actions">
      <a class="open-link" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="打开 ${link.name} 官网">打开官网</a>
      <button class="copy-button" type="button" data-copy="${link.url}" aria-label="复制 ${link.name} 官网链接">复制链接</button>
    </div>
  `;
}

function createIcon(link) {
  const iconUrl = link.iconUrl || (link.url ? faviconFromUrl(link.url) : "");
  return `
    <span class="app-icon${iconUrl ? "" : " is-fallback"}"${link.color ? ` style="--icon-bg: ${link.color}"` : ""} aria-hidden="true">
      ${iconUrl ? `<img src="${iconUrl}" alt="" onerror="this.parentElement.classList.add('is-fallback'); this.remove();">` : ""}
      <span class="app-icon-fallback">${link.initials || "▶"}</span>
    </span>
  `;
}

function createAiProfile(link) {
  if (!link.strength && !link.weakness) {
    return "";
  }

  return `
    <dl class="ai-profile">
      <div>
        <dt>优势</dt>
        <dd>${link.strength}</dd>
      </div>
      <div>
        <dt>缺点</dt>
        <dd>${link.weakness}</dd>
      </div>
    </dl>
  `;
}

function createRankingInfo(link) {
  if (!link.recommendationRank) return "";

  const sourceLinks = link.sourceIds
    .map((sourceId) => sourceId === "official"
      ? { label: "产品官网", url: link.url }
      : rankingSources[sourceId])
    .map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a>`)
    .join("");

  return `
    <span class="best-for">${link.bestFor}</span>
    <p class="ranking-note"><strong>推荐依据：</strong>${link.rankingNote}</p>
    <div class="ranking-evidence" aria-label="${link.name} 排名依据">
      ${sourceLinks}
      <span class="tag">核验于 ${link.verifiedAt}</span>
    </div>
  `;
}

function createCard(link, headingTag = "h3") {
  if (link.videoSrc) {
    return `
      <article class="link-card video-card${link.name === activeHighlightName ? " is-highlighted" : ""}" data-link-key="${encodeURIComponent(link.name)}">
        <${headingTag}>${link.name}</${headingTag}>
        <video controls playsinline preload="metadata" aria-label="播放${link.name}">
          <source src="${link.videoSrc}" type="video/mp4">
          浏览器不支持视频播放。
        </video>
      </article>
    `;
  }

  const topActions = [
    link.downloadInfo ? `<button class="download-trigger" type="button" data-download="${encodeURIComponent(link.name)}" aria-label="下载 ${link.name} 安装包">↓ 下载</button>` : "",
    link.recommendationRank ? `<span class="ranking-badge">能力推荐 #${link.recommendationRank}</span>` : "",
  ].join("");

  return `
    <article class="link-card${link.name === activeHighlightName ? " is-highlighted" : ""}" data-link-key="${encodeURIComponent(link.name)}">
      <div class="card-top">
        ${createIcon(link)}
        <div class="card-heading">
          <${headingTag}>${link.name}</${headingTag}>
          <span class="domain">${domainFromUrl(link.url)}</span>
        </div>
        ${topActions ? `<div class="card-top-actions">${topActions}</div>` : ""}
      </div>
      <p>${link.description}</p>
      ${createAiProfile(link)}
      ${createRankingInfo(link)}
      ${createActions(link)}
    </article>
  `;
}

function validateAiCatalog() {
  const requiredFields = ["useCase", "recommendationRank", "bestFor", "rankingNote", "sourceIds", "verifiedAt"];
  const ranks = new Set();

  officialLinks.filter((link) => aiCategories.has(link.category)).forEach((link) => {
    const missing = requiredFields.filter((field) => !link[field]);
    if (missing.length) throw new Error(`${link.name} 缺少字段：${missing.join(", ")}`);
    if (!aiGroupOrder[link.category].includes(link.useCase)) throw new Error(`${link.name} 的用途分组无效`);
    if (!link.sourceIds.length || link.sourceIds.some((sourceId) => sourceId !== "official" && !rankingSources[sourceId])) {
      throw new Error(`${link.name} 的排名来源无效`);
    }

    const rankKey = `${link.category}/${link.useCase}/${link.recommendationRank}`;
    if (ranks.has(rankKey)) throw new Error(`${rankKey} 排名重复`);
    ranks.add(rankKey);
  });
}

function validateDownloadCatalog() {
  officialLinks.filter((link) => link.downloadInfo).forEach((link) => {
    const { version, releaseUrl, files } = link.downloadInfo;
    if (!version || !releaseUrl || !files?.length) throw new Error(`${link.name} 的下载配置不完整`);

    const labels = new Set();
    files.forEach((file) => {
      if (!file.label || !file.platform || !file.architecture || !file.format || !file.url) {
        throw new Error(`${link.name} 存在不完整的安装包配置`);
      }
      if (labels.has(file.label)) throw new Error(`${link.name} 的安装包名称重复：${file.label}`);
      labels.add(file.label);
      if (new URL(file.url).protocol !== "https:") throw new Error(`${link.name} 的安装包必须使用 HTTPS`);
    });
  });
}

function renderCards() {
  const filtered = officialLinks.filter((link) => {
    const matchesCategory = link.category === activeFilter;
    return matchesCategory;
  });

  const isAiFilter = aiCategories.has(activeFilter);
  const orderedLinks = isAiFilter
    ? aiGroupOrder[activeFilter].flatMap((useCase) => filtered
      .filter((link) => link.useCase === useCase)
      .sort((a, b) => a.recommendationRank - b.recommendationRank))
    : filtered;
  cardGrid.classList.toggle("is-grouped", isAiFilter);
  rankingMethodology.hidden = !isAiFilter;

  if (isAiFilter) {
    cardGrid.innerHTML = aiGroupOrder[activeFilter]
      .map((useCase) => {
        const links = orderedLinks.filter((link) => link.useCase === useCase);
        if (!links.length) return "";

        return `
          <section class="ai-group" aria-labelledby="${activeFilter}-${encodeURIComponent(useCase)}">
            <div class="ai-group-heading">
              <h3 id="${activeFilter}-${encodeURIComponent(useCase)}">${useCase}</h3>
              <p>${links.length} 个精选入口 · 按能力推荐排序</p>
            </div>
            <div class="ai-group-grid">${links.map((link) => createCard(link, "h4")).join("")}</div>
          </section>
        `;
      })
      .join("");
  } else {
    cardGrid.innerHTML = orderedLinks.map((link) => createCard(link)).join("");
  }

  emptyState.hidden = filtered.length > 0;
  siteOverviewTitle.textContent = categoryNames[activeFilter];
  siteOverviewCount.textContent = `${orderedLinks.length} 个`;
  siteOverviewList.innerHTML = orderedLinks.map((link) => `
    <button class="site-overview-link" type="button" data-overview-link="${encodeURIComponent(link.name)}" title="定位到 ${link.name}">
      ${createIcon(link)}
      <span class="site-overview-name">${link.name}</span>
    </button>
  `).join("");
  const cardOrder = [...cardGrid.querySelectorAll("[data-link-key]")].map((card) => card.dataset.linkKey).join("\n");
  const overviewOrder = [...siteOverviewList.children].map((item) => item.dataset.overviewLink).join("\n");
  if (cardOrder !== overviewOrder) throw new Error("网站速览顺序与卡片不一致");
}

function focusHighlightedCard(linkName) {
  activeHighlightName = linkName;
  cardGrid.querySelectorAll("[data-link-key]").forEach((card) => {
    card.classList.toggle("is-highlighted", card.dataset.linkKey === encodeURIComponent(linkName));
  });
  window.requestAnimationFrame(() => {
    const card = cardGrid.querySelector(`[data-link-key="${encodeURIComponent(linkName)}"]`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function searchSite(query) {
  const match = findBestLink(query);
  if (!match) {
    activeHighlightName = "";
    searchStatus.textContent = "没有找到匹配的网址入口。";
    showToast("没有找到匹配的网址");
    return;
  }

  activeHighlightName = match.name;
  setActiveFilter(match.category);
  renderCards();
  searchStatus.textContent = `已定位：${match.name}（${categoryNames[match.category]}）`;
  showToast(`已定位 ${match.name}`);
  focusHighlightedCard(match.name);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

async function copyToClipboard(url) {
  try {
    await navigator.clipboard.writeText(url);
    showToast("链接已复制");
  } catch {
    showToast(url);
  }
}

function openDownloadDialog(link) {
  downloadDialog?.remove();
  const info = link.downloadInfo;
  const dialog = document.createElement("dialog");
  downloadDialog = dialog;
  dialog.className = "download-dialog";
  dialog.setAttribute("aria-labelledby", "download-dialog-title");
  dialog.innerHTML = `
    <div class="download-dialog-header">
      ${createIcon(link)}
      <div>
        <h2 id="download-dialog-title">${link.name} 安装包</h2>
        <p>版本 ${info.version}</p>
      </div>
      <button class="download-close" type="button" aria-label="关闭下载窗口" autofocus>×</button>
    </div>
    <div class="download-dialog-body">
      <p class="download-help">${info.note || "请选择与你的设备和处理器架构匹配的安装包。"}</p>
      <div class="download-list">
        ${info.files.map((file) => `
          <section class="download-option">
            <div>
              <h3>${file.label}</h3>
              <p>${file.platform} · ${file.architecture} · ${file.format}${file.size ? ` · ${file.size}` : ""}</p>
            </div>
            <a class="download-link" href="${file.url}" target="_blank" rel="noopener noreferrer">下载安装包</a>
            ${file.checksum ? `<div class="download-checksum">SHA-256：${file.checksum}${file.checksumUrl ? ` · <a href="${file.checksumUrl}" target="_blank" rel="noopener noreferrer">校验文件</a>` : ""}</div>` : ""}
          </section>
        `).join("")}
      </div>
    </div>
    <div class="download-dialog-footer">
      <a href="${info.releaseUrl}" target="_blank" rel="noopener noreferrer">查看 CNB Release</a>
      ${info.upstreamUrl ? `<a href="${info.upstreamUrl}" target="_blank" rel="noopener noreferrer">查看上游官方版本</a>` : ""}
    </div>
  `;
  document.body.appendChild(dialog);
  dialog.querySelector(".download-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    dialog.remove();
    if (downloadDialog === dialog) downloadDialog = null;
  }, { once: true });
  dialog.showModal();
}

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  const downloadButton = event.target.closest("[data-download]");
  const overviewButton = event.target.closest("[data-overview-link]");
  if (copyButton) {
    copyToClipboard(copyButton.dataset.copy);
  }
  if (downloadButton) {
    const linkName = decodeURIComponent(downloadButton.dataset.download);
    const link = officialLinks.find((item) => item.name === linkName);
    if (link?.downloadInfo) openDownloadDialog(link);
  }
  if (overviewButton) {
    focusHighlightedCard(decodeURIComponent(overviewButton.dataset.overviewLink));
  }
});


function closePhotoLightbox() {
  photoLightbox?.remove();
  photoLightbox = null;
}

function setActivePhoto(index) {
  if (!photoLightbox) return;
  activePhotoIndex = index;
  const current = galleryPhotos[index];
  const stageImage = photoLightbox.querySelector(".photo-stage img");
  stageImage.src = current.src;
  stageImage.alt = current.alt;
  photoLightbox.querySelectorAll(".photo-thumb").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.photoIndex) === index);
  });
}

function openPhotoLightbox(index = 0) {
  closePhotoLightbox();
  photoLightbox = document.createElement("div");
  photoLightbox.className = "photo-lightbox";
  photoLightbox.innerHTML = `
    <div class="photo-gallery" role="dialog" aria-modal="true" aria-label="照片预览">
      <div class="photo-stage">
        <img src="" alt="">
        <button class="photo-close" type="button" aria-label="关闭照片预览">×</button>
      </div>
      <div class="photo-strip" aria-label="照片列表">
        ${galleryPhotos.map((photo, photoIndex) => `
          <button class="photo-thumb" type="button" data-photo-index="${photoIndex}" aria-label="查看第 ${photoIndex + 1} 张照片">
            <img src="${photo.src}" alt="">
          </button>
        `).join("")}
      </div>
    </div>
  `;
  document.body.append(photoLightbox);
  setActivePhoto(index);
}

document.addEventListener("click", (event) => {
  const closeButton = event.target.closest(".photo-close");
  const photoButton = event.target.closest("[data-photo-index]");
  if (closeButton || event.target === photoLightbox) {
    closePhotoLightbox();
  }
  if (photoButton) {
    setActivePhoto(Number(photoButton.dataset.photoIndex));
  }
});

heroPhoto.addEventListener("click", () => openPhotoLightbox(0));
heroPhoto.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openPhotoLightbox(0);
  }
});

function closeAvatarLightbox() {
  avatarLightbox?.remove();
  avatarLightbox = null;
}

siteHeader.addEventListener("click", (event) => {
  if (event.target === siteHeader) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

avatarMark.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  avatarLightbox = document.createElement("div");
  avatarLightbox.className = "avatar-lightbox";
  avatarLightbox.innerHTML = '<div class="avatar-card"><img src="assets/avatar.jpeg" alt="烤鸭笔记头像"><div class="avatar-contact">烤鸭wx：aaa1399464323</div></div>';
  document.body.appendChild(avatarLightbox);
});

document.addEventListener("click", (event) => {
  if (event.target === avatarLightbox) {
    closeAvatarLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePhotoLightbox();
    closeAvatarLightbox();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeHighlightName = "";
    searchStatus.textContent = "";
    setActiveFilter(button.dataset.filter);
    renderCards();
    cardGrid.scrollIntoView({ block: "start" });
  });
});

searchForm.addEventListener("submit", (event) => {
  if (event.submitter?.dataset.searchTarget === "google") return;
  event.preventDefault();
  searchSite(searchInput.value);
});

searchInput.addEventListener("input", () => {
  if (!searchInput.value.trim()) {
    activeHighlightName = "";
    searchStatus.textContent = "";
    renderCards();
  }
});

validateAiCatalog();
validateDownloadCatalog();
totalCount.textContent = officialLinks.length;
categoryCount.textContent = new Set(officialLinks.map((link) => link.category)).size;
renderCards();
