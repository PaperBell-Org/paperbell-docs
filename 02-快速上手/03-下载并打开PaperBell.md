---
title: 下载并打开 PaperBell
slug: start/open-vault
description: 下载完整发布包，打开正确的库根目录，并完成插件启用、Web Clipper 连接与首次导出准备
status: published
order: 3
---

# 下载并打开 PaperBell

## 本页目标

本页完成七件事：下载完整发布包、识别真正的 vault 根目录、启用首次闭环需要的组件、完成 PaperBell 激活、连接 Web Clipper、检查发布包自带的 PaperOut 导出资产并按需补齐，以及确认关键命令已经注册。

预计用时：**20–30 分钟**。第一次加载插件、建立索引或下载导出资产可能更久。

## 一、下载完整发布包

优先从以下入口获取 PaperBell：

- [PaperBell 官网与激活入口](https://paperbell.cn)；
- [PaperBell GitHub Releases](https://github.com/PaperBell-Org/Obsidian-PaperBell/releases)。

下载后保留原始压缩包，再将练习副本解压到新的目录。不要只复制某个插件文件夹，也不要把旧库的 `.obsidian` 与新发布包随意混合。

## 二、识别正确的库根目录

真正的 PaperBell vault 根目录应同时包含：

```text
.obsidian/
00 - Obsidian/
10 - Cards/
20 - Inputs/
30 - Metadata/
40 - Projects/
50 - Outputs/
```

> [!warning] 不要多选或少选一层
> 如果 Obsidian 文件列表中只能看到一个名为 `PaperBell` 的文件夹，而看不到上述编号目录，通常是打开了它的父目录。反过来，只打开 `00 - Obsidian` 也不是完整 vault。

## 三、在 Obsidian 中打开

1. 启动 Obsidian；
2. 打开“管理仓库”；
3. 选择“打开本地仓库”；
4. 选中包含 `.obsidian` 和六个编号目录的根文件夹；
5. 如果出现信任或受限模式提示，先再次确认发布包来源，再允许加载社区插件。

第一次打开后不要立即批量修改设置。先等待界面稳定，并检查文件列表是否完整。

## 四、启用首次闭环需要的组件

进入“设置 → 第三方插件”，确认下列组件已经安装并启用：

| 组件 | 首次闭环中的作用 |
| --- | --- |
| PaperBell | 激活、授权与共享配置 |
| Project Manager | 创建测试科研项目 |
| Task Genius | 识别项目任务 |
| ZotLit | 从 Zotero 生成文献笔记 |
| Inputs Bell | 处理和归位输入笔记 |
| Thino | 快速写入当天日记 |
| Templater、QuickAdd | 创建学者、机构和手工概念卡 |
| Cards Wrangler 1.0.2 | 按命令处理当前笔记并建立概念关系；需先配置 LLM 宿主并完成授权，无 AI 时改走手工路径 |
| PaperOut To-Authors | 创建写作项目和执行导出工作流 |

同时进入“设置 → 核心插件”，确认 **Daily Notes** 已启用。

Web Clipper 是浏览器扩展，不会出现在 Obsidian 的社区插件列表中。它已经在上一页安装，本页稍后会连接当前 vault 并导入 Scholar 模板。

## 五、完成 PaperBell 激活

打开“设置 → PaperBell”，使用账户登录或注册 ID 完成激活。注册 ID、API Key 和访问令牌都属于敏感信息，不要写入 Markdown 或教程截图。

激活后，子插件可能分别请求 `config`、`activation` 或 AI 相关权限。只在插件名称和用途明确时授权。具体说明见 [PaperBell 主插件](../04-插件介绍/02-PaperBell工作流核心插件/01-PaperBell.md)。

AI 配置不是首次闭环的必需条件，可以暂时留空。

## 六、连接 Web Clipper 并导入 Scholar 模板

### 1. 先验证浏览器能够写入当前 vault

1. 在浏览器中打开 Web Clipper 设置；
2. 将 Vault 设为 **Obsidian 中显示的当前练习库名称**，不要填写磁盘绝对路径，也不要误选同名正式库；
3. 选择一个不依赖 Interpreter 的通用模板，将 Note location 设为 `20 - Inputs`，正文至少保留 `{{content}}`；
4. 打开一篇公开网页，选中一小段正文后点击 **Add to Obsidian**；
5. 允许浏览器打开 Obsidian，再按网页标题或来源 URL 搜索生成的 Markdown；
6. 如果模板带有 `clip` 或 `clippings` 标签，文件可能已经被 Inputs Bell 移到 Clippings，不要因为 `20 - Inputs` 根目录为空就连续重复保存。

这一步只验证“浏览器 → 当前 vault → Inputs Bell”的基本链路，不需要模型服务。确认成功后，可以删除这篇通用测试剪藏。

### 2. 导入 PaperBell Scholar 模板

1. 下载 [PaperBell Scholar clipper 模板](https://raw.githubusercontent.com/PaperBell-Org/paperbell-clippers/main/scholar/scholar-clipper.json)；
2. 在 Web Clipper 的模板页面点击 **Import**，导入 `scholar-clipper.json`；
3. 确认模板名称为 `Scholar clipper`，Note location 为 `20 - Inputs`，并会写入 `scholar` 标签；
4. 在 Inputs Bell 的 `move-by-frontmatter` 规则中确认下列规则存在，而且 `tag:scholar` 位于 `tag:clip` 之前：

   ```text
   tag:scholar => /30 - Metadata/Scholars
   tag:clip => Clippings
   ```

Scholar 模板会使用 Web Clipper Interpreter 处理不同网站上不统一的学者字段。没有配置可信模型时，可以先完成模板导入，并在闭环练习中使用 QuickAdd 手动备选路径；基本 Web Clipper 链路仍以刚才的通用剪藏为验收结果。之后再返回[追踪学者和组织](../03-详细教程/05-追踪学者和组织.md)单独验收自动学者路径。

## 七、准备 PaperOut 首次导出

系统里的 Pandoc、XeLaTeX 和 pandoc-crossref 已在上一页安装；现在还要为 PaperOut 准备 vault 内资产。

1. 打开“设置 → PaperOut To-Authors → 编译”；
2. 确认 Pandoc assets folder 为 `00 - Obsidian/pandoc`；
3. 执行 `设置 Pandoc 导出`，确认三个系统工具都通过检查；
4. 打开 `浏览 Pandoc 资产市场`；
5. 只有当前工作流报告资产缺失，或你需要发布包之外的配方与样式时，才打开 `浏览 Pandoc 资产市场` 补装对应资产；
6. 返回 PaperOut 设置，确认当前工作流不再显示缺失。

> [!important] 两层依赖都要通过
> 终端能运行 `pandoc`，只代表系统工具已经安装；vault 内当前配方显示可用，才代表所需资产存在。首次导出需要这两层同时可用。

完整的配方选择、系统工具和排错说明见 [PaperOut To-Authors 使用指南](../03-详细教程/07-PaperOut%20To-Authors%20使用指南.md)。

## 八、最小健康检查

打开命令面板，分别搜索以下关键词：

| 搜索内容 | 至少应看到的入口 |
| --- | --- |
| `新建科研项目` | Project Manager 的项目创建命令 |
| `ZotLit` | 刷新索引、选择或创建文献笔记的入口 |
| `Daily notes` | 打开当天日记的命令 |
| `Thino` | 日常视图或快速输入框 |
| `QuickAdd: 添加学者` | 手动建立学者档案 |
| `Ingest current note` | Cards Wrangler 1.0.2 的当前笔记处理入口；未配置 LLM 宿主或未完成授权时暂不执行 |
| `新建 PaperBell 论文项目` | PaperOut 的论文项目创建命令 |
| `设置 Pandoc 导出` | PaperOut 的系统工具检查入口 |
| `浏览 Pandoc 资产市场` | PaperOut 的配方、过滤器、模板和 CSL 下载入口 |

某个命令完全不存在时，先检查对应插件是否安装、启用并完成授权，不要直接进入后续步骤。

## 九、确认关键目录没有被改乱

| 数据 | 当前目录 |
| --- | --- |
| 文献笔记 | `20 - Inputs/Zotero` |
| 日记 | `30 - Metadata/DailyNote` |
| 学者 | `30 - Metadata/Scholars` |
| 机构 | `30 - Metadata/Institutes` |
| 项目 | `40 - Projects` |
| 输出 | `50 - Outputs` |

详细字段和插件设置以[第四部分：插件介绍](../04-插件介绍/index.md)为准。快速上手阶段只检查路径，不尝试重新设计目录。

## 本页完成检查

- [ ] 我打开的是包含 `.obsidian` 和六个编号目录的 vault 根；
- [ ] 首次闭环需要的插件已经启用；
- [ ] Daily Notes 核心插件已经启用；
- [ ] PaperBell 已激活，敏感信息没有写入笔记；
- [ ] Web Clipper 已连接当前练习库，通用网页测试成功，Scholar 模板已经导入；
- [ ] Inputs Bell 的 `tag:scholar` 规则位于 `tag:clip` 之前；
- [ ] Pandoc、XeLaTeX、pandoc-crossref 和首次导出资产均通过检查；
- [ ] 项目、ZotLit、日记、Thino、QuickAdd、概念和 PaperOut 导出命令可以找到；
- [ ] 关键目录与当前教程一致。

---

[上一页：安装基础软件](02-安装基础软件.md) · [返回快速上手](index.md) · [下一页：五分钟认识操作界面](04-五分钟认识操作界面.md)
