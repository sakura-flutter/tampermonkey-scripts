// ==UserScript==
// @name         蓝湖 工具箱
// @version      1.12.1
// @description  自动填充填写过的产品密码(不是蓝湖账户)；快捷查看打开过的项目
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @noframes
// @match        https://lanhuapp.com/web/
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @require      https://unpkg.com/vue@3.2.37/dist/vue.runtime.global.prod.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=1081231
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 5482:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-button{border:1px solid;border-radius:2px;box-shadow:var(--skr-button-box-shadow);cursor:pointer;line-height:1.5715;transition:var(--skr-button-transition)}.skr-button:hover{filter:brightness(1.15)}.skr-button:focus:not(:focus-visible){outline:0}.skr-button--primary{background-color:var(--skr-primary-color);border-color:var(--skr-primary-color);color:var(--skr-text-inverse-color)}.skr-button--default{background-color:var(--skr-white-color);border-color:var(--skr-border-color);color:var(--skr-text-primary-color)}.skr-button--default:hover{border-color:currentcolor;color:var(--skr-primary-color);filter:brightness(1)}.skr-button--round{border-radius:50%}.skr-button--shadow{box-shadow:var(--skr-box-shadow-normal)}.skr-button--mini{font-size:12px;padding:2px 7px}.skr-button--small{font-size:12px;padding:4px 8px}.skr-button--normal{font-size:14px;padding:4px 15px}.skr-button--large{font-size:15px;padding:10px 20px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8443:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-ripple-container{border-radius:inherit !important;bottom:0;contain:strict;left:0;margin:0 !important;overflow:hidden;padding:0 !important;pointer-events:none !important;position:absolute;right:0;top:0}.skr-ripple{animation:skr-ripple forwards cubic-bezier(0.23, 1, 0.32, 1);background:var(--skr-ripple-color);border-radius:100%;contain:layout;margin:0 !important;padding:0 !important;pointer-events:none;position:absolute;transform:scale(0);transition:opacity 2s cubic-bezier(0.23, 1, 0.32, 1)}@keyframes skr-ripple{to{transform:scale(3)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9979:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgb(24 144 255 / 20%);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);--skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);--skr-ripple-color: rgb(138 218 255 / 20%)}#inject-recorder-ui{bottom:8vh;contain:layout;opacity:.5;padding:30px 30px 10px;position:fixed;right:30px;transition:opacity .1s;width:240px;z-index:1000}#inject-recorder-ui:hover{opacity:1}#inject-recorder-ui ul{background:#fbfbfb;box-shadow:var(--skr-box-shadow-lighten);max-height:250px;overflow-x:hidden;padding:5px;transition:width .1s;width:-moz-fit-content;width:fit-content}#inject-recorder-ui ul::-webkit-scrollbar{background:#f2f2f2;height:4px;padding-right:2px;width:4px}#inject-recorder-ui ul::-webkit-scrollbar-thumb{background:#b4bbc5;border:0;border-radius:3px}#inject-recorder-ui li{align-items:center;box-sizing:content-box;display:flex;padding:0 0 0 5px;position:relative;transition:all var(--skr-transition-duration-normal),width .15s ease-out,background var(--skr-transition-duration-fast) ease-out}#inject-recorder-ui li:hover{background:rgba(220,237,251,.64)}#inject-recorder-ui li.has-pwd::before{background:rgba(7,193,96,.52);content:\"\";height:50%;left:1px;position:absolute;width:2px}#inject-recorder-ui li a{flex:none;line-height:30px;overflow:hidden;padding-right:4px;text-overflow:ellipsis;white-space:nowrap;width:132px}#inject-recorder-ui li .actions{white-space:nowrap}#inject-recorder-ui li button{border:none;height:20px;line-height:20px;padding:0;width:20px}#inject-recorder-ui li button:not(:hover){color:var(--skr-text-secondary-color)}#inject-recorder-ui li button:nth-of-type(n + 2){margin-left:4px}#inject-recorder-ui .control{align-items:center;display:flex;justify-content:center;padding-top:8px}#inject-recorder-ui .control input{margin-left:6px}#inject-recorder-ui .view-btn:not(:focus-visible){outline:none}#inject-recorder-ui svg{fill:currentcolor}#inject-recorder-ui .inject-slide-fade-enter-active,#inject-recorder-ui .inject-slide-fade-leave-active{transition:all .1s}#inject-recorder-ui .inject-slide-fade-enter-from,#inject-recorder-ui .inject-slide-fade-leave-to{opacity:0;transform:translateY(5px)}#inject-recorder-ui .inject-slide-hor-fade-move{transition:all .8s}#inject-recorder-ui .inject-slide-hor-fade-active{position:absolute}#inject-recorder-ui .inject-slide-hor-fade-enter-from,#inject-recorder-ui .inject-slide-hor-fade-leave-to{opacity:0;transform:translateX(30px)}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 8081:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 3379:
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 569:
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ 9216:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ 3565:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 7795:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ 4589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/base.ts
function throttle(fn, delay) {
  let timeoutId;
  let begin = Date.now();
  return function (...args) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const cur = Date.now();
    clearTimeout(timeoutId);
    if (cur - begin >= delay) {
      fn.apply(self, args);
      begin = cur;
    } else {
      timeoutId = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    }
  };
}
function once(fn) {
  let called = false;
  return function (...args) {
    if (!called) {
      called = true;
      fn.apply(this, args);
    }
  };
}

