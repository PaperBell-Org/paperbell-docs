**【开源链接】**
<https://github.com/kepano/obsidian-minimal-settings>

**【官方文档】**
<https://minimal.guide/plugins/minimal-theme-settings>

**【简介】**
Minimal Theme Settings 是 Minimal 主题的官方配套插件，可以在 Obsidian 设置面板中调整配色、字体、行宽、背景对比度和部分界面功能，也能为常用的主题切换操作提供命令和快捷键。

这个插件**只为 Minimal 主题服务**，不是通用的主题设置工具。使用 AnuPpuccin 等其他主题时，多数选项不会生效；更细致的颜色和界面调整则需要使用 Style Settings。

**【使用方法】**

1. 进入“设置 → 外观 → 主题”，先安装并启用 Minimal；
2. 启用 Minimal Theme Settings，然后进入它的设置页面；
3. 分别设置亮色与暗色模式的配色方案和背景对比度；
4. 根据阅读习惯调整字号、行高、正文宽度和媒体宽度；
5. 需要快速切换专注模式、彩色标题或图片网格时，可在命令面板中调用相应命令，并为常用命令设置快捷键。

**【主要自定义设置】**

| 设置 | 作用 | 建议 |
| --- | --- | --- |
| Light / Dark color scheme | 分别设置亮色和暗色配色 | 两种模式都要检查链接、标题和表格的对比度 |
| Background contrast | 调整侧边栏与正文区的明暗关系 | 暗色屏可尝试 True black，普通屏幕优先保证可读性 |
| Font size / Line height | 调整正文大小和行距 | 长时间阅读时不要把字号和行距压得过小 |
| Normal / Wide / Max line width | 控制正文、宽页面和最大内容宽度 | 正文保持适中，表格和图片再使用更宽的布局 |
| Colorful headings / frame | 为标题、窗口边框和活动项增加颜色 | 同时开启过多彩色选项容易分散注意力 |
| Focus mode / Navigation labels | 简化界面或显示导航文字 | 写作时可开启专注模式，新用户可保留导航标签 |
| Image grid / Media width | 控制连续图片和媒体的排列宽度 | 图片较多的笔记先在桌面端和移动端分别测试 |

**【PaperBell 当前配置】**

当前库已经安装 Minimal 主题和 Minimal Theme Settings `9.0.0`，但实际启用的主题是 **AnuPpuccin**。因此，插件中保存的彩色标题、正文宽度、全宽媒体和边框等设置目前不会主导 PaperBell 的界面效果。

PaperBell 当前的外观主要由以下内容控制：

```text
AnuPpuccin 主题
Style Settings
已启用的 CSS snippets
```

如果继续使用 AnuPpuccin，可以停用 Minimal Theme Settings，不会影响笔记内容；如果以后切换到 Minimal，原来保存在插件中的设置仍可继续调整。

**【和 PaperBell 的联动】**

Minimal Theme Settings 只影响 PaperBell 的显示层，不参与项目、文献、学者或概念数据管理。它适合想把 PaperBell 改成 Minimal 风格的用户，用来快速建立一套简洁的阅读和写作界面。

切换主题前建议先复制一份测试库，并重点检查主页、Dataview 表格、学者模板、Callout、多栏布局和现有 CSS snippets。PaperBell 当前有多项针对 AnuPpuccin 的 snippets，直接切换主题可能造成颜色或布局不一致，但不会删除 Markdown 数据。

---

[上一篇：Map View](10-Map%20View插件.md) · [返回插件总览](../index.md) · [下一篇：Pixel Banner](12-Pixel%20Banner插件.md)
