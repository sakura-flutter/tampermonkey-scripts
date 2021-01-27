// ==UserScript==
// @name         百度贴吧签到
// @version      3.2.1
// @description  网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome >= Latest
// @compatible   firefox >= Latest
// @run-at       document-end
// @match        https://tieba.baidu.com/index.html
// @match        https://tieba.baidu.com
// @connect      tieba.baidu.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/md5/dist/md5.min.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/vue.runtime.global.prod.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=862073
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 482:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-button{line-height:1.5715;border:1px solid;border-radius:2px;cursor:pointer;box-shadow:var(--skr-button-box-shadow);transition:var(--skr-button-transition)}.skr-button:focus:not(:focus-visible){outline:0}.skr-button:hover{filter:brightness(1.15)}.skr-button--primary{color:var(--skr-text-inverse-color);background-color:var(--skr-primary-color);border-color:var(--skr-primary-color)}.skr-button--default{color:var(--skr-text-primary-color);background-color:var(--skr-white-color);border-color:var(--skr-border-color)}.skr-button--default:hover{filter:brightness(1);color:var(--skr-primary-color);border-color:currentColor}.skr-button--round{border-radius:50%}.skr-button--shadow{box-shadow:var(--skr-box-shadow-normal)}.skr-button--mini{padding:2px 7px;font-size:12px}.skr-button--small{padding:4px 8px;font-size:12px}.skr-button--normal{padding:4px 15px;font-size:14px}.skr-button--large{padding:10px 20px;font-size:15px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 261:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-input{margin-top:5px;width:100%;padding-left:8px;padding-right:8px;border:1px solid #d9d9d9;transition:all .3s}.skr-input:hover,.skr-input:focus{border-color:var(--skr-primary-color)}.skr-input:focus{box-shadow:0 0 0 2px var(--skr-primary-lighten-color)}.skr-input--small{padding-top:2px;padding-bottom:2px}.skr-input--small.skr-input--scale:focus{padding-top:6px;padding-bottom:6px;font-size:14px}.skr-input--normal{padding-top:6px;padding-bottom:6px}.skr-input--large{padding-top:10px;padding-bottom:10px}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 443:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".skr-ripple-container{contain:strict;position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;padding:0 !important;margin:0 !important;pointer-events:none !important;border-radius:inherit !important}.skr-ripple{contain:layout;position:absolute;padding:0 !important;margin:0 !important;border-radius:100%;transform:scale(0);pointer-events:none;background:var(--skr-ripple-color);transition:opacity 2s cubic-bezier(0.23, 1, 0.32, 1);animation:skr-ripple forwards cubic-bezier(0.23, 1, 0.32, 1)}@keyframes skr-ripple{to{transform:scale(3)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 596:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgba(24, 144, 255, 0.2);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgba(0, 0, 0, 0.15);--skr-box-shadow-normal: 0 1px 6px rgba(0, 0, 0, 0.2);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);--skr-ripple-color: rgb(138 218 255 / 20%)}#inject-sign{--container-width: 19vw;--container-right: 10px;box-sizing:border-box;color:var(--skr-text-regular-color)}#inject-sign [class*=skr-]{box-sizing:border-box}#inject-sign.normal,#inject-sign.large{--container-width: 21vw}#inject-sign *::-webkit-scrollbar{width:8px;height:8px;background:#f2f2f2}#inject-sign *::-webkit-scrollbar-thumb{border:0;background:#c1c1c1}#inject-sign a{color:var(--skr-primary-color)}#inject-sign button{background-image:none}#inject-sign.forums-hide .forums-container{bottom:0;transform:translateY(calc(100% - 35px))}#inject-sign.forums-hide .control{bottom:40px}#inject-sign.cover .forums-container{z-index:9999}#inject-sign .control{position:fixed;contain:content;display:flex;z-index:500;bottom:12px;right:max(calc(var(--container-right) + var(--container-width) / 2), 150px);transform:translateX(50%);align-items:center;user-select:none;transition:bottom .3s,right .15s}#inject-sign .control label{margin-left:8px;height:20px;text-shadow:0 1px 3px #fff;cursor:pointer}#inject-sign .control input{margin-right:4px;vertical-align:text-top}#inject-sign .control .label-wrap{display:inline-flex;flex-wrap:wrap;flex:1;max-width:156px;margin-left:10px}#inject-sign .forums-container{position:fixed;contain:content;display:flex;flex-direction:column;z-index:2;bottom:60px;right:var(--container-right);width:var(--container-width);min-width:280px;max-height:calc(100vh - 124px);box-shadow:0 2px 4px rgba(0,0,0,.2);background:#fafafa;padding:5px;transition:transform .3s,bottom .3s,width .15s,box-shadow .3s}#inject-sign .forums-container:hover{box-shadow:0 2px 4px 3px rgba(0,0,0,.1)}#inject-sign header{display:flex;margin-bottom:4px}#inject-sign .reverse-btn{flex:1;text-align:center}#inject-sign .resize-btn{flex:none;margin-left:4px}#inject-sign ul{overflow-x:hidden}#inject-sign ul.small li{height:24px}#inject-sign ul.normal li{height:28px;font-size:13px}#inject-sign ul.large li{height:32px;font-size:14px}#inject-sign li{display:flex;border-bottom:1px solid rgba(221,221,221,.4);cursor:default;transition:height .15s}#inject-sign li:hover{background-color:#f0f8ff}#inject-sign li>*{line-height:2.325em}#inject-sign li a{flex:1;padding-left:.2em;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}#inject-sign li .signed{width:.9em}#inject-sign li .level{width:2.4em}#inject-sign li .gain{width:1.8em}#inject-sign li .exp{flex:none;width:6.7em}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
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
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
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
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {

;// CONCATENATED MODULE: ./src/utils/base.js
function throttle(fn, delay) {
  let t = null;
  let begin = Date.now();
  return function (...args) {
    const self = this;
    const cur = Date.now();
    clearTimeout(t);

    if (cur - begin >= delay) {
      fn.apply(self, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
        fn.apply(self, args);
      }, delay);
    }
  };
}
function once(fn) {
  let called = false;
  return function (...args) {
    if (called === false) {
      called = true;
      return fn.apply(this, args);
    }
  };
}
/**
 * 延时
 * @param {number} ms 毫秒数
 */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function isFunction(value) {
  return typeof value === 'function';
}
;// CONCATENATED MODULE: ./src/utils/querystring.js
/**
 * 解析querystring
 * @param {string} href 或 带有参数格式的string；有search则不再hash
 * @return {object}
 */
function parse(href = location.href) {
  if (!href) return {};
  let search;

  try {
    // 链接
    const url = new URL(href);
    ({
      search
    } = url); // 主要处理对hash的search

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

  const searchParams = new URLSearchParams(search);
  return [...searchParams.entries()].reduce((acc, [key, value]) => (acc[key] = value, acc), {});
}
function stringify(obj) {
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
}
;// CONCATENATED MODULE: ./src/utils/queue.js
class Queue {
  // 默认同时进行5个任务
  constructor({
    tasks,
    limit = 5
  }) {
    this._tasks = [...tasks];
    this._limit = limit; // 当前执行数

    this._count = 0; // 任务数

    this._tasksCount = tasks.length; // 已完成数

    this._finishedCount = 0;
  }

  run() {
    return new Promise(resolve => {
      if (this._tasksCount === 0) {
        resolve();
        return;
      }

      const {
        _tasks
      } = this;

      const _run = function () {
        const idle = Math.min(_tasks.length, this._limit - this._count);

        for (let i = 0; i < idle; i++) {
          this._count++;

          const task = _tasks.shift();

          task().finally(() => {
            this._count--;
            this._finishedCount++;

            if (this._finishedCount < this._tasksCount) {
              _run();
            } else {
              resolve();
            }
          });
        }
      }.bind(this);

      _run();
    });
  }

}
;// CONCATENATED MODULE: ./src/utils/compatibility.js
/**
 * 兼容性检查
 * @param {object} param0 & param1 版本, notify
 * @return {boolean} 是否通过
 */
function checker({
  chrome = 80,
  firefox = 75,
  notify = true
} = {}) {
  const {
    userAgent
  } = window.navigator;
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/)?.[1];
  const firefoxVersion = userAgent.match(/Firefox\/(\d+)/)?.[1];
  let pass = false;

  if (chromeVersion && chromeVersion >= chrome) {
    pass = true;
  } else if (firefoxVersion && firefoxVersion >= firefox) {
    pass = true;
  }

  if (!pass) {
    notify && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0);
  }

  return pass;
}
;// CONCATENATED MODULE: ./src/store/index.js
/**
 * store
 * @param {string} modulename key会加入 [[modulename]]- 前缀
 * @param {boolean} local 是否本地存储
 * @return {proxy}
 */
function createStore(modulename = '', local = true) {
  const getRealProp = property => modulename ? `[[${modulename}]]-${property}` : property;

  const handler = {
    get(target, property) {
      const realProp = getRealProp(property);
      const value = local ? GM_getValue(realProp) : target[realProp];
      return value;
    },

    set(target, property, value) {
      const realProp = getRealProp(property);
      local ? GM_setValue(realProp, value) : target[realProp] = value;
      return true;
    },

    deleteProperty(target, property) {
      const realProp = getRealProp(property);
      local ? GM_deleteValue(realProp) : delete target[realProp];
      return true;
    }

  };
  const store = new Proxy({}, handler);
  return store;
}

/* harmony default export */ const store = (createStore());

;// CONCATENATED MODULE: ./src/scripts/tieba/signature.js
/* global MD5 */
const FAKE_VERSION = '11.8.8.0';
function makeFakeParams(obj) {
  return Object.assign({
    _client_type: 4,
    // prohibit
    _client_version: FAKE_VERSION,
    _phone_imei: '0'.repeat(15),
    model: 'HUAWEI P40',
    // HUAWEI加油 ヾ(◍°∇°◍)ﾉﾞ
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
function signature(payload, isFake = true) {
  if (isFake) {
    payload = makeFakeParams(payload);
  }

  const sortKeys = Object.keys(payload).sort();
  let str = sortKeys.reduce((acc, key) => acc += `${key}=${payload[key]}`, '');
  str += 'tiebaclient!!!';
  return MD5(str);
}
;// CONCATENATED MODULE: ./src/scripts/tieba/api.js


/**
 * 跨域请求，依赖GM_xmlhttpRequest
 * @param {string} url
 * @param {object} options
 */

function GMRequest(url, options) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      timeout: 1000 * 15,
      // 15s超时，0点高峰期失败概率大，BD是1分钟超时，实际上不必等这么久
      ...options,
      url,

      onload(res) {
        try {
          resolve(JSON.parse(res.response));
        } catch (e) {
          resolve(res.response);
        }
      },

      onerror: reject
    });
  });
}

