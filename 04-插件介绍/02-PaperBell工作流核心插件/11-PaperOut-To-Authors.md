---
title: PaperOut To-Authors
slug: plugins/core/paperout-to-authors
description: 使用 PaperOut To-Authors 2.4.0-beta.6 组织长文项目并通过 Pandoc 工作流输出成果
status: published
order: 11
---



# PaperOut To-Authors

## 定位与版本

PaperBell v5.0.1 启用 **PaperOut To-Authors `2.4.0-beta.6`**。它承担 CIMPO 的 Outputs 层：在 `50 - Outputs/Longform` 组织长文项目、场景与草稿，再调用工作流和 Pandoc 资产生成可交付文件。

## 默认路径与配置

| 项目 | 当前值 |
| --- | --- |
| 长文项目位置 | `50 - Outputs/Longform` |
| 场景模板 | `00 - Obsidian/模板/学术长文本模板 Longform academic template.md` |
| Pandoc 资产目录 | `00 - Obsidian/pandoc` |
| Pandoc 命令 | `pandoc` |
| 会话存储 | `file`，文件名 `longform-sessions.json` |
| 状态栏字数 | 开启 |
| 场景编号 | 开启 |
| 当前输出目录覆盖 | 空，按工作流/项目处理 |
| bibliography 覆盖 | 空，需由项目或 preset 提供 |

发布包保存了六条工作流：`PaperBell Manuscript`、`PaperBell Supplementary`、`PaperBell Response Letter`、`PaperBell Cover Letter`、`Default Workflow` 和 `Quick Export`。其中基础 Pandoc 资产已随包放在 `00 - Obsidian/pandoc`；资产市场用于补缺或扩展，不应写成首次使用必装步骤。

## 工作流角色与边界

PaperOut 负责组织草稿、串联处理步骤和调用导出工具；Better BibTeX 提供 `.bib` 引用数据；系统上的 Pandoc、XeLaTeX 与 pandoc-crossref 负责实际转换。仅生成拼接后的 Markdown 不等于完成 PDF/Word 导出。

它不会自动建立 Zotero 文献笔记，不会替 Project Manager 管理项目身份，也不应把尚未发布的跨插件事件接口写成当前能力。项目关联优先通过普通文件和 `project: <acronym>` 等 frontmatter 契约表达。

完整建项目、选择工作流、配置依赖与排错步骤见 [PaperOut To-Authors 使用指南](../../03-详细教程/07-PaperOut%20To-Authors%20使用指南.md)；套件边界与协作规划见 [PaperOut 协作与使用场景](../../03-详细教程/08-PaperOut%20协作与使用场景.md)。

---

[上一篇：Cards Wrangler](10-Cards-Wrangler.md) · [返回插件总览](../index.md) · [下一篇：PaperBell Section](12-PaperBell-Section.md)
