// ==UserScript==
// @name         View UI v4 文档辅助
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.0.5
// @author       sakura-flutter
// @description  (原iView)隐藏文档中菜单项：Pro、物料
// @license      MIT
// @match        *://v4.iviewui.com/*
// @require      https://unpkg.com/vue@3.5.41/dist/vue.runtime.global.prod.min.js
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
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
	var hide_lazy_default = ".app-left .ivu-menu .ivu-menu-item[data-visible=hidden] {\n  display: none;\n}";
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
	var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_removeValueChangeListener = (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
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
	_css("/* var */\n/* reset */\n:root {\n  --skr-primary-color: #2878ff;\n  --skr-primary-lighten-color: rgb(24 144 255 / 20%);\n  --skr-white-color: #fff;\n  /* transition */\n  --skr-transition-duration-fast: 0.1s;\n  --skr-transition-duration-normal: 0.3s;\n  /* shadow */\n  --skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);\n  --skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);\n  /* border */\n  --skr-border-color: #d9d9d9;\n  /* text */\n  --skr-text-primary-color: #303133;\n  --skr-text-regular-color: #666;\n  --skr-text-secondary-color: #909399;\n  --skr-text-inverse-color: var(--skr-white-color);\n  /* button */\n  --skr-button-transition: all var(--skr-transition-duration-normal);\n  --skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);\n  /* ripple */\n  --skr-ripple-color: rgb(138 218 255 / 20%);\n}\n\n#hide-menu-control-js {\n  bottom: 40px;\n  contain: content;\n  left: 0;\n  padding: 10px 0;\n  position: fixed;\n  z-index: 50;\n}\n#hide-menu-control-js p {\n  writing-mode: vertical-lr;\n}");
	var styles = createLazyStyle(hide_lazy_default);
	mountComponent({ setup() {
		const hidden = useGMvalue("menu_hidden", false);
		(0, vue.watchEffect)(() => {
			hidden.value ? styles.use() : styles.unuse();
		});
		function toggle() {
			hidden.value = !hidden.value;
		}
		return () => (0, vue.createVNode)(Button, {
			"id": "hide-menu-control-js",
			"size": "mini",
			"shadow": true,
			"onClick": toggle
		}, { default: () => [(0, vue.createVNode)("p", null, [(0, vue.createTextVNode)("切换")])] });
	} });
	function main() {
		const storeBadge = ".navigate-item-badge-store";
		const proBadge = ".navigate-item-badge-pro";
		const prefixSelector = ".app-left .ivu-menu ";
		$$(Array.from([storeBadge, proBadge], (item) => prefixSelector + item).join()).forEach((el) => {
			let { parentElement } = el;
			while (parentElement) {
				const { tagName } = parentElement;
				if (tagName === "A" && parentElement.classList.contains("ivu-menu-item")) {
					parentElement.dataset.visible = "hidden";
					break;
				}
				if (tagName === "BODY") break;
				parentElement = parentElement.parentElement;
			}
		});
	}
	setTimeout(main, 500);
})(Vue);
