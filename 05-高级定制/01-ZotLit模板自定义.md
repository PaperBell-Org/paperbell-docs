---
title: ZotLit 模板自定义
description: 理解 ZotLit 2.1.0-beta.3 的七个 Eta 模板，并安全修改文献笔记字段、批注分组与引用格式
status: published
order: 1
---



# ZotLit 模板自定义

ZotLit 模板决定 Zotero 数据进入 Obsidian 后的正文、属性、批注分组和引用格式。PaperBell v5.0.1 随包启用 **ZotLit `2.1.0-beta.3`**，实际模板位于 `00 - Obsidian/模板`，使用 **Eta/JavaScript**，不是 Liquid。

> [!warning] 预发布版本边界
> `2.1.0-beta.3` 是预发布版，设置入口、命令文案和模板数据结构可能继续变化。修改前先在“设置 → 第三方插件”确认实际版本，并以当前库中的模板文件和 ZotLit 数据浏览器为准。

## 一、当前配置基线

| 项目 | PaperBell v5.0.1 当前值 |
| --- | --- |
| ZotLit 版本 | `2.1.0-beta.3` |
| 模板语言 | Eta（可嵌入 JavaScript） |
| 模板目录 | `00 - Obsidian/模板` |
| 文献笔记目录 | `20 - Inputs/Zotero` |
| 模板文件 | 七个 `zt-*.eta.md` |
| 属性来源 | `zt-field.eta.md` |

七个文件各自负责一层：

| 文件 | 职责 |
| --- | --- |
| `zt-note.eta.md` | 文献笔记正文骨架和批注入口 |
| `zt-field.eta.md` | 生成文献笔记 frontmatter 字段 |
| `zt-annot.eta.md` | 渲染一条批注 |
| `zt-annots.eta.md` | 按颜色组织全部批注，并调用单条批注模板 |
| `zt-cite.eta.md` | 生成带方括号的 Pandoc 引文 |
| `zt-cite2.eta.md` | 生成不带外层方括号的引文 |
| `zt-colored.eta.md` | 生成带文字色或背景色的内联 `<mark>` |

当前配置没有独立的“文件名模板”。不要把旧教程中的 Liquid 文件名模板、正文管理模板或单条批注模板照搬入本库。

## 二、Eta 最小语法

Eta 把模板文本与 JavaScript 组合在一起，ZotLit 将当前模板的数据对象放在 `it` 中。

### 输出与执行

```eta
<%= it.title %>
```

`<%= ... %>` 计算表达式并输出结果。`<% ... %>` 只执行 JavaScript，不直接输出：

```eta
<% const names = it.tags.map(tag => tag.name); %>
<%= names.join(", ") %>
```

条件、循环、数组方法和模板字符串都使用 JavaScript 语法：

```eta
<% if (it.comment) { %>
<%= it.comment %>
<% } %>
```

`<%-`、`_%>` 等带短横线或下划线的分隔符用于控制转义或清理模板两侧空白。空白控制会直接影响 Markdown 的空行、标题和 Callout 结构；不熟悉时不要随意删除。

### `it` 不是固定的同一种对象

`it` 的含义取决于模板槽位：

- 在 `zt-note` 中，`it` 是一条文献数据，当前模板读取 `backlink`、`fileLink`、`publicationTitle`、`url`、`annotations`；
- 在 `zt-field` 中，`it` 仍是文献数据，并读取 `title`、`citekey`、`tags`、`authors`、`date`、`dateModified` 等字段；
- 在 `zt-annots` 中，`it` 是批注数组；
- 在 `zt-annot` 中，`it` 是单条批注；
- 在 `zt-cite` 与 `zt-cite2` 中，`it` 是所选文献数组；
- 在 `zt-colored` 中，`it` 包含 `color`、`bgColor` 和 `content`。

不要因为两个模板都写 `it.tags`，就假定标签对象一定具有相同用途。修改前应使用 ZotLit 的模板数据浏览功能检查真实数据。

### include 如何连接模板

当前正文批注链是：

```text
zt-note → include("annots", it.annotations)
        → zt-annots 按颜色分组
        → include("annotation", annot)
        → zt-annot 渲染单条批注
```

`<%~ ... %>` 会原样输出 include 的结果，适合让子模板生成 Markdown：

```eta
<%~ include("annots", it.annotations) %>
<%~ include("annotation", annot) %>
```

这里的 include 名称是 ZotLit 注册的模板槽位名，不是让你把文件名改成 `annots.md` 或 `annotation.md`。删除第一个 include 会让新笔记只有 “Annotations” 标题而没有批注；删除第二个 include 会留下分组标题但没有单条内容。

## 三、当前七个模板

以下代码按 v5.0.1 发布包中的实际文件记录。自定义时应复制对应文件后再改，不要把教程代码覆盖到版本不同的库。

### 1. `zt-note.eta.md`：正文骨架

```eta
| Zotero                       | File               | Journal                                    |
| ---------------------------- | ------------------ | ------------------------------------------ |
| [Zotero](<%= it.backlink %>) | <%= it.fileLink %> | [<%= it.publicationTitle %>](<%= it.url%>) |

## Annotations

<%~ include("annots", it.annotations) %>
```

