// ==UserScript==
// @name         谷歌重定向
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.0.0
// @author       sakura-flutter
// @description  hk -> jp
// @license      MIT
// @match        https://www.google.com.hk/search*
// @run-at       document-start
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var url = new URL(location.href);
	url.hostname = "www.google.co.jp";
	location.replace(url);
})();
