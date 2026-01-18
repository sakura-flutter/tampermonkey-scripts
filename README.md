# tampermonkey-scripts

<img src="https://img.shields.io/badge/Firefox-Latest-brightgreen?style=flat-square" alt="Firefox version"> <img src="https://img.shields.io/badge/Edge-Latest-brightgreen?style=flat-square" alt="Firefox version"> <img src="https://img.shields.io/badge/Chrome-Latest-brightgreen?style=flat-square" alt="Chrome version">

仅在最新版上通过，如果使用其它浏览器**必须要保证 Chromium 版本 120+**

## 使用

1. 先在浏览器商店安装 Tampermonkey 扩展（链接：[Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/), [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd), [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)）
2. 然后在下面脚本中选择需要的进行安装

### 脚本

详细说明点击查看

- [重定向](https://greasyfork.org/zh-CN/scripts/416338-redirect-外链跳转)
- [视频倍速](https://greasyfork.org/zh-CN/scripts/562075-视频倍速播放)
- [Pixiv](https://greasyfork.org/zh-CN/scripts/419761-pixiv-工具箱)
- [GitHub](https://greasyfork.org/zh-CN/scripts/423178-github-工具箱)
- [Bilibili](https://greasyfork.org/zh-CN/scripts/426198-bilibili-工具箱)
- [Tieba 签到](https://greasyfork.org/zh-CN/scripts/410874-百度贴吧签到)
- [宽屏](https://greasyfork.org/zh-CN/scripts/411260-网页宽屏)
- [蓝湖](https://greasyfork.org/zh-CN/scripts/411030-蓝湖-lanhu)
<!-- 弃用 -->
<!-- - [MDN Web Dosc 文档辅助](https://greasyfork.org/zh-CN/scripts/420958-mdn-文档辅助) -->
<!-- - [Element UI 文档辅助](https://greasyfork.org/zh-CN/scripts/418173-element-ui文档辅助) -->
<!-- - [View UI 文档辅助](https://greasyfork.org/zh-CN/scripts/417770-view-ui文档辅助) -->

你可以在 [这个分支](https://github.com/sakura-flutter/tampermonkey-scripts/tree/gh-pages) 查看所有脚本

## 运行

[Node](https://nodejs.org/en/) >= 22

```bash
pnpm install

# 监听并输出到 dist 目录
# 然后在油猴中引用本地路径 `// @require file://path/xx.js`
# 记得在浏览器扩展中设置允许本地脚本
pnpm run dev

# pnpm run serve 还有点问题

# 输出到 dist 目录
pnpm run build
```

## Thanks

[![JetBrains](https://avatars0.githubusercontent.com/u/878437?s=120&v=4)](https://www.jetbrains.com/?from=tampermonkey-scripts)