/**
 * 延时
 * @param ms 毫秒数
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function isFunction(value) {
  return typeof value === 'function';
}
;// CONCATENATED MODULE: ./src/utils/compatibility.ts
/**
 * 兼容性检查，只是用来拦截低版本用户
 * @return 是否通过
 */
function checker({
  firefox = 75,
  edge = 80,
  chrome = 80,
  safari = 14,
  notify = true
} = {}) {
  const {
    userAgent
  } = window.navigator;
  const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1];
  const edgeVersion = userAgent.match(/Edg\/(\d+)/)?.[1];
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
  const safariVersion = userAgent.match(/Version\/(\d+).*Safari/)?.[1]; // 不保证兼容

  let pass = false;
  if (firefoxVersion && Number(firefoxVersion) >= firefox || edgeVersion && Number(edgeVersion) >= edge || chromeVersion && Number(chromeVersion) >= chrome || safariVersion && Number(safariVersion) >= safari) {
    pass = true;
  }
  if (!pass) {
    const {
      Toast
    } = window;
    notify && Toast && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0);
  }
  return pass;
}
;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
;// CONCATENATED MODULE: ./src/utils/querystring.ts
/**
 * 解析 query
 * @param href 或 带有参数格式的 string；有 search 则不再 hash
 */
function parse(href = location.href) {
  if (!href) return {};
  let search;
  try {
    // 链接
    const url = new URL(href);
    ({
      search
    } = url);
    // 主要处理对hash的search
    if (!search && url.hash.includes('?')) {
      search = url.hash.split('?')[1];
    }
  } catch {
    // 非链接,如：a=1&b=2、?a=1、/foo?a=1、/foo#bar?a=1
    if (href.includes('?')) {
      search = href.split('?')[1];
    } else {
      search = href;
    }
  }
  return Object.fromEntries(new URLSearchParams(search));
}
function stringify(obj) {
  return Object.entries(obj)
  // 过滤 undefined，保留 null 且转成 ''
  .filter(([, value]) => value !== undefined).map(([key, value]) => `${key}=${value ?? ''}`).join('&');
}
;// CONCATENATED MODULE: ./src/utils/mount-component.ts
/*
  引用：https://github.com/youzan/vant/blob/dev/src/utils/mount-component.ts
*/


