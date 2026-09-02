---
title: QuickAdd
slug: plugins/core/quickadd
description: 介绍 PaperBell 当前配置的日记、学者、机构、豆瓣与术语命令
status: published
order: 9
---

# QuickAdd

QuickAdd 可以把模板、字段输入、Obsidian 命令和 JavaScript 脚本组合成一个入口。PaperBell 主要用它创建学者和机构，并处理日记、豆瓣资料与术语。旧的学术项目 Choice 目前保持停用，新建科研项目统一改用 Project Manager。

## 安装

**[QuickAdd 官方安装与入门](https://quickadd.obsidian.guide/docs/)**

也可以在 Obsidian 的“设置 → 第三方插件 → 社区插件市场”中搜索 `QuickAdd` 安装。

## 三种常用 Choice

| 类型 | 作用 | PaperBell 中的例子 |
| --- | --- | --- |
| Capture | 把一段内容写入指定文件或当前文件 | 每日总结、智能术语的“添加定义” |
| Template | 根据模板创建新文件 | 学者、机构、图书、电影、术语、项目 |
| Macro | 按顺序组合脚本、Template、Capture 或 Obsidian 命令 | 除“每日总结”外的大部分入口 |

## 当前命令一览

| 命令 | 状态 | 主要用途 | 输出位置 |
| --- | --- | --- | --- |
| `每日总结` | 已启用 | 向当天日记写入一条总结 | `30 - Metadata/DailyNote` |
| `添加学者` | 已启用 | 手动建立学者档案 | `30 - Metadata/Scholars` |
| `添加机构` | 已启用 | 手动建立机构档案 | `30 - Metadata/Institutes` |
| `豆瓣读书` | 已启用 | 根据豆瓣链接建立图书笔记 | `20 - Inputs/Books` |
| `豆瓣电影` | 已启用 | 根据豆瓣链接建立电影笔记 | `20 - Inputs/Movies` |
| `添加术语` | 已启用 | 手动建立概念卡片 | `10 - Cards/Concepts` |
| `智能术语` | 已启用 | 使用 AI 为当前术语补充定义 | 当前文件的“定义”部分 |
| `添加学术项目` | 停用的旧入口 | 不再用于新建项目；请改用 Project Manager | `40 - Projects` |

“已启用”表示该 Choice 已通过闪电按钮暴露为独立命令，可以直接从 Obsidian 命令面板调用。

## 一、每日总结

这是当前唯一直接使用 Capture 的顶层命令：

```yaml
command: 每日总结
target: 30 - Metadata/DailyNote/{{DATE:yyyy年MM月DD日}}.md
create_if_missing: true
template: 00 - Obsidian/模板/每日日记模板.md
insert_after: "## 概览"
format: "- 总结:: {{VALUE}}"
```

运行后输入一句总结。当天日记不存在时，QuickAdd 会先用每日模板创建文件，再把总结插入“概览”部分。

完整的日记创建、Thino 捕获与回顾流程见 [日常记录](../../03-详细教程/04-日常记录.md)。

## 二、添加学者与机构

### 添加学者

```yaml
template: 00 - Obsidian/模板/学者模板.md
filename: "{{name}}"
destination: 30 - Metadata/Scholars
open_after_creation: true
```

Macro 创建文件后还会执行一次“切换编辑/预览视图”。字段输入和正文生成由 Templater 完成。

### 添加机构

```yaml
template: 00 - Obsidian/模板/机构模板.md
filename: "{{name}}"
destination: 30 - Metadata/Institutes
existing_file: do_nothing
```

同名机构存在时不会覆盖原文件。自动匹配 ROR 机构时使用的是 Inputs Bell 与 `机构模板pro.md`，不是这个手动命令。

完整操作见 [追踪学者和组织](../../03-详细教程/05-追踪学者和组织.md)。

## 三、豆瓣读书与豆瓣电影

这两个 Macro 都是“先运行抓取脚本，再把脚本变量交给模板”。

### 豆瓣读书

```yaml
script: 00 - Obsidian/脚本/QuickAdd/bookfromdouban.js
template: 00 - Obsidian/模板/douban_book.md
filename: "{{VALUE:bookname}}"
destination: 20 - Inputs/Books
```

脚本要求输入豆瓣图书网址，提取书名、封面、作者、ISBN、评分、出版社、页数和内容简介等字段。遇到同名文件时会递增文件名，避免覆盖。

### 豆瓣电影

```yaml
script: 00 - Obsidian/脚本/QuickAdd/moviefromdouban.js
template: 00 - Obsidian/模板/douban_movie.md
filename: "{{VALUE:fileName}}"
destination: 20 - Inputs/Movies
```

脚本根据豆瓣电影网址提取片名、海报、导演、类型、评分、片长、年份和剧情简介等字段。同名文件存在时保持原文件不变。

这两个脚本依赖豆瓣网页结构。若突然无法抓取，先检查链接类型和网页是否仍能正常访问，再检查脚本中的解析规则。

## 四、添加术语与智能术语

### 添加术语

```yaml
template: 00 - Obsidian/模板/术语模板-手动.md
destination: 10 - Cards/Concepts
```

> [!note] 文件名从哪来？
> QuickAdd 的 `fileNameFormat` 当前处于关闭状态，因此文件不按预设格式命名，而是由术语模板在提示输入名称后执行 `tp.file.rename` 完成重命名。

模板会再次确认术语名称，并询问别名。生成结果使用统一的概念字段：

```yaml
category: concept
featured: false
tags:
  - concept
```

没有输入名称时，模板会取消创建并删除空白草稿。

### 智能术语

该 Macro 由三步组成：

```text
get_filename.js
→ AI Assistant（询问定义提示词.md）
→ 将结果写入当前文件的“## 定义”部分
```

1. `get_filename.js` 读取当前文件名和最近文件的上下文；
2. AI Assistant 根据 `询问定义提示词.md` 生成不超过 150 字的中文定义；
3. Capture 将结果写成一个 `bot` callout。

当前配置引用 `gpt-4`。使用前需要在 QuickAdd 中配置可用的 AI Provider；模型名称失效时应改为当前账户可用的模型。提示词虽然要求查询互联网，但普通 API 模型不一定具备联网检索能力，生成的定义和来源仍需人工核对。文件上下文会发送给所选模型服务，因此不要在敏感笔记中直接运行。

## 五、添加学术项目

该 Macro 当前存在于设置中，但 `command: false`，所以不会出现在命令面板。其设计步骤是：

```text
项目模板.md 创建项目主页
→ 等待 100 ms
→ Capture 追加项目编号、资助、负责人和状态等元数据
```

基础配置为：

```yaml
template: 00 - Obsidian/模板/项目模板.md
filename: "{{name}}"
destination: 40 - Projects
```

`项目模板.md` 本身已经包含完整 frontmatter。不要重新启用该 Macro，也不要通过在 `40 - Projects` 直接新建文件来绕过项目管理入口；新项目统一使用 Project Manager 创建，以便由它维护项目主页、稳定 ID 与项目字段。

## 与 Templater、Inputs Bell 的边界

- QuickAdd 决定**运行哪个入口、文件叫什么、使用哪个模板以及输出到哪里**；
- Templater 执行模板中的动态提问与 JavaScript；
- Inputs Bell 负责监视 `20 - Inputs` 中的新笔记并进行后处理。

因此：

- 文件创建成功但模板指令没有执行，应检查 Templater；
- 豆瓣笔记创建后没有图片本地化或归类异常，应检查 Inputs Bell；
- 命令面板里找不到某个入口，应检查 QuickAdd Choice 的闪电按钮是否开启。

## 最小验收

不必一次测试所有命令。每类选择一个代表即可：

- `每日总结` 能写入当天日记的“概览”；
- `添加学者` 能进入 `30 - Metadata/Scholars` 且没有模板指令残留；
- `豆瓣读书` 能根据有效链接创建图书笔记；
- `添加术语` 能创建统一字段的概念卡片；
- `智能术语` 只在已配置可信 AI Provider 后测试；
- `添加学术项目` 保持停用；项目创建改按 [管理科研项目](../../03-详细教程/02-管理科研项目.md) 操作。

---

[返回插件总览](../index.md) · [返回追踪学者和组织](../../03-详细教程/05-追踪学者和组织.md) · [下一篇：Cards Wrangler](10-Cards-Wrangler.md)