GMRequest.post = function (url, data, options) {
  return GMRequest(url, { ...options,
    data,
    method: 'POST'
  });
};
/**
 * 页面直接发起请求
 * @param {string} url
 * @param {object} options
 */


function request(url, options) {
  return fetch(url, { ...options
  });
}

request.post = function (url, data, options = {}) {
  options.headers = Object.assign({}, options.headers);

  if (data) {
    let body = data;

    if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded') && Object.prototype.toString.call(data) === '[object Object]') {
      body = stringify(data);
    }

    if (options.headers['Content-Type'].includes('application/json') && Object.prototype.toString.call(data) === '[object Object]') {
      body = JSON.stringify(data);
    }

    options.body = body;
  }

  return request(url, { ...options,
    method: 'POST'
  });
};
/* web接口 */
// 获取关注列表


function getNewmoindex() {
  return request.post('/mo/q/newmoindex');
}
function doWebSign(params) {
  return request.post('/sign/add', {
    ie: 'utf-8',
    ...params
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
}
/* app接口 */
// 获取关注列表

function getForumLike(params) {
  // 签名处理
  params = makeFakeParams(params);
  const paramsSigned = { ...params,
    sign: signature(params)
  };
  return GMRequest.post('http://c.tieba.baidu.com/c/f/forum/like', stringify(paramsSigned), {
    headers: {
      'User-agent': `bdtb for Android ${FAKE_VERSION}`,
      Accept: '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip',
      Cookie: 'ka=open'
    }
  });
}
function api_doSign(params) {
  params = makeFakeParams(params);
  const paramsSigned = { ...params,
    sign: signature(params)
  };
  return GMRequest.post('http://c.tieba.baidu.com/c/c/forum/sign', stringify(paramsSigned), {
    headers: {
      'User-agent': `bdtb for Android ${FAKE_VERSION}`,
      Accept: '',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip',
      Cookie: 'ka=open'
    }
  });
}
;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
;// CONCATENATED MODULE: ./src/composables/use-gm-value.js

/**
 * 同GM_getValue、GM_setValue
 * @param {string} name
 * @param {any} defaultValue
 * @param {boolean | object} options: listening, deep
 * @return {any}
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
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/input/index.scss
var input = __webpack_require__(261);
;// CONCATENATED MODULE: ./src/components/input/index.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(input/* default */.Z, options);



/* harmony default export */ const components_input = (input/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/components/input/index.js



const prefixCls = 'skr-input';
const Input = (0,external_Vue_namespaceObject.defineComponent)({
  name: 'SkrInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      validator: value => ['small', 'normal', 'large'].includes(value),
      default: 'normal'
    },
    scale: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],

  setup(props, {
    emit
  }) {
    return () => (0,external_Vue_namespaceObject.createVNode)("input", {
      "class": [prefixCls, `${prefixCls}--${props.size}`, {
        [`${prefixCls}--scale`]: props.scale
      }],
      "value": props.modelValue,
      "type": "text",
      "onInput": event => emit('update:modelValue', event.target.value)
    }, null);
  }

});
/* harmony default export */ const src_components_input = (Input);
;// CONCATENATED MODULE: ./src/directives/v-ripple/utils.js
/**
 * 计算一个点离矩形中心点的距离
 * @param {number} width 矩形宽
 * @param {number} height 矩形高
 * @return {function} function(left top 在矩形内点的坐标) @return {number} 距离
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
 * 例如：value:50 extent:100 则计算50在0-100中的位置返回1
 * value:0或100 extent:100 返回0
 * @param {number} value 当前值
 * @param {number} extent 总值
 * @return {number} 取值0-1
 */

