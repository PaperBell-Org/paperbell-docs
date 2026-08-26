---
title: Calendar
description: 介绍 Calendar 的日历入口及其与 PaperBell 日记和周记流程的配合
status: published
order: 3
---

# Calendar

**【开源链接】**
<https://github.com/liamcain/obsidian-calendar-plugin>

**【简介】**
这个插件会在侧边显示一个月历，点某一天就能直接打开或新建那天的"日记"，还支持点击周数来管理"周记"。哪天写过笔记，日历上会有小标记，一眼就能看出自己哪天记了、哪天空着。

**【使用方法】**
1. 启用后，侧边会浮出一个月历。
2. 点任意一天，就会按预设模板打开（或自动新建）那天的日记，本库存放在 `30 - Metadata/DailyNote`，命名格式为"YYYY年MM月DD日"。
3. 点左侧的周数，则会打开对应的周记，周记按照 `00 - Obsidian/模板/每周周记模板.md`创建并存进 `30 - Metadata/WeeklyNote`文件夹（该文件夹用户可自行创建）中，文件名为`YYYY年第WW周记录`（例如 `2026年第30周记录`）。
4. 有笔记的日期会带标记，新建的日记还会自动带上"前一天 / 后一天"和"本周记录"的链接。所以你不用记笔记该叫什么名、放在哪，点日历就全帮你安排好了。

**【和 PaperBell 的联动】**
PaperBell 库用日记/周记来记录日常的处理进度和思考，这些笔记统一放在 `30 - Metadata` 下。Calendar 就是这些日记的可视化入口------不用手动去文件夹里翻，点日历就能开当天的记录，让"每天记一点"这件事变得顺手，也方便日后按时间线回溯自己的工作节奏。

---

[上一篇：Advanced URI](02-Advanced%20URI插件.md) · [返回插件总览](../index.md) · [下一篇：Claudian](04-Claudian插件.md)
