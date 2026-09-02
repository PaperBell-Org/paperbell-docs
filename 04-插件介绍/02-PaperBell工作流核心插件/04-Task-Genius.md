---
title: Task Genius
slug: plugins/core/task-genius
description: 说明 Task Genius 如何识别 Markdown 任务，并通过项目标签连接 PaperBell 科研项目
status: published
order: 4
---

# Task Genius

Task Genius `9.14.0-beta.5` 负责扫描 Obsidian 中的 Markdown 任务，并在项目、标签、列表、日历、看板、甘特图和表格等视图中统一管理。PaperBell 主要使用它完成两件事：**快速添加任务**，以及**把散落在全库的任务归入科研项目**。

## 安装

**[Task Genius 官方安装与入门](https://taskgenius.md/docs/getting-started)**

**[Task Genius 项目管理说明](https://taskgenius.md/docs/project)**

PaperBell v5.0.1 已启用该插件；也可以在 Obsidian 的“设置 → 第三方插件 → 社区插件市场”中搜索 `Task Genius` 安装。

## PaperBell 的单独配置

下面列出 `data.json` 可确认的配置字段；设置页分组和显示文案可能随 beta 版本变化。



| 设置页 | 界面选项 | PaperBell 当前值 |
| --- | --- | --- |
| **Index & Sources** | **Enable Indexer** | 开启；修改后需要重启 Obsidian |
| **Views** | **Enable Task Genius Views** | 开启 |
| **Projects** | **Enable project features** | 关闭 |
| **Quick Capture** | **Enable quick capture** | 开启 |
| **Beta** | **Enable Base View** | 关闭 |

快速捕获的目标配置为：

```text
目标类型：当天日记
日记目录：30 - Metadata/DailyNote
日记格式：YYYY年MM月DD日
日记模板：00 - Obsidian/模板/每日日记模板
```

此前所写的“任务索引”和“增强型项目识别”是对内部配置字段的中文概括，并不是插件界面中的实际选项名称。界面中的对应名称分别是 **Enable Indexer** 和 **Enable project features**。

关闭 **Enable project features**，意味着 PaperBell 不依赖“任务位于项目文件夹”或“项目主页有某个 YAML 字段”来推断项目归属，而是要求任务明确写出 `#project/<acronym>`。

## 一、Task Genius 怎样识别任务

Task Genius 首先识别标准 Markdown 复选框：

```markdown
- [ ] 未开始
- [/] 进行中
- [x] 已完成
- [-] 已取消
```

如果缺少 `- [ ]` 这一类语法，即使一行文字带有项目标签，也不会被当作任务。

PaperBell 当前状态对应关系为：

| Markdown | Task Genius 状态 |
| --- | --- |
| `[ ]` | 未开始 |
| `[/]` 或 `[>]` | 进行中 |
| `[?]` | 计划中 |
| `[x]` 或 `[X]` | 已完成 |
| `[-]` | 已放弃或取消 |

## 二、Task Genius 怎样识别项目归属

在任务行加入：

```text
#project/<acronym>
```

例如项目主页的 `acronym` 是：

```yaml
acronym: flood-risk
```

那么任务应写为：

```markdown
- [ ] 整理访谈提纲 #project/flood-risk
```

这条任务可以写在：

- `40 - Projects` 中的项目主页；
- 当天日记；
- 会议记录；
- 任意普通 Markdown 笔记。

Task Genius 会按显式项目标签归类，而不要求任务与项目主页位于同一文件。根据 Task Genius 的项目规则，任务级项目标签还会优先于文件级项目判断，因此显式标签也是最稳定、最容易排错的方式。

> [!important] 项目主页的标签不能替代任务行标签
> Project Manager 会给项目主页添加 `project/<acronym>`，但 PaperBell 当前关闭了 Task Genius 的增强型文件级项目识别。为确保每条任务都能正确归类，请继续在任务行写完整项目标签。

## 三、快速添加项目任务

运行 Task Genius 的快速捕获命令，在输入框中填写：

```text
整理研究计划 #project/flood-risk
```

Task Genius 会把它写入当天日记，并生成标准任务。保存后：

快速捕获时应选择任务或复选框模式；如果使用纯文本模式，内容只会被写入日记，不会进入任务索引。

1. 打开 **Task Genius View**；
2. 进入 **Projects**；
3. 选择 `flood-risk`；
4. 检查刚捕获的任务。

如果希望任务进入项目里程碑进度，再补充 `#milestone`：

```text
提交研究方案 #milestone #project/flood-risk
```

普通任务只需要项目标签；不要把所有任务都标成里程碑。

## 四、项目视图为什么可能暂时为空

Task Genius 的项目列表由现有任务的项目元数据生成，不是由 Project Manager 项目主页生成。因此：

- 只有项目主页、没有任何项目任务时，Projects 视图可能没有这个项目；
- 添加第一条 `- [ ] ... #project/<acronym>` 后，项目才会进入任务视图；
- 拼写不同的标签会被视为不同项目，例如 `#project/PaperBell` 与 `#project/paperbell`。

如果任务仍未出现，先运行 Task Genius 的刷新任务索引命令，再检查标签拼写。

## 五、任务视图与 Bases 视图的区别

Task Genius 的主任务视图以**单条任务**为对象，可以跨文件完成、编辑和筛选任务。

此外，Task Genius 的插件代码可为 Obsidian Bases 提供 `task-genius-projects`、`task-genius-gantt`、`task-genius-tags`、`task-genius-calendar`、`task-genius-kanban` 等自定义视图类型，发布包的部分 `.base` 文件也引用了这些类型；但当前 `betaTest.enableBaseView` 为 `false`。因此应把“文件已引用自定义类型”和“当前已启用并成功渲染”分开，不能声称这些 Base 视图现已全部可用。

PaperBell 的 `.base` 文件通常以**Markdown 文件或项目主页**为对象，用来显示项目卡片、项目概览或与项目关联的文件。两者可以同时使用，但不要把 Base 中的一行文件误认为 Task Genius 索引中的一条任务。

## 六、与 Project Manager 的连接规则

两套插件共享同一个项目 ID：

```text
Project Manager 的 acronym
          ↓
项目标签 #project/<acronym>
          ↓
Task Genius 的项目任务
```

对于里程碑，再增加一层：

```markdown
- [ ] 里程碑内容 #milestone #project/<acronym>
```

- Task Genius 通过任务语法识别它，通过项目标签归类它；
- Project Manager 通过 `#milestone` 把它计入项目进度。

完整操作见 [管理科研项目](../../03-详细教程/02-管理科研项目.md)。

## 最小验收

1. 在项目主页写一条 `- [ ] 项目页任务 #project/demo`；
2. 用快速捕获写一条 `日记任务 #project/demo`；
3. 打开 **Projects → demo**；
4. 确认来自两个文件的任务同时出现；
5. 在 Task Genius 中完成其中一条，确认源 Markdown 已改为 `[x]`。

## 常见问题

> [!faq]- 为什么带项目标签的文字没有出现在 Task Genius？
> 项目标签只负责归属，任务本身仍必须是 `- [ ]` 形式的标准 Markdown 复选框。

> [!faq]- 为什么同一个项目出现了两个名称？
> 项目标签区分实际字符串。统一 `acronym` 的大小写、连字符和拼写，并清理旧标签。

> [!faq]- 为什么项目主页里的无标签任务没有自动归入项目？
> PaperBell 当前关闭了增强型文件级项目识别。请在任务行添加 `#project/<acronym>`，不要只依赖文件位置。

> [!faq]- 为什么任务出现在 Task Genius，却没有进入项目里程碑进度？
> 该任务可能只有项目标签。要计入 Project Manager 的进度，还需要 `#milestone`。

---

[返回插件总览](../index.md) · [返回管理科研项目](../../03-详细教程/02-管理科研项目.md) · [下一篇：ZotLit](05-ZotLit.md)
