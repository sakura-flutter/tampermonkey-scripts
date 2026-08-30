// ==UserScript==
// @name         网页宽屏
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      2.15.16
// @author       sakura-flutter
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、搜狗搜索、segmentfault、哔哩哔哩、微博、豆瓣、今日头条、Google、CSDN、crates.io、米游社原神
// @license      MIT
// @include      /^https:\/\/www\.google\..{2,7}search/
// @include      /^https:\/\/blog\.csdn\.net\/(\w|-)+\/article\/details\//
// @match        https://bcy.net/item/detail/*
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/follow
// @match        https://www.zhihu.com/hot*
// @match        https://www.zhihu.com/topic*
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.baidu.com/s*
// @match        https://www.baidu.com/?*
// @match        https://www.baidu.com/
// @match        https://www.sogou.com/web*
// @match        https://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/f?*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://t.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://www.weibo.com/*
// @match        https://weibo.com/*
// @match        https://d.weibo.com/*
// @match        https://www.douban.com/gallery/*
// @match        https://www.douban.com/note/*
// @match        https://movie.douban.com/subject/*
// @match        https://movie.douban.com/review/*
// @match        https://www.toutiao.com/*
// @match        https://crates.io/crates/*
// @match        https://bbs.mihoyo.com/*
// @require      https://unpkg.com/vue@3.5.41/dist/vue.runtime.global.prod.js
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// ==/UserScript==

