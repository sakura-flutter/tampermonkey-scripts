module.exports = (isProd, depsVersion) =>
`// ==UserScript==
// @name         百度贴吧签到
// @version      3.4.4
// @description  网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-end
// @match        https://tieba.baidu.com/index.html
// @match        https://tieba.baidu.com/
// @connect      tieba.baidu.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @require      https://unpkg.com/crypto-js@${depsVersion['crypto-js']}/core.js
// @require      https://unpkg.com/crypto-js@${depsVersion['crypto-js']}/md5.js
// @require      https://unpkg.com/vue@${depsVersion.vue}/dist/vue.runtime.global${isProd ? '.prod' : ''}.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=1081231
// ==/UserScript==
`
