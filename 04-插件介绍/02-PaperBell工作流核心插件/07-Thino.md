---
title: Thino
slug: plugins/core/thino
description: 使用 Thino 快速捕获闪念，并把项目、概念和任务记录写回 PaperBell 当天日记
status: published
order: 7
---

# Thino



Thino 是 PaperBell 的快速捕获入口。它把临时灵感、现场判断和行动写回普通 Markdown 日记，因此即使不打开 Thino，数据仍然可以在 Obsidian 中阅读、搜索和链接。

## 安装

**[Thino 官方安装说明](https://thino.pkmer.net/thino/04_thino-installation-and-pro-activation/)**

**[Thino 官方使用指南](https://thino.pkmer.net/thino/)**

也可以在 Obsidian 的“设置 → 第三方插件 → 社区插件市场”中搜索 `Thino` 安装。

## PaperBell 的单独配置

Thino 的界面可能使用英文。PaperBell 只需要确认以下设置：

| 配置 | PaperBell 使用值 |
| --- | --- |
| 保存目标 | Daily notes |
| **Use which plugin's default configuration** | `Daily` |
| **Use independent settings** | 关闭 |
| **Insert after heading** | `## 日程` |
| **Default prefix when save thino** | `List` |
| **Default time prefix for thino in daily notes** | `HH:mm` |
| **Use Tags In Vault** | 开启 |

记录格式保持为：

```text
{TIME} {CONTENT}
```

最终写入日记的普通闪念类似：

```markdown
- 09:58 正式发布前还需要完成一次检查 #project/paperbell #想法
```

## 一、Thino 与 Daily Notes 的分工

| Thino | Daily Notes |
| --- | --- |
| 提供快速输入框 | 决定当天文件名 |
| 给记录添加时间、标签和状态 | 决定日记目录与模板 |
| 搜索、筛选、回顾和归档闪念 | 保存最终 Markdown 原文 |

## 二、打开 Thino

可以点击 Thino 的侧边栏入口，也可以使用命令：

- **Thino: Show daily thino**：打开日常 Thino 视图；
- **Thino: Show thino editor**：打开独立快速输入框；
- **Thino: Focus on thino editor**：把焦点移到输入框。

Thino 官方也提供搜索、标签、回顾、归档和不同布局，但 PaperBell 的基础工作流不要求一次配置全部功能。

## 三、List 与 Task

### List：默认的闪念形式

```markdown
- 10:25 需要重新考虑样本筛选标准 #想法
```

适合灵感、观察、决定和暂时没有明确动作的内容。

### Task：可以执行的行动

```markdown
- [ ] 10:25 核对样本筛选标准 #project/flood-risk
```

切换为 Task 后，Thino 会写入标准复选框，**[Task Genius](04-Task-Genius.md)** 才能把它识别为任务。不要把所有闪念都保存成 Task。

## 四、用标签和链接整理

| 写法 | 作用 |
| --- | --- |
| `#project/<acronym>` | 关联科研项目 |
| `#想法` | 标记需要回顾的研究灵感 |
| `[[概念名称]]` | 明确连接已有概念卡 |
| `#milestone` | 把关键项目任务计入里程碑 |

Thino 支持 Obsidian 原生多级标签，因此 `#project/flood-risk` 可以直接用于筛选和项目管理。

## 五、归档与删除

处理完一条闪念后，可以在 Thino 中归档，使它退出活动收件箱。归档通常会在源 Markdown 中保留记录并增加状态标记，而不是删除日记原文。

这意味着：

- 研究过程仍能按日期追溯；
- 项目标签和概念链接仍可能被查询到；
- “已归档”表示处理完成，不表示内容从库中消失。

删除行为会受 Thino 设置影响。重要记录应先确认已经转入项目、概念卡或输出，再决定是否删除。

## 六、最小验收



1. 用 Thino 保存一条包含唯一测试词的 List；
2. 确认它进入当天日记的 `## 日程`；
3. 确认格式为 `- HH:mm 内容`；
4. 再保存一条 Task，并加入 `#project/demo`；
5. 确认源 Markdown 为 `- [ ]`，Task Genius 可以识别；
6. 归档第一条记录，确认日记原文仍可追溯。

## 常见问题

> [!faq]- Thino 为什么写到了错误目录？
> 确认默认配置来源是 `Daily`，并关闭独立设置；随后检查 Daily Notes 的目录是否为 `30 - Metadata/DailyNote`。

> [!faq]- 为什么记录出现在日记末尾，而不是“日程”下？
> `Insert after heading` 必须精确填写 `## 日程`。标题层级、空格和文字都要一致。

> [!faq]- 为什么输入 `#` 时看不到全库标签？
> 检查 `Use Tags In Vault` 是否开启。

> [!faq]- 归档后项目为什么仍能找到这条记录？
> 归档主要改变 Thino 中的显示状态，源日记和其中的项目标签仍然存在。

---

[返回插件总览](../index.md) · [返回日常记录](../../03-详细教程/04-日常记录.md) · [下一篇：Templater](08-Templater.md)
