---
title: 第四部分：插件介绍
description: 按运行位置和工作流职责说明 PaperBell 所用插件的作用、边界、安装与配置
status: draft
order: 4
---

# 第四部分：插件介绍

本部分先回答“每个插件负责什么”，再由各插件页面说明安装、设置、验收和排错方法。

需要连续完成操作时，请按照详细教程的顺序阅读：[管理科研项目](../03-详细教程/02-管理科研项目.md)、[Zotero文献导入 Obsidian](../03-详细教程/03-Zotero文献导入Obsidian.md)、[日常记录](../03-详细教程/04-日常记录.md)、[追踪学者和组织](../03-详细教程/05-追踪学者和组织.md)、[概念卡使用场景](../03-详细教程/06-概念卡使用场景.md)和 [PaperOut To-Authors 使用指南](../03-详细教程/07-PaperOut%20To-Authors%20使用指南.md)。

## 如何理解三个归档目录

三个目录服务于文档导航，不是把插件重新定义成三个互斥的功能等级：

1. **Obsidian 外插件**：按照运行位置归档，包含 Zotero 插件和浏览器扩展；
2. **PaperBell 工作流核心插件**：包含在 Obsidian 中直接承担科研工作流，或为多条工作流提供必要基础的组件；
3. **其他辅助插件**：主要改善展示、导航、中文输入和使用体验，不独立定义科研工作流。

因此，Web Clipper 虽然归档在“Obsidian 外插件”，在功能上仍是学者资料自动采集的核心入口。Templater 和 QuickAdd 虽然提供的是模板与自动化能力，也仍属于工作流核心组件，而不是普通界面辅助插件。

## 一、Obsidian 外插件

### 浏览器扩展

| 插件 | 主要作用 | 对应工作流 | 使用性质 |
| --- | --- | --- | --- |
| [Zotero Connector](01-Obsidian外插件/01-Zotero-Connector.md) | 从出版社、数据库等网页抓取文献元数据及可访问的 PDF，并保存到 Zotero | 文献导入 | 在线采集文献时使用 |
| [Obsidian Web Clipper](01-Obsidian外插件/05-Web-Clipper.md) | 使用 Scholar clipper 模板采集公开学者页面，生成待 Inputs Bell 处理的笔记 | 追踪学者和组织 | 自动采集路径的核心入口；也可改用手动创建 |

### Zotero 插件

| 插件 | 主要作用 | 对应工作流 | 使用性质 |
| --- | --- | --- | --- |
| [Better BibTeX](01-Obsidian外插件/02-Better-BibTeX.md) | 维护稳定的 citation key，并导出 BibTeX/BibLaTeX | 文献导入、论文输出 | 需要稳定引用键或 `.bib` 时使用 |
| [ZotLit Companion](01-Obsidian外插件/03-ZotLit-Companion.md) | 提供 Zotero 端菜单、协议链接和可选的实时通知 | 文献导入 | 按 ZotLit 版本与使用方式启用 |
| [Ethereal Style](01-Obsidian外插件/04-Ethereal-Style.md) | 统一 Zotero PDF 批注颜色及其语义 | 文献阅读与批注 | 可选；不安装也不影响 ZotLit 导入批注 |

## 二、PaperBell 工作流核心插件

| 插件 | 主要作用 | 对应工作流 | 边界 |
| --- | --- | --- | --- |
| [PaperBell 主插件](02-PaperBell工作流核心插件/01-PaperBell.md) | 提供主插件与子插件激活、授权以及共享大模型配置 | 跨工作流 | 不直接代替各子插件处理文献、项目或输出 |
| [Inputs Bell](02-PaperBell工作流核心插件/02-Inputs-Bell.md) | 对进入 Inputs 的笔记执行字段归一化、图片本地化、校对和归位 | 文献导入、追踪学者和组织 | 不负责网页或 Zotero 端采集 |
| [PaperBell Project Manager](02-PaperBell工作流核心插件/03-Project-Manager.md) | 创建和编辑项目主页，维护稳定项目 ID，统计里程碑 | 管理科研项目 | 不替代跨文件任务索引器 |
| [Task Genius](02-PaperBell工作流核心插件/04-Task-Genius.md) | 索引全库 Markdown 任务，并按项目标签汇总和操作任务 | 管理科研项目、日常记录 | 项目元数据仍由 Project Manager 管理 |
| [ZotLit](02-PaperBell工作流核心插件/05-ZotLit.md) | 读取 Zotero 数据，生成或更新 Markdown 文献笔记并导入批注 | 文献导入 | 不负责 Zotero 条目的网页采集与批注配色 |
| [Daily Notes](02-PaperBell工作流核心插件/06-Daily-Notes.md) | 统一日记文件名、目录和模板，作为当天日记的唯一配置来源 | 日常记录 | 是 Obsidian 核心插件，不需要单独下载安装 |
| [Thino](02-PaperBell工作流核心插件/07-Thino.md) | 快速捕获闪念、任务和现场记录，并写回普通 Markdown 日记 | 日常记录 | 不应另建一套与 Daily Notes 冲突的日记配置 |
| [Templater](02-PaperBell工作流核心插件/08-Templater.md) | 执行日期、字段提问、选项菜单和 JavaScript，统一各类笔记结构 | 多条工作流的模板基础 | 停用后已有 Markdown 仍在，但模板自动化会失效 |
| [QuickAdd](02-PaperBell工作流核心插件/09-QuickAdd.md) | 组合模板、输入表单、命令和脚本，提供学者、机构、日记等快捷入口 | 多条工作流的创建入口 | 科研项目创建已改由 Project Manager 负责 |

