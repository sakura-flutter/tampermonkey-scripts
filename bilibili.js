// ==UserScript==
// @name         bilibili 工具箱
// @version      1.5.0
// @description  长按 S 键倍速播放
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
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
    const video = $('#bilibili-player video') || $('#bilibili-player bwp-video');
    const oldPlaybackRate = video.playbackRate;
    video.playbackRate = 6;
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

speed();
/******/ })()
;