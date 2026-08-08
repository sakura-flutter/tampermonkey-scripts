// ==UserScript==
// @name         bilibili 工具箱
// @version      1.7.1
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
 * 深度收集某个文档（及其下所有「开放」shadow DOM）中**正在播放**的 video 元素
 *
 * 只收集正在播放的 video（倍速/seek 仅对播放中有效），免去后续再过滤。
 * 注意：mode 为 'closed' 的 shadow root 无法访问，其中的 video 会漏掉。
 */
function getVideosDeep(root) {
  const videos = [];
  const collect = node => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
    let el;
    while (el = walker.nextNode()) {
      const video = el;
      if (el.tagName === 'VIDEO' && isPlaying(video)) videos.push(video);
      if (el.shadowRoot) collect(el.shadowRoot);
    }
  };
  collect(root);
  return videos;
}

/**
 * 查找「当前文档」（含 shadow DOM）中最优的「正在播放」video 元素，供快捷键操作。
 *
 * 只扫描本实例所在文档：iframe 内的 video 由各 iframe 自身的实例通过 postMessage
 * 链逐层处理，不在父文档里跨文档查找（统一一套机制，不分同源 / 跨域）。
 *
 * 多个视频同时播放时的权重优先级：
 * 1. 音频状态 (有声 > 静音)：静音的通常是广告或背景视频，理想情况下不会出现多个有声音的视频
 * 2. 元素大小 (大 > 小)：大尺寸的视频通常是主要内容
 * 3. 视口距离 (距离视口中心近 > 远)：短视频或信息流页面可滚动时，优先处理视口中心附近
 */
function findBestVideoElement() {
  const videos = getVideosDeep(document);
  if (videos.length === 0) {
    warn('视频元素为空');
    return null;
  }
  videos.sort((a, b) => {
    // 优先级 1 音频状态：非静音优先
    const audibleA = isAudible(a);
    const audibleB = isAudible(b);
    if (audibleA !== audibleB) {
      return audibleA ? -1 : 1;
    }
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();

    // 优先级 2 元素大小：大尺寸优先
    const sizeA = rectA.width * rectA.height;
    const sizeB = rectB.width * rectB.height;
    if (sizeA !== sizeB) {
      return sizeB - sizeA;
    }

    // 优先级 3 视口距离：距离视口中心越近越优先 (距离越小越好)
    const distA = getDistanceFromViewportCenter(rectA);
    const distB = getDistanceFromViewportCenter(rectB);
    return distA - distB;
  });
  warn(videos);

  // 返回排序后的第一个元素，即最优匹配
  return videos[0];
}

/** 判断元素是否为输入元素（输入框 / 文本域 / 下拉选择 / 可编辑元素） */
function isInputElement(el) {
  if (!el) return false;
  const {
    tagName
  } = el;
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || el instanceof HTMLElement && el.isContentEditable;
}

/** 检测当前焦点是否落在输入元素上 */
function isInputActive() {
  let {
    activeElement
  } = document;

  // 穿透 shadowRoot 与同域 iframe，定位真正获得焦点的元素；无更深层则结束
  while (true) {
    const shadowEl = activeElement.shadowRoot?.activeElement;
    if (shadowEl) {
      activeElement = shadowEl;
      continue;
    }
    if (activeElement instanceof HTMLIFrameElement) {
      const innerEl = activeElement.contentDocument?.activeElement;
      if (innerEl) {
        activeElement = innerEl;
        continue;
      }
    }
    break;
  }
  return isInputElement(activeElement);
}
;// ./src/scripts/bilibili/index.ts


function speed() {
  let video = null;
  let savedRate = 1;
  const tapHold = new TapHold();
  tapHold.on('s', {
    onLongPressStart: () => {
      video = findBestVideoElement();
      if (!video) return;
      savedRate = video.playbackRate;
      video.playbackRate = 6;
    },
    onLongPressEnd: () => {
      if (video) video.playbackRate = savedRate;
      video = null;
    }
  });
  tapHold.start();
}
speed();
/******/ })()
;