### 尚待补充独立插件页面

| 插件 | 已确认的作用 | 当前说明入口 |
| --- | --- | --- |
| PaperBell Cards Wrangler | 维护概念卡、概念词表及输入资料与概念之间的映射 | [概念卡使用场景](../03-详细教程/06-概念卡使用场景.md) |
| PaperOut To-Authors | 组织长文项目并通过 Pandoc 导出 PDF 或 Word | [PaperOut To-Authors 使用指南](../03-详细教程/07-PaperOut%20To-Authors%20使用指南.md) |
| PaperBell Section | 属于核心插件；具体输入、输出和工作流位置仍需按实际版本核对 | 待补 |
| Paper Search | 属于核心插件；具体输入、输出和工作流位置仍需按实际版本核对 | 待补 |

在没有完成实际功能核验前，不根据 PaperBell Section 或 Paper Search 的名称猜测其职责。{>>从示例库的配置里可以补上一些确定信息，供你写这两页时参考（都是从 `data.json` 和 `manifest.json` 读出来的，**不是我猜的**，但也不等于我验证过功能）：

**PaperBell Section**（`paperbell-section` 0.2.0）：一个独立的工作区视图，配了 9 个组件——学术概览、今日聚焦、最近文献、研究焦点地图、研究论文、实验数据、科研课题、学术资源、书架。数据源指向 `20 - Inputs/Zotero`（论文文献）和 `20 - Inputs/Books`（书架）。命令只有一条 `Open PaperBell Section`。

**Paper Search**（`papersearch` 0.7.0，**仅桌面端**）：文献检索/阅读/批注，12 条命令（打开面板、复制引文 APA/MLA/Chicago/BibTeX、生成参考文献表、AI 核查论断等），6 种批注角色（观点/方法/引用/质疑/术语/待查）。目录指向 `20 - Inputs/Zotero` 和 `10 - Cards/Concepts`。⚠️ 两个坑要在页面里写明：① 它需要一个本地 Python 后端（`http://127.0.0.1:8000`），而这个后端**没有随示例库分发**；② 配置里的 `conceptCandidateDir: 10 - Cards/Concepts/_候选` 这个目录在示例库里**不存在**。这两条都是读者一打开就会撞上的<<}

## 三、其他辅助插件

这些插件主要改善界面与使用体验。停用后一般不会删除源 Markdown，但相关视图、入口或样式可能不再显示。

