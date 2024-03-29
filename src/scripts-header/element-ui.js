module.exports = isProd =>
`// ==UserScript==
// @name         Element UI文档辅助
// @version      1.0.4
// @description  在Element UI文档中增加示例目录导航，同时支持v2与v3(element-plus)版本，类似于Ant右侧悬浮的导航
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @match        https://element-plus.gitee.io/*
// @match        https://element-plus.org/*
// @match        https://element.eleme.cn/*
// @match        https://element.eleme.io/*
// @require      https://unpkg.com/vue@3/dist/vue.runtime.global${isProd ? '.prod.min' : ''}.js
// ==/UserScript==
`
