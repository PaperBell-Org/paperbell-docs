---
title: Daily Notes 日记模块
slug: plugins/core/daily-notes
description: 配置 Obsidian 核心 Daily Notes，统一 PaperBell 日记的目录、日期格式与模板
status: published
order: 6
---

# Daily Notes 日记模块

Daily Notes 是 Obsidian 的核心插件。它根据当天日期打开日记；如果文件不存在，就按照指定目录、日期格式和模板创建。PaperBell 把它作为所有日记入口的唯一配置来源。

## 启用与说明

**[Obsidian 官方 Daily Notes 文档](https://obsidian.md/help/Plugins/Daily%2Bnotes)**

无需另外下载安装。进入“设置 → 核心插件”，开启 **Daily notes**，然后在插件选项中完成配置。

## PaperBell 的单独配置

```text
Date format: YYYY年MM月DD日
New file location: 30 - Metadata/DailyNote
Template file location: 00 - Obsidian/模板/每日日记模板.md
```

三个设置必须同时保持一致：

- 日期格式决定文件名；
- New file location 决定日记目录；
- Template file location 决定新日记的字段和正文结构。

## 一、打开或创建当天日记

运行：

**Daily notes: Open today's daily note**

预期结果：

```text
30 - Metadata/DailyNote/YYYY年MM月DD日.md
```

同一天重复运行只会打开同一文件，不应创建第二份日记。

如果启用了 **Calendar** 插件，也可以在侧边栏日历中点击日期来打开或创建对应日记。当前 Calendar 设置会在创建新日记前要求确认；确认后仍然使用 Daily Notes 的文件名、目录和模板。Calendar 是日期入口，不是另一套日记系统。

## 二、日记模板

PaperBell 使用：

```text
00 - Obsidian/模板/每日日记模板.md
```

模板生成：

```yaml
---
date: YYYY-MM-DD
tags: DailyNote
week: YYYY-WW
---
```

正文固定保留：

```markdown
## 概览

## 日程
```

其中：

- `## 概览` 接收 QuickAdd 的“每日总结”；
- `## 日程` 接收 Thino 的闪念和任务；
- `date` 用于按机器日期检索；
- `week` 用于连接周记录。

模板中包含 Templater 语法，用于计算前一天、后一天和周记录链接。Templater 已为 `30 - Metadata/DailyNote` 配置文件夹模板，因此新建后不应留下未执行的 `<% ... %>` 代码。

## 三、不要随意修改文件名

文件名 `YYYY年MM月DD日` 是多个组件之间的契约：

- Daily Notes 用它定位当天文件；
- 模板用它计算前后日期；
- QuickAdd 用它寻找每日总结目标；
- Thino 用它确定当天写入位置。

如果手动改名，可能出现前后日链接错误、同一天重复建文件或内容写入另一份日记。

## 四、与其他组件的关系

| 组件 | 如何使用当天日记 |
| --- | --- |
| **[Thino](07-Thino.md)** | 把 List 或 Task 写入 `## 日程` |
| **[QuickAdd](09-QuickAdd.md)** | 把 `- 总结::` 写入 `## 概览` |
| **[Templater](08-Templater.md)** | 生成日期属性和导航链接 |
| **[Task Genius](04-Task-Genius.md)** | 索引日记中的 `- [ ]` 任务 |
| **[Project Manager](03-Project-Manager.md)** | 通过 `#project/<acronym>` 关联项目记录 |

Daily Notes 只负责文件的创建和定位，不负责闪念搜索、任务管理或项目归类。

## 五、最小验收

1. 暂时关闭当天日记；
2. 运行“Open today's daily note”；
3. 确认文件进入 `30 - Metadata/DailyNote`；
4. 确认文件名符合 `YYYY年MM月DD日`；
5. 确认 YAML 和两个固定标题存在；
6. 确认没有残留 Templater 代码；
7. 用 Thino 写入测试词，确认仍然落入同一文件。

## 常见问题

> [!faq]- 为什么新日记是空白文件？
> 检查 Template file location 是否指向 `00 - Obsidian/模板/每日日记模板.md`。

> [!faq]- 为什么模板代码原样留在日记中？
> 检查 Templater 是否启用，以及 `30 - Metadata/DailyNote` 的文件夹模板配置是否仍然存在。

> [!faq]- 为什么同一天出现两份日记？
> 检查 Daily Notes、Thino 和 QuickAdd 是否使用完全相同的目录与日期格式，并确认 Thino 没有启用独立日记设置。

> [!faq]- 为什么 Thino 找不到“日程”？
> 模板中必须存在精确标题 `## 日程`，Thino 的 `Insert after heading` 也必须使用相同文字。

---

[返回插件总览](../index.md) · [返回日常记录](../../03-详细教程/04-日常记录.md) · [下一篇：Thino](07-Thino.md)