它生成 Zotero 回链、附件入口和期刊链接三列表格，然后把批注数组交给 `annots`。如果条目没有期刊或 URL，当前模板不会自动隐藏空链接；需要增强空值处理时，应使用测试条目验证 Markdown 表格仍保持三列。

### 2. `zt-field.eta.md`：属性与标签分流

当前模板生成以下字段：

```eta
title: "<%= it.title %>"

citekey: "<%= it.citekey %>"

tags: [paper, <%= it.tags.filter(t => t.name && t.name.startsWith('#')).map(t => '"' + t.name.slice(1) + '"').join(', ') %>]

cate: 论文

keywords: [<%let excludeEndings = ['更新', '推荐', '关联', '检索', '浏览', '初读', '精读', '星标'];
let filteredKeywordTags = (Array.isArray(it.tags) ? it.tags : []).filter(t =>
  t.name &&
  !t.name.startsWith('#') &&
  !t.name.includes('⭐') &&
  !t.name.includes('🌟') &&
  !excludeEndings.some(ending => t.name.endsWith(ending))
).map(t => '"' + t.name + '"');
%> <%= filteredKeywordTags.join(', ') %>]

read: [<% let endings = ['浏览', '初读', '精读']; %><%= it.tags.filter(t => t.name && endings.some(e => t.name.endsWith(e))).map(t => '"' + t.name + '"').join(', ') %>]

source: [<% let endings_2 = ['更新', '推荐', '关联', '检索']; %><%= it.tags.filter(t => t.name && endings_2.some(e => t.name.endsWith(e))).map(t => '"' + t.name + '"').join(', ') %>]

authors: [<%= it.authors %>]

journal: <%= it.publicationTitle %>

paper_date: <%= it.date %>

date: <%= (new Date(it.dateModified || Date.now())).toISOString().slice(0, 10) %>

<%
let isImportant = it.tags.some(t => t.name === '🌟星标');
%>

important: <%= isImportant ? 'True' : 'False' %>
```

标签分流规则如下：

| Zotero 标签模式 | 输出字段 | 处理方式 |
| --- | --- | --- |
| 以 `#` 开头 | `tags` | 去掉开头 `#`，并始终加入 `paper` |
| 普通标签 | `keywords` | 排除星标，以及阅读/来源状态后保留 |
| 以“浏览”“初读”“精读”结尾 | `read` | 原样保留 |
| 以“更新”“推荐”“关联”“检索”结尾 | `source` | 原样保留 |
| 完全匹配 `🌟星标` | `important` | 输出 `True`，否则 `False` |

例如 Zotero 标签 `#project/PaperBell`、`社会水文学`、`精读`、`检索`、`🌟星标` 会分别进入项目标签、关键词、阅读状态、来源状态和重要标记。这里的 frontmatter 来自 `zt-field.eta.md`，不是旧版教程所说的 11 个 Managed Frontmatter 表达式。

> [!warning] YAML 安全
> 当前模板只对部分值显式加引号。标题、作者、期刊或标签含引号、冒号、方括号等字符时，可能破坏 YAML。若要增强转义，请先准备包含这些字符的 Zotero 测试条目，并在导入后检查 Obsidian 属性是否仍可解析。

### 3. `zt-annot.eta.md`：单条批注

