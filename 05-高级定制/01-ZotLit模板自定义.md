---
title: ZotLit 模板自定义
slug: advanced/zotlit-templates
description: 理解 ZotLit 2.1.0-beta.3 的六个模板槽位与托管字段，并安全修改文献笔记字段、批注与引用格式
status: published
order: 1
---



# ZotLit 模板自定义

ZotLit 模板决定 Zotero 数据进入 Obsidian 后的正文和引用格式；笔记属性（frontmatter）由设置中的**托管字段** `note.frontmatter-fields` 生成，不再是模板文件。PaperBell v5.0.1 随包启用 **ZotLit `2.1.0-beta.3`**，新版模板位于 `00 - Obsidian/模板`，使用 **Eta/JavaScript**，不是 Liquid。

> [!note] 旧版模板文件
> `00 - Obsidian/模板` 中另有 7 个 `zt-*.eta.md`，是 ZotLit 1.x 的遗留文件，新版模板系统不使用。本页只描述 6 个新版 `zotlit-*.eta.md`；不要把旧文件名或旧教程的 Liquid、`it` 写法照搬进本库。

> [!warning] 预发布版本边界
> `2.1.0-beta.3` 是预发布版，设置入口、命令文案和模板数据结构可能继续变化。修改前先在“设置 → 第三方插件”确认实际版本，并以当前库中的模板文件和 ZotLit 数据浏览器为准。

## 一、当前配置基线

| 项目 | PaperBell v5.0.1 当前值 |
| --- | --- |
| ZotLit 版本 | `2.1.0-beta.3` |
| 模板语言 | Eta（可嵌入 JavaScript） |
| 模板目录 | `00 - Obsidian/模板` |
| 文献笔记目录 | `20 - Inputs/Zotero` |
| 模板槽位 | 六个 `zotlit-*.eta.md` |
| 属性来源 | `note.frontmatter-fields`（`data.json` 中的托管字段） |
| 文件名 | 默认按 `citekey`，可自定义 |

六个模板各自负责一层：

| 文件 | 职责 |
| --- | --- |
| `zotlit-note.eta.md` | 文献笔记正文骨架：标题、Zotero 回链与附件入口，并 include 管理区域 |
| `zotlit-content.eta.md` | 管理区域：渲染 Notes 与 Annotations，并调用单条批注模板 |
| `zotlit-annotation.eta.md` | 渲染一条批注 |
| `zotlit-filename.eta.md` | 生成笔记文件名 |
| `zotlit-cite.eta.md` | 生成带方括号的 Pandoc 引文 |
| `zotlit-cite2.eta.md` | 生成不带外层方括号的引文 |

文件名默认按 `citekey` 生成，模板见下文；frontmatter 不再由模板文件生成，见“三、托管字段”。

## 二、Eta 最小语法

Eta 把模板文本与 JavaScript 组合在一起，ZotLit 将当前模板的数据对象放在 `zt` 中（旧版为 `it`）。

### 输出与执行

```eta
<%= zt.title %>
```

`<%= ... %>` 计算表达式并输出结果。`<% ... %>` 只执行 JavaScript，不直接输出：

```eta
<% const names = zt.tags.map(tag => tag.name); %>
<%= names.join(", ") %>
```

条件、循环、数组方法和模板字符串都使用 JavaScript 语法：

```eta
<% if (zt.comment) { %>
<%= zt.comment %>
<% } %>
```

`<%-`、`_%>` 等带短横线或下划线的分隔符用于控制转义或清理模板两侧空白。空白控制会直接影响 Markdown 的空行、标题和 Callout 结构；不熟悉时不要随意删除。

### `zt` 不是固定的同一种对象

`zt` 的含义取决于模板槽位：

- 在 `zotlit-note`、`zotlit-filename` 中，`zt` 是一条文献数据，可读取 `title`、`backlink`、`attachments`、`citationKey`、`DOI` 等；
- 在 `zotlit-content` 中，`zt` 仍是文献数据，读取 `notes` 与 `annotations` 两个数组；
- 在 `zotlit-annotation` 中，`zt` 是单条批注，读取 `pageLabel`、`imgLink`、`text`、`comment`；
- 在 `zotlit-cite` 与 `zotlit-cite2` 中，`zt` 带有 `citations` 数组，每条含 `item.citationKey`、`suppressAuthor`、`locator` 等。

不要因为两个模板都写 `zt.tags`，就假定标签对象一定具有相同用途。修改前应使用 ZotLit 的模板数据浏览功能检查真实数据。

### include 如何连接模板

当前正文与管理区域链是：

```text
zotlit-note → include("content", zt)
            → zotlit-content 渲染 Notes / Annotations
            → include("annotation", annotation)
            → zotlit-annotation 渲染单条批注
```

