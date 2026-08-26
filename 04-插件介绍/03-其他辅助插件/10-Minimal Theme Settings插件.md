---
title: Minimal Theme Settings
description: 介绍 Minimal 主题配套设置及 PaperBell v5.0.1 当前外观基线
status: published
order: 10
---

# Minimal Theme Settings

**【开源链接】**
<https://github.com/kepano/obsidian-minimal-settings>

**【官方文档】**
<https://minimal.guide/plugins/minimal-theme-settings>

**【简介】**
Minimal Theme Settings 是 Minimal 主题的官方配套插件，用于调整配色、字体、行宽、媒体宽度和部分界面功能。它只服务 Minimal，不是通用主题设置工具。

**【PaperBell 当前配置】**

PaperBell v5.0.1 当前启用的主题是 **Minimal**，并已启用 Minimal Theme Settings `9.0.0`，所以该插件保存的设置当前有效，而不是待切换主题后才生效。

| 项目 | 当前值 |
| --- | --- |
| 亮色方案 | `minimal-notion-light` |
| 暗色方案 | `minimal-default-dark` |
| 行高 | `1.5` |
| 正文行宽 | `40` |
| 宽行宽 | `50` |
| 最大宽度 | `88` |
| 正文字号 | `14` |
| 彩色标题 | 开启 |
| 全宽媒体 | 开启 |
| 边框 | 开启 |
| 可读行长 | 开启 |
| 专注模式 | 关闭 |

实际外观由 Minimal、Minimal Theme Settings、Style Settings 中当前主题可识别的变量，以及已启用 CSS snippets 共同决定。修改后应同时检查编辑/阅读视图和亮/暗模式。

**【和 PaperBell 的联动】**

该插件只影响显示层，不修改项目、文献、学者或概念数据。停用后 Markdown 不会丢失，但当前 Minimal 的颜色、宽度与界面行为会回退。

库中虽然还安装 AnuPpuccin，并保留若干名称含 `【AnuPpuccin】` 的 snippets 与 Style Settings 值，但这不等于 AnuPpuccin 正在启用。切换主题前先在测试库检查主页、Base/Dataview、Callout、多栏和 snippets 兼容性。

---

[上一篇：Map View](09-Map%20View插件.md) · [返回插件总览](../index.md) · [下一篇：Pixel Banner](11-Pixel%20Banner插件.md)
