---
title: Zotero文献导入 Obsidian
description: 使用 Zotero Connector、Better BibTeX 与 ZotLit 2.1.0-beta.3 将文献和批注导入 Obsidian
status: published
order: 3
---

# Zotero文献导入 Obsidian

这里的“导入”是先用 Zotero Connector 将在线文献和 PDF 保存到 Zotero，再由 ZotLit 2.1.0-beta.3 读取 Zotero 数据，通过 Eta 模板生成可继续编辑的 Markdown 文献笔记。

## 一、组件与当前路径

| 位置 | 组件 | 职责 |
| --- | --- | --- |
| 浏览器 | [Zotero Connector](../04-插件介绍/01-Obsidian外插件/01-Zotero-Connector.md) | 保存网页元数据和可访问的 PDF |
| Zotero | [Better BibTeX](../04-插件介绍/01-Obsidian外插件/02-Better-BibTeX.md) | 管理稳定 citekey，导出 BibTeX/BibLaTeX |
| Zotero | [ZotLit Companion](../04-插件介绍/01-Obsidian外插件/03-ZotLit-Companion.md) | 提供 Zotero 侧命令与协议链接 |
| Zotero（可选） | [Ethereal Style](../04-插件介绍/01-Obsidian外插件/04-Ethereal-Style.md) | 统一批注颜色语义 |
| Obsidian | [ZotLit](../04-插件介绍/02-PaperBell工作流核心插件/05-ZotLit.md) | 从 Zotero 创建文献笔记和插入引用 |
| Obsidian | [Inputs Bell](../04-插件介绍/02-PaperBell工作流核心插件/02-Inputs-Bell.md) | 对落地笔记做归一化、图片本地化和归位 |

发布包中的关键配置是：

```text
ZotLit 版本：2.1.0-beta.3
文献笔记目录：20 - Inputs/Zotero
模板目录：00 - Obsidian/模板
库范围：personal library
```

## 二、准备 Zotero 条目

1. 打开 Zotero 桌面端并选择目标 collection。
2. 在文献详情页使用 Zotero Connector 保存父条目和 PDF。
3. 确认标题、作者、日期、期刊等元数据正确。
4. 确认 PDF 是父条目下的附件，而不是孤立附件。
5. 在 PDF 中新建至少一条高亮或评论，用于验证批注导入。
6. 确认 Better BibTeX citekey 已生成，并在写作期间保持稳定。

> [!important] 只选一个 citekey 权威来源
不要让 Zotero 原生键、Better BibTeX 键和手工键同时变化。PaperBell 的托管字段 `note.frontmatter-fields` 直接读取 ZotLit 提供的 `zt.citationKey`。

## 三、认识六个模板槽位

新版 ZotLit 模板系统有六个槽位，对应 `00 - Obsidian/模板` 中的 `zotlit-*.eta.md`：

| 模板 | 用途 |
| --- | --- |
| `zotlit-note.eta.md` | 生成文献笔记正文骨架 |
| `zotlit-content.eta.md` | 管理区域：Notes 与 Annotations |
| `zotlit-annotation.eta.md` | 渲染单条批注 |
| `zotlit-filename.eta.md` | 生成文件名（默认 citekey） |
| `zotlit-cite.eta.md` | 引用文本模板 |
| `zotlit-cite2.eta.md` | 第二种引用文本模板 |

frontmatter 不再由模板文件生成，由 `data.json` 中的 `note.frontmatter-fields` 托管字段生成（见下文）。

### `note.frontmatter-fields` 当前生成的字段

托管字段生成以下内容：

- `title`、`citekey`、`cate: 论文`；
- `tags`：固定含 `paper`，并接收 Zotero 中以 `#` 开头的标签（移除 `#`）；
- `keywords`：普通 Zotero 标签，但排除阅读状态、来源状态和星标；
- `read`：以 `浏览`、`初读`、`精读` 结尾的标签；
- `source`：以 `更新`、`推荐`、`关联`、`检索` 结尾的标签；
- `authors`、`journal`、`paper_date`、`date`；
- `important`：仅当标签为 `🌟星标` 时为 `True`。

