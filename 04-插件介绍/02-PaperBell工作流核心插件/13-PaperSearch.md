---
title: PaperSearch
slug: plugins/core/papersearch
description: 说明 PaperSearch 0.8.2 的检索角色、随包核心、本地后端和当前数据目录
status: published
order: 13
---



# PaperSearch

## 定位与版本

PaperBell v5.0.1 启用桌面端插件 **PaperSearch `0.8.2`**。它用于检索、阅读和标注文献，并在写作时保留可追溯来源。它与 ZotLit 分工：ZotLit 负责从 Zotero 生成文献笔记，PaperSearch 负责在已有文献与索引上检索、引用和分析。

## 后端配置

| 项目 | 当前值 |
| --- | --- |
| 后端 URL | `http://127.0.0.1:8000` |
| 本地后端 | `localBackendEnabled: false` |
| 本地后端目录 | 空 |
| 本地 Python | 空 |
| 核心文件 | 已随 v5.0.1 发布包提供 |
| 核心记录文件名 | `PaperSearch_v1.2_source_portable_python_with_api_20260627.zip` |
| 插件平台 | 仅桌面端 |

“核心已随包提供”不等于服务正在运行。默认关闭本地后端时，不应要求首次闭环连接 `127.0.0.1:8000`，也不能据此宣称检索已成功。主动启用前应确认核心目录、Python/启动方式、端口占用和隐私边界。

## 当前目录与默认行为

```yaml
litNoteDir: PaperSearch笔记
conceptDir: PaperSearch/概念
paperLibraryDir: PaperSearch/文献
conceptCandidateDir: PaperSearch/概念/_候选
```

当前默认视图为 `list`，搜索模式为 `balanced`，检索意图为 `support`；AI 摘要关闭，metadata resolver 开启，LLM resolver 与 reranking 关闭。配置包含观点、方法、引用、质疑、术语、待查六种批注角色。

这些 `PaperSearch/*` 路径属于插件自己的工作目录，不应改写成 `10 - Cards/Concepts` 或 `20 - Inputs/Zotero`。配置中的某个目录尚未生成时，先按插件流程初始化，不要用手工空目录冒充索引成功。

## 边界与验收

- PaperSearch 不替代 Zotero、Better BibTeX 或 ZotLit 的导入职责；
- API key、外部模型与本地后端均需按实际使用方式单独配置；
- 发布包中出现索引或缓存记录不代表当前机器可打开对应 PDF；
- 验收应明确区分“插件入口可见”“后端健康”“文献已索引”“检索返回可核对来源”四个层级。

首次 PaperBell 闭环不要求启用本地后端。需要使用时，再启动后端并检查 `http://127.0.0.1:8000`，随后以一篇可定位原文的测试文献验证检索、引用和批注落盘位置。

---

[上一篇：PaperBell Section](12-PaperBell-Section.md) · [返回插件总览](../index.md)
