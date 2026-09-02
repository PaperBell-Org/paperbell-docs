---
title: Dataview
slug: plugins/extra/dataview
description: 介绍 Dataview 的动态查询能力及其与 PaperBell 结构化属性的配合
status: published
order: 5
---

# Dataview

**【开源链接】**
<https://github.com/blacksmithgu/obsidian-dataview>

**【简介】**
Dataview 是一个能把你散落在各篇笔记里的信息自动汇总成表格、列表的插件。它会读取每篇笔记的属性（比如标题、日期、作者、状态），然后按你写的查询条件，实时生成一份动态清单，笔记一变动，清单自动更新。

**【使用方法】**
1. 确认笔记有属性。打开一篇笔记，最上方由两行 `---` 夹起来的区域就是属性区（也叫 YAML 区）------开头一行 `---`、结尾一行 `---`，中间那些 `所属机构`、`研究方向` 等字段。（提示：如果笔记开头没有这两行 `---`，说明它还没有属性，Dataview 就抓不到它。）
2. 新建一篇笔记当"汇总页"，插入一个代码块：先打三个反引号，第一行写 `dataview`，接着写查询语句。比如想按机构列出学者，就写 `LIST FROM "学者文件夹" WHERE 所属机构 = "北大"`。
3. 切换到阅读模式，清单就自动生成了。以后每新增一篇符合条件的笔记，它会自己更新。

**【和 PaperBell 的联动】**
PaperBell 生成的笔记（比如学者、机构）本身就带着规整的属性字段，正好是 Dataview 最爱吃的"数据"。PaperBell 的强项是批量生产结构化笔记，但笔记一多就容易乱，Dataview 就是那个帮你自动做索引和统计的工具，比如自动生成"某领域全部学者名录""近期新增机构一览"，让散落的笔记随时能被一键归拢查看。

---

[上一篇：Claudian](04-Claudian插件.md) · [返回插件总览](../index.md) · [下一篇：Floating TOC](06-Floating%20toc插件.md)
