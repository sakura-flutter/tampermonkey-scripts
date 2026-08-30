// ==UserScript==
// @name         redirect 外链跳转
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      1.67.0
// @author       sakura-flutter
// @description  自动跳转(重定向)到目标链接，免去点击步骤。适配了简书、知乎、微博、QQ邮箱、QQPC、QQNT、印象笔记、贴吧、CSDN、YouTube、微信、企业微信、微信开放社区、开发者知识库、豆瓣、个人图书馆、Pixiv、搜狗、Google、站长之家、OSCHINA、掘金、腾讯文档、pc6下载站、爱发电、Gitee、天眼查、爱企查、企查查、优设网、51CTO、力扣、花瓣网、飞书、Epic、Steam、语雀、牛客网、哔哩哔哩、少数派、5ch、金山文档、石墨文档、urlshare、酷安、网盘分享、腾讯云开发者社区、腾讯兔小巢、云栖社区、NodeSeek、亿企查、异次元软件、HelloGitHub、知更鸟、巴哈姆特、ABABTOOLS、阿里云帮助中心、LINUX DO
// @license      MIT
// @include      /^https?:\/\/www\.google\..{2,7}url/
// @match        *://www.jianshu.com/go-wild*
// @match        *://link.zhihu.com/*
// @match        *://t.cn/*
// @match        *://weibo.cn/sinaurl*
// @match        *://mail.qq.com/cgi-bin/*
// @match        *://wx.mail.qq.com/xmspamcheck/xmsafejump*
// @match        *://c.pc.qq.com/middlem.html*
// @match        *://c.pc.qq.com/middlect.html*
// @match        *://c.pc.qq.com/pc.html*
// @match        *://c.pc.qq.com/ios.html*
// @match        *://c.pc.qq.com/android.html*
// @match        *://app.yinxiang.com/OutboundRedirect.action*
// @match        *://jump.bdimg.com/safecheck/*
// @match        *://jump2.bdimg.com/safecheck/*
// @match        *://tieba.baidu.com/mo/q/checkurl*
// @match        *://link.csdn.net/*
// @match        *://www.youtube.com/redirect*
// @match        *://mp.weixin.qq.com/s/*
// @match        *://mp.weixin.qq.com/mp/readtemplate*
// @match        *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi*
// @match        *://open.work.weixin.qq.com/wwopen/uriconfirm*
// @match        *://developers.weixin.qq.com/community/middlepage/href*
// @match        *://www.itdaan.com/link/*
// @match        *://www.douban.com/link2/*
// @match        *://www.360doc.com/content/*
// @match        *://www.pixiv.net/jump.php*
// @match        *://m.sogou.com/*/tc*
// @match        *://m.sogou.com*/tc*
// @match        *://www.chinaz.com/go.shtml*
// @match        *://www.oschina.net/action/GoToLink*
// @match        *://link.juejin.cn/*
// @match        *://docs.qq.com/scenario/link.html*
// @match        *://www.pc6.com/goread.html*
// @match        *://afdian.net/link*
// @match        *://afdian.com/link*
// @match        *://ifdian.net/link*
// @match        *://gitee.com/link*
// @match        *://www.tianyancha.com/security*
// @match        *://aiqicha.baidu.com/safetip*
// @match        *://www.qcc.com/web/transfer-link*
// @match        *://link.uisdc.com/*
// @match        *://blog.51cto.com/transfer*
// @match        *://leetcode.cn/link*
// @match        *://huaban.com/go*
// @match        *://security.feishu.cn/link/safety*
// @match        *://redirect.epicgames.com/*
// @match        *://steamcommunity.com/linkfilter/*
// @match        *://*.yuque.com/r/goto*
// @match        *://hd.nowcoder.com/link.html*
// @match        *://game.bilibili.com/linkfilter/*
// @match        *://www.bilibili.com/york/link-middle-page/pc*
// @match        *://sspai.com/link*
// @match        *://niu.sspai.com/link*
// @match        *://jump.5ch.net/*
// @match        *://www.kdocs.cn/office/link*
// @match        *://shimo.im/outlink/black*
// @match        *://google.urlshare.cn/umirror_url_check*
// @match        *://www.coolapk.com/link*
// @match        *://wpfx.org/go*
// @match        *://cloud.tencent.com/developer/tools/blog-entry*
// @match        *://support.qq.com/products/*/link-jump*
// @match        *://txc.qq.com/products/*/link-jump*
// @match        *://yq.aliyun.com/go/articleRenderRedirect*
// @match        *://www.nodeseek.com/jump*
// @match        *://www.yiqicha.com/thirdPage*
// @match        *://www.iplaysoft.com/link*
// @match        *://hellogithub.com/periodical/statistics/click*
// @match        *://zmingcx.com/go.html*
// @match        *://ref.gamer.com.tw/redir.php*
// @match        *://ababtools.com/?plugin=redirect_page*
// @match        *://help.aliyun.com/redirect*
// @match        *://linux.do/*
// @grant        unsafeWindow
// @run-at       document-start
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// ==/UserScript==

