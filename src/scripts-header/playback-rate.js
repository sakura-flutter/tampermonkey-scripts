// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default isProd =>
  `// ==UserScript==
// @name         视频倍速播放快捷键
// @version      2.0.0
// @description  为网页视频添加统一的倍速播放快捷键：→ 方向键点按快进、长按倍速，← 方向键后退；长按 3 倍速，双击长按 6 倍速。适配了哔哩哔哩、抖音、小红书、知乎、微博、极客时间、YouTube、腾讯视频、爱奇艺、优酷、PPTV、芒果TV、乐视视频、搜狐视频、咪咕视频、今日头条
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @run-at       document-start
// @match        *://www.bilibili.com/*
// @match        *://www.douyin.com/*
// @match        *://www.xiaohongshu.com/*
// @match        *://www.zhihu.com/*
// @match        *://*.weibo.com/*
// @match        *://time.geekbang.org/*
// @match        *://www.youtube.com/*
// @match        *://v.qq.com/*
// @match        *://www.iqiyi.com/*
// @match        *://www.youku.com/*
// @match        *://v.youku.com/*
// @match        *://www.pptv.com/*
// @match        *://v.pptv.com/*
// @match        *://www.mgtv.com/*
// @match        *://tv.le.com/*
// @match        *://www.le.com/*
// @match        *://tv.sohu.com/*
// @match        *://www.miguvideo.com/*
// @match        *://www.toutiao.com/*
// ==/UserScript==
`