例如，Zotero 标签为：

```text
#project/PaperBell
社会水文学
精读
检索
🌟星标
```

渲染结果应包含：

```yaml
tags: [paper, "project/PaperBell"]
keywords: ["社会水文学"]
read: ["精读"]
source: ["检索"]
important: True
```

需要长期保留的分类应优先回到 Zotero 修改，再重新渲染；不要把托管字段控制的属性当成只在 Obsidian 中维护的自由字段。

## 四、导出真实 ZotLit 文献笔记

1. 在 Zotero 中选中正确的父条目或 PDF 附件。
2. 在 ZotLit 中执行 `Refresh index`。
3. 使用 ZotLit Companion 的创建命令，或在 Obsidian 中通过 ZotLit 选择条目并创建 literature note。
4. 打开 `20 - Inputs/Zotero` 中新生成的文件。

真实导入的文献笔记应按当前模板验收：

- YAML 中至少有 `title`、`citekey`、`tags`、`cate`、`keywords`、`read`、`source`、`authors`、`journal`、`paper_date`、`date`、`important`；
- `citekey` 与 Zotero/Better BibTeX 当前数据一致；
- 正文含一级标题、Zotero 回链与附件链接；
- `## Annotations` 下的批注与 Zotero 一致；
- 文件位于 `20 - Inputs/Zotero`。

> [!note] 不要用静态演示笔记反推 ZotLit 契约
> 发布包在 `20 - Inputs/Zotero` 附带六篇中文标题的静态演示笔记，例如 `CIMPO：一种以输出为导向的学术知识管理方法.md`。它们用于展示 PaperBell 的输入层，不一定是本机 ZotLit 实际导入的产物，可能缺少 citekey 或其他 ZotLit 管理信息。验收模板时请新导入一条真实 Zotero 记录，不要要求演示笔记补齐这些标记。


## 五、新增批注后更新

1. 在 Zotero PDF 阅读器中新建高亮或评论。
2. 回到 Obsidian 后刷新 ZotLit 索引。
3. 对已有文献笔记执行 ZotLit 的更新 literature note 操作。
4. 检查 `## Annotations`，并确认手写内容未被误放到模板会重建的区域。

模板职责应分开排查：正文骨架看 `zotlit-note.eta.md`，管理区域看 `zotlit-content.eta.md`，单条批注看 `zotlit-annotation.eta.md`，文件名看 `zotlit-filename.eta.md`，YAML 看 `data.json` 的 `note.frontmatter-fields`。

## 六、Inputs Bell 的边界

Inputs Bell 当前启用 `normalize-frontmatter`、`localize-images`、`move-by-frontmatter`、`link-institution` 四个脚本。`move-by-frontmatter` 会把带 `zotero-key` 或 `citekey` 的输入归到 `20 - Inputs/Zotero`。

`verify-zotero` 虽然已安装并配置本地 API `http://localhost:23119`，但当前**未启用**。首次验收 ZotLit 时若字段或路径异常，可以暂时停用 Inputs Bell，先验证 ZotLit 的原始渲染，再逐个恢复后处理。

## 七、最小排错顺序

| 现象           | 先检查                                          |
| ------------ | -------------------------------------------- |
| 搜索不到新文献      | Zotero 数据库连接、library scope 与 `Refresh index` |
| YAML 缺失或映射错误 | `data.json` 的 `note.frontmatter-fields` 配置   |
| 整个正文或批注标题缺失  | `zotlit-note.eta.md` 是否 include `content`    |
| 单条批注异常       | `zotlit-annotation.eta.md` 与该条批注数据           |
| citekey 不正确 | Better BibTeX 与 ZotLit 索引中的 citekey |
| ZotLit 正常但路径变化 | Inputs Bell 的 `move-by-frontmatter` 规则 |

---

[上一章：管理科研项目](02-管理科研项目.md) · [返回详细教程](index.md) · [查看插件介绍](../04-插件介绍/index.md) · [下一篇：日常记录](04-日常记录.md)
