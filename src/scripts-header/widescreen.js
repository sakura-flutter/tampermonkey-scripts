/* eslint-disable no-useless-escape */
/* @include 使用的是正则，模板里面用变量，避免变成字符串 */

module.exports = isProd =>
`// ==UserScript==
// @name         网页宽屏
// @version      2.5.2
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、搜狗搜索、segmentfault、哔哩哔哩、微博、豆瓣电影、今日头条、Google、CSDN
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-start
// @noframes
// @match        https://bcy.net/item/detail/*
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/follow
// @match        https://www.zhihu.com/hot*
// @match        https://www.zhihu.com/topic*
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.baidu.com/s?*
// @match        https://www.baidu.com/
// @match        https://www.baidu.com/?*
// @match        https://www.sogou.com/web*
// @match        https://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/f?*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://t.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://www.weibo.com/*
// @match        https://weibo.com/*
// @match        https://d.weibo.com/*
// @match        https://movie.douban.com/subject/*
// @match        https://movie.douban.com/review/*
// @match        https://www.toutiao.com/*
// @include      ${/^https:\/\/www\.google\.com?(.)*search/}
// @include      ${/^https:\/\/blog\.csdn\.net\/(\w|-)+\/article\/details\//}
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://cdn.jsdelivr.net/npm/vue@3/dist/vue.runtime.global${isProd ? '.prod' : ''}.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=876846
// ==/UserScript==
`
