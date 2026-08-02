// ==UserScript==
// @name         视频倍速播放快捷键
// @version      3.0.0
// @description  为网页视频添加统一的倍速播放快捷键：→ 方向键点按快进、长按倍速，← 方向键后退；长按 3 倍速，双击长按 6 倍速。适配了哔哩哔哩、抖音、小红书、知乎、微博、X、Facebook、Instagram、YouTube、腾讯视频、爱奇艺、优酷、PPTV、芒果TV、乐视视频、搜狐视频、咪咕视频、今日头条、极客时间
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @run-at       document-start
// @match        *://www.bilibili.com/*
// @match        *://www.douyin.com/*
// @match        *://www.xiaohongshu.com/*
// @match        *://www.zhihu.com/*
// @match        *://*.weibo.com/*
// @match        *://x.com/*
// @match        *://www.facebook.com/*
// @match        *://www.instagram.com/*
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
// @match        *://time.geekbang.org/*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// ./src/scripts/playback-rate/tap-hold.ts
// =====================================================
// Name: 点按与长按键盘事件
// Author: AI
// =====================================================

/**
 * 点按与长按处理器配置
 */

/**
 * 按键回调集合
 */

/**
 * 点按与长按键盘事件检测器
 *
 * - 点按：按下后在长按阈值内松开
 * - 长按：按下后持续超过阈值
 *
 * 长按触发后松开只会触发 `onLongPressEnd`，不会触发 `onTap`；
 * 未注册 `onLongPressStart` 的键长按后松开同样不触发 `onTap`（长按视为"取消点按"）。
 *
 * `on(key, handlers)` 的 `key` 既可匹配 `event.key` 也可匹配 `event.code`。
 */
class TapHold {
  isActive = false;
  constructor(config) {
    this.longPressThreshold = config?.longPressThreshold ?? 300;
    this.capture = config?.capture ?? false;
    this.onKeydown = config?.onKeydown;
    this.onKeyup = config?.onKeyup;
    this.handlers = new Map();
    this.keyStates = new Map();
    this.boundKeyDown = this.handleKeyDown.bind(this);
    this.boundKeyUp = this.handleKeyUp.bind(this);
  }

  /**
   * 注册按键回调
   * @param key 按键标识，可为 `event.key`（如 'ArrowRight'、'2'）或 `event.code`（如 'KeyS'）
   * @param handlers 回调集合
   */
  on(key, handlers) {
    this.handlers.set(key, handlers);
  }

  /** 启动监听 */
  start() {
    if (this.isActive) return;
    this.isActive = true;
    window.addEventListener('keydown', this.boundKeyDown, this.capture);
    window.addEventListener('keyup', this.boundKeyUp, this.capture);
  }

  /** 停止监听并清理计时器 */
  stop() {
    if (!this.isActive) return;
    this.isActive = false;
    window.removeEventListener('keydown', this.boundKeyDown, this.capture);
    window.removeEventListener('keyup', this.boundKeyUp, this.capture);
    this.clearAllTimers();
  }

  /** 销毁，释放所有资源 */
  destroy() {
    this.stop();
    this.handlers.clear();
  }

  /** 解析事件对应的注册 key，未注册返回 null */
  resolveKey(event) {
    if (this.handlers.has(event.key)) return event.key;
    if (this.handlers.has(event.code)) return event.code;
    return null;
  }
  handleKeyDown(event) {
    // keydown 钩子，返回 false 则不处理
    if (this.onKeydown?.(event) === false) return;
    // 忽略系统重复 keydown
    if (event.repeat) return;
    const key = this.resolveKey(event);
    if (!key) return;
    let state = this.keyStates.get(key);
    if (!state) {
      state = {
        longPressTimer: null,
        isHolding: false
      };
      this.keyStates.set(key, state);
    }
    // 已在计时中，防御性跳过
    if (state.longPressTimer !== null) return;
    state.isHolding = false;
    state.longPressTimer = window.setTimeout(() => {
      state.longPressTimer = null;
      state.isHolding = true;
      this.handlers.get(key)?.onLongPressStart?.(event);
    }, this.longPressThreshold);
  }
  handleKeyUp(event) {
    this.onKeyup?.(event);
    const key = this.resolveKey(event);
    if (!key) return;
    const state = this.keyStates.get(key);
    if (!state) return;
    if (state.longPressTimer !== null) {
      clearTimeout(state.longPressTimer);
      state.longPressTimer = null;
    }
    const handlers = this.handlers.get(key);
    if (state.isHolding) {
      handlers?.onLongPressEnd?.(event);
    } else {
      handlers?.onTap?.(event);
    }
    this.keyStates.delete(key);
  }
  clearAllTimers() {
    this.keyStates.forEach(state => {
      if (state.longPressTimer !== null) {
        clearTimeout(state.longPressTimer);
        state.longPressTimer = null;
      }
    });
    this.keyStates.clear();
  }
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
  /** 长按方向右键时的倍速 */
  arrowRightBoostRate = 3;
  /** 点按快进/后退步长（秒） */
  seekStep = 5;
  /** 长按方向左键持续后退的步长（秒） */
  continuousSeekStep = 2;
  /** 长按方向左键持续后退的间隔（毫秒） */
  continuousSeekInterval = 80;
  /** 数字键 -> 倍速映射（0 重置为 1x，1 为 1.5x） */
  numberRateMap = {
    '0': 1,
    '1': 1.5,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
  };

