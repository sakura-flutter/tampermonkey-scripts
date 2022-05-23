# tampermonkey-scripts

<img src="https://img.shields.io/badge/Firefox-Latest-brightgreen?style=flat-square" alt="Firefox version"> <img src="https://img.shields.io/badge/Edge-Latest-brightgreen?style=flat-square" alt="Firefox version"> <img src="https://img.shields.io/badge/Chrome-Latest-brightgreen?style=flat-square" alt="Chrome version">

仅在最新版上通过，如果使用其它浏览器**必须要保证 Chromium 版本 100 +**

## 使用

1. 先在浏览器商店安装 Tampermonkey 扩展（链接：[Firefox](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/), [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd), [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)）
2. 然后在下面脚本中选择需要的进行安装

### 脚本

详细说明点击查看

- [宽屏](https://greasyfork.org/zh-CN/scripts/411260-网页宽屏)
- [tieba 签到](https://greasyfork.org/zh-CN/scripts/410874-百度贴吧签到)
- [重定向](https://greasyfork.org/zh-CN/scripts/416338-redirect-外链跳转)
- [Pixiv](https://greasyfork.org/zh-CN/scripts/419761-pixiv-工具箱)
- [Github](https://greasyfork.org/zh-CN/scripts/423178-github-工具箱)
- [蓝湖](https://greasyfork.org/zh-CN/scripts/411030-蓝湖-lanhu)
- [MDN Web Dosc 文档辅助](https://greasyfork.org/zh-CN/scripts/420958-mdn-文档辅助)
- [Element UI 文档辅助](https://greasyfork.org/zh-CN/scripts/418173-element-ui文档辅助)
- [View UI 文档辅助](https://greasyfork.org/zh-CN/scripts/417770-view-ui文档辅助)

你可以在[这个分支](https://github.com/sakura-flutter/tampermonkey-scripts/tree/gh-pages)查看所有脚本

## 运行

建议在 [Node](https://nodejs.org/en/) >= 16 版本上进行

```bash
npm install

npm run serve
// 或者（输出到dist目录）
// npm run dev

// 输出到dist目录
npm run build
```

## Thanks

[![JetBrains](https://avatars0.githubusercontent.com/u/878437?s=120&v=4)](https://www.jetbrains.com/?from=tampermonkey-scripts)
