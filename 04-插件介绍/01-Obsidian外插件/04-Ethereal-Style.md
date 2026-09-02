---
title: Ethereal Style
slug: plugins/external/ethereal-style
description: 在 Zotero 中配置批注颜色，并了解与 PaperBell 的 ZotLit Eta 模板的配合边界
status: published
order: 4
---

# Ethereal Style

## 定位

Ethereal Style 是安装在 Zotero 中的界面与阅读增强插件。PaperBell 主要用它统一 PDF 批注颜色；它不负责把批注导入 Obsidian。即使不安装，ZotLit 仍可导入批注。

- [Ethereal Style 官方仓库](https://github.com/MuiseDestiny/zotero-style)
- [Ethereal Style 中文使用文档](https://zotero-chinese.github.io/user-guide/plugins/style)

PaperBell 当前记录的本地测试版本为 `6.0.8`，该数字不代表永久最新版本。

## 与 Eta 模板的链路

```text
Ethereal Style 设置 Zotero 批注颜色
→ Zotero 保存颜色值
→ ZotLit 提供 colorName
→ 新版默认模板不按颜色分组：zotlit-content.eta.md 按顺序遍历批注
→ zotlit-annotation.eta.md 渲染单条 [!note] 批注
→ Obsidian 主题或 CSS 决定 Callout 外观
```

新版模板系统相关的实际文件是：

- `00 - Obsidian/模板/zotlit-content.eta.md`：Notes 与 Annotations 区块；
- `00 - Obsidian/模板/zotlit-annotation.eta.md`：页码、批注正文与评论；
- `00 - Obsidian/模板/` 中另有 7 个 `zt-*.eta.md`（如 `zt-annots.eta.md`、`zt-colored.eta.md`），是 ZotLit 1.x 遗留文件，新版模板系统不使用。

当前库使用 Eta/JavaScript 语法和 `zt` 数据对象，不使用 Liquid 文件名或 Liquid 语法。

## 当前批注输出

新版默认模板 `zotlit-annotation.eta.md` 生成统一格式：

```markdown
[!note] Page 3

批注正文
```

不区分 `colorName`，也没有按颜色分组的语义标题；上面的颜色语义映射是旧版 `zt-annots.eta.md` 的行为，新版默认模板已不再生成。Ethereal Style 仍负责在 Zotero 阅读器里统一颜色视觉，但该颜色不会自动进入 Obsidian 笔记的结构。若需要按颜色分组，需自行定制 `content`/`annotation` 模板。

## 修改与验收

| 需求 | 修改位置 |
| --- | --- |
| 改 Zotero 阅读器中的色值 | Ethereal Style 设置 |
| 恢复按颜色分组或语义标题 | 自行定制 `zotlit-content.eta.md` / `zotlit-annotation.eta.md` |
| 改单条批注格式 | `zotlit-annotation.eta.md` 
| 改 Callout 外观 | Obsidian 主题或 CSS snippet |

修改后用一条测试文献创建多种颜色的批注，在 ZotLit 中刷新索引并更新或新建文献笔记，核对 `colorName`、批注顺序和正文格式。完整导入流程见 [Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md)，高级代码定制见 [ZotLit 模板自定义](../../05-高级定制/01-ZotLit模板自定义.md)。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Obsidian Web Clipper](05-Web-Clipper.md)
