/**
 * 把仓库里的中文 markdown 转换成 fumadocs 的 MDX 内容。
 *
 *  - 路由取自每篇 frontmatter 的 `slug` 字段。以前这里是一张硬编码的 ROUTES 表，
 *    内容一改结构就和它脱节，构建直接失败；现在路由跟着内容走，新增文件
 *    只要在 frontmatter 里写一行 slug 即可，不必回来改这个脚本。
 *  - 没写 slug 的文件按目录结构兜底推导（去掉 NN- 前缀），不会中断构建。
 *  - 相对 .md 链接 -> 站内路由
 *  - 图片 -> site/assets/img/<hash>.<ext>，MDX 里用相对路径引用，
 *    交给 remark-image + next/image 处理（自动带上 basePath 和宽高）
 *  - 视频/PDF/DOCX 等 -> site/public/files/<name>，用 <Video> / <Download> 组件
 *  - 转义 MDX 会当作 JSX/表达式的字符（代码块内不动）
 *  - 侧边栏 meta.json 由目录结构与 frontmatter 自动生成
 *
 * 用法：pnpm content
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(__dirname, '..');
// 内容就在仓库根目录（site/ 的上一级），CI 里 checkout 出来即是
const SOURCE = path.resolve(SITE, '..');
const CONTENT = path.join(SITE, 'content', 'docs');
const IMG_DIR = path.join(SITE, 'assets', 'img');
const FILES_DIR = path.join(SITE, 'public', 'files');

/** 遍历源文件时要跳过的顶层目录 */
const IGNORE_DIRS = new Set(['site', '.git', '.github', 'assets', 'node_modules']);

/** 非图片附件的可读英文文件名（下载时用得到） */
const FILE_NAMES = {};

/** 去掉 `01-` 这类排序前缀 */
function stripOrderPrefix(name) {
  return name.replace(/^\d+[-_.]\s*/, '');
}

/** 极简 frontmatter 解析：只认顶层 `key: value`，够用且不引依赖 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[kv[1]] = value;
  }
  return { data, body: raw.slice(m[0].length) };
}

/** frontmatter 里没写 slug 时的兜底：按目录结构推导，保证构建不中断 */
function deriveSlug(srcRel) {
  const parts = srcRel.replace(/\.md$/i, '').split('/').map(stripOrderPrefix);
  return parts.join('/');
}

const warnings = [];

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg']);
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov']);

// ---------------------------------------------------------------- helpers

/** 清空目录内容但保留目录本身（Windows 上目录句柄容易被占用） */
function emptyDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, entry), {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    });
  }
}