`<%~ ... %>` 会原样输出 include 的结果，适合让子模板生成 Markdown：

```eta
<%~ include("content", zt) %>
<%~ include("annotation", annotation) %>
```

这里的 include 名称是 ZotLit 注册的模板槽位名，不是让你把文件名改成 `content.md` 或 `annotation.md`。删除第一个 include 会让新笔记只有一级标题和回链，没有 Notes/Annotations 区块；删除第二个 include 会让批注区块只剩标题而没有单条内容。

## 三、托管字段 `note.frontmatter-fields`

以下代码按 v5.0.1 发布包中的实际文件与配置记录。自定义时应复制对应文件后再改，不要把教程代码覆盖到版本不同的库。

### 字段配置

frontmatter 由 ZotLit 设置中的 `note.frontmatter-fields` 生成，保存在 `.obsidian/plugins/zotlit/data.json`。随包 `data.json` 没有这段配置，需要你把下面的数组**合并进** `data.json` 的 `note.frontmatter-fields` 键——只复制字段数组，不要整文件覆盖你的 `data.json`：

```json
"note.frontmatter-fields": [
  { "key": "title", "expr": "zt.title", "merge": "replace", "language": "liquid" },
  { "key": "citekey", "expr": "zt.citationKey", "merge": "replace", "language": "javascript" },
  { "key": "itemType", "expr": "zt.itemType", "merge": "replace", "language": "javascript" },
  { "key": "authors", "expr": "zt.authors.map(a => a.fullName)", "merge": "replace", "language": "javascript" },
  { "key": "journal", "expr": "zt.containerTitle ?? zt.publicationTitle", "merge": "replace", "language": "javascript" },
  { "key": "publicationTitle", "expr": "zt.containerTitle ?? zt.publicationTitle", "merge": "replace", "language": "javascript" },
  { "key": "journalAbbreviation", "expr": "zt.journalAbbreviation", "merge": "replace", "language": "javascript" },
  { "key": "paper_date", "expr": "zt.date?.year ?? \"\"", "merge": "replace", "language": "javascript" },
  { "key": "cate", "expr": "\"论文\"", "merge": "replace", "language": "javascript" },
  { "key": "volume", "expr": "zt.volume", "merge": "replace", "language": "javascript" },
  { "key": "issue", "expr": "zt.issue", "merge": "replace", "language": "javascript" },
  { "key": "pages", "expr": "zt.pages", "merge": "replace", "language": "javascript" },
  { "key": "language", "expr": "zt.language", "merge": "replace", "language": "javascript" },
  { "key": "DOI", "expr": "zt.DOI", "merge": "replace", "language": "javascript" },
  { "key": "ISSN", "expr": "zt.ISSN", "merge": "replace", "language": "javascript" },
  { "key": "tags", "expr": "[\"paper\", ...new Set((zt.tags ?? []).map(t => typeof t === \"string\" ? t : (t.tag?.name ?? t.name ?? t.tag ?? t.text ?? t.label)).filter(Boolean).map(String).filter(n => n.startsWith(\"#\")).map(n => n.slice(1)))]", "merge": "append", "language": "javascript" },
  { "key": "keywords", "expr": "(zt.tags ?? []).map(t => typeof t === \"string\" ? t : (t.tag?.name ?? t.name ?? t.tag ?? t.text ?? t.label)).filter(Boolean).map(String).filter(n => !n.startsWith(\"#\") && !n.includes(\"⭐\") && !n.includes(\"🌟\") && ![\"更新\",\"推荐\",\"关联\",\"检索\",\"浏览\",\"初读\",\"精读\",\"星标\"].some(e => n.endsWith(e)))", "merge": "append", "language": "javascript" },
  { "key": "read", "expr": "((zt.tags ?? []).map(t => typeof t === \"string\" ? t : (t.tag?.name ?? t.name ?? t.tag ?? t.text ?? t.label)).filter(Boolean).map(String).find(n => [\"浏览\",\"初读\",\"精读\"].some(e => n.endsWith(e)))) ?? \"\"", "merge": "replace", "language": "javascript" },
  { "key": "source", "expr": "((zt.tags ?? []).map(t => typeof t === \"string\" ? t : (t.tag?.name ?? t.name ?? t.tag ?? t.text ?? t.label)).filter(Boolean).map(String).find(n => [\"更新\",\"推荐\",\"关联\",\"检索\"].some(e => n.endsWith(e)))) ?? \"\"", "merge": "replace", "language": "javascript" },
  { "key": "important", "expr": "(zt.tags ?? []).map(t => typeof t === \"string\" ? t : (t.tag?.name ?? t.name ?? t.tag ?? t.text ?? t.label)).filter(Boolean).map(String).some(n => n.includes(\"🌟\") || n.includes(\"⭐\"))", "merge": "replace", "language": "javascript" },
  { "key": "dateAdded", "expr": "zt.dateAdded | date: \"%Y-%m-%d\"", "merge": "replace", "language": "liquid" },
  { "key": "date", "expr": "zt.dateModified | date: \"%Y-%m-%d\"", "merge": "replace", "language": "liquid" },
  { "key": "archive", "expr": "zt.archive", "merge": "replace", "language": "javascript" },
  { "key": "archiveLocation", "expr": "zt.archiveLocation", "merge": "replace", "language": "javascript" },
  { "key": "libraryCatalog", "expr": "zt.libraryCatalog", "merge": "replace", "language": "javascript" },
  { "key": "callNumber", "expr": "zt.callNumber", "merge": "replace", "language": "javascript" },
  { "key": "rights", "expr": "zt.rights", "merge": "replace", "language": "javascript" },
  { "key": "collection", "expr": "zt.collections.map(c => c.path.join(\"/\"))", "merge": "replace", "language": "javascript" },
  { "key": "itemLink", "expr": "zt.backlink", "merge": "replace", "language": "javascript" },
  { "key": "abstract", "expr": "zt.abstract", "merge": "replace", "language": "javascript" }
]
```

