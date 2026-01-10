// ==UserScript==
// @name         视频倍速播放
// @version      1.0.0
// @description  长按 [0、`(反引号键)] 键 3 倍速，双击长按 6 倍速。适配了哔哩哔哩、抖音、小红书、知乎、极客时间、YouTube、爱奇艺、优酷、PPTV、芒果TV、乐视视频、搜狐视频、咪咕视频
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @match        *://www.bilibili.com/*
// @match        *://www.douyin.com/*
// @match        *://www.xiaohongshu.com/*
// @match        *://www.zhihu.com/*
// @match        *://time.geekbang.org/*
// @match        *://www.youtube.com/*
// @match        *://www.iqiyi.com/*
// @match        *://www.youku.com/*
// @match        *://v.youku.com/*
// @match        *://www.pptv.com/*
// @match        *://v.pptv.com/*
// @match        *://www.mgtv.com/*
// @match        *://tv.le.com/*
// @match        *://www.le.com/*
// @match        *://tv.sohu.com/*
// @match        *://www.miguvideo.com/*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/playback-rate/multi-press.ts
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// =====================================================
// Name: 多击键盘事件
// Author: AI
// =====================================================

/**
 * 多击长按事件配置
 */

/**
 * 多击长按事件详情
 */

/**
 * 事件回调函数类型
 */

/**
 * 多击长按键盘事件处理器
 *
 * 功能特点：
 * - 支持单次、两次、三次、四次等任意多击检测
 * - 支持长按检测（按下后持续一段时间）
 * - 支持双击长按、三击长按等组合模式
 * - 可配置时间阈值
 * - 支持长按期间重复触发
 *
 * @example
 * ```typescript
 * // 创建处理器
 * const handler = new MultiPress({
 *   pressInterval: 300,      // 多击间隔 300ms
 *   longPressThreshold: 500, // 长按阈值 500ms
 *   enableRepeat: true,      // 启用重复触发
 *   repeatInterval: 100      // 每 100ms 重复一次
 * });
 *
 * // 监听单击长按（按一次并长按）
 * handler.on('Space', 1, (event) => {
 *   console.log('空格单击长按', event.pressDuration);
 * });
 *
 * // 监听双击长按（按两次后第二次长按）
 * handler.on('Enter', 2, (event) => {
 *   console.log('回车双击长按', event.pressCount);
 * });
 *
 * // 监听三击长按
 * handler.on('ArrowUp', 3, (event) => {
 *   console.log('上箭头三击长按');
 * });
 *
 * // 启动监听
 * handler.start();
 *
 * // 停止监听
 * handler.stop();
 * ```
 */
class MultiPress {
  constructor(config) {
    _defineProperty(this, "config", void 0);

    _defineProperty(this, "listeners", void 0);

    _defineProperty(this, "keyStates", void 0);

    _defineProperty(this, "isActive", void 0);

    _defineProperty(this, "boundKeyDown", void 0);

    _defineProperty(this, "boundKeyUp", void 0);

    const defaultConfig = {
      pressInterval: 150,
      longPressThreshold: 350,
      enableRepeat: false,
      repeatInterval: 100
    };
    this.config = { ...defaultConfig,
      ...config
    };
    this.listeners = new Map();
    this.keyStates = new Map();
    this.isActive = false;
    this.boundKeyDown = this.handleKeyDown.bind(this);
    this.boundKeyUp = this.handleKeyUp.bind(this);
  }
  /**
   * 注册事件监听器
   * @param key 按键代码（如 'Space', 'Enter', 'a', 'A', 'ArrowUp' 等）
   * @param pressCount 按键次数（1=单次, 2=两次, 3=三次, ...）
   * @param callback 回调函数
   */