function writeFile(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function hashOf(rel) {
  return crypto.createHash('md5').update(rel).digest('hex').slice(0, 12);
}

/** Obsidian 里写的语言标记大小写不规范，Shiki 认不出来 */
const LANG_ALIAS = {
  plain: 'text',
  plaintext: 'text',
  javascript: 'js',
  typescript: 'ts',
  shell: 'bash',
  sh: 'bash',
  markdown: 'md',
};

/**
 * Shiki 认得的语言白名单。
 * 不在表里的一律降级成 text：Shiki 碰到陌生语言会直接抛错，整个构建挂掉
 * （文档里的 ```eta 就是这么挂的）。丢高亮只是不好看，挂构建是整站发不出去。
 * 新语言想要高亮，往这里加一行即可。
 */
const KNOWN_LANGS = new Set([
  'text', 'bash', 'console', 'diff',
  'js', 'jsx', 'ts', 'tsx', 'json', 'jsonc',
  'yaml', 'yml', 'toml', 'ini',
  'md', 'mdx', 'html', 'xml', 'css', 'scss',
  'python', 'go', 'rust', 'java', 'c', 'cpp', 'sql',
  'nginx', 'dockerfile', 'csv', 'powershell',
  'mermaid', // fumadocs 自己接管，别降级掉
]);

/** 规范化代码块的语言标记 */
function normalizeFenceLangs(md) {
  const downgraded = new Set();
  const out = md.replace(
    /^(\s*(?:`{3,}|~{3,}))([A-Za-z0-9_+#-]+)(.*)$/gm,
    (m, fence, lang, rest) => {
      const lower = lang.toLowerCase();
      const mapped = LANG_ALIAS[lower] ?? lower;
      if (KNOWN_LANGS.has(mapped)) return `${fence}${mapped}${rest}`;
      downgraded.add(lower);
      return `${fence}text${rest}`;
    }
  );
  for (const lang of downgraded) {
    warnings.push(`代码块语言 \`${lang}\` 不在白名单里，已降级为 text`);
  }
  return out;
}

/** slug -> 页面 URL（不含 basePath，next/link 会自动补） */
function routeUrl(slug) {
  if (slug === 'index') return '/';
  return '/' + slug.replace(/\/index$/, '');
}

/**
 * 转义 MDX 会解析成 JSX / 表达式的字符，但跳过代码块与行内代码。
 */
function escapeMdx(md) {
  const lines = md.split('\n');
  let inFence = false;
  let fenceMark = '';

  return lines
    .map((line) => {
      const fence = line.match(/^\s*(`{3,}|~{3,})/);
      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceMark = fence[1][0];
          return line;
        }
        if (fence[1][0] === fenceMark) {
          inFence = false;
          return line;
        }
        return line;
      }
      if (inFence) return line;

      // 按行内代码切分，只处理代码外的片段
      return line
        .split(/(`+[^`]*`+)/g)
        .map((seg, i) => {
          if (i % 2 === 1) return seg; // 行内代码原样保留
          return seg
            .replace(/</g, '&lt;')
            .replace(/(?<!\\)\{/g, '\\{')
            .replace(/(?<!\\)\}/g, '\\}');
        })
        .join('');
    })
    .join('\n');
}

/** 从一段 markdown 里抽一句纯文本当 description */
function extractDescription(body) {
  for (const raw of body.split(/\n\s*\n/)) {
    const block = raw.trim();
    if (!block || block.startsWith('#') || block.startsWith('```')) continue;
    const text = block
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[`*_>#|-]/g, '')
      .replace(/\\([\\.\-()[\]])/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
    if (text.length < 4) continue;
    return text.length > 90 ? text.slice(0, 88) + '…' : text;
  }
  return undefined;
}

// ---------------------------------------------------------------- build

fs.mkdirSync(CONTENT, { recursive: true });
fs.mkdirSync(IMG_DIR, { recursive: true });
fs.mkdirSync(FILES_DIR, { recursive: true });
emptyDir(CONTENT);
emptyDir(IMG_DIR);
emptyDir(FILES_DIR);

// ---- 扫描源文件，从 frontmatter 读出路由 ----
const allMd = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      walk(path.join(dir, entry.name));
    } else if (entry.name.endsWith('.md')) {
      allMd.push(path.relative(SOURCE, path.join(dir, entry.name)).split(path.sep).join('/'));
    }
  }
})(SOURCE);
allMd.sort();

/** srcRel -> { slug, data, body } */
const DOCS = new Map();
/** srcRel -> slug，链接改写要用 */
const ROUTES = {};

for (const srcRel of allMd) {
  const raw = fs
    .readFileSync(path.join(SOURCE, srcRel), 'utf8')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n');
  const { data, body } = parseFrontmatter(raw);
  const slug = (data.slug || deriveSlug(srcRel)).replace(/^\/+|\/+$/g, '');
  DOCS.set(srcRel, { slug, data, body });
  ROUTES[srcRel] = slug;
}

// slug 撞车会导致后写的覆盖先写的，必须拦下来
const bySlug = new Map();
for (const [srcRel, doc] of DOCS) {
  if (bySlug.has(doc.slug)) {
    console.error(`slug 冲突：${doc.slug}\n  ${bySlug.get(doc.slug)}\n  ${srcRel}`);
    process.exit(1);
  }
  bySlug.set(doc.slug, srcRel);
}

// ---- 由 slug 树 + 源目录顺序生成侧边栏 meta.json ----
/** 目录 slug -> { pages: string[], title?: string, description?: string } */
const META = {};

function ensureGroup(dirSlug) {
  if (!META[dirSlug]) META[dirSlug] = { pages: [] };
  return META[dirSlug];
}

ensureGroup('.').title = '文档';

for (const [srcRel, doc] of DOCS) {
  const segs = doc.slug.split('/');
  const leaf = segs.pop();
  const dirSlug = segs.length ? segs.join('/') : '.';
  const group = ensureGroup(dirSlug);

  if (!group.pages.includes(leaf)) group.pages.push(leaf);

  // 每一层分组自己的标题：优先用该层 index.md 的 frontmatter
  if (leaf === 'index' && dirSlug !== '.') {
    group.title = doc.data.title || stripOrderPrefix(path.posix.dirname(srcRel).split('/').pop());
    if (doc.data.description) group.description = doc.data.description;
  }

  // 把子目录登记进父级，顺序同样按源文件顺序自然形成
  let child = dirSlug;
  while (child !== '.') {
    const parentSegs = child.split('/');
    const childLeaf = parentSegs.pop();
    const parentSlug = parentSegs.length ? parentSegs.join('/') : '.';
    const parent = ensureGroup(parentSlug);
    if (!parent.pages.includes(childLeaf)) parent.pages.push(childLeaf);
    child = parentSlug;
  }
}

// 没有 index.md 的分组（比如插件的三个子类），标题取源目录名
for (const [srcRel, doc] of DOCS) {
  const segs = doc.slug.split('/');
  segs.pop();
  const srcSegs = srcRel.split('/');
  srcSegs.pop();
  while (segs.length) {
    const dirSlug = segs.join('/');
    if (META[dirSlug] && !META[dirSlug].title) {
      META[dirSlug].title = stripOrderPrefix(srcSegs[segs.length - 1] ?? dirSlug);
    }
    segs.pop();
    if (!srcSegs.length) break;
  }
}

// index 页永远排在本组第一位
for (const group of Object.values(META)) {
  group.pages.sort((a, b) => (a === 'index' ? -1 : b === 'index' ? 1 : 0));
}

const copiedAssets = new Map(); // 源相对路径 -> { kind, out }

function resolveAsset(srcRel) {
  if (copiedAssets.has(srcRel)) return copiedAssets.get(srcRel);

  const abs = path.join(SOURCE, srcRel);
  if (!fs.existsSync(abs)) {
    warnings.push(`附件不存在: ${srcRel}`);
    return null;
  }
  const ext = path.extname(srcRel).toLowerCase();
  let record;

  if (IMAGE_EXT.has(ext)) {
    const name = `${hashOf(srcRel)}${ext}`;
    fs.copyFileSync(abs, path.join(IMG_DIR, name));
    record = { kind: 'image', name };
  } else {
    const name = FILE_NAMES[srcRel] ?? `${hashOf(srcRel)}${ext}`;
    if (!FILE_NAMES[srcRel]) warnings.push(`附件没有配置可读文件名，使用哈希名: ${srcRel}`);
    fs.copyFileSync(abs, path.join(FILES_DIR, name));
    record = { kind: VIDEO_EXT.has(ext) ? 'video' : 'file', name };
  }

  copiedAssets.set(srcRel, record);
  return record;
}

const LINK_RE = /(!?)\[((?:[^\][\\]|\\.)*)\]\(([^)]*)\)/g;

/**
 * 逐行改写链接，跳过围栏代码块与行内代码。
 * 文档里会出现 `[Zotero](<%= zt.backlink %>)` 这类模板示例，
 * 整篇正则替换会把它当成坏链接吃掉，破坏示例代码。
 */
function rewriteLinks(md, srcRel, mdxDir) {
  const lines = md.split('\n');
  let inFence = false;
  let fenceMark = '';

  return lines
    .map((line) => {
      const fence = line.match(/^\s*(`{3,}|~{3,})/);
      if (fence) {
        if (!inFence) {
          inFence = true;
          fenceMark = fence[1][0];
        } else if (fence[1][0] === fenceMark) {
          inFence = false;
        }
        return line;
      }
      if (inFence) return line;

      // 按行内代码切分，只改代码外的片段
      return line
        .split(/(`+[^`]*`+)/g)
        .map((seg, i) => (i % 2 === 1 ? seg : rewriteLinksInText(seg, srcRel, mdxDir, line)))
        .join('');
    })
    .join('\n');
}

function rewriteLinksInText(md, srcRel, mdxDir, wholeLine) {
  const srcDir = path.posix.dirname(srcRel);

  return md.replace(LINK_RE, (match, bang, text, rawUrl) => {
    const url = rawUrl.trim();
    if (!url || /^(https?:|mailto:|tel:|#|\/\/)/i.test(url)) return match;

    // 标题里不能塞自定义组件：fumadocs 抽取 TOC 时会在没有 components 的环境下求值
    const inHeading = /^\s{0,3}#{1,6}\s/.test(wholeLine);

    const [pathPart, anchor] = url.split('#');
    let decoded;
    try {
      decoded = decodeURIComponent(pathPart);
    } catch {
      decoded = pathPart;
    }
    const targetRel = path.posix.normalize(path.posix.join(srcDir, decoded));

    // 站内文档
    if (targetRel.toLowerCase().endsWith('.md')) {
      const slug = ROUTES[targetRel];
      if (!slug) {
        warnings.push(`${srcRel} 引用了未收录的文档: ${targetRel}`);
        return text;
      }
      return `${bang}[${text}](${routeUrl(slug)}${anchor ? '#' + anchor : ''})`;
    }

    const asset = resolveAsset(targetRel);
    if (!asset) return text;

    if (inHeading) return text.replace(/\\([\\.\-()[\]])/g, '$1');

    if (asset.kind === 'image') {
      const rel = path.relative(mdxDir, path.join(IMG_DIR, asset.name)).split(path.sep).join('/');
      return `![${text}](${rel.startsWith('.') ? rel : './' + rel})`;
    }
    if (asset.kind === 'video') {
      return `<Video src="/files/${asset.name}" />`;
    }
    const label = text && text.trim() ? text.replace(/\\([\\.\-()[\]])/g, '$1') : asset.name;
    return `<Download href="/files/${asset.name}" name="${asset.name}">${label}</Download>`;
  });
}

let count = 0;
for (const [srcRel, doc] of DOCS) {
  const { slug, data } = doc;
  let raw = doc.body;

  // 标题优先用 frontmatter；正文里的一级标题删掉，fumadocs 会单独渲染
  let title = data.title || stripOrderPrefix(path.basename(srcRel, '.md'));
  const h1 = raw.match(/^\s*#\s+(.+?)\s*$/m);
  if (h1) {
    if (!data.title) title = h1[1].replace(/\\([\\.\-()[\]])/g, '$1').trim();
    raw = raw.replace(h1[0], '').replace(/^\n+/, '');
  }

  const description = data.description || extractDescription(raw);

  const outFile = path.join(CONTENT, `${slug}.mdx`);
  let body = normalizeFenceLangs(raw);
  body = escapeMdx(body);
  body = rewriteLinks(body, srcRel, path.dirname(outFile));
  body = body.replace(/\n{3,}/g, '\n\n').trimEnd();

  const fm = ['---', `title: ${JSON.stringify(title)}`];
  if (description) fm.push(`description: ${JSON.stringify(description)}`);
  fm.push('---', '');

  writeFile(outFile, fm.join('\n') + '\n' + body + '\n');
  count++;
}

for (const [dir, meta] of Object.entries(META)) {
  writeFile(path.join(CONTENT, dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
}

console.log(`✓ 生成 ${count} 篇文档`);
console.log(`✓ 图片 ${[...copiedAssets.values()].filter((a) => a.kind === 'image').length} 个 -> assets/img`);
console.log(`✓ 附件 ${[...copiedAssets.values()].filter((a) => a.kind !== 'image').length} 个 -> public/files`);
if (warnings.length) {
  console.warn('\n⚠ 警告:');
  for (const w of warnings) console.warn('  - ' + w);
}