function append(el) {
  document.body ? document.body.appendChild(el) : window.addEventListener('DOMContentLoaded', () => append(el));
}
function mountComponent(RootComponent) {
  const app = (0,external_Vue_namespaceObject.createApp)(RootComponent);
  const root = document.createElement('div');
  append(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}
;// CONCATENATED MODULE: ./src/composables/use-gm-value.ts


/**
 * 同 GM_getValue、GM_setValue
 */
function useGMvalue(name, defaultValue, _options) {
  const {
    listening,
    deep
  } = Object.assign({
    listening: typeof _options === 'boolean' ? _options : true,
    deep: false
  }, _options);
  const value = (0,external_Vue_namespaceObject.ref)(GM_getValue(name, defaultValue));
  (0,external_Vue_namespaceObject.watch)(value, () => {
    GM_setValue(name, value.value);
  }, {
    deep
  });
  if (listening) {
    (0,external_Vue_namespaceObject.onUnmounted)(() => {
      GM_removeValueChangeListener(id);
    });
    const id = GM_addValueChangeListener(name, (name, oldVal, newVal) => {
      value.value = newVal;
    });
  }
  return value;
}
;// CONCATENATED MODULE: ./src/store/index.ts
/**
 * store
 * @param modulename 会加入 [[modulename]]- 前缀
 * @param local 是否本地存储
 */
function createStore(modulename = '', local = true) {
  const getRealProp = property => modulename ? `[[${modulename}]]-${property}` : property;
  const store = new Proxy({}, {
    get(target, property, receiver) {
      const realProp = getRealProp(property);
      const value = local ? GM_getValue(realProp) : Reflect.get(target, realProp, receiver);
      return value;
    },
    set(target, property, value, receiver) {
      const realProp = getRealProp(property);
      local ? GM_setValue(realProp, value) : Reflect.set(target, realProp, value, receiver);
      return true;
    },
    deleteProperty(target, property) {
      const realProp = getRealProp(property);
      local ? GM_deleteValue(realProp) : Reflect.deleteProperty(target, realProp);
      return true;
    }
  });
  return store;
}
/* harmony default export */ const store = (createStore());

;// CONCATENATED MODULE: ./src/directives/v-ripple/utils.ts
/**
 * 计算一个点离矩形中心点的距离
 * @param width 矩形宽
 * @param height 矩形高
 * @return (left top 在矩形内点的坐标) => {} => () => {} 距离
 */
function calcDiagInRect(width, height) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  return function (left, top) {
    const a = left <= halfWidth ? halfWidth - left : left - halfWidth;
    const b = top <= halfHeight ? halfHeight - top : top - halfHeight;
    const c = Math.sqrt(a * a + b * b);
    return c;
  };
}

/**
 * 计算当前值离总值中心的位置 越靠近中心值为1，远离中心值为0
 * @param value 当前值
 * @param extent 总值
 * @return 取值 0-1
 * @example value：50 extent：100 则计算 50 在 0-100 中的位置返回 1
 * value：0 或 100 extent：100 返回 0
 */
