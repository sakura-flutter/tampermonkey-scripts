module.exports = isProd =>
`// ==UserScript==
// @name         redirect 外链跳转
// @version      1.28.0
// @description  自动跳转(重定向)到目标链接，免去点击步骤。适配了简书、知乎、微博、QQ邮箱、QQPC、印象笔记、贴吧、CSDN、YouTube、微信、微信开放社区、开发者知识库、豆瓣、个人图书馆、Pixiv、搜狗、Google、站长之家、OSCHINA、掘金、腾讯文档、pc6下载站、爱发电、Gitee、天眼查、爱企查、企查查、优设网、51CTO、力扣
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-start
// @match        *://www.jianshu.com/go-wild*
// @match        *://link.zhihu.com/*
// @match        *://t.cn/*
// @match        *://weibo.cn/sinaurl*
// @match        *://mail.qq.com/cgi-bin/*
// @match        *://c.pc.qq.com/middlem.html*
// @match        *://app.yinxiang.com/OutboundRedirect.action*
// @match        *://jump.bdimg.com/safecheck/*
// @match        *://jump2.bdimg.com/safecheck/*
// @match        *://link.csdn.net/*
// @match        *://www.youtube.com/redirect*
// @match        *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi*
// @match        *://developers.weixin.qq.com/community/middlepage/href*
// @match        *://www.itdaan.com/link/*
// @match        *://www.douban.com/link2/*
// @match        *://www.360doc.com/content/*
// @match        *://www.pixiv.net/jump.php*
// @match        *://m.sogou.com/*/tc*
// @match        *://m.sogou.com*/tc*
// @match        *://www.chinaz.com/go.shtml*
// @match        *://www.oschina.net/action/GoToLink*
// @match        *://link.juejin.cn/*
// @match        *://docs.qq.com/scenario/link.html*
// @match        *://www.pc6.com/goread.html*
// @match        *://afdian.net/link*
// @match        *://gitee.com/link*
// @match        *://www.tianyancha.com/security*
// @match        *://aiqicha.baidu.com/safetip*
// @match        *://www.qcc.com/web/transfer-link*
// @match        *://link.uisdc.com/*
// @match        *://blog.51cto.com/transfer*
// @match        *://leetcode.cn/link*
// @include      ${/^https?:\/\/www\.google\..{2,7}url/}
// ==/UserScript==
`