function closeness(value, extent) {
  if (!value || !extent) return 0;
  const half = extent / 2;
  return value <= half ? value / half : 1 - value / extent;
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/directives/v-ripple/index.scss
var v_ripple = __webpack_require__(443);
;// CONCATENATED MODULE: ./src/directives/v-ripple/index.scss

            

var v_ripple_options = {};

v_ripple_options.insert = "head";
v_ripple_options.singleton = false;

var v_ripple_update = injectStylesIntoStyleTag_default()(v_ripple/* default */.Z, v_ripple_options);



/* harmony default export */ const directives_v_ripple = (v_ripple/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/directives/v-ripple/index.js


const containerClassname = 'skr-ripple-container';
const rippleClassname = 'skr-ripple';
const vmap = new WeakMap();
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

function checkOptions(options = {}) {
  if (typeof options === 'boolean') {
    return {
      disabled: !options
    };
  }

  return options;
}
/**
 * 添加涟漪效果
 * @param {object} options color颜色 disabled禁用   布尔值时false为禁用
 */


const addRippleEffect = function (options = {}) {
  options = checkOptions(options); // 涟漪个数

  let count = 0;

  function listener(event) {
    if (options.disabled) return;
    const {
      currentTarget
    } = event; // 优化: 处理过后不再调用getComputedStyle

    if (vmap.get(currentTarget).position === false) {
      vmap.get(currentTarget).position = true; // 注意：会改变当前元素定位方式

      if (getComputedStyle(currentTarget).position === 'static') {
        currentTarget.style.position = 'relative';
      }
    }

    const rect = currentTarget.getBoundingClientRect();
    const rippleEl = createRippleEl(); // 取元素长的一边作为涟漪的周长

    const side = Math.max(rect.width, rect.height);
    const radius = side / 2; // 鼠标在元素中的坐标

    const left = event.pageX - rect.left - window.scrollX;
    const top = event.pageY - rect.top - window.scrollY; // 选项加入到元素中

    rippleEl.style.background = options.color;
    rippleEl.style.width = side + 'px';
    rippleEl.style.height = side + 'px'; // 元素定位再各减自身的宽高一半

    rippleEl.style.top = top - radius + 'px';
    rippleEl.style.left = left - radius + 'px'; // 动画在元素中间扩散时基础时长1.5s，当点击范围处于元素边缘时，动画扩散比在元素中间位置要长，所以要加快动画进行

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
          rippleEl.style.opacity = 0;
        }, 100);
      };

      leaveEvents.forEach(eventname => currentTarget.addEventListener(eventname, listener));
      return () => {
        leaveEvents.forEach(eventname => currentTarget.removeEventListener(eventname, listener));
      };
    })(); // 移除涟漪元素


    rippleEl.addEventListener('transitionend', transEvent => {
      if (transEvent.propertyName === 'opacity') {
        unlisten();
        rippleEl.remove(); // 没有涟漪元素时移除容器

        if (--count <= 0) {
          container.remove();
        }
      }
    });
  } // 更新配置项


  function update(newOpts) {
    options = Object.assign({}, options, checkOptions(newOpts));
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
    vmap.set(el, {
      listener,
      update,
      // 更新配置项函数
      position: false // 是否已经改变了el的定位方式

    });
    el.addEventListener('mousedown', listener, false);
  },

  updated(el, binding) {
    const val = vmap.get(el);
    val.update(binding.value);
  }

};
/* harmony default export */ const src_directives_v_ripple = (vRipple);
;// CONCATENATED MODULE: ./src/directives/index.js

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/components/button/index.scss
var components_button = __webpack_require__(482);
;// CONCATENATED MODULE: ./src/components/button/index.scss

            

