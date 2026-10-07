// ==UserScript==
// @name         网页宽屏
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      3.0.1
// @author       sakura-flutter
// @description  适配了微信公众号、知乎、掘金、简书、贴吧、segmentfault、哔哩哔哩、微博、豆瓣、今日头条、Google、crates.io、米游社原神
// @license      MIT
// @include      /^https:\/\/www\.google\..{2,7}search/
// @match        https://mp.weixin.qq.com/s*
// @match        https://www.zhihu.com/*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://tieba.baidu.com/*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://www.bilibili.com/opus/*
// @match        https://t.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://weibo.com/*
// @match        https://www.weibo.com/*
// @match        https://d.weibo.com/*
// @match        https://s.weibo.com/*
// @match        https://www.douban.com/gallery/*
// @match        https://www.douban.com/note/*
// @match        https://movie.douban.com/subject/*
// @match        https://movie.douban.com/review/*
// @match        https://www.toutiao.com/*
// @match        https://crates.io/*
// @match        https://www.miyoushe.com/ys/article/*
// @grant        GM_addValueChangeListener
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @run-at       document-start
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var _GM_addValueChangeListener = (() => typeof GM_addValueChangeListener != "undefined" ? GM_addValueChangeListener : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_removeValueChangeListener = (() => typeof GM_removeValueChangeListener != "undefined" ? GM_removeValueChangeListener : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	function createRouteSnapshot() {
		return {
			href: location.href,
			host: location.hostname,
			pathname: location.pathname || "/",
			search: location.search,
			hash: location.hash
		};
	}
	var RouteMonitor = class {
		#listeners = new Set();
		#current = null;
		#flushQueued = false;
		#started = false;
		start() {
			if (this.#started) return;
			this.#started = true;
			navigation.addEventListener("currententrychange", this.#queueEmit);
			this.#queueEmit();
		}
		subscribe(listener) {
			this.#listeners.add(listener);
			return () => this.#listeners.delete(listener);
		}
		stop() {
			if (!this.#started) return;
			this.#started = false;
			navigation.removeEventListener("currententrychange", this.#queueEmit);
			this.#current = null;
		}
		#queueEmit = () => {
			if (this.#flushQueued) return;
			this.#flushQueued = true;
			queueMicrotask(() => {
				this.#flushQueued = false;
				if (!this.#started) return;
				const next = createRouteSnapshot();
				if (this.#current?.href === next.href) return;
				this.#current = next;
				this.#listeners.forEach((listener) => listener(next));
			});
		};
	};
	function warn(...args) {}
	warn.force = function(...args) {
		console.warn("%c      warn      ", "background: #ffa500; padding: 1px; color: #fff;", ...args);
	};
	function error(...args) {}
	error.force = function(...args) {
		console.error("%c      error      ", "background: red; padding: 1px; color: #fff;", ...args);
	};
	function waitForElement(selector, signal) {
		const current = document.querySelector(selector);
		if (current) return Promise.resolve(current);
		if (signal?.aborted) return Promise.resolve(null);
		return new Promise((resolve) => {
			const root = document.documentElement;
			if (!root) {
				const retry = () => {
					signal?.removeEventListener("abort", abort);
					waitForElement(selector, signal).then(resolve);
				};
				const abort = () => {
					document.removeEventListener("DOMContentLoaded", retry);
					resolve(null);
				};
				document.addEventListener("DOMContentLoaded", retry, { once: true });
				signal?.addEventListener("abort", abort, { once: true });
				return;
			}
			let settled = false;
			const observer = new MutationObserver(() => {
				const element = document.querySelector(selector);
				if (element) finish(element);
			});
			const abort = () => finish(null);
			function finish(element) {
				if (settled) return;
				settled = true;
				observer.disconnect();
				signal?.removeEventListener("abort", abort);
				resolve(element);
			}
			observer.observe(root, {
				childList: true,
				subtree: true
			});
			signal?.addEventListener("abort", abort, { once: true });
		});
	}
	var LifecycleScope = class {
		#beforeDisposers = [];
		#afterDisposers = [];
		#controller = new AbortController();
		#state = "active";
		get signal() {
			return this.#controller.signal;
		}
		onBeforeDispose(disposer) {
			if (this.#state !== "active") {
				disposer();
				return;
			}
			this.#beforeDisposers.push(disposer);
		}
		onAfterDispose(disposer) {
			if (this.#state === "disposed") {
				disposer();
				return;
			}
			this.#afterDisposers.push(disposer);
		}
		dispose() {
			if (this.#state !== "active") return;
			this.#state = "disposing";
			this.#controller.abort();
			this.#run(this.#beforeDisposers);
			this.#state = "disposed";
			this.#run(this.#afterDisposers);
			this.#beforeDisposers = [];
			this.#afterDisposers = [];
		}
		#run(disposers) {
			for (const disposer of disposers.reverse()) try {
				disposer();
			} catch (error$3) {
				error.force("[widescreen] cleanup failed", error$3);
			}
		}
	};
	function escapeRegExp(value) {
		return value.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
	}
	function compilePathPattern(pattern) {
		const source = (pattern.length > 1 ? pattern.replace(/\/+$/, "") : pattern).split("/").map((segment) => {
			if (segment === "*") return ".*";
			if (segment.startsWith(":")) return "[^/]+";
			return escapeRegExp(segment);
		}).join("/");
		return new RegExp(`^${source}/?$`);
	}
	function matchesPattern(pathname, pattern) {
		if (typeof pattern === "string") return compilePathPattern(pattern).test(pathname);
		pattern.lastIndex = 0;
		const matched = pattern.test(pathname);
		pattern.lastIndex = 0;
		return matched;
	}
	function getSpecificity(pattern) {
		return Math.max(...(Array.isArray(pattern) ? pattern : [pattern]).map((value) => {
			if (value instanceof RegExp) return 0;
			return value.split("/").filter(Boolean).reduce((score, segment) => score + (segment.startsWith(":") ? 1 : 3), 0);
		}));
	}
	function pageMatches(route, page) {
		return (Array.isArray(page.pathPattern) ? page.pathPattern : [page.pathPattern]).some((pattern) => matchesPattern(route.pathname, pattern));
	}
	function matchRoute(route, sites) {
		const site = sites.find((candidate) => candidate.host === route.host);
		if (!site) return null;
		const page = site.pages.filter((page) => pageMatches(route, page)).sort((left, right) => {
			const priority = (right.priority ?? 0) - (left.priority ?? 0);
			if (priority !== 0) return priority;
			return getSpecificity(right.pathPattern) - getSpecificity(left.pathPattern);
		})[0];
		return page ? {
			site,
			page
		} : null;
	}
	var StyleManager = class {
		mount(resource) {
			resource.use();
			let disposed = false;
			return { dispose() {
				if (disposed) return;
				disposed = true;
				resource.unuse();
			} };
		}
	};
	var WidescreenRuntime = class {
		#sites;
		#settings;
		#panel;
		#styles = new StyleManager();
		#currentRoute = null;
		#currentMatch = null;
		#activeHref = null;
		#activeSettings = null;
		#siteScope = null;
		#pageScope = null;
		constructor(options) {
			this.#sites = options.sites;
			this.#settings = options.settings;
			this.#panel = options.panel;
		}
		transition(route) {
			this.#currentRoute = route;
			const nextMatch = matchRoute(route, this.#sites);
			if (this.#samePage(nextMatch) && this.#activeHref === route.href) {
				this.#panel.show(this.#panelState(nextMatch));
				if (this.#currentMatch?.page.update && this.#pageScope) try {
					this.#currentMatch.page.update(this.#createContext(this.#currentMatch, this.#pageScope));
				} catch (error$1) {
					error.force("[widescreen] page update failed", this.#currentMatch.site.id, this.#currentMatch.page.id, error$1);
					this.#disposePage();
				}
				return;
			}
			this.#activate(nextMatch);
		}
		reconcile() {
			if (!this.#currentRoute) return;
			const nextMatch = matchRoute(this.#currentRoute, this.#sites);
			if (nextMatch && this.#samePage(nextMatch)) {
				const nextSettings = this.#settings.get(nextMatch.site.id);
				if (this.#activeSettings?.enabled === nextSettings.enabled && this.#activeSettings?.uncapped === nextSettings.uncapped) {
					this.#panel.show(this.#panelState(nextMatch));
					return;
				}
			}
			this.#activate(nextMatch);
		}
		dispose() {
			this.#disposeSite();
			this.#panel.hide();
			this.#activeHref = null;
		}
		#activate(nextMatch) {
			this.#activeHref = this.#currentRoute?.href ?? null;
			if (!nextMatch) {
				this.#disposeSite();
				this.#currentMatch = null;
				this.#panel.hide();
				return;
			}
			`${nextMatch.site.name}${nextMatch.page.name}`;
			const reuseSite = this.#currentMatch?.site.host === nextMatch.site.host && this.#siteScope !== null;
			if (reuseSite) this.#disposePage();
			else this.#disposeSite();
			this.#currentMatch = nextMatch;
			const settings = this.#settings.get(nextMatch.site.id);
			this.#panel.show(this.#panelState(nextMatch));
			if (!settings.enabled) {
				this.#disposeSite();
				this.#activeSettings = settings;
				return;
			}
			this.#siteScope ??= new LifecycleScope();
			this.#pageScope = new LifecycleScope();
			try {
				if (!reuseSite) this.#mountStyles(nextMatch.site.commonStyles, this.#siteScope);
				this.#mountStyles(nextMatch.page.styles, this.#pageScope);
				this.#applyWidth(nextMatch, settings.uncapped);
				const context = this.#createContext(nextMatch, this.#pageScope);
				const disposer = nextMatch.page.activate?.(context);
				if (disposer) this.#pageScope.onBeforeDispose(disposer);
				this.#activeSettings = settings;
			} catch (error$2) {
				error.force("[widescreen] site activation failed", nextMatch.site.id, nextMatch.page.id, error$2);
				this.#disposePage();
				this.#activeSettings = null;
			}
		}
		#mountStyles(resources, scope) {
			resources?.forEach((resource) => {
				const handle = this.#styles.mount(resource);
				scope.onBeforeDispose(() => handle.dispose());
			});
		}
		#createContext(match, scope) {
			return {
				route: this.#currentRoute,
				site: match.site,
				page: match.page,
				settings: this.#settings.get(match.site.id),
				signal: scope.signal,
				onBeforeDispose: (disposer) => scope.onBeforeDispose(disposer),
				onAfterDispose: (disposer) => scope.onAfterDispose(disposer),
				waitFor: (selector) => waitForElement(selector, scope.signal)
			};
		}
		#panelState(match) {
			return {
				siteId: match.site.id,
				siteName: match.site.name,
				pageName: match.page.name,
				settings: this.#settings.get(match.site.id)
			};
		}
		#applyWidth(match, uncapped) {
			const policy = match.page.widthPolicy;
			const root = document.documentElement;
			const viewportWidth = `${policy.viewportRatio * 100}vw`;
			const maxWidth = typeof policy.maxWidth === "number" ? `${policy.maxWidth}px` : policy.maxWidth;
			const width = uncapped ? viewportWidth : `min(${viewportWidth}, ${maxWidth})`;
			root.style.setProperty("--ws-content-width", width);
			root.dataset.wsSite = match.site.id;
			root.dataset.wsPage = match.page.id;
			root.dataset.wsMode = uncapped ? "uncapped" : "normal";
		}
		#clearPageState() {
			const root = document.documentElement;
			root.style.removeProperty("--ws-content-width");
			delete root.dataset.wsPage;
			delete root.dataset.wsMode;
		}
		#disposePage() {
			this.#pageScope?.dispose();
			this.#pageScope = null;
			this.#clearPageState();
		}
		#disposeSite() {
			this.#disposePage();
			this.#siteScope?.dispose();
			this.#siteScope = null;
			this.#activeSettings = null;
			delete document.documentElement.dataset.wsSite;
		}
		#samePage(nextMatch) {
			return Boolean(nextMatch && this.#currentMatch && nextMatch.site.host === this.#currentMatch.site.host && nextMatch.page.id === this.#currentMatch.page.id);
		}
	};
	var STORAGE_KEY = "widescreen.config";
	function defaultSiteSettings() {
		return {
			enabled: true,
			uncapped: false
		};
	}
	function normalizeSiteSettings(value) {
		if (!value || typeof value !== "object") return defaultSiteSettings();
		const candidate = value;
		return {
			enabled: typeof candidate.enabled === "boolean" ? candidate.enabled : true,
			uncapped: typeof candidate.uncapped === "boolean" ? candidate.uncapped : false
		};
	}
	function defaultSettings() {
		return {
			version: 2,
			sites: {},
			panel: {
				visible: true,
				position: null
			}
		};
	}
	function normalizePanelPosition(value) {
		if (!value || typeof value !== "object") return null;
		const candidate = value;
		if (!Number.isFinite(candidate.right) || !Number.isFinite(candidate.top)) return null;
		return {
			right: Math.max(0, candidate.right),
			top: Math.max(0, candidate.top)
		};
	}
	function normalize(value) {
		if (!value || typeof value !== "object") return defaultSettings();
		const candidate = value;
		const sites = candidate.sites && typeof candidate.sites === "object" ? candidate.sites : {};
		const panel = candidate.panel && typeof candidate.panel === "object" ? candidate.panel : void 0;
		const visible = typeof panel?.visible === "boolean" ? panel.visible : true;
		const position = normalizePanelPosition(panel?.position);
		return {
			version: 2,
			sites: Object.fromEntries(Object.entries(sites).map(([siteId, settings]) => [siteId, normalizeSiteSettings(settings)])),
			panel: {
				visible,
				position
			}
		};
	}
	var SettingsStore = class {
		#read() {
			return normalize(_GM_getValue(STORAGE_KEY));
		}
		get(siteId) {
			return this.#read().sites[siteId] ?? defaultSiteSettings();
		}
		update(siteId, patch) {
			const settings = this.#read();
			settings.sites[siteId] = {
				...defaultSiteSettings(),
				...settings.sites[siteId],
				...patch
			};
			_GM_setValue(STORAGE_KEY, settings);
		}
		getPanelPosition() {
			const position = this.#read().panel.position;
			return position ? { ...position } : null;
		}
		setPanelPosition(position) {
			const settings = this.#read();
			settings.panel.position = normalizePanelPosition(position);
			_GM_setValue(STORAGE_KEY, settings);
		}
		getPanelVisible() {
			return this.#read().panel.visible;
		}
		setPanelVisible(visible) {
			const settings = this.#read();
			settings.panel.visible = visible;
			_GM_setValue(STORAGE_KEY, settings);
		}
		subscribe(listener) {
			const id = _GM_addValueChangeListener(STORAGE_KEY, () => listener());
			return () => _GM_removeValueChangeListener(id);
		}
	};
	var style_lazy_default$23 = "@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root body .Topstory-container {\n    width: var(--ws-content-width);\n  }\n  :root body {\n    /* 内容 */\n  }\n  :root body .Topstory-mainColumn {\n    flex: 1;\n  }\n  :root body {\n    /* 右侧 */\n  }\n  :root body .GlobalSideBar {\n    flex: initial;\n    width: 296px;\n  }\n}";
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
	var zhihuSite = {
		id: "zhihu",
		host: "www.zhihu.com",
		name: "知乎",
		pages: [
			{
				id: "home",
				name: "首页",
				pathPattern: [
					"/",
					"/follow",
					"/hot",
					"/column-square"
				],
				widthPolicy: {
					viewportRatio: .8,
					maxWidth: 1400
				},
				styles: [createLazyStyle(style_lazy_default$23)]
			},
			{
				id: "question",
				name: "问题页",
				pathPattern: ["/question/:id", "/question/:id/*"],
				widthPolicy: {
					viewportRatio: .8,
					maxWidth: 1400
				},
				styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1350px) {\n  :root:root {\n    --container-width: var(--ws-content-width);\n  }\n  :root .App-main {\n    /* 标题区域 */\n  }\n  :root .App-main .QuestionHeader-content {\n    margin-inline: auto;\n    padding-inline: var(--container-padding-x);\n    max-width: none;\n    width: calc(var(--container-width) + var(--container-padding-x) * 2);\n    padding-left: 0;\n  }\n  :root .App-main .QuestionHeader-content .QuestionHeader-main {\n    flex: 1;\n  }\n  :root .App-main .QuestionHeader-footer {\n    margin-inline: auto;\n    width: calc(var(--container-width) + var(--container-padding-x) * 2);\n  }\n  :root .App-main .QuestionHeader-footer-inner {\n    margin-inline: 0;\n    padding-left: 0;\n  }\n  :root .App-main {\n    /* 主要内容 */\n  }\n  :root .App-main .Question-mainColumn {\n    width: auto;\n  }\n  :root .App-main .Question-mainColumn .ContentItem-actions.is-fixed {\n    width: calc(var(--container-width) - var(--right-sidebar-width) - var(--container-padding-x) + 5px) !important;\n  }\n  :root .App-main {\n    /* 内容图片 */\n  }\n  :root .App-main .ztext .content_image, :root .App-main .ztext .origin_image {\n    max-width: 694px !important;\n  }\n}")],
				activate(context) {
					dispatchEvent(new Event("resize"));
					waitForElement(".QuestionAnswers-answers", context.signal).then((element) => {
						if (!(element instanceof HTMLElement) || context.signal.aborted) return;
						const applyOriginalImages = () => {
							element.querySelectorAll("img[data-original]").forEach((image) => {
								const original = image.dataset.original;
								if (original && image.src !== original) image.src = original;
							});
						};
						applyOriginalImages();
						const observer = new MutationObserver(applyOriginalImages);
						observer.observe(element, {
							childList: true,
							subtree: true,
							attributes: true,
							attributeFilter: ["src", "data-original"]
						});
						context.onBeforeDispose(() => {
							observer.disconnect();
						});
						context.onAfterDispose(() => {
							dispatchEvent(new Event("resize"));
						});
					});
				}
			},
			{
				id: "topic",
				name: "话题页",
				pathPattern: ["/topic/:id", "/topic/:id/*"],
				widthPolicy: {
					viewportRatio: .8,
					maxWidth: 1400
				},
				styles: [createLazyStyle("@media screen and (min-width: 1300px) {\n  :root .App-main > div:first-child {\n    max-width: var(--ws-content-width);\n  }\n}")]
			}
		]
	};
	var zhuanlanSite = {
		id: "zhihu",
		host: "zhuanlan.zhihu.com",
		name: "知乎专栏",
		pages: [{
			id: "article",
			name: "文章",
			pathPattern: ["/p/:id", "/p/:id/*"],
			widthPolicy: {
				viewportRatio: .8,
				maxWidth: 1400
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1350px) {\n  :root:root {\n    --container-width: var(--ws-content-width);\n    --container-main-column-width: calc(\n      var(--container-width) - var(--right-sidebar-width) - var(--container-padding-x) * 3\n    );\n  }\n  :root .Post-content {\n    /* 正文区域 */\n  }\n  :root .Post-content > div:nth-of-type(3) {\n    width: var(--container-width);\n  }\n  :root .Post-content {\n    /* 内容图片 */\n  }\n  :root .Post-content .ztext .content_image, :root .Post-content .ztext .origin_image {\n    max-width: 690px !important;\n  }\n}")],
			activate(context) {
				dispatchEvent(new Event("resize"));
				waitForElement(".Post-RichTextContainer", context.signal).then((element) => {
					if (!(element instanceof HTMLElement) || context.signal.aborted) return;
					const applyOriginalImages = () => {
						element.querySelectorAll("img[data-original]").forEach((image) => {
							const original = image.dataset.original;
							if (original && image.src !== original) image.src = original;
						});
					};
					applyOriginalImages();
					const observer = new MutationObserver(applyOriginalImages);
					observer.observe(element, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["src", "data-original"]
					});
					context.onBeforeDispose(() => {
						observer.disconnect();
					});
					context.onAfterDispose(() => {
						dispatchEvent(new Event("resize"));
					});
				});
			}
		}]
	};
	var articlePage$5 = {
		id: "article",
		name: "专栏文章",
		pathPattern: /^\/read\/cv/,
		widthPolicy: {
			viewportRatio: .83,
			maxWidth: 1160
		},
		styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1120px) {\n  :root #app {\n    /* 文章 */\n  }\n  :root #app .article-detail {\n    width: var(--ws-content-width);\n  }\n  :root #app #article-content {\n    /* 图片宽度 */\n  }\n  :root #app #article-content .img-box img[data-type=preview] {\n    width: auto !important;\n    max-width: 100%;\n    height: auto !important;\n  }\n  :root #app {\n    /* 右侧悬浮按钮 */\n  }\n  :root #app .right-side-bar {\n    margin-left: calc(var(--ws-content-width) + 25px);\n    transition-property: bottom;\n  }\n  :root #app {\n    /* 文章下方图片 哎？广告 */\n  }\n  :root #app .activty-image .card-image {\n    margin: auto;\n  }\n}")],
		activate(context) {
			context.waitFor("#article-content").then((element) => {
				if (!(element instanceof HTMLElement) || context.signal.aborted) return;
				const applyOriginalImages = () => {
					element.querySelectorAll("img[data-type=\"preview\"][data-src]").forEach((image) => {
						const source = image.dataset.src;
						if (!source) return;
						const original = source.replace(/@[0-9a-z]+_[0-9a-z]+_/i, "@");
						if (original !== source) image.dataset.src = original;
					});
				};
				applyOriginalImages();
				const observer = new MutationObserver(applyOriginalImages);
				observer.observe(element, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ["data-src"]
				});
				context.onBeforeDispose(() => observer.disconnect());
			});
		}
	};
	var style_lazy_default$18 = "@charset \"UTF-8\";\n@media screen and (min-width: 900px) {\n  :root #app {\n    /* Opus 内容容器 */\n  }\n  :root #app .opus-detail {\n    width: var(--ws-content-width) !important;\n    /* Opus 顶部封面图片 */\n  }\n  :root #app .opus-detail .opus-module-top__album__cover {\n    width: auto;\n    height: auto !important;\n  }\n  :root #app {\n    /* 右侧工具栏 */\n  }\n  :root #app .right-sidebar-wrap {\n    margin-left: calc(var(--ws-content-width) + 12px);\n  }\n}";
	var mocha_lazy_default = ":root .mocha-strawberry {\n  position: fixed;\n  right: 70px;\n  bottom: 50px;\n  z-index: 1;\n}";
	var strawberry = "<svg class=\"mocha-strawberry\" t=\"1611323249307\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3471\" width=\"200\" height=\"200\"><path d=\"M799 780c-27.5 27.5-100.4 64.8-188.8 97.1 1.6-0.6 3.3-1.2 4.9-1.8-24.2-40.7-66.3-22.5-91.9-58.4-25.6-35.9 72.6-132.4 10.2-205S403.5 576 348 571.8c-55.5-4.3-114.5-75.2-147.8-120.5-13.9-18.9-20.7-54.3-23.8-89 17.6-41.9 37-78 56.7-104.7 2.6 32.6 19.6 94.1 64.7 102.9 117 23.1 184.3-39.1 256.3-6.8 17.7 7.9 29.5 22.5 38 40.8 13.9 29.6 19.6 68.9 29 105.2 9.2 35.4 21.9 68.1 49.1 86.4 64.5 43.2 132.2 49.4 187.3 9.6 3.9-2.8 7.7-5.8 11.4-9 11.4 86.1-26.6 150.1-69.9 193.3z\" fill=\"#F9724C\" p-id=\"3472\"></path><path d=\"M615.2 875.3c-51.8 19.1-104.7 35.2-158.5 47.7-53.5 12.4-108.3 21.7-163.4 22.7-31 0.6-62.7-1.3-92.6-10 6 1.7 12.9 4.4 19.1 3.7 5-0.6 9.9-1.4 14.8-2.6 10.2-2.4 20.1-6.2 29.4-11.2 21.8-11.6 40.8-29.7 54.5-50.2 22.8-34.3 8.2-74.7-10.6-107.1-26.5-45.7-62.2-85.5-94.1-127.3-14.6-19.1-28.1-37.9-36.5-60.6-8-21.7-12.2-44.6-14.2-67.5-4-44.3-0.3-89.2 6.8-132.9 1-6.2 4.1-12 6.6-17.8 2.4 26.4 5.7 55.1 17.8 79.1 6.1 12 15.4 22.6 23.7 33.1 8.5 10.7 17.3 21.1 26.6 31.1 18 19.5 37.9 38.1 60.9 51.5 11.1 6.5 23.3 11.7 36.1 13.9 13.8 2.3 28 1 41.8-0.4 28-2.9 56.3-7.5 84.2-1 25.6 6 47.4 21.2 64.5 40.7 18 20.5 24.8 46 21.6 73-3.3 27.7-15 53.3-24.8 79.1-4.6 12.2-9.9 25.3-10 38.5-0.2 12.9 8.1 22.7 18.2 29.8 20.4 14.4 48.2 13.2 67 30.7 4.3 4.2 8 8.9 11.1 14z\" fill=\"#ED4233\" p-id=\"3473\"></path><path d=\"M316.5 878.4c-14 19.3-31.6 36.3-52.8 47.5-10.5 5.5-21.8 9.6-33.4 11.9-5.1 1-10.7 2.4-15.8 1.4-6.2-1.2-12.4-3-18.5-4.9-21.7-6.9-41.9-18.1-56.7-35.8-15-18-24.2-40.2-30.3-62.6-13.1-47.9-13.6-99-10.4-148.3 3.3-50.4 11.3-100.5 22.4-149.7 12.4-54.9 29-108.6 49.4-161 0 3.9-1.3 8.2-1.9 12-0.6 4.2-1.2 8.4-1.8 12.7-1.2 8.9-2.2 17.9-3 26.9-1.7 18.9-2.5 37.9-2.1 56.9 0.7 36.2 5.6 73.4 20.5 106.7 7.4 16.5 18 30.7 28.9 45.1 11.1 14.7 22.6 29.2 34 43.6 22.2 28.2 45.1 56.4 63.1 87.5 9.7 16.7 18.3 34.8 21.3 54.1 3.1 19.9-1.1 39.7-12.9 56z\" fill=\"#D10305\" p-id=\"3474\"></path><path d=\"M869 586.6c-21.1 18.3-46.9 30.9-74.7 34.5-28.2 3.6-56.8-1.9-82.9-12.7-24.7-10.3-50-24.3-65.3-47-15.9-23.6-23-52.2-29.3-79.6-6.4-28-11.4-57-22.9-83.5-5.1-11.8-11.8-23-21.1-31.9-9.4-9-21.1-14.6-33.6-18.1-28.7-8-58.4-2.6-87 3.4-29.1 6.1-58.2 12.5-88.1 13.8-15 0.7-30.1 0.1-45.1-1.6-13.7-1.6-27.9-3.3-39.9-10.7-22.2-13.8-34.1-40.2-40.6-64.6-1.8-6.9-3.3-13.8-4.3-20.9-0.4-2.8-1.5-6.5-1.1-9.2 0.3-2.1 1.8-3.4 3.1-5.2 8.7-11.3 18.4-21.5 29-31 21-19 44.3-35.6 70.2-47.1 26.7-11.8 55.6-17.8 84.8-17.3 29.2 0.5 58 7.3 85.2 17.7 54.5 20.9 103 55.3 147.2 92.9 44.4 37.8 86.1 79.6 122.6 125.1 36.3 45.2 68.4 95.7 84.9 151.6 4 13.6 7.1 27.5 8.9 41.4z\" fill=\"#F7B696\" p-id=\"3475\"></path><path d=\"M621.2 499.7c-22.3 2.4-37.4 2.1-37.4 2.1s-10.2-48.5 8.4-107.4c13.9 29.7 19.6 68.9 29 105.3z\" fill=\"#ED4233\" p-id=\"3476\"></path><path d=\"M870.8 606.2c-4.4-3.3-8.8-6.9-13.1-10.5-47.8-40.3-92.7-100.2-92.7-151.8-38.7 38.7-103 51.6-143.7 55.9-9.4-36.4-15.1-75.6-29-105.2 8.5-26.8 22.9-55.8 47.1-83.4-101.2 0-150.5-92.4-178.2-148.6 0.5 0.1 1 0.2 1.4 0.3 1.3 0.3 2.7 0.6 4 0.9 0.6 0.1 1.2 0.3 1.7 0.4 1.6 0.4 3.3 0.8 4.9 1.2 0.5 0.1 1 0.2 1.4 0.4 2 0.5 4.1 1.1 6.2 1.7 0.7 0.2 1.3 0.4 2 0.6 2.1 0.6 4.2 1.3 6.3 1.9 0.7 0.2 1.4 0.4 2.1 0.7 1.1 0.4 2.3 0.8 3.4 1.2 0.8 0.3 1.7 0.6 2.5 0.9 2.6 0.9 5.3 1.9 7.9 2.9 1 0.4 2.1 0.8 3.1 1.2 2.6 1 5.2 2.1 7.8 3.2 1 0.4 2.1 0.9 3.1 1.3 0.2 0.1 0.3 0.1 0.5 0.2 0.9 0.4 1.9 0.8 2.9 1.3 1.4 0.6 2.7 1.2 4.1 1.9 1.2 0.6 2.4 1.1 3.6 1.7 1.2 0.6 2.4 1.1 3.6 1.7 1.3 0.6 2.5 1.2 3.8 1.9 1.1 0.5 2.1 1.1 3.2 1.6 2.6 1.3 5.3 2.8 8 4.2 1.3 0.7 2.5 1.4 3.8 2.1 0.1 0.1 0.3 0.2 0.4 0.2 1.1 0.6 2.3 1.3 3.4 1.9 1.2 0.7 2.4 1.4 3.6 2 0.1 0.1 0.2 0.1 0.2 0.1 2.5 1.5 5.1 3 7.7 4.5 1.4 0.8 2.8 1.7 4.2 2.5 1.2 0.7 2.4 1.5 3.6 2.2 2.6 1.6 5.2 3.3 7.9 5l5.1 3.3c1 0.7 1.9 1.3 2.9 1.9 1.3 0.9 2.7 1.8 4 2.7s2.7 1.9 4 2.8c2.7 1.9 5.4 3.8 8.1 5.8 0.2 0.2 0.4 0.3 0.7 0.5 1.1 0.8 2.3 1.7 3.4 2.5 1.4 1 2.7 2 4.1 3 1.4 1 2.8 2.1 4.1 3.1 1.1 0.9 2.3 1.8 3.4 2.6 0.3 0.2 0.6 0.5 0.9 0.7 1.3 1 2.7 2.1 4 3.1l0.2 0.2c1.3 1.1 2.7 2.1 4 3.2 1.4 1.1 2.8 2.3 4.2 3.4 1.4 1.1 2.7 2.2 4.1 3.3 0.2 0.2 0.4 0.3 0.7 0.5 1.3 1 2.5 2.1 3.8 3.2 1.4 1.2 2.9 2.4 4.3 3.6 1.4 1.2 2.9 2.4 4.3 3.7 1.4 1.2 2.9 2.5 4.3 3.7 1.4 1.3 2.9 2.5 4.4 3.8s2.9 2.6 4.4 3.9c2.9 2.6 5.8 5.2 8.7 7.9 0.1 0.1 0.2 0.2 0.4 0.3 2.7 2.5 5.5 5 8.2 7.6l0.5 0.5c3 2.8 6 5.7 9 8.6 1.4 1.4 2.9 2.8 4.3 4.1l0.3 0.3c2.7 2.6 5.4 5.3 8.2 8l1 1 4.6 4.6c3.5 3.5 7 7.1 10.4 10.6 0.9 0.9 1.7 1.8 2.5 2.6 0.8 0.9 1.7 1.7 2.5 2.6 2.5 2.6 5 5.2 7.4 7.8 0.1 0.1 0.2 0.3 0.4 0.4 1.5 1.6 2.9 3.2 4.4 4.7 1.6 1.7 3.2 3.5 4.7 5.2 0.8 0.9 1.5 1.7 2.3 2.6 2.3 2.5 4.6 5.1 6.8 7.6 0.7 0.8 1.5 1.7 2.2 2.5s1.5 1.7 2.2 2.5c11.4 13.3 21.9 26.2 31.3 38.9 0.6 0.7 1.1 1.5 1.6 2.2 9.3 12.5 17.6 24.7 25 36.6 0.4 0.7 0.9 1.4 1.3 2 0.5 0.7 0.9 1.5 1.4 2.2 0.8 1.3 1.6 2.7 2.4 4 1.7 2.8 3.3 5.5 4.8 8.3 3.1 5.5 6.1 10.9 8.9 16.2 0.7 1.3 1.4 2.7 2 4 1.4 2.7 2.7 5.3 3.9 7.9 0.6 1.2 1.1 2.4 1.7 3.5 0.1 0.3 0.3 0.5 0.4 0.8 0.4 0.8 0.8 1.7 1.1 2.5 0.3 0.6 0.6 1.2 0.8 1.8 0.5 1 0.9 2 1.4 3.1 0.5 1.2 1 2.3 1.5 3.5s1 2.4 1.5 3.5c0.3 0.8 0.6 1.5 0.9 2.3 0.4 0.9 0.7 1.8 1.1 2.7 0.4 1.1 0.9 2.3 1.3 3.4 0.5 1.3 1 2.5 1.4 3.8 0.9 2.5 1.8 5 2.6 7.5 0.4 1.1 0.7 2.2 1.1 3.3 0.1 0.2 0.1 0.3 0.2 0.5 0.4 1.2 0.8 2.4 1.1 3.5v0.1c0.3 0.8 0.5 1.7 0.8 2.5 0.2 0.6 0.4 1.3 0.6 1.9 0.3 1 0.6 1.9 0.8 2.9 0.3 1.2 0.7 2.3 1 3.4 0 0.1 0.1 0.2 0.1 0.4 0.6 2.3 1.2 4.5 1.7 6.7 1.2 4.8 2.2 9.6 3.1 14.3 0.2 1.2 0.4 2.3 0.6 3.5 0.2 1.1 0.4 2.3 0.6 3.4 0.2 1.1 0.4 2.3 0.5 3.4 0.2 1.1 0.3 2.3 0.5 3.4 1 6.5 1.6 13 1.9 19.4z\" fill=\"#F9724C\" p-id=\"3477\"></path><path d=\"M773.1 282.7c56-33.2 84.3-95.3 85.7-98.4 4.1-9.1 0-19.9-9.2-23.9-9.1-4.1-19.9 0-23.9 9.2-0.1 0.2-8.6 19-25.3 40.3-12.6 16-31.9 36-57 47.5C671.9 74.2 523.7 95 427.5 105.7c24.6 45.7 71.7 174.8 191.3 174.8-77.1 88.1-55.5 190.7-55.5 190.7s121.4 1.8 181.1-58c0 84.4 120.2 190.9 176.4 197.9 3-89.4 23.5-269.7-147.7-328.4z\" fill=\"#91AB48\" p-id=\"3478\"></path><path d=\"M800.4 209.8c16.7-21.3 25.2-40.1 25.3-40.3 4.1-9.1 14.8-13.2 23.9-9.1 3 1.3 5.4 3.3 7.2 5.8 0.1-0.2 0.2-0.4 0.2-0.5 3.9-8.8 0-19.1-8.8-23.1-8.8-3.9-19.1 0-23.1 8.8-0.1 0.2-8.3 18.3-24.4 38.8-12.1 15.5-30.8 34.7-54.9 45.8C677 59.6 534.2 79.6 441.6 89.9c2.1 3.9 4.4 8.5 6.9 13.5 95.6-10.3 228.5-16.3 295 154 25-11.6 44.4-31.5 56.9-47.6zM794.1 268c-6.5 5.3-13.5 10.2-21 14.7C868.6 315.4 904.5 386 917 457.5c-6.9-72.9-33.8-150.4-122.9-189.5zM273.4 213.6c-2.8 2.8-5.5 5.8-8.3 9 50.9-46.5 112.7-75.2 190.9-61-4-7.2-7.6-14.2-10.9-20.9-70-4.9-125.6 26.8-171.7 72.9z\" fill=\"#FFFFFF\" p-id=\"3479\"></path><path d=\"M911.2 431c-0.3 24.1-6.3 42-23.5 42-53 0-67.3-87.7-96.7-59s-52.2-18.5-62.4-29.7-63.2 1-90.9-37.8c-27.7-38.7 46-97.9 28.2-130.5S522.4 182.6 551 132.4c7.4-13 23-20.4 41.9-24.1 58.6 16 114.3 56.5 150.5 149 25.1-11.5 44.4-31.5 57-47.5 16.7-21.3 25.2-40.1 25.3-40.3 4.1-9.1 14.8-13.2 23.9-9.1 9.1 4.1 13.2 14.8 9.2 23.9-1.4 3.1-29.7 65.2-85.7 98.4 83.7 28.7 121.6 86.4 138.1 148.3z\" fill=\"#A6BF4C\" p-id=\"3480\"></path><path d=\"M270 213.3c2.9 0 5.8-1.2 7.8-3.3 56.7-56.8 116.8-78.8 183.8-67.4 3.1 1.4 6.8 1.4 9.9-0.3 0.8-0.4 1.5-0.9 2.1-1.5 1.9-1.6 3.3-3.8 3.8-6.5 0.5-2.9-0.1-5.8-1.7-8.2-0.4-0.6-0.9-1.2-1.4-1.7-5.3-9.8-10-19.3-14.2-27.7l-2.1-4.3c-0.8-1.7-1.6-3.3-2.4-4.9 33.6-3.7 77.4-7.8 119-0.6 50.2 8.7 89.4 32.1 119.9 71.4 2 2.7 5.2 4.3 8.7 4.3 2.5 0 4.8-0.8 6.8-2.4 2.3-1.7 3.8-4.3 4.2-7.1 0.4-2.9-0.4-5.9-2.2-8.3-34.2-44.2-78.3-70.2-134.8-79.8-47.6-8-95.4-2.7-133.8 1.7l-5.9 0.7c-3.5 0.3-6.6 2.5-8.5 5.6-1.8 3.1-1.9 7-0.2 10.4l0.1 0.1c2.3 4.2 4.7 9.2 7.5 14.9l3.4 6.9c2 4.1 4.2 8.5 6.5 13.1-66.8-5.8-127.3 19.2-184.1 76l-0.1 0.1c-4.1 4.3-4.1 11.2 0 15.4 2.1 2.2 4.9 3.4 7.9 3.4zM841.6 671.9c-2.5-1.5-5.4-2-8.3-1.3-2.9 0.7-5.3 2.5-6.8 4.9-9.9 16.3-22.3 31.9-36.9 46.5-17.7 17.7-58.5 41.3-111.9 64.7-56.6 24.8-122.5 47.4-185.5 63.6-72.1 18.6-138.1 28.5-191 28.6H300c-59.9 0-102.2-12-125.9-35.6-18.1-18.1-30.8-46.7-37.7-85-6.5-36.1-7.8-79.5-3.7-129.1 7.5-91.4 33-198.3 68.2-286.1 1.2-2.8 1.2-5.8 0-8.5s-3.3-4.8-6-5.9c-2.7-1.1-5.7-1.1-8.4 0-2.7 1.2-4.8 3.3-5.9 6-36 89.7-62.1 199-69.7 292.5-4.2 51.6-2.9 96.9 4 134.8 7.7 42.8 22.4 75.3 43.8 96.7 28 27.9 75.6 42.1 141.4 42.1h0.2l0.4 0.1h0.6c54.8-0.2 122.7-10.4 196.4-29.4 131.1-33.9 266.2-92.8 307.5-134.1 15.9-15.9 29.4-32.9 40.1-50.5 3.1-5.1 1.5-11.8-3.7-15zM913.9 381.1c-9.8-32.5-25.1-60.5-45.4-83-19.4-21.6-43.8-38.9-72.7-51.5 46-35.5 69.1-87.3 69.4-87.9 6.4-14.3-0.1-31.3-14.4-37.7-6.8-3.1-14.6-3.3-21.9-0.6-7 2.7-12.7 8.1-15.8 15v0.1c-0.9 1.8-8.7 18.4-23.1 36.7-10.7 13.7-28.3 32.3-51 42.7-2.7 1.2-4.7 3.5-5.7 6.2-1 2.8-0.9 5.8 0.4 8.4 1.2 2.7 3.5 4.7 6.2 5.7 2.8 1 5.8 0.9 8.4-0.4 26.7-12.3 46.9-33.5 59.1-49.2 15.6-19.9 24.1-37.6 25.8-41.1l0.1-0.1c0.8-1.7 2-2.8 3.6-3.5 1.2-0.5 3-0.8 5 0.1 3.3 1.5 4.7 5.3 3.3 8.6l-0.1 0.2c-4.7 10.1-30.7 61.6-78.3 89.9-3.6 2.2-5.7 6.3-5.3 10.5 0.4 4.3 3.1 7.9 7.4 9.4 34.2 11.7 62.3 29.6 83.4 53.3 18.2 20.3 31.9 45.6 40.8 75.1 16.4 54.7 13.8 115.1 11.9 159.1-0.1 1.9-0.2 3.8-0.2 5.7-11.3-3.7-24.6-10.8-39-20.6-4.9-3.3-11.7-2-15.2 2.9l-0.1 0.1c-3.3 4.9-2 11.7 3 15.2 23.1 15.7 44 25 60.5 27.1h1.3c2.4 0 4.8-0.8 6.8-2.3l0.3-0.2c2.3-1.9 3.7-4.8 3.9-7.9v-0.2c0.1-5.3 0.3-11 0.6-17.1l0.1-2.4c1.8-45.7 4.4-108.2-13.1-166.3z\" fill=\"#934A19\" p-id=\"3481\"></path></svg>";
	var styles$19 = createLazyStyle(mocha_lazy_default);
	var MOCHA_ID = "212535360";
	async function activateMochaGift(context, mode) {
		const body = await context.waitFor("body");
		if (!(body instanceof HTMLElement) || context.signal.aborted) return;
		if (mode === "opus") {
			const author = await context.waitFor(".opus-module-author, .main-content .user-name a[href]");
			if (!(author instanceof HTMLElement) || context.signal.aborted) return;
			const uploader = author instanceof HTMLAnchorElement ? author : author.querySelector("a[href]");
			if (!uploader) {
				const marker = `"uid":"${MOCHA_ID}"`;
				const state = window.__INITIAL_STATE__;
				if (!((state ? JSON.stringify(state) : "").includes(marker) || Array.from(document.scripts).some((script) => script.textContent?.includes(marker)))) return;
			}
			if (uploader) {
				let uploaderPath;
				try {
					uploaderPath = new URL(uploader.href, location.href).pathname;
				} catch {
					return;
				}
				const segments = uploaderPath.split("/").filter(Boolean);
				if (segments[segments.length - 1] !== MOCHA_ID) return;
			}
		}
		if (context.signal.aborted || body.querySelector(".mocha-strawberry")) return;
		const template = document.createElement("template");
		template.innerHTML = strawberry;
		const gift = template.content.firstElementChild;
		if (!gift) return;
		styles$19.use();
		body.append(gift);
		context.onBeforeDispose(() => {
			gift.remove();
			styles$19.unuse();
		});
	}
	var styles$18 = createLazyStyle(style_lazy_default$18);
	function getOriginalImageUrl(source) {
		const pathEnd = source.search(/[?#]/);
		const end = pathEnd === -1 ? source.length : pathEnd;
		const at = source.lastIndexOf("@", end);
		if (at === -1) return source;
		const format = source.slice(at + 1, end).match(/\.([a-z0-9]+)$/i)?.[1];
		return format ? `${source.slice(0, at)}@.${format}${source.slice(end)}` : `${source.slice(0, at)}${source.slice(end)}`;
	}
	var bilibiliSite = {
		id: "bilibili",
		host: "www.bilibili.com",
		name: "哔哩哔哩",
		pages: [articlePage$5, {
			id: "opus",
			name: "动态详情",
			pathPattern: "/opus/:id",
			widthPolicy: {
				viewportRatio: .75,
				maxWidth: 1039
			},
			styles: [styles$18],
			activate(context) {
				activateMochaGift(context, "opus");
				dispatchEvent(new Event("resize"));
				context.waitFor(".opus-detail").then((element) => {
					if (!(element instanceof HTMLElement) || context.signal.aborted) return;
					const applyOriginalImages = () => {
						element.querySelectorAll(".opus-para-pic img").forEach((image) => {
							image.closest("picture")?.querySelectorAll("source").forEach((source) => source.remove());
							image.removeAttribute("srcset");
							const source = image.getAttribute("src");
							if (!source) return;
							const original = getOriginalImageUrl(source);
							if (original !== source) image.setAttribute("src", original);
						});
					};
					applyOriginalImages();
					const observer = new MutationObserver(applyOriginalImages);
					observer.observe(element, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["src", "srcset"]
					});
					context.onBeforeDispose(() => observer.disconnect());
					context.onAfterDispose(() => {
						dispatchEvent(new Event("resize"));
					});
				});
			}
		}]
	};
	var bilibiliDynamicSite = {
		id: "bilibili",
		host: "t.bilibili.com",
		name: "哔哩哔哩动态",
		pages: [{
			id: "home",
			name: "动态",
			pathPattern: "/",
			widthPolicy: {
				viewportRatio: .85,
				maxWidth: 1700
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1380px) {\n  :root #app .bili-dyn-home--member {\n    width: var(--ws-content-width) !important;\n    /* 内容 */\n  }\n  :root #app .bili-dyn-home--member > main {\n    flex: 1;\n    /* up 列表 */\n  }\n  :root #app .bili-dyn-home--member > main .bili-dyn-up-list {\n    width: auto;\n  }\n  :root #app .bili-dyn-home--member .bili-dyn-content, :root #app .bili-dyn-home--member .bili-dyn-content__orig__major {\n    width: auto !important;\n  }\n}")]
		}]
	};
	var bilibiliSpaceSite = {
		id: "bilibili",
		host: "space.bilibili.com",
		name: "哔哩哔哩空间",
		pages: [{
			id: "mocha-space",
			name: "空间",
			pathPattern: "/212535360",
			widthPolicy: {
				viewportRatio: 1,
				maxWidth: "100vw"
			},
			activate(context) {
				activateMochaGift(context, "space");
			}
		}]
	};
	var miyousheSite = {
		id: "miyoushe",
		host: "www.miyoushe.com",
		name: "米游社",
		pages: [{
			id: "article",
			name: "文章",
			pathPattern: /^\/ys\/article\//,
			widthPolicy: {
				viewportRatio: .82,
				maxWidth: 1450
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1320px) {\n  :root:root[data-ws-mode=uncapped] .mhy-rocket, :root:root[data-ws-mode=uncapped] .mhy-qrcode-bottom-card {\n    left: auto;\n    margin-left: 0;\n    right: 24px;\n  }\n  :root:root[data-ws-mode=uncapped] .mhy-qrcode-bottom-card {\n    width: auto;\n  }\n  :root .root-page-container {\n    /* 米游社根据 类名 作为页面间区分 */\n    /* 文章页 */\n  }\n  :root .root-page-container > .mhy-main-page {\n    display: flex;\n    width: var(--ws-content-width);\n    /* 主体 */\n  }\n  :root .root-page-container > .mhy-main-page .mhy-layout__main {\n    flex: 1;\n    padding-right: 20px;\n    max-width: none;\n  }\n  :root .root-page-container > .mhy-main-page .mhy-layout__main .mhy-video-article-container__content #videoPlayer {\n    width: auto;\n    height: auto;\n  }\n  :root .root-page-container > .mhy-main-page .mhy-layout__main .mhy-video-article-container__info {\n    max-width: none;\n  }\n  :root .root-page-container {\n    /* 需要兼容 文章 与 视频 页面 */\n  }\n  :root .root-page-container > .mhy-video-page .mhy-layout__main {\n    padding-right: 0;\n  }\n  :root .root-page-container {\n    /* 左侧悬浮操作 */\n  }\n  :root .root-page-container .mhy-article-actions {\n    margin-left: calc(var(--ws-content-width) / 2 * -1);\n    transform: translate(calc(-100% - 10px));\n  }\n}")],
			activate(context) {
				context.waitFor(".mhy-article-page__content").then((element) => {
					if (!(element instanceof HTMLElement) || context.signal.aborted) return;
					const replaceImages = () => {
						element.querySelectorAll(".ql-image-box img:not([replaced=\"true\"])").forEach((image) => {
							const original = image.getAttribute("large");
							if (!original) return;
							image.src = original;
							image.setAttribute("replaced", "true");
						});
					};
					replaceImages();
					const observer = new MutationObserver(replaceImages);
					observer.observe(element, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["large"]
					});
					context.onBeforeDispose(() => observer.disconnect());
				});
			}
		}]
	};
	var cratesSite = {
		id: "crates",
		host: "crates.io",
		name: "Crates.io",
		pages: [{
			id: "crate",
			name: "包页面",
			pathPattern: ["/crates/:name", "/crates/:name/*"],
			widthPolicy: {
				viewportRatio: .82,
				maxWidth: 1400
			},
			styles: [createLazyStyle("/* crates.io package */\n@media screen and (min-width: 1300px) {\n  :root main .inner-main {\n    width: var(--ws-content-width);\n  }\n}")]
		}]
	};
	var jianshuSite = {
		id: "jianshu",
		host: "www.jianshu.com",
		name: "简书",
		pages: [{
			id: "article",
			name: "文章",
			pathPattern: ["/p/:id", "/p/:id/*"],
			widthPolicy: {
				viewportRatio: .85,
				maxWidth: 1400
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n/* 简书文章 */\n@media screen and (min-width: 1250px) {\n  :root #__next {\n    /* 左侧悬浮按钮 */\n  }\n  :root #__next > div:last-child {\n    left: calc(50% - var(--ws-content-width) / 2 - 80px);\n  }\n  :root #__next [role=main] {\n    width: var(--ws-content-width);\n    /* 内容 */\n  }\n  :root #__next [role=main] > div:first-child {\n    flex: 1;\n  }\n}")]
		}]
	};
	var juejinSite = {
		id: "juejin",
		host: "juejin.cn",
		name: "掘金",
		pages: [{
			id: "post",
			name: "文章",
			pathPattern: ["/post/:id", "/post/:id/*"],
			widthPolicy: {
				viewportRatio: .82,
				maxWidth: 1400
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n/* 掘金文章 */\n@media screen and (min-width: 1400px) {\n  :root #juejin .main-container {\n    max-width: var(--ws-content-width) !important;\n  }\n  :root #juejin .main-container .main-area {\n    width: calc(100% - 25rem - 20px);\n  }\n}")]
		}]
	};
	var weixinSite = {
		id: "weixin",
		host: "mp.weixin.qq.com",
		name: "微信",
		pages: [{
			id: "article",
			name: "文章",
			pathPattern: /^\/s(?:\/|$)/,
			widthPolicy: {
				viewportRatio: .9,
				maxWidth: 1150
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 750px) {\n  /* 文章宽屏 */\n  :root .rich_media_area_primary_inner {\n    margin-left: auto;\n    margin-right: auto;\n    max-width: var(--ws-content-width) !important;\n  }\n  /* 二维码位置 */\n  :root #js_pc_qr_code .qr_code_pc {\n    opacity: 0.2;\n    position: fixed;\n    right: 3vw;\n    top: 25vh;\n  }\n  :root #js_pc_qr_code .qr_code_pc:hover {\n    opacity: 1;\n  }\n}")],
			activate(context) {
				context.waitFor("body").then((element) => {
					if (!(element instanceof HTMLElement) || context.signal.aborted) return;
					const restoreOriginalImage = () => {
						element.querySelectorAll("img[data-src]").forEach((image) => {
							const dataSrc = image.dataset.src;
							if (!dataSrc) return;
							try {
								const url = new URL(dataSrc);
								url.pathname = url.pathname.replace("/640", "/");
								if (url.href !== dataSrc) image.dataset.src = url.href;
							} catch {}
						});
					};
					restoreOriginalImage();
					const observer = new MutationObserver(restoreOriginalImage);
					observer.observe(element, {
						childList: true,
						subtree: true,
						attributes: true,
						attributeFilter: ["data-src"]
					});
					context.onBeforeDispose(() => observer.disconnect());
				});
			}
		}]
	};
	var segmentfaultSite = {
		id: "segmentfault",
		host: "segmentfault.com",
		name: "SegmentFault",
		pages: [{
			id: "q",
			name: "内容",
			pathPattern: [
				"/q/:id",
				"/q/:id/*",
				"/a/:id",
				"/a/:id/*"
			],
			widthPolicy: {
				viewportRatio: .82,
				maxWidth: 1350
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n/* 专栏/问答 */\n@media screen and (min-width: 1390px) {\n  /* url `/q` */\n  :root #question-wrap {\n    max-width: var(--ws-content-width);\n  }\n  /* url `/a` */\n  :root .article-wrap {\n    max-width: calc(var(--ws-content-width) + 300px);\n  }\n}")]
		}]
	};
	var styles$10 = createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1600px) {\n  :root body {\n    /* 搜索结果 */\n  }\n  :root body #rcnt {\n    grid-template-columns: 210px repeat(21, calc(79% / 21)) minmax(0, 1fr);\n    width: var(--ws-content-width);\n  }\n  :root body {\n    /* 列表 */\n  }\n  :root body #w7tRq {\n    column-gap: 1%;\n    grid-template-columns: 0 repeat(21, calc(79% / 21));\n  }\n}");
	var searchPage = {
		id: "search",
		name: "搜索",
		pathPattern: "/search",
		widthPolicy: {
			viewportRatio: .73,
			maxWidth: 1530
		},
		activate(context) {
			if (new URLSearchParams(context.route.search).has("tbm")) return;
			styles$10.use();
			return () => styles$10.unuse();
		}
	};
	var GOOGLE_HOST_PATTERN = /^www\.google\.(?:[a-z]{2,3}\.)?[a-z]{2,3}$/i;
	var currentHost = location.hostname;
	var googleSites = GOOGLE_HOST_PATTERN.test(currentHost) ? [{
		id: "google",
		host: currentHost,
		name: "谷歌",
		pages: [searchPage]
	}] : [];
	var toutiaoSite = {
		id: "toutiao",
		host: "www.toutiao.com",
		name: "头条",
		pages: [{
			id: "article",
			name: "文章",
			pathPattern: /^\/(?:article|w)\/\d+\/?$/,
			widthPolicy: {
				viewportRatio: .88,
				maxWidth: 1470
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1350px) {\n  :root .article-detail-container, :root .wtt-detail-container {\n    width: var(--ws-content-width) !important;\n  }\n  :root .article-detail-container > .main, :root .wtt-detail-container > .main {\n    /* 内容 */\n    width: calc(var(--ws-content-width) - 298px - 60px - 96px) !important;\n    /* 评论 */\n  }\n  :root .article-detail-container > .main .ttp-comment-block, :root .wtt-detail-container > .main .ttp-comment-block {\n    width: auto;\n  }\n  :root .article-detail-container, :root .wtt-detail-container {\n    /* 底部信息流 */\n  }\n  :root .article-detail-container .detail-end-feed, :root .wtt-detail-container .detail-end-feed {\n    margin-left: auto;\n    margin-right: auto;\n    max-width: 676px;\n  }\n}")]
		}]
	};
	var fPage = {
		id: "f",
		name: "吧页",
		pathPattern: "/f",
		widthPolicy: {
			viewportRatio: 1,
			maxWidth: 1920
		},
		styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1570px) {\n  :root .pc-main-page-layout .content-container {\n    max-width: var(--ws-content-width);\n  }\n  :root .pc-main-page-layout .frs-page-container {\n    max-width: none;\n  }\n  :root .pc-main-page-layout {\n    /* 避免帖子图片太宽 */\n  }\n  :root .pc-main-page-layout .thread-card .thread-card-wrapper .thread-image {\n    max-width: 800px;\n  }\n}")]
	};
	var tiebaSite = {
		id: "tieba",
		host: "tieba.baidu.com",
		name: "百度贴吧",
		pages: [{
			id: "p",
			name: "帖子",
			pathPattern: /^\/p\//,
			widthPolicy: {
				viewportRatio: 1,
				maxWidth: 1920
			},
			styles: [createLazyStyle("@media screen and (min-width: 1570px) {\n  :root .pc-main-page-layout .content-container {\n    max-width: var(--ws-content-width);\n  }\n  :root .pc-main-page-layout .pc-pb-box .container {\n    max-width: none;\n  }\n  :root .pc-main-page-layout .pc-pb-box .center-content {\n    max-width: none;\n  }\n}")]
		}, fPage]
	};
	var style_lazy_default$6 = "@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root #wrapper {\n    width: var(--ws-content-width) !important;\n  }\n  /* 内容 */\n  :root #content .grid-16-8 .article {\n    width: calc(100% - 360px) !important;\n  }\n}";
	var doubanSite = {
		id: "douban",
		host: "www.douban.com",
		name: "豆瓣",
		pages: [
			{
				id: "gallery",
				name: "相册",
				pathPattern: "/gallery",
				widthPolicy: {
					viewportRatio: .82,
					maxWidth: 1318
				},
				styles: [createLazyStyle(style_lazy_default$6)]
			},
			{
				id: "gallery-topic",
				name: "相册话题",
				pathPattern: "/gallery/topic/*",
				widthPolicy: {
					viewportRatio: .82,
					maxWidth: 1318
				},
				styles: [createLazyStyle(style_lazy_default$6)]
			},
			{
				id: "note",
				name: "日记",
				pathPattern: "/note/*",
				widthPolicy: {
					viewportRatio: .82,
					maxWidth: 1318
				},
				styles: [createLazyStyle(style_lazy_default$6)]
			}
		]
	};
	var style_lazy_default$5 = "@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root #wrapper {\n    width: var(--ws-content-width) !important;\n  }\n  /* 内容 */\n  :root #content .article {\n    width: calc(100% - 360px);\n    /* 电影信息 */\n  }\n  :root #content .article .subject {\n    width: calc(100% - 175px);\n  }\n  :root #content .article .subject #info {\n    max-width: none;\n    width: calc(100% - 160px);\n  }\n  :root #content .article {\n    /* 剧照 */\n  }\n  :root #content .article #related-pic > ul {\n    width: 675px;\n  }\n}";
	var reviewPage = {
		id: "review",
		name: "剧评",
		pathPattern: "/review/*",
		widthPolicy: {
			viewportRatio: .82,
			maxWidth: 1318
		},
		styles: [createLazyStyle(style_lazy_default$5)]
	};
	var movieDoubanSite = {
		id: "douban",
		host: "movie.douban.com",
		name: "豆瓣电影",
		pages: [{
			id: "subject",
			name: "详情",
			pathPattern: "/subject/*",
			widthPolicy: {
				viewportRatio: .82,
				maxWidth: 1318
			},
			styles: [createLazyStyle(style_lazy_default$5)]
		}, reviewPage]
	};
	var style_lazy_default$4 = "@charset \"UTF-8\";\n@media screen and (min-width: 1450px) {\n  :root body [class*=Frame_content2] {\n    max-width: none;\n    width: var(--ws-content-width);\n  }\n  :root body {\n    /* 左列 */\n  }\n  :root body [class*=Frame_main2] {\n    flex-grow: 1;\n    padding-right: 20px;\n  }\n}";
	var style_lazy_default$3 = "@charset \"UTF-8\";\n@media screen and (min-width: 1150px) {\n  :root #articleRoot .WB_frame {\n    width: var(--ws-content-width);\n  }\n  :root #articleRoot #plc_main {\n    max-width: 100%;\n    width: auto;\n  }\n  :root #articleRoot {\n    /* 内容 */\n  }\n  :root #articleRoot .WB_frame_a, :root #articleRoot .WB_artical {\n    max-width: 100%;\n    width: auto;\n  }\n  :root #articleRoot {\n    /* 顶部图片 */\n  }\n  :root #articleRoot .main_toppic {\n    margin-left: auto;\n    margin-right: auto;\n  }\n  :root #articleRoot {\n    /* 文章 */\n  }\n  :root #articleRoot .WB_editor_iframe_new {\n    width: auto;\n  }\n  /* 右下角浮动按钮 */\n  :root .B_artical [node-type=sidebar] > .W_gotop {\n    left: calc(50% + var(--ws-content-width) / 2);\n    margin-left: 0;\n  }\n}";
	var style_lazy_default$2 = "@charset \"UTF-8\";\n@media screen and (min-width: 1450px) {\n  :root:root {\n    --mid-width: var(--ws-content-width);\n  }\n  /* 主体结构 */\n  :root [class*=_top_] + div {\n    --main-width: none;\n  }\n  /* 列表3张图 */\n  :root .u-col-3.woo-box-wrap {\n    max-width: 550px;\n  }\n  /* 列表4张图 */\n  :root .u-col-4.woo-box-wrap {\n    max-width: 550px;\n  }\n  /* 列表 */\n  :root .wbpro-scroller-item {\n    /* 列表中视频 */\n  }\n  :root .wbpro-scroller-item [class*=_videoBox_] {\n    max-width: 700px;\n  }\n  :root .wbpro-scroller-item {\n    /* 列表中文章，选择器实际选择了列表所有图片 */\n  }\n  :root .wbpro-scroller-item .woo-picture-main[class*=pic] {\n    max-width: 700px;\n  }\n  /* 返回顶部按钮 */\n  :root [class*=_backTop_] {\n    left: calc(50% + var(--ws-content-width) / 2 + var(--right-width) + 5px);\n    margin-left: 0;\n  }\n}";
	var tvStyles = createLazyStyle(style_lazy_default$4);
	var articleStyles = createLazyStyle(style_lazy_default$3);
	var homeStyles = createLazyStyle(style_lazy_default$2);
	var tvPage = {
		id: "tv",
		name: "视频详情",
		pathPattern: /^\/tv\/show\//,
		priority: 20,
		widthPolicy: {
			viewportRatio: .91,
			maxWidth: "91vw"
		},
		styles: [tvStyles]
	};
	var articlePage = {
		id: "article",
		name: "文章",
		pathPattern: "/ttarticle/p/show",
		priority: 10,
		widthPolicy: {
			viewportRatio: .9,
			maxWidth: 1380
		},
		styles: [articleStyles]
	};
	var homePage$1 = {
		id: "home",
		name: "首页",
		pathPattern: "/*",
		widthPolicy: {
			viewportRatio: .52,
			maxWidth: 1100
		},
		styles: [homeStyles]
	};
	var weiboSite = {
		id: "weibo",
		host: "weibo.com",
		name: "微博",
		pages: [
			tvPage,
			articlePage,
			homePage$1
		]
	};
	var wwwWeiboSite = {
		id: "weibo",
		host: "www.weibo.com",
		name: "微博",
		pages: [
			tvPage,
			articlePage,
			homePage$1
		]
	};
	var weiboDynamicSite = {
		id: "weibo",
		host: "d.weibo.com",
		name: "微博动态",
		pages: [{
			id: "dynamic",
			name: "动态",
			pathPattern: "/*",
			widthPolicy: {
				viewportRatio: .775,
				maxWidth: 1330
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root .WB_frame {\n    display: flex;\n    width: var(--ws-content-width) !important;\n  }\n  /* 内容 */\n  :root .WB_frame #plc_main {\n    display: flex !important;\n    flex: 1;\n  }\n  :root .WB_frame_c {\n    flex: 1;\n  }\n  /* 微博类型 (更多-旅游 中出现) */\n  :root .tab_box {\n    display: flex;\n  }\n  :root .tab_box::after {\n    content: none;\n  }\n  :root .tab_box .fr_box {\n    flex: 1;\n  }\n}")]
		}]
	};
	var weiboSearchSite = {
		id: "weibo",
		host: "s.weibo.com",
		name: "微博搜索",
		pages: [{
			id: "home",
			name: "搜索",
			pathPattern: "/*",
			widthPolicy: {
				viewportRatio: .775,
				maxWidth: 1580
			},
			styles: [createLazyStyle("@charset \"UTF-8\";\n@media screen and (min-width: 1300px) {\n  :root .m-main {\n    width: var(--ws-content-width);\n  }\n  /* 左侧导航 */\n  :root .m-main-nav {\n    flex-shrink: 0;\n  }\n  /* 内容 */\n  :root #pl_feed_main {\n    flex: 1;\n  }\n  :root #pl_feed_main .main-full {\n    width: auto;\n  }\n}")]
		}]
	};
	var sites_default = [
		zhihuSite,
		zhuanlanSite,
		bilibiliSite,
		bilibiliDynamicSite,
		bilibiliSpaceSite,
		miyousheSite,
		cratesSite,
		jianshuSite,
		juejinSite,
		weixinSite,
		segmentfaultSite,
		...googleSites,
		toutiaoSite,
		tiebaSite,
		doubanSite,
		movieDoubanSite,
		weiboSite,
		wwwWeiboSite,
		weiboDynamicSite,
		weiboSearchSite
	];
	var panelIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="5" y="5" width="14" height="14" rx="2.5"></rect>
    <path d="M9 2.75v4M15 2.75v4M9 17.25v4M15 17.25v4M2.75 9h4M17.25 9h4M2.75 15h4M17.25 15h4"></path>
  </svg>
`;
	var wideIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3.5" y="6.5" width="17" height="11" rx="2"></rect>
    <path d="M7 11.75h10M7 14.25h6"></path>
  </svg>
`;
	var uncappedIcon = `
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M8.5 4H4v4.5M15.5 4H20v4.5M8.5 20H4v-4.5M15.5 20H20v-4.5"></path>
    <path d="M8 8h8v8H8z"></path>
  </svg>
`;
	var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
	var defaultOptions = {
		borderRadius: 20,
		borderWidth: .07,
		brightness: 50,
		opacity: .93,
		blur: 11,
		displace: 0,
		backgroundOpacity: 0,
		saturation: 1,
		distortionScale: -180,
		redOffset: 0,
		greenOffset: 10,
		blueOffset: 20,
		xChannel: "R",
		yChannel: "G",
		mixBlendMode: "difference"
	};
	var surfaceId = 0;
	function mountGlassSurface(element, options = {}) {
		const settings = {
			...defaultOptions,
			...options
		};
		const filterId = `widescreen-glass-filter-${surfaceId++}`;
		const filter = createFilter(filterId);
		const supported = supportsSvgBackdropFilter(filterId);
		element.classList.add("glass-surface");
		element.classList.toggle("glass-surface--svg", supported);
		element.classList.toggle("glass-surface--fallback", !supported);
		element.style.setProperty("--glass-frost", String(settings.backgroundOpacity));
		element.style.setProperty("--glass-saturation", String(settings.saturation));
		if (!supported) return () => removeGlassSurface(element);
		element.prepend(filter.svg);
		const updateFilter = () => updateFilterMap(filter, element, settings);
		const resizeObserver = new ResizeObserver(updateFilter);
		resizeObserver.observe(element);
		updateFilter();
		return () => {
			resizeObserver.disconnect();
			filter.svg.remove();
			removeGlassSurface(element);
		};
	}
	function removeGlassSurface(element) {
		element.classList.remove("glass-surface", "glass-surface--svg", "glass-surface--fallback");
		element.style.removeProperty("--glass-frost");
		element.style.removeProperty("--glass-saturation");
		element.style.removeProperty("--filter-id");
	}
	function createFilter(filterId) {
		const svg = document.createElementNS(SVG_NAMESPACE, "svg");
		svg.classList.add("glass-filter");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("focusable", "false");
		const defs = document.createElementNS(SVG_NAMESPACE, "defs");
		const filter = document.createElementNS(SVG_NAMESPACE, "filter");
		filter.id = filterId;
		filter.setAttribute("color-interpolation-filters", "sRGB");
		filter.setAttribute("x", "0%");
		filter.setAttribute("y", "0%");
		filter.setAttribute("width", "100%");
		filter.setAttribute("height", "100%");
		const image = document.createElementNS(SVG_NAMESPACE, "feImage");
		image.setAttribute("x", "0");
		image.setAttribute("y", "0");
		image.setAttribute("width", "100%");
		image.setAttribute("height", "100%");
		image.setAttribute("preserveAspectRatio", "none");
		image.setAttribute("result", "map");
		const channels = [
			"red",
			"green",
			"blue"
		].map((channel) => {
			const displacement = document.createElementNS(SVG_NAMESPACE, "feDisplacementMap");
			displacement.id = `${filterId}-${channel}`;
			displacement.setAttribute("in", "SourceGraphic");
			displacement.setAttribute("in2", "map");
			displacement.setAttribute("result", `disp-${channel}`);
			const matrix = document.createElementNS(SVG_NAMESPACE, "feColorMatrix");
			matrix.setAttribute("type", "matrix");
			matrix.setAttribute("values", channel === "red" ? "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" : channel === "green" ? "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" : "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0");
			matrix.setAttribute("in", `disp-${channel}`);
			matrix.setAttribute("result", channel);
			filter.append(displacement, matrix);
			return displacement;
		});
		const redGreen = document.createElementNS(SVG_NAMESPACE, "feBlend");
		redGreen.setAttribute("in", "red");
		redGreen.setAttribute("in2", "green");
		redGreen.setAttribute("mode", "screen");
		redGreen.setAttribute("result", "rg");
		const output = document.createElementNS(SVG_NAMESPACE, "feBlend");
		output.setAttribute("in", "rg");
		output.setAttribute("in2", "blue");
		output.setAttribute("mode", "screen");
		output.setAttribute("result", "output");
		const blur = document.createElementNS(SVG_NAMESPACE, "feGaussianBlur");
		blur.setAttribute("in", "output");
		blur.setAttribute("stdDeviation", "0");
		filter.prepend(image);
		filter.append(redGreen, output, blur);
		defs.append(filter);
		svg.append(defs);
		return {
			svg,
			image,
			channels,
			blur
		};
	}
	function updateFilterMap(filter, element, settings) {
		const rect = element.getBoundingClientRect();
		const width = Math.max(1, rect.width);
		const height = Math.max(1, rect.height);
		const edgeSize = Math.min(width, height) * (settings.borderWidth * .5);
		const map = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="${SVG_NAMESPACE}">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000" />
          <stop offset="100%" stop-color="red" />
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="black" />
      <rect width="${width}" height="${height}" rx="${settings.borderRadius}" fill="url(#red)" />
      <rect width="${width}" height="${height}" rx="${settings.borderRadius}" fill="url(#blue)" style="mix-blend-mode:${settings.mixBlendMode}" />
      <rect x="${edgeSize}" y="${edgeSize}" width="${Math.max(1, width - edgeSize * 2)}" height="${Math.max(1, height - edgeSize * 2)}" rx="${settings.borderRadius}" fill="hsl(0 0% ${settings.brightness}% / ${settings.opacity})" style="filter:blur(${settings.blur}px)" />
    </svg>
  `;
		filter.image.setAttribute("href", `data:image/svg+xml,${encodeURIComponent(map)}`);
		filter.channels.forEach((channel, index) => {
			const offset = [
				settings.redOffset,
				settings.greenOffset,
				settings.blueOffset
			][index];
			channel.setAttribute("scale", String(settings.distortionScale + offset));
			channel.setAttribute("xChannelSelector", settings.xChannel);
			channel.setAttribute("yChannelSelector", settings.yChannel);
		});
		filter.blur.setAttribute("stdDeviation", String(settings.displace));
		element.style.setProperty("--filter-id", `url(#${filter.svg.querySelector("filter")?.id})`);
	}
	function supportsSvgBackdropFilter(filterId) {
		const userAgent = navigator.userAgent;
		const isWebkit = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
		const isFirefox = /Firefox/.test(userAgent);
		if (isWebkit || isFirefox) return false;
		const probe = document.createElement("div");
		probe.style.backdropFilter = `url(#${filterId})`;
		return probe.style.backdropFilter !== "";
	}
	var POSITION_MARGIN = 8;
	var DRAG_THRESHOLD = 4;
	function getViewportSize() {
		const root = document.documentElement;
		return {
			width: root.clientWidth || window.innerWidth,
			height: root.clientHeight || window.innerHeight
		};
	}
	function getPanelLimits(panel) {
		const rect = panel.getBoundingClientRect();
		const viewport = getViewportSize();
		return {
			horizontal: Math.max(POSITION_MARGIN, viewport.width - rect.width - POSITION_MARGIN),
			vertical: Math.max(POSITION_MARGIN, viewport.height - rect.height - POSITION_MARGIN)
		};
	}
	function clampCoordinate(value, maximum) {
		return Math.min(Math.max(value, POSITION_MARGIN), maximum);
	}
	function applyPanelPosition(panel, position) {
		panel.style.left = "auto";
		panel.style.right = `${position.right}px`;
		panel.style.top = `${position.top}px`;
		panel.style.bottom = "auto";
	}
	function clearPanelPosition(panel) {
		panel.style.removeProperty("left");
		panel.style.removeProperty("right");
		panel.style.removeProperty("top");
		panel.style.removeProperty("bottom");
	}
	function clampPanelPosition(panel, position) {
		const limits = getPanelLimits(panel);
		return {
			right: clampCoordinate(position.right, limits.horizontal),
			top: clampCoordinate(position.top, limits.vertical)
		};
	}
	function createPanelDrag(options) {
		let activePointerId = null;
		let startX = 0;
		let startY = 0;
		let startLeft = 0;
		let startTop = 0;
		let originPosition = null;
		let hasMoved = false;
		let reclampFrame = null;
		const positionFromRect = (rect) => ({
			right: getViewportSize().width - rect.right,
			top: rect.top
		});
		const applyDragPosition = (left, top) => {
			options.panel.style.left = `${left}px`;
			options.panel.style.right = "auto";
			options.panel.style.top = `${top}px`;
			options.panel.style.bottom = "auto";
		};
		const clampDragPosition = (left, top) => {
			const limits = getPanelLimits(options.panel);
			return {
				left: clampCoordinate(left, limits.horizontal),
				top: clampCoordinate(top, limits.vertical)
			};
		};
		const reclamp = () => {
			const position = options.getPosition();
			if (!position) return;
			const clamped = clampPanelPosition(options.panel, position);
			applyPanelPosition(options.panel, clamped);
		};
		const releasePointerCapture = () => {
			if (activePointerId !== null && options.handle.hasPointerCapture(activePointerId)) options.handle.releasePointerCapture(activePointerId);
		};
		const restoreOrigin = () => {
			if (!hasMoved) return;
			options.panel.classList.remove("is-dragging");
			if (originPosition) applyPanelPosition(options.panel, originPosition);
			else clearPanelPosition(options.panel);
			options.onDragStateChange?.(false);
		};
		const resetDragState = () => {
			activePointerId = null;
			originPosition = null;
			hasMoved = false;
		};
		const finish = (event) => {
			if (activePointerId !== event.pointerId) return;
			if (hasMoved) {
				const rect = options.panel.getBoundingClientRect();
				const position = clampPanelPosition(options.panel, positionFromRect(rect));
				applyPanelPosition(options.panel, position);
				options.setPosition(position);
				options.panel.classList.remove("is-dragging");
				options.onDragStateChange?.(false);
			}
			releasePointerCapture();
			resetDragState();
		};
		const cancel = (event) => {
			if (activePointerId !== event.pointerId) return;
			releasePointerCapture();
			restoreOrigin();
			resetDragState();
		};
		const onPointerDown = (event) => {
			if (event.button !== 0 || activePointerId !== null) return;
			event.preventDefault();
			activePointerId = event.pointerId;
			originPosition = options.getPosition();
			hasMoved = false;
			startX = event.clientX;
			startY = event.clientY;
			const rect = options.panel.getBoundingClientRect();
			startLeft = rect.left;
			startTop = rect.top;
			options.handle.setPointerCapture(event.pointerId);
		};
		const onPointerMove = (event) => {
			if (activePointerId !== event.pointerId) return;
			const deltaX = event.clientX - startX;
			const deltaY = event.clientY - startY;
			if (!hasMoved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;
			if (!hasMoved) {
				options.panel.classList.add("is-dragging");
				options.onDragStateChange?.(true);
				const rect = options.panel.getBoundingClientRect();
				const lockedPosition = clampDragPosition(rect.left, rect.top);
				applyDragPosition(lockedPosition.left, lockedPosition.top);
				startX = event.clientX;
				startY = event.clientY;
				startLeft = lockedPosition.left;
				startTop = lockedPosition.top;
				hasMoved = true;
				return;
			}
			const position = clampDragPosition(startLeft + deltaX, startTop + deltaY);
			applyDragPosition(position.left, position.top);
		};
		const onPointerUp = (event) => finish(event);
		const onPointerCancel = (event) => cancel(event);
		const onPanelPointerEnter = () => {
			if (activePointerId !== null || reclampFrame !== null) return;
			reclampFrame = requestAnimationFrame(() => {
				reclampFrame = null;
				reclamp();
			});
		};
		const onResize = () => {
			if (activePointerId !== null) return;
			reclamp();
		};
		options.handle.addEventListener("pointerdown", onPointerDown);
		options.handle.addEventListener("pointermove", onPointerMove);
		options.handle.addEventListener("pointerup", onPointerUp);
		options.handle.addEventListener("pointercancel", onPointerCancel);
		options.panel.addEventListener("pointerenter", onPanelPointerEnter);
		window.addEventListener("resize", onResize);
		reclamp();
		return () => {
			options.handle.removeEventListener("pointerdown", onPointerDown);
			options.handle.removeEventListener("pointermove", onPointerMove);
			options.handle.removeEventListener("pointerup", onPointerUp);
			options.handle.removeEventListener("pointercancel", onPointerCancel);
			options.panel.removeEventListener("pointerenter", onPanelPointerEnter);
			window.removeEventListener("resize", onResize);
			if (reclampFrame !== null) cancelAnimationFrame(reclampFrame);
			if (activePointerId !== null) {
				releasePointerCapture();
				restoreOrigin();
				resetDragState();
			}
		};
	}
	var control_panel_default = ":host {\n  all: initial;\n  color-scheme: light dark;\n}\n\n.panel {\n  --control-panel-size: 44px;\n  --control-panel-padding: 4px;\n  --control-panel-offset-inline-end: 16px;\n  --control-panel-offset-block-end: 100px;\n  --control-panel-z-index: 100;\n  --control-panel-radius: 16px;\n  --control-trigger-size: calc(var(--control-panel-size) - var(--control-panel-padding) - var(--control-panel-padding));\n  --control-trigger-radius: 12px;\n  --control-button-radius: 10px;\n  --control-color-text: oklch(27% 0.04 255);\n  --control-color-trigger: oklch(48% 0.13 255);\n  --control-color-accent: oklch(58% 0.14 255);\n  --control-color-selected: oklch(40% 0.14 255);\n  --control-color-white: rgb(100% 100% 100%);\n  --control-color-trigger-bg: color-mix(in srgb, var(--control-color-white) 24%, transparent);\n  --control-color-trigger-bg-hover: color-mix(in srgb, var(--control-color-white) 50%, transparent);\n  --control-color-button-bg: color-mix(in srgb, var(--control-color-white) 26%, transparent);\n  --control-color-button-bg-hover: color-mix(in srgb, var(--control-color-white) 50%, transparent);\n  --control-color-button-border: color-mix(in srgb, currentColor 12%, transparent);\n  --control-color-accent-border: color-mix(in srgb, var(--control-color-accent) 42%, transparent);\n  --control-color-selected-border: color-mix(in srgb, var(--control-color-accent) 60%, transparent);\n  --control-color-selected-bg: color-mix(in srgb, oklch(68% 0.15 245) 28%, transparent);\n  position: fixed;\n  inset-inline-end: var(--control-panel-offset-inline-end);\n  inset-block-end: var(--control-panel-offset-block-end);\n  z-index: var(--control-panel-z-index);\n  color: var(--control-color-text);\n  font: 13px/1.4 system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(10px) scale(0.96);\n  pointer-events: none;\n  transition: opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), transform 260ms cubic-bezier(0.22, 1, 0.36, 1), visibility 260ms allow-discrete;\n  transition-behavior: allow-discrete;\n}\n\n.panel.is-visible {\n  opacity: 1;\n  visibility: visible;\n  transform: none;\n  pointer-events: auto;\n}\n\n.card {\n  inline-size: var(--control-panel-size);\n  block-size: var(--control-panel-size);\n  min-block-size: var(--control-panel-size);\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  padding: 0;\n  overflow: hidden;\n  border-radius: var(--control-panel-radius);\n  interpolate-size: allow-keywords;\n}\n\n.panel:hover .card {\n  inline-size: max-content;\n  max-inline-size: calc(100vw - 32px);\n}\n\n.panel.is-dragging {\n  user-select: none;\n}\n\n.panel.is-dragging .card {\n  inline-size: max-content;\n  max-inline-size: calc(100vw - 32px);\n  transition: none;\n}\n\n.panel.is-dragging .content {\n  inline-size: max-content;\n  opacity: 1;\n  pointer-events: auto;\n  transform: none;\n}\n\nbutton {\n  appearance: none;\n  border: 0;\n  font: inherit;\n  color: inherit;\n}\n\n.trigger {\n  position: relative;\n  z-index: 1;\n  flex: 0 0 var(--control-trigger-size);\n  inline-size: var(--control-trigger-size);\n  block-size: var(--control-trigger-size);\n  display: grid;\n  place-items: center;\n  padding: 0;\n  border-radius: var(--control-trigger-radius);\n  cursor: grab;\n  touch-action: none;\n  background: var(--control-color-trigger-bg);\n  color: var(--control-color-trigger);\n  transition: background 180ms ease, color 180ms ease, transform 180ms ease;\n}\n\n.trigger:hover {\n  background: var(--control-color-trigger-bg-hover);\n  outline: none;\n}\n\n.panel.is-dragging .trigger {\n  cursor: grabbing;\n}\n\n.trigger svg,\n.control svg {\n  inline-size: 21px;\n  block-size: 21px;\n  fill: none;\n  stroke: currentColor;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-width: 1.7;\n}\n\n.content {\n  position: relative;\n  z-index: 1;\n  min-inline-size: 0;\n  flex: 0 1 auto;\n  inline-size: 0;\n  max-inline-size: 100%;\n  block-size: 100%;\n  display: flex;\n  align-items: center;\n  interpolate-size: allow-keywords;\n  overflow: hidden;\n  opacity: 0;\n  pointer-events: none;\n  transform: translateX(8px);\n  background: transparent;\n  transition: inline-size 180ms ease-out, opacity 140ms ease-out, transform 180ms ease-out;\n}\n\n.panel:hover .content {\n  inline-size: max-content;\n  opacity: 1;\n  pointer-events: auto;\n  transform: none;\n}\n\n.content-inner {\n  position: relative;\n  z-index: 1;\n  inline-size: max-content;\n  max-inline-size: 100%;\n  min-block-size: 0;\n  min-inline-size: 0;\n  padding-inline-start: 10px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  overflow: hidden;\n}\n\n.site-name {\n  flex: 0 0 auto;\n  margin: 0;\n  color: color-mix(in srgb, currentColor 88%, transparent);\n  white-space: nowrap;\n}\n\n.actions {\n  flex: 0 0 auto;\n  display: flex;\n  flex-wrap: nowrap;\n  gap: 6px;\n}\n\n.control {\n  min-inline-size: 72px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  padding: 7px 9px;\n  border: 1px solid var(--control-color-button-border);\n  border-radius: var(--control-button-radius);\n  background: var(--control-color-button-bg);\n  color: color-mix(in srgb, currentColor 76%, transparent);\n  cursor: pointer;\n  transition: background 160ms ease, color 160ms ease, border-color 160ms ease;\n}\n\n.control svg {\n  inline-size: 15px;\n  block-size: 15px;\n}\n\n.control:hover,\n.control:focus-visible {\n  border-color: var(--control-color-accent-border);\n  background: var(--control-color-button-bg-hover);\n  outline: none;\n}\n\n.control[aria-pressed=true] {\n  border-color: var(--control-color-selected-border);\n  background: var(--control-color-selected-bg);\n  color: var(--control-color-selected);\n}\n\n.control:disabled {\n  cursor: not-allowed;\n  opacity: 0.42;\n}\n\n@starting-style {\n  .panel.is-visible {\n    opacity: 0;\n    transform: translateY(10px) scale(0.96);\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .panel {\n    --control-color-text: oklch(94% 0.03 250);\n    --control-color-trigger: oklch(82% 0.1 250);\n    --control-color-button-bg: color-mix(in srgb, var(--control-color-white) 8%, transparent);\n    --control-color-button-bg-hover: color-mix(in srgb, var(--control-color-white) 16%, transparent);\n    --control-color-selected-bg: color-mix(in srgb, oklch(68% 0.15 245) 34%, transparent);\n    --control-color-selected: oklch(90% 0.06 245);\n    color: var(--control-color-text);\n  }\n  .trigger {\n    background: var(--control-color-button-bg);\n    color: var(--control-color-trigger);\n  }\n  .trigger:hover,\n  .trigger:focus-visible,\n  .control:hover,\n  .control:focus-visible {\n    background: color-mix(in srgb, #ffffff 16%, transparent);\n  }\n  .control {\n    background: var(--control-color-button-bg);\n    color: oklch(88% 0.05 245deg);\n  }\n  .control[aria-pressed=true] {\n    background: var(--control-color-selected-bg);\n    color: var(--control-color-selected);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel,\n  .card,\n  .content,\n  .trigger,\n  .control {\n    transition: none;\n  }\n}";
	var glass_surface_default = ".glass-surface {\n  --glass-color-white: rgb(100% 100% 100%);\n  --glass-color-black: rgb(0% 0% 0%);\n  --glass-color-fallback-border: color-mix(in srgb, var(--glass-color-white) 30%, transparent);\n  --glass-color-fallback-bg: color-mix(in srgb, var(--glass-color-white) 25%, transparent);\n  --glass-color-shadow-1: light-dark(rgb(80% 85% 89% / 0.28), rgb(100% 100% 100% / 0.1));\n  --glass-color-shadow-2: light-dark(rgb(84% 88% 92% / 0.2), rgb(100% 100% 100% / 0.06));\n  --glass-color-inset-1: rgb(100% 100% 100% / 0.52);\n  --glass-color-inset-2: rgb(100% 100% 100% / 0.16);\n  --glass-color-shadow-fallback: rgb(12% 15% 53% / 0.2);\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  isolation: isolate;\n  transition: opacity 260ms ease-out, inline-size 180ms ease-out, border-radius 180ms ease-out;\n}\n\n.glass-content {\n  inline-size: 100%;\n  block-size: 100%;\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0;\n  padding: var(--control-panel-padding, 4px);\n  border-radius: inherit;\n  position: relative;\n  z-index: 1;\n  isolation: isolate;\n  overflow: hidden;\n}\n\n.glass-content::before {\n  position: absolute;\n  inset: 0;\n  z-index: 0;\n  border-radius: inherit;\n  background: color-mix(in srgb, var(--glass-color-white) 50%, transparent);\n  pointer-events: none;\n  content: \"\";\n}\n\n.glass-filter {\n  position: absolute;\n  inset: 0;\n  z-index: -1;\n  inline-size: 100%;\n  block-size: 100%;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.glass-surface--svg {\n  background: light-dark(hsl(0, 0%, 100%, var(--glass-frost, 0)), hsl(0, 0%, 0%, var(--glass-frost, 0)));\n  backdrop-filter: var(--filter-id, url(#glass-filter)) saturate(var(--glass-saturation, 1));\n  box-shadow: 0 2px 8px var(--glass-color-shadow-1), 0 8px 22px var(--glass-color-shadow-2), 0 0 2px 1px var(--glass-color-inset-1) inset, 0 0 8px 2px var(--glass-color-inset-2) inset;\n}\n\n.glass-surface--fallback {\n  border: 1px solid var(--glass-color-fallback-border);\n  background: var(--glass-color-fallback-bg);\n  backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);\n  -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);\n  box-shadow: 0 8px 32px var(--glass-color-shadow-fallback), 0 2px 16px color-mix(in srgb, var(--glass-color-shadow-fallback) 50%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(255, 255, 255, 0.2);\n}\n\n.panel:hover .glass-content {\n  gap: 8px;\n}\n\n.panel:hover .glass-content::before {\n  opacity: 0.95;\n}\n\n.panel.is-dragging .glass-content {\n  gap: 8px;\n}\n\n.panel.is-dragging .glass-content::before {\n  opacity: 0.95;\n}\n\n@media (prefers-color-scheme: dark) {\n  .glass-surface--fallback {\n    border-color: color-mix(in srgb, var(--glass-color-white) 20%, transparent);\n    background: color-mix(in srgb, var(--glass-color-white) 10%, transparent);\n    backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);\n    -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.2);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .glass-content::before {\n    background: color-mix(in srgb, var(--glass-color-black) 40%, transparent);\n  }\n}\n@supports not (backdrop-filter: blur(10px)) {\n  .glass-surface--fallback {\n    background: color-mix(in srgb, var(--glass-color-white) 40%, transparent);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.3);\n  }\n  .glass-surface--fallback::before {\n    position: absolute;\n    inset: 0;\n    z-index: -1;\n    background: color-mix(in srgb, var(--glass-color-white) 15%, transparent);\n    border-radius: inherit;\n    content: \"\";\n    pointer-events: none;\n  }\n}\n@supports not (backdrop-filter: blur(10px)) {\n  @media (prefers-color-scheme: dark) {\n    .glass-surface--fallback {\n      background: color-mix(in srgb, var(--glass-color-black) 40%, transparent);\n    }\n    .glass-surface--fallback::before {\n      background: color-mix(in srgb, var(--glass-color-white) 5%, transparent);\n    }\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .glass-surface,\n  .glass-content::before {\n    transition: none;\n  }\n}";
	var ControlPanel = class {
		#host = null;
		#shadow = null;
		#state = null;
		#glassCleanup = null;
		#dragCleanup = null;
		#visible = true;
		#onEnabledChange;
		#onUncappedChange;
		#getPanelPosition;
		#setPanelPosition;
		constructor(options) {
			this.#onEnabledChange = options.onEnabledChange;
			this.#onUncappedChange = options.onUncappedChange;
			this.#getPanelPosition = options.getPanelPosition;
			this.#setPanelPosition = options.setPanelPosition;
		}
		mount() {
			if (this.#host) return;
			this.#host = document.createElement("div");
			this.#host.dataset.wsControl = "true";
			this.#shadow = this.#host.attachShadow({ mode: "closed" });
			this.#shadow.innerHTML = `
      <style>${control_panel_default}${glass_surface_default}</style>
      <div class="panel" aria-hidden="true"></div>
    `;
			(document.body ?? document.documentElement).append(this.#host);
			const panel = this.#getPanel();
			panel?.addEventListener("pointerenter", (event) => {
				if (event.pointerType !== "mouse") return;
				this.#syncHoverState(panel);
			});
			panel?.addEventListener("pointerleave", (event) => {
				if (event.pointerType !== "mouse") return;
				this.#syncHoverState(panel);
			});
		}
		show(state) {
			this.mount();
			this.#state = state;
			this.#render();
		}
		hide() {
			const panel = this.#getPanel();
			if (!panel) return;
			(this.#shadow?.activeElement)?.blur();
			this.#glassCleanup?.();
			this.#glassCleanup = null;
			this.#dragCleanup?.();
			this.#dragCleanup = null;
			panel.classList.remove("is-visible");
			panel.setAttribute("aria-hidden", "true");
			this.#state = null;
		}
		setVisible(visible) {
			this.mount();
			this.#visible = visible;
			this.#render();
		}
		#getPanel() {
			return this.#shadow?.querySelector(".panel");
		}
		#syncHoverState(panel) {
			const expanded = (panel.matches(":hover") || panel.classList.contains("is-dragging")) && this.#visible && this.#state !== null;
			panel.querySelector(".content")?.setAttribute("aria-hidden", String(!expanded));
			panel.querySelectorAll(".control").forEach((control) => {
				control.tabIndex = expanded ? 0 : -1;
			});
		}
		#render() {
			const panel = this.#getPanel();
			if (!panel) return;
			this.#glassCleanup?.();
			this.#glassCleanup = null;
			this.#dragCleanup?.();
			this.#dragCleanup = null;
			panel.replaceChildren();
			panel.classList.toggle("is-visible", Boolean(this.#state && this.#visible));
			panel.setAttribute("aria-hidden", String(!this.#state || !this.#visible));
			if (!this.#state) return;
			const card = document.createElement("div");
			card.className = "card";
			const trigger = document.createElement("div");
			trigger.className = "trigger";
			trigger.setAttribute("role", "img");
			trigger.setAttribute("aria-label", "宽屏控制");
			trigger.title = "宽屏控制";
			trigger.innerHTML = panelIcon;
			const content = document.createElement("div");
			content.className = "content";
			content.id = "widescreen-control-content";
			content.setAttribute("aria-hidden", "true");
			const contentInner = document.createElement("div");
			contentInner.className = "content-inner";
			const title = document.createElement("div");
			title.className = "site-name";
			title.textContent = this.#state.siteName;
			const actions = document.createElement("div");
			actions.className = "actions";
			const enabled = this.#createControl("宽屏", wideIcon, this.#state.settings.enabled, (value) => {
				this.#onEnabledChange(this.#state.siteId, value);
			});
			const uncapped = this.#createControl("铺满", uncappedIcon, this.#state.settings.uncapped, (value) => {
				this.#onUncappedChange(this.#state.siteId, value);
			});
			uncapped.disabled = !this.#state.settings.enabled;
			actions.append(enabled.button, uncapped.button);
			contentInner.append(title, actions);
			content.append(contentInner);
			const glassContent = document.createElement("div");
			glassContent.className = "glass-content";
			glassContent.append(content, trigger);
			card.append(glassContent);
			panel.append(card);
			const savedPosition = this.#getPanelPosition();
			if (savedPosition) applyPanelPosition(panel, savedPosition);
			else clearPanelPosition(panel);
			this.#glassCleanup = mountGlassSurface(card);
			this.#dragCleanup = createPanelDrag({
				panel,
				handle: trigger,
				getPosition: this.#getPanelPosition,
				setPosition: this.#setPanelPosition,
				onDragStateChange: () => this.#syncHoverState(panel)
			});
			this.#syncHoverState(panel);
		}
		#createControl(text, icon, checked, onChange) {
			const button = document.createElement("button");
			button.className = "control";
			button.dataset.control = text;
			button.type = "button";
			button.tabIndex = -1;
			button.setAttribute("aria-label", text);
			button.title = text;
			button.setAttribute("aria-pressed", String(checked));
			button.innerHTML = `${icon}<span>${text}</span>`;
			button.addEventListener("click", () => {
				const nextValue = button.getAttribute("aria-pressed") !== "true";
				button.setAttribute("aria-pressed", String(nextValue));
				onChange(nextValue);
			});
			return {
				button,
				set disabled(value) {
					button.disabled = value;
				}
			};
		}
	};
	function main() {
		const settings = new SettingsStore();
		let runtime;
		const panel = new ControlPanel({
			getPanelPosition: () => settings.getPanelPosition(),
			setPanelPosition: (position) => settings.setPanelPosition(position),
			onEnabledChange: (siteId, value) => {
				settings.update(siteId, { enabled: value });
				runtime.reconcile();
			},
			onUncappedChange: (siteId, value) => {
				settings.update(siteId, { uncapped: value });
				runtime.reconcile();
			}
		});
		runtime = new WidescreenRuntime({
			sites: sites_default,
			settings,
			panel
		});
		const routeMonitor = new RouteMonitor();
		routeMonitor.subscribe((route) => runtime.transition(route));
		settings.subscribe(() => runtime.reconcile());
		panel.setVisible(settings.getPanelVisible());
		registerMenu(panel, settings);
		routeMonitor.start();
	}
	function registerMenu(panel, settings) {
		_GM_registerMenuCommand("显示/隐藏 控制按钮", () => {
			const nextStatus = !settings.getPanelVisible();
			settings.setPanelVisible(nextStatus);
			panel.setVisible(nextStatus);
		});
	}
	main();
})();
