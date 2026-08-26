---
title: Better BibTeX
description: 为 Zotero 提供稳定的 citation key 与 BibTeX/BibLaTeX 导出
status: published
order: 2
---

# Better BibTeX

## 定位

Better BibTeX（BBT）是安装在 Zotero 中的扩展。在 PaperBell 的“Zotero文献导入 Obsidian”流程中，它主要解决两个问题：

1. 为文献维护可持续使用的 citation key；
2. 将 Zotero 条目导出为 Pandoc、LaTeX 和其他文本写作工具可读取的 `.bib` 文件。

Better BibTeX 不负责把 PDF 批注写入 Obsidian，也不负责生成 Markdown 文献笔记；这些是 ZotLit 的职责。

## 安装

1. 从 **[Better BibTeX 官方安装页](https://retorque.re/zotero-better-bibtex/installation/)** 下载 `.xpi`。
2. 在 Zotero 中打开 **Tools → Plugins**。
3. 点击右上角齿轮，选择 **Install Plugin From File…**。
4. 选择下载的 `.xpi` 并完成安装。

> [!tip] Firefox 用户
> 如果单击 `.xpi` 后 Firefox 尝试将它当作浏览器扩展安装，请右键选择“链接另存为”，然后从 Zotero 安装本地文件。

## citation key 策略

**Citation key（引用键）** 是每篇文献在引用系统中的唯一短标识，例如 `Song2026Export`。写作时使用 `@Song2026Export`，Pandoc 或 LaTeX 就能在 `.bib` 文件中找到对应文献并生成正文引用和参考文献。使用 Better BibTeX 的主要原因之一，就是让这个标识在 Zotero、Obsidian 和 `.bib` 文件之间保持稳定一致，避免改名后出现引用失效。引用关键词格式公式可以根据自己的需求来调，详细见 [Better BibTeX 导出文档](https://retorque.re/zotero-better-bibtex/exporting/)。



Zotero 新版本已引入原生 citation key 字段，Better BibTeX 也已调整了对该字段的管理方式。对 PaperBell 而言，最重要的不是套用某一条固定规则，而是确保下列三处一致：

- Zotero 条目中看到的 citation key；
- ZotLit 写入 Frontmatter 的 `citekey`；
- Better BibTeX 导出到 `.bib` 中的条目键。

如果项目已经开始写作，不要随意批量改键。键变更后，Markdown 中已有的 `@citekey`、文献笔记文件名和 `.bib` 条目都可能失去对应。

## 导出 `.bib`

1. 在 Zotero 中选中整个文献库、某个 collection 或一组条目。
2. 右键选择导出文献库，格式使用 **Better BibTeX** 或 **Better BibLaTeX**，勾选导出笔记、保持更新。
3. 根据导出范围选择 `.bib` 文件的保存位置：
   - **单个项目**：放在对应的项目文件夹下，例如 `50 - Outputs/Longform/<项目名>/references.bib`；
   - **整个文献库**：放在 `00 - Obsidian` 下，使用当前导出链读取的 `00 - Obsidian/mybib.bib`。
4. 如果需要让文件跟随 Zotero 变化，在导出对话框勾选 **Keep updated（保持更新）**，将目标设为上述 `.bib` 路径并完成导出；随后打开 Zotero 的 Better BibTeX 设置，在 **Automatic export（自动导出）** 列表中核对该任务的目标路径与状态。整个步骤不依赖截图。
5. 打开 `.bib` 文件，抽查条目键是否与 Obsidian 中的 `citekey` 一致；再修改一个测试条目的非关键元数据并等待自动导出，确认文件更新时间或对应条目内容发生变化，同时 citation key 保持一致。


> [!tip] 如何选择导出范围
> 正在撰写某个具体项目时，优先导出该项目实际使用的文献，便于项目独立迁移和复现；需要给整个库提供统一的检索或引用数据时，再维护位于 `00 - Obsidian` 下的全库 `.bib`。

详细选项见 [Better BibTeX 导出文档](https://retorque.re/zotero-better-bibtex/exporting/)。

## 最小验收

- Zotero 的插件列表中能看到 Better BibTeX；
- 文献条目存在稳定的 citation key；
- 导出 `mybib.bib`；
- `.bib` 条目键与 ZotLit 笔记中的 `citekey` 一致。


---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：ZotLit Companion](03-ZotLit-Companion.md)