var button_options = {};

button_options.insert = "head";
button_options.singleton = false;

var button_update = injectStylesIntoStyleTag_default()(components_button/* default */.Z, button_options);



/* harmony default export */ const src_components_button = (components_button/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/components/button/index.js






const button_prefixCls = 'skr-button'; // button type非default时覆盖一层白色

const rippleColor = 'rgb(255 255 255 / 15%)';
const Button = (0,external_Vue_namespaceObject.defineComponent)({
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
    // 涟漪效果 object时参数会透传给ripple
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  setup(props, {
    slots
  }) {
    const rippleOptions = (0,external_Vue_namespaceObject.computed)(() => {
      return Object.assign({}, {
        color: props.type === 'default' ? undefined : rippleColor
      }, typeof props.ripple === 'boolean' ? {
        disabled: !props.ripple
      } : props.ripple);
    });
    return () => (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("button", {
      "class": [button_prefixCls, `${button_prefixCls}--${props.type}`, {
        [`${button_prefixCls}--round`]: props.round,
        [`${button_prefixCls}--shadow`]: props.shadow
      }, `${button_prefixCls}--${props.size}`]
    }, [slots.default()]), [[(0,external_Vue_namespaceObject.resolveDirective)("ripple"), rippleOptions.value]]);
  }

});
/* harmony default export */ const src_components_button_0 = (Button);
;// CONCATENATED MODULE: ./src/components/index.js


// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/tieba/ui.scss
var ui = __webpack_require__(596);
;// CONCATENATED MODULE: ./src/scripts/tieba/ui.scss

            

var ui_options = {};

ui_options.insert = "head";
ui_options.singleton = false;

var ui_update = injectStylesIntoStyleTag_default()(ui/* default */.Z, ui_options);



/* harmony default export */ const tieba_ui = (ui/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/scripts/tieba/ui.js









/* eslint-disable camelcase */

function createUI({
  store,
  runByBDUSS,
  runByWeb
}) {
  // 兼容性：名称字段更换 middle -> normal
  if (store.size === 'middle') {
    store.size = 'normal';
  }

  const sizeTick = function* () {
    const sizes = ['small', 'normal', 'large'];
    let currSize = store.size ?? 'small';
    let index = sizes.findIndex(v => v === currSize);

    while (true) {
      index >= sizes.length && (index = 0);
      currSize = sizes[index++];
      store.size = currSize;
      yield currSize;
    }
  }();

  const app = (0,external_Vue_namespaceObject.createApp)({
    setup() {
      const state = (0,external_Vue_namespaceObject.reactive)({
        loading: false,
        size: sizeTick.next().value,
        isSimulate: false,
        isReverse: store.is_reverse || false,
        likeForums: [],
        keyword: useGMvalue('keyword', ''),
        isComplete: useGMvalue('is_complete', false),
        isForumsHide: useGMvalue('is_forums_hide', false),
        isCover: useGMvalue('is_cover', false)
      });
      const diaplayForums = (0,external_Vue_namespaceObject.computed)(() => {
        let ectype = [...state.likeForums];
        state.isReverse && ectype.reverse();

        if (state.keyword) {
          // 忽略大小写
          ectype = ectype.filter(forum => forum.forum_name.toUpperCase().includes(state.keyword.toUpperCase()));
        }

        return ectype;
      });
      const counter = (0,external_Vue_namespaceObject.computed)(() => ({
        total: state.likeForums.length,
        sign: state.likeForums.filter(({
          is_sign
        }) => is_sign).length
      })); // 勾选模拟APP并且确认有BDUSS 才算开启

      if (store.is_simulate && store.BDUSS) {
        state.isSimulate = true;
      } // 自动签到


      if (state.isComplete) {
        run();
      }

      function run() {
        state.loading = true; // TODO: 应该有更好的实现方法

        const exportApi = {
          updateLikeForum,
          checkUnsign
        };
        (state.isSimulate ? runByBDUSS : runByWeb)(exportApi).finally(() => {
          state.loading = false;
        });
      }

      function setLikeForums(forums) {
        state.likeForums = [...forums];
      }

      function updateLikeForum(fid, forum) {
        const index = state.likeForums.findIndex(item => +fid === +item.forum_id);
        if (index === -1) return;
        const target = { ...state.likeForums[index],
          ...forum
        };

        if (forum.sign_bonus_point) {
          target.user_exp = Number(target.user_exp) + Number(forum.sign_bonus_point);
        }

        state.likeForums.splice(index, 1, target);
      } // 未签到的靠前


      function checkUnsign() {
        state.likeForums.sort((a, b) => {
          if (!a.is_sign && b.is_sign) return -1;
          return 0;
        });
      }

      function changeReverse() {
        state.isReverse = !state.isReverse;
        store.is_reverse = state.isReverse;
      }

      function changeSize() {
        state.size = sizeTick.next().value;
      }

      function onSimulateChange({
        target: {
          checked
        }
      }) {
        store.is_simulate = checked;
        if (!checked) return;
        const {
          BDUSS
        } = store;
        const result = window.prompt('请输入F12->Application->Cookies中的BDUSS', BDUSS || undefined);

        if (result) {
          store.BDUSS = result;
          location.reload();
        } else {
          (0,external_Vue_namespaceObject.nextTick)(() => {
            state.isSimulate = false;
            store.is_simulate = false;
          });
        }
      }

      return { ...(0,external_Vue_namespaceObject.toRefs)(state),
        diaplayForums,
        counter,
        run,
        setLikeForums,
        updateLikeForum,
        checkUnsign,
        changeReverse,
        changeSize,
        onSimulateChange
      };
    },

    render() {
      const {
        loading,
        size,
        isForumsHide,
        isCover,
        isReverse,
        counter,
        likeForums,
        diaplayForums,
        run,
        changeReverse,
        changeSize,
        onSimulateChange
      } = this;

      function expTitle(item) {
        const MAX_EXP_DAILY = 8;
        const needed = item.levelup_score - item.user_exp;
        return `距离升级还需要${needed}经验，若每天+${MAX_EXP_DAILY}，还需要${Math.ceil(needed / MAX_EXP_DAILY)}天`;
      }

      return (0,external_Vue_namespaceObject.createVNode)("div", {
        "id": "inject-sign",
        "class": {
          'forums-hide': isForumsHide,
          cover: isCover,
          [size]: true
        }
      }, [(0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "control"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "disabled": loading,
        "type": "primary",
        "shadow": true,
        "onClick": run
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u4E00\u952E\u7B7E\u5230")]
      }), (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "label-wrap"
      }, [(0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "模拟APP签到可以获得与APP相同的经验，比网页签到经验更多，也提供更多功能，但需要BDUSS，重新登录后需要再次输入，请网上搜索获得方法，不勾选则通过网页签到，此时不需要BDUSS"
      }, [(0,external_Vue_namespaceObject.createVNode)("input", {
        "checked": this.isSimulate,
        "type": "checkbox",
        "onChange": onSimulateChange
      }, null), (0,external_Vue_namespaceObject.createTextVNode)("\u6A21\u62DFAPP")]), (0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "下次进入贴吧时自动签到，建议同时勾选模拟APP"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => this.isComplete = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, this.isComplete]]), (0,external_Vue_namespaceObject.createTextVNode)("\u81EA\u52A8\u7B7E\u5230")]), likeForums.length > 0 && (0,external_Vue_namespaceObject.createVNode)(external_Vue_namespaceObject.Fragment, null, [(0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "列表将缩到底部"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => this.isForumsHide = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, this.isForumsHide]]), (0,external_Vue_namespaceObject.createTextVNode)("\u9690\u85CF\u5217\u8868")]), (0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "覆盖在页面上显示"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => this.isCover = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, this.isCover]]), (0,external_Vue_namespaceObject.createTextVNode)("\u9632\u6B62\u906E\u6321")])])])]), likeForums.length > 0 && (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "forums-container"
      }, [(0,external_Vue_namespaceObject.createVNode)("header", {
        "class": "top-btns"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "class": "reverse-btn",
        "size": "mini",
        "onClick": changeReverse
      }, {
        default: () => [isReverse ? '已倒序' : '普通', (0,external_Vue_namespaceObject.createVNode)("span", {
          "title": "已签/总数"
        }, [counter.sign, (0,external_Vue_namespaceObject.createTextVNode)("/"), counter.total])]
      }), (0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "class": "resize-btn",
        "size": "mini",
        "onClick": changeSize
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u5927\u5C0F")]
      })]), (0,external_Vue_namespaceObject.createVNode)("ul", {
        "class": {
          [size]: true
        }
      }, [diaplayForums.map(item => (0,external_Vue_namespaceObject.createVNode)("li", {
        "key": item.forum_id
      }, [(0,external_Vue_namespaceObject.createVNode)("a", {
        "href": '/f?kw=' + item.forum_name,
        "title": item.forum_name,
        "target": "_blank"
      }, [item.forum_name]), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "signed"
      }, [item.is_sign ? ' √' : '']), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "level",
        "title": item.level_name
      }, [item.user_level, (0,external_Vue_namespaceObject.createTextVNode)("\u7EA7")]), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "gain"
      }, [item.sign_bonus_point ? '+' + item.sign_bonus_point : '']), (0,external_Vue_namespaceObject.createVNode)("span", {
        "class": "exp",
        "title": expTitle(item)
      }, [item.user_exp, (0,external_Vue_namespaceObject.createTextVNode)("/"), item.levelup_score])]))]), likeForums.length > 25 && (0,external_Vue_namespaceObject.createVNode)(src_components_input, {
        "modelValue": this.keyword,
        "onUpdate:modelValue": $event => this.keyword = $event,
        "placeholder": "搜索",
        "size": "small",
        "scale": true
      }, null)])]);
    }

  });
  const rootContainer = document.createElement('div');
  const ui = app.mount(rootContainer);
  document.body.appendChild(rootContainer);
  return {
    setLikeForums: ui.setLikeForums,
    updateLikeForum: ui.updateLikeForum,
    checkUnsign: ui.checkUnsign
  };
}
;// CONCATENATED MODULE: ./src/scripts/tieba/index.js







