// ==UserScript==
// @name         bilibili 工具箱
// @version      1.6.0
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

;// ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// ./src/utils/log.ts
const isDebug = "production" !== 'production';
function warn(...args) {
  isDebug && warn.force(...args);
}
warn.force = function (...args) {
  console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args);
};
function error(...args) {
  isDebug && error.force(...args);
}
error.force = function (...args) {
  console.error('%c      error      ', 'background: red; padding: 1px; color: #fff;', ...args);
};
function table(...args) {
  isDebug && console.table(...args);
}

;// ./src/scripts/playback-rate/utils.ts



/** 判断视频是否正在播放 */
function isPlaying(video) {
  return !video.paused && !video.ended;
}

/** 判断视频是否有声音（非静音） */
function isAudible(video) {
  return !video.muted && video.volume > 0;
}

/** 计算矩形中心到视口中心的距离 */
function getDistanceFromViewportCenter(rect) {
  const viewportCenterX = window.innerWidth / 2;
  const viewportCenterY = window.innerHeight / 2;
  const videoCenterX = rect.left + rect.width / 2;
  const videoCenterY = rect.top + rect.height / 2;
  const dx = videoCenterX - viewportCenterX;
  const dy = videoCenterY - viewportCenterY;
  // 这里不需要 `Math.sqrt` 开根号，避免计算开销，比较时平方距离也是有效的
  return dx * dx + dy * dy;
}

/**
 * 查找页面中最符合条件的视频元素
 *
 * 多个视频元素时的权重优先级：
 * 1. 播放状态 (播放中 > 其他)：只有播放中才需要倍速
 * 2. 音频状态 (有声 > 静音)：如果有多个视频同时播放，优先处理有声音的，因为静音的通常是广告或背景视频，
 * 理想情况下不会出现多个有声音的视频同时播放
 * 3. 元素大小 (大 > 小)：大尺寸的视频通常是主要内容，虽然背景视频尺寸可能更大但通常都是静音的
 * 4. 视口距离 (距离视口中心近 > 远)：短视频或信息流页面可滚动时，优先处理视口中心附近的视频
 */
function findBestVideoElement() {
  // 获取页面所有 video 元素
  const videos = Array.from($$('video'));
  if (videos.length === 0) {
    warn('视频元素为空');
    return null;
  }
  videos.sort((a, b) => {
    // 优先级 1 播放状态：播放中优先
    const playingA = isPlaying(a);
    const playingB = isPlaying(b);
    if (playingA !== playingB) {
      return playingA ? -1 : 1;
    }

    // 优先级 2 音频状态：非静音优先
    const audibleA = isAudible(a);
    const audibleB = isAudible(b);
    if (audibleA !== audibleB) {
      return audibleA ? -1 : 1;
    }
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();

    // 优先级 3 元素大小：大尺寸优先
    const sizeA = rectA.width * rectA.height;
    const sizeB = rectB.width * rectB.height;
    // 允许 100 像素的误差视为相等，或者直接比较
    if (sizeA !== sizeB) {
      return sizeB - sizeA;
    }

    // 优先级 4 视口距离：距离视口中心越近越优先 (距离越小越好)
    const distA = getDistanceFromViewportCenter(rectA);
    const distB = getDistanceFromViewportCenter(rectB);
    return distA - distB;
  });
  warn(videos);

  // 返回排序后的第一个元素，即最优匹配
  return videos[0] ?? null;
}
;// ./src/scripts/bilibili/speed.ts

function speed() {
  longPress('KeyS', () => {
    const video = findBestVideoElement();
    if (!video) return;
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
 * @param code keyCode
 * @param callback
 * @param duration 长按时间
 */
function longPress(code, callback, duration = 350) {
  let timeoutID;
  window.addEventListener('keydown', event => {
    if (event.code === code && timeoutID) return;
    if (event.code !== code) {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = undefined;
      }
      return;
    }
    timeoutID = setTimeout(() => {
      callback();
    }, duration);
    window.addEventListener('keyup', () => {
      clearTimeout(timeoutID);
      timeoutID = undefined;
    }, {
      once: true
    });
  });
}
;// ./src/scripts/bilibili/index.ts

speed();
/******/ })()
;