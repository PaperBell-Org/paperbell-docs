---
title: Ethereal Style
description: 在 Zotero 中配置批注颜色，并与 PaperBell 的 ZotLit Eta 模板保持语义一致
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
→ zt-annots.eta.md 按 colorName 分组并命名
→ zt-annot.eta.md 渲染单条 [!colorName] 批注
→ Obsidian 主题或 CSS 决定 Callout 外观
```

三个直接相关的实际文件是：

- `00 - Obsidian/模板/zt-annots.eta.md`：颜色分组、顺序和语义标题；
- `00 - Obsidian/模板/zt-annot.eta.md`：页码、批注正文、评论和标签；
- `00 - Obsidian/模板/zt-colored.eta.md`：为内联内容应用文字色与背景色。

当前库使用 Eta/JavaScript 语法和 `it` 数据对象，不使用 Liquid 文件名或 Liquid 语法。

## 当前静态颜色语义

以下是 `zt-annots.eta.md` 明确支持的映射，而不是按颜色中文名直译：

| ZotLit `colorName` | 当前分组语义 |
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

模板还会保留未预定义的 `colorName`，以颜色名作为标题。Ethereal Style 中显示的自定义名称不会自动替换这些标题；要改导入后的栏目语义，应编辑 `zt-annots.eta.md` 的 `label` 映射。

`zt-annot.eta.md` 会生成类似：

```markdown
[!yellow] Page 3

批注正文
```

它没有自行添加引用符号 `>`；最终渲染效果以 ZotLit 实际插入上下文及当前主题/CSS 为准。`zt-colored.eta.md` 则输出带 `color`、`background-color` 的 `<mark>`，与批注 Callout 是不同用途。

## 修改与验收

| 需求 | 修改位置 |
| --- | --- |
| 改 Zotero 阅读器中的色值 | Ethereal Style 设置 |
| 改分组顺序或语义标题 | `zt-annots.eta.md` |
| 改单条批注格式 | `zt-annot.eta.md` |
| 改内联彩色文本 | `zt-colored.eta.md` |
| 改 Callout 外观 | Obsidian 主题或 CSS snippet |

修改后用一条测试文献创建多种颜色的批注，在 ZotLit 中刷新索引并更新或新建文献笔记，核对 `colorName`、分组标题和正文格式。完整导入流程见 [Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md)，高级代码定制见 [ZotLit 模板自定义](../../05-高级定制/01-ZotLit模板自定义.md)。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Obsidian Web Clipper](05-Web-Clipper.md)
