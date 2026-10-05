// ==UserScript==
// @name            GitHub 工具箱
// @name:en         GitHub ToolBox
// @namespace       https://github.com/sakura-flutter/tampermonkey-scripts
// @version         1.2.1
// @author          sakura-flutter
// @description     添加用 VS Code 阅读代码按钮(github1s)
// @description:en  Read code with VS Code(github1s)
// @license         MIT
// @match           https://github.com/*
// @grant           GM_getValue
// @grant           GM_registerMenuCommand
// @grant           GM_setValue
// @grant           window.onurlchange
// @compatible      chrome Latest
// @compatible      firefox Latest
// @compatible      edge Latest
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _monkeyWindow = (() => window)();
	var $ = document.querySelector.bind(document);
	document.querySelectorAll.bind(document);
	var BUTTONS = [{
		id: "vscode-button",
		label: "VS Code",
		title: "Open in VS Code",
		host: "vscode.dev",
		pathPrefix: "/github",
		storageKey: "vscode-visible",
		icon: `<svg width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="v-align-text-bottom d-inline-block mr-2" style="vertical-align: text-bottom;">
      <path fill="currentColor" d="M30.865 3.448l-6.583-3.167c-0.766-0.37-1.677-0.214-2.276 0.385l-12.609 11.505-5.495-4.167c-0.51-0.391-1.229-0.359-1.703 0.073l-1.76 1.604c-0.583 0.526-0.583 1.443-0.005 1.969l4.766 4.349-4.766 4.349c-0.578 0.526-0.578 1.443 0.005 1.969l1.76 1.604c0.479 0.432 1.193 0.464 1.703 0.073l5.495-4.172 12.615 11.51c0.594 0.599 1.505 0.755 2.271 0.385l6.589-3.172c0.693-0.333 1.13-1.031 1.13-1.802zM24.005 23.266l-9.573-7.266 9.573-7.266z"></path>
    </svg>`
	}, {
		id: "github1s-button",
		label: "GitHub1s",
		title: "Open in GitHub1s",
		host: "github1s.com",
		storageKey: "github1s-visible",
		icon: `<svg width="16" height="16" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="v-align-text-bottom d-inline-block mr-2" style="vertical-align: text-bottom;">
      <g><path stroke="none" fill="currentColor" d="M35.587 25.574 C 26.887 34.274,22.366 85.319,28.408 106.640 C 29.808 111.581,30.362 115.990,29.639 116.436 C 22.375 120.926,6.586 153.361,2.311 172.577 C -1.702 190.614,-0.380 242.019,4.623 262.483 C 23.337 339.024,75.772 372.234,183.814 375.971 C 333.315 381.142,400.042 329.514,399.989 208.709 C 399.973 171.788,393.448 148.895,375.953 124.378 L 369.021 114.663 371.179 105.378 C 378.038 75.873,372.074 26.678,361.310 23.977 C 349.211 20.940,315.376 33.668,289.736 50.901 L 277.128 59.375 269.292 57.047 C 230.073 45.401,175.046 45.086,133.396 56.269 L 122.262 59.259 109.633 50.951 C 77.787 29.999,43.062 18.098,35.587 25.574 M199.219 174.024 C 215.547 173.970,243.672 173.640,261.719 173.291 C 297.764 172.594,302.347 173.496,314.439 183.671 C 360.164 222.146,353.423 307.996,302.675 333.490 C 257.998 355.934,129.596 354.142,90.730 330.533 C 37.291 298.070,45.173 192.813,102.426 174.343 C 108.963 172.234,114.738 172.025,139.844 172.986 C 156.172 173.611,182.891 174.078,199.219 174.024 M115.787 201.123 C 100.709 208.550,93.908 238.122,102.705 258.007 C 117.257 290.906,150.790 276.028,150.686 236.719 C 150.615 210.124,133.322 192.485,115.787 201.123 M265.858 201.088 C 262.979 202.507,258.887 206.290,256.767 209.495 C 233.925 244.011,263.236 295.935,289.886 268.166 C 314.409 242.614,294.482 186.985,265.858 201.088 M176.563 301.563 C 164.758 313.367,192.597 331.661,210.156 323.639 C 224.183 317.230,229.788 307.913,223.438 301.563 C 219.132 297.257,215.495 297.640,208.594 303.125 C 205.350 305.703,201.482 307.813,200.000 307.813 C 198.518 307.813,194.650 305.703,191.406 303.125 C 184.505 297.640,180.868 297.257,176.563 301.563"></path></g>
    </svg>`
	}];
	function getButtonHref(button) {
		const url = new URL(location.href);
		url.host = button.host;
		if (button.pathPrefix) url.pathname = `${button.pathPrefix}${url.pathname}`;
		return url.href;
	}
	function createButtonHTML(button) {
		const title = button.title ? ` title="${button.title}"` : "";
		return `<li>
    <a id="${button.id}" class="btn btn-sm" target="_blank" href="${getButtonHref(button)}"${title}>
      ${button.icon}
      <span class="d-inline">${button.label}</span>
    </a>
  </li>`;
	}
	function isButtonVisible(button) {
		return _GM_getValue(button.storageKey, true);
	}
	function removeButton(button) {
		document.getElementById(button.id)?.closest("li")?.remove();
	}
	function syncButtons() {
		const actions = $("[class*=\"RepoHeaderActions-module__Actions\"]");
		if (actions == null) return;
		for (const button of BUTTONS) {
			if (!isButtonVisible(button)) {
				removeButton(button);
				continue;
			}
			let element = document.getElementById(button.id);
			if (element == null) {
				actions.insertAdjacentHTML("afterbegin", createButtonHTML(button));
				element = document.getElementById(button.id);
			}
			if (element == null) continue;
			element.href = getButtonHref(button);
		}
	}
	function registerMenuCommands() {
		for (const button of BUTTONS) _GM_registerMenuCommand(`显示/隐藏 ${button.label}`, () => {
			_GM_setValue(button.storageKey, !isButtonVisible(button));
			syncButtons();
		});
	}
	registerMenuCommands();
	setTimeout(syncButtons, 500);
	_monkeyWindow.addEventListener("urlchange", () => setTimeout(syncButtons, 500));
})();
