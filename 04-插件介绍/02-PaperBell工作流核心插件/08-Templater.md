---
title: Templater
description: 介绍 PaperBell 当前启用的文件夹规则，以及日记、术语、项目、学者、机构和输出模板
status: draft
order: 8
---

# Templater

Templater 负责执行模板中的日期、字段提问、选项菜单和 JavaScript。PaperBell 用它统一日记、概念卡片、项目、学者、机构和输出笔记的结构。

## 安装

**[Templater 官方仓库与安装说明](https://github.com/SilentVoid13/Templater)**

也可以在 Obsidian 的“设置 → 第三方插件 → 社区插件市场”中搜索 `Templater` 安装。

## PaperBell 的特殊设置

这里只列出当前库单独配置的部分：

```yaml
Template folder location: 00 - Obsidian/模板
Trigger Templater on new file creation: true
Template matching mode: Folder templates
```

当前没有单独设置 Template hotkey、Startup template 或 Templater 用户脚本目录。日常使用主要依靠文件夹规则，以及 QuickAdd 对模板的调用。

## 文件夹模板规则

| 新文件位置 | 自动使用的模板 | 用途 |
| --- | --- | --- |
| `10 - Cards` | `术语模板-手动.md` | 创建术语或概念卡片 |
| `30 - Metadata/DailyNote` | `每日日记模板.md` | 创建每日笔记 |
| `40 - Projects` | `项目模板.md` | 创建项目主页 |
| `30 - Metadata/Scholars` | `学者模板.md` | 创建学者档案 |
| `50 - Outputs/Drafts` | `输出笔记模板.md` | 创建普通学术输出草稿 |

文件夹规则对其子文件夹同样有效。例如 `10 - Cards/Concepts` 会继承 `10 - Cards` 的术语模板。若以后增加更深层的规则，Templater 会优先采用路径更具体的那一条。

## 一、每日日记模板

模板：`00 - Obsidian/模板/每日日记模板.md`

自动用于 `30 - Metadata/DailyNote`，主要生成：

- `date`、`week` 与 `tags: DailyNote`；
- 前一天、后一天和本周记录的导航；
- “概览”“日程”等固定区域；
- 适配中文日期文件名，同时避免强制重命名文件。

QuickAdd 的 `每日总结` 命令也依赖这个模板：当天文件不存在时先创建日记，再把总结写入“概览”。

## 二、术语模板

模板：`00 - Obsidian/模板/术语模板-手动.md`

自动用于 `10 - Cards`，也由 QuickAdd 的 `添加术语` 调用。模板会：

1. 要求输入术语名称；
2. 用该名称重命名文件；
3. 将中英文别名拆成 YAML 列表；
4. 写入统一的概念字段：

```yaml
category: concept
featured: false
tags:
  - concept
```

名称为空或重命名失败时，模板会删除草稿，避免留下无效卡片。

## 三、项目模板

模板：`00 - Obsidian/模板/项目模板.md`

自动用于 `40 - Projects`。创建时会询问或生成：

- 项目类型、阶段、职责和优先级；
- 开始日期、每周工作量、负责人和参与者；
- 唯一项目缩写与项目全称；
- 关联项目、关键词与核心概念；
- 项目简介、封面和状态字段。

正文已经嵌入项目所需的 Base：

```text
项目素材反查.base
项目资助.base
项目交付物.base
项目检索.base
```

项目缩写是必填项。未填写时模板会取消创建并删除草稿。

QuickAdd 中还保留一个未启用的 `添加学术项目` Macro。由于项目模板已经包含完整 frontmatter，重新启用该 Macro 前应检查它额外追加的元数据是否会形成第二段 YAML。

## 四、学者模板

模板：`00 - Obsidian/模板/学者模板.md`

自动用于 `30 - Metadata/Scholars`，也由 QuickAdd 的 `添加学者` 调用。它会生成：

- `name` 与 `aliases`；
- `gender`、`birthday`、`email` 与 `title`；
- `website` 与 `photo`；
- `institute` 与 `keywords`；
- `tags: scholar` 与 `following_date`；
- `论文检索.base` 嵌入。

其中 `aliases` 用于匹配 Zotero 文献中的作者写法，`institute` 用于关联机构档案。这两个字段应重点核对。

## 五、机构模板

模板：`00 - Obsidian/模板/机构模板.md`

该模板没有单独绑定文件夹规则，而是由 QuickAdd 的 `添加机构` 调用。它会询问：

- 机构简称与别名；
- 官网；
- 经纬度；
- Logo 路径。

生成的正文包含地图区域和 `学者检索.base`，用于反向显示所属学者。

不要把它与下面的自动模板混淆：

| 模板 | 执行者 | 用途 |
| --- | --- | --- |
| `机构模板.md` | Templater + QuickAdd | 手动创建机构 |
| `机构模板pro.md` | Inputs Bell | 根据 ROR 数据自动创建机构 |

`机构模板pro.md` 使用的是 `ppb.institute` 占位符，不是 Templater 指令。

## 六、输出笔记模板

模板：`00 - Obsidian/模板/输出笔记模板.md`

自动用于 `50 - Outputs/Drafts`。创建时会：

- 从“引言、方法、结果、讨论”中选择内容类别；
- 写入创建日期和 `output` 标签；
- 询问这篇输出围绕哪些核心概念；
- 根据类别选择 Banner；
- 将 `longform` 设为 `false`。

它适合普通输出草稿，而不是完整的长篇学术文档。

## 七、学术长文本模板

模板：`00 - Obsidian/模板/学术长文本模板 Longform academic template.md`

该模板包含 Templater 指令，但当前没有绑定文件夹规则，也没有 QuickAdd 命令。需要时应手动插入，或以后单独建立 QuickAdd 入口。

它与普通输出模板的主要区别是：

```yaml
longform: true
status: not-started
tags:
  - output
  - project/<项目名>
```

它还会记录 `scene_alias`，适合配合长文写作工具管理章节或场景。

## 同一目录中不属于 Templater 的文件

`00 - Obsidian/模板` 是 PaperBell 的共享模板目录，并非其中所有文件都由 Templater 执行：

| 文件 | 实际执行者或用途 |
| --- | --- |
| `douban_book.md`、`douban_movie.md` | QuickAdd 模板 |
| `询问定义提示词.md` | QuickAdd AI Assistant 提示词 |
| `zotlit-*.liquid.md` | ZotLit Liquid 模板 |
| `机构模板pro.md` | Inputs Bell 机构模板 |
| `每周周记模板.md` | 使用周记日期占位符，不是当前 Templater 文件夹模板 |
| `*.base` | Obsidian Bases 查询和视图 |
| `custom-reference.docx` | Pandoc/Word 参考文档，不是 Markdown 模板 |

区分执行者很重要：修改模板后没有生效时，应先确认究竟是 Templater、QuickAdd、Inputs Bell 还是 ZotLit 在读取它。

## 使用时的注意事项

1. 不确定的字段可以留空，不要为了填满而写入猜测信息。
2. 新建文件时没有弹出提问，先检查文件是否位于某条 Folder template 规则覆盖的目录。
3. 文件中残留 Templater 指令时，检查“新文件创建时触发”是否开启，以及模板是否来自可信来源。
4. 模板可以执行 JavaScript，只使用自己检查过且信任的文件。
5. 调整文件夹结构后，要同步修改 Folder template 规则和 QuickAdd 的输出目录。

## 最小验收

分别创建几类测试文件并确认：

- 在 `30 - Metadata/DailyNote` 新建文件会生成日记结构；
- 在 `10 - Cards/Concepts` 新建文件会启动术语提问；
- 在 `40 - Projects` 新建文件会启动项目设置；
- 执行 `QuickAdd: 添加学者` 后不会残留 Templater 指令；
- 执行 `QuickAdd: 添加机构` 后能生成地图与关联学者区域；
- 在 `50 - Outputs/Drafts` 新建文件会要求选择输出类别。

---

[返回插件总览](../index.md) · [返回追踪学者和组织](../../03-详细教程/05-追踪学者和组织.md) · [下一篇：QuickAdd](09-QuickAdd.md)
