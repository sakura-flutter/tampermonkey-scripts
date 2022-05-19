// ==UserScript==
// @name         MDN 文档辅助
// @version      2.3.0
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

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 829:
/***/ (() => {

const stylesheet = `
/* 让搜索框一直展开 */
@media screen and (min-width: 1220px) {
  .header-search .search-input-field {
    width: inherit !important;
  }
}
`;
const style = document.createElement('style');
style.appendChild(document.createTextNode(stylesheet));
document.head.appendChild(style);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/log.ts
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/scripts/mdn-web-docs/utils.js

function matchLang(str) {
  // 匹配 pathname 或字符串
  // /en-US/docs/Web/API/ 或 en-US
  return str.match(/^\/?([\w-]+)/)?.[1];
}
function isChinese(lang) {
  return /zh-CN/i.test(lang);
}
function isEnglish(lang) {
  return /en-US/i.test(lang);
}
/**
 * 需要点击菜单才能获取支持的语言
 * 切换语言后菜单会自动关闭
 * callback 返回一个布尔确认操作完后是否自动关闭
 */

async function getLangMenus(callback) {
  const toggle = $('button.languages-switcher-menu'); // 存在没有翻译的情况

  if (toggle == null) return [];
  toggle.click(); // fix: 新版又被 mdn 改掉了，不知道为什么要放在 task 才能获取到 buttons
  // 理论上派发事件后所有监听该事件的事件处理方法是立即同步调用执行的
  // 变为 microtask 的前提是调用栈必须是 0，只有浏览器原生事件才符合
  // 大概或许可能是 mdn 做了一些操作
  // 由于需要改为 task，调用这个函数都要更改

  await Promise.resolve(); // 不要返回 NodeList，和空时返回同样的类型

  const buttons = [...$$('.language-menu button[name]')];
  const off = callback?.(buttons) ?? true;
  off && toggle.click();
  return buttons;
}
async function getSupports() {
  const langs = (await getLangMenus()).map(button => button.getAttribute('name'));
  return langs;
}
// EXTERNAL MODULE: ./src/scripts/mdn-web-docs/style.js
var style = __webpack_require__(829);
;// CONCATENATED MODULE: ./src/scripts/mdn-web-docs/index.js




let docsLang = matchLang(location.pathname);
let supports = [];

async function main() {
  supports = await getSupports();
  warn(docsLang);
  warn(supports);
  if (!supports.length) return;
  window.addEventListener('urlchange', () => {
    docsLang = matchLang(location.pathname);
  });
  window.addEventListener('click', function listener(event) {
    if (!event.isTrusted) return;
    const isInLangMenu = $('.languages-switcher-menu .language-menu')?.contains(event.target);

    if (isInLangMenu) {
      // 标记自行切换语言
      sessionStorage.setItem('hand-control-language', true);
      window.removeEventListener('click', listener, true);
    }
  }, true);
  setLocale();
  addLangButton();
}

function setLocale() {
  if (isChinese(docsLang)) return; // 是否自行切换过语言

  if (sessionStorage.getItem('hand-control-language') === 'true') return;

  for (const item of supports) {
    isChinese(matchLang(item)) && selectLang(item);
  }
}

function selectLang(value) {
  getLangMenus(buttons => {
    for (const button of buttons) {
      if (button.getAttribute('name') === value) {
        button.click();
        return false;
      }
    }
  });
}

function addLangButton() {
  const values = []; // [0]中 [1]英 排序

  for (const item of supports) {
    const lang = matchLang(item);

    if (isChinese(lang)) {
      values[0] = item;
    } else if (isEnglish(lang)) {
      values[1] = item;
    }
  }

  if (isChinese(docsLang)) values[0] = docsLang;
  if (isEnglish(docsLang)) values[1] = docsLang;
  warn(values);
  if (values.filter(Boolean).length < 2) return; // bug: 会出现一种进来时有翻译，换了另一篇后没翻译，这时按钮仍然显示的问题

  const button = document.createElement('button');
  button.innerText = '中-英';
  button.classList.add('button');
  button.classList.add('action');
  button.style.cssText = ['position: fixed', 'right: 0', 'bottom: 15vh', 'line-height: 2em', 'padding: 2px 10px', 'font-size: 12px', 'letter-spacing: 2px', 'border: 1px solid var(--border-secondary)', 'background-color: var(--button-bg)', 'box-shadow: var(--shadow-01)'].join(';');

  button.onclick = function () {
    sessionStorage.setItem('hand-control-language', true);
    selectLang(isChinese(docsLang) ? values[1] : values[0]);
  };

  document.body.append(button);
}

main();
})();

/******/ })()
;