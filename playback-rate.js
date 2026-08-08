// ==UserScript==
// @name         视频倍速播放快捷键
// @version      3.1.0
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

;// ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
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
;// ./src/scripts/playback-rate/command.ts
/**
 * 跨 iframe 传递的统一命令协议。
 *
 * 不区分同源 / 跨域：父实例与各级 iframe 实例之间一律通过 postMessage 下发命令，
 * 由各实例在自己的文档内执行（或继续向下 relay）。
 */

function isCommandMessage(data) {
  return typeof data === 'object' && data !== null && data.__pbCmd === true && typeof data.cmd === 'object';
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
  /** 当前长按激活的按键（event.key），null 表示未激活；用于锁住其它按键、避免互相干扰 */
  activeKey = null;
  /** 当前激活的操作类型，供失焦复位（cancelActive）区分是否需要恢复速率 */
  activeMode = null;
  /** 长按连退定时器 */
  seekTimer = null;
  /** 本实例是否处于 iframe 内（只有被嵌套时才可能收到父级下发的命令） */
  isFramed = window.parent !== window;
  _video = null;
  get video() {
    return this._video;
  }
  set video(video) {
    // 长按激活期间不能置空，否则倍速无法恢复 / 连退中断
    if (this.activeKey && video === null) return;
    this._video = video;
  }

  /** 失焦/切后台复位处理器的绑定引用，便于销毁时移除监听 */

  /** 接收父实例下发的命令 */

  constructor() {
    this.tapHold = new TapHold({
      longPressThreshold: 300,
      capture: true,
      onKeydown: event => this.handleKeydown(event),
      onKeyup: event => this.handleKeyup(event)
    });
    this.tapHold.on('ArrowRight', {
      onTap: () => this.dispatch({
        type: 'seek',
        direction: 1
      }),
      onLongPressStart: event => this.dispatch({
        type: 'boostStart',
        rate: this.arrowRightBoostRate,
        key: event.key
      }),
      onLongPressEnd: () => this.dispatch({
        type: 'boostEnd'
      })
    });
    this.tapHold.on('ArrowLeft', {
      onTap: () => this.dispatch({
        type: 'seek',
        direction: -1
      }),
      onLongPressStart: event => this.dispatch({
        type: 'seekStart',
        direction: -1,
        key: event.key
      }),
      onLongPressEnd: () => this.dispatch({
        type: 'seekEnd'
      })
    });
    for (const [key, rate] of Object.entries(this.numberRateMap)) {
      this.tapHold.on(key, {
        onTap: () => this.dispatch({
          type: 'setRate',
          rate
        }),
        onLongPressStart: event => this.dispatch({
          type: 'boostStart',
          rate,
          key: event.key
        }),
        onLongPressEnd: () => this.dispatch({
          type: 'boostEnd'
        })
      });
    }
    this.boundBlur = () => this.handleBlur();
    this.boundVisibility = () => {
      if (document.hidden) this.handleBlur();
    };
    this.onMessage = e => this.handleMessage(e);
    window.addEventListener('blur', this.boundBlur);
    document.addEventListener('visibilitychange', this.boundVisibility);
    // 仅当本实例处于 iframe 内时才监听命令：顶级文档不会收到父级下发，无需该监听
    if (this.isFramed) window.addEventListener('message', this.onMessage);
    this.tapHold.start();
  }
  handleKeydown(event) {
    if (!this.trackedKeys.has(event.key)) return false;

    // 输入框激活时不处理任何快捷键
    if (isInputActive()) return false;

    // 首次按下时刷新本地视频引用（已连接则保留，否则重查；长按激活期不覆盖受保护引用）
    if (!event.repeat) {
      this.resolveLocalVideo();
    }
    // [当前文档] 有视频则阻止网站自身行为，不检测 iframe 避免误伤
    if (this.video) {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
    }

    // 长按激活期间锁住"其它按键"，避免倍速/连退互相干扰
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

  /** 在本地文档中查找最优视频并缓存到 this.video（仅在非激活态刷新，避免覆盖长按保护中的引用） */
  resolveLocalVideo() {
    if (this.activeKey) return;
    if (this.video && this.video.isConnected) return;
    this.video = findBestVideoElement();
  }

  /**
   * 统一命令入口（顶层与各级 iframe 实例共用）：
   * - 本实例文档能找到视频 → 本地执行；
   * - 找不到 → 向下 relay 给直接子 iframe，由子实例重复本逻辑（自然穿透任意嵌套深度）。
   * 本地视频引用由 resolveLocalVideo 统一查找，此处不再重复查询。
   */
  dispatch(cmd) {
    if (this.video) {
      this.applyCommand(cmd);
    } else {
      this.relay(cmd);
    }
  }

  /** 在本实例文档内执行命令 */
  applyCommand(cmd) {
    switch (cmd.type) {
      case 'setRate':
        this.setRate(cmd.rate);
        break;
      case 'seek':
        this.seek(cmd.direction);
        break;
      case 'boostStart':
        this.startBoost(cmd.rate, cmd.key);
        break;
      case 'boostEnd':
        this.endBoost();
        break;
      case 'seekStart':
        this.startContinuousSeek(cmd.direction, cmd.key);
        break;
      case 'seekEnd':
        this.stopContinuousSeek();
        break;
      case 'cancel':
        this.cancelActive();
        break;
    }
  }

  /** 把命令转发给所有直接子 iframe（执行或继续向下 relay 由子实例决定） */
  relay(cmd) {
    const msg = {
      __pbCmd: true,
      cmd
    };
    $$('iframe').forEach(iframe => {
      iframe.contentWindow?.postMessage(msg, '*');
    });
  }

  /** 点按：前进 / 后退一次 */
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
  startBoost(rate, key) {
    const {
      video
    } = this;
    if (!video) return;
    this.savedRate = video.playbackRate;
    this.activeKey = key;
    this.activeMode = 'boost';
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
    this.activeMode = null;
    this.video = null;
  }

  /** 长按连退开始：立即后退一次，随后持续后退 */
  startContinuousSeek(direction, key) {
    const {
      video
    } = this;
    if (!video) return;
    this.activeKey = key;
    this.activeMode = 'seek';
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
    this.activeMode = null;
    this.video = null;
  }

  /**
   * 复位所有激活态：恢复速率、停止连退、清空视频引用（用于失焦 / 切后台等中断场景）。
   * 同时向下 relay 取消指令，确保深层 iframe 实例一并复位。
   */
  cancelActive() {
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer);
      this.seekTimer = null;
    }
    // 长按倍速（非连退）需恢复按下前的速率；连退不改变速率，无需处理
    if (this.activeKey && this.activeMode === 'boost' && this.video) {
      this.video.playbackRate = this.savedRate;
    }
    this.activeKey = null;
    this.activeMode = null;
    this.video = null;
  }

  /** 失焦 / 切后台：复位本地并广播取消指令给子 iframe */
  handleBlur() {
    this.cancelActive();
    this.relay({
      type: 'cancel'
    });
  }

  /** 只接受来自直接父级（window.parent）的命令，避免任意来源驱动 */
  handleMessage(e) {
    if (e.source !== window.parent) return;
    if (!isCommandMessage(e.data)) return;
    const {
      cmd
    } = e.data;
    if (cmd.type === 'cancel') {
      this.cancelActive();
      this.relay(cmd); // 继续向下传播
      return;
    }
    this.resolveLocalVideo();
    this.dispatch(cmd);
  }
  destroy() {
    window.removeEventListener('blur', this.boundBlur);
    document.removeEventListener('visibilitychange', this.boundVisibility);
    if (this.isFramed) window.removeEventListener('message', this.onMessage);
    this.tapHold.destroy();
    if (this.seekTimer !== null) {
      clearInterval(this.seekTimer);
      this.seekTimer = null;
    }
  }
}();
/******/ })()
;