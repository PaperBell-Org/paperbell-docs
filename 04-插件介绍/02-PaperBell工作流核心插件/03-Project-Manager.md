---
title: PaperBell Project Manager
description: 使用 Project Manager 创建科研项目、维护稳定项目 ID，并统计项目里程碑
status: published
order: 3
---

# PaperBell Project Manager

PaperBell Project Manager `0.3.2` 是 `40 - Projects` 的项目入口。它负责创建和编辑项目主页、维护项目标签，以及在 Bases 项目卡片中显示项目阶段和里程碑进度。

它不替代任务管理器：项目的创建和元数据由 Project Manager 负责，跨文件任务的索引与操作由 Task Genius 负责。

## 安装

**[PaperBell Project Manager 项目仓库](https://github.com/SongshGeo/PaperBell-Project-Manager)**

PaperBell 已包含并启用该插件。打开“设置 → 第三方插件”，确认 **PaperBell Project Manager** 已启用即可。手动安装或更新时，以仓库发布页和说明为准。

PaperBell 的 `40 - Projects/00. 项目列表.base` 使用 `paperbell-project-cards` 自定义 Base 视图渲染项目卡片；这不是普通 table 视图。Task Genius 也为 Base 注册了甘特图等自定义视图。自定义视图由对应插件提供：插件停用时 `.base` 文件仍在，但相关视图无法按原方式渲染。



## PaperBell 的单独配置

教程不重复介绍默认选项，只需确认以下 PaperBell 路径和标识：

```text
项目卡片点击目标：Task Genius
阶段升级前确认：开启

项目根目录：40 - Projects
输出根目录：50 - Outputs
资助目录：30 - Metadata/Grants
项目模板：00 - Obsidian/模板/项目模板.md

项目索引标签：project/index
项目标签前缀：project/
里程碑标签：milestone
项目 ID 字段：acronym
项目字段：project

完成状态：xX
取消状态：-
```

## 一、新建科研项目

打开命令面板，运行：

**PaperBell Project Manager: 新建科研项目**

填写显示名、`acronym`、项目阶段、起止时间等信息后，插件会创建：

```text
40 - Projects/
└── 项目显示名/
    └── 项目显示名.md
```

项目主页会自动带上：

```yaml
tags:
  - project/index
  - project/<acronym>
acronym: <acronym>
```

其中，`project/index` 用来进入项目列表，`project/<acronym>` 用来连接项目相关笔记和任务。

`acronym` 应唯一且长期稳定，**要以字母开头，只使用字母、数字、连字符或下划线** 。

## 二、项目模板的作用

插件从以下文件读取项目主页正文结构：

```text
00 - Obsidian/模板/项目模板.md
```

模板提供参与者、里程碑、资助、交付物、相关材料和导航等区块；项目的核心 YAML 则由 Project Manager 创建。不要为每个项目复制并维护另一套模板。

插件不会自动生成 `cover.jpg`。创建完成后，需要自己把封面图片放入刚生成的项目文件夹，并确保实际图片名称、扩展名与 `banner` 中的路径完全一致。例如 `banner` 是 `40 - Projects/demo/cover.jpg`，图片就必须保存为同一路径下的 `cover.jpg`；如果改用其他文件名，也要同步修改 `banner`。

## 三、里程碑怎样计入进度

Project Manager 只统计同时满足以下条件的任务：

1. 是标准 Markdown 任务；
2. 带 `#milestone`；
3. 带正确的 `#project/<acronym>`。

例如：

```markdown
- [ ] 提交研究方案 #milestone #project/flood-risk
- [/] 完成数据收集 #milestone #project/flood-risk
- [x] 冻结分析脚本 #milestone #project/flood-risk
- [-] 取消补充访谈 #milestone #project/flood-risk
```

进度规则是：

```text
完成率 = [x]/[X] 的里程碑数 ÷（全部里程碑数 - [-] 取消数）
```

`#milestone` 决定是否进入项目进度；`#project/<acronym>` 决定任务属于哪个项目。两个标签不能互相替代。

## 四、编辑项目（条件命令）

“编辑项目”不是始终显示的常驻命令。必须先打开一个已经被 Project Manager 识别的项目主页，再打开命令面板，才会出现：

**PaperBell Project Manager: 编辑项目**

当前文件需要同时满足：

1. 位于设置中的项目根目录 `40 - Projects`；
2. YAML 的 `tags` 中包含 `project/index`。

如果当前打开的是日记、普通笔记或尚未被识别的项目文件，命令面板里不会显示这个选项。

尤其不要只在 YAML 中改 `acronym`。项目 ID 可能已经被以下内容引用：

- 项目主页标签；
- 日记和会议记录中的任务；
- 项目相关笔记；
- PaperOut 输出的 `project` 字段。

修改后应检查插件给出的重新标记结果，并搜索旧的 `#project/<acronym>`，避免同一项目被拆成两个 ID。

旧项目仍同时使用 `status` 和 `phase` 时，先备份，再运行：

**PaperBell Project Manager: 迁移项目 schema（status + phase → stage）**

## 五、与 Task Genius 的分工

| Project Manager | Task Genius |
| --- | --- |
| 建立项目主页 | 索引 Markdown 任务 |
| 维护 `acronym` 与项目标签 | 按 `#project/<acronym>` 汇总任务 |
| 统计 `#milestone` 进度 | 在列表、看板、日历等视图处理任务 |
| 展示项目级信息 | 更新任务状态并回写源文件 |

完整的端到端操作见 [管理科研项目](../../03-详细教程/02-管理科研项目.md)。

## 最小验收

1. 运行“新建科研项目”，创建 `demo` 项目；
2. 确认文件位于 `40 - Projects/demo/demo.md` 或对应显示名目录；
3. 确认 YAML 同时包含 `project/index`、`project/demo` 和 `acronym: demo`；
4. 添加一条 `#milestone #project/demo` 任务；
5. 完成任务后，确认项目卡片进度发生变化。

## 常见问题

> [!faq]- 项目没有出现在项目列表里怎么办？
> 检查项目主页是否位于 `40 - Projects`，并且 YAML 中存在 `project/index`。

> [!faq]- 里程碑已经完成，为什么进度没有变化？
> 检查任务是否带 `#milestone`，完成状态是否为 `[x]` 或 `[X]`，项目标签是否与 `acronym` 完全一致。

> [!faq]- 项目卡片打开的为什么是 Task Genius？
> PaperBell 把项目卡片点击目标设为 Task Genius，便于直接查看和处理该项目的任务；项目主页仍保存在 `40 - Projects`。

---

[返回插件总览](../index.md) · [返回管理科研项目](../../03-详细教程/02-管理科研项目.md) · [下一篇：Task Genius](04-Task-Genius.md)
