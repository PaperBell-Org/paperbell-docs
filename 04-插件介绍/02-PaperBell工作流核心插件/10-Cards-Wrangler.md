---
title: PaperBell Cards Wrangler
slug: plugins/core/cards-wrangler
description: 使用 Cards Wrangler 1.0.2 按需维护概念卡、别名与输入笔记之间的连接
status: published
order: 10
---



# PaperBell Cards Wrangler

## 定位与版本

PaperBell v5.0.1 启用 **Cards Wrangler `1.0.2`**。它把输入笔记中的关键词和实体沉淀为 Cards 层概念卡，维护别名、来源与反查关系；它不负责 Zotero 导入，也不替代人工精选和事实核对。

## 默认配置

| 项目 | 当前值 |
| --- | --- |
| 概念目录 | `10 - Cards/Concepts` |
| 数据目录 | `10 - Cards` |
| 输入目录 | `20 - Inputs` |
| 论文目录 | `20 - Inputs/Zotero` |
| 概念标签 | `concept` |
| 处理粒度 | `coarse` |
| 输出语言 | `Chinese` |
| 回写模式 | `confirm` |
| 回写字段 | `keywords` |
| 导入时自动丰富 | `false` |
| 监听新笔记 | `false` |
| 精选上限 | `50`，溢出时警告 |

配置来源为 `paperbell`，因此 AI 能力依赖 PaperBell 主插件已配置 LLM 且用户授予相应权限。默认不是无人值守链路：需要主动运行处理命令，并在 `writeBackMode: confirm` 下确认回写。

## 工作流与边界

1. ZotLit、Web Clipper 或其他入口先把资料写入 `20 - Inputs`；
2. Inputs Bell 完成归一化与归位；
3. 用户按需运行 Cards Wrangler 处理当前笔记或文件夹；
4. 插件在 `10 - Cards/Concepts` 建立或维护概念卡；
5. 用户核对别名、定义、来源、回写关键词和 `featured` 状态。

`featured: true` 表示人工精选，不是模型自动判定的真理。当前 `watchNewNotes: false`、`enrichOnIngest: false`，因此不要声称新输入会自动完成概念治理。无可用 AI 时可继续使用 QuickAdd 或普通 Markdown 手工维护概念卡。

详细步骤、命令和验收见 [概念卡使用场景](../../03-详细教程/06-概念卡使用场景.md)。

---

[上一篇：QuickAdd](09-QuickAdd.md) · [返回插件总览](../index.md) · [下一篇：PaperOut To-Authors](11-PaperOut-To-Authors.md)
