import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

// Exercise the actual catalog and card/search functions without browser events.
const data = readFileSync(new URL('../js/data.js', import.meta.url), 'utf8');
const app = readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
const context = vm.createContext({
  assert, URL, iconExists: path => existsSync(new URL('../' + path, import.meta.url)),
  document: { querySelector: () => null, querySelectorAll: () => [] },
});
vm.runInContext(`${data}\n${app.slice(0, app.indexOf('function validateDownloadCatalog'))}\n
  validateAiCatalog();
  for (const link of officialLinks) {
    const path = link.iconUrl ?? (link.url ? faviconFromUrl(link.url) : '');
    if (path) assert.ok(iconExists(path), link.name + ': missing icon ' + path);
    if (link.url && new URL(link.url).hostname === 'github.com' && new URL(link.url).pathname !== '/') {
      assert.notEqual(path, 'assets/icons/github.com.png', link.name + ': repository host is not a product icon');
    }
  }
  for (const [name, path] of [
    ['Google Antigravity', 'assets/icons/antigravity.png'],
    ['GitHub Copilot Coding Agent', 'assets/icons/copilot.svg'],
    ['Clash Verge Rev', 'assets/icons/clash-verge-rev.png'],
    ['Codex', 'assets/icons/codex.png'],
    ['DeepSeek Harness', 'assets/icons/deepseek-harness.svg'],
    ['WSL2', 'assets/icons/wsl.png'],
    ['Devin Desktop', 'assets/icons/devin-desktop.png'],
    ['Excel', 'assets/icons/excel.svg'],
    ['Comet Assistant', 'assets/icons/comet.jpg'],
    ['文心', 'assets/icons/wenxin.png'],
  ]) assert.ok(createIcon(officialLinks.find(link => link.name === name)).includes(path));
  for (const name of ['ripgrep / rg']) {
    const html = createIcon(officialLinks.find(link => link.name === name));
    assert.ok(html.includes('is-fallback'));
    assert.ok(!html.includes('<img'));
  }
  const relations = officialLinks.filter(link => link.parentProduct);
  assert.equal(relations.length, 9);
  for (const child of relations) {
    const parent = officialLinks.find(link => link.name === child.parentProduct);
    const html = createCard(parent);
    assert.ok(html.includes('data-link-key="' + encodeURIComponent(child.name) + '"'));
    assert.ok(html.includes(child.moduleLabel || child.useCase));
    assert.ok(html.includes('href="' + child.url + '"'));
    assert.equal(findBestLink(child.name).name, child.name);
  }
  assert.equal(findBestLink('Codex CLI').name, 'Codex');
  assert.equal(findBestLink('Claude CLI').name, 'Claude Code');
  assert.equal(findBestLink('NotebookLM').name, 'Gemini Notebook');
  assert.equal(officialLinks.find(link => link.name === 'Reasonix').parentProduct, undefined);
  assert.equal(childProducts(officialLinks.find(link => link.name === 'Gemini')).length, 3);
  const geminiMarkup = createCard(officialLinks.find(link => link.name === 'Gemini'));
  assert.equal((geminiMarkup.match(/product-module is-compact/g) || []).length, 3);
  assert.ok(geminiMarkup.includes('is-wide-product'));
  assert.ok(geminiMarkup.includes('product-main'));
  assert.ok(geminiMarkup.includes('product-tools'));
  assert.ok(!createCard(officialLinks.find(link => link.name === 'ChatGPT')).includes('is-wide-product'));
  assert.ok(!createCard(officialLinks.find(link => link.name === 'ChatGPT')).includes('product-module is-compact'));
  assert.ok(geminiMarkup.includes('Google 的 Agent 开发环境'));
  for (const name of ['GitHub Copilot Coding Agent', 'Google Antigravity', 'Devin Desktop', 'Kiro', 'Cline', 'Qwen Code', 'OpenHands', 'Comet Assistant']) {
    assert.equal(officialLinks.filter(link => link.name === name).length, 1);
    assert.equal(findBestLink(name).name, name);
  }
  assert.equal(findBestLink('Windsurf').name, 'Devin Desktop');
  assert.equal(findBestLink('Comet').name, 'Comet Assistant');
  assert.equal(officialLinks.find(link => link.name === 'Poe').useCase, '多模型平台');
  assert.equal(officialLinks.filter(link => link.category === 'china-ai').length, 17);
  assert.equal(officialLinks.filter(link => link.category === 'global-ai').length, 30);
  assert.equal(new Set(officialLinks.map(link => link.name)).size, officialLinks.length);
  for (const link of officialLinks.filter(link => aiCategories.has(link.category))) {
    assert.equal(new URL(link.url).protocol, 'https:');
    assert.ok(!createCard(link).includes('能力推荐 #'));
  }
  assert.equal(officialLinks.filter(link => link.category === 'music-ai').length, 8);
  assert.ok(!createCard(officialLinks.find(link => link.name === 'Chrome')).includes('product-module'));
`, context);
console.log('AI catalog: 8 additions, 9 relations, category counts, links and search aliases passed.');