function closeness(value, extent) {
  if (!value || !extent) return 0;
  const half = extent / 2;
  return value <= half ? value / half : 1 - value / extent;
}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(3379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7795);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(569);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(3565);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(9216);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(4589);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/directives/v-ripple/index.scss
var v_ripple = __webpack_require__(8443);
;// CONCATENATED MODULE: ./src/directives/v-ripple/index.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(v_ripple/* default */.Z, options);




       /* harmony default export */ const directives_v_ripple = (v_ripple/* default */.Z && v_ripple/* default.locals */.Z.locals ? v_ripple/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/directives/v-ripple/index.ts


const containerClassname = 'skr-ripple-container';
const rippleClassname = 'skr-ripple';
const weakmap = new WeakMap();
/**
 * 创建容器元素
 */
function createRippleContainer() {
  const div = document.createElement('div');
  div.classList.add(containerClassname);
  return div;
}
/**
 * 创建涟漪元素
 */
function createRippleEl() {
  const span = document.createElement('div');
  span.classList.add(rippleClassname);
  return span;
}
function normalizeOptions(options) {
  if (typeof options === 'boolean') {
    return {
      disabled: !options
    };
  }
  return options;
}

/**
 * 添加涟漪效果
 */
const addRippleEffect = function (_options = {}) {
  let options = normalizeOptions(_options);
  // 涟漪个数
  let count = 0;
  function listener(event) {
    if (options.disabled) return;
    const currentTarget = event.currentTarget;

    // 优化: 处理过后不再调用getComputedStyle
    if (weakmap.get(currentTarget).position === false) {
      weakmap.get(currentTarget).position = true;
      // 注意：会改变当前元素定位方式
      if (getComputedStyle(currentTarget).position === 'static') {
        currentTarget.style.position = 'relative';
      }
    }
    const rect = currentTarget.getBoundingClientRect();
    const rippleEl = createRippleEl();
    // 取元素长的一边作为涟漪的周长
    const side = Math.max(rect.width, rect.height);
    const radius = side / 2;
    // 鼠标在元素中的坐标
    const left = event.pageX - rect.left - window.scrollX;
    const top = event.pageY - rect.top - window.scrollY;

    // 选项加入到元素中
    options.color && (rippleEl.style.background = options.color);
    rippleEl.style.width = side + 'px';
    rippleEl.style.height = side + 'px';
    // 元素定位再各减自身的宽高一半
    rippleEl.style.top = top - radius + 'px';
    rippleEl.style.left = left - radius + 'px';
    // 动画在元素中间扩散时基础时长1.5s，当点击范围处于元素边缘时，动画扩散比在元素中间位置要长，所以要加快动画进行
    const base = 1.5;
    const diagonal = calcDiagInRect(rect.width, rect.height)(left, top);
    rippleEl.style.animationDuration = base - base * diagonal / side + 's';
    let container = currentTarget.querySelector(`.${containerClassname}`);
    if (!container) {
      container = createRippleContainer();
      currentTarget.appendChild(container);
    }
    container.appendChild(rippleEl);
    count++;
    const unlisten = (() => {
      const leaveEvents = ['mouseup', 'mouseleave'];
      const listener = () => {
        // 为了尽量能看清动画效果，延时一下再进行透明
        setTimeout(() => {
          rippleEl.style.opacity = '0';
        }, 100);
      };
      leaveEvents.forEach(eventname => currentTarget.addEventListener(eventname, listener));
      return () => {
        leaveEvents.forEach(eventname => currentTarget.removeEventListener(eventname, listener));
      };
    })();

    // 移除涟漪元素
    rippleEl.addEventListener('transitionend', transEvent => {
      if (transEvent.propertyName === 'opacity') {
        unlisten();
        rippleEl.remove();
        // 没有涟漪元素时移除容器
        if (--count <= 0) {
          container?.remove();
        }
      }
    });
  }

  // 更新配置项
  function update(newOpts) {
    options = Object.assign({}, options, normalizeOptions(newOpts));
  }
  return {
    listener,
    update
  };
};
const vRipple = {
  mounted(el, binding) {
    const {
      listener,
      update
    } = addRippleEffect(binding.value);
    weakmap.set(el, {
      listener,
      update,
      // 更新配置项函数
      position: false // 是否已经改变了 el 的定位方式
    });
    el.addEventListener('mousedown', listener, false);
  },
  updated(el, binding) {
    const val = weakmap.get(el);
    val.update(binding.value);
  }
};
/* harmony default export */ const src_directives_v_ripple = (vRipple);
;// CONCATENATED MODULE: ./src/directives/index.ts


// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/button/index.scss
var components_button = __webpack_require__(5482);
;// CONCATENATED MODULE: ./src/components/button/index.scss

      
      
      
      
      
      
      
      
      

var button_options = {};

button_options.styleTagTransform = (styleTagTransform_default());
button_options.setAttributes = (setAttributesWithoutAttributes_default());

      button_options.insert = insertBySelector_default().bind(null, "head");
    
button_options.domAPI = (styleDomAPI_default());
button_options.insertStyleElement = (insertStyleElement_default());

var button_update = injectStylesIntoStyleTag_default()(components_button/* default */.Z, button_options);




       /* harmony default export */ const src_components_button = (components_button/* default */.Z && components_button/* default.locals */.Z.locals ? components_button/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/components/button/index.tsx



const prefixCls = 'skr-button';
// button type 非 default 时覆盖一层白色
const rippleColor = 'rgb(255 255 255 / 15%)';
const Button = defineComponent({
  name: 'SkrButton',
  directives: {
    ripple: src_directives_v_ripple
  },
  props: {
    type: {
      type: String,
      validator: value => ['primary', 'info', 'warning', 'danger', 'default'].includes(value),
      default: 'default'
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
      validator: value => ['mini', 'small', 'normal', 'large'].includes(value),
      default: 'normal'
    },
    // 涟漪效果 object 时参数会透传给 ripple
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  setup(props, {
    slots
  }) {
    const rippleOptions = computed(() => {
      return Object.assign({}, {
        color: props.type === 'default' ? undefined : rippleColor
      }, typeof props.ripple === 'boolean' ? {
        disabled: !props.ripple
      } : props.ripple);
    });
    return () => (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("button", {
      "class": [prefixCls, `${prefixCls}--${props.type}`, {
        [`${prefixCls}--round`]: props.round,
        [`${prefixCls}--shadow`]: props.shadow
      }, `${prefixCls}--${props.size}`]
    }, [slots.default?.()]), [[(0,external_Vue_namespaceObject.resolveDirective)("ripple"), rippleOptions.value]]);
  }
});
/* harmony default export */ const src_components_button_0 = (Button);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/lanhu/record.scss
var record = __webpack_require__(9979);
;// CONCATENATED MODULE: ./src/scripts/lanhu/record.scss

      
      
      
      
      
      
      
      
      

var record_options = {};

record_options.styleTagTransform = (styleTagTransform_default());
record_options.setAttributes = (setAttributesWithoutAttributes_default());

      record_options.insert = insertBySelector_default().bind(null, "head");
    
record_options.domAPI = (styleDomAPI_default());
record_options.insertStyleElement = (insertStyleElement_default());

var record_update = injectStylesIntoStyleTag_default()(record/* default */.Z, record_options);




       /* harmony default export */ const lanhu_record = (record/* default */.Z && record/* default.locals */.Z.locals ? record/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/scripts/lanhu/record.tsx








/* 记录看过的产品 */
function _isSlot(s) {
  return typeof s === 'function' || Object.prototype.toString.call(s) === '[object Object]' && !(0,external_Vue_namespaceObject.isVNode)(s);
}
function createRecorder() {
  GM_registerMenuCommand('显示/隐藏 最近项目', function () {
    const next = !(store.recorder_visible ?? true);
    !next && Toast('已隐藏', 1000);
    store.recorder_visible = next;
  });
  createUI();
  function record() {
    const {
      pid
    } = parse();
    if (!pid) return;
    const records = GM_getValue('records', []);
    let old;
    records.find((item, index) => {
      if (item.pid === pid) {
        old = item;
        records.splice(index, 1);
        return true;
      }
      return false;
    });
    // 优化标题显示：当前是无意义标题且有旧标题时优先使用旧标题
    const title = ['蓝湖', '...'].includes(document.title) && old?.title ? old.title : document.title;
    records.push({
      ...old,
      pid,
      title,
      href: location.href
    });
    GM_setValue('records', records);
  }
  return {
    record
  };
}
function createUI() {
  mountComponent({
    setup() {
      const state = reactive({
        recordsVisible: false,
        moreActionsVisible: false,
        // 初始宽度
        width: 160,
        records: useGMvalue('records', [], {
          deep: true
        }),
        unhidden: useGMvalue('unhidden', false),
        passwords: useGMvalue('passwords', {})
      });
      const recorderVisible = useGMvalue('recorder_visible', true);
      const lisRef = ref([]);
      const reversed = computed(() => [...state.records].reverse());
      onMounted(() => {
        watch([() => state.recordsVisible, () => state.moreActionsVisible, () => state.records, () => state.unhidden, recorderVisible], () => {
          nextTick(() => {
            const [first] = lisRef.value;
            if (first) {
              const width = [...first.children].reduce((totalWidth, el) => totalWidth + el.getBoundingClientRect().width, 0);
              state.width = 5 + width; // 左边距
            }
          });
        }, {
          immediate: true,
          flush: 'post'
        });
      });
      function deleteItem(item) {
        const index = state.records.findIndex(record => record.pid === item.pid);
        index > -1 && state.records.splice(index, 1);
      }
      function copy(action, item) {
        let copyString = '';
        const password = state.passwords[item.pid];
        if (action === 'all') {
          copyString += `${item.title}`;
          password && (copyString += ` (密码：${password})`);
          copyString += `\n${item.href}`;
        } else if (action === 'pwd') {
          if (password) {
            copyString += password;
          } else {
            Toast.warning('没有密码！');
          }
        }
        if (!copyString) return;
        GM_setClipboard(copyString, 'text');
        Toast.success('复制成功');
      }
      function editCustomTitle(item) {
        // 取消时不操作
        let result = window.prompt('输入自定义标题，不填则会使用原标题', item.customTitle || item.title || undefined);
        result && (result = result.trim());
        if (result === '') {
          delete item.customTitle;
        } else if (result) {
          item.customTitle = result;
        }
      }
      function setRecordsVisible(visible) {
        state.recordsVisible = visible;
      }
      function setMoreActionsVisible(visible) {
        state.moreActionsVisible = visible;
      }
      return () => {
        let _slot;
        return (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("article", {
          "id": "inject-recorder-ui",
          "onMouseenter": () => {
            setRecordsVisible(true);
          },
          "onMouseleave": () => {
            setRecordsVisible(false);
            setMoreActionsVisible(false);
          }
        }, [(0,external_Vue_namespaceObject.createVNode)(Transition, {
          "name": "inject-slide-fade"
        }, {
          default: () => [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("div", null, [(0,external_Vue_namespaceObject.createVNode)(TransitionGroup, {
            "tag": "ul",
            "name": "inject-slide-hor-fade"
          }, _isSlot(_slot = reversed.value.map((item, index) => (0,external_Vue_namespaceObject.createVNode)("li", {
            "class": {
              'has-pwd': !!state.passwords[item.pid]
            },
            "style": {
              width: `${state.width}px`
            },
            "key": item.pid,
            "ref": el => {
              el && (lisRef.value[index] = el);
            }
          }, [(0,external_Vue_namespaceObject.createVNode)("a", {
            "href": item.href,
            "title": item.customTitle || item.title,
            "target": "_blank"
          }, [item.customTitle || item.title]), (0,external_Vue_namespaceObject.createVNode)("div", {
            "class": "actions",
            "onMouseenter": () => {
              setMoreActionsVisible(true);
            }
          }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
            "title": "移除",
            "round": true,
            "onClick": () => {
              deleteItem(item);
            }
          }, {
            default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\xD7")]
          }), (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
            "title": "左击复制链接和密码；右击复制密码",
            "round": true,
            "onClick": () => {
              copy('all', item);
            },
            "onContextmenu": event => {
              event.preventDefault();
              copy('pwd', item);
            }
          }, _isSlot(IconCopy) ? IconCopy : {
            default: () => [IconCopy]
          }), [[external_Vue_namespaceObject.vShow, state.moreActionsVisible]]), (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
            "title": "添加自定义标题",
            "round": true,
            "onClick": () => {
              editCustomTitle(item);
            }
          }, _isSlot(IconEdit) ? IconEdit : {
            default: () => [IconEdit]
          }), [[external_Vue_namespaceObject.vShow, state.moreActionsVisible]])])]))) ? _slot : {
            default: () => [_slot]
          })]), [[external_Vue_namespaceObject.vShow, reversed.value.length && (state.unhidden || state.recordsVisible)]])]
        }), (0,external_Vue_namespaceObject.createVNode)("div", {
          "class": "control"
        }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
          "class": "view-btn",
          "type": "primary",
          "shadow": true
        }, {
          default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u6253\u5F00\u6700\u8FD1\u9879\u76EE")]
        }), (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
          "onUpdate:modelValue": $event => state.unhidden = $event,
          "type": "checkbox",
          "title": "固定显示"
        }, null), [[external_Vue_namespaceObject.vModelCheckbox, state.unhidden]])])]), [[external_Vue_namespaceObject.vShow, recorderVisible.value]]);
      };
    }
  });
}
const IconCopy = (0,external_Vue_namespaceObject.createVNode)("svg", {
  "viewBox": "0 0 1024 1024",
  "version": "1.1",
  "xmlns": "http://www.w3.org/2000/svg",
  "p-id": "4117",
  "width": "10",
  "height": "10"
}, [(0,external_Vue_namespaceObject.createVNode)("path", {
  "d": "M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z",
  "p-id": "4118"
}, null)]);
const IconEdit = (0,external_Vue_namespaceObject.createVNode)("svg", {
  "class": "icon",
  "viewBox": "0 0 1024 1024",
  "version": "1.1",
  "xmlns": "http://www.w3.org/2000/svg",
  "p-id": "3701",
  "width": "10",
  "height": "10"
}, [(0,external_Vue_namespaceObject.createVNode)("path", {
  "d": "M989.29 161.53L861.47 33.71a90.1 90.1 0 0 0-127.28 0l-69.53 69.53a89.24 89.24 0 0 0-4.29 4.64 29.14 29.14 0 0 0-2.85 2.5L16.83 751.06c-0.35 0.35-0.69 0.71-1 1.07l-0.45 0.52-0.51 0.59-0.54 0.69c-0.12 0.15-0.24 0.3-0.35 0.46s-0.37 0.52-0.56 0.78l-0.28 0.41-0.53 0.81c-0.08 0.14-0.17 0.28-0.26 0.42s-0.31 0.54-0.46 0.82l-0.27 0.47-0.4 0.77-0.27 0.55c-0.11 0.24-0.22 0.48-0.32 0.72s-0.19 0.43-0.28 0.65-0.17 0.43-0.26 0.64l-0.28 0.75c-0.07 0.19-0.13 0.38-0.19 0.57s-0.19 0.56-0.27 0.84l-0.15 0.5c-0.08 0.31-0.17 0.61-0.24 0.92s-0.08 0.32-0.11 0.47q-0.12 0.48-0.21 1l-0.09 0.48c-0.06 0.32-0.11 0.64-0.16 1s0 0.37-0.07 0.55-0.08 0.59-0.11 0.9 0 0.49 0 0.74l-0.06 0.72V987a30 30 0 0 0 30 30h209.77a29.87 29.87 0 0 0 19.06-6.84 30.13 30.13 0 0 0 5-4l604-604 36.69-36.69a30.35 30.35 0 0 0 2.5-2.85 89.24 89.24 0 0 0 4.64-4.29l69.53-69.53a90.1 90.1 0 0 0-0.05-127.27zM236.25 957H68.05V784.7l574-574L812.29 381z m710.62-710.62l-69.53 69.53a30.19 30.19 0 0 1-42.43 0L707.09 188.09a30.19 30.19 0 0 1 0-42.43l69.53-69.53a30 30 0 0 1 42.42 0L946.87 204a30 30 0 0 1 0 42.38z",
  "p-id": "3702"
}, null)]);

