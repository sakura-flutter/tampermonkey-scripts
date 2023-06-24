module.exports = isProd =>
`// ==UserScript==
// @name         Pixiv 工具箱
// @version      1.4.1
// @description  增强P站查看原图功能；显示原图尺寸
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://www.pixiv.net
// @match        https://www.pixiv.net/*
// @grant        window.onurlchange
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     viewerCSS https://unpkg.com/viewerjs@1/dist/viewer${isProd ? '.min' : ''}.css
// @require      https://unpkg.com/viewerjs@1/dist/viewer${isProd ? '.min' : ''}.js
// ==/UserScript==
`