/* eslint-disable camelcase */

const $$ = document.querySelectorAll.bind(document); // 页面节点 jquery元素

let $moreforumEl;

async function main() {
  if (!checker()) return;
  const {
    jQuery
  } = unsafeWindow;
  $moreforumEl = jQuery('#moreforum'); // 未登录时删除已有的BDUSS

  if (!$moreforumEl.length) {
    delete store.BDUSS;
    delete store.is_complete;
    return;
  }

  let likeForums = null;

  if (store.BDUSS) {
    try {
      likeForums = await getLikeForums();
    } catch (error) {
      console.error(error);
      Toast.error('获取贴吧列表失败。。请刷新重试~', 0);
    }
  }

  const ui = createUI({
    store: store,
    runByBDUSS,
    runByWeb
  });

  if (likeForums) {
    ui.setLikeForums(likeForums);
    ui.checkUnsign();
  }
} // 界面上无法获得失效的贴吧，这里调用接口获取所有关注的贴吧


async function getLikeForums() {
  const {
    BDUSS
  } = store;
  const tbs = unsafeWindow.PageData.tbs;
  const req2 = {
    BDUSS,
    tbs
  };
  const [like1, like2Map] = await Promise.all([getNewmoindex().then(response => response.json()).then(data => data.data.like_forum), getForumLike(req2).then(data => data.forum_list).then(forum_list => forum_list.reduce((acc, val) => (acc[val.id] = val, acc), {}))]); // 融合数据

  like1.forEach(forum => {
    const {
      forum_id
    } = forum;
    const like2Forum = like2Map[forum_id];
    if (!like2Forum) return;
    Object.assign(forum, {
      levelup_score: like2Forum.levelup_score,
      level_name: like2Forum.level_name,
      slogan: like2Forum.slogan
    });
  }); // 经验降序

  like1.sort((a, b) => b.user_exp - a.user_exp);
  return like1;
} // 通过BDUSS签到 获得经验与客户端签到相同


