---
title: Zotero Connector
description: 从浏览器抓取文献元数据和可访问的 PDF，并保存到 Zotero
status: published
order: 1
---

# Zotero Connector

## 定位

这个工具的官方名称是 **Zotero Connector**，不是 Zotero Connection。它是安装在 Chrome、Edge、Firefox 或 Safari 中的浏览器扩展，不是 Zotero 桌面端插件。

它负责“Zotero文献导入 Obsidian”流程的第一步：

```text
出版社或数据库网页
        ↓
Zotero Connector 抓取元数据和可访问的 PDF
        ↓
Zotero 父条目 + PDF 附件
        ↓
ZotLit 导入 Obsidian
```

Connector 的价值不只是“下载 PDF”。它会识别网页中的标题、作者、期刊、日期和 DOI 等文献元数据，并在有访问权限时一并保存 PDF。这样得到的是可以继续引用、分类和批注的 Zotero 文献条目，而不是一个来历不明的孤立 PDF。[Zotero 官方 Connector 说明](https://www.zotero.org/support/connector)

## 安装

1. 先安装并打开 Zotero 桌面端。
2. 访问 **[Zotero Connector 官方下载页](https://www.zotero.org/download/connectors)**。
3. 根据当前浏览器安装对应扩展。
4. 在 Chrome 或 Edge 中打开扩展菜单，将 Zotero Connector 固定到工具栏。
5. 打开一篇期刊论文页面，确认地址栏旁能看到 Zotero 保存图标。

> [!tip] 推荐保持 Zotero 桌面端开启
> Connector 可以在授权后保存到 zotero.org 在线文献库，但官方仍建议优先连接本机 Zotero 客户端。这样可以立即选择 collection、检查条目并管理附件。

## 推荐的抓取方法

### 第一步：先打开目标 collection

在 Zotero 中选择准备保存文献的 collection。Connector 通常会默认将新条目保存到当前 collection，也可以在保存弹窗中重新选择。

### 第二步：优先打开文献详情页

尽量从下面这些页面保存：

- 出版社的论文详情页；
- 期刊文章摘要页；
- 学术数据库中的正式文献记录页；
- 图书馆目录中的书目页。

不要一开始就只打开 PDF。根据 Zotero 官方建议，从文章详情页保存通常能获得更完整的元数据，并可能自动附加可访问的 PDF。[Adding Items to Zotero](https://www.zotero.org/support/adding_items_to_zotero)

### 第三步：点击 Connector 图标

图标会根据页面内容变化：

| 图标含义 | 页面类型 | 保存结果 |
| --- | --- | --- |
| 期刊文章、图书等 | 单篇正式文献 | 创建父条目，并尝试附加 PDF |
| 文件夹 | 搜索结果或文献列表 | 弹出列表，可选择多篇文献 |
| PDF | 浏览器正在显示 PDF | 保存 PDF，并尝试自动检索元数据 |
| 灰色网页 | 没有识别到文献元数据 | 保存为 Web Page 条目 |

点击后，在弹窗中确认目标 collection；需要时可以同时添加标签。

### 第四步：回到 Zotero 验收

保存完成后，不要马上进入 ZotLit。先在 Zotero 中检查：

- 是否生成了一个正式父条目；
- 父条目下是否存在 PDF 附件；
- 标题、作者、期刊、年份和 DOI 是否正确；
- PDF 是否能够正常打开；
- 条目是否进入预期 collection。

## 为什么不建议直接抓 PDF

当浏览器正在显示 PDF 时，Connector 可以直接保存它，并尝试检索元数据。但如果识别失败，Zotero 只会留下一个独立 PDF 附件。

孤立 PDF 不适合作为 PaperBell 工作流的正式入口，因为它可能缺少：

- 稳定的文献标题；
- 作者和期刊；
- DOI；
- citation key；
- ZotLit 可以稳定读取的父条目关系。

因此优先级应为：

```text
出版社或数据库详情页
    > 学术检索结果页
    > 直接打开 PDF
```

## 只有孤立 PDF 时怎么办

如果 Connector 保存后只得到一个 PDF：

1. 右键该 PDF，选择 **Create Parent Item**；
2. 输入 DOI、ISBN 或其他标识符，让 Zotero 检索元数据；
3. 如果已经从网页保存了正确的父条目，将 PDF 拖到该父条目下面；
4. 实在无法识别时，再使用 Manual Entry 手工填写。

完成后确认 PDF 已成为正式文献条目的子附件，再继续进行批注和 ZotLit 导入。

## PDF 没有自动下载

Connector 能否保存 PDF，取决于当前页面是否提供 PDF，以及浏览器是否具有访问权限。常见原因包括：

- 尚未登录出版社或学校图书馆账号；
- 当前网络没有订阅权限；
- 网页只提供元数据，没有直接 PDF 链接；
- 浏览器隐私扩展阻止了下载请求；
- 网站的 Zotero translator 暂时失效。

此时可以先保留正确的父条目，再通过学校数据库、开放获取版本或本地文件补充 PDF。不要因为附件失败就删除已经抓取正确的元数据。

## 批量抓取

在 Google Scholar、数据库检索页或图书馆目录中，Connector 可能显示文件夹图标，可以选择多篇文献保存。

但不建议用 Connector 进行大规模、连续的系统综述数据抓取。频繁请求可能触发 Google Scholar 或数据库的访问限制。数量较大时，应优先使用数据库提供的 RIS、BibTeX 等批量导出功能，再导入 Zotero。

## 常见问题

> [!faq]- 为什么浏览器中看不到 Connector 图标？
> - 确认扩展已经安装并启用；
> - 在 Chrome 或 Edge 的扩展菜单中固定图标；
> - 重启浏览器；
> - 仍然没有时，卸载并从官方下载页重新安装。

> [!faq]- 为什么 Connector 显示 Zotero 未运行？
> 1. 确认 Zotero 桌面端已经打开；
> 2. 重启浏览器；
> 3. 检查 Connector 是否获得“在所有网站上读取和更改数据”的权限；
> 4. 暂时关闭可能阻止本机请求的广告或隐私扩展；
> 5. 在 Zotero 开启时访问 `http://127.0.0.1:23119/connector/ping`，正常情况下应显示 Zotero Connector 服务可用。
>
> 详细排查步骤见 [Zotero Connector 无法连接桌面端](https://www.zotero.org/support/kb/connector_zotero_unavailable)。

> [!faq]- 为什么保存后的元数据不完整或错误？
> 同一篇文献从不同网站保存，得到的元数据质量可能不同。优先使用出版社官网或正式数据库页面，不要把 Google Scholar 的结果视为最终权威数据。
>
> 保存后至少人工检查标题、作者、期刊、年份和 DOI。Zotero、Better BibTeX 和 ZotLit 都会继续使用这些数据，入口错误会传递到后续整个工作流。

## 与后续插件的分工

| 工具 | 接收什么 | 负责什么 |
| --- | --- | --- |
| Zotero Connector | 网页与在线 PDF | 创建 Zotero 条目并抓取附件 |
| Better BibTeX | Zotero 条目 | 管理 citation key 和导出 `.bib` |
| Ethereal Style | Zotero PDF 批注 | 统一批注颜色语义 |
| ZotLit Companion | Zotero 条目 | 从 Zotero 发起 Obsidian 操作 |
| ZotLit | Zotero 数据库 | 生成 Markdown 文献笔记 |
| Inputs Bell | 已生成的输入笔记 | 检查、修复和归位 |

## 最小验收

- 浏览器工具栏能看到 Zotero Connector；
- Zotero 桌面端开启时，Connector 能正常连接；
- 从论文详情页保存后生成正式父条目；
- 父条目包含正确的标题、作者、期刊、年份和 DOI；
- 有访问权限时，PDF 成为父条目下的附件；
- PDF 可以在 Zotero 阅读器中打开。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Better BibTeX](02-Better-BibTeX.md)
