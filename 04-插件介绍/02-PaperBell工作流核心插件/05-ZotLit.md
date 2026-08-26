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


> [!note] 托管字段需自行配置
> 随包 `data.json` 未包含 `note.frontmatter-fields`。首次使用前请按 [ZotLit 模板自定义](../../05-高级定制/01-ZotLit模板自定义.md) 把字段配置合并进自己的 `data.json`，否则 frontmatter 只有 ZotLit 默认的少量字段。

## 六个实际 Eta 模板

新版模板系统共有六个槽位，对应 `00 - Obsidian/模板` 中的 `zotlit-*.eta.md` 文件；它们使用 Eta/JavaScript 的 `<% ... %>`、`<%= ... %>` 和 include 语法，数据对象名为 `zt`。模板目录中另有 7 个 `zt-*.eta.md` 是 ZotLit 1.x 遗留文件，新版系统不使用。

| 文件 | 当前职责 |
| --- | --- |
| `zotlit-note.eta.md` | 文献笔记正文骨架：一级标题、Zotero 回链与附件入口，并 include `content` |
| `zotlit-content.eta.md` | 管理区域：渲染 Notes 与 Annotations，并 include `annotation` |
| `zotlit-annotation.eta.md` | 渲染单条批注为 `[!note]` Callout，含页码、图片/正文与评论 |
| `zotlit-filename.eta.md` | 生成笔记文件名（默认 citekey） |
| `zotlit-cite.eta.md` | 生成 `[@citekey; @citekey]` 形式的 Pandoc 引文，支持页码与 suppress-author |
| `zotlit-cite2.eta.md` | 生成不带外层方括号的 `@citekey; @citekey` |


[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Daily Notes](06-Daily-Notes.md)