async function runByBDUSS(ui) {
  // 贴吧必须先触发才能获取剩下贴吧
  $moreforumEl.trigger(new MouseEvent('mouseenter')); // 侧边元素

  const likeUnsignEls = $$('#likeforumwraper .unsign'); // 查看更多元素

  const alwayUnsignEls = $$('#alwayforum-wraper .unsign'); // 关闭面板

  $moreforumEl.trigger(new Event('click'));
  const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]; // 需要重新签到元素（失败时尝试重签）

  const resignEls = [];

  if (!allUnsignEls.length) {
    Toast.success('所有贴吧已经签到');
    return;
  }

  const toast = Toast('开始签到，请等待', 0); // 签到

  function doSign(data) {
    const {
      BDUSS
    } = store;
    const {
      tbs,
      fid,
      kw
    } = data;
    const params = {
      // 以下4个参数 + sign参数 是必选的
      BDUSS,
      tbs,
      fid,
      kw
    };
    return api_doSign(params);
  }

  const tbs = unsafeWindow.PageData.tbs;
  const queue = new Queue({
    // 限制5个任务，大于5个签到失败的概率好像大点了！
    limit: 5,
    tasks: allUnsignEls.map(current => {
      return async function () {
        const {
          kw
        } = parse(current.href);
        const {
          fid
        } = current.dataset;

        try {
          const response = await doSign({
            tbs,
            kw,
            fid
          });
          const {
            error_code,
            error,
            user_info
          } = response; // 贴吧成功码为0 还会出现code为0但error的情况

          if (error_code !== '0' || error) throw response; // 标记为已签到

          user_info.is_sign = true;
          ui.updateLikeForum(fid, user_info); // 替换已签到样式

          current.classList.replace('unsign', 'sign');
        } catch (e) {
          console.error(e); // 重签

          resignEls.push(current);
        } // 客户端签到可以将延时缩短，随机延时一下 50ms以上


        const ms = parseInt(Math.random() * 20 + 50);
        await sleep(ms);
      };
    })
  });
  await queue.run();
  let failCount = 0; // 重签

  while (resignEls.length) {
    const current = resignEls.shift();
    const {
      kw
    } = parse(current.href);
    const {
      fid
    } = current.dataset;

    try {
      const response = await doSign({
        tbs,
        kw,
        fid
      });
      const {
        error_code,
        error,
        user_info
      } = response;
      if (error_code !== '0' || error) throw response;
      user_info.is_sign = true;
      ui.updateLikeForum(fid, user_info);
      current.classList.replace('unsign', 'sign');
    } catch (e) {
      console.error(e);
      failCount++;
      Toast.error(`${decodeURIComponent(kw)} 签到失败`);
    }

    await sleep(500);
  }

  toast.close();
  failCount ? Toast.warning(`签到成功，失败${failCount}个`, 0) : Toast.success('签到成功');
  ui.checkUnsign();
} // 网页签到 经验没客户端那么多 但不需要获得BDUSS只需贴吧已登录即可


