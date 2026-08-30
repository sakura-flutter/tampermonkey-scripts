// ==UserScript==
// @name         Element UI文档辅助
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.0.4
// @author       sakura-flutter
// @description  在Element UI文档中增加示例目录导航，同时支持v2与v3(element-plus)版本，类似于Ant右侧悬浮的导航
// @license      MIT
// @match        https://element-plus.gitee.io/*
// @match        https://element-plus.org/*
// @match        https://element.eleme.cn/*
// @match        https://element.eleme.io/*
// @require      https://unpkg.com/vue@3.5.41/dist/vue.runtime.global.prod.min.js
// @grant        GM_addStyle
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
	var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	_css("@charset \"UTF-8\";\n.skr-toast-container {\n  position: fixed;\n  z-index: 99999;\n  top: 80px;\n  right: 0;\n  left: 0;\n  pointer-events: none;\n  text-align: center;\n}\n\n.skr-toast {\n  contain: content;\n  max-height: 100vh;\n  transition: all 0.3s ease-in-out;\n}\n.skr-toast-content {\n  pointer-events: auto;\n  display: inline-flex;\n  justify-content: center;\n  margin-bottom: 10px;\n  padding: 8px 16px;\n  max-width: 90vw;\n  font-size: 14px;\n  line-height: 1.5em;\n  border: 1px solid;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n.skr-toast-content--info {\n  color: #2e8bf0;\n  background: #f0faff;\n  border-color: #d4eeff;\n}\n.skr-toast-content--success {\n  color: #19bf6c;\n  background: #edfff3;\n  border-color: #bbf2cf;\n}\n.skr-toast-content--warning {\n  color: #f90;\n  background: #fff9e6;\n  border-color: #ffe7a3;\n}\n.skr-toast-content--error {\n  color: #ed3f13;\n  background: #ffefe6;\n  border-color: #ffcfb8;\n}\n.skr-toast-content-text {\n  flex: auto;\n}\n.skr-toast-content-close {\n  flex: none;\n  width: 20px;\n  margin: 0 -8px 0 10px;\n  padding: 0;\n  font-size: 16px;\n  color: #ababab;\n  border: none;\n  background: transparent;\n  cursor: pointer;\n}\n.skr-toast {\n  /* 动画 */\n}\n.skr-toast-slide-fade-enter-active, .skr-toast-slide-fade-leave-active {\n  transition: all 0.3s;\n}\n.skr-toast-slide-fade-enter-from {\n  transform: translateY(-50%);\n  opacity: 0;\n}\n.skr-toast-slide-fade-leave-to {\n  transform: translateY(50%);\n  max-height: 0;\n  padding: 0;\n  opacity: 0;\n}");
	var toastTypes = [
		"info",
		"success",
		"warning",
		"error"
	];
	var prefixCls = "skr-toast";
	var containerCls = `${prefixCls}-container`;
	function normalizeOptions(options, duration) {
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
				"name": `${prefixCls}-slide-fade`,
				"appear": true,
				"onAfterLeave": () => props.onClosed?.()
			}, { default: () => [visible.value && (0, vue.createVNode)("div", { "class": prefixCls }, [(0, vue.createVNode)("div", { "class": [`${prefixCls}-content`, `${prefixCls}-content--${props.type}`] }, [(0, vue.createVNode)("div", { "class": `${prefixCls}-content-text` }, [props.content]), closable.value && (0, vue.createVNode)("button", {
				"class": `${prefixCls}-content-close`,
				"onClick": close
			}, [(0, vue.createTextVNode)("×")])])])] });
		}
	});
	var Toast = function(_opts, duration) {
		const options = normalizeOptions(_opts, duration);
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
				...normalizeOptions(_opts, duration),
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
	var $$ = document.querySelectorAll.bind(document);
	function getVueRoot(rootContainer) {
		if (isVue2(rootContainer)) return getVue2Instance(rootContainer);
		if (isVue3(rootContainer)) return getVue3Instance(rootContainer);
		return {};
	}
	function isVue2(rootContainer) {
		return "__vue__" in rootContainer;
	}
	function isVue3(rootContainer) {
		return "__vue_app__" in rootContainer;
	}
	function getVue2Instance(rootContainer) {
		return { instance: rootContainer.__vue__ };
	}
	function getVue3Instance(rootContainer) {
		return {
			app: rootContainer.__vue_app__,
			instance: rootContainer._vnode && rootContainer._vnode.component.proxy
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
	_css("@charset \"UTF-8\";\n@media (width >= 1500px) {\n  #catalogue-js {\n    left: calc(50% + 1140px / 2 + 40px);\n    right: auto;\n  }\n}\n#catalogue-js {\n  contain: content;\n  position: fixed;\n  right: 20px;\n  top: 100px;\n  z-index: 1000;\n  /* 列表样式复制ant，仅略微调整 */\n}\n#catalogue-js ul {\n  border-left: 1px solid #f0f0f0;\n  font-size: 12px;\n  list-style: none;\n  margin: 0;\n  padding-left: 0;\n}\n#catalogue-js li {\n  border-left: 1px solid transparent;\n  color: rgba(0, 0, 0, 0.85);\n  cursor: pointer;\n  line-height: 1.5;\n  list-style: none;\n  margin-left: -1px;\n  overflow: hidden;\n  padding: 2px 0 2px 16px;\n  text-overflow: ellipsis;\n  transition: all 0.3s ease;\n  white-space: nowrap;\n  width: 110px;\n}\n#catalogue-js li:hover {\n  border-left-color: #1890ff;\n  color: #1890ff;\n}");
	var Catalogue = class {
		#scope = "";
		#cat = (0, vue.ref)([]);
		constructor({ scope }) {
			this.#scope = scope;
			this.#createUI();
		}
		update() {
			const cat = this.#getElements().map((el) => {
				const catItem = {
					id: el.id,
					text: ""
				};
				el.childNodes.forEach((node) => {
					if (node.nodeName === "#text") catItem.text += node.nodeValue;
				});
				catItem.text = catItem.text.trim();
				return catItem;
			});
			this.#cat.value = cat;
		}
		#getElements() {
			return [...$$(this.#scope)];
		}
		#createUI() {
			const self = this;
			mountComponent({ setup() {
				function intoView(item) {
					$("#" + item.id)?.scrollIntoView({ block: "center" });
				}
				return () => (0, vue.createVNode)("div", { "id": "catalogue-js" }, [(0, vue.createVNode)("ul", null, [self.#cat.value.map((item) => (0, vue.createVNode)("li", {
					"key": item.id,
					"title": item.text,
					"onClick": () => intoView(item)
				}, [item.text]))])]);
			} });
		}
	};
	async function main() {
		if (!checker()) return;
		let instance;
		while (instance == null) {
			({instance} = getVueRoot($("#app")));
			await sleep(500);
		}
		if ($("#app").__vue_app__) return;
		const catalogue = new Catalogue({ scope: ".page-container .page-component__content section.element-doc > h3" });
		let unwatch;
		instance.$watch("$route", function() {
			(0, vue.nextTick)(() => {
				const target = $(".page-component__content");
				if (target && unwatch == null) unwatch = watchDocs(target);
				else if (!target) {
					unwatch?.();
					unwatch = void 0;
				}
			});
		}, { immediate: true });
		function watchDocs(target) {
			catalogue.update();
			const observer = new MutationObserver(() => catalogue.update());
			observer.observe(target, {
				subtree: true,
				childList: true
			});
			return () => {
				observer.disconnect();
				catalogue.update();
			};
		}
	}
	main();
})(Vue);
