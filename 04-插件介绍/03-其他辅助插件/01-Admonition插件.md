---
title: Admonition
description: 介绍 Admonition 的提示块、自定义类型及其在 PaperBell 旧模板中的展示职责
status: published
order: 1
---

# Admonition

**【开源链接】**
<https://github.com/ebullient/obsidian-admonition>

**【官方文档】**
<https://github.com/ebullient/obsidian-admonition/tree/main/docs>

**【简介】**
Admonition 用来创建和管理醒目的提示块，例如说明、技巧、警告、示例和可折叠内容。它既支持 Obsidian 原生 Callout 写法，也支持功能更多的 `ad-类型` 代码块写法；还可以为自定义类型指定标题、颜色、图标、折叠方式和复制按钮。

PaperBell 现在主要把它用于**兼容旧模板和实现特殊布局**。普通说明文字优先使用 Obsidian 原生 Callout；只有需要 `flex`、多栏布局或 Admonition 特有参数时，才需要使用插件语法。

**【PaperBell 当前自定义类型】**

当前库已经定义：

| 类型 | 当前设置 | 用途说明 |
| --- | --- | --- |
| `flex` | 无标题、灰色 | 学者模板中用于并排展示基本信息与照片；当前实际模板依赖它 |
| `col2` | 无标题、灰色 | 两栏布局容器 |
| `col3` | 无标题、灰色 | 三栏布局容器 |
| `translation` | 标题“翻译”、青绿色、语言图标 | 用于区分翻译内容 |
| `exp` | 无标题、灰色、感叹号图标 | 已配置的自定义展示类型，使用前应先检查具体模板需求 |
| `bot` | 标题“Bot”、红色、机器人图标、复制按钮 | 用于需要明显区分并方便复制的自动生成内容 |

其中 `flex`、`col2`、`col3` 的排版还依赖已启用的 CSS snippets，尤其是：

```text
【分栏支持】admonition-col2-col3-flex.css
【AD优化】admonitions.css
```

只保留插件类型而关闭分栏 snippet，或者只保留 snippet 而删除对应类型，都可能让布局失效。修改前应同时备份 Admonition 的自定义类型和相关 CSS。

**【和 PaperBell 的联动】**

Admonition 不负责项目、文献、概念或任务数据，也不会替代 PaperBell 的工作流插件。它主要负责展示层：让教程中的提示更醒目，并为部分旧模板提供 `flex` 和多栏排版。

当前 `00 - Obsidian/模板/学者模板.md` 使用了 `ad-flex`。如果停用插件、删除 `flex`，或关闭相关分栏 snippet，学者的属性数据仍然保存在 Markdown 中，但“基本信息 + 照片”的布局可能显示为普通代码块或失去分栏效果。因此：

1. 新写的普通提示优先使用原生 Callout；
2. 不要在没有检查模板引用的情况下删除 `flex`、`col2` 或 `col3`；
3. 调整布局时先复制一份学者模板和测试档案；
4. 确认桌面端、移动端、亮色与暗色模式都能正常阅读后，再应用到正式模板。

---

[返回插件总览](../index.md) · [下一篇：Advanced URI](02-Advanced%20URI插件.md)