  /** 被追踪的按键（event.key） */
  trackedKeys = new Set(['ArrowLeft', 'ArrowRight', ...Object.keys(this.numberRateMap)]);

  /** 长按倍速期间保存的"按下前速度" */
  savedRate = 1;
  /** 当前长按激活的按键（倍速或连退），null 表示未激活 */
  activeKey = null;
  /** 长按连退定时器 */
  seekTimer = null;
  _video = null;
  get video() {
    return this._video;
  }
  set video(video) {
    // 长按激活期间不能置空，否则倍速无法恢复 / 连退中断
    if (this.activeKey && video === null) return;
    this._video = video;
  }
  constructor() {
    this.tapHold = new TapHold({
      longPressThreshold: 300,
      capture: true,
      onKeydown: event => this.handleKeydown(event),
      onKeyup: event => this.handleKeyup(event)
    });
    this.tapHold.on('ArrowRight', {
      onTap: () => this.seek(1),
      onLongPressStart: event => this.startBoost(event, this.arrowRightBoostRate),
      onLongPressEnd: () => this.endBoost()
    });
    this.tapHold.on('ArrowLeft', {
      onTap: () => this.seek(-1),
      onLongPressStart: () => this.startContinuousSeek(-1),
      onLongPressEnd: () => this.stopContinuousSeek()
    });
    for (const [key, rate] of Object.entries(this.numberRateMap)) {
      this.tapHold.on(key, {
        onTap: () => this.setRate(rate),
        onLongPressStart: event => this.startBoost(event, rate),
        onLongPressEnd: () => this.endBoost()
      });
    }
    this.tapHold.start();
  }
  handleKeydown(event) {
    if (!this.trackedKeys.has(event.key)) return;

    // 输入框激活时不处理任何快捷键
    if (isInputActive()) return false;

    // 首次按下时查找视频元素
    if (!event.repeat) {
      this.video ??= findBestVideoElement();
    }

    // 有视频则阻止网站自身行为
    if (this.video) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    // 长按激活期间锁住其他键，避免速率/seek 互相干扰
    if (this.activeKey && event.key !== this.activeKey) return false;
  }
  handleKeyup(event) {
    if (!this.trackedKeys.has(event.key)) return;
    if (this.video) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }

  /** 点按：前进 / 后退一次（结束后释放视频引用） */
  seek(direction) {
    const {
      video
    } = this;
    if (video) {
      const step = this.getSeekStep(video);
      video.currentTime += direction * step;
      warn(`seek ${step}s`);
    }
    this.video = null;
  }

  /**
   * 计算点按 seek 步长
   *
   * 默认 5s；视频时长较短时按"至少能跳 10 次"缩放（时长 / 10），
   * 下限 0.5s，避免短视频跳一次就结束。直播流（duration 为 Infinity/NaN）用默认值。
   */
  getSeekStep(video) {
    const {
      duration
    } = video;
    if (!Number.isFinite(duration)) return this.seekStep;
    const rawStep = duration / 10;
    const roundedStep = Math.round(rawStep * 10) / 10;
    return Math.max(0.5, Math.min(this.seekStep, roundedStep));
  }

  /** 长按连退：单次 seek（不释放视频引用） */
  seekBy(direction, step) {
    if (this.video) {
      this.video.currentTime += direction * step;
    }
  }

  /** 点按数字键：永久设置倍速 */
  setRate(rate) {
    const {
      video
    } = this;
    if (video) {
      video.playbackRate = rate;
      warn(`rate ${rate}x`);
    }
    this.video = null;
  }

  /** 长按开始：临时倍速，保存按下前速度 */
  startBoost(event, rate) {
    const {
      video
    } = this;
    if (!video) return;
    this.savedRate = video.playbackRate;
    this.activeKey = event.key;
    video.playbackRate = rate;
    warn(`boost ${rate}x`);
  }

  /** 长按结束：恢复按下前速度 */
  endBoost() {
    if (this.activeKey && this.video) {
      this.video.playbackRate = this.savedRate;
      warn('恢复播放速度');
    }
    this.activeKey = null;
    this.video = null;
  }

  /** 长按连退开始：立即后退一次，随后持续后退 */
  startContinuousSeek(direction) {
    const {
      video
    } = this;
    if (!video) return;
    this.activeKey = 'ArrowLeft';
    this.seekBy(direction, this.continuousSeekStep);
    this.seekTimer = window.setInterval(() => {
      this.seekBy(direction, this.continuousSeekStep);
    }, this.continuousSeekInterval);
  }

  /** 长按连退结束：停止定时器 */
  stopContinuousSeek() {
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer);
      this.seekTimer = null;
    }
    this.activeKey = null;
    this.video = null;
  }
  destroy() {
    this.tapHold.destroy();
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer);
      this.seekTimer = null;
    }
  }
}();
/******/ })()
;