  on(key, pressCount, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Map());
    }

    const keyListeners = this.listeners.get(key);

    if (!keyListeners.has(pressCount)) {
      keyListeners.set(pressCount, []);
    }

    keyListeners.get(pressCount).push(callback);
  }
  /**
   * 移除事件监听器
   * @param key 按键代码
   * @param pressCount 按键次数
   * @param callback 要移除的回调函数（可选，不传则移除该按键和按键次数的所有监听器）
   */


  off(key, pressCount, callback) {
    if (!this.listeners.has(key)) return;
    const keyListeners = this.listeners.get(key);

    if (pressCount === undefined) {
      // 移除该按键的所有监听器
      this.listeners.delete(key);
      return;
    }

    if (!keyListeners.has(pressCount)) return;

    if (callback === undefined) {
      // 移除该按键和按键次数的所有监听器
      keyListeners.delete(pressCount);
    } else {
      // 移除特定回调
      const callbacks = keyListeners.get(pressCount);
      const index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }

      if (callbacks.length === 0) {
        keyListeners.delete(pressCount);
      }
    }

    if (keyListeners.size === 0) {
      this.listeners.delete(key);
    }
  }
  /**
   * 获取当前配置
   */


  getConfig() {
    return { ...this.config
    };
  }
  /**
   * 更新配置
   */


  updateConfig(config) {
    this.config = { ...this.config,
      ...config
    };
  }
  /**
   * 启动键盘事件监听
   */


  start() {
    if (this.isActive) return;
    this.isActive = true;
    window.addEventListener('keydown', this.boundKeyDown, true);
    window.addEventListener('keyup', this.boundKeyUp, true);
  }
  /**
   * 停止键盘事件监听
   */


  stop() {
    if (!this.isActive) return;
    this.isActive = false;
    window.removeEventListener('keydown', this.boundKeyDown, true);
    window.removeEventListener('keyup', this.boundKeyUp, true);
    this.clearAllTimers();
  }
  /**
   * 销毁处理器，清理所有资源
   */


  destroy() {
    this.stop();
    this.listeners.clear();
    this.keyStates.clear();
  }

  handleKeyDown(event) {
    const key = event.key; // 避免重复触发（按住不放）

    if (event.repeat) return;
    const now = Date.now();
    let state = this.keyStates.get(key);

    if (!state) {
      state = {
        pressCount: 0,
        lastKeyDownTime: 0,
        lastKeyUpTime: 0,
        longPressTimer: null,
        repeatTimer: null,
        pressResetTimer: null,
        pressTriggerTimer: null,
        isLongPressing: false,
        pressStartTime: 0,
        lastEvent: null
      };
      this.keyStates.set(key, state);
    } // 判断是否为连续点击


    const timeSinceLastUp = now - state.lastKeyUpTime;

    if (timeSinceLastUp <= this.config.pressInterval && state.lastKeyUpTime > 0) {
      // 连续点击，增加计数
      state.pressCount++;
    } else {
      // 新的点击序列
      state.pressCount = 1;
    }

    state.lastKeyDownTime = now;
    state.pressStartTime = now;
    state.isLongPressing = false;
    state.lastEvent = event; // 清除之前的定时器（包括按键触发定时器）

    this.clearTimers(state);

    if (state.pressTriggerTimer !== null) {
      clearTimeout(state.pressTriggerTimer);
      state.pressTriggerTimer = null;
    } // 设置长按检测定时器


    state.longPressTimer = window.setTimeout(() => {
      state.isLongPressing = true;
      this.triggerEvent(key, state.pressCount, true, event, now); // 如果启用重复触发

      if (this.config.enableRepeat) {
        state.repeatTimer = window.setInterval(() => {
          if (state.isLongPressing) {
            this.triggerEvent(key, state.pressCount, true, event, state.pressStartTime);
          }
        }, this.config.repeatInterval);
      }
    }, this.config.longPressThreshold);
  }

  handleKeyUp(event) {
    const key = event.key;
    const state = this.keyStates.get(key);
    if (!state) return;
    const now = Date.now();
    state.lastKeyUpTime = now; // 清除长按和重复定时器

    this.clearTimers(state); // 如果没有触发长按，需要延迟触发以等待可能的后续点击

    if (!state.isLongPressing) {
      // 清除之前的延迟触发定时器
      if (state.pressTriggerTimer !== null) {
        clearTimeout(state.pressTriggerTimer);
        state.pressTriggerTimer = null;
      } // 保存当前的 pressCount 和 event


      const currentPressCount = state.pressCount;
      const currentEvent = state.lastEvent || event; // 设置延迟触发定时器，等待 pressInterval 时间
      // 如果在这个时间内没有新的点击，则触发当前次数的回调

      state.pressTriggerTimer = window.setTimeout(() => {
        // 触发当前点击次数的事件
        this.triggerEvent(key, currentPressCount, false, currentEvent); // 重置按键计数

        state.pressCount = 0;
        state.pressTriggerTimer = null;
      }, this.config.pressInterval);
    } else {
      // 如果已经触发长按，只需要重置状态
      state.isLongPressing = false; // 设置按键计数重置定时器

      state.pressResetTimer = window.setTimeout(() => {
        state.pressCount = 0;
      }, this.config.pressInterval);
    }
  }

  triggerEvent(key, pressCount, isLongPress, originalEvent, pressStartTime) {
    const keyListeners = this.listeners.get(key);
    if (!keyListeners) return;
    const callbacks = keyListeners.get(pressCount);
    if (!callbacks || callbacks.length === 0) return;
    const eventDetail = {
      key,
      pressCount,
      isLongPress,
      pressDuration: pressStartTime ? Date.now() - pressStartTime : undefined,
      originalEvent
    };
    callbacks.forEach(callback => {
      try {
        callback(eventDetail);
      } catch (error) {
        console.error('MultiPress callback error:', error);
      }
    });
  }

  clearTimers(state) {
    if (state.longPressTimer !== null) {
      clearTimeout(state.longPressTimer);
      state.longPressTimer = null;
    }

    if (state.repeatTimer !== null) {
      clearInterval(state.repeatTimer);
      state.repeatTimer = null;
    }
  }

  clearAllTimers() {
    this.keyStates.forEach(state => {
      this.clearTimers(state);

      if (state.pressResetTimer !== null) {
        clearTimeout(state.pressResetTimer);
        state.pressResetTimer = null;
      }

      if (state.pressTriggerTimer !== null) {
        clearTimeout(state.pressTriggerTimer);
        state.pressTriggerTimer = null;
      }
    });
  }

}
/**
 * 便捷工厂函数
 */