async function runByWeb() {
  // 贴吧必须先触发才能获取剩下贴吧
  $moreforumEl.trigger(new MouseEvent('mouseenter')); // 侧边元素

  const likeUnsignEls = $$('#likeforumwraper .unsign'); // 查看更多元素

  const alwayUnsignEls = $$('#alwayforum-wraper .unsign'); // 关闭面板

  $moreforumEl.trigger(new Event('click'));
  const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]; // 需要重新签到元素（失败时尝试重签）

  const resignEls = [];

  if (!allUnsignEls.length) {
    Toast.success('所有贴吧已经签到');
    return;
  }

  const toast = Toast('开始签到，请等待', 0); // 签到

  function doSign(data) {
    return doWebSign(data).then(response => response.json());
  }

  while (allUnsignEls.length) {
    const current = allUnsignEls.shift();
    const {
      kw
    } = parse(current.href);

    try {
      const response = await doSign({
        kw
      });
      const {
        no
      } = response; // 贴吧成功码为0

      if (no !== 0) throw response; // 替换已签到样式

      current.classList.replace('unsign', 'sign');
    } catch (e) {
      console.error(e); // 重签

      resignEls.push(current);
    } // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码2150040


    const ms = parseInt(Math.random() * 500 + 500);
    await sleep(ms);
  }

  let failCount = 0; // 重签

  while (resignEls.length) {
    const current = resignEls.shift();
    const {
      kw
    } = parse(current.href);

    try {
      const response = await doSign({
        kw
      });
      const {
        no
      } = response;
      if (no !== 0) throw response;
      current.classList.replace('unsign', 'sign');
    } catch (e) {
      console.error(e);
      failCount++;
      Toast.error(`${decodeURIComponent(kw)} 签到失败`);
    }

    await sleep(500);
  }

  toast.close();
  failCount ? Toast.warning(`签到成功，失败${failCount}个`, 0) : Toast.success('签到成功');
}

main();
})();

/******/ })()
;