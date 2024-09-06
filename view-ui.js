// ==UserScript==
// @name         View UI v4 文档辅助
// @version      1.0.5
// @description  (原iView)隐藏文档中菜单项：Pro、物料
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @match        *://v4.iviewui.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://unpkg.com/vue@3/dist/vue.runtime.global.prod.min.js
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

/***/ 8850:
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
___CSS_LOADER_EXPORT___.push([module.id, ".app-left .ivu-menu .ivu-menu-item[data-visible=hidden]{display:none}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 848:
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
___CSS_LOADER_EXPORT___.push([module.id, ":root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgb(24 144 255 / 20%);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);--skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);--skr-ripple-color: rgb(138 218 255 / 20%)}#hide-menu-control-js{bottom:40px;contain:content;left:0;padding:10px 0;position:fixed;z-index:50}#hide-menu-control-js p{writing-mode:vertical-lr}", ""]);
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

;// CONCATENATED MODULE: ./src/utils/log.ts
const isDebug = "production" !== 'production';
function warn(...args) {
  isDebug && warn.force(...args);
}
warn.force = function (...args) {
  console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args);
};
function error(...args) {
  isDebug && error.force(...args);
}
error.force = function (...args) {
  console.error('%c      error      ', 'background: red; padding: 1px; color: #fff;', ...args);
};
function table(...args) {
  isDebug && console.table(...args);
}

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/view-ui/hide.lazy.scss
var hide_lazy = __webpack_require__(8850);
;// CONCATENATED MODULE: ./src/scripts/view-ui/hide.lazy.scss

      var exported = {};

      
      
      
      
      
      
      
      
      if (hide_lazy/* default */.Z && hide_lazy/* default.locals */.Z.locals) {
              exported.locals = hide_lazy/* default.locals */.Z.locals;
            }
            

var refs = 0;
var hide_lazy_update;
var hide_lazy_options = {};

hide_lazy_options.styleTagTransform = (styleTagTransform_default());
hide_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      hide_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
hide_lazy_options.domAPI = (styleDomAPI_default());
hide_lazy_options.insertStyleElement = (insertStyleElement_default());

exported.use = function(insertOptions) {
  hide_lazy_options.options = insertOptions || {};

  if (!(refs++)) {
    hide_lazy_update = injectStylesIntoStyleTag_default()(hide_lazy/* default */.Z, hide_lazy_options);
  }

  return exported;
};
exported.unuse = function() {
  if (refs > 0 && !--refs) {
    hide_lazy_update();
    hide_lazy_update = null;
  }
};




       /* harmony default export */ const view_ui_hide_lazy = (exported);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/view-ui/ui.scss
var ui = __webpack_require__(848);
;// CONCATENATED MODULE: ./src/scripts/view-ui/ui.scss

      
      
      
      
      
      
      
      
      

var ui_options = {};

ui_options.styleTagTransform = (styleTagTransform_default());
ui_options.setAttributes = (setAttributesWithoutAttributes_default());

      ui_options.insert = insertBySelector_default().bind(null, "head");
    
ui_options.domAPI = (styleDomAPI_default());
ui_options.insertStyleElement = (insertStyleElement_default());

var ui_update = injectStylesIntoStyleTag_default()(ui/* default */.Z, ui_options);




       /* harmony default export */ const view_ui_ui = (ui/* default */.Z && ui/* default.locals */.Z.locals ? ui/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/scripts/view-ui/ui.tsx






mountComponent({
  setup() {
    const hidden = useGMvalue('menu_hidden', false);
    watchEffect(() => {
      hidden.value ? view_ui_hide_lazy.use() : view_ui_hide_lazy.unuse();
    });
    function toggle() {
      hidden.value = !hidden.value;
    }
    return () => (0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
      "id": "hide-menu-control-js",
      "size": "mini",
      "shadow": true,
      "onClick": toggle
    }, {
      default: () => [(0,external_Vue_namespaceObject.createVNode)("p", null, [(0,external_Vue_namespaceObject.createTextVNode)("\u5207\u6362")])]
    });
  }
});
;// CONCATENATED MODULE: ./src/scripts/view-ui/index.ts



function main() {
  // 物料
  const storeBadge = '.navigate-item-badge-store';
  // pro
  const proBadge = '.navigate-item-badge-pro';
  const prefixSelector = '.app-left .ivu-menu ';
  const selector = Array.from([storeBadge, proBadge], item => prefixSelector + item).join();
  const badgeEls = $$(selector);
  warn(selector, badgeEls);
  badgeEls.forEach(el => {
    let {
      parentElement
    } = el;
    while (parentElement) {
      const {
        tagName
      } = parentElement;
      if (tagName === 'A' && parentElement.classList.contains('ivu-menu-item')) {
        // 添加标记
        parentElement.dataset.visible = 'hidden';
        break;
      }
      if (tagName === 'BODY') break;
      parentElement = parentElement.parentElement;
    }
  });
}
setTimeout(main, 500);
})();

/******/ })()
;