合并后用 ZotLit 新建或更新一篇文献笔记，frontmatter 即按这些表达式重写。

### 标签分流规则

标签分流规则如下：

| Zotero 标签模式 | 输出字段 | 处理方式 |
| --- | --- | --- |
| 以 `#` 开头 | `tags` | 去掉开头 `#`，并始终加入 `paper` |
| 普通标签 | `keywords` | 排除星标，以及阅读/来源状态后保留 |
| 以“浏览”“初读”“精读”结尾 | `read` | 原样保留 |
| 以“更新”“推荐”“关联”“检索”结尾 | `source` | 原样保留 |
| 完全匹配 `🌟星标` | `important` | 输出 `True`，否则 `False` |

例如 Zotero 标签 `#project/PaperBell`、`社会水文学`、`精读`、`检索`、`🌟星标` 会分别进入项目标签、关键词、阅读状态、来源状态和重要标记。这里的 frontmatter 来自 `note.frontmatter-fields` 的字段表达式，不是模板文件，也不是旧版教程所说的 11 个 Managed Frontmatter 设置项。

> [!warning] YAML 安全
> 托管字段由插件序列化为 YAML，但标题、作者、期刊或标签含引号、冒号、方括号等特殊字符时仍可能产生意外结果。修改字段表达式后，请准备包含这些字符的 Zotero 测试条目，并在导入后检查 Obsidian 属性是否仍可解析。

## 四、当前六个模板

### 1. `zotlit-note.eta.md`：正文骨架

```eta
# <%= zt.title %>

[Zotero](<%= zt.backlink %>) <%= zt.attachments.map(a => a.fileLink()).filter(Boolean).join(" ") %>

<%~ include("content", zt) %>
```

它生成一级标题、Zotero 回链和附件链接，然后把笔记与批注渲染交给 `content` 管理区域。删除 `include("content", zt)` 会让新笔记没有 Notes/Annotations 区块。

### 2. `zotlit-content.eta.md`：管理区域

```eta
<% if (zt.notes.length) { %>
## Notes

<% for (const note of zt.notes) { -%>
- <%~ note.noteLink() %>
<% } %>
<% } %>
<% if (zt.annotations.length) { %>
## Annotations

<% for (const annotation of zt.annotations) { %>
<%~ include("annotation", annotation) %>
<% } %>
<% } %>
```

它先渲染 Zotero 子笔记列表，再按索引顺序遍历批注。新版默认模板**不做颜色分组**：所有批注统一交给 `annotation` 模板渲染，旧版 `zt-annots.eta.md` 按颜色生成语义标题的行为已不存在。

### 3. `zotlit-annotation.eta.md`：单条批注

```eta
<% bq(() => { %>
[!note] Page <%= zt.pageLabel %>

<%= embed(zt.imgLink) %><%= zt.text %>
<% if (zt.comment) { %>

<%= zt.comment %>
<% } %>
<% }) %>
```

它用 `[!note]` Callout 输出页码、图片批注或文字、可选评论；`bq()` 是 ZotLit 的 Callout 包装辅助函数。当前默认模板不按颜色输出不同 Callout 类型。

### 4. `zotlit-filename.eta.md`：文件名

```eta
<%= zt.citationKey ?? zt.DOI ?? zt.title ?? zt.key %><%= suffix() %>
```

默认按 `citekey` 命名，缺 citekey 时依次回退 DOI、标题、条目 key；`suffix()` 处理重名后缀。想改成按标题命名，把表达式换成 `<%= zt.title %><%= suffix() %>` 即可。

### 5. `zotlit-cite.eta.md`：带方括号引用

