module.exports = isProd =>
`// ==UserScript==
// @name         View UI v4 文档辅助
// @version      1.0.5
// @description  (原iView)隐藏文档中菜单项：Pro、物料
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @match        *://v4.iviewui.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://unpkg.com/vue@3/dist/vue.runtime.global${isProd ? '.prod.min' : ''}.js
// ==/UserScript==
`
