// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default isProd =>
  `// ==UserScript==
// @name         Dark Mode 暗黑模式
// @version      0.0.1
// @description  将网页变更为暗黑显示，不适合有背景图的网站
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      MIT
// @compatible   chrome >= Latest
// @compatible   firefox >= Latest
// @run-at       document-start
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==
`
