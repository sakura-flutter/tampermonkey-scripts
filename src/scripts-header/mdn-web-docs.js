module.exports = isProd =>
`// ==UserScript==
// @name         MDN 文档辅助
// @version      2.0.0
// @description  在提供中文语言的页面自动切换为中文
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @grant        window.onurlchange
// @match        https://developer.mozilla.org/*
// ==/UserScript==
`