(function() {
	"use strict";
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
	var $ = document.querySelector.bind(document);
	document.querySelectorAll.bind(document);
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
	var weibo = async () => {
		let link = $(".open-url a[href]")?.href;
		link ||= await fetch(location.href).then((response) => response.headers.get("location"));
		return link;
	};
	var _unsafeWindow = (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
	var weixin$1 = () => {
		window.addEventListener("click", (event) => {
			const target = event.target;
			if (target.nodeName !== "A") return;
			if (target.id !== "js_view_source") return;
			const link = _unsafeWindow.msg_source_url;
			if (link) {
				event.stopPropagation();
				event.preventDefault();
				event.stopImmediatePropagation();
				window.open(link);
			}
		}, true);
	};
	var { atob } = window;
	var weixin = ({ query }) => {
		const { main_type, midpagecode } = query;
		switch (main_type) {
			case "2": {
				const url = new URL(location.href);
				url.searchParams.set("main_type", "1");
				location.replace(url.href);
				return;
			}
		}
		const MAGIC_KEY = atob(atob("Tmpjek56ZGhNbUZrWWpRMFpURTNZekZpTUdGa1lqSTBZalZqWmpKaVpERXlZek0wWkRsaU5UWmxNRFpqWTJRMlpHUTBZekk1TVdJME1qTmlOV0prTjJabU5tUmhZbVJqTlRVM1l6azVNbVkxWkRZd1pEZzVNbUkyT0Rjd1pqYzBOakV3TldNM05HRmhNalJqTXpBMk0yUTNOR1ExT1dJMFlXVTFOVFF6WldJM1lqSmtObVUwT1dOak1qYzNNMkZsTVRjM01UWTNNemcwTmpRM04ySmpOalppTTJNelltUTNPVE5sWkRJNFpEZGhaVE5rTnpZeE0yUm1ZVGRpWW1ReQ=="));
		if (midpagecode && midpagecode !== MAGIC_KEY && !window.cgiData?.url) {
			const url = new URL(location.href);
			url.searchParams.set("midpagecode", MAGIC_KEY);
			location.replace(url.href);
			return;
		}
		return { selector: ".weui-msg__text-area .ui-ellpisis-content p" };
	};
	var doc360 = () => {
		$("#artContent").addEventListener("click", (event) => {
			const { target } = event;
			const href = target.href;
			if (target.nodeName !== "A") return;
			if (!href) return;
			if (new RegExp(location.host).test(new URL(href).host)) return;
			event.stopPropagation();
			window.open(href);
		}, true);
	};
	var pixiv = ({ query }) => {
		let link;
		for (const [key, value] of Object.entries(query)) {
			try {
				link ||= new URL(key).href;
			} catch {}
			try {
				link ||= new URL(value).href;
			} catch {}
		}
		return { link };
	};
	function openExternalLink(event) {
		const target = event.target;
		if (!(target instanceof Element)) return;
		const link = target.closest("a.normal-external-link-icon[href]");
		if (!link) return;
		event.stopImmediatePropagation();
		event.preventDefault();
		window.open(link.href);
	}
	var linuxDo = () => {
		document.addEventListener("click", openExternalLink, true);
	};
	var sites = [
		{
			name: "简书",
			match: "www.jianshu.com/go-wild",
			parse: ({ query }) => query.url
		},
		{
			name: "知乎",
			match: "link.zhihu.com/",
			parse: ({ query }) => query.target
		},
		{
			name: "微博",
			match: /^t\.cn\//,
			readyState: "interactive",
			parse: weibo
		},
		{
			name: "微博",
			match: "weibo.cn/sinaurl",
			parse: ({ query }) => query.toasturl || query.u
		},
		{
			name: "QQ邮箱",
			match: [
				"mail.qq.com/cgi-bin/readtemplate",
				"mail.qq.com/cgi-bin/mail_spam",
				"wx.mail.qq.com/xmspamcheck/xmsafejump"
			],
			parse: ({ query }) => query.gourl || query.url
		},
		{
			name: "QQPC",
			match: /^c\.pc\.qq\.com\/middle(m|ct).html/,
			parse: ({ query }) => query.pfurl
		},
		{
			name: "QQNT",
			match: /^c\.pc\.qq\.com\/(pc|ios|android)\.html/,
			parse: ({ query }) => query.url
		},
		{
			name: "腾讯文档",
			match: "docs.qq.com/scenario/link.html",
			parse: ({ query }) => query.url
		},
		{
			name: "印象笔记",
			match: /^app\.yinxiang\.com\/OutboundRedirect/,
			parse: ({ query }) => query.dest
		},
		{
			name: "贴吧-旧版",
			match: /^jump2?\.bdimg\.com\/safecheck/,
			readyState: "interactive",
			parse: () => ({
				selector: ".warning_info a:nth-of-type(1)[href]",
				attr: "href"
			})
		},
		{
			name: "贴吧",
			match: "tieba.baidu.com/mo/q/checkurl",
			parse: ({ query }) => query.url
		},
		{
			name: "CSDN",
			match: "link.csdn.net/",
			parse: ({ query }) => query.target
		},
		{
			name: "YouTube",
			match: "www.youtube.com/redirect",
			parse: ({ query }) => query.q
		},
		{
			name: "微信",
			match: /^mp\.weixin\.qq\.com\/s\//,
			parse: weixin$1
		},
		{
			name: "微信2",
			match: /^weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
			readyState: "interactive",
			parse: weixin
		},
		{
			name: "微信3",
			match: /^mp\.weixin\.qq\.com\/mp\/readtemplate/,
			parse: ({ query }) => query.url
		},
		{
			name: "企业微信",
			match: "open.work.weixin.qq.com/wwopen/uriconfirm",
			parse: ({ query }) => query.uri
		},
		{
			name: "微信开放社区",
			match: "developers.weixin.qq.com/community/middlepage/href",
			parse: ({ query }) => query.href
		},
		{
			name: "开发者知识库",
			match: /^www\.itdaan.com\/link\//,
			readyState: "interactive",
			parse: () => ({ selector: ".safety-url" })
		},
		{
			name: "豆瓣",
			match: "www.douban.com/link2/",
			parse: ({ query }) => query.url
		},
		{
			name: "个人图书馆",
			match: /^www\.360doc.com\/content\//,
			readyState: "interactive",
			parse: doc360
		},
		{
			name: "Pixiv",
			match: "www.pixiv.net/jump.php",
			parse: pixiv
		},
		{
			name: "搜狗",
			match: /^m\.sogou\.com.*tc$/,
			parse: ({ query }) => query.url
		},
		{
			name: "Google",
			match: /^www\.google\..{2,7}url$/,
			parse: ({ query }) => query.url || query.q
		},
		{
			name: "站长之家",
			match: "www.chinaz.com/go.shtml",
			parse: ({ query }) => query.url
		},
		{
			name: "OSCHINA",
			match: "www.oschina.net/action/GoToLink",
			parse: ({ query }) => query.url
		},
		{
			name: "掘金",
			match: "link.juejin.cn/",
			parse: ({ query }) => query.target
		},
		{
			name: "pc6下载站",
			match: "www.pc6.com/goread.html",
			parse: ({ query }) => query.gourl
		},
		{
			name: "爱发电",
			match: [
				"afdian.net/link",
				"afdian.com/link",
				"ifdian.net/link"
			],
			parse: ({ query }) => query.target
		},
		{
			name: "Gitee",
			match: "gitee.com/link",
			parse: ({ query }) => query.target
		},
		{
			name: "天眼查",
			match: "www.tianyancha.com/security",
			parse: ({ query }) => query.target
		},
		{
			name: "爱企查",
			match: "aiqicha.baidu.com/safetip",
			parse: ({ query }) => query.target
		},
		{
			name: "企查查",
			match: "www.qcc.com/web/transfer-link",
			parse: ({ query }) => query.link
		},
		{
			name: "优设网",
			match: "link.uisdc.com/",
			parse: ({ query }) => query.redirect
		},
		{
			name: "51CTO",
			match: "blog.51cto.com/transfer",
			parse: () => location.search.slice(1)
		},
		{
			name: "力扣",
			match: "leetcode.cn/link/",
			parse: ({ query }) => query.target
		},
		{
			name: "花瓣网",
			match: "huaban.com/go",
			readyState: "interactive",
			parse: () => {
				return JSON.parse($("#__NEXT_DATA__").textContent).props.pageProps?.data.link;
			}
		},
		{
			name: "飞书",
			match: /security\.feishu\.cn\/link\/safety(\/block_template)?/,
			parse: ({ query }) => query.target || query.url
		},
		{
			name: "Epic",
			match: /^redirect\.epicgames\.com\//,
			parse: ({ query }) => query.redirectTo
		},
		{
			name: "Steam",
			match: "steamcommunity.com/linkfilter/",
			parse: ({ query }) => query.url || query.u
		},
		{
			name: "语雀",
			match: /\.yuque\.com\/r\/goto(\/?)$/,
			parse: ({ query }) => query.url
		},
		{
			name: "牛客网",
			match: "hd.nowcoder.com/link.html",
			parse: ({ query }) => query.target
		},
		{
			name: "哔哩哔哩",
			match: ["game.bilibili.com/linkfilter/", "www.bilibili.com/york/link-middle-page/pc"],
			parse: ({ query }) => query.url || query.redirect_url
		},
		{
			name: "少数派",
			match: /^(niu\.)?sspai\.com\/link/,
			parse: ({ query }) => query.target
		},
		{
			name: "5ch",
			match: "jump.5ch.net/",
			parse: () => location.search.slice(1)
		},
		{
			name: "金山文档",
			match: "www.kdocs.cn/office/link",
			parse: ({ query }) => query.target
		},
		{
			name: "石墨文档",
			match: "shimo.im/outlink/black",
			parse: ({ query }) => query.url
		},
		{
			name: "urlshare",
			match: "google.urlshare.cn/umirror_url_check",
			parse: ({ query }) => query.url
		},
		{
			name: "酷安",
			match: "www.coolapk.com/link",
			parse: ({ query }) => query.url
		},
		{
			name: "网盘分享",
			match: "wpfx.org/go/",
			parse: ({ query }) => query.url
		},
		{
			name: "腾讯云开发者社区",
			match: "cloud.tencent.com/developer/tools/blog-entry",
			parse: ({ query }) => query.target
		},
		{
			name: "腾讯兔小巢",
			match: /^(support|txc)\.qq\.com\/products\/\d+\/link-jump$/,
			parse: ({ query }) => query.jump
		},
		{
			name: "云栖社区",
			match: "yq.aliyun.com/go/articleRenderRedirect",
			parse: ({ query }) => query.url
		},
		{
			name: "NodeSeek",
			match: "www.nodeseek.com/jump",
			parse: ({ query }) => query.to
		},
		{
			name: "亿企查",
			match: "www.yiqicha.com/thirdPage",
			parse: ({ query }) => query.link
		},
		{
			name: "异次元软件",
			match: "www.iplaysoft.com/link/",
			readyState: "interactive",
			parse: () => ({ selector: "#targetUrl > a" })
		},
		{
			name: "HelloGitHub",
			match: "hellogithub.com/periodical/statistics/click",
			parse: ({ query }) => query.target
		},
		{
			name: "知更鸟",
			match: "zmingcx.com/go.html",
			parse: ({ query }) => query.target
		},
		{
			name: "巴哈姆特",
			match: "ref.gamer.com.tw/redir.php",
			parse: ({ query }) => query.url
		},
		{
			name: "ABABTOOLS",
			match: "ababtools.com/",
			parse: ({ query }) => query.url
		},
		{
			name: "阿里云帮助中心",
			match: "help.aliyun.com/redirect",
			parse: ({ query }) => query.targetUrl
		},
		{
			name: "LINUX DO",
			match: /^linux\.do\//,
			parse: linuxDo
		}
	];
	function hidePage() {
		const style = document.createElement("style");
		style.textContent = "html{visibility:hidden!important}";
		document.documentElement.append(style);
	}
	new class App {
		static #SAFE_PROTOCOLS = new Set(["http:", "https:"]);
		#sites;
		constructor(sites) {
			this.#sites = sites;
		}
		async run() {
			const hostPath = location.host + location.pathname;
			const site = this.#sites.find((s) => this.#matches(s.match, hostPath));
			if (!site) return;
			if (site.readyState) await ready_state_exports[site.readyState]();
			const ctx = this.#createContext();
			const redirection = await this.#resolve(site.parse, ctx);
			site.name;
			if (!redirection) return;
			hidePage();
			window.stop();
			location.replace(redirection);
		}
		#matches(match, url) {
			return (Array.isArray(match) ? match : [match]).some((item) => {
				if (typeof item === "string") return item === url;
				if (item instanceof RegExp) return item.test(url);
				return false;
			});
		}
		#createContext() {
			let queryCache;
			return { get query() {
				return queryCache ??= parse();
			} };
		}
		async #resolve(parse$1, ctx) {
			const result = await parse$1(ctx);
			if (!result) return;
			if (typeof result === "string") return this.#sanitize(result);
			const { searchParam, link, selector, attr } = result;
			let redirection;
			if (searchParam) redirection = parse()[searchParam];
			else if (link) redirection = link;
			else if (selector) redirection = $(selector)?.[attr ?? "innerText"];
			return this.#sanitize(redirection);
		}
		#sanitize(input) {
			const raw = input?.trim();
			if (!raw) return;
			let url;
			for (const candidate of [raw, `http://${raw}`]) try {
				url = new URL(candidate);
				break;
			} catch {}
			if (!url) return;
			if (!App.#SAFE_PROTOCOLS.has(url.protocol)) {
				warn.force("不安全的重定向：", raw);
				return;
			}
			return url.href;
		}
	}(sites).run();
})();