function createMultiPress(config) {
  return new MultiPress(config);
}
;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/log.ts
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


;// CONCATENATED MODULE: ./src/scripts/playback-rate/utils.ts


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
  const dy = videoCenterY - viewportCenterY; // 这里不需要 `Math.sqrt` 开根号，避免计算开销，比较时平方距离也是有效的

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
    } // 优先级 2 音频状态：非静音优先


    const audibleA = isAudible(a);
    const audibleB = isAudible(b);

    if (audibleA !== audibleB) {
      return audibleA ? -1 : 1;
    }

    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect(); // 优先级 3 元素大小：大尺寸优先

    const sizeA = rectA.width * rectA.height;
    const sizeB = rectB.width * rectB.height; // 允许 100 像素的误差视为相等，或者直接比较

    if (sizeA !== sizeB) {
      return sizeB - sizeA;
    } // 优先级 4 视口距离：距离视口中心越近越优先 (距离越小越好)


    const distA = getDistanceFromViewportCenter(rectA);
    const distB = getDistanceFromViewportCenter(rectB);
    return distA - distB;
  });
  warn(videos); // 返回排序后的第一个元素，即最优匹配

  return videos[0] ?? null;
}
;// CONCATENATED MODULE: ./src/scripts/playback-rate/index.ts
function playback_rate_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // 由于 sohu 阻止了键盘事件，需要在捕获阶段监听
// eslint-disable-next-line no-new

new class PlaybackRateController {
  /** 触发按键 */

  /** 按键次数 -> 倍速 映射 */

  /** 是否正在加速播放 */
  constructor() {
    playback_rate_defineProperty(this, "triggerKeys", ['`', '0']);

    playback_rate_defineProperty(this, "rateMap", {
      1: 3,
      2: 6,
      3: 9
    });

    playback_rate_defineProperty(this, "isBoosting", false);

    playback_rate_defineProperty(this, "multiPress", createMultiPress());

    this.init();
  }

  init() {
    const changeHandler = this.handleChange.bind(this);

    for (const triggerKey of this.triggerKeys) {
      for (const pressCount of Object.keys(this.rateMap)) {
        this.multiPress.on(triggerKey, Number(pressCount), changeHandler);
      }
    }

    this.multiPress.start();
  }

  handleChange(event) {
    if (this.isBoosting || !event.isLongPress) return;
    const video = findBestVideoElement();
    if (!video) return;
    this.isBoosting = true;
    const oldPlaybackRate = video.playbackRate;
    video.playbackRate = this.rateMap[event.pressCount] ?? oldPlaybackRate;
    const controller = new AbortController();
    window.addEventListener('keyup', keyupEvent => {
      if (keyupEvent.key === event.key) {
        controller.abort();
        video.playbackRate = oldPlaybackRate;
        this.isBoosting = false;
      }
    }, {
      capture: true,
      signal: controller.signal
    });
  }

  destroy() {
    this.multiPress.stop();
  }

}();
/******/ })()
;