// ==UserScript==
// @name         GitHub 工具箱
// @name:en      GitHub ToolBox
// @version      1.0.0
// @description  添加用VS Code阅读代码按钮(github1s)
// @description:en  Read code with VS Code(github1s)
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      MIT
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @grant        window.onurlchange
// @match        https://github.com/*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/scripts/github/index.js


function insert1sButton() {
  const actions = $('.pagehead-actions');
  if (actions == null || $('#github1s-button')) return;
  const btnHTML = '<li><a id="github1s-button" class="btn btn-sm" target="_blank">Github1s</a></li>';
  actions.insertAdjacentHTML('afterBegin', btnHTML);

  $('#github1s-button').onmouseenter = function () {
    const github1sURL = new URL(location);
    github1sURL.host = 'github1s.com';
    this.href = github1sURL.href;
  };
}

insert1sButton();
window.addEventListener('urlchange', info => {
  setTimeout(insert1sButton, 200);
});
/******/ })()
;