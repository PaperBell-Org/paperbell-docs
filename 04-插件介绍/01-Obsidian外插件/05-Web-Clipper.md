---
title: Obsidian Web Clipper
slug: plugins/external/web-clipper
description: 使用 PaperBell Scholar clipper 模板从公开网页自动创建学者档案
status: published
order: 5
---

# Obsidian Web Clipper

Web Clipper 是 Obsidian 的浏览器扩展。在“追踪学者和组织”工作流中，它只负责**采集学者网页并生成一篇待处理笔记**；后续的字段整理、机构匹配和文件归位交给 Inputs Bell。

## 安装

**[安装 Obsidian Web Clipper](https://obsidian.md/help/web-clipper)**

Web Clipper 可用于 Chrome/Chromium、Firefox、Safari 和 Edge。它是浏览器扩展，不会出现在 Obsidian 的“第三方插件”列表中。

## 导入 PaperBell 学者模板

**[下载 PaperBell Scholar clipper 模板](https://raw.githubusercontent.com/PaperBell-Org/paperbell-clippers/main/scholar/scholar-clipper.json)**

1. 打开 Web Clipper 设置。
2. 进入任意模板页面，选择右上角的 **Import**。
3. 导入下载的 `scholar-clipper.json`。
4. 确认模板名称为 `Scholar clipper`。

模板会针对常见学者平台设置触发规则，并把结果保存到：

```yaml
behavior: create
path: 20 - Inputs
tags:
  - scholar
  - clippings
```

## 为什么需要 Interpreter

学者主页没有统一结构，同一个字段可能藏在正文、侧栏、结构化数据或动态页面中。`Scholar clipper` 因此会通过 Interpreter 判断姓名、机构、研究方向等字段，而不是只依赖固定 CSS 选择器。

使用前请在 Web Clipper 中配置自己信任的模型服务，并注意：

- 模型调用可能收费且速度较慢；
- 网页内容会发送给所选模型服务；
- 保存前必须检查姓名、机构与关键词；
- 私密页面或未公开信息不要交给 Interpreter。

## 与 Inputs Bell 的衔接

模板同时写入 `scholar` 与 `clippings`，因此 Inputs Bell 需要把更具体的规则放在前面：

```text
tag:scholar => /30 - Metadata/Scholars
tag:clip => Clippings
```

如果顺序相反，学者档案会被归入普通网页剪藏目录。

## 最小验收

选择一位学者的公开主页测试，并确认：

- Web Clipper 自动选中或可以手动选择 `Scholar clipper`；
- 预览中至少存在 `name`、`website`、`tags` 与 `institute`；
- 文件首先创建在 `20 - Inputs`；
- Inputs Bell 最终将它移动到 `30 - Metadata/Scholars`。

模板中的旧版日记链接或尚未安装的 Base 不影响 frontmatter 采集；网页部署前如需展示正文，再按实际目录统一调整这些链接。

---

[返回插件总览](../index.md) · [返回追踪学者和组织](../../03-详细教程/05-追踪学者和组织.md) · [下一组：PaperBell 主插件](../02-PaperBell工作流核心插件/01-PaperBell.md)