;// CONCATENATED MODULE: ./src/scripts/lanhu/password.ts


const marks = new WeakSet();
let observer = null;

/* 填充密码 */
function autofill() {
  // 停止上次观察
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (!location.hash.startsWith('#/item/project/door')) return;
  const {
    pid,
    pwd
  } = parse();
  // 有些链接自带密码 如果保存过密码但链接自带新密码会有问题
  if (!pid || pwd) return;

  // 确认登录按钮
  let confirmEl = null;
  // 密码框
  let passwordEl = null;
  function savePassword() {
    const savedPassword = GM_getValue('passwords', {});
    const password = passwordEl.value;
    GM_setValue('passwords', {
      ...savedPassword,
      [pid]: password
    });
  }
  observer = new MutationObserver((mutationsList, observer) => {
    let filled = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of mutationsList) {
      const [hasConfirmEl, hasPasswordEl] = [$('#project-door .mu-raised-button-wrapper'), $('#project-door .pass input')];
      if (!hasConfirmEl || !hasPasswordEl) continue;
      observer.disconnect();
      confirmEl = hasConfirmEl;
      passwordEl = hasPasswordEl;
      const pidPassword = GM_getValue('passwords', {})[pid];
      // 确保本次内只进行一次操作
      if (filled === false && pidPassword) {
        filled = true;
        passwordEl.value = pidPassword;
        Toast('密码已填写');
        confirmEl.click();
      }

      // 标记已添加事件的元素
      if (marks.has(confirmEl)) break;
      marks.add(confirmEl);

      // 点击后保存密码
      confirmEl.addEventListener('mousedown', savePassword);
      // 回车键保存密码
      passwordEl.addEventListener('keydown', event => {
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

;// CONCATENATED MODULE: ./src/scripts/lanhu/index.ts





async function main() {
  if (!checker()) return;
  let app;
  // 不确保一次可以获取到
  while (!app) {
    app = $('.whole')?.__vue__;
    await sleep(500);
  }
  const recorder = createRecorder();
  app.$watch('$route', function () {
    autofill();
    // 蓝湖title是动态获取的，可能有延时，延时处理
    setTimeout(recorder.record, 500);
  }, {
    immediate: true
  });
}
main();
})();

/******/ })()
;