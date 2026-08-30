// ==UserScript==
// @name         Dark Mode 暗黑模式
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      0.0.1
// @author       sakura-flutter
// @description  将网页变更为暗黑显示，不适合有背景图的网站
// @license      MIT
// @match        *://*/*
// @grant        GM_addStyle
// @run-at       document-start
// @compatible   chrome >= Latest
// @compatible   firefox >= Latest
// ==/UserScript==

(function() {
	"use strict"((() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)())(`
  html {
    filter: invert(1) hue-rotate(180deg);
    background: #fff !important;
  }

  html img,
  html video {
    filter: invert(1) hue-rotate(180deg);
  }
`);
})();