(function(vue) {
	"use strict";
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	var __defProp = Object.defineProperty;
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
	var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
	var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_removeValueChangeListener = (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
	function once(fn) {
		let called = false;
		return function(...args) {
			if (!called) {
				called = true;
				fn.apply(this, args);
			}
		};
	}
	var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	_css("@charset \"UTF-8\";\n.skr-toast-container {\n  position: fixed;\n  z-index: 99999;\n  top: 80px;\n  right: 0;\n  left: 0;\n  pointer-events: none;\n  text-align: center;\n}\n\n.skr-toast {\n  contain: content;\n  max-height: 100vh;\n  transition: all 0.3s ease-in-out;\n}\n.skr-toast-content {\n  pointer-events: auto;\n  display: inline-flex;\n  justify-content: center;\n  margin-bottom: 10px;\n  padding: 8px 16px;\n  max-width: 90vw;\n  font-size: 14px;\n  line-height: 1.5em;\n  border: 1px solid;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n.skr-toast-content--info {\n  color: #2e8bf0;\n  background: #f0faff;\n  border-color: #d4eeff;\n}\n.skr-toast-content--success {\n  color: #19bf6c;\n  background: #edfff3;\n  border-color: #bbf2cf;\n}\n.skr-toast-content--warning {\n  color: #f90;\n  background: #fff9e6;\n  border-color: #ffe7a3;\n}\n.skr-toast-content--error {\n  color: #ed3f13;\n  background: #ffefe6;\n  border-color: #ffcfb8;\n}\n.skr-toast-content-text {\n  flex: auto;\n}\n.skr-toast-content-close {\n  flex: none;\n  width: 20px;\n  margin: 0 -8px 0 10px;\n  padding: 0;\n  font-size: 16px;\n  color: #ababab;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n}\n.skr-toast {\n  /* 动画 */\n}\n.skr-toast-slide-fade-enter-active, .skr-toast-slide-fade-leave-active {\n  transition: all 0.3s;\n}\n.skr-toast-slide-fade-enter-from {\n  transform: translateY(-50%);\n  opacity: 0;\n}\n.skr-toast-slide-fade-leave-to {\n  transform: translateY(50%);\n  max-height: 0;\n  padding: 0;\n  opacity: 0;\n}");
	var toastTypes = [
		"info",
		"success",
		"warning",
		"error"
	];
	var prefixCls$1 = "skr-toast";
	var containerCls = `${prefixCls$1}-container`;
	function normalizeOptions$1(options, duration) {
		const normalized = typeof options === "string" || (0, vue.isVNode)(options) ? { content: options } : { ...options };
		normalized.duration = duration ?? normalized.duration;
		return normalized;
	}
	var ToastComponent = (0, vue.defineComponent)({
		props: {
			content: {
				type: [String, Object],
				default: ""
			},
			type: {
				type: String,
				validator: (value) => toastTypes.includes(value),
				default: "info"
			},
			closable: {
				type: Boolean,
				default: null
			},
			duration: {
				type: Number,
				default: 3e3
			},
			onClosed: Function
		},
		setup(props, { expose }) {
			const visible = (0, vue.ref)(false);
			const closable = (0, vue.computed)(() => props.duration === 0 && props.closable == null ? true : props.closable);
			let timer;
			const close = () => {
				if (timer !== void 0) {
					clearTimeout(timer);
					timer = void 0;
				}
				visible.value = false;
			};
			(0, vue.onMounted)(() => {
				visible.value = true;
				if (props.duration > 0) timer = setTimeout(close, props.duration);
			});
			(0, vue.onBeforeUnmount)(() => {
				if (timer !== void 0) clearTimeout(timer);
			});
			expose({ close });
			return () => (0, vue.createVNode)(vue.Transition, {
				"name": `${prefixCls$1}-slide-fade`,
				"appear": true,
				"onAfterLeave": () => props.onClosed?.()
			}, { default: () => [visible.value && (0, vue.createVNode)("div", { "class": prefixCls$1 }, [(0, vue.createVNode)("div", { "class": [`${prefixCls$1}-content`, `${prefixCls$1}-content--${props.type}`] }, [(0, vue.createVNode)("div", { "class": `${prefixCls$1}-content-text` }, [props.content]), closable.value && (0, vue.createVNode)("button", {
				"class": `${prefixCls$1}-content-close`,
				"onClick": close
			}, [(0, vue.createTextVNode)("×")])])])] });
		}
	});
	var Toast = function(_opts, duration) {
		const options = normalizeOptions$1(_opts, duration);
		const container = document.createElement("div");
		const toastVNode = (0, vue.createVNode)(ToastComponent, {
			...options,
			onClosed: () => {
				(0, vue.render)(null, container);
				container.remove();
			}
		});
		(0, vue.render)(toastVNode, container);
		insertElementInContainer(container);
		return { close: toastVNode.component.exposed.close };
	};
	toastTypes.forEach((type) => {
		Toast[type] = function(_opts, duration) {
			return Toast({
				...normalizeOptions$1(_opts, duration),
				type
			}, duration);
		};
	});
	function safeAppendElement(cb) {
		document.body ? cb() : window.addEventListener("DOMContentLoaded", cb);
	}
	function insertElementInContainer(element) {
		safeAppendElement(() => {
			let container = document.querySelector(`.${containerCls}`);
			if (container == null) {
				container = document.createElement("div");
				container.classList.add(containerCls);
				document.body.appendChild(container);
			}
			container.appendChild(element);
		});
	}
	function checker({ firefox = 75, edge = 80, chrome = 80, safari = 14, notify = true } = {}) {
		const { userAgent } = window.navigator;
		const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1];
		const edgeVersion = userAgent.match(/Edg\/(\d+)/)?.[1];
		const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
		const safariVersion = userAgent.match(/Version\/(\d+).*Safari/)?.[1];
		let pass = false;
		if (firefoxVersion && Number(firefoxVersion) >= firefox || edgeVersion && Number(edgeVersion) >= edge || chromeVersion && Number(chromeVersion) >= chrome || safariVersion && Number(safariVersion) >= safari) pass = true;
		if (!pass) notify && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0);
		return pass;
	}
	function parseToDOM(str) {
		const div = document.createElement("div");
		if (typeof str === "string") div.innerHTML = str;
		return div.childNodes;
	}
	function append(el) {
		document.body ? document.body.appendChild(el) : window.addEventListener("DOMContentLoaded", () => append(el));
	}
	function mountComponent(RootComponent) {
		const app = (0, vue.createApp)(RootComponent);
		const root = document.createElement("div");
		append(root);
		return {
			instance: app.mount(root),
			unmount() {
				app.unmount();
				document.body.removeChild(root);
			}
		};
	}
	var $ = document.querySelector.bind(document);
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
	function parse(href = location.href) {
		if (!href) return {};
		let search;
		try {
			const url = new URL(href);
			({search} = url);
			if (!search && url.hash.includes("?")) search = url.hash.split("?")[1];
		} catch {
			if (href.includes("?")) search = href.split("?")[1];
			else search = href;
		}
		return Object.fromEntries(new URLSearchParams(search));
	}
	var ready_state_exports = __exportAll({
		DOMContentLoaded: () => DOMContentLoaded,
		complete: () => complete,
		interactive: () => interactive,
		load: () => load,
		loading: () => loading
	});
	var pool = new Map([
		["loading", []],
		["interactive", []],
		["DOMContentLoaded", []],
		["complete", []],
		["load", []]
	]);
	var currentState = document.readyState;
	var execute = (readyState = currentState) => {
		currentState = readyState;
		for (const [state, functions] of pool) {
			while (functions.length) functions.shift()();
			if (readyState === state) break;
		}
	};
	if (document.readyState !== "complete") {
		document.addEventListener("readystatechange", () => execute(document.readyState));
		window.addEventListener("DOMContentLoaded", () => execute("DOMContentLoaded"));
	}
	window.addEventListener("load", () => execute("load"));
	var wrapper = (readyState, fn) => new Promise((resolve) => {
		pool.get(readyState).push(function() {
			resolve(fn?.());
		});
		execute();
	});
	var loading = (fn) => wrapper("loading", fn);
	var interactive = (fn) => wrapper("interactive", fn);
	var DOMContentLoaded = (fn) => wrapper("DOMContentLoaded", fn);
	var complete = (fn) => wrapper("complete", fn);
	var load = (fn) => wrapper("load", fn);
	function calcDiagInRect(width, height) {
		const halfWidth = width / 2;
		const halfHeight = height / 2;
		return function(left, top) {
			const a = left <= halfWidth ? halfWidth - left : left - halfWidth;
			const b = top <= halfHeight ? halfHeight - top : top - halfHeight;
			return Math.sqrt(a * a + b * b);
		};
	}
	_css(".skr-ripple-container {\n  border-radius: inherit !important;\n  inset: 0;\n  contain: strict;\n  margin: 0 !important;\n  overflow: hidden;\n  padding: 0 !important;\n  pointer-events: none !important;\n  position: absolute;\n}\n\n.skr-ripple {\n  animation: skr-ripple forwards cubic-bezier(0.23, 1, 0.32, 1);\n  background: var(--skr-ripple-color);\n  border-radius: 100%;\n  contain: layout;\n  margin: 0 !important;\n  padding: 0 !important;\n  pointer-events: none;\n  position: absolute;\n  transform: scale(0);\n  transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1);\n}\n\n@keyframes skr-ripple {\n  to {\n    transform: scale(3);\n  }\n}");
	var containerClassname = "skr-ripple-container";
	var rippleClassname = "skr-ripple";
	var weakmap = new WeakMap();
	function createRippleContainer() {
		const div = document.createElement("div");
		div.classList.add(containerClassname);
		return div;
	}
	function createRippleEl() {
		const span = document.createElement("div");
		span.classList.add(rippleClassname);
		return span;
	}
	function normalizeOptions(options) {
		if (typeof options === "boolean") return { disabled: !options };
		return options;
	}
	var addRippleEffect = function(_options = {}) {
		let options = normalizeOptions(_options);
		let count = 0;
		function listener(event) {
			if (options.disabled) return;
			const currentTarget = event.currentTarget;
			if (weakmap.get(currentTarget).position === false) {
				weakmap.get(currentTarget).position = true;
				if (getComputedStyle(currentTarget).position === "static") currentTarget.style.position = "relative";
			}
			const rect = currentTarget.getBoundingClientRect();
			const rippleEl = createRippleEl();
			const side = Math.max(rect.width, rect.height);
			const radius = side / 2;
			const left = event.pageX - rect.left - window.scrollX;
			const top = event.pageY - rect.top - window.scrollY;
			options.color && (rippleEl.style.background = options.color);
			rippleEl.style.width = side + "px";
			rippleEl.style.height = side + "px";
			rippleEl.style.top = top - radius + "px";
			rippleEl.style.left = left - radius + "px";
			const base = 1.5;
			const diagonal = calcDiagInRect(rect.width, rect.height)(left, top);
			rippleEl.style.animationDuration = base - base * diagonal / side + "s";
			let container = currentTarget.querySelector(`.${containerClassname}`);
			if (!container) {
				container = createRippleContainer();
				currentTarget.appendChild(container);
			}
			container.appendChild(rippleEl);
			count++;
			const unlisten = (() => {
				const leaveEvents = ["mouseup", "mouseleave"];
				const listener = () => {
					setTimeout(() => {
						rippleEl.style.opacity = "0";
					}, 100);
				};
				leaveEvents.forEach((eventname) => currentTarget.addEventListener(eventname, listener));
				return () => {
					leaveEvents.forEach((eventname) => currentTarget.removeEventListener(eventname, listener));
				};
			})();
			rippleEl.addEventListener("transitionend", (transEvent) => {
				if (transEvent.propertyName === "opacity") {
					unlisten();
					rippleEl.remove();
					if (--count <= 0) container?.remove();
				}
			});
		}
		function update(newOpts) {
			options = Object.assign({}, options, normalizeOptions(newOpts));
		}
		return {
			listener,
			update
		};
	};
	var vRipple = {
		mounted(el, binding) {
			const { listener, update } = addRippleEffect(binding.value);
			weakmap.set(el, {
				listener,
				update,
				position: false
			});
			el.addEventListener("mousedown", listener, false);
		},
		updated(el, binding) {
			weakmap.get(el).update(binding.value);
		}
	};
	_css(".skr-button {\n  border: 1px solid;\n  border-radius: 2px;\n  box-shadow: var(--skr-button-box-shadow);\n  cursor: pointer;\n  line-height: 1.5715;\n  transition: var(--skr-button-transition);\n}\n.skr-button:hover {\n  filter: brightness(1.15);\n}\n.skr-button:focus:not(:focus-visible) {\n  outline: 0;\n}\n.skr-button--primary {\n  background-color: var(--skr-primary-color);\n  border-color: var(--skr-primary-color);\n  color: var(--skr-text-inverse-color);\n}\n.skr-button--default {\n  background-color: var(--skr-white-color);\n  border-color: var(--skr-border-color);\n  color: var(--skr-text-primary-color);\n}\n.skr-button--default:hover {\n  border-color: currentcolor;\n  color: var(--skr-primary-color);\n  filter: brightness(1);\n}\n.skr-button--round {\n  border-radius: 50%;\n}\n.skr-button--shadow {\n  box-shadow: var(--skr-box-shadow-normal);\n}\n.skr-button--mini {\n  font-size: 12px;\n  padding: 2px 7px;\n}\n.skr-button--small {\n  font-size: 12px;\n  padding: 4px 8px;\n}\n.skr-button--normal {\n  font-size: 14px;\n  padding: 4px 15px;\n}\n.skr-button--large {\n  font-size: 15px;\n  padding: 10px 20px;\n}");
	var prefixCls = "skr-button";
	var rippleColor = "rgb(255 255 255 / 15%)";
	var Button = (0, vue.defineComponent)({
		name: "SkrButton",
		directives: { ripple: vRipple },
		props: {
			type: {
				type: String,
				validator: (value) => [
					"primary",
					"info",
					"warning",
					"danger",
					"default"
				].includes(value),
				default: "default"
			},
			plain: {
				type: Boolean,
				default: false
			},
			round: {
				type: Boolean,
				default: false
			},
			shadow: {
				type: Boolean,
				default: false
			},
			size: {
				type: String,
				validator: (value) => [
					"mini",
					"small",
					"normal",
					"large"
				].includes(value),
				default: "normal"
			},
			ripple: {
				type: [Boolean, Object],
				default: true
			}
		},
		setup(props, { slots }) {
			const rippleOptions = (0, vue.computed)(() => {
				return Object.assign({}, { color: props.type === "default" ? void 0 : rippleColor }, typeof props.ripple === "boolean" ? { disabled: !props.ripple } : props.ripple);
			});
			return () => (0, vue.withDirectives)((0, vue.createVNode)("button", { "class": [
				prefixCls,
				`${prefixCls}--${props.type}`,
				{
					[`${prefixCls}--round`]: props.round,
					[`${prefixCls}--shadow`]: props.shadow
				},
				`${prefixCls}--${props.size}`
			] }, [slots.default?.()]), [[(0, vue.resolveDirective)("ripple"), rippleOptions.value]]);
		}
	});
	function createStore$1(modulename = "", local = true) {
		const getRealProp = (property) => modulename ? `[[${modulename}]]-${property}` : property;
		return new Proxy({}, {
			get(target, property, receiver) {
				const realProp = getRealProp(property);
				return local ? _GM_getValue(realProp) : Reflect.get(target, realProp, receiver);
			},
			set(target, property, value, receiver) {
				const realProp = getRealProp(property);
				local ? _GM_setValue(realProp, value) : Reflect.set(target, realProp, value, receiver);
				return true;
			},
			deleteProperty(target, property) {
				const realProp = getRealProp(property);
				local ? _GM_deleteValue(realProp) : Reflect.deleteProperty(target, realProp);
				return true;
			}
		});
	}
	var store_default = createStore$1();
	function createLazyStyle(css) {
		let count = 0;
		let styleElement = null;
		return {
			use() {
				if (count === 0) {
					styleElement = document.createElement("style");
					styleElement.textContent = css;
					(document.head ?? document.documentElement).appendChild(styleElement);
				}
				count += 1;
			},
			unuse() {
				if (count === 0) return;
				count -= 1;
				if (count === 0 && styleElement) {
					styleElement.remove();
					styleElement = null;
				}
			}
		};
	}
	var banciyuan = ({ store, createControl }) => ({ handler() {
		function execute() {}
		createControl({
			store,
			execute
		});
	} });
	var styles$24 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 750px) {\n  :root {\n    --inject-page-width: min(90vw, 1150px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 90vw;\n  }\n  /* 文章宽屏 */\n  .rich_media_area_primary_inner {\n    margin-left: auto;\n    margin-right: auto;\n    max-width: var(--inject-page-width) !important;\n  }\n  /* 二维码位置 */\n  #js_pc_qr_code .qr_code_pc {\n    opacity: 0.2;\n    position: fixed;\n    right: 3vw;\n    top: 25vh;\n  }\n  #js_pc_qr_code .qr_code_pc:hover {\n    opacity: 1;\n  }\n}");
	var weixin = ({ store, createControl }) => ({ handler() {
		function execute() {
			interactive(() => {
				$$("img").forEach((img) => {
					const dataSrc = img.dataset.src;
					if (!dataSrc) return;
					const url = new URL(dataSrc);
					url.pathname = url.pathname.replace("/640", "/");
					img.dataset.src = url.href;
				});
			});
			styles$24.use();
		}
		createControl({
			store,
			execute
		});
	} });
	var styles$23 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1000px) {\n  :root {\n    --inject-page-width: min(75vw, 1120px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 75vw;\n  }\n  .Post-NormalMain .Post-Header,\n  .Post-NormalMain > div,\n  .Post-NormalSub > div {\n    width: var(--inject-page-width);\n  }\n  .Post-NormalMain .Post-Header {\n    /* 文章头部作者 */\n  }\n  .Post-NormalMain .Post-Header .AuthorInfo {\n    max-width: none;\n    width: 0;\n  }\n  /* 内容图片 */\n  .ztext .content_image,\n  .ztext .origin_image {\n    max-width: 690px;\n  }\n  /* 左侧悬浮按钮 */\n  .Post-SideActions {\n    left: calc(50% - var(--inject-page-width) / 2 - 120px);\n  }\n}");
	var zhihuZhuanlan = ({ store, createControl }) => ({ handler() {
		function execute() {
			DOMContentLoaded(() => {
				const process = new WeakSet();
				new MutationObserver((mutationsList) => {
					mutationsList.forEach((mutation) => {
						const { target, oldValue } = mutation;
						if (process.has(target) || target.tagName !== "IMG" || !oldValue.startsWith("data:image/") || !(target.classList.contains("lazy") && !target.classList.contains("data-thumbnail"))) return;
						process.add(target);
						target.dataset.original && (target.src = target.dataset.original);
					});
				}).observe($(".Post-RichTextContainer"), {
					subtree: true,
					attributeFilter: ["src"],
					attributeOldValue: true
				});
			});
			styles$23.use();
		}
		createControl({
			store,
			execute
		});
	} });
	var styles$22 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1350px) {\n  :root {\n    --inject-page-width: min(75vw, 1300px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 75vw;\n  }\n  .QuestionHeader-content,\n  .QuestionHeader-footer {\n    margin-left: auto;\n    margin-right: auto;\n    padding-left: 0 !important;\n    width: var(--inject-page-width) !important;\n  }\n  .QuestionHeader-footer-inner {\n    width: auto;\n  }\n  .QuestionHeader-footer-main {\n    padding-left: 0;\n  }\n  .QuestionHeader-main {\n    flex: 1;\n    width: 0;\n  }\n  .Question-main {\n    width: var(--inject-page-width) !important;\n  }\n  .Question-main .AnswerItem-authorInfo {\n    max-width: none;\n  }\n  .Question-main {\n    /* 查看全部回答后 结构不太一样 */\n    /* 简短回答 */\n  }\n  .Question-main > .ListShortcut {\n    flex: 1;\n    width: 0;\n  }\n  .Question-main > .ListShortcut > .Question-mainColumn[data-zop-questionanswerlist] {\n    padding-right: 10px;\n    width: auto;\n  }\n  .Question-main {\n    /* 全部回答 */\n  }\n  .Question-main > .Question-mainColumn {\n    flex: 1;\n    padding-right: 10px;\n  }\n  /* 内容图片 */\n  .ztext .content_image,\n  .ztext .origin_image {\n    max-width: 694px;\n  }\n}");
	var zhihuQuestion = ({ store, createControl }) => ({ handler() {
		function execute() {
			DOMContentLoaded(() => {
				const process = new WeakSet();
				new MutationObserver((mutationsList) => {
					mutationsList.forEach((mutation) => {
						const { target, oldValue } = mutation;
						if (process.has(target) || target.tagName !== "IMG" || !oldValue.startsWith("data:image/") || !$(".ListShortcut").contains(target) || !(target.classList.contains("lazy") && !target.classList.contains("data-thumbnail"))) return;
						process.add(target);
						target.dataset.original && (target.src = target.dataset.original);
					});
				}).observe($(".QuestionPage"), {
					subtree: true,
					attributeFilter: ["src"],
					attributeOldValue: true
				});
			});
			styles$22.use();
		}
		createControl({
			store,
			execute
		});
	} });
	var styles$21 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1100px) {\n  :root {\n    --inject-page-width: min(91vw, 1360px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 91vw;\n  }\n  .Topstory-container {\n    width: var(--inject-page-width);\n  }\n  /* 内容 */\n  .Topstory-mainColumn {\n    flex: 1;\n  }\n  /* 右侧 */\n  .GlobalSideBar {\n    flex: initial;\n    width: 296px;\n  }\n}");
	var zhihuHome = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$21.use
		});
	} });
	var styles$20 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1100px) {\n  :root {\n    --inject-page-width: min(91vw, 1295px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 91vw;\n  }\n  .ContentLayout {\n    width: var(--inject-page-width);\n  }\n  /* 内容 */\n  .ContentLayout-mainColumn {\n    flex: 1;\n  }\n}");
	var zhihuTopic = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$20.use
		});
	} });
	var styles$19 = createLazyStyle("@charset \"UTF-8\";\n/* 掘金文章 */\n@media screen and (min-width: 1400px) {\n  :root {\n    --inject-page-width: min(82vw, 1300px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 82vw;\n  }\n  #juejin .main-container {\n    max-width: var(--inject-page-width) !important;\n  }\n  #juejin .main-container .main-area {\n    width: calc(100% - 25rem - 20px);\n  }\n}");
	var juejin = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$19.use
		});
	} });
	var styles$18 = createLazyStyle("/* crates.io package */\n@media screen and (min-width: 1300px) {\n  :root {\n    --inject-page-width: min(82vw, 1400px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 82vw;\n  }\n  body > main > div:first-of-type {\n    width: var(--inject-page-width);\n  }\n}");
	var crates = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$18.use
		});
	} });
	var styles$17 = createLazyStyle("@charset \"UTF-8\";\n/* 简书文章 */\n@media screen and (min-width: 1250px) {\n  :root {\n    --inject-page-width: min(85vw, 1280px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 85vw;\n  }\n  #__next {\n    /* 左侧悬浮按钮 */\n  }\n  #__next > div:last-child {\n    left: calc(50% - var(--inject-page-width) / 2 - 80px);\n  }\n  #__next [role=main] {\n    width: var(--inject-page-width);\n    /* 内容 */\n  }\n  #__next [role=main] > div:first-child {\n    flex: 1;\n  }\n}");
	var jianshu = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$17.use
		});
	} });
	var www_baidu_com_default = "@charset \"UTF-8\";\n@media screen and (min-width: 1460px) {\n  :root {\n    --inject-page-width: min(75vw, 1300px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 75vw;\n  }\n  /* 顶部搜索 */\n  /* 修复搜索主页换肤后头部异常 */\n  #head:not(.s-skin-hasbg) {\n    backdrop-filter: blur(10px);\n    background-color: rgba(255, 255, 255, 0.8196078431);\n  }\n}\n@media screen and (min-width: 1460px) and (width <= 1920px) {\n  .head_wrapper .s_form {\n    margin-left: auto;\n    margin-right: auto;\n    width: fit-content;\n  }\n}\n@media screen and (min-width: 1460px) {\n  /* 搜索tab */\n  .s_tab {\n    margin-left: auto;\n    margin-right: auto;\n    padding-left: 0 !important;\n    width: fit-content;\n  }\n  /* 搜索内容 */\n  #container {\n    margin-left: auto !important;\n    margin-right: auto !important;\n    width: var(--inject-page-width) !important;\n  }\n  /* 左侧搜索结果 */\n  #content_left {\n    width: calc(var(--inject-page-width) - 450px) !important;\n    /* [tpl*=img_address]忽略图片区域，防止宽屏后排版混乱(搜索：樱花) */\n  }\n  #content_left > div:not([tpl*=img_address]) {\n    width: 100% !important;\n  }\n  #content_left {\n    /* 视频宽度限制(搜索：路人女主的养成方法) */\n  }\n  #content_left .op-bk-polysemy-video__wrap {\n    width: 560px !important;\n  }\n  #content_left {\n    /* 游戏配置搜索结果卡片中图片的高度处理(搜索：赛博朋克2077配置要求) */\n  }\n  #content_left .wenda-abstract-img-wrap-new {\n    height: auto;\n  }\n  #content_left {\n    /* 圆角卡片式，在热榜新闻中偶尔出现 */\n  }\n  #content_left .c-group-wrapper .result-op,\n  #content_left .c-group-wrapper .c-group {\n    width: 95% !important;\n  }\n  #content_left {\n    /* 普通列表 */\n  }\n  #content_left .new-pmd .c-span9 {\n    width: 75%;\n  }\n  #content_left .new-pmd {\n    /* 百科宽度(搜索：感冒) */\n  }\n}\n@media screen and (min-width: 1460px) and (width >= 1680px) {\n  #content_left .new-pmd .c-span9 {\n    width: 81%;\n  }\n}\n@media screen and (min-width: 1460px) {\n  #content_left .new-pmd .c-span12 {\n    width: 100%;\n  }\n}\n@media screen and (min-width: 1460px) {\n  /* 分页 */\n  .page-inner {\n    margin-left: auto;\n    margin-right: auto;\n    padding-left: 0 !important;\n    width: var(--inject-page-width);\n  }\n  /* 页脚 */\n  .foot-inner {\n    margin-left: auto;\n    margin-right: auto;\n    width: var(--inject-page-width);\n  }\n  #foot .foot-inner #help {\n    padding-left: 0 !important;\n  }\n}";
	var baidu = ({ store, createControl }) => ({ handler() {
		function execute() {
			const styleSheet = _GM_addStyle(www_baidu_com_default);
			interactive(() => {
				const template = document.createElement("template");
				template.appendChild(styleSheet);
				document.body.insertAdjacentElement("afterbegin", template);
			});
		}
		createControl({
			store,
			execute
		});
	} });
	var styles$16 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1390px) {\n  :root {\n    --inject-page-width: min(80vw, 1250px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 80vw;\n  }\n  #container {\n    width: var(--inject-page-width);\n  }\n  #container > .content {\n    width: 100%;\n  }\n  .nav_wrap,\n  .p_thread,\n  .pb_content,\n  .core_title_wrap_bright,\n  .core_reply_wrapper,\n  .l_post_bright .core_reply_wrapper,\n  .pb_footer {\n    width: 100%;\n  }\n  .core_title_absolute_bright {\n    width: calc(var(--inject-page-width) - 240px);\n  }\n  /* 内容区域 */\n  .pb_content {\n    background-size: 100%;\n    display: flex;\n  }\n  .pb_content::after {\n    content: none;\n  }\n  /* 点击展开，查看完整图片 */\n  .pb_content .replace_div {\n    width: fit-content !important;\n  }\n  .pb_content .replace_div .replace_tip {\n    width: 100% !important;\n  }\n  /* 楼区域 */\n  .left_section {\n    border-right: 2px solid #e4e6eb;\n    flex: 1;\n  }\n  /* 楼层 广告会覆盖宽度 使用important */\n  .l_post_bright {\n    display: flex;\n    width: 100% !important;\n  }\n  .l_post_bright .d_post_content_main {\n    flex: 1;\n    width: 0;\n  }\n  /* 修正楼层回复中小按钮位置 */\n  .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-down,\n  .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-up,\n  .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-action {\n    right: 180px !important;\n  }\n  /* 右侧悬浮按钮 */\n  .tbui_aside_float_bar {\n    left: calc(50% + var(--inject-page-width) / 2 + 12px);\n    margin-left: 0;\n    right: auto;\n  }\n}");
	var tieba = ({ store, createControl }) => ({ handler() {
		function execute() {
			styles$16.use();
		}
		createControl({
			store,
			execute
		});
	} });
	var styles$15 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1390px) {\n  :root {\n    --inject-page-width: min(80vw, 1250px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 80vw;\n  }\n  /* 头部信息 */\n  .head_main .head_middle,\n  .head_main .head_content {\n    width: var(--inject-page-width) !important;\n  }\n  /* 内容区域 */\n  .content,\n  .foot {\n    width: var(--inject-page-width);\n  }\n  /* 这里的border实际上是这里的背景图 */\n  .forum_content {\n    background: #fff;\n  }\n  #content_wrap {\n    border-right: 1px solid #eee;\n    width: calc(100% - 248px);\n  }\n  /* 每条帖子 */\n  .threadlist_detail {\n    display: flex;\n  }\n  .threadlist_detail .pull_left {\n    flex: auto;\n  }\n  .threadlist_detail .pull_left .threadlist_abs {\n    width: 97%;\n  }\n  /* 发帖区域 */\n  .frs_content_footer_pagelet {\n    width: auto !important;\n  }\n  .tb_rich_poster_container {\n    margin-left: 0 !important;\n  }\n  /* 右侧悬浮按钮 */\n  .tbui_aside_float_bar {\n    left: calc(50% + var(--inject-page-width) / 2 + 12px) !important;\n    margin-left: 0 !important;\n    right: auto;\n  }\n}");
	var tiebaForum = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$15.use
		});
	} });
	var styles$14 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1200px) {\n  :root {\n    --inject-page-width: min(80vw, 1340px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 80vw;\n  }\n  .hintBox,\n  #pagebar_container,\n  #s_footer > div, #wrapper, .header .header-box {\n    margin-left: auto;\n    margin-right: auto;\n    padding-left: 0;\n    width: var(--inject-page-width) !important;\n  }\n  /* 头部注意滚动处理 */\n  .header .header-box {\n    padding: 0 5px 45px;\n    position: relative;\n  }\n  .header .header-box .logo {\n    top: -8px;\n  }\n  .header,\n  .header.headsearch .header-box {\n    padding-bottom: 0;\n  }\n  .headsearch {\n    backdrop-filter: blur(10px);\n    background-color: rgba(255, 255, 255, 0.8196078431);\n  }\n  /* 搜索结果 */\n  #wrapper {\n    display: flex;\n  }\n  #main {\n    flex: 1;\n    max-width: none;\n    padding-right: 74px;\n    width: 0;\n  }\n  #main .results {\n    width: auto;\n  }\n  #main .results > .vrwrap,\n  #main .results > .rb {\n    width: auto !important;\n  }\n  /* 特殊搜索结果恢复原本宽度 */\n  .special-wrap,\n  .vrPicBox {\n    box-sizing: border-box;\n    width: 550px;\n  }\n  /* 底部 */\n  #s_footer {\n    padding-left: 0;\n  }\n}");
	var sougou = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$14.use
		});
	} });
	var styles$13 = createLazyStyle("@charset \"UTF-8\";\n/* 专栏/问答 */\n@media screen and (min-width: 1390px) {\n  :root {\n    --inject-page-width: min(82vw, 1350px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 82vw;\n  }\n  .container,\n  .container-lg,\n  .container-md,\n  .container-sm,\n  .container-xl {\n    max-width: var(--inject-page-width);\n  }\n}");
	var segmentfault = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$13.use
		});
	} });
	var styles$12 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1120px) {\n  :root {\n    --inject-page-width: min(83vw, 1160px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 83vw;\n  }\n  #app .article-detail {\n    width: var(--inject-page-width);\n  }\n  #app {\n    /* 文章 */\n  }\n  #app #article-content {\n    /* 图片宽度 */\n  }\n  #app #article-content .img-box img[data-type=preview] {\n    height: auto !important;\n    max-width: 100%;\n    width: auto !important;\n  }\n  #app {\n    /* 右侧悬浮按钮 */\n  }\n  #app .right-side-bar {\n    margin-left: calc(var(--inject-page-width) + 25px);\n    transition-property: bottom;\n  }\n  #app {\n    /* 文章下方图片 哎？广告 */\n  }\n  #app .activty-image .card-image {\n    margin: auto;\n  }\n}");
	var bilibili = ({ store, createControl }) => ({ handler() {
		function execute() {
			DOMContentLoaded(() => {
				$$("#article-content .img-box img[data-type=\"preview\"][data-src]").forEach((img) => {
					const { src } = img.dataset;
					const original = src.replace(/@[0-9a-z]+_[0-9a-z]+_/i, "@");
					img.dataset.src = original;
				});
			});
			styles$12.use();
		}
		createControl({
			store,
			execute
		});
	} });
	var index_lazy_default$6 = "@charset \"UTF-8\";\n@media screen and (min-width: 1380px) {\n  :root {\n    --inject-page-width: min(85vw, 1454px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 85vw;\n  }\n  #app .bili-dyn-home--member {\n    width: var(--inject-page-width) !important;\n    /* 内容 */\n  }\n  #app .bili-dyn-home--member > main {\n    flex: 1;\n    /* up 列表 */\n  }\n  #app .bili-dyn-home--member > main .bili-dyn-up-list {\n    width: auto;\n  }\n  #app .bili-dyn-home--member .bili-dyn-content,\n  #app .bili-dyn-home--member .bili-dyn-content__orig__major {\n    width: auto !important;\n  }\n}";
	var detail_lazy_default = "@charset \"UTF-8\";\n@media screen and (min-width: 900px) {\n  :root {\n    --inject-page-width: min(75vw, 1039px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 75vw;\n  }\n  #app {\n    /* 容器 */\n  }\n  #app .content {\n    width: var(--inject-page-width) !important;\n  }\n  #app {\n    /* up主内容 */\n  }\n  #app .bili-dyn-content {\n    width: auto !important;\n  }\n}";
	var styles$11 = createLazyStyle(".mocha-strawberry {\n  bottom: 50px;\n  position: fixed;\n  right: 70px;\n  z-index: 1;\n}");
	load(async () => {
		const MochaId = "212535360";
		if (location.href.includes("space.bilibili.com/" + MochaId)) {
			youAreNotAlone();
			return;
		}
		await sleep(1e3);
		const uploader = $(".main-content .user-name a[href]")?.href;
		if (!uploader) return;
		if (!(uploader.match(/\/(\d+)\//)?.[1] === MochaId)) return;
		youAreNotAlone();
	});
	function youAreNotAlone() {
		styles$11.use();
		document.body.append(parseToDOM(strawberry)[0]);
	}
	var strawberry = "<svg class=\"mocha-strawberry\" t=\"1611323249307\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3471\" width=\"200\" height=\"200\"><path d=\"M799 780c-27.5 27.5-100.4 64.8-188.8 97.1 1.6-0.6 3.3-1.2 4.9-1.8-24.2-40.7-66.3-22.5-91.9-58.4-25.6-35.9 72.6-132.4 10.2-205S403.5 576 348 571.8c-55.5-4.3-114.5-75.2-147.8-120.5-13.9-18.9-20.7-54.3-23.8-89 17.6-41.9 37-78 56.7-104.7 2.6 32.6 19.6 94.1 64.7 102.9 117 23.1 184.3-39.1 256.3-6.8 17.7 7.9 29.5 22.5 38 40.8 13.9 29.6 19.6 68.9 29 105.2 9.2 35.4 21.9 68.1 49.1 86.4 64.5 43.2 132.2 49.4 187.3 9.6 3.9-2.8 7.7-5.8 11.4-9 11.4 86.1-26.6 150.1-69.9 193.3z\" fill=\"#F9724C\" p-id=\"3472\"></path><path d=\"M615.2 875.3c-51.8 19.1-104.7 35.2-158.5 47.7-53.5 12.4-108.3 21.7-163.4 22.7-31 0.6-62.7-1.3-92.6-10 6 1.7 12.9 4.4 19.1 3.7 5-0.6 9.9-1.4 14.8-2.6 10.2-2.4 20.1-6.2 29.4-11.2 21.8-11.6 40.8-29.7 54.5-50.2 22.8-34.3 8.2-74.7-10.6-107.1-26.5-45.7-62.2-85.5-94.1-127.3-14.6-19.1-28.1-37.9-36.5-60.6-8-21.7-12.2-44.6-14.2-67.5-4-44.3-0.3-89.2 6.8-132.9 1-6.2 4.1-12 6.6-17.8 2.4 26.4 5.7 55.1 17.8 79.1 6.1 12 15.4 22.6 23.7 33.1 8.5 10.7 17.3 21.1 26.6 31.1 18 19.5 37.9 38.1 60.9 51.5 11.1 6.5 23.3 11.7 36.1 13.9 13.8 2.3 28 1 41.8-0.4 28-2.9 56.3-7.5 84.2-1 25.6 6 47.4 21.2 64.5 40.7 18 20.5 24.8 46 21.6 73-3.3 27.7-15 53.3-24.8 79.1-4.6 12.2-9.9 25.3-10 38.5-0.2 12.9 8.1 22.7 18.2 29.8 20.4 14.4 48.2 13.2 67 30.7 4.3 4.2 8 8.9 11.1 14z\" fill=\"#ED4233\" p-id=\"3473\"></path><path d=\"M316.5 878.4c-14 19.3-31.6 36.3-52.8 47.5-10.5 5.5-21.8 9.6-33.4 11.9-5.1 1-10.7 2.4-15.8 1.4-6.2-1.2-12.4-3-18.5-4.9-21.7-6.9-41.9-18.1-56.7-35.8-15-18-24.2-40.2-30.3-62.6-13.1-47.9-13.6-99-10.4-148.3 3.3-50.4 11.3-100.5 22.4-149.7 12.4-54.9 29-108.6 49.4-161 0 3.9-1.3 8.2-1.9 12-0.6 4.2-1.2 8.4-1.8 12.7-1.2 8.9-2.2 17.9-3 26.9-1.7 18.9-2.5 37.9-2.1 56.9 0.7 36.2 5.6 73.4 20.5 106.7 7.4 16.5 18 30.7 28.9 45.1 11.1 14.7 22.6 29.2 34 43.6 22.2 28.2 45.1 56.4 63.1 87.5 9.7 16.7 18.3 34.8 21.3 54.1 3.1 19.9-1.1 39.7-12.9 56z\" fill=\"#D10305\" p-id=\"3474\"></path><path d=\"M869 586.6c-21.1 18.3-46.9 30.9-74.7 34.5-28.2 3.6-56.8-1.9-82.9-12.7-24.7-10.3-50-24.3-65.3-47-15.9-23.6-23-52.2-29.3-79.6-6.4-28-11.4-57-22.9-83.5-5.1-11.8-11.8-23-21.1-31.9-9.4-9-21.1-14.6-33.6-18.1-28.7-8-58.4-2.6-87 3.4-29.1 6.1-58.2 12.5-88.1 13.8-15 0.7-30.1 0.1-45.1-1.6-13.7-1.6-27.9-3.3-39.9-10.7-22.2-13.8-34.1-40.2-40.6-64.6-1.8-6.9-3.3-13.8-4.3-20.9-0.4-2.8-1.5-6.5-1.1-9.2 0.3-2.1 1.8-3.4 3.1-5.2 8.7-11.3 18.4-21.5 29-31 21-19 44.3-35.6 70.2-47.1 26.7-11.8 55.6-17.8 84.8-17.3 29.2 0.5 58 7.3 85.2 17.7 54.5 20.9 103 55.3 147.2 92.9 44.4 37.8 86.1 79.6 122.6 125.1 36.3 45.2 68.4 95.7 84.9 151.6 4 13.6 7.1 27.5 8.9 41.4z\" fill=\"#F7B696\" p-id=\"3475\"></path><path d=\"M621.2 499.7c-22.3 2.4-37.4 2.1-37.4 2.1s-10.2-48.5 8.4-107.4c13.9 29.7 19.6 68.9 29 105.3z\" fill=\"#ED4233\" p-id=\"3476\"></path><path d=\"M870.8 606.2c-4.4-3.3-8.8-6.9-13.1-10.5-47.8-40.3-92.7-100.2-92.7-151.8-38.7 38.7-103 51.6-143.7 55.9-9.4-36.4-15.1-75.6-29-105.2 8.5-26.8 22.9-55.8 47.1-83.4-101.2 0-150.5-92.4-178.2-148.6 0.5 0.1 1 0.2 1.4 0.3 1.3 0.3 2.7 0.6 4 0.9 0.6 0.1 1.2 0.3 1.7 0.4 1.6 0.4 3.3 0.8 4.9 1.2 0.5 0.1 1 0.2 1.4 0.4 2 0.5 4.1 1.1 6.2 1.7 0.7 0.2 1.3 0.4 2 0.6 2.1 0.6 4.2 1.3 6.3 1.9 0.7 0.2 1.4 0.4 2.1 0.7 1.1 0.4 2.3 0.8 3.4 1.2 0.8 0.3 1.7 0.6 2.5 0.9 2.6 0.9 5.3 1.9 7.9 2.9 1 0.4 2.1 0.8 3.1 1.2 2.6 1 5.2 2.1 7.8 3.2 1 0.4 2.1 0.9 3.1 1.3 0.2 0.1 0.3 0.1 0.5 0.2 0.9 0.4 1.9 0.8 2.9 1.3 1.4 0.6 2.7 1.2 4.1 1.9 1.2 0.6 2.4 1.1 3.6 1.7 1.2 0.6 2.4 1.1 3.6 1.7 1.3 0.6 2.5 1.2 3.8 1.9 1.1 0.5 2.1 1.1 3.2 1.6 2.6 1.3 5.3 2.8 8 4.2 1.3 0.7 2.5 1.4 3.8 2.1 0.1 0.1 0.3 0.2 0.4 0.2 1.1 0.6 2.3 1.3 3.4 1.9 1.2 0.7 2.4 1.4 3.6 2 0.1 0.1 0.2 0.1 0.2 0.1 2.5 1.5 5.1 3 7.7 4.5 1.4 0.8 2.8 1.7 4.2 2.5 1.2 0.7 2.4 1.5 3.6 2.2 2.6 1.6 5.2 3.3 7.9 5l5.1 3.3c1 0.7 1.9 1.3 2.9 1.9 1.3 0.9 2.7 1.8 4 2.7s2.7 1.9 4 2.8c2.7 1.9 5.4 3.8 8.1 5.8 0.2 0.2 0.4 0.3 0.7 0.5 1.1 0.8 2.3 1.7 3.4 2.5 1.4 1 2.7 2 4.1 3 1.4 1 2.8 2.1 4.1 3.1 1.1 0.9 2.3 1.8 3.4 2.6 0.3 0.2 0.6 0.5 0.9 0.7 1.3 1 2.7 2.1 4 3.1l0.2 0.2c1.3 1.1 2.7 2.1 4 3.2 1.4 1.1 2.8 2.3 4.2 3.4 1.4 1.1 2.7 2.2 4.1 3.3 0.2 0.2 0.4 0.3 0.7 0.5 1.3 1 2.5 2.1 3.8 3.2 1.4 1.2 2.9 2.4 4.3 3.6 1.4 1.2 2.9 2.4 4.3 3.7 1.4 1.2 2.9 2.5 4.3 3.7 1.4 1.3 2.9 2.5 4.4 3.8s2.9 2.6 4.4 3.9c2.9 2.6 5.8 5.2 8.7 7.9 0.1 0.1 0.2 0.2 0.4 0.3 2.7 2.5 5.5 5 8.2 7.6l0.5 0.5c3 2.8 6 5.7 9 8.6 1.4 1.4 2.9 2.8 4.3 4.1l0.3 0.3c2.7 2.6 5.4 5.3 8.2 8l1 1 4.6 4.6c3.5 3.5 7 7.1 10.4 10.6 0.9 0.9 1.7 1.8 2.5 2.6 0.8 0.9 1.7 1.7 2.5 2.6 2.5 2.6 5 5.2 7.4 7.8 0.1 0.1 0.2 0.3 0.4 0.4 1.5 1.6 2.9 3.2 4.4 4.7 1.6 1.7 3.2 3.5 4.7 5.2 0.8 0.9 1.5 1.7 2.3 2.6 2.3 2.5 4.6 5.1 6.8 7.6 0.7 0.8 1.5 1.7 2.2 2.5s1.5 1.7 2.2 2.5c11.4 13.3 21.9 26.2 31.3 38.9 0.6 0.7 1.1 1.5 1.6 2.2 9.3 12.5 17.6 24.7 25 36.6 0.4 0.7 0.9 1.4 1.3 2 0.5 0.7 0.9 1.5 1.4 2.2 0.8 1.3 1.6 2.7 2.4 4 1.7 2.8 3.3 5.5 4.8 8.3 3.1 5.5 6.1 10.9 8.9 16.2 0.7 1.3 1.4 2.7 2 4 1.4 2.7 2.7 5.3 3.9 7.9 0.6 1.2 1.1 2.4 1.7 3.5 0.1 0.3 0.3 0.5 0.4 0.8 0.4 0.8 0.8 1.7 1.1 2.5 0.3 0.6 0.6 1.2 0.8 1.8 0.5 1 0.9 2 1.4 3.1 0.5 1.2 1 2.3 1.5 3.5s1 2.4 1.5 3.5c0.3 0.8 0.6 1.5 0.9 2.3 0.4 0.9 0.7 1.8 1.1 2.7 0.4 1.1 0.9 2.3 1.3 3.4 0.5 1.3 1 2.5 1.4 3.8 0.9 2.5 1.8 5 2.6 7.5 0.4 1.1 0.7 2.2 1.1 3.3 0.1 0.2 0.1 0.3 0.2 0.5 0.4 1.2 0.8 2.4 1.1 3.5v0.1c0.3 0.8 0.5 1.7 0.8 2.5 0.2 0.6 0.4 1.3 0.6 1.9 0.3 1 0.6 1.9 0.8 2.9 0.3 1.2 0.7 2.3 1 3.4 0 0.1 0.1 0.2 0.1 0.4 0.6 2.3 1.2 4.5 1.7 6.7 1.2 4.8 2.2 9.6 3.1 14.3 0.2 1.2 0.4 2.3 0.6 3.5 0.2 1.1 0.4 2.3 0.6 3.4 0.2 1.1 0.4 2.3 0.5 3.4 0.2 1.1 0.3 2.3 0.5 3.4 1 6.5 1.6 13 1.9 19.4z\" fill=\"#F9724C\" p-id=\"3477\"></path><path d=\"M773.1 282.7c56-33.2 84.3-95.3 85.7-98.4 4.1-9.1 0-19.9-9.2-23.9-9.1-4.1-19.9 0-23.9 9.2-0.1 0.2-8.6 19-25.3 40.3-12.6 16-31.9 36-57 47.5C671.9 74.2 523.7 95 427.5 105.7c24.6 45.7 71.7 174.8 191.3 174.8-77.1 88.1-55.5 190.7-55.5 190.7s121.4 1.8 181.1-58c0 84.4 120.2 190.9 176.4 197.9 3-89.4 23.5-269.7-147.7-328.4z\" fill=\"#91AB48\" p-id=\"3478\"></path><path d=\"M800.4 209.8c16.7-21.3 25.2-40.1 25.3-40.3 4.1-9.1 14.8-13.2 23.9-9.1 3 1.3 5.4 3.3 7.2 5.8 0.1-0.2 0.2-0.4 0.2-0.5 3.9-8.8 0-19.1-8.8-23.1-8.8-3.9-19.1 0-23.1 8.8-0.1 0.2-8.3 18.3-24.4 38.8-12.1 15.5-30.8 34.7-54.9 45.8C677 59.6 534.2 79.6 441.6 89.9c2.1 3.9 4.4 8.5 6.9 13.5 95.6-10.3 228.5-16.3 295 154 25-11.6 44.4-31.5 56.9-47.6zM794.1 268c-6.5 5.3-13.5 10.2-21 14.7C868.6 315.4 904.5 386 917 457.5c-6.9-72.9-33.8-150.4-122.9-189.5zM273.4 213.6c-2.8 2.8-5.5 5.8-8.3 9 50.9-46.5 112.7-75.2 190.9-61-4-7.2-7.6-14.2-10.9-20.9-70-4.9-125.6 26.8-171.7 72.9z\" fill=\"#FFFFFF\" p-id=\"3479\"></path><path d=\"M911.2 431c-0.3 24.1-6.3 42-23.5 42-53 0-67.3-87.7-96.7-59s-52.2-18.5-62.4-29.7-63.2 1-90.9-37.8c-27.7-38.7 46-97.9 28.2-130.5S522.4 182.6 551 132.4c7.4-13 23-20.4 41.9-24.1 58.6 16 114.3 56.5 150.5 149 25.1-11.5 44.4-31.5 57-47.5 16.7-21.3 25.2-40.1 25.3-40.3 4.1-9.1 14.8-13.2 23.9-9.1 9.1 4.1 13.2 14.8 9.2 23.9-1.4 3.1-29.7 65.2-85.7 98.4 83.7 28.7 121.6 86.4 138.1 148.3z\" fill=\"#A6BF4C\" p-id=\"3480\"></path><path d=\"M270 213.3c2.9 0 5.8-1.2 7.8-3.3 56.7-56.8 116.8-78.8 183.8-67.4 3.1 1.4 6.8 1.4 9.9-0.3 0.8-0.4 1.5-0.9 2.1-1.5 1.9-1.6 3.3-3.8 3.8-6.5 0.5-2.9-0.1-5.8-1.7-8.2-0.4-0.6-0.9-1.2-1.4-1.7-5.3-9.8-10-19.3-14.2-27.7l-2.1-4.3c-0.8-1.7-1.6-3.3-2.4-4.9 33.6-3.7 77.4-7.8 119-0.6 50.2 8.7 89.4 32.1 119.9 71.4 2 2.7 5.2 4.3 8.7 4.3 2.5 0 4.8-0.8 6.8-2.4 2.3-1.7 3.8-4.3 4.2-7.1 0.4-2.9-0.4-5.9-2.2-8.3-34.2-44.2-78.3-70.2-134.8-79.8-47.6-8-95.4-2.7-133.8 1.7l-5.9 0.7c-3.5 0.3-6.6 2.5-8.5 5.6-1.8 3.1-1.9 7-0.2 10.4l0.1 0.1c2.3 4.2 4.7 9.2 7.5 14.9l3.4 6.9c2 4.1 4.2 8.5 6.5 13.1-66.8-5.8-127.3 19.2-184.1 76l-0.1 0.1c-4.1 4.3-4.1 11.2 0 15.4 2.1 2.2 4.9 3.4 7.9 3.4zM841.6 671.9c-2.5-1.5-5.4-2-8.3-1.3-2.9 0.7-5.3 2.5-6.8 4.9-9.9 16.3-22.3 31.9-36.9 46.5-17.7 17.7-58.5 41.3-111.9 64.7-56.6 24.8-122.5 47.4-185.5 63.6-72.1 18.6-138.1 28.5-191 28.6H300c-59.9 0-102.2-12-125.9-35.6-18.1-18.1-30.8-46.7-37.7-85-6.5-36.1-7.8-79.5-3.7-129.1 7.5-91.4 33-198.3 68.2-286.1 1.2-2.8 1.2-5.8 0-8.5s-3.3-4.8-6-5.9c-2.7-1.1-5.7-1.1-8.4 0-2.7 1.2-4.8 3.3-5.9 6-36 89.7-62.1 199-69.7 292.5-4.2 51.6-2.9 96.9 4 134.8 7.7 42.8 22.4 75.3 43.8 96.7 28 27.9 75.6 42.1 141.4 42.1h0.2l0.4 0.1h0.6c54.8-0.2 122.7-10.4 196.4-29.4 131.1-33.9 266.2-92.8 307.5-134.1 15.9-15.9 29.4-32.9 40.1-50.5 3.1-5.1 1.5-11.8-3.7-15zM913.9 381.1c-9.8-32.5-25.1-60.5-45.4-83-19.4-21.6-43.8-38.9-72.7-51.5 46-35.5 69.1-87.3 69.4-87.9 6.4-14.3-0.1-31.3-14.4-37.7-6.8-3.1-14.6-3.3-21.9-0.6-7 2.7-12.7 8.1-15.8 15v0.1c-0.9 1.8-8.7 18.4-23.1 36.7-10.7 13.7-28.3 32.3-51 42.7-2.7 1.2-4.7 3.5-5.7 6.2-1 2.8-0.9 5.8 0.4 8.4 1.2 2.7 3.5 4.7 6.2 5.7 2.8 1 5.8 0.9 8.4-0.4 26.7-12.3 46.9-33.5 59.1-49.2 15.6-19.9 24.1-37.6 25.8-41.1l0.1-0.1c0.8-1.7 2-2.8 3.6-3.5 1.2-0.5 3-0.8 5 0.1 3.3 1.5 4.7 5.3 3.3 8.6l-0.1 0.2c-4.7 10.1-30.7 61.6-78.3 89.9-3.6 2.2-5.7 6.3-5.3 10.5 0.4 4.3 3.1 7.9 7.4 9.4 34.2 11.7 62.3 29.6 83.4 53.3 18.2 20.3 31.9 45.6 40.8 75.1 16.4 54.7 13.8 115.1 11.9 159.1-0.1 1.9-0.2 3.8-0.2 5.7-11.3-3.7-24.6-10.8-39-20.6-4.9-3.3-11.7-2-15.2 2.9l-0.1 0.1c-3.3 4.9-2 11.7 3 15.2 23.1 15.7 44 25 60.5 27.1h1.3c2.4 0 4.8-0.8 6.8-2.3l0.3-0.2c2.3-1.9 3.7-4.8 3.9-7.9v-0.2c0.1-5.3 0.3-11 0.6-17.1l0.1-2.4c1.8-45.7 4.4-108.2-13.1-166.3z\" fill=\"#934A19\" p-id=\"3481\"></path></svg>";
	var styles$10 = createLazyStyle(detail_lazy_default);
	var bilibiliDynamicDetail = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$10.use
		});
	} });
	var styles$9 = createLazyStyle(index_lazy_default$6);
	var bilibiliDynamic = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$9.use
		});
	} });
	var bilibiliSpace = () => ({ handler() {} });
	var styles$8 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root {\n    --inject-page-width: min(82vw, 1318px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 82vw;\n  }\n  #wrapper {\n    width: var(--inject-page-width) !important;\n  }\n  /* 内容 */\n  #content .grid-16-8 .article {\n    width: calc(100% - 360px) !important;\n  }\n}");
	var douban = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$8.use
		});
	} });
	var subject_lazy_default = "@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root {\n    --inject-page-width: min(82vw, 1318px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 82vw;\n  }\n  #wrapper {\n    width: var(--inject-page-width) !important;\n  }\n  /* 内容 */\n  #content .article {\n    width: calc(100% - 360px);\n    /* 电影信息 */\n  }\n  #content .article .subject {\n    width: calc(100% - 175px);\n  }\n  #content .article .subject #info {\n    max-width: none;\n    width: calc(100% - 160px);\n  }\n  #content .article {\n    /* 剧照 */\n  }\n  #content .article #related-pic > ul {\n    width: 675px;\n  }\n}";
	var styles$7 = createLazyStyle(subject_lazy_default);
	var doubanSubject = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$7.use
		});
	} });
	var styles$6 = createLazyStyle(subject_lazy_default);
	var doubanReview = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$6.use
		});
	} });
	var styles$5 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1350px) {\n  :root {\n    --inject-page-width: min(88vw, 1470px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 88vw;\n  }\n  .article-detail-container,\n  .wtt-detail-container {\n    width: var(--inject-page-width) !important;\n    /* 内容 */\n  }\n  .article-detail-container > .main,\n  .wtt-detail-container > .main {\n    width: calc(var(--inject-page-width) - 298px - 60px - 96px) !important;\n    /* 评论 */\n  }\n  .article-detail-container > .main .ttp-comment-block,\n  .wtt-detail-container > .main .ttp-comment-block {\n    width: auto;\n  }\n  .article-detail-container,\n  .wtt-detail-container {\n    /* 底部信息流 */\n  }\n  .article-detail-container .detail-end-feed,\n  .wtt-detail-container .detail-end-feed {\n    margin-left: auto;\n    margin-right: auto;\n    max-width: 676px;\n  }\n}");
	var toutiao = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$5.use
		});
	} });
	var home_default = "@charset \"UTF-8\";\n@media screen and (min-width: 1340px) {\n  :root {\n    --inject-page-width: min(90vw, 1380px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 90vw;\n  }\n  [class*=Frame_content] {\n    --main-width: var(--inject-page-width);\n    width: var(--inject-page-width);\n    /* 中间主内容 */\n  }\n  [class*=Frame_content] > div:nth-of-type(2) {\n    flex: 1;\n  }\n  /* 内容 */\n  [class*=Frame_main],\n  [class*=Main_full] {\n    flex-grow: 1;\n  }\n  /* 列表中固定图片宽度，避免太大 */\n  .woo-box-wrap[class*=picture_inlineNum3] {\n    max-width: 409px;\n  }\n  /* 列表4张图 */\n  .u-col-4.woo-box-wrap {\n    max-width: 546px;\n  }\n  /* 列表中视频 */\n  [class*=content_row] [class*=card-video_videoBox] {\n    max-width: 540px;\n  }\n  /* 列表中文章 */\n  [class*=content_row] [class*=card-article_pic] {\n    max-width: 540px;\n  }\n  /* 博主主页头图 */\n  [class*=ProfileHeader_pic] {\n    overflow: hidden;\n  }\n  /* 返回顶部按钮 */\n  [class*=Index_backTop] {\n    left: calc(50% + var(--inject-page-width) / 2 + var(--frame-mod-gap-space));\n    margin-left: 0;\n    transform: translateX(0);\n  }\n}";
	var play_detail_default = "@charset \"UTF-8\";\n@media screen and (min-width: 1450px) {\n  :root {\n    --inject-page-width: min(91vw, 91vw);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 91vw;\n  }\n  [class*=Frame_content2] {\n    max-width: none;\n    width: var(--inject-page-width);\n  }\n  /* 左列 */\n  [class*=Frame_main2] {\n    flex-grow: 1;\n    padding-right: 20px;\n  }\n}";
	var styles$4 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1150px) {\n  :root {\n    --inject-page-width: min(90vw, 1380px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 90vw;\n  }\n  #articleRoot .WB_frame {\n    width: var(--inject-page-width);\n  }\n  #articleRoot #plc_main {\n    max-width: 100%;\n    width: auto;\n  }\n  #articleRoot {\n    /* 内容 */\n  }\n  #articleRoot .WB_frame_a,\n  #articleRoot .WB_artical {\n    max-width: 100%;\n    width: auto;\n  }\n  #articleRoot {\n    /* 顶部图片 */\n  }\n  #articleRoot .main_toppic {\n    margin-left: auto;\n    margin-right: auto;\n  }\n  #articleRoot {\n    /* 文章 */\n  }\n  #articleRoot .WB_editor_iframe_new {\n    width: auto;\n  }\n  /* 右下角浮动按钮 */\n  .B_artical [node-type=sidebar] > .W_gotop {\n    left: calc(50% + var(--inject-page-width) / 2);\n    margin-left: 0;\n  }\n}");
	var weiboArticle = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$4.use
		});
	} });
	var unsafeWindowAlias = _unsafeWindow;
	var weibo = ({ store, createControl }) => ({ handler() {
		const uiControl = createControl({
			store,
			visible: false,
			silent: true
		});
		execute();
		function execute() {
			let proxyConfig;
			document.addEventListener("readystatechange", () => {
				if ($("#app") && $("#app").__vue__) {
					WbNewVersion();
					return;
				}
				if (!unsafeWindowAlias.$CONFIG) return;
				if (proxyConfig && proxyConfig === unsafeWindowAlias.$CONFIG) return;
				proxyConfig = new Proxy(unsafeWindowAlias.$CONFIG, { set(target, property, value, receiver) {
					const oldVal = target[property];
					const succeeded = Reflect.set(target, property, value, receiver);
					if (property === "location" && value !== oldVal) addStyle();
					return succeeded;
				} });
				unsafeWindowAlias.$CONFIG = proxyConfig;
				addStyle();
			});
		}
		const WbNewVersion = once(() => {
			const uiControl = createControl({
				store,
				visible: false,
				silent: true
			});
			const app = $("#app").__vue__;
			let styleSheet;
			const pageStyleMap = new Map([[[
				"home",
				"mygroups",
				"profile",
				"nameProfile",
				"customProfile",
				"bidDetail",
				"atWeibo",
				"cmtInbox",
				"likeInbox",
				"follow",
				"myFollowTab",
				"fav",
				"like",
				"weibo",
				"list",
				"topic",
				"search",
				"searchResult"
			], () => _GM_addStyle(home_default)], [["Playdetail"], () => _GM_addStyle(play_detail_default)]]);
			const notify = once(() => {
				uiControl.notify();
			});
			app.$watch("$route", (to) => {
				styleSheet?.remove();
				uiControl.hide();
				for (const [routenames, addStyle] of pageStyleMap.entries()) if (routenames.includes(to.name)) {
					uiControl.show();
					if (store.enabled) {
						styleSheet = addStyle();
						notify();
					}
					break;
				}
			}, { immediate: true });
		});
		const addStyle = (function() {
			let styleSheet;
			return function() {
				const { $CONFIG } = unsafeWindowAlias;
				const classnamePrefix = "inject-ws-";
				const getClassname = (classname) => `${classnamePrefix}${classname}`;
				styleSheet?.remove();
				[...document.body.classList.values()].forEach((item) => {
					if (item.startsWith(classnamePrefix)) document.body.classList.remove(item);
				});
				const pages = {
					mainpage: {
						test: /^v6.*_content_home$/.test($CONFIG.location) || /v6_(fav|likes_outbox|content_friends)/.test($CONFIG.location),
						use: doMainPage
					},
					profilepage: {
						test: /^page_.*_(home|photos|manage|myfollow|service|expert|topic)$/.test($CONFIG.location),
						use: doProfilePage
					},
					singleweibo: {
						test: /^page_.*_single_weibo$/.test($CONFIG.location),
						use: doSingleWBPage
					}
				};
				const target = Object.entries(pages).find(([, { test }]) => test);
				$CONFIG.location;
				if (!target) return;
				uiControl.show();
				if (!store.enabled) return;
				styleSheet = target[1].use(getClassname(target[0]));
				document.body.classList.add(getClassname(target[0]));
				uiControl.notify();
			};
		})();
		function doMainPage(classname) {
			return _GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            display: flex;
            width: var(--inject-page-width) !important;
          }
          /* 内容 */
          |> #plc_main {
            display: flex !important;
            flex: 1;
            width: auto !important;
          }
          |> .WB_main_c {
            flex: 1;
          }
          /* 微博类型 */
          |> .tab_box {
            display: flex;
          }
          |> .tab_box::after {
            content: none;
          }
          |> .tab_box .fr_box {
            flex: 1;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2));
            margin-left: 0 !important;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
		}
		function doProfilePage(classname) {
			return _GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            width: var(--inject-page-width) !important;
          }
          |> .WB_frame_a, .WB_frame_a_fix {
            width: 100%;
          }
          /* 内容 */
          |> #plc_main {
            width: 100% !important;
            display: flex;
          }
          /* 这里修复特殊博主页右边距 */
          |> #plc_main > div:last-child {
            margin-right: 0;
          }
          /* 特殊博主页评论 */
          |> .WB_frame_c .input_simple_wrap .inputfunc_simple_wrap {
            width: calc(100% - 80px);
          }
          |> .WB_frame_c {
            flex: 1;
          }
          /* 右侧悬浮时间线 */
          |> .WB_timeline {
            left: calc(50% + (var(--inject-page-width) / 2) + 10px);
            margin-left: 0;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2));
            margin-left: 0 !important;
          }
          /* 个人资料 管理中心 */
          |> .WB_frame_a_fix {
            display: flex;
            justify-content: center;
          }
          |> .WB_frame_a_fix > .PCD_admin_content {
            float: none;
            margin-left: 18px;
          }
          |> .WB_frame_a_fix > .PCD_admin_content .PCD_admin_content {
            float: none;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
		}
		function doSingleWBPage(classname) {
			return _GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            width: var(--inject-page-width) !important;
          }
          /* 内容 */
          |> #plc_main {
            display: flex !important;
            width: auto !important;
          }
          |> #plc_main .WB_frame_c {
            flex: 1;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2) - 19px);
            margin-left: 0 !important;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
		}
	} });
	var styles$3 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root {\n    --inject-page-width: min(77.5vw, 1330px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 77.5vw;\n  }\n  .WB_frame {\n    display: flex;\n    width: var(--inject-page-width) !important;\n  }\n  /* 内容 */\n  .WB_frame #plc_main {\n    display: flex !important;\n    flex: 1;\n  }\n  .WB_frame_c {\n    flex: 1;\n  }\n  /* 微博类型 (更多-旅游 中出现) */\n  .tab_box {\n    display: flex;\n  }\n  .tab_box::after {\n    content: none;\n  }\n  .tab_box .fr_box {\n    flex: 1;\n  }\n}");
	var weiboDynamic = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute: styles$3.use
		});
	} });
	var styles$2 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1600px) {\n  :root {\n    --inject-page-width: min(73vw, 1530px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 73vw;\n  }\n  body {\n    /* 搜索结果 */\n  }\n  body #rcnt {\n    grid-template-columns: 210px repeat(21, calc(79% / 21)) minmax(0, 1fr);\n    width: var(--inject-page-width);\n  }\n  body {\n    /* 列表 */\n  }\n  body #w7tRq {\n    column-gap: 1%;\n    grid-template-columns: 0 repeat(21, calc(79% / 21));\n  }\n}");
	var google = ({ store, createControl }) => ({ handler() {
		if (parse().tbm) return;
		createControl({
			store,
			execute: styles$2.use
		});
	} });
	var styles$1 = createLazyStyle("@charset \"UTF-8\";\n/* 处理滚动后页面抖动 */\nhtml body {\n  height: auto;\n}\n\n#csdn-toolbar {\n  position: sticky !important;\n  top: 0;\n  z-index: 1;\n}\n\n/* 烦人的登录弹窗 [○･｀Д´･ ○] , 必要时battle cookies中的unlogin_scroll_step */\n#passportbox,\n.login-mark {\n  display: none !important;\n}");
	var csdn = ({ store, createControl }) => ({ handler() {
		createControl({
			store,
			execute() {
				document.cookie = `unlogin_scroll_step=${Date.now()};domain=.csdn.net;path=/`;
				styles$1.use();
			}
		});
	} });
	var styles = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1320px) {\n  :root {\n    --inject-page-width: min(82vw, 1330px);\n  }\n  .inject-widescreen-loose-js {\n    --inject-page-width: 82vw;\n  }\n  .root-page-container {\n    /* 米游社根据 类名 作为页面间区分 */\n    /* 文章页 */\n  }\n  .root-page-container > .mhy-article-page {\n    display: flex;\n    width: var(--inject-page-width);\n    /* 主体 */\n  }\n  .root-page-container > .mhy-article-page .mhy-layout__main {\n    flex: 1;\n    padding-right: 20px;\n  }\n  .root-page-container {\n    /* 左侧悬浮操作 */\n  }\n  .root-page-container .mhy-article-actions {\n    margin-left: calc(var(--inject-page-width) / 2 * -1);\n    transform: translate(calc(-100% - 10px));\n  }\n}");
	var mihoyoBBS = ({ store, createControl }) => ({ handler() {
		function replaceImgURL() {
			onVisible(() => {
				$$(".mhy-article-page__content .ql-image-box img:not([replaced=true])").forEach((img) => {
					const original = img.getAttribute("large");
					if (!original) return;
					img.src = original;
					img.setAttribute("replaced", "true");
				});
			});
		}
		createControl({
			store,
			execute() {
				replaceImgURL();
				styles.use();
			}
		});
	} });
	var sites = [
		{
			name: "半次元",
			namespace: "banciyuan",
			test: /^bcy\.net\/item\/detail\//,
			use: banciyuan
		},
		{
			name: "微信",
			namespace: "weixin",
			test: /^mp\.weixin\.qq\.com\/s/,
			use: weixin
		},
		{
			name: "知乎专栏",
			namespace: "zhihu",
			test: /^zhuanlan\.zhihu\.com\/p\//,
			use: zhihuZhuanlan
		},
		{
			name: "知乎问答",
			namespace: "zhihu",
			test: /^www\.zhihu\.com\/question\//,
			use: zhihuQuestion
		},
		{
			name: "知乎",
			namespace: "zhihu",
			test: /^www\.zhihu\.com\/(follow|hot)?$/,
			use: zhihuHome
		},
		{
			name: "知乎话题",
			namespace: "zhihu",
			test: /^www\.zhihu\.com\/topic\//,
			use: zhihuTopic
		},
		{
			name: "掘金",
			namespace: "juejin",
			test: /^juejin\.cn\/post\//,
			use: juejin
		},
		{
			name: "Crates.io",
			namespace: "crates",
			test: /^crates\.io\/crates\//,
			use: crates
		},
		{
			name: "简书",
			namespace: "jianshu",
			test: /^www\.jianshu\.com\/p\//,
			use: jianshu
		},
		{
			name: "百度",
			namespace: "baidu",
			test: /^www\.baidu\.com\/s?$/,
			use: baidu
		},
		{
			name: "贴吧",
			namespace: "tieba",
			test: /^tieba\.baidu\.com\/p\//,
			use: tieba
		},
		{
			name: "贴吧吧页",
			namespace: "tieba",
			test: /^tieba\.baidu\.com\/f$/,
			use: tiebaForum
		},
		{
			name: "搜狗",
			namespace: "sougou",
			test: /^www\.sogou\.com\/web$/,
			use: sougou
		},
		{
			name: "segmentfault",
			namespace: "segmentfault",
			test: /^segmentfault\.com\/(a|q)\//,
			use: segmentfault
		},
		{
			name: "bilibili",
			namespace: "bilibili",
			test: /^www\.bilibili\.com\/read\/cv/,
			use: bilibili
		},
		{
			name: "bilibili 动态",
			namespace: "bilibili",
			test: /^t\.bilibili\.com\/$/,
			use: bilibiliDynamic
		},
		{
			name: "bilibili 动态详情",
			namespace: "bilibili",
			test: /^t\.bilibili\.com\/\d+$/,
			use: bilibiliDynamicDetail
		},
		{
			name: "bilibili 空间",
			namespace: "bilibili",
			test: /^space\.bilibili\.com\/212535360$/,
			use: bilibiliSpace
		},
		{
			name: "豆瓣",
			namespace: "douban",
			test: [
				/^www\.douban\.com\/gallery\/$/,
				/^www\.douban\.com\/gallery\/topic\/.+?/,
				/^www\.douban\.com\/note\/.+?/
			],
			use: douban
		},
		{
			name: "豆瓣电影 详情",
			namespace: "doubanmovie",
			test: /^movie\.douban\.com\/subject\//,
			use: doubanSubject
		},
		{
			name: "豆瓣电影 剧评详情",
			namespace: "doubanmovie",
			test: /^movie\.douban\.com\/review\//,
			use: doubanReview
		},
		{
			name: "头条",
			namespace: "toutiao",
			test: /^www\.toutiao\.com\/(article|w)\/\d+\/?$/,
			use: toutiao
		},
		{
			name: "微博",
			namespace: "weibo",
			test: /^(www\.)?weibo.com\//,
			use: weibo
		},
		{
			name: "微博文章",
			namespace: "weibo",
			test: /^(www\.)?weibo.com\/ttarticle\/p\/show$/,
			use: weiboArticle
		},
		{
			name: "微博动态",
			namespace: "weibo",
			test: /^d\.weibo\.com\//,
			use: weiboDynamic
		},
		{
			name: "谷歌",
			namespace: "google",
			test: /^www\.google\..{2,7}search$/,
			use: google
		},
		{
			name: "CSDN",
			namespace: "csdn",
			test: /^blog\.csdn\.net\/(\w|-)+\/article\/details\//,
			use: csdn
		},
		{
			name: "米游社",
			namespace: "mihoyoBBS",
			test: /^bbs.mihoyo.com\/(ys)\/article\//,
			use: mihoyoBBS
		}
	];
	function useGMvalue(name, defaultValue, _options) {
		const { listening, deep } = Object.assign({
			listening: typeof _options === "boolean" ? _options : true,
			deep: false
		}, _options);
		const value = (0, vue.ref)(_GM_getValue(name, defaultValue));
		(0, vue.watch)(value, () => {
			_GM_setValue(name, value.value);
		}, { deep });
		if (listening) {
			(0, vue.onUnmounted)(() => {
				_GM_removeValueChangeListener(id);
			});
			const id = _GM_addValueChangeListener(name, (name, oldVal, newVal) => {
				value.value = newVal;
			});
		}
		return value;
	}
	_css("/* var */\n/* reset */\n:root {\n  --skr-primary-color: #2878ff;\n  --skr-primary-lighten-color: rgb(24 144 255 / 20%);\n  --skr-white-color: #fff;\n  /* transition */\n  --skr-transition-duration-fast: 0.1s;\n  --skr-transition-duration-normal: 0.3s;\n  /* shadow */\n  --skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);\n  --skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);\n  /* border */\n  --skr-border-color: #d9d9d9;\n  /* text */\n  --skr-text-primary-color: #303133;\n  --skr-text-regular-color: #666;\n  --skr-text-secondary-color: #909399;\n  --skr-text-inverse-color: var(--skr-white-color);\n  /* button */\n  --skr-button-transition: all var(--skr-transition-duration-normal);\n  --skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);\n  /* ripple */\n  --skr-ripple-color: rgb(138 218 255 / 20%);\n}\n\n.inject-widescreen-js {\n  align-items: center;\n  contain: layout;\n  display: flex;\n  flex-direction: column;\n  opacity: 0.5;\n  position: fixed;\n  right: 7vw;\n  top: 150px;\n  transition: opacity var(--skr-transition-duration-normal);\n  z-index: 99;\n}\n.inject-widescreen-js label {\n  align-items: center;\n  bottom: 0;\n  cursor: pointer;\n  display: flex;\n  font-size: 14px;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  transform: translateY(-10px);\n  transition: transform var(--skr-transition-duration-normal);\n  z-index: -1;\n}\n.inject-widescreen-js:hover {\n  opacity: 1;\n}\n.inject-widescreen-js:hover label {\n  transform: translateY(100%);\n}\n.inject-widescreen-js button {\n  background-image: none !important;\n}\n.inject-widescreen-js input {\n  margin: 0 2px 0 0;\n}");
	var noop = () => {};
	function createControl(options) {
		const { store, execute = noop, visible = true, silent = false } = options;
		const { instance } = mountComponent({ setup(_, { expose }) {
			const state = (0, vue.reactive)({
				uiVisible: useGMvalue("ui_visible", true),
				visible,
				loose: store.loose || false
			});
			function notify() {
				(store_default.notify_enabled ?? false) && Toast("已宽屏处理");
			}
			function toggle() {
				store.enabled = !store.enabled;
				location.reload();
			}
			expose({
				notify,
				show: () => {
					state.visible = true;
				},
				hide: () => {
					state.visible = false;
				}
			});
			if (store.enabled) {
				(0, vue.watchEffect)(() => {
					store.loose = state.loose;
					document.documentElement.classList[state.loose ? "add" : "remove"]("inject-widescreen-loose-js");
				});
				execute();
				!silent && notify();
			}
			return () => (0, vue.createVNode)(vue.Fragment, null, [state.uiVisible && state.visible && (0, vue.createVNode)("div", { "class": "inject-widescreen-js" }, [(0, vue.createVNode)(Button, {
				"title": "注意：页面会被刷新",
				"type": "primary",
				"shadow": true,
				"onClick": toggle
			}, { default: () => [store.enabled ? "已开启" : "关闭"] }), store.enabled && (0, vue.createVNode)("label", { "title": "勾选后不再限制最大宽度，酌情使用" }, [(0, vue.withDirectives)((0, vue.createVNode)("input", {
				"onUpdate:modelValue": ($event) => state.loose = $event,
				"type": "checkbox"
			}, null), [[vue.vModelCheckbox, state.loose]]), (0, vue.createTextVNode)("更宽")])])]);
		} });
		return instance;
	}
	function main() {
		if (!checker()) return;
		_GM_registerMenuCommand("宽屏通知", function() {
			const nextStatus = !(store_default.notify_enabled ?? false);
			Toast.success(nextStatus ? "已开启通知" : "已关闭通知");
			store_default.notify_enabled = nextStatus;
		});
		_GM_registerMenuCommand("控制按钮", function() {
			const nextStatus = !(store_default.ui_visible ?? true);
			Toast.success(nextStatus ? "已显示按钮" : "已隐藏按钮");
			store_default.ui_visible = nextStatus;
		});
		new App(sites).boot();
	}
	var App = class {
		#sites;
		constructor(sites) {
			this.#sites = sites;
		}
		boot() {
			const briefURL = location.host + location.pathname;
			this.#sites.forEach(async (site) => {
				const { name, namespace, test, use } = site;
				if (!this.#includes(test, briefURL)) return;
				const { readyState: state } = site;
				if (state) await ready_state_exports[state]();
				if (document.head == null) await interactive();
				use({
					createControl,
					store: createStore(namespace)
				}).handler();
			});
		}
		#includes(test, url) {
			return [].concat(test).some((item) => {
				if (item instanceof RegExp) return item.test(url);
				if (typeof item === "boolean") return item;
				return false;
			});
		}
	};
	function createStore(namespace) {
		return new Proxy(createStore$1(namespace), { get(target, property, receiver) {
			let value = Reflect.get(target, property, receiver);
			if (property === "enabled") value ??= true;
			return value;
		} });
	}
	main();
})(Vue);
