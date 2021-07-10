// ==UserScript==
// @name         bilibili 工具箱
// @version      1.2.0
// @description  将播放页中视频快捷键在整个页面上生效；长按 S 键倍速播放
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
// @grant        unsafeWindow
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/scripts/bilibili/speed.js

function speed() {
  longPress('KeyS', () => {
    const video = $('#bilibiliPlayer video');
    const oldPlaybackRate = video.playbackRate;
    video.playbackRate = 3;
    window.addEventListener('keyup', () => {
      video.playbackRate = oldPlaybackRate;
    }, {
      once: true
    });
  });
}
/**
 * 长按键盘
 * @param {string} code keyCode
 * @param {function} callback
 * @param {number} duration 长按时间
 */

function longPress(code, callback, duration = 350) {
  let timeoutID = null;
  window.addEventListener('keypress', event => {
    if (event.code === code && timeoutID) return;

    if (event.code !== code) {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }

      return;
    }

    timeoutID = setTimeout(() => {
      callback();
    }, duration);
    window.addEventListener('keyup', () => {
      clearTimeout(timeoutID);
      timeoutID = null;
    }, {
      once: true
    });
  });
}
;// CONCATENATED MODULE: ./src/scripts/bilibili/index.js

speed(); // 让视频的快捷键在整个页面上都生效，不局限于只能点击视频区域才能使用

function attachVideoShortcutKeysInPage() {
  // jsc-player:formatted 约 37833、38867 行，事件疑似经过 M.event 3023 行包装
  // 关键在于把 containerFocus 设为 true
  // 或调用 seekFromArrowLeft 等函数
  // fix: click 会在切换视频后失效，不知道为什么就是很奇怪😮，用 keydown 替代
  window.addEventListener('keydown', () => {
    const selectors = ['.bilibili-player-video-wrap', // 视频
    '.bpx-player-sending-area' // 番剧
    ]; // 用第一种方式简单点

    unsafeWindow.$(selectors.join()).trigger('click.bilibiliplayer');
  }, true);
}

attachVideoShortcutKeysInPage();
/******/ })()
;