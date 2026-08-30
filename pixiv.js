// ==UserScript==
// @name         Pixiv 工具箱
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.5.0
// @author       sakura-flutter
// @description  增强P站查看原图功能；显示原图尺寸
// @license      MIT
// @match        https://www.pixiv.net
// @match        https://www.pixiv.net/*
// @require      https://unpkg.com/viewerjs@1.11.9/dist/viewer.min.js
// @resource     viewerjs/dist/viewer.css  https://unpkg.com/viewerjs@1.11.9/dist/viewer.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        window.onurlchange
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// ==/UserScript==

(function(viewerjs) {
	"use strict";
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	viewerjs = __toESM(viewerjs);
	var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
	var _GM_getResourceText = (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
	var _monkeyWindow = (() => window)();
	document.querySelector.bind(document);
	var $$ = document.querySelectorAll.bind(document);
	function onVisible(callback, delay = 500, ...rest) {
		let intervalId;
		function listener() {
			if (intervalId !== void 0) window.clearInterval(intervalId);
			if (document.visibilityState === "hidden") return;
			callback(...rest);
			intervalId = window.setInterval(callback, delay, ...rest);
		}
		listener();
		document.addEventListener("visibilitychange", listener);
		return function abort() {
			if (intervalId !== void 0) window.clearInterval(intervalId);
			document.removeEventListener("visibilitychange", listener);
		};
	}
	function warn(...args) {}
	warn.force = function(...args) {
		console.warn("%c      warn      ", "background: #ffa500; padding: 1px; color: #fff;", ...args);
	};
	function error(...args) {}
	error.force = function(...args) {
		console.error("%c      error      ", "background: red; padding: 1px; color: #fff;", ...args);
	};
	var cssLoader = (name) => _GM_addStyle(_GM_getResourceText(name));
	cssLoader("viewerjs/dist/viewer.css");
	_GM_addStyle([
		".viewer-backdrop { background-color: rgb(0 0 0 / 0.8) }",
		".viewer-container .viewer-title { text-shadow: 1px 1px 1px #000 }",
		".viewer-container .viewer-navbar ul, .viewer-container .viewer-navbar li { width: 66px; height: 110px }"
	].join(""));
	var Previewer = class {
		#imgsSelector;
		#viewer;
		#options;
		constructor(imgsSelector, options) {
			this.#process = this.#process.bind(this);
			this.#imgsSelector = imgsSelector;
			this.#options = options;
			this.#init();
		}
		#init() {
			window.addEventListener("click", this.#process, true);
			_monkeyWindow.addEventListener("urlchange", (info) => {
				this.#viewer?.hide();
			});
		}
		#process = function(event) {
			if (!this.#options.includePathname.test(location.pathname)) return;
			const artworks = this.#getArtworks();
			if (artworks.length === 0) return;
			let index = -1;
			event.composedPath().slice(0, 5).find((target) => {
				index = artworks.findIndex((artwork) => artwork === target);
				return index > -1;
			});
			if (index === -1) return;
			const originalArtworks = this.#createOriginalImgEls(artworks);
			if (originalArtworks.length === 0) return;
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
			this.#viewer = this.#preview(originalArtworks, { initialViewIndex: index });
		};
		#getArtworks() {
			return [...$$(this.#imgsSelector)];
		}
		#createOriginalImgEls(imgEls) {
			return imgEls.reduce((acc, img) => {
				let parentElement = img.parentElement;
				let steps = 0;
				const maxAncestors = 5;
				while (parentElement && steps < maxAncestors) {
					if (parentElement.getAttribute("role") === "presentation") break;
					if (parentElement.tagName === "A") {
						const image = new Image();
						image.src = parentElement.href;
						image.alt = img.alt;
						acc.push(image);
						break;
					}
					parentElement = parentElement.parentElement;
					steps++;
				}
				return acc;
			}, []);
		}
		#preview(imgEls, viewerOpts) {
			const self = this;
			const container = document.createElement("div");
			container.append(...imgEls);
			viewerOpts = Object.assign({
				navbar: imgEls.length > 1,
				loop: false,
				zoomRatio: .5,
				minZoomRatio: .1,
				maxZoomRatio: 1.5,
				viewed() {
					this.viewer.tooltip();
				},
				hide() {
					self.#viewer = void 0;
				},
				hidden() {
					this.viewer.destroy();
				}
			}, viewerOpts);
			const viewer = new viewerjs.default(container, viewerOpts);
			viewer.show();
			return viewer;
		}
	};
	function attachPixels(imgsSelector, options) {
		const ws = new WeakSet();
		onVisible(() => {
			if (!options.includePathname.test(location.pathname)) return;
			$$(imgsSelector).forEach((img) => {
				if (ws.has(img)) return;
				let [width, height] = [img.getAttribute("width"), img.getAttribute("height")];
				if (width === null || height === null) return;
				[width, height] = [+width, +height];
				img.parentElement.style.position = "relative";
				const elem = createPixelsElement(img.parentElement);
				elem.innerText = `${width} × ${height} (${calcRectCoincide(width, height).percent})`;
				ws.add(img);
			});
		});
	}
	function createPixelsElement(parentElement) {
		const classname = "artwork-pixels";
		for (const child of parentElement.children) if (child.classList.contains(classname)) return child;
		const elem = document.createElement("span");
		elem.classList.add(classname);
		elem.style.cssText = [
			"position: absolute",
			"z-index: 1",
			"top: 32px",
			"right: 8px",
			"padding: 0 4px",
			"border-radius: 8px",
			"font-size: 12px",
			"line-height: initial",
			"color: #fff",
			"background: rgb(0 0 0 / 0.32)"
		].join(";");
		parentElement.prepend(elem);
		return elem;
	}
	function calcRectCoincide(width, height) {
		const { width: sw, height: sh } = window.screen;
		const rectRate = width / height;
		const screenRate = sw / sh;
		let rate;
		if (rectRate >= screenRate) rate = screenRate / rectRate;
		else rate = rectRate / screenRate;
		if (width < sw && height < sh) rate *= width / sw * (height / sh);
		if (rate >= .99) {
			if (width > sw) rate *= width / sw;
			else if (height > sh) rate *= height / sh;
		}
		return {
			rate,
			percent: (rate * 100).toFixed(0) + "%"
		};
	}
	new Previewer("figure [role=\"presentation\"] a img[width][height]", { includePathname: /^\/artworks\/(\w)+/ });
	attachPixels("figure [role=\"presentation\"] a img[width][height]", { includePathname: /^\/artworks\/(\w)+/ });
})(Viewer);
