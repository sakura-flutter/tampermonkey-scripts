// ==UserScript==
// @name         视频倍速播放快捷键
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      3.1.0
// @author       sakura-flutter
// @description  为网页视频添加统一的倍速播放快捷键：→ 方向键点按快进、长按倍速，← 方向键后退；长按 3 倍速，双击长按 6 倍速。适配了哔哩哔哩、抖音、小红书、知乎、微博、X、Facebook、Instagram、YouTube、腾讯视频、爱奇艺、优酷、PPTV、芒果TV、乐视视频、搜狐视频、咪咕视频、今日头条、极客时间
// @license      MIT
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
// @run-at       document-start
// ==/UserScript==

(function() {
	"use strict";
	document.querySelector.bind(document);
	var $$ = document.querySelectorAll.bind(document);
	function warn(...args) {}
	warn.force = function(...args) {
		console.warn("%c      warn      ", "background: #ffa500; padding: 1px; color: #fff;", ...args);
	};
	function error(...args) {}
	error.force = function(...args) {
		console.error("%c      error      ", "background: red; padding: 1px; color: #fff;", ...args);
	};
	var TapHold = class {
		longPressThreshold;
		capture;
		onKeydown;
		onKeyup;
		handlers;
		keyStates;
		isActive = false;
		boundKeyDown;
		boundKeyUp;
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
		on(key, handlers) {
			this.handlers.set(key, handlers);
		}
		start() {
			if (this.isActive) return;
			this.isActive = true;
			window.addEventListener("keydown", this.boundKeyDown, this.capture);
			window.addEventListener("keyup", this.boundKeyUp, this.capture);
		}
		stop() {
			if (!this.isActive) return;
			this.isActive = false;
			window.removeEventListener("keydown", this.boundKeyDown, this.capture);
			window.removeEventListener("keyup", this.boundKeyUp, this.capture);
			this.clearAllTimers();
		}
		destroy() {
			this.stop();
			this.handlers.clear();
		}
		resolveKey(event) {
			if (this.handlers.has(event.key)) return event.key;
			if (this.handlers.has(event.code)) return event.code;
			return null;
		}
		handleKeyDown(event) {
			if (this.onKeydown?.(event) === false) return;
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
			if (state.isHolding) handlers?.onLongPressEnd?.(event);
			else handlers?.onTap?.(event);
			this.keyStates.delete(key);
		}
		clearAllTimers() {
			this.keyStates.forEach((state) => {
				if (state.longPressTimer !== null) {
					clearTimeout(state.longPressTimer);
					state.longPressTimer = null;
				}
			});
			this.keyStates.clear();
		}
	};
	function isPlaying(video) {
		return !video.paused && !video.ended;
	}
	function isAudible(video) {
		return !video.muted && video.volume > 0;
	}
	function getDistanceFromViewportCenter(rect) {
		const viewportCenterX = window.innerWidth / 2;
		const viewportCenterY = window.innerHeight / 2;
		const videoCenterX = rect.left + rect.width / 2;
		const videoCenterY = rect.top + rect.height / 2;
		const dx = videoCenterX - viewportCenterX;
		const dy = videoCenterY - viewportCenterY;
		return dx * dx + dy * dy;
	}
	function getVideosDeep(root) {
		const videos = [];
		const collect = (node) => {
			const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
			let el;
			while (el = walker.nextNode()) {
				const video = el;
				if (el.tagName === "VIDEO" && isPlaying(video)) videos.push(video);
				if (el.shadowRoot) collect(el.shadowRoot);
			}
		};
		collect(root);
		return videos;
	}
	function findBestVideoElement() {
		const videos = getVideosDeep(document);
		if (videos.length === 0) return null;
		videos.sort((a, b) => {
			const audibleA = isAudible(a);
			if (audibleA !== isAudible(b)) return audibleA ? -1 : 1;
			const rectA = a.getBoundingClientRect();
			const rectB = b.getBoundingClientRect();
			const sizeA = rectA.width * rectA.height;
			const sizeB = rectB.width * rectB.height;
			if (sizeA !== sizeB) return sizeB - sizeA;
			return getDistanceFromViewportCenter(rectA) - getDistanceFromViewportCenter(rectB);
		});
		return videos[0];
	}
	function isInputElement(el) {
		if (!el) return false;
		const { tagName } = el;
		return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || el instanceof HTMLElement && el.isContentEditable;
	}
	function isInputActive() {
		let { activeElement } = document;
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
	function isCommandMessage(data) {
		return typeof data === "object" && data !== null && data.__pbCmd === true && typeof data.cmd === "object";
	}
	new class PlaybackRateController {
		arrowRightBoostRate = 3;
		seekStep = 5;
		continuousSeekStep = 2;
		continuousSeekInterval = 80;
		numberRateMap = {
			"0": 1,
			"1": 1.5,
			"2": 2,
			"3": 3,
			"4": 4,
			"5": 5,
			"6": 6,
			"7": 7,
			"8": 8,
			"9": 9
		};
		trackedKeys = new Set([
			"ArrowLeft",
			"ArrowRight",
			...Object.keys(this.numberRateMap)
		]);
		savedRate = 1;
		activeKey = null;
		activeMode = null;
		seekTimer = null;
		isFramed = window.parent !== window;
		tapHold;
		_video = null;
		get video() {
			return this._video;
		}
		set video(video) {
			if (this.activeKey && video === null) return;
			this._video = video;
		}
		boundBlur;
		boundVisibility;
		onMessage;
		constructor() {
			this.tapHold = new TapHold({
				longPressThreshold: 300,
				capture: true,
				onKeydown: (event) => this.handleKeydown(event),
				onKeyup: (event) => this.handleKeyup(event)
			});
			this.tapHold.on("ArrowRight", {
				onTap: () => this.dispatch({
					type: "seek",
					direction: 1
				}),
				onLongPressStart: (event) => this.dispatch({
					type: "boostStart",
					rate: this.arrowRightBoostRate,
					key: event.key
				}),
				onLongPressEnd: () => this.dispatch({ type: "boostEnd" })
			});
			this.tapHold.on("ArrowLeft", {
				onTap: () => this.dispatch({
					type: "seek",
					direction: -1
				}),
				onLongPressStart: (event) => this.dispatch({
					type: "seekStart",
					direction: -1,
					key: event.key
				}),
				onLongPressEnd: () => this.dispatch({ type: "seekEnd" })
			});
			for (const [key, rate] of Object.entries(this.numberRateMap)) this.tapHold.on(key, {
				onTap: () => this.dispatch({
					type: "setRate",
					rate
				}),
				onLongPressStart: (event) => this.dispatch({
					type: "boostStart",
					rate,
					key: event.key
				}),
				onLongPressEnd: () => this.dispatch({ type: "boostEnd" })
			});
			this.boundBlur = () => this.handleBlur();
			this.boundVisibility = () => {
				if (document.hidden) this.handleBlur();
			};
			this.onMessage = (e) => this.handleMessage(e);
			window.addEventListener("blur", this.boundBlur);
			document.addEventListener("visibilitychange", this.boundVisibility);
			if (this.isFramed) window.addEventListener("message", this.onMessage);
			this.tapHold.start();
		}
		handleKeydown(event) {
			if (!this.trackedKeys.has(event.key)) return false;
			if (isInputActive()) return false;
			if (!event.repeat) this.resolveLocalVideo();
			if (this.video) {
				event.stopPropagation();
				event.stopImmediatePropagation();
				event.preventDefault();
			}
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
		resolveLocalVideo() {
			if (this.activeKey) return;
			if (this.video && this.video.isConnected) return;
			this.video = findBestVideoElement();
		}
		dispatch(cmd) {
			if (this.video) this.applyCommand(cmd);
			else this.relay(cmd);
		}
		applyCommand(cmd) {
			switch (cmd.type) {
				case "setRate":
					this.setRate(cmd.rate);
					break;
				case "seek":
					this.seek(cmd.direction);
					break;
				case "boostStart":
					this.startBoost(cmd.rate, cmd.key);
					break;
				case "boostEnd":
					this.endBoost();
					break;
				case "seekStart":
					this.startContinuousSeek(cmd.direction, cmd.key);
					break;
				case "seekEnd":
					this.stopContinuousSeek();
					break;
				case "cancel": this.cancelActive();
			}
		}
		relay(cmd) {
			const msg = {
				__pbCmd: true,
				cmd
			};
			$$("iframe").forEach((iframe) => {
				iframe.contentWindow?.postMessage(msg, "*");
			});
		}
		seek(direction) {
			const { video } = this;
			if (video) {
				const step = this.getSeekStep(video);
				video.currentTime += direction * step;
				`${step}`;
			}
			this.video = null;
		}
		getSeekStep(video) {
			const { duration } = video;
			if (!Number.isFinite(duration)) return this.seekStep;
			const rawStep = duration / 10;
			const roundedStep = Math.round(rawStep * 10) / 10;
			return Math.max(.5, Math.min(this.seekStep, roundedStep));
		}
		seekBy(direction, step) {
			if (this.video) this.video.currentTime += direction * step;
		}
		setRate(rate) {
			const { video } = this;
			if (video) {
				video.playbackRate = rate;
				`${rate}`;
			}
			this.video = null;
		}
		startBoost(rate, key) {
			const { video } = this;
			if (!video) return;
			this.savedRate = video.playbackRate;
			this.activeKey = key;
			this.activeMode = "boost";
			video.playbackRate = rate;
			`${rate}`;
		}
		endBoost() {
			if (this.activeKey && this.video) this.video.playbackRate = this.savedRate;
			this.activeKey = null;
			this.activeMode = null;
			this.video = null;
		}
		startContinuousSeek(direction, key) {
			const { video } = this;
			if (!video) return;
			this.activeKey = key;
			this.activeMode = "seek";
			this.seekBy(direction, this.continuousSeekStep);
			this.seekTimer = window.setInterval(() => {
				this.seekBy(direction, this.continuousSeekStep);
			}, this.continuousSeekInterval);
		}
		stopContinuousSeek() {
			if (this.seekTimer !== null) {
				clearInterval(this.seekTimer);
				this.seekTimer = null;
			}
			this.activeKey = null;
			this.activeMode = null;
			this.video = null;
		}
		cancelActive() {
			if (this.seekTimer !== null) {
				clearInterval(this.seekTimer);
				this.seekTimer = null;
			}
			if (this.activeKey && this.activeMode === "boost" && this.video) this.video.playbackRate = this.savedRate;
			this.activeKey = null;
			this.activeMode = null;
			this.video = null;
		}
		handleBlur() {
			this.cancelActive();
			this.relay({ type: "cancel" });
		}
		handleMessage(e) {
			if (e.source !== window.parent) return;
			if (!isCommandMessage(e.data)) return;
			const { cmd } = e.data;
			if (cmd.type === "cancel") {
				this.cancelActive();
				this.relay(cmd);
				return;
			}
			this.resolveLocalVideo();
			this.dispatch(cmd);
		}
		destroy() {
			window.removeEventListener("blur", this.boundBlur);
			document.removeEventListener("visibilitychange", this.boundVisibility);
			if (this.isFramed) window.removeEventListener("message", this.onMessage);
			this.tapHold.destroy();
			if (this.seekTimer !== null) {
				clearInterval(this.seekTimer);
				this.seekTimer = null;
			}
		}
	}();
})();
