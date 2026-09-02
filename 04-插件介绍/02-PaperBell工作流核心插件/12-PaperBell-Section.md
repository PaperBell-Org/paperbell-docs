---
title: PaperBell Section
slug: plugins/core/paperbell-section
description: 说明 PaperBell Section 0.3.1 的工作区入口、当前数据目录与未连接边界
status: published
order: 12
---



# PaperBell Section

## 定位与版本

PaperBell v5.0.1 启用 **PaperBell Section `0.3.1`**。它提供独立的 PaperBell 工作区视图，把研究资料、项目与个人知识管理入口集中到一个界面；它不是新的数据存储层。

## 默认目录

```yaml
folders:
  papers: 20 - Inputs/Zotero
  literature: 20 - Inputs/Zotero
  books: 20 - Inputs/Books
basePaths:
  papers: null
  experiments: null
  tasks: null
  resources: null
  books: null
```

`basePaths` 当前全部为 `null`。因此不能声称论文、实验、任务、资源和书架组件都已经连接到对应 `.base` 文件；在设置实际路径并运行验证前，应把这些区域视为可配置入口。

## 当前组件与边界

配置定义了九个组件标题：学术概览、今日聚焦、最近文献、研究焦点地图、研究论文、实验数据、科研课题、学术资源、书架。研究焦点默认跟踪 `research`、`study`、`paper`、`note`、`想法`、`project` 等标签；番茄钟默认 25 分钟工作、5 分钟短休、15 分钟长休。

Section 主要聚合和展示已有文件。文献导入仍由 ZotLit/Inputs Bell 完成，项目身份仍由 Project Manager 管理，任务索引仍由 Task Genius 处理。配置中存在组件不等于每个组件已有数据源或已验收可用。

如需建立真实数据链路，应先核对上述目录，再为需要的组件选择现有 `.base` 文件并逐项验证过滤条件、字段和点击目标。

---

[上一篇：PaperOut To-Authors](11-PaperOut-To-Authors.md) · [返回插件总览](../index.md) · [下一篇：PaperSearch](13-PaperSearch.md)