| 插件 | 主要辅助作用 |
| --- | --- |
| [Admonition](03-其他辅助插件/01-Admonition插件.md) | 兼容自定义提示框，并为旧模板提供 `flex` 和多栏展示 |
| [Advanced URI](03-其他辅助插件/02-Advanced%20URI插件.md) | 通过 URI 从 Obsidian 内外打开笔记、标题或命令 |
| [Calendar](03-其他辅助插件/03-Calendar插件.md) | 从月历查看、创建和打开日记或周记 |
| [Claudian](03-其他辅助插件/04-Claudian插件.md) | 在 Vault 中使用 AI 代理辅助检查、整理和维护笔记 |
| [Dataview](03-其他辅助插件/05-Dataview插件.md) | 将已有字段、标签和链接展示为动态查询 |
{--| [Dynamic Table of Contents](03-其他辅助插件/06-Dynamic%20Table%20of%20Contents插件.md) | 在正文中生成并自动更新可点击目录 |--}{>>示例库里**没有安装**这个插件（`.obsidian/plugins/` 下没有它，`community-plugins.json` 里也没有）。目录导航的活儿由下一行的 Floating TOC 干了，两者功能重叠。建议连同 `03-其他辅助插件/06-Dynamic Table of Contents插件.md` 整页一起删掉——不过删页我没替你做<<}
| [Floating TOC](03-其他辅助插件/07-Floating%20toc插件.md) | 为长笔记提供不占正文的悬浮标题导航 |
| [Homepage](03-其他辅助插件/08-Homepage插件.md) | 打开指定首页或预设工作区 |
| [Hover Editor](03-其他辅助插件/09-Hover%20Editor插件.md) | 在悬浮预览窗口中直接编辑链接笔记 |
| [Map View](03-其他辅助插件/10-Map%20View插件.md) | 在地图上展示带位置字段的机构、地点或行程笔记 |
| [Minimal Theme Settings](03-其他辅助插件/11-Minimal%20Theme%20Settings插件.md) | 配置 Minimal 主题的配色、字体、行宽和界面功能 |
| [Pixel Banner](03-其他辅助插件/12-Pixel%20Banner插件.md) | 为笔记展示横幅和封面 |
| [Recent Files](03-其他辅助插件/13-Recent%20Files插件.md) | 提供最近打开文件的快捷入口 |
| [Simplified Chinese Word Splitting](03-其他辅助插件/14-Simplified%20Chinese%20Word%20Splitting插件.md) | 改善中文分词、选词和光标移动体验 |
{--| [Soundscapes](03-其他辅助插件/15-Soundscapes插件.md) | 在 Obsidian 中播放环境声或本地音乐 |--}{>>Soundscapes 已经在示例库最新一次提交里被移除了（commit message 就是 "remove Soundscapes plugin and clean up related files"）。你在 02-快速上手/01-开始之前.md:72 把「音乐」从体验增强插件里划掉，方向一致。建议 `03-其他辅助插件/15-Soundscapes插件.md` 整页删除。另外提醒一句：示例库 `paperbell/data.json` 的 `landing.completedSteps.configurePlugins` 里还残留着 `soundscapes` 和 `obsidian-pandoc-reference-list` 两个已经不存在的插件 id，那是**示例库**该清理的，不是手册的问题<<}
| [Style Settings](03-其他辅助插件/16-Style%20Settings插件.md) | 配置主题、插件和 CSS snippets 提供的样式变量 |
{++| Sortable | 让表格和 Bases 视图的表头可以点击排序 |
| Tag Wrangler | 在标签面板里重命名、合并和管理标签 |++}{>>这两个是示例库里**已启用**但手册完全没提的社区插件（`obsidian-sortable` 0.3.1、`tag-wrangler` 0.6.4）。Tag Wrangler 尤其值得写——PaperBell 大量依赖 `#project/<acronym>`、`#milestone`、`#想法` 这些标签，改项目缩写时批量重命名标签正是它的活儿，而 03-详细教程/02-管理科研项目.md 的 FAQ「修改项目 ID 后出现了两个项目怎么办」现在只能让读者手工搜索替换。我只加了表格行，没有建对应的插件页<<}
{>>还有一个 `obsidian42-brat`（BRAT 2.2.0）装在示例库里但**处于禁用状态**。它是用来装 beta 版插件的，7 个 PaperBell 自研插件都走这条路发布。如果发布包是把插件预装好交付给用户，那读者确实不需要 BRAT，现状没问题；但如果有任何一步需要读者自己更新 beta 插件，就得在手册里交代它。这一点要看你们的分发方式，我没法从示例库判断<<}

## 四、按工作流查看组合关系

| 工作流 | 主要组件链路 |
| --- | --- |
| 管理科研项目 | Project Manager → Task Genius |
| 导入文献 | Zotero Connector → Zotero / Better BibTeX / ZotLit Companion → ZotLit → Inputs Bell |
| 日常记录 | Daily Notes → Thino；Templater 和 QuickAdd 提供模板或快捷入口 |
| 追踪学者和组织 | Web Clipper → Inputs Bell；手动路径使用 QuickAdd → Templater |
| 概念卡 | Cards Wrangler；Templater 和 QuickAdd 提供创建入口 |
| 写作与输出 | PaperOut To-Authors → Pandoc；Better BibTeX 提供引用数据 |

## 五、不属于插件分类的组件

- Zotero 桌面端、Pandoc、TeX 和本地检索核心属于外部程序或运行依赖；
- Obsidian 的属性、链接、搜索和 Bases 属于平台能力；
- Markdown、`.base`、JSON、BibTeX、图片和模板是数据文件。

它们可能是某条工作流的必要环节，但不作为第四类插件归档。

---

[返回教程首页](../index.md)
