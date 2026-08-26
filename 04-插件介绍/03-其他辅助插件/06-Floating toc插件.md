---
title: Floating TOC
description: 介绍 Floating TOC 的长文档浮动目录与标题跳转功能
status: published
order: 6
---

# Floating TOC

**【开源链接】**
<https://github.com/cumany/obsidian-floating-toc-plugin>

**【简介】**
这个插件会在笔记侧边浮出目录，把当前文章的各级标题列成可点击导航。它不向正文写入目录，适合平时阅读和编辑长笔记。

**【使用方法】**
1. 装好并启用后，打开任意一篇**有标题**的笔记（标题就是用 `#`、`##` 这样写出来的那种），侧边就会自动浮出目录，不需要在正文里写任何代码。
2. 鼠标移到目录上会展开完整标题列表，点其中任意一条，正文就跳到那一节。
3. 目录顶部有几个小图标，可以固定（让它常驻不收起）、搜索标题、一键展开/折叠全部层级。
4. 如果某篇笔记没标题，它就不显示------这是正常的，因为没有标题就无从生成目录。

**【和 PaperBell 的联动】**
PaperBell 库中章节多、层级深的长笔记容易在滚动时迷失位置。Floating TOC 不改动正文，即可展示文章骨架并跳到任意章节。

---

[上一篇：Dataview](05-Dataview插件.md) · [返回插件总览](../index.md) · [下一篇：Homepage](07-Homepage插件.md)
