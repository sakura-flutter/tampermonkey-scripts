module.exports = isProd =>
`// ==UserScript==
// @name         redirect 自动跳转到目标链接
// @version      1.7.0
// @description  自动跳转(重定向)到目标链接，免去点击步骤。适配了简书、知乎、微博、QQ邮箱、QQPC、印象笔记、贴吧、CSDN、YouTube、微信
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome >= Latest
// @compatible   firefox >= Latest
// @run-at       document-start
// @match        *://www.jianshu.com/go-wild*
// @match        *://link.zhihu.com/*
// @match        *://t.cn/*
// @match        *://mail.qq.com/cgi-bin/*
// @match        *://c.pc.qq.com/middlem.html*
// @match        *://app.yinxiang.com/OutboundRedirect.action*
// @match        *://jump2.bdimg.com/safecheck/*
// @match        *://link.csdn.net/*
// @match        *://www.youtube.com/redirect*
// @match        *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi*
// ==/UserScript==
`
