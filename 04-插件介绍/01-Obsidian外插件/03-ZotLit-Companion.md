---
title: ZotLit Companion
description: 安装在 Zotero 中的 ZotLit 伴侣扩展
status: published
order: 3
---

# ZotLit Companion

## 定位

ZotLit Companion 是安装在 Zotero 中的 `.xpi` 扩展。它与 Obsidian 端 ZotLit 是两个独立组件：

- Companion 负责 Zotero 端的菜单、协议链接与可选的实时通知；
- Obsidian ZotLit 负责读取数据、搜索条目、渲染模板和写入 Markdown。

Companion 不生成 Frontmatter，也不直接改写 Obsidian 笔记。

## 安装条件

ZotLit v2 Companion 当前通过预发布渠道提供，并要求 Zotero 9.x。安装前应以 **[ZotLit Companion 官方安装页](https://zotlit.aidenlx.site/docs/install-companion)** 的当前要求为准。

1. 从官方页面下载 Companion `.xpi`。
2. 在 Zotero 中打开 **Tools → Add-ons/Plugins**。
3. 通过右上角齿轮选择 **Install Add-on From File…**。
4. 选择 `.xpi` 并按提示重启 Zotero。
5. 在 Zotero 设置中确认出现 ZotLit 相关页面。

## 基础连接与实时通知

基础的打开和创建操作可以通过本地协议链接发送给 Obsidian。如果需要 Zotero 的变化主动通知 Obsidian，再配置本地通知服务。

> [!note] 本地通信
> ZotLit 的实时通知通过 localhost 在同一台计算机上交换。基础导入不应依赖公网 API。

无法接收实时变化时，仍可在 Obsidian ZotLit 中手动刷新索引；先确保基础创建流程可用，再排查实时通知。

## 最小验收

- Zotero 插件列表中能看到 ZotLit Companion；
- Zotero 设置中出现 ZotLit 页面；
- 从 Zotero 发起操作时能唤起 Obsidian；
- Obsidian ZotLit 能找到同一个文献条目；
- 如果启用实时通知，两端的主机名和端口一致。

---

[返回插件总览](../index.md) · [返回 Zotero文献导入 Obsidian](../../03-详细教程/03-Zotero文献导入Obsidian.md) · [下一篇：Ethereal Style](04-Ethereal-Style.md)
