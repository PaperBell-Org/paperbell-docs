---
title: ZotLit
description: 介绍 PaperBell 使用 ZotLit 时单独调整的设置，以及 Liquid 与 Eta 模板的选择
status: draft
order: 5
---

# ZotLit

## 定位

ZotLit 是“Zotero文献导入 Obsidian”流程在 **Obsidian** 端的核心插件，负责读取 Zotero 文献、生成 Markdown 文献笔记、导入 PDF 批注，以及插入 citation key。

ZotLit v2 {~~当前仍属于 beta 版本。安装前请查看~>安装前请查看~~} **[ZotLit v2 官方安装页](https://zotlit.aidenlx.site/docs/install-zotlit)**{~~，并按照官方说明通过 BRAT 安装 `aidenlx/zotlit`。~>。~~}{>>示例库里 ZotLit 已经是 `2.0.1` 正式版，「仍属 beta、要用 BRAT 装」这个前提不成立了。而且示例库的 BRAT 本身是**禁用**状态，读者照着做会先卡在启用 BRAT 上。如果发布包已经预装了 ZotLit，这一段其实可以整段改成「发布包已预装，确认启用即可」——具体按你们的分发方式定<<}

PaperBell 当前实测版本为：

```text
ZotLit {~~2.0.0-beta.4~>2.0.1~~}{>>示例库装的是 `2.0.1` 正式版（`zotlit/manifest.json`），不是 beta.4<<}
```

## PaperBell 单独修改的设置

下面按照 ZotLit 设置界面从上到下的顺序，只介绍 PaperBell 修改过或必须特别说明的项目。没有列出的设置保持 ZotLit 默认值。

### Literature note folder/文献笔记文件夹

```text
20 - Inputs/Zotero
```

ZotLit 创建的文献笔记统一进入 Zotero 输入目录。

### Show citekey in suggestions、引文建议器

```text
开启
```

搜索文献时同时显示 citation key，方便核对文献笔记文件名和 `.bib` 条目键。

### 2. Templates/模板

#### Template folder/模板文件夹

```text
00 - Obsidian/模板
```

六个 ZotLit 模板都直接放在这个目录中，不能放入它的子文件夹。

#### JavaScript templates/ JavaScript模板

```text
当前设备：开启
```

PaperBell 的六个正文模板使用 Liquid，本身不需要这个开关；但 11 个 Managed Frontmatter 字段使用 JavaScript 表达式，因此必须开启 JavaScript Templates gate。

该授权按设备保存。换电脑后，需要在新设备上重新开启。

#### Template files、模板文件

PaperBell 当前启用了{~~六个 Liquid~>七个 Eta~~}模板：{>>⚠️ 这张表和示例库完全对不上，而且是这一页最要紧的问题。示例库 `00 - Obsidian/模板/` 下实际只有 **`zt-*.eta.md` 七个文件**，一个 `zotlit-*.liquid.md` 都没有。我按实际文件重写了表格，但**这里有个方向性的选择要你来做**：

如果 PaperBell 的意图确实是迁到 Liquid，那就是**示例库还没更新**，该改的是库不是这一页；如果示例库的 Eta 模板才是当前状态，那这一页（以及 05-高级定制/01-ZotLit模板自定义.md 整整 459 行）都要按 Eta 重写。两种情况的工作量差很多，我不替你选。

另外注意这一页下面「旧模板与新模板」一节说「`zt-field.eta.md` 改为设置中的 Managed Frontmatter」，但示例库里 `zt-field.eta.md` **仍然存在**，同时 Managed Frontmatter 的 11 个字段也确实配着——这两者是并存还是重复，也要一并确认<<}

| 设置项 | 当前文件 | 用途 |
| --- | --- | --- |
| Note filename | {~~`zotlit-filename.liquid.md`~>（无独立模板文件，由设置中的文件名规则决定）~~} | 文件名 |
| Literature note | {~~`zotlit-note.liquid.md`~>`zt-note.eta.md`~~} | 新笔记的整体结构 |
| Annotation | {~~`zotlit-annotation.liquid.md`~>`zt-annot.eta.md`~~} | 单条批注格式 |
| Managed region | {~~`zotlit-content.liquid.md`~>`zt-annots.eta.md`~~} | 批注分组及可更新正文 |
| Citation | {~~`zotlit-cite.liquid.md`~>`zt-cite.eta.md`~~} | 带方括号引用 |
| Alternate citation | {~~`zotlit-cite2.liquid.md`~>`zt-cite2.eta.md`~~} | 不带外层方括号的引用 |
{++| Frontmatter 字段 | `zt-field.eta.md` | 生成 `title` / `citekey` / `tags` / `cate` 等字段 |
| 彩色文本 | `zt-colored.eta.md` | 把高亮颜色渲染成 `<mark>` |++}

文件名模板优先使用 citation key：

```liquid
{{ zt.citationKey | default: zt.DOI | default: zt.title | default: zt.key }}{% suffix %}
```

`zotlit-note.liquid.md` 必须保留下面这行，否则不会生成批注和 `%%zt-managed%%` 管理区域：

```liquid
{% render "content" with zt as zt %}
```

模板完整代码及修改方法见 [ZotLit 模板自定义](../../05-高级定制/01-ZotLit模板自定义.md)。

#### Managed Frontmatter

PaperBell 设置了 11 个字段：

```text
title, tags, cate, keywords, read, source,
authors, journal, paper_date, date, important
```

它们统一使用：

```text
Language: JavaScript
Merge strategy: Replace
```

完整 JavaScript 表达式见 [ZotLit 模板自定义](../../05-高级定制/01-ZotLit模板自定义.md) 的 Managed Frontmatter 部分。

### 3. Note import/笔记导入

#### Imported note folder

```text
zotero_notes
```

从 Zotero 导入的子笔记也进入同一个输入目录。{>>示例库的 `zotlit/data.json` 里**没有**这一项（整个文件只有 `note.literature-folder`、`template.folder`、`citation.*` 和 `release.*` 六个键）。所以要么这是 ZotLit 的默认值、库里没显式设过，要么这一段是照着别的配置写的。同样的情况见下面的 Attachment folder。建议核对一次实际设置页，把「PaperBell 显式设置过的」和「用插件默认值的」区分开——现在这一页读起来像每一项都是 PaperBell 特意配的<<}

> [!note] Render annotations from template
> 当前保持关闭。这个开关只控制 Zotero **子笔记**中的批注段落，不是文献笔记中 `zt.annotations` 的总开关。

### 4. Attachments

#### Attachment folder

```text
00 - Obsidian/img
```

ZotLit 导入的批注图片等资源统一保存到这里。文献笔记中的普通 PDF 链接仍然指向 Zotero 原文件。


## 旧模板与新模板

ZotLit v2 同时支持两种模板：

| 类型 | 文件名 | 是否需要 JavaScript gate | 适用情况 |
| --- | --- | --- | --- |
| Liquid 新模板 | `.liquid.md` | 不需要 | 推荐用于日常配置、共享和同步 |
| JavaScript/Eta 模板 | `.eta.md` | 需要 | 已有旧模板或需要复杂 JavaScript 处理 |

PaperBell 当前的六个正文模板使用 **Liquid**，复杂的 Frontmatter 分类逻辑使用 **JavaScript 表达式**。

旧版 Eta 模板也可以继续使用，但 ZotLit v1 模板需要先迁移：

- 文件名前缀由 `zt-` 改成 `zotlit-`；
- `zt-annots.eta.md` 改为 `zotlit-content.eta.md`；
- 数据变量由 `it` 改为 `zt`；
- `zt-field.eta.md` 改为设置中的 Managed Frontmatter；
- 同名 Liquid 与 Eta 文件同时存在时，Liquid 优先生效。

旧模板迁移细节见 [ZotLit 官方 v1 Eta 迁移说明](https://zotlit.aidenlx.site/docs/how-to/migrate-v1-eta-templates)。切换模板语言不会自动转换代码，操作前应先保留副本。

## 最小验收

完成设置后，新建一篇测试文献笔记并确认：

- 文件位于 `20 - Inputs/Zotero`；
- 文件名优先使用 citation key；
- Frontmatter 字段正常生成；
- 正文表格只有 Zotero、File、Journal 三列；
- 存在 `%%zt-managed%%` 与 `%%/zt-managed%%`；
- 批注数量与 Zotero 一致；
- Zotero 新增批注后，执行 `Refresh index` 和 `Update literature note` 可以同步。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Daily Notes](06-Daily-Notes.md)
