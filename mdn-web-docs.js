// ==UserScript==
// @name         MDN 文档辅助
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @version      2.3.0
// @author       sakura-flutter
// @description  在提供中文语言的页面自动切换为中文
// @license      MIT
// @match        https://developer.mozilla.org/*
// @grant        window.onurlchange
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var _monkeyWindow = (() => window)();
	var $ = document.querySelector.bind(document);
	var $$ = document.querySelectorAll.bind(document);
	function warn(...args) {}
	warn.force = function(...args) {
		console.warn("%c      warn      ", "background: #ffa500; padding: 1px; color: #fff;", ...args);
	};
	function error(...args) {}
	error.force = function(...args) {
		console.error("%c      error      ", "background: red; padding: 1px; color: #fff;", ...args);
	};
	function matchLang(str) {
		return str.match(/^\/?([\w-]+)/)?.[1];
	}
	function isChinese(lang) {
		return /zh-CN/i.test(lang);
	}
	function isEnglish(lang) {
		return /en-US/i.test(lang);
	}
	async function getLangMenus(callback) {
		const toggle = $("button.languages-switcher-menu");
		if (toggle == null) return [];
		toggle.click();
		await Promise.resolve();
		const buttons = [...$$(".language-menu button[name]")];
		(callback?.(buttons) ?? true) && toggle.click();
		return buttons;
	}
	async function getSupports() {
		return (await getLangMenus()).map((button) => button.getAttribute("name"));
	}
	var stylesheet = `
/* 让搜索框一直展开 */
@media screen and (min-width: 1220px) {
  .header-search .search-input-field {
    width: inherit !important;
  }
}
`;
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(stylesheet));
	document.head.appendChild(style);
	var docsLang = matchLang(location.pathname);
	var supports = [];
	async function main() {
		supports = await getSupports();
		if (!supports.length) return;
		_monkeyWindow.addEventListener("urlchange", () => {
			docsLang = matchLang(location.pathname);
		});
		window.addEventListener("click", function listener(event) {
			if (!event.isTrusted) return;
			if ($(".languages-switcher-menu .language-menu")?.contains(event.target)) {
				sessionStorage.setItem("hand-control-language", "true");
				window.removeEventListener("click", listener, true);
			}
		}, true);
		setLocale();
		addLangButton();
	}
	function setLocale() {
		if (isChinese(docsLang)) return;
		if (sessionStorage.getItem("hand-control-language") === "true") return;
		for (const item of supports) isChinese(matchLang(item)) && selectLang(item);
	}
	function selectLang(value) {
		getLangMenus((buttons) => {
			for (const button of buttons) if (button.getAttribute("name") === value) {
				button.click();
				return false;
			}
		});
	}
	function addLangButton() {
		const values = [];
		for (const item of supports) {
			const lang = matchLang(item);
			if (isChinese(lang)) values[0] = item;
			else if (isEnglish(lang)) values[1] = item;
		}
		if (isChinese(docsLang)) values[0] = docsLang;
		if (isEnglish(docsLang)) values[1] = docsLang;
		if (values.filter(Boolean).length < 2) return;
		const button = document.createElement("button");
		button.innerText = "中-英";
		button.classList.add("button");
		button.classList.add("action");
		button.style.cssText = [
			"position: fixed",
			"right: 0",
			"bottom: 15vh",
			"line-height: 2em",
			"padding: 2px 10px",
			"font-size: 12px",
			"letter-spacing: 2px",
			"border: 1px solid var(--border-secondary)",
			"background-color: var(--button-bg)",
			"box-shadow: var(--shadow-01)"
		].join(";");
		button.onclick = function() {
			sessionStorage.setItem("hand-control-language", "true");
			selectLang(isChinese(docsLang) ? values[1] : values[0]);
		};
		document.body.append(button);
	}
	main();
})();
