---
title: Claudian
description: 介绍 Claudian 的 AI 代理接入、权限边界与 PaperBell 协作建议
status: published
order: 4
---

# Claudian

**【开源链接】**
<https://github.com/YishenTu/claudian>

**【官方说明】**
<https://github.com/YishenTu/claudian/blob/main/README.md>

**【简介】**
Claudian 把 Claude Code、Codex 等 AI 代理嵌入 Obsidian。获得相应权限后，它可以把当前 Vault 作为工作目录，读取、搜索和修改笔记，也可以检查链接、运行命令并完成多步任务。

Claudian 本身不提供 AI 账号。使用前仍需安装并登录相应的 CLI，并准备订阅或 API 服务。插件仅支持桌面端。在 PaperBell 中，它属于**可选的 AI 协作工具**，不会替代 Zotero、PaperBell 工作流插件或研究者自己的判断。

**【使用方法】**

1. 安装并登录 Claude Code、Codex 或其他受支持的 CLI；
2. 进入“设置 → Claudian”，启用自己实际使用的提供商；
3. CLI 路径优先留空，让插件自动检测，检测失败后再手动指定；
4. 从功能区或命令面板打开 Claudian，新建对话；
5. 使用 `@` 引用笔记，使用 `/` 调用命令，使用 `$` 调用 Skill；选中文本后还可以进行内联编辑；
6. 批量修改前，把焦点放在 Claudian 对话面板内，按 `Shift+Tab` 切换到 **PLAN** 模式；输入框附近显示 `PLAN` 后即为开启。再次按 `Shift+Tab` 会退出并恢复之前的安全模式或 YOLO 模式。

**【主要自定义设置】**

| 设置               | 作用                   | 建议                                      |
| ---------------- | -------------------- | --------------------------------------- |
| Provider / Model | 选择 AI 提供商、模型和推理强度    | 日常整理使用较轻模型，复杂任务再提高强度                    |
| PLAN／安全模式／YOLO   | 控制代理的读取、写入和命令权限      | 新人优先使用 PLAN 或安全模式；YOLO 只在有备份并理解风险时使用    |
| 自定义系统提示词         | 保存长期有效的工作规则          | 可写入“保留 YAML”“使用 Wiki-link”“修改前先读取模板”等要求 |
| 排除标签             | 减少带指定标签的笔记被自动加入上下文   | 可用于私人记录或不希望 AI 自动读取的内容                  |
| 媒体文件夹            | 帮助代理定位 `![[图片.png]]` | 应与 Obsidian 的附件目录保持一致                   |
| 外部上下文目录          | 允许代理读取 Vault 外的项目文件  | 只添加确实需要的最小目录，不要授权整个磁盘                   |
| 聊天位置、标签数和快捷键     | 调整使用习惯               | 长任务可放主编辑区，日常问答可放右侧边栏                    |

Claudian 可能把提示词、引用文件、图片和工具返回结果发送给所选模型服务。不要把密钥写进普通笔记，分享或公开同步 Vault 前也应检查 `.claudian/`、`.claude/` 和 `.codex/` 中是否包含个人配置。

**【PaperBell 当前配置】**

当前库安装的是 Claudian `2.2.3`，主要配置为：

| 项目 | 当前状态 | 说明 |
| --- | --- | --- |
| 提供商 | 当前使用 Claude，同时已启用 Codex | 只需保留自己已经安装并登录的提供商 |
| 界面 | 中文、右侧边栏、最多 3 个聊天标签 | 适合当前布局，可按需要调整 |
| 权限 | 当前为 YOLO | 这是高级使用配置，新用户不建议直接照搬 |
| 媒体文件夹 | 尚未设置 | 建议后续设置为 `00 - Obsidian/附件` |
| PaperBell Skills | `paperbell-academic-writing`、`paperbell-note-conventions` | 其中部分目录仍是旧版写法，正式使用前应按当前编号目录更新 |

**【和 PaperBell 的联动】**

Claudian 适合帮助检查学者、机构和项目笔记的 YAML，查找可能失效的 Wiki-links，统一写作格式，或在目录调整前生成影响清单。反复使用的 PaperBell 规范还可以整理成 Skill，避免每次重新输入。

由于它能够直接修改文件，正式任务建议采用：

```text
引用明确文件 → PLAN 制订方案 → 人工确认
→ 限定范围执行 → 检查差异与链接
```

Claudian 生成或补充的作者、年份、DOI 和论文结论仍需人工核对，不能直接视为可靠的学术事实。

---

[上一篇：Calendar](03-Calendar插件.md) · [返回插件总览](../index.md) · [下一篇：Dataview](05-Dataview插件.md)
