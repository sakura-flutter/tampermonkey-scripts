// ==UserScript==
// @name         bilibili 工具箱
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.7.2
// @author       sakura-flutter
// @description  长按 S 键倍速播放
// @license      MIT
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/bangumi/play/*
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// ==/UserScript==

(function() {
	"use strict";
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
	function warn(...args) {}
	warn.force = function(...args) {
		console.warn("%c      warn      ", "background: #ffa500; padding: 1px; color: #fff;", ...args);
	};
	function error(...args) {}
	error.force = function(...args) {
		console.error("%c      error      ", "background: red; padding: 1px; color: #fff;", ...args);
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
	function speed() {
		let video = null;
		let savedRate = 1;
		const tapHold = new TapHold();
		tapHold.on("KeyS", {
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
})();