```eta
[!<%= it.colorName %>] Page <%= it.pageLabel %>

<%= it.imgEmbed %><%= it.text %>
<% if (it.comment) { %>
---

<%= it.comment %>
<% } %>

<%= it.tags.filter(t => t.type === 0).map(t => `#${t.name}`).join(' ') %>
```

它输出 Callout 类型、页码、图片批注或文字、可选评论，以及 `type === 0` 的普通标签。外层引用符号由 ZotLit/include 的渲染上下文处理；最终颜色则取决于 Obsidian 主题或 CSS。

### 4. `zt-annots.eta.md`：颜色分组

```eta
<% const byColor = Object.groupBy(it, (annot) => annot.colorName);
const label = {
    "red": "Conclusion",
    "orange": "Keyword",
    "yellow": "Highlight",
    "gray": "Comment",
    "green": "Quote",
    "cyan": "Task",
    "blue": "Definition",
    "navy": "Definition",
    "purple": "Question",
    "brown": "Source",
    "magenta": "To Do"
};
// Merge colors with customized label with unexpected colors, if any
// Keep the order of the colors from the original color-label map
const colorSet = new Set([...Object.keys(label), ...Object.keys(byColor)]);
for (const color of colorSet) {
if (!(color in byColor)) continue -%>

### <%= label[color] ?? color %>

  <%_ for (const annot of byColor[color]) { %>

<%~ include("annotation", annot) %>
  <%_ } %>
<% } %>
```

颜色映射是阅读语义，不是 CSS 色值：

| `colorName` | 标题 |
| --- | --- |
| `red` | Conclusion |
| `orange` | Keyword |
| `yellow` | Highlight |
| `gray` | Comment |
| `green` | Quote |
| `cyan` | Task |
| `blue`、`navy` | Definition |
| `purple` | Question |
| `brown` | Source |
| `magenta` | To Do |

`label[color] ?? color` 是兜底：遇到映射表外的新颜色时，仍以原始 `colorName` 建组。自定义标题时只修改右侧文本；若删除左侧颜色键，该颜色仍会出现，但标题会回退为颜色名。

### 5. `zt-cite.eta.md`：带方括号引用

```eta
[<%= it.map(lit => `@${lit.citekey}`).join("; ") %>]
```

选择两篇文献时可生成 `[@Smith2024; @Wang2025]`，适合 Pandoc/citeproc 引文。

### 6. `zt-cite2.eta.md`：不带方括号引用

```eta
<%= it.map(lit => `@${lit.citekey}`).join("; ") %>
```

同一组文献会生成 `@Smith2024; @Wang2025`。当前两个模板只拼接 citekey，不处理页码、前后缀或 suppress-author 等旧版 Liquid 示例中的扩展结构。

### 7. `zt-colored.eta.md`：内联颜色

```eta
<mark style="
<%- if (it.color) { _%> color: <%= it.color %>; <%_ } -%>
<%- if (it.bgColor) { _%> background-color: <%= it.bgColor %>; <%_ } -%>
"><%= it.content %></mark>
```

传入文字色时写入 `color`，传入背景色时写入 `background-color`，内容放入 `<mark>`。它处理内联 HTML，不负责批注的语义分组。

## 四、安全备份与测试流程

> [!danger] 不要直接在唯一一份正式库中试模板
> 更新文献笔记可能重写 ZotLit 管理的内容。先复制整个 vault，或至少把七个模板复制到 vault 外的备份位置，并记录 ZotLit 版本与修改时间。

推荐按以下顺序操作：

1. 确认 ZotLit 版本为本页对应的 `2.1.0-beta.3`；如果不同，先比较模板槽位和 `it` 数据。
2. 备份 `00 - Obsidian/模板` 中全部七个 `zt-*.eta.md` 文件；备份文件不要留在活动模板目录中，以免被误选。
3. 准备一个专用 Zotero 测试条目，至少包含标题、作者、期刊、URL、附件、`#` 标签、普通关键词、阅读/来源标签和星标。
4. 在 PDF 中准备文字高亮、图片批注、评论、普通批注标签和至少三种颜色。
5. 每次只修改一个模板，并保存修改前后的差异。
6. 在 ZotLit 中刷新索引，然后**从 Zotero 条目真实新建**一篇文献笔记。
7. 检查属性 YAML、三列表格、批注总数、颜色标题、评论、图片和两种引用输出。
8. 再回到 Zotero 新增一条批注，刷新索引并更新测试文献笔记，确认新增内容进入预期区域且手写内容未丢失。
9. 失败时立即恢复备份；通过首次创建与更新两轮测试后，再小批量应用到正式资料。

## 五、真实导入与静态演示的区别

教程中的代码块和已有示例笔记只能展示“可能的 Markdown 结果”，不能证明当前 ZotLit 已完成连接、索引、模板迁移或更新操作。尤其不能从一篇静态演示笔记反推 `it` 的全部字段。

真实验收必须同时满足：

- Zotero Connector/ZotLit Companion 等上游连接已按导入教程配置；
- ZotLit 能从当前 Zotero 库找到测试条目；
- 新笔记实际生成在 `20 - Inputs/Zotero`；
- frontmatter 确实由 `zt-field.eta.md` 生成；
- 正文出现三列表格和按颜色分组的 Annotations；
- 修改 Zotero 批注后，刷新索引并更新文献笔记能看到变化；
- 插入引用命令实际调用 `zt-cite` 或 `zt-cite2` 并得到预期文本。

发布包配置中的迁移状态或静态模板文件存在，只代表“配置与资产已随包提供”，不等于运行时已经验证成功。完整导入步骤见 [Zotero文献导入 Obsidian](../03-详细教程/03-Zotero文献导入Obsidian.md)，插件边界见 [ZotLit](../04-插件介绍/02-PaperBell工作流核心插件/05-ZotLit.md)。

## 六、最小验收清单

- [ ] 七个模板均有可恢复备份；
- [ ] 新建文献笔记位于 `20 - Inputs/Zotero`；
- [ ] `title`、`citekey`、`tags`、`keywords`、`read`、`source` 等属性可解析；
- [ ] Zotero、File、Journal 表格仍为三列；
- [ ] 批注数量与 Zotero 测试条目一致；
- [ ] 已知颜色进入固定语义标题，未知颜色不会丢失；
- [ ] 图片、正文、评论和普通标签均能显示；
- [ ] `zt-cite` 带方括号，`zt-cite2` 不带外层方括号；
- [ ] 更新测试笔记后新增批注出现，手写内容仍然保留。

---

[返回高级定制](index.md) · [返回 ZotLit 插件介绍](../04-插件介绍/02-PaperBell工作流核心插件/05-ZotLit.md) · [返回 Zotero文献导入 Obsidian](../03-详细教程/03-Zotero文献导入Obsidian.md)
