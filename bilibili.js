// ==UserScript==
// @name         bilibili 工具箱
// @version      1.0.3
// @description  将播放页中视频快捷键在整个页面上生效
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://www.bilibili.com/video/*
// @grant        unsafeWindow
// ==/UserScript==

/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// 让视频的快捷键在整个页面上都生效，不局限于只能点击视频区域才能使用
function attachVideoShortcutKeysInPage() {
  // jsc-player:formatted 约 37833、38867 行，事件疑似经过 M.event 3023 行包装
  // 关键在于把 containerFocus 设为 true
  // 或调用 seekFromArrowLeft 等函数
  // fix: click 会在切换视频后失效，不知道为什么就是很奇怪😮，用 keydown 替代
  window.addEventListener('keydown', () => {
    // 用第一种方式简单点
    unsafeWindow.$('.bilibili-player-video-wrap').trigger('click.bilibiliplayer');
  }, true);
}

attachVideoShortcutKeysInPage();
/******/ })()
;