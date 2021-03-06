// ==UserScript==
// @name         MDN 文档辅助
// @version      1.1.0
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
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/log.ts
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn(...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/scripts/mdn-web-docs/index.js


const docsLang = matchLang(location.pathname);
const supports = getSupports();
warn(docsLang);
warn(supports);

function main() {
  window.addEventListener('click', event => {
    // 标记是否自行切换语言
    if (event.target === $('.language-menu button[type="submit"]')) {
      sessionStorage.setItem('hand-control-language', true);
    }
  }, true);
  changeLang();
  addLangButton();
}

function changeLang() {
  if (isChinese(docsLang)) return; // 是否自行切换过语言

  if (sessionStorage.getItem('hand-control-language') === 'true') return;

  for (const item of supports) {
    isChinese(matchLang(item)) && location.replace(item);
  }
}

function addLangButton() {
  const values = []; // 中英 排序

  for (const item of supports) {
    const lang = matchLang(item);

    if (isChinese(lang)) {
      values[0] = item;
    } else if (isEnglish(lang)) {
      values[1] = item;
    }
  }

  warn(values);
  if (values.length < 2) return;
  const a = document.createElement('a');
  a.innerText = '中-英';
  a.href = isChinese(docsLang) ? values[1] : values[0];
  a.classList.add('button');
  a.style = ['position: fixed', 'right: 0', 'bottom: 15vh', 'min-height: auto', 'padding: 0px 2px', 'font-size: 12px', 'letter-spacing: 2px'].join(';');

  a.onclick = function () {
    sessionStorage.setItem('hand-control-language', true);
  };

  document.body.append(a);
}

function matchLang(str) {
  // 匹配 pathname 或字符串
  // /en-US/docs/Web/API/ 或 en-us
  return str.match(/^\/?([\w-]+)/)?.[1];
}

function isChinese(lang) {
  return /zh-cn/i.test(lang);
}

function isEnglish(lang) {
  return /en-US/i.test(lang);
}

function getSupports() {
  return [...$('#language-selector').options].map(opt => opt.value);
}

main();
/******/ })()
;