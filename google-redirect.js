// ==UserScript==
// @name         谷歌重定向
// @version      1.0.0
// @description  hk -> jp
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-start
// @noframes
// @match        https://www.google.com.hk/search*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};


const url = new URL(location);
url.hostname = 'www.google.co.jp';
location.replace(url);
/******/ })()
;