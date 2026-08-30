// ==UserScript==
// @name         百度贴吧签到
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      3.4.4
// @author       sakura-flutter
// @description  网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~
// @license      MIT
// @match        https://tieba.baidu.com/index.html
// @match        https://tieba.baidu.com/
// @require      https://unpkg.com/crypto-js@4.2.0/core.js
// @require      https://unpkg.com/crypto-js@4.2.0/md5.js
// @require      https://unpkg.com/vue@3.5.41/dist/vue.runtime.global.prod.js
// @connect      tieba.baidu.com
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// ==/UserScript==

(function(vue, crypto_js_md5) {
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
	crypto_js_md5 = __toESM(crypto_js_md5);
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	_css("@charset \"UTF-8\";\n.skr-toast-container {\n  position: fixed;\n  z-index: 99999;\n  top: 80px;\n  right: 0;\n  left: 0;\n  pointer-events: none;\n  text-align: center;\n}\n\n.skr-toast {\n  contain: content;\n  max-height: 100vh;\n  transition: all 0.3s ease-in-out;\n}\n.skr-toast-content {\n  pointer-events: auto;\n  display: inline-flex;\n  justify-content: center;\n  margin-bottom: 10px;\n  padding: 8px 16px;\n  max-width: 90vw;\n  font-size: 14px;\n  line-height: 1.5em;\n  border: 1px solid;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n.skr-toast-content--info {\n  color: #2e8bf0;\n  background: #f0faff;\n  border-color: #d4eeff;\n}\n.skr-toast-content--success {\n  color: #19bf6c;\n  background: #edfff3;\n  border-color: #bbf2cf;\n}\n.skr-toast-content--warning {\n  color: #f90;\n  background: #fff9e6;\n  border-color: #ffe7a3;\n}\n.skr-toast-content--error {\n  color: #ed3f13;\n  background: #ffefe6;\n  border-color: #ffcfb8;\n}\n.skr-toast-content-text {\n  flex: auto;\n}\n.skr-toast-content-close {\n  flex: none;\n  width: 20px;\n  margin: 0 -8px 0 10px;\n  padding: 0;\n  font-size: 16px;\n  color: #ababab;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n}\n.skr-toast {\n  /* 动画 */\n}\n.skr-toast-slide-fade-enter-active, .skr-toast-slide-fade-leave-active {\n  transition: all 0.3s;\n}\n.skr-toast-slide-fade-enter-from {\n  transform: translateY(-50%);\n  opacity: 0;\n}\n.skr-toast-slide-fade-leave-to {\n  transform: translateY(50%);\n  max-height: 0;\n  padding: 0;\n  opacity: 0;\n}");
	var toastTypes = [
		"info",
		"success",
		"warning",
		"error"
	];
	var prefixCls$3 = "skr-toast";
	var containerCls = `${prefixCls$3}-container`;
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
				"name": `${prefixCls$3}-slide-fade`,
				"appear": true,
				"onAfterLeave": () => props.onClosed?.()
			}, { default: () => [visible.value && (0, vue.createVNode)("div", { "class": prefixCls$3 }, [(0, vue.createVNode)("div", { "class": [`${prefixCls$3}-content`, `${prefixCls$3}-content--${props.type}`] }, [(0, vue.createVNode)("div", { "class": `${prefixCls$3}-content-text` }, [props.content]), closable.value && (0, vue.createVNode)("button", {
				"class": `${prefixCls$3}-content-close`,
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
	var Queue = class {
		tasks = [];
		limit;
		count = 0;
		constructor({ limit = 3 } = {}) {
			this.limit = limit;
		}
		get size() {
			return this.tasks.length;
		}
		enqueue(tasks) {
			if (Array.isArray(tasks)) this.tasks.push(...tasks);
			else this.tasks.push(tasks);
			return this;
		}
		run() {
			return new Promise((resolve) => {
				if (this.size === 0) {
					resolve();
					return;
				}
				const { tasks } = this;
				const _run = function() {
					const idle = Math.min(this.size, this.limit - this.count);
					for (let i = 0; i < idle; i++) {
						this.count++;
						tasks.shift()().finally(() => {
							this.count--;
							if (this.size > 0) _run();
							else if (this.size === 0 && this.count === 0) resolve();
						});
					}
				}.bind(this);
				_run();
			});
		}
	};
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
	function stringify(obj) {
		return Object.entries(obj).filter(([, value]) => value !== void 0).map(([key, value]) => `${key}=${value ?? ""}`).join("&");
	}
	var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
	var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_removeValueChangeListener = (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
	var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
	function createStore(modulename = "", local = true) {
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
	var store_default = createStore();
	var ResponseError = class extends Error {
		name = "ResponseError";
		response;
		info;
		constructor(msg = "未知错误", response, info) {
			super(msg);
			this.response = response;
			this.info = info;
		}
	};
	function GMRequest(url, options) {
		return new Promise((resolve, reject) => {
			_GM_xmlhttpRequest({
				timeout: 15e3,
				...options,
				url,
				onload(res) {
					let error;
					let response;
					try {
						response = JSON.parse(res.response);
					} catch {
						response = res.response;
					}
					if (response == null) error = new ResponseError("无响应", response, {
						...options,
						...res
					});
					else if (response?.error_code !== "0") error = new ResponseError(response.error_msg, response, {
						...options,
						...res
					});
					error ? reject(error) : resolve(response);
				},
				onerror(error$4) {
					error.force(error$4);
					reject(error$4);
				}
			});
		});
	}
	GMRequest.post = function(url, data, options) {
		return GMRequest(url, {
			...options,
			data,
			method: "POST"
		});
	};
	function request(url, options) {
		return fetch(url, options).then((response) => response.json()).then((resJson) => {
			if (resJson.no !== 0) throw new ResponseError(resJson.error, resJson, {
				url,
				...options
			});
			return resJson;
		});
	}
	request.post = function(url, data, options = {}) {
		const headers = new Headers(options.headers);
		let body = data;
		if (data) {
			if (headers.get("Content-Type")?.includes("application/x-www-form-urlencoded") && Object.prototype.toString.call(data) === "[object Object]") body = stringify(data);
			if (headers.get("Content-Type")?.includes("application/json") && Object.prototype.toString.call(data) === "[object Object]") body = JSON.stringify(data);
		}
		return request(url, {
			...options,
			method: "POST",
			headers,
			body
		});
	};
	var FAKE_VERSION = "11.8.8.0";
	function makeFakeParams(obj) {
		return Object.assign({
			_client_type: 4,
			_client_version: FAKE_VERSION,
			_phone_imei: "0".repeat(15),
			model: "HUAWEI P40",
			net_type: 1,
			stErrorNums: 1,
			stMethod: 1,
			stMode: 1,
			stSize: 320,
			stTime: 117,
			stTimesNum: 1,
			timestamp: Date.now()
		}, obj);
	}
	function sign(payload) {
		let str = Object.keys(payload).sort().reduce((acc, key) => acc += `${key}=${payload[key]}`, "");
		str += "tiebaclient!!!";
		return (0, crypto_js_md5.default)(str).toString();
	}
	function signRequestParams(params, isFake = true) {
		if (isFake) params = makeFakeParams(params);
		return {
			...params,
			sign: sign(params)
		};
	}
	var jQuery = _unsafeWindow.jQuery;
	function getElementsInPage() {
		const $moreforumEl = jQuery("#moreforum");
		$moreforumEl.trigger("mouseenter");
		const likeUnsignEls = $$("#likeforumwraper .unsign");
		const likeSignEls = $$("#likeforumwraper .sign");
		const alwayUnsignEls = $$("#alwayforum-wraper .unsign");
		const alwaySignEls = $$("#alwayforum-wraper .sign");
		$moreforumEl.trigger("click");
		const unsigns = [...likeUnsignEls, ...alwayUnsignEls].map((element) => {
			const fid = element.dataset.fid;
			const { kw } = parse(element.href);
			return {
				fid,
				kw,
				element
			};
		});
		const unsignsMap = unsigns.reduce((map, unsign) => {
			return map.set(unsign.fid, unsign.element).set(unsign.kw, unsign.element);
		}, new Map());
		return {
			moreForum: $moreforumEl,
			unsigns,
			signs: [...likeSignEls, ...alwaySignEls],
			setSign(key) {
				unsignsMap.get(key)?.classList.replace("unsign", "sign");
			}
		};
	}
	function getPageData() {
		return _unsafeWindow.PageData;
	}
	function encodeRequestParams(obj) {
		const newObj = { ...obj };
		newObj.kw &&= encodeURIComponent(newObj.kw);
		return newObj;
	}
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
	_css(".skr-input {\n  border: 1px solid #d9d9d9;\n  margin-top: 5px;\n  transition: all 0.3s;\n  width: 100%;\n  padding-left: 8px;\n  padding-right: 8px;\n}\n.skr-input:hover, .skr-input:focus {\n  border-color: var(--skr-primary-color);\n}\n.skr-input:focus {\n  box-shadow: 0 0 0 2px var(--skr-primary-lighten-color);\n}\n.skr-input--small {\n  padding-bottom: 2px;\n  padding-top: 2px;\n}\n.skr-input--small.skr-input--scale:focus {\n  font-size: 14px;\n  padding-bottom: 6px;\n  padding-top: 6px;\n}\n.skr-input--normal {\n  padding-bottom: 6px;\n  padding-top: 6px;\n}\n.skr-input--large {\n  padding-bottom: 10px;\n  padding-top: 10px;\n}");
	var prefixCls$2 = "skr-input";
	var Input = (0, vue.defineComponent)({
		name: "SkrInput",
		props: {
			modelValue: {
				type: [String, Number],
				default: ""
			},
			size: {
				type: String,
				validator: (value) => [
					"small",
					"normal",
					"large"
				].includes(value),
				default: "normal"
			},
			scale: {
				type: Boolean,
				default: false
			}
		},
		emits: { "update:modelValue": (value) => typeof value === "string" || typeof value === "number" },
		setup(props, { emit }) {
			const handleInput = (event) => {
				if (!event.target.composing) emit("update:modelValue", event.target.value);
			};
			return () => (0, vue.createVNode)("input", {
				"class": [
					prefixCls$2,
					`${prefixCls$2}--${props.size}`,
					{ [`${prefixCls$2}--scale`]: props.scale }
				],
				"value": props.modelValue,
				"type": "text",
				"onInput": handleInput
			}, null);
		}
	});
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
	var prefixCls$1 = "skr-button";
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
				prefixCls$1,
				`${prefixCls$1}--${props.type}`,
				{
					[`${prefixCls$1}--round`]: props.round,
					[`${prefixCls$1}--shadow`]: props.shadow
				},
				`${prefixCls$1}--${props.size}`
			] }, [slots.default?.()]), [[(0, vue.resolveDirective)("ripple"), rippleOptions.value]]);
		}
	});
	_css(".skr-checkbox {\n  cursor: pointer;\n  height: 20px;\n  margin-left: 8px;\n  text-shadow: 0 1px 3px #fff;\n}\n.skr-checkbox input {\n  margin-right: 4px;\n  vertical-align: text-top;\n}");
	var prefixCls = "skr-checkbox";
	var Checkbox = (0, vue.defineComponent)({
		name: "SkrCheckbox",
		props: {
			checked: {
				type: Boolean,
				required: true
			},
			title: String,
			disabled: Boolean
		},
		emits: ["update:checked"],
		setup(props, { slots, emit }) {
			const inputRef = (0, vue.ref)();
			const handleChange = (event) => {
				emit("update:checked", event.target.checked);
				inputRef.value.checked = !!props.checked;
			};
			return () => (0, vue.createVNode)("label", {
				"class": prefixCls,
				"title": props.title
			}, [(0, vue.createVNode)("input", {
				"ref": inputRef,
				"checked": props.checked,
				"type": "checkbox",
				"disabled": props.disabled,
				"onChange": handleChange
			}, null), slots.default?.()]);
		}
	});
	function getNewmoindex() {
		return request.post("/mo/q/newmoindex");
	}
	function doSignWeb(params) {
		const { tbs } = getPageData();
		return request.post("/sign/add", encodeRequestParams({
			ie: "utf-8",
			tbs,
			...params
		}), { headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });
	}
	var appCommonHeader = Object.freeze({
		"User-agent": `bdtb for Android ${FAKE_VERSION}`,
		Accept: "",
		"Content-Type": "application/x-www-form-urlencoded",
		"Accept-Encoding": "gzip",
		Cookie: "ka=open"
	});
	function getForumLike(params) {
		return GMRequest.post("http://c.tieba.baidu.com/c/f/forum/like", stringify(signRequestParams(params)), { headers: appCommonHeader });
	}
	function doSignApp(params) {
		return GMRequest.post("http://c.tieba.baidu.com/c/c/forum/sign", stringify(encodeRequestParams(signRequestParams(params))), { headers: appCommonHeader });
	}
	function batchSignApp(params) {
		return GMRequest.post("http://c.tieba.baidu.com/c/c/forum/msign", stringify(signRequestParams(params)), { headers: appCommonHeader }).then((response) => {
			if (response.error.errno !== "0") throw new ResponseError(response.error.usermsg, response);
			return response;
		});
	}
	async function mergeLikeForum() {
		const { BDUSS } = store_default;
		if (!BDUSS) throw new Error("BDUSS 不能为空");
		const { tbs } = getPageData();
		const req2 = {
			BDUSS,
			tbs
		};
		const [like1, like2Map] = await Promise.all([getNewmoindex().then((data) => data.data.like_forum), getForumLike(req2).then((data) => data.forum_list).then((forumList) => forumList.reduce((acc, val) => (acc[val.id] = val, acc), {}))]);
		like1.forEach((forum) => {
			const forumId = forum.forum_id;
			const like2Forum = like2Map[forumId];
			if (!like2Forum) return;
			Object.assign(forum, {
				levelup_score: like2Forum.levelup_score,
				level_name: like2Forum.level_name,
				slogan: like2Forum.slogan
			});
		});
		like1.sort((a, b) => +b.user_exp - +a.user_exp);
		return like1;
	}
	var WebTask = class {
		kw;
		fail = 0;
		constructor(options) {
			this.kw = options.kw;
		}
		async execute() {
			const { kw } = this;
			try {
				await doSignWeb({ kw });
				return { kw };
			} catch (e) {
				if (e.response?.no === 1101) return { kw };
				this.fail++;
				throw e;
			} finally {
				await sleep(~~(Math.random() * 500 + 600));
			}
		}
	};
	var AppTask = class {
		fid;
		kw;
		BDUSS;
		fail = 0;
		constructor(options) {
			this.fid = options.fid;
			this.kw = options.kw;
			this.BDUSS = options.BDUSS;
		}
		async execute() {
			const { fid, kw, BDUSS } = this;
			const { tbs } = getPageData();
			if (!fid) throw new Error("获取吧 id 为空");
			try {
				const { user_info } = await doSignApp({
					BDUSS,
					tbs,
					fid,
					kw
				});
				return {
					fid,
					kw,
					data: {
						...user_info,
						is_sign: 1
					}
				};
			} catch (e) {
				if (e.response?.error_code === "160002") return {
					fid,
					kw,
					data: { is_sign: 1 }
				};
				this.fail++;
				throw e;
			} finally {
				await sleep(~~(Math.random() * 20) + 50);
			}
		}
	};
	async function batch(options) {
		const { BDUSS, forum_ids } = options;
		const { tbs } = getPageData();
		const { info } = await batchSignApp({
			BDUSS,
			tbs,
			forum_ids: forum_ids.slice(0, 200)
		});
		return info.map((item) => ({
			forum_id: item.forum_id,
			forum_name: item.forum_name,
			sign_bonus_point: item.cur_score,
			is_sign: 1
		}));
	}
	var Adapter = class {
		options;
		constructor(options) {
			this.options = { ...options };
			this.options.unsigns = [...this.options.unsigns];
		}
		async sign(mode) {
			let Task;
			let limit;
			switch (mode) {
				case "web":
					Task = WebTask;
					limit = 1;
					break;
				case "app":
				case "fast":
					if (!this.options.BDUSS) throw new Error("签到方式为 app 时 BDUSS 不能为空");
					Task = AppTask;
					limit = 3;
					break;
				default: return ((e) => {
					throw new Error(e);
				})(mode);
			}
			const { unsigns } = this.options;
			if (mode === "fast") try {
				const data = await batch({
					BDUSS: this.options.BDUSS,
					forum_ids: unsigns.map((unsign) => unsign.fid)
				});
				for (let index = unsigns.length - 1; index >= 0; index--) {
					const unsign = unsigns[index];
					const found = data.find((item) => item.forum_id === unsign.fid);
					if (found) {
						this.options.onSuccess({
							fid: found.forum_id,
							kw: found.forum_name,
							data: found
						});
						unsigns.splice(index, 1);
					}
				}
			} catch (error$2) {
				error.force("批量签到失败", error$2);
			}
			const self = this;
			const failList = [];
			const queue = new Queue({ limit });
			queue.enqueue(unsigns.map((unsign) => {
				const task = new Task({
					fid: unsign.fid,
					kw: unsign.kw,
					BDUSS: this.options.BDUSS
				});
				return async function callback() {
					try {
						const result = await task.execute();
						self.options.onSuccess(result);
					} catch (error$3) {
						error.force("签到失败", error$3, error$3.response, error$3.info);
						if (task.fail <= 1) queue.enqueue(callback);
						else failList.push(unsign);
					}
				};
			}));
			await queue.run();
			return failList;
		}
	};
	var ForumList = (0, vue.defineComponent)({
		props: {
			dataSource: {
				type: Array,
				required: true
			},
			size: {
				type: String,
				required: true
			}
		},
		emits: ["clickSize"],
		setup(props, { emit }) {
			const keyword = useGMvalue("keyword", "");
			const isReverse = useGMvalue("is_reverse", false);
			const diaplayForums = (0, vue.computed)(() => {
				let newList = [...props.dataSource];
				isReverse.value && newList.reverse();
				if (keyword.value) newList = newList.filter((forum) => new RegExp(keyword.value, "i").test(forum.forum_name));
				return newList;
			});
			const counter = (0, vue.computed)(() => ({
				total: props.dataSource.length,
				signed: props.dataSource.filter(({ is_sign }) => is_sign).length
			}));
			function changeReverse() {
				isReverse.value = !isReverse.value;
			}
			function expTitle(item) {
				const MAX_EXP_DAILY = 8;
				const needed = +item.levelup_score - +item.user_exp;
				return `距离升级还需要${needed}经验，若每天+${MAX_EXP_DAILY}，还需要${Math.ceil(needed / MAX_EXP_DAILY)}天`;
			}
			return () => (0, vue.createVNode)(vue.Fragment, null, [props.dataSource.length > 0 && (0, vue.createVNode)("div", { "class": "forums-container" }, [
				(0, vue.createVNode)("header", { "class": "top-btns" }, [(0, vue.createVNode)(Button, {
					"class": "reverse-btn",
					"size": "mini",
					"onClick": changeReverse
				}, { default: () => [isReverse.value ? "已倒序" : "普通", (0, vue.createVNode)("span", { "title": "已签/总数" }, [
					counter.value.signed,
					(0, vue.createTextVNode)("/"),
					counter.value.total
				])] }), (0, vue.createVNode)(Button, {
					"class": "resize-btn",
					"size": "mini",
					"onClick": () => emit("clickSize")
				}, { default: () => [(0, vue.createTextVNode)("大小")] })]),
				(0, vue.createVNode)("ul", { "class": { [props.size]: true } }, [diaplayForums.value.map((item) => (0, vue.createVNode)("li", { "key": item.forum_id }, [
					(0, vue.createVNode)("a", {
						"href": "/f?kw=" + encodeURIComponent(item.forum_name),
						"title": item.forum_name,
						"target": "_blank"
					}, [item.forum_name]),
					(0, vue.createVNode)("span", { "class": "signed" }, [item.is_sign ? " √" : ""]),
					(0, vue.createVNode)("span", {
						"class": "level",
						"title": item.level_name
					}, [item.user_level, (0, vue.createTextVNode)("级")]),
					(0, vue.createVNode)("span", { "class": "gain" }, [item.sign_bonus_point ? "+" + item.sign_bonus_point : ""]),
					(0, vue.createVNode)("span", {
						"class": "exp",
						"title": expTitle(item)
					}, [
						item.user_exp,
						(0, vue.createTextVNode)("/"),
						item.levelup_score
					])
				]))]),
				props.dataSource.length > 25 && (0, vue.createVNode)(Input, {
					"modelValue": keyword.value,
					"onUpdate:modelValue": (value) => keyword.value = String(value),
					"placeholder": "搜索",
					"size": "small",
					"scale": true
				}, null)
			])]);
		}
	});
	_css("/* var */\n/* reset */\n:root {\n  --skr-primary-color: #2878ff;\n  --skr-primary-lighten-color: rgb(24 144 255 / 20%);\n  --skr-white-color: #fff;\n  /* transition */\n  --skr-transition-duration-fast: 0.1s;\n  --skr-transition-duration-normal: 0.3s;\n  /* shadow */\n  --skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);\n  --skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);\n  /* border */\n  --skr-border-color: #d9d9d9;\n  /* text */\n  --skr-text-primary-color: #303133;\n  --skr-text-regular-color: #666;\n  --skr-text-secondary-color: #909399;\n  --skr-text-inverse-color: var(--skr-white-color);\n  /* button */\n  --skr-button-transition: all var(--skr-transition-duration-normal);\n  --skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);\n  /* ripple */\n  --skr-ripple-color: rgb(138 218 255 / 20%);\n}\n\n#inject-sign {\n  --container-width: 19vw;\n  --container-right: 10px;\n}\n#inject-sign [class*=skr-] {\n  box-sizing: border-box;\n}\n#inject-sign {\n  box-sizing: border-box;\n  color: var(--skr-text-regular-color);\n}\n#inject-sign.normal, #inject-sign.large {\n  --container-width: 21vw;\n}\n#inject-sign *::-webkit-scrollbar {\n  background: #f2f2f2;\n  height: 8px;\n  width: 8px;\n}\n#inject-sign *::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border: 0;\n}\n#inject-sign a {\n  color: var(--skr-primary-color);\n}\n#inject-sign button {\n  background-image: none;\n}\n#inject-sign .control {\n  align-items: center;\n  bottom: 12px;\n  contain: content;\n  display: flex;\n  position: fixed;\n  right: max(var(--container-right) + var(--container-width) / 2, 150px);\n  transform: translateX(50%);\n  transition: bottom 0.3s, right 0.15s;\n  user-select: none;\n  z-index: 500;\n}\n#inject-sign .control .settings {\n  display: inline-flex;\n  flex: 1;\n  flex-wrap: wrap;\n  margin-left: 10px;\n  max-width: 156px;\n}\n#inject-sign .forums-container {\n  background: #fafafa;\n  bottom: 60px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  contain: content;\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 124px);\n  min-width: 280px;\n  padding: 5px;\n  position: fixed;\n  right: var(--container-right);\n  transition: transform 0.3s, bottom 0.3s, width 0.15s, box-shadow 0.3s;\n  width: var(--container-width);\n  z-index: 2;\n}\n#inject-sign .forums-container:hover {\n  box-shadow: 0 2px 4px 3px rgba(0, 0, 0, 0.1);\n}\n#inject-sign.forums-hide .forums-container {\n  bottom: 0;\n  transform: translateY(calc(100% - 35px));\n}\n#inject-sign.forums-hide .control {\n  bottom: 40px;\n}\n#inject-sign.cover .forums-container {\n  z-index: 9999;\n}\n#inject-sign header {\n  display: flex;\n  margin-bottom: 4px;\n}\n#inject-sign .reverse-btn {\n  flex: 1;\n  text-align: center;\n}\n#inject-sign .resize-btn {\n  flex: none;\n  margin-left: 4px;\n}\n#inject-sign li {\n  border-bottom: 1px solid rgba(221, 221, 221, 0.4);\n  cursor: default;\n  display: flex;\n  transition: height 0.15s;\n}\n#inject-sign li:hover {\n  background-color: #f0f8ff;\n}\n#inject-sign li > * {\n  line-height: 2.325em;\n}\n#inject-sign li a {\n  flex: 1;\n  overflow: hidden;\n  padding-left: 0.2em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n#inject-sign li .signed {\n  width: 0.9em;\n}\n#inject-sign li .level {\n  width: 2.4em;\n}\n#inject-sign li .gain {\n  width: 1.8em;\n}\n#inject-sign li .exp {\n  flex: none;\n  width: 6.7em;\n}\n#inject-sign ul {\n  overflow-x: hidden;\n}\n#inject-sign ul.small li {\n  height: 24px;\n}\n#inject-sign ul.normal li {\n  font-size: 13px;\n  height: 28px;\n}\n#inject-sign ul.large li {\n  font-size: 14px;\n  height: 32px;\n}");
	var sizeTick = function* () {
		const sizes = [
			"small",
			"normal",
			"large"
		];
		let currSize = store_default.size ?? "small";
		let index = sizes.findIndex((v) => v === currSize);
		while (true) {
			index >= sizes.length && (index = 0);
			currSize = sizes[index++];
			store_default.size = currSize;
			yield currSize;
		}
	}();
	function createUI() {
		mountComponent({ setup() {
			const state = (0, vue.reactive)({
				loading: false,
				size: sizeTick.next().value,
				likeForums: []
			});
			const isSimulate = useGMvalue("is_simulate", false);
			const isForumsHide = useGMvalue("is_forums_hide", false);
			const isComplete = useGMvalue("is_complete", false);
			const isCover = useGMvalue("is_cover", false);
			const toastTime = useGMvalue("toast_time", void 0);
			let setSign;
			function run(toastVisible = true) {
				if (state.loading) {
					Toast("签到中");
					return;
				}
				const { unsigns, signs, setSign: _setSign } = getElementsInPage();
				setSign = _setSign;
				if (unsigns.length === 0) {
					const now = new Date();
					if (toastVisible || toastTime.value === void 0 || new Date(toastTime.value).getDate() < now.getDate()) Toast.success("所有吧已签到");
					toastTime.value = +now;
					return;
				}
				let mode;
				if (isSimulate.value) {
					if (!store_default.BDUSS) {
						Toast.error("请先输入 BDUSS 或 BDUSS_BFESS");
						return;
					}
					if (signs.length >= 20) mode = "app";
					else mode = "fast";
				} else mode = "web";
				state.loading = true;
				const toast = Toast("开始签到，请等待", 0);
				new Adapter({
					unsigns,
					BDUSS: store_default.BDUSS,
					onSuccess({ fid, kw, data }) {
						const key = fid || kw;
						if (key) setSign(key);
						if (fid && data) updateLikeForum(fid, data);
					}
				}).sign(mode).then(async () => {
					if (store_default.BDUSS) await fetchForums();
					const failList = getElementsInPage().unsigns;
					const length = failList.length;
					if (length > 0) Toast.warning(`签到成功，失败${length}个：${failList.map((v) => v.kw).join("、")}`, 0);
					else Toast.success("签到成功");
				}).finally(() => {
					toast.close();
					state.loading = false;
				});
			}
			function updateLikeForum(fid, forum) {
				const found = state.likeForums.find((item) => +fid === +item.forum_id);
				if (!found) return;
				if (forum.sign_bonus_point) found.user_exp = String(Number(found.user_exp) + Number(forum.sign_bonus_point));
				Object.assign(found, forum);
			}
			function sort() {
				state.likeForums.sort((a, b) => {
					if (!a.is_sign && b.is_sign) return -1;
					return 0;
				});
			}
			function fetchForums() {
				return mergeLikeForum().then((forums) => {
					state.likeForums = forums;
					sort();
					forums.forEach((forum) => {
						if (forum.is_sign === 1) setSign?.(forum.forum_name);
					});
				}).catch((error$1) => {
					error.force(error$1);
					Toast.error("获取贴吧列表失败。。请刷新重试~", 0);
				});
			}
			function onSimulateChange(checked) {
				if (checked === false) {
					isSimulate.value = checked;
					return;
				}
				const { BDUSS } = store_default;
				const result = window.prompt("请输入 F12 -> 应用(Application) -> Cookies 中的【BDUSS 或 BDUSS_BFESS】", BDUSS || void 0);
				if (result) {
					store_default.BDUSS = result;
					isSimulate.value = true;
					location.reload();
				} else isSimulate.value = false;
			}
			(async () => {
				if (store_default.BDUSS) await fetchForums();
				if (isComplete.value) run(false);
			})();
			return () => (0, vue.createVNode)("div", {
				"id": "inject-sign",
				"class": {
					"forums-hide": isForumsHide.value,
					cover: isCover.value,
					[state.size]: true
				}
			}, [(0, vue.createVNode)("div", { "class": "control" }, [(0, vue.createVNode)(Button, {
				"disabled": state.loading,
				"type": "primary",
				"shadow": true,
				"onClick": () => run()
			}, { default: () => [(0, vue.createTextVNode)("一键签到")] }), (0, vue.createVNode)("div", { "class": "settings" }, [
				(0, vue.createVNode)(Checkbox, {
					"checked": isSimulate.value,
					"title": "模拟APP签到可以获得与APP相同的经验，比网页签到经验更多，也提供更多功能，但需要BDUSS，重新登录后需要再次输入，请网上搜索获得方法，不勾选则通过网页签到，此时不需要BDUSS",
					"onUpdate:checked": onSimulateChange
				}, { default: () => [(0, vue.createTextVNode)("模拟APP")] }),
				(0, vue.createVNode)(Checkbox, {
					"checked": isComplete.value,
					"onUpdate:checked": (value) => isComplete.value = value,
					"title": "下次进入贴吧时自动签到，建议同时勾选模拟APP"
				}, { default: () => [(0, vue.createTextVNode)("自动签到")] }),
				state.likeForums.length > 0 && (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)(Checkbox, {
					"checked": isForumsHide.value,
					"onUpdate:checked": (value) => isForumsHide.value = value,
					"title": "列表将缩到底部"
				}, { default: () => [(0, vue.createTextVNode)("隐藏列表")] }), (0, vue.createVNode)(Checkbox, {
					"checked": isCover.value,
					"onUpdate:checked": (value) => isCover.value = value,
					"title": "覆盖在页面上显示"
				}, { default: () => [(0, vue.createTextVNode)("防止遮挡")] })])
			])]), (0, vue.createVNode)(ForumList, {
				"dataSource": state.likeForums,
				"size": state.size,
				"onClickSize": () => {
					state.size = sizeTick.next().value;
				}
			}, null)]);
		} });
	}
	function main() {
		if (!checker()) return;
		if (!getElementsInPage().moreForum.length) {
			delete store_default.BDUSS;
			delete store_default.is_complete;
			return;
		}
		createUI();
	}
	main();
})(Vue, CryptoJS.MD5);
