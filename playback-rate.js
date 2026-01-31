// ==UserScript==
// @name         视频倍速播放快捷键
// @version      2.0.0
// @description  为网页视频添加统一的倍速播放快捷键：→ 方向键点按快进、长按倍速，← 方向键后退；长按 3 倍速，双击长按 6 倍速。适配了哔哩哔哩、抖音、小红书、知乎、微博、极客时间、YouTube、腾讯视频、爱奇艺、优酷、PPTV、芒果TV、乐视视频、搜狐视频、咪咕视频、今日头条
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @run-at       document-start
// @match        *://www.bilibili.com/*
// @match        *://www.douyin.com/*
// @match        *://www.xiaohongshu.com/*
// @match        *://www.zhihu.com/*
// @match        *://*.weibo.com/*
// @match        *://time.geekbang.org/*
// @match        *://www.youtube.com/*
// @match        *://v.qq.com/*
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
// @match        *://www.toutiao.com/*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/scripts/playback-rate/multi-press.ts
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
    const defaultConfig = {
      pressInterval: 150,
      longPressThreshold: 350,
      enableRepeat: false,
      repeatInterval: 100,
      onKeydown() {},
      onKeyup() {}
    };
    this.config = {
      ...defaultConfig,
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
    return {
      ...this.config
    };
  }

  /**
   * 更新配置
   */
  updateConfig(config) {
    this.config = {
      ...this.config,
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
    this.config.onKeydown(event);
    const key = event.key;

    // 避免重复触发（按住不放）
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
    }

    // 判断是否为连续点击
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
    state.lastEvent = event;

    // 清除之前的定时器（包括按键触发定时器）
    this.clearTimers(state);
    if (state.pressTriggerTimer !== null) {
      clearTimeout(state.pressTriggerTimer);
      state.pressTriggerTimer = null;
    }

    // 设置长按检测定时器
    state.longPressTimer = window.setTimeout(() => {
      state.isLongPressing = true;
      this.triggerEvent(key, state.pressCount, true, event, now, false);

      // 如果启用重复触发
      if (this.config.enableRepeat) {
        state.repeatTimer = window.setInterval(() => {
          if (state.isLongPressing) {
            // TODO: 这里 `event.repeat` 应该为 true
            this.triggerEvent(key, state.pressCount, true, event, state.pressStartTime, true);
          }
        }, this.config.repeatInterval);
      }
    }, this.config.longPressThreshold);
  }
  handleKeyUp(event) {
    this.config.onKeyup(event);
    const key = event.key;
    const state = this.keyStates.get(key);
    if (!state) return;
    const now = Date.now();
    state.lastKeyUpTime = now;

    // 清除长按和重复定时器
    this.clearTimers(state);

    // 如果没有触发长按，需要延迟触发以等待可能的后续点击
    if (!state.isLongPressing) {
      // 清除之前的延迟触发定时器
      if (state.pressTriggerTimer !== null) {
        clearTimeout(state.pressTriggerTimer);
        state.pressTriggerTimer = null;
      }

      // 保存当前的 pressCount 和 event
      const currentPressCount = state.pressCount;
      const currentEvent = state.lastEvent || event;

      // 设置延迟触发定时器，等待 pressInterval 时间
      // 如果在这个时间内没有新的点击，则触发当前次数的回调
      state.pressTriggerTimer = window.setTimeout(() => {
        // 触发当前点击次数的事件
        this.triggerEvent(key, currentPressCount, false, currentEvent);

        // 重置按键计数
        state.pressCount = 0;
        state.pressTriggerTimer = null;
      }, this.config.pressInterval);
    } else {
      // 如果已经触发长按，只需要重置状态
      state.isLongPressing = false;

      // 设置按键计数重置定时器
      state.pressResetTimer = window.setTimeout(() => {
        state.pressCount = 0;
      }, this.config.pressInterval);
    }
  }
  triggerEvent(key, pressCount, isLongPress, originalEvent, pressStartTime, isRepeat = false) {
    const keyListeners = this.listeners.get(key);
    if (!keyListeners) return;
    const callbacks = keyListeners.get(pressCount);
    if (!callbacks || callbacks.length === 0) return;
    const eventDetail = {
      key,
      pressCount,
      isLongPress,
      isRepeat,
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
  // 优先级 1 播放状态：播放中优先
  const videos = Array.from($$('video')).filter(video => isPlaying(video));
  if (videos.length === 0) {
    warn('视频元素为空');
    return null;
  }
  videos.sort((a, b) => {
    // 优先级 1 播放状态：播放中优先
    // const playingA = isPlaying(a)
    // const playingB = isPlaying(b)
    // if (playingA !== playingB) {
    //   return playingA ? -1 : 1
    // }

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
  return videos[0];
}

/**
 * 检测当前活动元素是否为输入元素
 */
function isInputActive() {
  let activeElement = document.activeElement;
  if (!activeElement) return false;
  while (activeElement.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  const tagName = activeElement.tagName;
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || activeElement instanceof HTMLElement && activeElement.isContentEditable;
}
;// ./src/scripts/playback-rate/index.ts




// 由于 sohu 阻止了键盘事件，需要在捕获阶段监听

new class PlaybackRateController {
  /** 触发按键 */
  triggerKeys = ['ArrowLeft', 'ArrowRight'];
  /** 按键次数 -> 倍速 映射 */
  rateMap = {
    1: 3,
    2: 6,
    3: 9
  };
  currentTriggerKey = null;
  videoPlaybackRate = 1;
  /** 是否正在倍速播放 */
  isBoosting = false;
  /** 当前视频元素 */
  _video = null;

  /** 当前视频元素 */
  get video() {
    return this._video;
  }
  set video(video) {
    // 处于倍速时不能置空视频元素，否则播放速度无法恢复
    if (this.isBoosting && video === null) {
      return;
    }
    this._video = video;
  }

  /**
   * 判断当前是否处于输入状态，
   * 如果是，不处理任何快捷键。避免冲突，比如输入状态下按方向键。
   */
  isInputActive = false;
  constructor() {
    this.multiPress = createMultiPress({
      pressInterval: 100,
      longPressThreshold: 200,
      enableRepeat: true,
      onKeydown: event => {
        /**
         * 按下方向键时如果有视频元素，则阻止网站本身行为
         */
        if (!this.triggerKeys.includes(event.key)) return;

        // 只在首次按下时获取状态，重复按下时不再获取避免影响性能
        if (event.repeat === false) {
          if (this.isInputActive = isInputActive()) return;
          this.video ??= findBestVideoElement();
        }
        if (this.isInputActive) return;
        if (this.video) {
          event.stopPropagation();
          event.stopImmediatePropagation();
          event.preventDefault();
        }

        // ← ArrowLeft
        // 这里无多击判断延迟
        if (event.key === 'ArrowLeft') {
          this.handleSeek('backward');
        }
      },
      onKeyup: event => {
        // 松开方向键时如果有视频元素，则阻止网站本身行为
        // 虽然 keyup 不一定需要停止传播，但为了逻辑一致性避免页面响应 keyup
        if (this.triggerKeys.includes(event.key) && this.video) {
          event.stopPropagation();
          event.stopImmediatePropagation();
          event.preventDefault();
        }
        this.handleKeyUp(event);
      }
    });
    this.init();
  }
  init() {
    // → ArrowRight
    for (const pressCount of Object.keys(this.rateMap)) {
      this.multiPress.on('ArrowRight', Number(pressCount), event => {
        if (event.isRepeat || this.isInputActive) return;
        if (event.isLongPress) {
          this.handleSpeed(event);
        } else {
          this.handleSeek('forward');
        }
      });
    }
    this.multiPress.start();
  }
  handleSpeed(event) {
    warn('speed');
    if (this.isBoosting || !event.isLongPress) return;
    const {
      video
    } = this;
    if (!video) return;
    this.isBoosting = true;
    this.currentTriggerKey = event.key;
    this.videoPlaybackRate = video.playbackRate;
    video.playbackRate = this.rateMap[event.pressCount] ?? this.videoPlaybackRate;
  }
  handleKeyUp(event) {
    if (this.isBoosting && event.key === this.currentTriggerKey) {
      warn('恢复播放速度');
      this.video.playbackRate = this.videoPlaybackRate;
      this.isBoosting = false;
      this.currentTriggerKey = null;
      this.video = null;
    }
  }

  /** 前进或后退 */
  handleSeek(direction = 'forward') {
    warn('seek');
    const {
      video
    } = this;
    if (video) {
      video.currentTime += direction === 'forward' ? 5 : -5;
    }
    this.video = null;
  }
  destroy() {
    this.multiPress.stop();
  }
}();
/******/ })()
;