```eta
[<%= zt.citations.filter(c => c.item.citationKey).map(c => `${c.suppressAuthor ? "-" : ""}@${c.item.citationKey}${c.locator ? `, ${c.labelShort} ${c.locator}` : ""}`).join("; ") %>]
```

选择两篇文献时可生成 `[@Smith2024; @Wang2025]`，支持 suppress-author 前缀和页码 locator，适合 Pandoc/citeproc 引文。

### 6. `zotlit-cite2.eta.md`：不带方括号引用

```eta
<%= zt.citations.filter(c => c.item.citationKey).map(c => `${c.suppressAuthor ? "-" : ""}@${c.item.citationKey}${c.locator ? `, ${c.labelShort} ${c.locator}` : ""}`).join("; ") %>
```

同一组文献生成 `@Smith2024; @Wang2025`，不带外层方括号。

## 五、安全备份与测试流程

> [!danger] 不要直接在唯一一份正式库中试模板
> 更新文献笔记可能重写 ZotLit 管理的内容。先复制整个 vault，或至少把六个模板和 `data.json` 中的字段配置复制到 vault 外的备份位置，并记录 ZotLit 版本与修改时间。

推荐按以下顺序操作：

1. 确认 ZotLit 版本为本页对应的 `2.1.0-beta.3`；如果不同，先比较模板槽位和 `zt` 数据。
2. 备份 `00 - Obsidian/模板` 中六个 `zotlit-*.eta.md` 文件和 `data.json` 的 `note.frontmatter-fields` 配置；备份文件不要留在活动模板目录中，以免被误选。
3. 准备一个专用 Zotero 测试条目，至少包含标题、作者、期刊、URL、附件、`#` 标签、普通关键词、阅读/来源标签和星标。
4. 在 PDF 中准备文字高亮、图片批注、评论、普通批注标签和至少三种颜色。
5. 每次只修改一个模板，并保存修改前后的差异。
6. 在 ZotLit 中刷新索引，然后**从 Zotero 条目真实新建**一篇文献笔记。
7. 检查属性 YAML、一级标题与 Zotero 回链、Notes/Annotations 区块、批注总数、评论、图片和两种引用输出。
8. 再回到 Zotero 新增一条批注，刷新索引并更新测试文献笔记，确认新增内容进入预期区域且手写内容未丢失。
9. 失败时立即恢复备份；通过首次创建与更新两轮测试后，再小批量应用到正式资料。

## 六、真实导入与静态演示的区别

教程中的代码块和已有示例笔记只能展示“可能的 Markdown 结果”，不能证明当前 ZotLit 已完成连接、索引、模板迁移或更新操作。尤其不能从一篇静态演示笔记反推 `zt` 的全部字段。

真实验收必须同时满足：

- Zotero Connector/ZotLit Companion 等上游连接已按导入教程配置；
- ZotLit 能从当前 Zotero 库找到测试条目；
- 新笔记实际生成在 `20 - Inputs/Zotero`；
- frontmatter 确实由 `note.frontmatter-fields` 生成；
- 正文出现一级标题、Zotero 回链与 Notes/Annotations 区块；
- 修改 Zotero 批注后，刷新索引并更新文献笔记能看到变化；
- 插入引用命令实际调用 `zotlit-cite` 或 `zotlit-cite2` 并得到预期文本。

发布包配置中的迁移状态或静态模板文件存在，只代表“配置与资产已随包提供”，不等于运行时已经验证成功。完整导入步骤见 [Zotero文献导入 Obsidian](../03-详细教程/03-Zotero文献导入Obsidian.md)，插件边界见 [ZotLit](../04-插件介绍/02-PaperBell工作流核心插件/05-ZotLit.md)。

## 七、最小验收清单

- [ ] 六个模板与 `note.frontmatter-fields` 配置均有可恢复备份；
- [ ] 新建文献笔记位于 `20 - Inputs/Zotero`；
- [ ] `title`、`citekey`、`tags`、`keywords`、`read`、`source` 等属性可解析；
- [ ] 文件名默认等于 `citekey`（或符合自定义规则）；
- [ ] 批注数量与 Zotero 测试条目一致；
- [ ] 一级标题、Zotero 回链与 Notes/Annotations 区块齐全；
- [ ] 图片、正文、评论和普通标签均能显示；
- [ ] `zotlit-cite` 带方括号，`zotlit-cite2` 不带外层方括号；
- [ ] 更新测试笔记后新增批注出现，手写内容仍然保留。

---

[返回高级定制](index.md) · [返回 ZotLit 插件介绍](../04-插件介绍/02-PaperBell工作流核心插件/05-ZotLit.md) · [返回 Zotero文献导入 Obsidian](../03-详细教程/03-Zotero文献导入Obsidian.md)
