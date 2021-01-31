// ==UserScript==
// @name         MDN 文档辅助
// @version      1.0.0
// @description  在提供切换中文语言的页面自动切换为中文
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://developer.mozilla.org/*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/utils/selector.js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/log.js
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn(...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/scripts/mdn-web-docs/index.js



function main() {
  window.addEventListener('click', event => {
    // 标记是否自行切换语言
    if (event.target === $('.language-menu button[type="submit"]')) {
      sessionStorage.setItem('hand-control-language', true);
    }
  }, true);
  const docsLang = matchLang(location.pathname);
  warn(docsLang);
  if (isChinese(docsLang)) return; // 是否自行切换过语言

  if (sessionStorage.getItem('hand-control-language') === 'true') return;
  const supports = getSupports();
  warn(supports);

  for (const item of supports) {
    isChinese(matchLang(item)) && location.replace(item);
  }
}

function matchLang(str) {
  // 匹配 pathname 或字符串
  // /en-US/docs/Web/API/ 或 en-us
  return str.match(/^\/?([\w-]+)/)?.[1];
}

function isChinese(lang) {
  return /zh-cn/i.test(lang);
}

function getSupports() {
  return [...$('#select_language').options].map(opt => opt.value);
}

main();
/******/ })()
;