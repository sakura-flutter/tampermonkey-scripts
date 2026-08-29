# tampermonkey-scripts

自用油猴脚本。

## 脚本

- [重定向](https://greasyfork.org/zh-CN/scripts/416338-redirect-外链跳转)
- [视频倍速](https://greasyfork.org/zh-CN/scripts/562075-视频倍速播放)
- [Pixiv](https://greasyfork.org/zh-CN/scripts/419761-pixiv-工具箱)
- [GitHub](https://greasyfork.org/zh-CN/scripts/423178-github-工具箱)
- [Bilibili](https://greasyfork.org/zh-CN/scripts/426198-bilibili-工具箱)
- [Tieba 签到](https://greasyfork.org/zh-CN/scripts/410874-百度贴吧签到)
- [网页宽屏](https://greasyfork.org/zh-CN/scripts/411260-网页宽屏)
- [蓝湖](https://greasyfork.org/zh-CN/scripts/411030-蓝湖-lanhu)

<!-- 弃用 -->
<!-- - [MDN Web Dosc 文档辅助](https://greasyfork.org/zh-CN/scripts/420958-mdn-文档辅助) -->
<!-- - [Element UI 文档辅助](https://greasyfork.org/zh-CN/scripts/418173-element-ui文档辅助) -->
<!-- - [View UI 文档辅助](https://greasyfork.org/zh-CN/scripts/417770-view-ui文档辅助) -->

生成的脚本在 [这里](https://github.com/sakura-flutter/tampermonkey-scripts/tree/gh-pages) 查看。

## 开发

### 启动开发

```bash
pnpm install
pnpm dev
```

`pnpm dev` 会启动交互式任务选择器，可选择需要开发的脚本。

### 按需执行

| 命令               | 用途                                 |
| ------------------ | ------------------------------------ |
| `pnpm build`       | 一次性构建全部脚本，并更新到 `dist/` |
| `pnpm build:watch` | 实时构建全部脚本，并更新到 `dist/`   |
| `pnpm check`       | 执行格式化、lint 和类型检查          |

开发时遇到 CSP 问题，请参考 [vite-plugin-monkey 文档](https://github.com/lisonge/vite-plugin-monkey/blob/main/README_zh.md#csp)。

## 致谢

[![JetBrains](https://avatars0.githubusercontent.com/u/878437?s=120&v=4)](https://www.jetbrains.com/?from=tampermonkey-scripts)
