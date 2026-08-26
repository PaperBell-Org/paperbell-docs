---
title: 第四部分：插件介绍
description: 按运行位置、启用状态和工作流职责说明 PaperBell v5.0.1 所用插件
status: published
order: 4
---

# 第四部分：插件介绍

本部分说明每个组件负责什么、当前是否随包启用，以及它与相邻工具的边界。连续操作请转到[详细教程](../03-详细教程/index.md)。

## 状态口径

- **已启用**：插件 ID 出现在 v5.0.1 的 `.obsidian/community-plugins.json`；
- **已安装主题**：主题目录存在；只有 `appearance.json` 的 `cssTheme` 才表示当前活动主题；
- Zotero 插件和浏览器扩展不由 Obsidian 的启用列表判断，应在各自宿主中核对。

## 一、Obsidian 外插件

| 插件 | 运行位置 | 主要作用 |
| --- | --- | --- |
| [Zotero Connector](01-Obsidian外插件/01-Zotero-Connector.md) | 浏览器 | 抓取文献元数据与可访问 PDF |
| [Obsidian Web Clipper](01-Obsidian外插件/05-Web-Clipper.md) | 浏览器 | 用 Scholar 模板采集公开学者页面 |
| [Better BibTeX](01-Obsidian外插件/02-Better-BibTeX.md) | Zotero | 维护 citekey 并导出 `.bib` |
| [ZotLit Companion](01-Obsidian外插件/03-ZotLit-Companion.md) | Zotero | 提供 Zotero 侧 ZotLit 入口与通知 |
| [Ethereal Style](01-Obsidian外插件/04-Ethereal-Style.md) | Zotero | 统一 PDF 批注颜色语义；可选 |

## 二、PaperBell 工作流核心插件

下列第三方/社区插件均已随 v5.0.1 启用；Daily Notes 是 Obsidian 核心插件。

| 插件 | 当前版本 | 工作流角色 | 边界 |
| --- | --- | --- | --- |
| [PaperBell 主插件](02-PaperBell工作流核心插件/01-PaperBell.md) | 0.4.8 | 激活、授权、共享 AI 配置 | 不代替子插件处理数据 |
| [Inputs Bell](02-PaperBell工作流核心插件/02-Inputs-Bell.md) | 0.5.3 | 输入后处理与归位 | 不负责采集 |
| [Project Manager](02-PaperBell工作流核心插件/03-Project-Manager.md) | 0.3.2 | 项目主页、ID、里程碑、Base 卡片 | 不替代任务索引 |
| [Task Genius](02-PaperBell工作流核心插件/04-Task-Genius.md) | 9.14.0-beta.5 | 任务索引与捕获；插件可提供自定义 Base 视图 | Base 视图 beta 开关当前关闭，不宣称已成功渲染 |
| [ZotLit](02-PaperBell工作流核心插件/05-ZotLit.md) | 2.1.0-beta.3 | Zotero 文献与批注导入 | 当前使用七个 Eta 模板 |
| [Daily Notes](02-PaperBell工作流核心插件/06-Daily-Notes.md) | Obsidian 核心 | 日记目录、格式与模板 | 无独立社区插件包 |
| [Thino](02-PaperBell工作流核心插件/07-Thino.md) | 随包启用 | 闪念、任务与日记捕获 | 写回普通 Markdown |
| [Templater](02-PaperBell工作流核心插件/08-Templater.md) | 随包启用 | 动态模板与脚本 | 不执行 ZotLit Eta 模板 |
| [QuickAdd](02-PaperBell工作流核心插件/09-QuickAdd.md) | 随包启用 | 组合模板、命令和脚本 | 项目创建改由 Project Manager |
| [Cards Wrangler](02-PaperBell工作流核心插件/10-Cards-Wrangler.md) | 1.0.2 | 按需治理概念卡与别名 | 默认确认回写、不监听新笔记 |
| [PaperOut To-Authors](02-PaperBell工作流核心插件/11-PaperOut-To-Authors.md) | 2.4.0-beta.6 | 长文项目与 Pandoc 导出 | 系统工具和资产仍需验收 |
| [PaperBell Section](02-PaperBell工作流核心插件/12-PaperBell-Section.md) | 0.3.1 | 聚合工作区视图 | `basePaths` 当前均为 `null` |
| [PaperSearch](02-PaperBell工作流核心插件/13-PaperSearch.md) | 0.8.2 | 文献检索、阅读与批注 | 核心随包；本地后端默认关闭 |

