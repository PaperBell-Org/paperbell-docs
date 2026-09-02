---
title: Style Settings
slug: plugins/extra/style-settings
description: 介绍 Style Settings 对主题、插件和 CSS snippets 样式变量的管理边界
status: published
order: 14
---

# Style Settings

**【开源链接】**
<https://github.com/obsidian-community/obsidian-style-settings>

**【简介】**
Style Settings 为主题、插件和 CSS snippets 提供图形化样式设置。面板中能显示什么，取决于当前主题和已加载 CSS 声明；它不会自动生成主题。

**【使用方法】**

1. 进入“设置 → Style Settings”；
2. 找到当前主题、插件或 snippet 的分组；
3. 每次只修改少量选项，并检查编辑/阅读视图与亮/暗模式；
4. 大幅修改或导入配置前先导出备份。

**【PaperBell 当前配置】**

PaperBell 当前安装并启用 Style Settings `1.0.9`，活动主题是 **Minimal**。因此 Floating TOC、Time、Sharetype 和其他当前已加载 CSS 所声明的设置可以生效；是否生效仍取决于对应插件/snippet 是否加载。

配置文件还保留大量 `anuppuccin-theme-settings@@...` 值，例如 `ctp-mocha-old`、`ctp-rosepine-light`、蓝色强调色、彩色标题、表格和卡片布局。这些值是**保留但休眠**的 AnuPpuccin 配置：在当前 Minimal 主题下不应描述为主导界面；只有切换回 AnuPpuccin 并加载相应样式声明时才会重新生效。

名称含 `【AnuPpuccin】` 的 CSS snippets 仍处于启用状态，但 snippet 名称不等于活动主题。它们在 Minimal 下是否兼容，应按实际 CSS 和渲染结果逐项检查。

**【和 PaperBell 的联动】**

Style Settings 只影响显示层，不修改项目、文献、学者或概念数据。停用不会删除 Markdown，但 Floating TOC、时间轴、项目区域和 snippets 的自定义颜色或布局可能回退。不要无备份执行全量 Reset，否则当前有效设置和为其他主题保留的休眠值都可能被清除。

---

[上一篇：Simplified Chinese Word Splitting](13-Simplified%20Chinese%20Word%20Splitting插件.md) · [返回插件总览](../index.md)
