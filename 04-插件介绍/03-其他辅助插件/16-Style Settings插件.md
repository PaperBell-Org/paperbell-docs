**【开源链接】**
<https://github.com/obsidian-community/obsidian-style-settings>

**【简介】**
Style Settings 为主题、插件和 CSS snippets 提供图形化的样式设置面板。开发者只要在 CSS 中预先声明可调整的项目，用户就能直接修改开关、颜色、字号、宽度和其他变量，不必手动编辑 CSS 代码。

它不会自动开放所有样式，也不会自己生成一套主题；设置面板中能看到什么，取决于当前主题、插件和 snippets 提供了哪些可调项目。

**【使用方法】**

1. 启用插件后，进入“设置 → Style Settings”；
2. 找到需要调整的主题、插件或 snippet 分组；
3. 每次只修改少量选项，同时检查编辑视图、阅读视图、亮色和暗色模式；
4. 调整内容较多时，可从命令面板把 Style Settings 打开为独立面板，边修改边查看效果；
5. 大幅修改或导入别人配置前，先使用导出功能备份当前设置。

**【主要自定义功能】**

| 功能 | 作用 | 建议 |
| --- | --- | --- |
| 开关和下拉选项 | 开启布局、标题、表格、边框等预设样式 | 不清楚作用时先保持默认 |
| 颜色选择器 | 调整主题强调色、标题、链接及插件颜色 | 同时检查亮色和暗色模式的对比度 |
| 数值和滑块 | 修改字号、间距、圆角、透明度和宽度 | 小幅调整，避免界面在移动端过于拥挤 |
| Import / Export | 迁移或备份全部 Style Settings 配置 | 导入会涉及多个主题和 snippets，应先保存原配置 |
| Reset | 恢复某项或某组默认值 | 不要在没有备份时直接重置全部设置 |

Style Settings 的修改保存在插件配置中，不会直接改写主题或 snippet 的 CSS 文件，因此一般不会被主题更新覆盖。但如果主题更新后删除或更改了某个设置 ID，旧配置可能不再生效。

**【PaperBell 当前配置】**

PaperBell 当前安装的是 Style Settings `1.0.9`。它是现有界面自定义的重要组成部分，主要控制：

| 分组 | 当前涉及的内容 |
| --- | --- |
| AnuPpuccin | 亮色与暗色方案、强调色、彩色标题、代码块行号、表格样式、卡片布局和状态栏等 |
| Floating TOC | 导航线、标题背景、悬停颜色、透明度和高亮效果 |
| Time | 日记时间轴在亮色与暗色模式下的颜色 |
| Sharetype | 项目管理区域的主题颜色 |
| 其他 snippets | 链接显示、Frontmatter 背景透明度及 AnuPpuccin 扩展配色等 |

当前 AnuPpuccin 使用的暗色方案为 `ctp-mocha-old`，亮色方案为 `ctp-rosepine-light`；同时启用了蓝色系强调色、彩色标题、代码块行号和卡片布局等效果。

**【和 PaperBell 的联动】**

Style Settings 只控制显示层，不会修改项目、文献、学者或概念数据。但 PaperBell 的主页、时间轴、Floating TOC、项目页面和 AnuPpuccin 界面都使用了它保存的样式配置，因此不建议随意导入别人的整套设置或直接执行全部重置。

修改前建议先导出配置，修改后重点检查：

```text
主页 → 文献与学者模板 → Dataview 表格
→ Floating TOC → 日记时间轴 → 亮色与暗色模式
```

停用 Style Settings 不会删除 Markdown 内容，但自定义颜色、布局和外观可能恢复为主题或 snippets 的默认效果。

---

[上一篇：Soundscapes](15-Soundscapes插件.md) · [返回插件总览](../index.md)
