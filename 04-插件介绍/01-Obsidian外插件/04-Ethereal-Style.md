---
title: Ethereal Style
description: 在 Zotero 中配置批注颜色语义，并与 ZotLit Liquid 模板建立稳定的颜色映射
status: draft
order: 4
---

# Ethereal Style

## 定位

Ethereal Style 是安装在 **Zotero** 中的界面与阅读增强插件。本工作流主要使用它来统一 PDF 批注的颜色和含义；它不是 Obsidian 插件，也不负责把批注导入 Obsidian。

在这套配置中，它属于**可选的配色层**：即使不安装，ZotLit 仍能导入 Zotero 批注；安装后则更容易让团队或个人长期使用同一套颜色语义。

- **[Ethereal Style 官方仓库](https://github.com/MuiseDestiny/zotero-style)**
- [Ethereal Style 中文使用文档](https://zotero-chinese.github.io/user-guide/plugins/style)

PaperBell 当前本地实测版本为 `6.0.8`。该版本号只记录测试环境，不代表永久的最新版本。

## 它如何与 ZotLit 模板配合

完整链路如下：

```text
Ethereal Style 设置 Zotero 批注颜色
        ↓
Zotero 在批注数据中保存十六进制颜色值
        ↓
ZotLit 将受支持的颜色值转换成 colorName
        ↓
zotlit-content.liquid.md 按 colorName 分组并生成中文标题
        ↓
zotlit-annotation.liquid.md 将单条批注渲染为 [!colorName] Callout
        ↓
Obsidian 主题或 CSS 决定 Callout 的最终外观
```

因此，颜色分组并不只由 `zotlit-annotation.liquid.md` 完成：

- `00 - Obsidian/模板/zotlit-content.liquid.md`：负责排序、分组和中文栏目名；
- `00 - Obsidian/模板/zotlit-annotation.liquid.md`：负责渲染每一条批注，并把 `colorName` 写入 Callout 类型。

## 当前颜色语义

当前 Liquid 模板先按照颜色名称进行分组。后续确定正式的阅读语义后，再统一修改栏目名称：

| Zotero 颜色 | 十六进制值     | ZotLit `colorName` | 导入后的栏目 |
| --------- | --------- | ------------------ | ------ |
| 黄色        | `#ffd400` | `yellow`           | 黄色     |
| 红色        | `#ff6666` | `red`              | 红色     |
| 绿色        | `#5fb236` | `green`            | 绿色     |
| 蓝色        | `#2ea8e5` | `blue`             | 蓝色     |
| 紫色        | `#a28ae5` | `purple`           | 紫色     |
| 洋红色       | `#e56eee` | `magenta`          | 洋红色    |
| 橙色        | `#f19837` | `orange`           | 橙色     |
| 灰色        | `#aaaaaa` | `gray`             | 灰色     |

对应的 Liquid 逻辑位于 `zotlit-content.liquid.md`。原来的 `<% ... %>` JavaScript/Eta 代码不能直接放进 ZotLit v2 的 `.liquid.md` 模板，因此必须改写为 Liquid 语法。

## 关键限制

### 1. ZotLit 识别的是颜色值，不是 Ethereal Style 中显示的名称

Ethereal Style 中为颜色填写的中文名称不会直接传给 ZotLit。ZotLit 根据批注的十六进制颜色值生成 `colorName`，然后由 Liquid 模板把 `colorName` 转换为“黄色”“蓝色”等栏目名。

如果将 Ethereal Style 改成 ZotLit 不认识的自定义色值，`colorName` 可能为空，批注就会落入未识别颜色分组。因此，本教程建议保留上表中的八个标准色值，只修改它们的语义名称。

### 2. 分组成功不等于 Callout 一定显示对应颜色

当前单条批注模板会生成类似下面的标记：

```markdown
> [!yellow] Page 3
> 批注正文
```

Obsidian 是否把 `yellow`、`red` 等自定义 Callout 类型显示为对应颜色，还取决于主题或 CSS snippet。没有相应样式时，内容与分组仍然正确，但外观可能回退为默认 Callout。具体机制可参考 [Obsidian Callouts 官方说明](https://obsidian.md/help/callouts)。

## 修改颜色语义时应改哪里

| 需求 | 修改位置 |
| --- | --- |
| 改 Zotero 阅读器中的颜色或颜色名称 | Ethereal Style 设置 |
| 改导入 Obsidian 后的分组顺序或栏目名称 | `zotlit-content.liquid.md` |
| 改每条批注的页码、正文、评论和标签格式 | `zotlit-annotation.liquid.md` |
| 改 Callout 在 Obsidian 中的实际颜色与图标 | Obsidian CSS snippet 或主题 |

修改后，先在 ZotLit 中执行 `Refresh index`，再创建一篇测试笔记，确认八种颜色分别进入预期栏目。不要直接用正式笔记作为第一次模板测试。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Obsidian Web Clipper](05-Web-Clipper.md)
