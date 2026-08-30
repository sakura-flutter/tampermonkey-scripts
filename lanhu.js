// ==UserScript==
// @name         蓝湖 工具箱
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.12.1
// @author       sakura-flutter
// @description  自动填充填写过的产品密码(不是蓝湖账户)；快捷查看打开过的项目
// @license      MIT
// @match        https://lanhuapp.com/web/
// @require      https://unpkg.com/vue@3.5.41/dist/vue.runtime.global.prod.js
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setClipboard
// @grant        GM_setValue
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
	document.querySelectorAll.bind(document);
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
	var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
	var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_removeValueChangeListener = (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
	var _GM_setClipboard = (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
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
	_css("@charset \"UTF-8\";\n/* var */\n/* reset */\n:root {\n  --skr-primary-color: #2878ff;\n  --skr-primary-lighten-color: rgb(24 144 255 / 20%);\n  --skr-white-color: #fff;\n  /* transition */\n  --skr-transition-duration-fast: 0.1s;\n  --skr-transition-duration-normal: 0.3s;\n  /* shadow */\n  --skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);\n  --skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);\n  /* border */\n  --skr-border-color: #d9d9d9;\n  /* text */\n  --skr-text-primary-color: #303133;\n  --skr-text-regular-color: #666;\n  --skr-text-secondary-color: #909399;\n  --skr-text-inverse-color: var(--skr-white-color);\n  /* button */\n  --skr-button-transition: all var(--skr-transition-duration-normal);\n  --skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);\n  /* ripple */\n  --skr-ripple-color: rgb(138 218 255 / 20%);\n}\n\n#inject-recorder-ui {\n  bottom: 8vh;\n  contain: layout;\n  opacity: 0.5;\n  padding: 30px 30px 10px;\n  position: fixed;\n  right: 30px;\n  transition: opacity 0.1s;\n  width: 240px;\n  z-index: 1000;\n}\n#inject-recorder-ui:hover {\n  opacity: 1;\n}\n#inject-recorder-ui ul {\n  background: rgb(251, 251, 251);\n  box-shadow: var(--skr-box-shadow-lighten);\n  max-height: 250px;\n  overflow-x: hidden;\n  padding: 5px;\n  transition: width 0.1s;\n  width: fit-content;\n}\n#inject-recorder-ui ul::-webkit-scrollbar {\n  background: #f2f2f2;\n  height: 4px;\n  padding-right: 2px;\n  width: 4px;\n}\n#inject-recorder-ui ul::-webkit-scrollbar-thumb {\n  background: #b4bbc5;\n  border: 0;\n  border-radius: 3px;\n}\n#inject-recorder-ui li {\n  align-items: center;\n  box-sizing: content-box;\n  display: flex;\n  padding: 0 0 0 5px;\n  position: relative;\n  transition: all var(--skr-transition-duration-normal), width 0.15s ease-out, background var(--skr-transition-duration-fast) ease-out;\n}\n#inject-recorder-ui li:hover {\n  background: rgba(220, 237, 251, 0.64);\n}\n#inject-recorder-ui li.has-pwd::before {\n  background: rgba(7, 193, 96, 0.52);\n  content: \"\";\n  height: 50%;\n  left: 1px;\n  position: absolute;\n  width: 2px;\n}\n#inject-recorder-ui li a {\n  flex: none;\n  line-height: 30px;\n  overflow: hidden;\n  padding-right: 4px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 132px;\n}\n#inject-recorder-ui li .actions {\n  white-space: nowrap;\n}\n#inject-recorder-ui li button {\n  border: none;\n  height: 20px;\n  line-height: 20px;\n  padding: 0;\n  width: 20px;\n}\n#inject-recorder-ui li button:not(:hover) {\n  color: var(--skr-text-secondary-color);\n}\n#inject-recorder-ui li button:nth-of-type(n + 2) {\n  margin-left: 4px;\n}\n#inject-recorder-ui .control {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  padding-top: 8px;\n}\n#inject-recorder-ui .control input {\n  margin-left: 6px;\n}\n#inject-recorder-ui .view-btn:not(:focus-visible) {\n  outline: none;\n}\n#inject-recorder-ui svg {\n  fill: currentcolor;\n}\n#inject-recorder-ui {\n  /* 动画1 */\n}\n#inject-recorder-ui .inject-slide-fade-enter-active,\n#inject-recorder-ui .inject-slide-fade-leave-active {\n  transition: all 0.1s;\n}\n#inject-recorder-ui .inject-slide-fade-enter-from,\n#inject-recorder-ui .inject-slide-fade-leave-to {\n  opacity: 0;\n  transform: translateY(5px);\n}\n#inject-recorder-ui {\n  /* 动画2 group */\n}\n#inject-recorder-ui .inject-slide-hor-fade-move {\n  transition: all 0.8s;\n}\n#inject-recorder-ui .inject-slide-hor-fade-active {\n  position: absolute;\n}\n#inject-recorder-ui .inject-slide-hor-fade-enter-from,\n#inject-recorder-ui .inject-slide-hor-fade-leave-to {\n  opacity: 0;\n  transform: translateX(30px);\n}");
	function _isSlot(s) {
		return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
	}
	function createRecorder() {
		_GM_registerMenuCommand("显示/隐藏 最近项目", function() {
			const next = !(store_default.recorder_visible ?? true);
			!next && Toast("已隐藏", 1e3);
			store_default.recorder_visible = next;
		});
		createUI();
		function record() {
			const { pid } = parse();
			if (!pid) return;
			const records = _GM_getValue("records", []);
			let old;
			records.find((item, index) => {
				if (item.pid === pid) {
					old = item;
					records.splice(index, 1);
					return true;
				}
				return false;
			});
			const title = ["蓝湖", "..."].includes(document.title) && old?.title ? old.title : document.title;
			records.push({
				...old,
				pid,
				title,
				href: location.href
			});
			_GM_setValue("records", records);
		}
		return { record };
	}
	function createUI() {
		mountComponent({ setup() {
			const state = (0, vue.reactive)({
				recordsVisible: false,
				moreActionsVisible: false,
				width: 160,
				records: useGMvalue("records", [], { deep: true }),
				unhidden: useGMvalue("unhidden", false),
				passwords: useGMvalue("passwords", {})
			});
			const recorderVisible = useGMvalue("recorder_visible", true);
			const lisRef = (0, vue.ref)([]);
			const reversed = (0, vue.computed)(() => [...state.records].reverse());
			(0, vue.onMounted)(() => {
				(0, vue.watch)([
					() => state.recordsVisible,
					() => state.moreActionsVisible,
					() => state.records,
					() => state.unhidden,
					recorderVisible
				], () => {
					(0, vue.nextTick)(() => {
						const [first] = lisRef.value;
						if (first) {
							const width = [...first.children].reduce((totalWidth, el) => totalWidth + el.getBoundingClientRect().width, 0);
							state.width = 5 + width;
						}
					});
				}, {
					immediate: true,
					flush: "post"
				});
			});
			function deleteItem(item) {
				const index = state.records.findIndex((record) => record.pid === item.pid);
				index > -1 && state.records.splice(index, 1);
			}
			function copy(action, item) {
				let copyString = "";
				const password = state.passwords[item.pid];
				if (action === "all") {
					copyString += `${item.title}`;
					password && (copyString += ` (密码：${password})`);
					copyString += `\n${item.href}`;
				} else if (action === "pwd") {
					if (password) copyString += password;
					else Toast.warning("没有密码！");
				}
				if (!copyString) return;
				_GM_setClipboard(copyString, "text");
				Toast.success("复制成功");
			}
			function editCustomTitle(item) {
				let result = window.prompt("输入自定义标题，不填则会使用原标题", item.customTitle || item.title || void 0);
				result &&= result.trim();
				if (result === "") delete item.customTitle;
				else if (result) item.customTitle = result;
			}
			function setRecordsVisible(visible) {
				state.recordsVisible = visible;
			}
			function setMoreActionsVisible(visible) {
				state.moreActionsVisible = visible;
			}
			return () => {
				let _slot;
				return (0, vue.withDirectives)((0, vue.createVNode)("article", {
					"id": "inject-recorder-ui",
					"onMouseenter": () => {
						setRecordsVisible(true);
					},
					"onMouseleave": () => {
						setRecordsVisible(false);
						setMoreActionsVisible(false);
					}
				}, [(0, vue.createVNode)(vue.Transition, { "name": "inject-slide-fade" }, { default: () => [(0, vue.withDirectives)((0, vue.createVNode)("div", null, [(0, vue.createVNode)(vue.TransitionGroup, {
					"tag": "ul",
					"name": "inject-slide-hor-fade"
				}, _isSlot(_slot = reversed.value.map((item, index) => (0, vue.createVNode)("li", {
					"class": { "has-pwd": !!state.passwords[item.pid] },
					"style": { width: `${state.width}px` },
					"key": item.pid,
					"ref": (el) => {
						el && (lisRef.value[index] = el);
					}
				}, [(0, vue.createVNode)("a", {
					"href": item.href,
					"title": item.customTitle || item.title,
					"target": "_blank"
				}, [item.customTitle || item.title]), (0, vue.createVNode)("div", {
					"class": "actions",
					"onMouseenter": () => {
						setMoreActionsVisible(true);
					}
				}, [
					(0, vue.createVNode)(Button, {
						"title": "移除",
						"round": true,
						"onClick": () => {
							deleteItem(item);
						}
					}, { default: () => [(0, vue.createTextVNode)("×")] }),
					(0, vue.withDirectives)((0, vue.createVNode)(Button, {
						"title": "左击复制链接和密码；右击复制密码",
						"round": true,
						"onClick": () => {
							copy("all", item);
						},
						"onContextmenu": (event) => {
							event.preventDefault();
							copy("pwd", item);
						}
					}, _isSlot(IconCopy) ? IconCopy : { default: () => [IconCopy] }), [[vue.vShow, state.moreActionsVisible]]),
					(0, vue.withDirectives)((0, vue.createVNode)(Button, {
						"title": "添加自定义标题",
						"round": true,
						"onClick": () => {
							editCustomTitle(item);
						}
					}, _isSlot(IconEdit) ? IconEdit : { default: () => [IconEdit] }), [[vue.vShow, state.moreActionsVisible]])
				])]))) ? _slot : { default: () => [_slot] })]), [[vue.vShow, reversed.value.length && (state.unhidden || state.recordsVisible)]])] }), (0, vue.createVNode)("div", { "class": "control" }, [(0, vue.createVNode)(Button, {
					"class": "view-btn",
					"type": "primary",
					"shadow": true
				}, { default: () => [(0, vue.createTextVNode)("打开最近项目")] }), (0, vue.withDirectives)((0, vue.createVNode)("input", {
					"onUpdate:modelValue": ($event) => state.unhidden = $event,
					"type": "checkbox",
					"title": "固定显示"
				}, null), [[vue.vModelCheckbox, state.unhidden]])])]), [[vue.vShow, recorderVisible.value]]);
			};
		} });
	}
	var IconCopy = (0, vue.createVNode)("svg", {
		"viewBox": "0 0 1024 1024",
		"version": "1.1",
		"xmlns": "http://www.w3.org/2000/svg",
		"p-id": "4117",
		"width": "10",
		"height": "10"
	}, [(0, vue.createVNode)("path", {
		"d": "M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z",
		"p-id": "4118"
	}, null)]);
	var IconEdit = (0, vue.createVNode)("svg", {
		"class": "icon",
		"viewBox": "0 0 1024 1024",
		"version": "1.1",
		"xmlns": "http://www.w3.org/2000/svg",
		"p-id": "3701",
		"width": "10",
		"height": "10"
	}, [(0, vue.createVNode)("path", {
		"d": "M989.29 161.53L861.47 33.71a90.1 90.1 0 0 0-127.28 0l-69.53 69.53a89.24 89.24 0 0 0-4.29 4.64 29.14 29.14 0 0 0-2.85 2.5L16.83 751.06c-0.35 0.35-0.69 0.71-1 1.07l-0.45 0.52-0.51 0.59-0.54 0.69c-0.12 0.15-0.24 0.3-0.35 0.46s-0.37 0.52-0.56 0.78l-0.28 0.41-0.53 0.81c-0.08 0.14-0.17 0.28-0.26 0.42s-0.31 0.54-0.46 0.82l-0.27 0.47-0.4 0.77-0.27 0.55c-0.11 0.24-0.22 0.48-0.32 0.72s-0.19 0.43-0.28 0.65-0.17 0.43-0.26 0.64l-0.28 0.75c-0.07 0.19-0.13 0.38-0.19 0.57s-0.19 0.56-0.27 0.84l-0.15 0.5c-0.08 0.31-0.17 0.61-0.24 0.92s-0.08 0.32-0.11 0.47q-0.12 0.48-0.21 1l-0.09 0.48c-0.06 0.32-0.11 0.64-0.16 1s0 0.37-0.07 0.55-0.08 0.59-0.11 0.9 0 0.49 0 0.74l-0.06 0.72V987a30 30 0 0 0 30 30h209.77a29.87 29.87 0 0 0 19.06-6.84 30.13 30.13 0 0 0 5-4l604-604 36.69-36.69a30.35 30.35 0 0 0 2.5-2.85 89.24 89.24 0 0 0 4.64-4.29l69.53-69.53a90.1 90.1 0 0 0-0.05-127.27zM236.25 957H68.05V784.7l574-574L812.29 381z m710.62-710.62l-69.53 69.53a30.19 30.19 0 0 1-42.43 0L707.09 188.09a30.19 30.19 0 0 1 0-42.43l69.53-69.53a30 30 0 0 1 42.42 0L946.87 204a30 30 0 0 1 0 42.38z",
		"p-id": "3702"
	}, null)]);
	var marks = new WeakSet();
	var observer = null;
	function autofill() {
		if (observer) {
			observer.disconnect();
			observer = null;
		}
		if (!location.hash.startsWith("#/item/project/door")) return;
		const { pid, pwd } = parse();
		if (!pid || pwd) return;
		let confirmEl = null;
		let passwordEl = null;
		function savePassword() {
			const savedPassword = _GM_getValue("passwords", {});
			const password = passwordEl.value;
			_GM_setValue("passwords", {
				...savedPassword,
				[pid]: password
			});
		}
		observer = new MutationObserver((mutationsList, observer) => {
			let filled = false;
			for (const _ of mutationsList) {
				const [hasConfirmEl, hasPasswordEl] = [$("#project-door .mu-raised-button-wrapper"), $("#project-door .pass input")];
				if (!hasConfirmEl || !hasPasswordEl) continue;
				observer.disconnect();
				confirmEl = hasConfirmEl;
				passwordEl = hasPasswordEl;
				const pidPassword = _GM_getValue("passwords", {})[pid];
				if (filled === false && pidPassword) {
					filled = true;
					passwordEl.value = pidPassword;
					Toast("密码已填写");
					confirmEl.click();
				}
				if (marks.has(confirmEl)) break;
				marks.add(confirmEl);
				confirmEl.addEventListener("mousedown", savePassword);
				passwordEl.addEventListener("keydown", (event) => {
					if (event.keyCode !== 13) return;
					savePassword();
				});
			}
		});
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}
	async function main() {
		if (!checker()) return;
		let app;
		while (!app) {
			app = $(".whole")?.__vue__;
			await sleep(500);
		}
		const recorder = createRecorder();
		app.$watch("$route", function() {
			autofill();
			setTimeout(recorder.record, 500);
		}, { immediate: true });
	}
	main();
})(Vue);