导航顺序为 QuickAdd → Cards Wrangler → PaperOut → Section → PaperSearch → 本总览。

## 三、其他已启用辅助插件

| 插件                                                                                             | 主要辅助作用                                            |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Admonition](03-其他辅助插件/01-Admonition插件.md)                                                     | 自定义提示框和旧模板兼容                                      |
| [Advanced URI](03-其他辅助插件/02-Advanced%20URI插件.md)                                               | 用 URI 打开笔记、标题或命令                                  |
| [Calendar](03-其他辅助插件/03-Calendar插件.md)                                                         | 日记/周记月历入口                                         |
| [Claudian](03-其他辅助插件/04-Claudian插件.md)                                                         | 2.2.3；桌面 AI 代理协作                                  |
| [Dataview](03-其他辅助插件/05-Dataview插件.md)                                                         | 动态查询字段、标签和链接                                      |
| [Floating TOC](03-其他辅助插件/06-Floating%20toc插件.md)                                               | 长笔记悬浮标题导航                                         |
| [Homepage](03-其他辅助插件/07-Homepage插件.md)                                                         | 打开首页或预设工作区                                        |
| [Hover Editor](03-其他辅助插件/08-Hover%20Editor插件.md)                                               | 在悬浮预览中编辑                                          |
| [Map View](03-其他辅助插件/09-Map%20View插件.md)                                                       | 展示带位置字段的笔记                                        |
| [Minimal Theme Settings](03-其他辅助插件/10-Minimal%20Theme%20Settings插件.md)                         | 调整当前活动 Minimal 主题                                 |
| [Pixel Banner](03-其他辅助插件/11-Pixel%20Banner插件.md)                                               | 展示横幅和封面                                           |
| [Recent Files](03-其他辅助插件/12-Recent%20Files插件.md)                                               | 最近打开文件入口                                          |
| [Simplified Chinese Word Splitting](03-其他辅助插件/13-Simplified%20Chinese%20Word%20Splitting插件.md) | 中文分词、选词与光标移动                                      |
| [Style Settings](03-其他辅助插件/14-Style%20Settings插件.md)                                           | 配置主题、插件与 snippets 的样式变量                           |
| Sortable                                                                                       | 0.3.1；让 Markdown 表格可点击表头排序                        |
| Tag Wrangler                                                                                   | 0.6.5；重命名、合并和管理标签，修改 `#project/<acronym>` 前仍需检查引用 |

## 主题状态

当前活动主题是 **Minimal**，Minimal Theme Settings 的配置有效。AnuPpuccin 主题已安装但未启用；Style Settings 中保存的 AnuPpuccin 值保留为休眠配置，只有切换回该主题时才可能生效。已启用且名称含 AnuPpuccin 的 snippets 不等于活动主题。

## 按工作流查看组合关系

| 工作流 | 主要链路 |
| --- | --- |
| 管理科研项目 | Project Manager → Task Genius |
| 导入文献 | Zotero Connector → Better BibTeX / ZotLit Companion → ZotLit → Inputs Bell |
| 日常记录 | Daily Notes → Thino；Templater / QuickAdd 提供入口 |
| 追踪学者和组织 | Web Clipper → Inputs Bell；手动路径为 QuickAdd → Templater |
| 概念卡 | Cards Wrangler；QuickAdd 提供手动入口 |
| 写作与输出 | PaperOut → Pandoc；Better BibTeX 提供引用数据 |
| 检索与阅读 | PaperSearch；本地后端按需启用 |

---

[返回教程首页](../index.md)
