module.exports = (isProd, depsVersion) =>
`// ==UserScript==
// @name         蓝湖 工具箱
// @version      1.12.0
// @description  自动填充填写过的产品密码(不是蓝湖账户)；快捷查看打开过的项目
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://lanhuapp.com/web/
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require      https://cdn.jsdelivr.net/npm/vue@${depsVersion.vue}/dist/vue.runtime.global${isProd ? '.prod' : ''}.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=1081231
// ==/UserScript==
`
