---
title: ZotLit
description: 介绍 ZotLit 2.1.0-beta.3 在 PaperBell v5.0.1 中的 Eta 模板、数据配置与使用边界
status: published
order: 5
---

# ZotLit

## 定位与版本

ZotLit 是“Zotero 文献导入 Obsidian”流程在 Obsidian 端的核心插件，负责读取 Zotero 文献、生成或更新 Markdown 文献笔记、导入 PDF 批注并插入 citation key。PaperBell v5.0.1 随包启用 **ZotLit `2.1.0-beta.3`**；确认插件已启用即可，不需要根据旧教程另装 BRAT。

完整导入操作见 [Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md)，模板代码修改见 [ZotLit 模板自定义](../../05-高级定制/01-ZotLit模板自定义.md)。

## 当前 `data.json`

发布包显式保存的设置如下：

| 配置键 | 当前值 | 含义 |
| --- | --- | --- |
| `note.literature-folder` | `20 - Inputs/Zotero` | 文献笔记目录 |
| `template.folder` | `00 - Obsidian/模板` | Eta 模板目录 |
| `citation.show-citekey-in-suggester` | `true` | 建议器显示 citekey |
| `citation.open-as-links` | `true` | 引文以链接形式打开 |
| `zotero.library-scope.mode` | `selected` | 只使用选中的库 |
| `zotero.library-scope.libraries` | 个人库 | 当前选择 personal library |
| `release.previous-version` | `2.1.0-beta.3` | 配置记录的上次版本 |
| `release.migration-pending` | `true` | 仍有迁移状态待插件处理 |

未出现在当前 `data.json` 中的导入子笔记目录、附件目录或 Managed Frontmatter 选项，不应写成 PaperBell 已显式配置的当前值。

## 七个实际 Eta 模板

当前模板目录中恰有七个 `zt-*.eta.md` 文件；没有 Liquid 模板。它们使用 Eta/JavaScript 的 `<% ... %>`、`<%= ... %>` 和 include 语法，数据对象名为 `it`。

| 文件 | 当前职责 |
| --- | --- |
| `zt-note.eta.md` | 文献笔记正文骨架：Zotero、File、Journal 表格与 Annotations 区 |
| `zt-annots.eta.md` | 按 `colorName` 分组批注，按固定顺序生成语义标题，并 include `annotation` |
| `zt-annot.eta.md` | 渲染单条批注的页码、图片/正文、评论与普通标签 |
| `zt-cite.eta.md` | 生成 `[@citekey; @citekey]` 形式的 Pandoc 引文 |
| `zt-cite2.eta.md` | 生成不带外层方括号的 `@citekey; @citekey` |
| `zt-field.eta.md` | 生成 title、citekey、tags、cate、keywords、read、source、authors、journal、paper_date、date、important 等 frontmatter |
| `zt-colored.eta.md` | 按传入的文字色和背景色生成内联 `<mark>` |

`zt-note.eta.md` 中的下列 include 是批注正文入口，定制时不要删除：

```eta
<%~ include("annots", it.annotations) %>
```

当前 frontmatter 来自 `zt-field.eta.md`，不是“11 个 Managed Frontmatter 设置项”。模板会把 `#` 开头的 Zotero 标签写入 `tags`，筛选其余标签写入 `keywords`，并分别提取阅读状态、来源状态和星标。

## 当前颜色语义

`zt-annots.eta.md` 静态定义了以下映射；未列出的颜色仍会按其 `colorName` 建组。

| `colorName` | 分组标题 |
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

单条批注使用 `[!<colorName>] Page <pageLabel>`；最终 Callout 外观仍由 Obsidian 主题或 CSS 决定。Ethereal Style 的配色配合方式见 [Ethereal Style](../01-Obsidian外插件/04-Ethereal-Style.md)。

## 使用边界与验收

- ZotLit 不负责网页采集、Zotero 条目清洗或 Zotero 阅读器配色；
- Inputs Bell 会继续处理进入 `20 - Inputs` 的笔记，但 `verify-zotero` 当前已配置、未启用；
- `release.migration-pending: true` 是配置状态，不等于本教程已验证迁移成功；
- 修改 Eta 模板前先保留副本，并用新导入的真实 Zotero 条目测试，不要用静态演示笔记反推模板契约。

最小验收应确认：新笔记位于 `20 - Inputs/Zotero`；frontmatter 来自 `zt-field.eta.md`；正文出现三列表格与 Annotations；不同颜色按上述语义分组；刷新索引并更新笔记后，新批注能够进入模板管理的批注区域。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Daily Notes](06-Daily-Notes.md)
