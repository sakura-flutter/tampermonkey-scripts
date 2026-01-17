// ==UserScript==
// @name         百度贴吧签到
// @version      3.4.4
// @description  网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-end
// @match        https://tieba.baidu.com/index.html
// @match        https://tieba.baidu.com/
// @connect      tieba.baidu.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @require      https://unpkg.com/crypto-js@4.2.0/core.js
// @require      https://unpkg.com/crypto-js@4.2.0/md5.js
// @require      https://unpkg.com/vue@3.5.26/dist/vue.runtime.global.prod.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=1081231
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 1511
(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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

/***/ },

/***/ 1988
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8291);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8748);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.skr-ripple-container{border-radius:inherit !important;inset:0;contain:strict;margin:0 !important;overflow:hidden;padding:0 !important;pointer-events:none !important;position:absolute}.skr-ripple{animation:skr-ripple forwards cubic-bezier(0.23, 1, 0.32, 1);background:var(--skr-ripple-color);border-radius:100%;contain:layout;margin:0 !important;padding:0 !important;pointer-events:none;position:absolute;transform:scale(0);transition:opacity 2s cubic-bezier(0.23, 1, 0.32, 1)}@keyframes skr-ripple{to{transform:scale(3)}}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 2077
(module) {



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

/***/ },

/***/ 2932
(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ 4812
(module) {



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

/***/ },

/***/ 6756
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8291);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8748);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.skr-checkbox{cursor:pointer;height:20px;margin-left:8px;text-shadow:0 1px 3px #fff}.skr-checkbox input{margin-right:4px;vertical-align:text-top}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 7296
(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ 7381
(module) {



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
  }

  // For old IE
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
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
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

/***/ },

/***/ 7773
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8291);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8748);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.skr-button{border:1px solid;border-radius:2px;box-shadow:var(--skr-button-box-shadow);cursor:pointer;line-height:1.5715;transition:var(--skr-button-transition)}.skr-button:hover{filter:brightness(1.15)}.skr-button:focus:not(:focus-visible){outline:0}.skr-button--primary{background-color:var(--skr-primary-color);border-color:var(--skr-primary-color);color:var(--skr-text-inverse-color)}.skr-button--default{background-color:var(--skr-white-color);border-color:var(--skr-border-color);color:var(--skr-text-primary-color)}.skr-button--default:hover{border-color:currentcolor;color:var(--skr-primary-color);filter:brightness(1)}.skr-button--round{border-radius:50%}.skr-button--shadow{box-shadow:var(--skr-box-shadow-normal)}.skr-button--mini{font-size:12px;padding:2px 7px}.skr-button--small{font-size:12px;padding:4px 8px}.skr-button--normal{font-size:14px;padding:4px 15px}.skr-button--large{font-size:15px;padding:10px 20px}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 8291
(module) {



module.exports = function (i) {
  return i[1];
};

/***/ },

/***/ 8748
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
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
  };

  // import a list of modules into the list
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

/***/ },

/***/ 9233
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8291);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8748);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgb(24 144 255 / 20%);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgb(0 0 0 / 15%);--skr-box-shadow-normal: 0 1px 6px rgb(0 0 0 / 20%);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgb(0 0 0 / 4.5%);--skr-ripple-color: rgb(138 218 255 / 20%)}#inject-sign{--container-width: 19vw;--container-right: 10px}#inject-sign [class*=skr-]{box-sizing:border-box}#inject-sign{box-sizing:border-box;color:var(--skr-text-regular-color)}#inject-sign.normal,#inject-sign.large{--container-width: 21vw}#inject-sign *::-webkit-scrollbar{background:#f2f2f2;height:8px;width:8px}#inject-sign *::-webkit-scrollbar-thumb{background:#c1c1c1;border:0}#inject-sign a{color:var(--skr-primary-color)}#inject-sign button{background-image:none}#inject-sign .control{align-items:center;bottom:12px;contain:content;display:flex;position:fixed;right:max(var(--container-right) + var(--container-width)/2,150px);transform:translateX(50%);transition:bottom .3s,right .15s;user-select:none;z-index:500}#inject-sign .control .settings{display:inline-flex;flex:1;flex-wrap:wrap;margin-left:10px;max-width:156px}#inject-sign .forums-container{background:#fafafa;bottom:60px;box-shadow:0 2px 4px rgba(0,0,0,.2);contain:content;display:flex;flex-direction:column;max-height:calc(100vh - 124px);min-width:280px;padding:5px;position:fixed;right:var(--container-right);transition:transform .3s,bottom .3s,width .15s,box-shadow .3s;width:var(--container-width);z-index:2}#inject-sign .forums-container:hover{box-shadow:0 2px 4px 3px rgba(0,0,0,.1)}#inject-sign.forums-hide .forums-container{bottom:0;transform:translateY(calc(100% - 35px))}#inject-sign.forums-hide .control{bottom:40px}#inject-sign.cover .forums-container{z-index:9999}#inject-sign header{display:flex;margin-bottom:4px}#inject-sign .reverse-btn{flex:1;text-align:center}#inject-sign .resize-btn{flex:none;margin-left:4px}#inject-sign li{border-bottom:1px solid rgba(221,221,221,.4);cursor:default;display:flex;transition:height .15s}#inject-sign li:hover{background-color:#f0f8ff}#inject-sign li>*{line-height:2.325em}#inject-sign li a{flex:1;overflow:hidden;padding-left:.2em;text-overflow:ellipsis;white-space:nowrap}#inject-sign li .signed{width:.9em}#inject-sign li .level{width:2.4em}#inject-sign li .gain{width:1.8em}#inject-sign li .exp{flex:none;width:6.7em}#inject-sign ul{overflow-x:hidden}#inject-sign ul.small li{height:24px}#inject-sign ul.normal li{font-size:13px;height:28px}#inject-sign ul.large li{font-size:14px;height:32px}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ 9421
(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8291);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8748);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_104_1_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.skr-input{border:1px solid #d9d9d9;margin-top:5px;transition:all .3s;width:100%;padding-left:8px;padding-right:8px}.skr-input:hover,.skr-input:focus{border-color:var(--skr-primary-color)}.skr-input:focus{box-shadow:0 0 0 2px var(--skr-primary-lighten-color)}.skr-input--small{padding-bottom:2px;padding-top:2px}.skr-input--small.skr-input--scale:focus{font-size:14px;padding-bottom:6px;padding-top:6px}.skr-input--normal{padding-bottom:6px;padding-top:6px}.skr-input--large{padding-bottom:10px;padding-top:10px}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }

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

;// ./src/utils/compatibility.ts
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
;// ./src/store/index.ts
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

;// ./src/scripts/tieba/store.ts


// 用来解决类型问题
/* harmony default export */ const tieba_store = (store);
;// ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// ./src/utils/querystring.ts
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
;// ./src/utils/log.ts
const isDebug = "production" !== 'production';
function warn(...args) {
  isDebug && warn.force(...args);
}
warn.force = function (...args) {
  console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args);
};
function log_error(...args) {
  isDebug && log_error.force(...args);
}
log_error.force = function (...args) {
  console.error('%c      error      ', 'background: red; padding: 1px; color: #fff;', ...args);
};
function table(...args) {
  isDebug && console.table(...args);
}

;// ./src/scripts/tieba/utils/request.ts
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


class ResponseError extends Error {
  constructor(msg = '未知错误', response, info) {
    super(msg);
    _defineProperty(this, "name", 'ResponseError');
    this.response = response;
    this.info = info;
  }
}

/**
 * 跨域请求，依赖 GM_xmlhttpRequest
 *
 * 15s 超时，0 点高峰期失败概率大，BD 是 1 分钟超时，实际上不必等这么久
 */
function GMRequest(url, options) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      timeout: 1000 * 15,
      ...options,
      url,
      onload(res) {
        let error;
        let response;
        try {
          response = JSON.parse(res.response);
        } catch {
          response = res.response;
        }
        if (response == null) {
          error = new ResponseError('无响应', response, {
            ...options,
            ...res
          });
        } else if (response?.error_code !== '0') {
          error = new ResponseError(response.error_msg, response, {
            ...options,
            ...res
          });
        }
        error ? reject(error) : resolve(response);
      },
      onerror(error) {
        log_error.force(error);
        reject(error);
      }
    });
  });
}
GMRequest.post = function (url, data, options) {
  return GMRequest(url, {
    ...options,
    data,
    method: 'POST'
  });
};

/**
 * 普通请求
 */
function request(url, options) {
  return fetch(url, options).then(response => response.json()).then(resJson => {
    if (resJson.no !== 0) {
      throw new ResponseError(resJson.error, resJson, {
        url,
        ...options
      });
    }
    return resJson;
  });
}
request.post = function (url, data, options = {}) {
  const headers = new Headers(options.headers);
  let body = data;
  if (data) {
    if (headers.get('Content-Type')?.includes('application/x-www-form-urlencoded') && Object.prototype.toString.call(data) === '[object Object]') {
      body = stringify(data);
    }
    if (headers.get('Content-Type')?.includes('application/json') && Object.prototype.toString.call(data) === '[object Object]') {
      body = JSON.stringify(data);
    }
  }
  return request(url, {
    ...options,
    method: 'POST',
    headers,
    body
  });
};
;// external "CryptoJS.MD5"
const external_CryptoJS_MD5_namespaceObject = CryptoJS.MD5;
var external_CryptoJS_MD5_default = /*#__PURE__*/__webpack_require__.n(external_CryptoJS_MD5_namespaceObject);
;// ./src/scripts/tieba/utils/signature.ts

const FAKE_VERSION = '11.8.8.0';
function makeFakeParams(obj) {
  // 不要动这些字段
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
function sign(payload) {
  const sortKeys = Object.keys(payload).sort();
  let str = sortKeys.reduce((acc, key) => acc += `${key}=${payload[key]}`, '');
  str += 'tiebaclient!!!';
  return external_CryptoJS_MD5_default()(str).toString();
}
function signRequestParams(params, isFake = true) {
  if (isFake) {
    params = makeFakeParams(params);
  }
  const signed = {
    ...params,
    sign: sign(params)
  };
  return signed;
}
;// ./src/scripts/tieba/utils/index.ts




const jQuery = unsafeWindow.jQuery;

/**
 * 获取页面上的元素
 */
function getElementsInPage() {
  const $moreforumEl = jQuery('#moreforum');
  // 必须先触发才能获取剩下的吧
  $moreforumEl.trigger('mouseenter');
  // 侧边的吧
  const likeUnsignEls = $$('#likeforumwraper .unsign');
  const likeSignEls = $$('#likeforumwraper .sign');
  // 查看更多的吧
  const alwayUnsignEls = $$('#alwayforum-wraper .unsign');
  const alwaySignEls = $$('#alwayforum-wraper .sign');
  // 关闭面板
  $moreforumEl.trigger('click');
  const unsigns = [...likeUnsignEls, ...alwayUnsignEls].map(element => {
    const fid = element.dataset.fid;
    const {
      kw
    } = parse(element.href);
    return {
      fid,
      kw,
      element
    };
  });
  const unsignsMap = unsigns.reduce((map, unsign) => {
    // id 与 吧名 作为 key
    return map.set(unsign.fid, unsign.element).set(unsign.kw, unsign.element);
  }, new Map());
  return {
    /** 查看更多按钮 */
    moreForum: $moreforumEl,
    /** 未签到的元素 */
    unsigns,
    /** 签到的元素 */
    signs: [...likeSignEls, ...alwaySignEls],
    setSign(key) {
      // 替换成已签到样式
      unsignsMap.get(key)?.classList.replace('unsign', 'sign');
    }
  };
}

/**
 * 获取 PageData
 */
function getPageData() {
  return unsafeWindow.PageData;
}

/**
 * 编码请求对象的值
 *
 * kw 存在“+”时会有问题
 * fix: https://github.com/sakura-flutter/tampermonkey-scripts/issues/635
 */
function encodeRequestParams(obj) {
  const newObj = {
    ...obj
  };
  newObj.kw && (newObj.kw = encodeURIComponent(newObj.kw));
  return newObj;
}
;// external "Vue"
const external_Vue_namespaceObject = Vue;
;// ./src/composables/use-gm-value.ts


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
;// ./src/utils/mount-component.ts
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
;// ./src/scripts/tieba/api.ts



/**
 *
 * web 接口
 *
 */

/**
 * web 获取关注列表
 */
function getNewmoindex() {
  return request.post('/mo/q/newmoindex');
}

/**
 * web 签到
 */
function doSignWeb(params) {
  const {
    tbs
  } = getPageData();
  return request.post('/sign/add', encodeRequestParams({
    ie: 'utf-8',
    tbs,
    ...params
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
}

/**
 *
 * app 接口
 *
 */

const appCommonHeader = Object.freeze({
  'User-agent': `bdtb for Android ${FAKE_VERSION}`,
  Accept: '',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept-Encoding': 'gzip',
  Cookie: 'ka=open'
});

/**
 * app 获取关注列表
 */
function getForumLike(params) {
  return GMRequest.post('http://c.tieba.baidu.com/c/f/forum/like', stringify(signRequestParams(params)), {
    headers: appCommonHeader
  });
}

/**
 * app 签到
 */
function doSignApp(params) {
  return GMRequest.post('http://c.tieba.baidu.com/c/c/forum/sign', stringify(encodeRequestParams(signRequestParams(params))), {
    headers: appCommonHeader
  });
}

/**
 * app 批量签到
 */
function batchSignApp(params) {
  return GMRequest.post('http://c.tieba.baidu.com/c/c/forum/msign', stringify(signRequestParams(params)), {
    headers: appCommonHeader
  }).then(response => {
    if (response.error.errno !== '0') {
      throw new ResponseError(response.error.usermsg, response);
    }
    return response;
  });
}

/**
 *
 * 合成接口
 *
 */

/**
 * 界面上无法获得失效的贴吧，这里调用接口获取所有关注的贴吧
 */
async function mergeLikeForum() {
  const {
    BDUSS
  } = tieba_store;
  if (!BDUSS) throw new Error('BDUSS 不能为空');
  const {
    tbs
  } = getPageData();
  const req2 = {
    BDUSS,
    tbs
  };
  const [like1, like2Map] = await Promise.all([getNewmoindex().then(data => data.data.like_forum), getForumLike(req2).then(data => data.forum_list).then(forumList => forumList.reduce((acc, val) => (acc[val.id] = val, acc), {}))]);

  // 融合数据
  like1.forEach(forum => {
    const forumId = forum.forum_id;
    const like2Forum = like2Map[forumId];
    if (!like2Forum) return;
    Object.assign(forum, {
      levelup_score: like2Forum.levelup_score,
      level_name: like2Forum.level_name,
      slogan: like2Forum.slogan
    });
  });
  // 经验降序
  like1.sort((a, b) => +b.user_exp - +a.user_exp);
  return like1;
}
;// ./src/utils/queue.ts
function queue_defineProperty(e, r, t) { return (r = queue_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function queue_toPropertyKey(t) { var i = queue_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function queue_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Queue {
  constructor({
    limit = 3
  } = {}) {
    queue_defineProperty(this, "tasks", []);
    /** 当前执行数 */
    queue_defineProperty(this, "count", 0);
    this.limit = limit;
  }

  /** 任务数 */
  get size() {
    return this.tasks.length;
  }
  enqueue(tasks) {
    if (Array.isArray(tasks)) {
      this.tasks.push(...tasks);
    } else {
      this.tasks.push(tasks);
    }
    return this;
  }
  run() {
    return new Promise(resolve => {
      if (this.size === 0) {
        resolve();
        return;
      }
      const {
        tasks
      } = this;
      const _run = function () {
        const idle = Math.min(this.size, this.limit - this.count);
        for (let i = 0; i < idle; i++) {
          this.count++;
          const task = tasks.shift();
          task().finally(() => {
            this.count--;
            if (this.size > 0) {
              _run();
              // fix: 队列为空且当前执行的任务也为空才是结束状态
            } else if (this.size === 0 && this.count === 0) {
              resolve();
            }
          });
        }
      }.bind(this);
      _run();
    });
  }
}
;// ./src/utils/base.ts
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
;// ./src/scripts/tieba/sign.ts
function sign_defineProperty(e, r, t) { return (r = sign_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function sign_toPropertyKey(t) { var i = sign_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function sign_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * 网页签到
 *
 * 经验没客户端那么多，但不需要获得 BDUSS 只需登录即可
 */
class WebTask {
  constructor(options) {
    sign_defineProperty(this, "fail", 0);
    this.kw = options.kw;
  }
  async execute() {
    const {
      kw
    } = this;
    try {
      await doSignWeb({
        kw
      });
      return {
        kw
      };
    } catch (e) {
      // 签过
      if (e.response?.no === 1101) {
        return {
          kw
        };
      }
      this.fail++;
      throw e;
    } finally {
      // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码：2150040
      const ms = ~~(Math.random() * 500 + 600);
      await sleep(ms);
    }
  }
}

/**
 * 模拟客户端签到
 *
 * 获得经验与客户端签到相同，需要获得 BDUSS
 */
class AppTask {
  constructor(options) {
    sign_defineProperty(this, "fail", 0);
    this.fid = options.fid;
    this.kw = options.kw;
    this.BDUSS = options.BDUSS;
  }
  async execute() {
    const {
      fid,
      kw,
      BDUSS
    } = this;
    const {
      tbs
    } = getPageData();
    if (!fid) throw new Error('获取吧 id 为空');
    try {
      const response = await doSignApp({
        BDUSS,
        tbs,
        fid,
        kw
      });
      const {
        user_info
      } = response;
      return {
        fid,
        kw,
        data: {
          ...user_info,
          // 标记为已签到
          is_sign: 1
        }
      };
    } catch (e) {
      // 签过
      if (e.response?.error_code === '160002') {
        return {
          fid,
          kw,
          data: {
            is_sign: 1
          }
        };
      }
      this.fail++;
      throw e;
    } finally {
      // 客户端签到可以将延时缩短，随机延时一下 50ms 以上
      const ms = ~~(Math.random() * 20) + 50;
      await sleep(ms);
    }
  }
}
async function batch(options) {
  const {
    BDUSS,
    forum_ids
  } = options;
  const {
    tbs
  } = getPageData();
  const {
    info
  } = await batchSignApp({
    BDUSS,
    tbs,
    forum_ids: forum_ids.slice(0, 200) // 接口限制最多 200 个
  });
  const newInfo = info.map(item => ({
    forum_id: item.forum_id,
    forum_name: item.forum_name,
    sign_bonus_point: item.cur_score,
    is_sign: 1
  }));
  return newInfo;
}
class Adapter {
  constructor(options) {
    this.options = {
      ...options
    };
    this.options.unsigns = [...this.options.unsigns];
  }

  /**
   * 签到
   * @param mode 签到方式
   * @returns 签到失败列表
   */
  async sign(mode) {
    let Task;
    let limit;
    switch (mode) {
      case 'web':
        Task = WebTask;
        // 网页签到要 1 个个来，太快会被禁止一段时间
        limit = 1;
        break;
      case 'app':
      case 'fast':
        if (!this.options.BDUSS) {
          throw new Error('签到方式为 app 时 BDUSS 不能为空');
        }
        Task = AppTask;
        // 限制 3 个任务，大于 3 个签到失败的概率好像大点了
        limit = 3;
        break;
      default:
        // 类型检查
        return (e => {
          throw new Error(e);
        })(mode);
    }
    const {
      unsigns
    } = this.options;
    if (mode === 'fast') {
      try {
        const data = await batch({
          BDUSS: this.options.BDUSS,
          forum_ids: unsigns.map(unsign => unsign.fid)
        });
        for (let index = unsigns.length - 1; index >= 0; index--) {
          const unsign = unsigns[index];
          const found = data.find(item => item.forum_id === unsign.fid);
          if (found) {
            this.options.onSuccess({
              fid: found.forum_id,
              kw: found.forum_name,
              data: found
            });
            unsigns.splice(index, 1);
          }
        }
      } catch (error) {
        log_error.force('批量签到失败', error);
      }
    }
    warn('待签', unsigns);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const failList = [];
    const queue = new Queue({
      limit
    });
    queue.enqueue(unsigns.map(unsign => {
      const task = new Task({
        fid: unsign.fid,
        kw: unsign.kw,
        BDUSS: this.options.BDUSS
      });
      return async function callback() {
        try {
          const result = await task.execute();
          self.options.onSuccess(result);
        } catch (error) {
          log_error.force('签到失败', error, error.response, error.info);
          // 失败重签 1 次
          if (task.fail <= 1) {
            queue.enqueue(callback);
          } else {
            failList.push(unsign);
          }
        }
      };
    }));
    await queue.run();
    return failList;
  }
}
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@4.0.0_webpack@5.104.1/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(4812);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@4.0.0_webpack@5.104.1/node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7381);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@4.0.0_webpack@5.104.1/node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(1511);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@4.0.0_webpack@5.104.1/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(2932);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@4.0.0_webpack@5.104.1/node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(7296);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/.pnpm/style-loader@4.0.0_webpack@5.104.1/node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(2077);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.104.1/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_f7b9b6eeb235e9c34e895671d59aede2/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@16.0.6_sass-emb_bcbe7ab246d4bc18ed8dda483dca47bd/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/components/checkbox/index.scss
var components_checkbox = __webpack_require__(6756);
;// ./src/components/checkbox/index.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(components_checkbox/* default */.A, options);




       /* harmony default export */ const src_components_checkbox = (components_checkbox/* default */.A && components_checkbox/* default */.A.locals ? components_checkbox/* default */.A.locals : undefined);

;// ./src/components/checkbox/index.tsx


const prefixCls = 'skr-checkbox';
const Checkbox = (0,external_Vue_namespaceObject.defineComponent)({
  name: 'SkrCheckbox',
  props: {
    checked: {
      type: Boolean,
      required: true
    },
    title: String,
    disabled: Boolean
  },
  emits: ['update:checked'],
  setup(props, {
    slots,
    emit
  }) {
    const inputRef = (0,external_Vue_namespaceObject.ref)();
    const handleChange = event => {
      emit('update:checked', event.target.checked);
      // 受控
      inputRef.value.checked = !!props.checked;
    };
    return () => (0,external_Vue_namespaceObject.createVNode)("label", {
      "class": prefixCls,
      "title": props.title
    }, [(0,external_Vue_namespaceObject.createVNode)("input", {
      "ref": inputRef,
      "checked": props.checked,
      "type": "checkbox",
      "disabled": props.disabled,
      "onChange": handleChange
    }, null), slots.default?.()]);
  }
});
/* harmony default export */ const src_components_checkbox_0 = (Checkbox);
;// ./src/directives/v-ripple/utils.ts
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
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.104.1/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_f7b9b6eeb235e9c34e895671d59aede2/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@16.0.6_sass-emb_bcbe7ab246d4bc18ed8dda483dca47bd/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/directives/v-ripple/index.scss
var v_ripple = __webpack_require__(1988);
;// ./src/directives/v-ripple/index.scss

      
      
      
      
      
      
      
      
      

var v_ripple_options = {};

v_ripple_options.styleTagTransform = (styleTagTransform_default());
v_ripple_options.setAttributes = (setAttributesWithoutAttributes_default());
v_ripple_options.insert = insertBySelector_default().bind(null, "head");
v_ripple_options.domAPI = (styleDomAPI_default());
v_ripple_options.insertStyleElement = (insertStyleElement_default());

var v_ripple_update = injectStylesIntoStyleTag_default()(v_ripple/* default */.A, v_ripple_options);




       /* harmony default export */ const directives_v_ripple = (v_ripple/* default */.A && v_ripple/* default */.A.locals ? v_ripple/* default */.A.locals : undefined);

;// ./src/directives/v-ripple/index.ts


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
;// ./src/directives/index.ts


// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.104.1/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_f7b9b6eeb235e9c34e895671d59aede2/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@16.0.6_sass-emb_bcbe7ab246d4bc18ed8dda483dca47bd/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/components/button/index.scss
var components_button = __webpack_require__(7773);
;// ./src/components/button/index.scss

      
      
      
      
      
      
      
      
      

var button_options = {};

button_options.styleTagTransform = (styleTagTransform_default());
button_options.setAttributes = (setAttributesWithoutAttributes_default());
button_options.insert = insertBySelector_default().bind(null, "head");
button_options.domAPI = (styleDomAPI_default());
button_options.insertStyleElement = (insertStyleElement_default());

var button_update = injectStylesIntoStyleTag_default()(components_button/* default */.A, button_options);




       /* harmony default export */ const src_components_button = (components_button/* default */.A && components_button/* default */.A.locals ? components_button/* default */.A.locals : undefined);

;// ./src/components/button/index.tsx



const button_prefixCls = 'skr-button';
// button type 非 default 时覆盖一层白色
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
    // 涟漪效果 object 时参数会透传给 ripple
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
    }, [slots.default?.()]), [[(0,external_Vue_namespaceObject.resolveDirective)("ripple"), rippleOptions.value]]);
  }
});
/* harmony default export */ const src_components_button_0 = (Button);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.104.1/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_f7b9b6eeb235e9c34e895671d59aede2/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@16.0.6_sass-emb_bcbe7ab246d4bc18ed8dda483dca47bd/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/components/input/index.scss
var input = __webpack_require__(9421);
;// ./src/components/input/index.scss

      
      
      
      
      
      
      
      
      

var input_options = {};

input_options.styleTagTransform = (styleTagTransform_default());
input_options.setAttributes = (setAttributesWithoutAttributes_default());
input_options.insert = insertBySelector_default().bind(null, "head");
input_options.domAPI = (styleDomAPI_default());
input_options.insertStyleElement = (insertStyleElement_default());

var input_update = injectStylesIntoStyleTag_default()(input/* default */.A, input_options);




       /* harmony default export */ const components_input = (input/* default */.A && input/* default */.A.locals ? input/* default */.A.locals : undefined);

;// ./src/components/input/index.tsx


const input_prefixCls = 'skr-input';
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
    const handleInput = event => {
      // vue 自带的
      if (!event.target.composing) {
        emit('update:modelValue', event.target.value);
      }
    };
    return () => (0,external_Vue_namespaceObject.createVNode)("input", {
      "class": [input_prefixCls, `${input_prefixCls}--${props.size}`, {
        [`${input_prefixCls}--scale`]: props.scale
      }],
      "value": props.modelValue,
      "type": "text",
      "onInput": handleInput
    }, null);
  }
});
/* harmony default export */ const src_components_input = (Input);
;// ./src/scripts/tieba/ui/ForumList.tsx




const ForumList = (0,external_Vue_namespaceObject.defineComponent)({
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      required: true
    }
  },
  emits: ['clickSize'],
  setup(props, {
    emit
  }) {
    const keyword = useGMvalue('keyword', '');
    const isReverse = useGMvalue('is_reverse', false);
    const diaplayForums = (0,external_Vue_namespaceObject.computed)(() => {
      let newList = [...props.dataSource];
      isReverse.value && newList.reverse();
      if (keyword.value) {
        // 忽略大小写
        newList = newList.filter(forum => new RegExp(keyword.value, 'i').test(forum.forum_name));
      }
      return newList;
    });
    const counter = (0,external_Vue_namespaceObject.computed)(() => ({
      total: props.dataSource.length,
      signed: props.dataSource.filter(({
        is_sign
      }) => is_sign).length
    }));
    function changeReverse() {
      isReverse.value = !isReverse.value;
    }
    function expTitle(item) {
      const MAX_EXP_DAILY = 8;
      const needed = +item.levelup_score - +item.user_exp;
      return `距离升级还需要${needed}经验，若每天+${MAX_EXP_DAILY}，还需要${Math.ceil(needed / MAX_EXP_DAILY)}天`;
    }
    return () => (0,external_Vue_namespaceObject.createVNode)(external_Vue_namespaceObject.Fragment, null, [props.dataSource.length > 0 && (0,external_Vue_namespaceObject.createVNode)("div", {
      "class": "forums-container"
    }, [(0,external_Vue_namespaceObject.createVNode)("header", {
      "class": "top-btns"
    }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
      "class": "reverse-btn",
      "size": "mini",
      "onClick": changeReverse
    }, {
      default: () => [isReverse.value ? '已倒序' : '普通', (0,external_Vue_namespaceObject.createVNode)("span", {
        "title": "\u5DF2\u7B7E/\u603B\u6570"
      }, [counter.value.signed, (0,external_Vue_namespaceObject.createTextVNode)("/"), counter.value.total])]
    }), (0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
      "class": "resize-btn",
      "size": "mini",
      "onClick": () => emit('clickSize')
    }, {
      default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u5927\u5C0F")]
    })]), (0,external_Vue_namespaceObject.createVNode)("ul", {
      "class": {
        [props.size]: true
      }
    }, [diaplayForums.value.map(item => (0,external_Vue_namespaceObject.createVNode)("li", {
      "key": item.forum_id
    }, [(0,external_Vue_namespaceObject.createVNode)("a", {
      "href": '/f?kw=' + encodeURIComponent(item.forum_name),
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
    }, [item.user_exp, (0,external_Vue_namespaceObject.createTextVNode)("/"), item.levelup_score])]))]), props.dataSource.length > 25 && (0,external_Vue_namespaceObject.createVNode)(src_components_input, {
      "modelValue": keyword.value,
      "onUpdate:modelValue": $event => keyword.value = $event,
      "placeholder": "\u641C\u7D22",
      "size": "small",
      "scale": true
    }, null)])]);
  }
});
/* harmony default export */ const ui_ForumList = (ForumList);
// EXTERNAL MODULE: ./node_modules/.pnpm/css-loader@7.1.2_webpack@5.104.1/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/postcss-loader@8.2.0_postcs_f7b9b6eeb235e9c34e895671d59aede2/node_modules/postcss-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@16.0.6_sass-emb_bcbe7ab246d4bc18ed8dda483dca47bd/node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scripts/tieba/ui/index.scss
var ui = __webpack_require__(9233);
;// ./src/scripts/tieba/ui/index.scss

      
      
      
      
      
      
      
      
      

var ui_options = {};

ui_options.styleTagTransform = (styleTagTransform_default());
ui_options.setAttributes = (setAttributesWithoutAttributes_default());
ui_options.insert = insertBySelector_default().bind(null, "head");
ui_options.domAPI = (styleDomAPI_default());
ui_options.insertStyleElement = (insertStyleElement_default());

var ui_update = injectStylesIntoStyleTag_default()(ui/* default */.A, ui_options);




       /* harmony default export */ const tieba_ui = (ui/* default */.A && ui/* default */.A.locals ? ui/* default */.A.locals : undefined);

;// ./src/scripts/tieba/ui/index.tsx












const sizeTick = function* () {
  const sizes = ['small', 'normal', 'large'];
  let currSize = tieba_store.size ?? 'small';
  let index = sizes.findIndex(v => v === currSize);
  while (true) {
    index >= sizes.length && (index = 0);
    currSize = sizes[index++];
    tieba_store.size = currSize;
    yield currSize;
  }
}();
function createUI() {
  mountComponent({
    setup() {
      const state = (0,external_Vue_namespaceObject.reactive)({
        loading: false,
        size: sizeTick.next().value,
        likeForums: []
      });
      const isSimulate = useGMvalue('is_simulate', false);
      const isForumsHide = useGMvalue('is_forums_hide', false);
      const isComplete = useGMvalue('is_complete', false);
      const isCover = useGMvalue('is_cover', false);
      const toastTime = useGMvalue('toast_time', undefined);
      let setSign;
      function run(toastVisible = true) {
        if (state.loading) {
          Toast('签到中');
          return;
        }
        const {
          unsigns,
          signs,
          setSign: _setSign
        } = getElementsInPage();
        setSign = _setSign;
        if (unsigns.length === 0) {
          const now = new Date();
          // 避免每次都提示
          if (toastVisible || toastTime.value === undefined || new Date(toastTime.value).getDate() < now.getDate()) {
            Toast.success('所有吧已签到');
          }
          toastTime.value = +now;
          return;
        }
        let mode;
        if (isSimulate.value) {
          if (!tieba_store.BDUSS) {
            Toast.error('请先输入 BDUSS 或 BDUSS_BFESS');
            return;
          }
          // 签了 20 个以上视为用过批量签到
          if (signs.length >= 20) {
            mode = 'app';
          } else {
            mode = 'fast';
          }
        } else {
          mode = 'web';
        }
        state.loading = true;
        const toast = Toast('开始签到，请等待', 0);
        new Adapter({
          unsigns,
          BDUSS: tieba_store.BDUSS,
          onSuccess({
            fid,
            kw,
            data
          }) {
            const key = fid || kw;
            if (key) setSign(key);
            if (fid && data) updateLikeForum(fid, data);
          }
        }).sign(mode).then(async () => {
          if (tieba_store.BDUSS) await fetchForums();
          // 以页面为准，因为有时签到失败但实际上是成功的
          const failList = getElementsInPage().unsigns;
          const length = failList.length;
          if (length > 0) {
            Toast.warning(`签到成功，失败${length}个：${failList.map(v => v.kw).join('、')}`, 0);
          } else {
            Toast.success('签到成功');
          }
        }).finally(() => {
          toast.close();
          state.loading = false;
        });
      }
      function updateLikeForum(fid, forum) {
        const found = state.likeForums.find(item => +fid === +item.forum_id);
        if (!found) return;
        if (forum.sign_bonus_point) {
          found.user_exp = String(Number(found.user_exp) + Number(forum.sign_bonus_point));
        }
        Object.assign(found, forum);
      }

      // 未签到的靠前
      function sort() {
        state.likeForums.sort((a, b) => {
          if (!a.is_sign && b.is_sign) return -1;
          return 0;
        });
      }
      function fetchForums() {
        return mergeLikeForum().then(forums => {
          state.likeForums = forums;
          sort();
          forums.forEach(forum => {
            // 签到可能失败，以这里为准
            if (forum.is_sign === 1) {
              setSign?.(forum.forum_name);
            }
          });
        }).catch(error => {
          // 爆炸了也没什么需要处理的，这里就不抛了
          log_error.force(error);
          Toast.error('获取贴吧列表失败。。请刷新重试~', 0);
        });
      }
      function onSimulateChange(checked) {
        if (checked === false) {
          isSimulate.value = checked;
          return;
        }
        const {
          BDUSS
        } = tieba_store;
        const result = window.prompt('请输入 F12 -> 应用(Application) -> Cookies 中的【BDUSS 或 BDUSS_BFESS】', BDUSS || undefined);
        if (result) {
          tieba_store.BDUSS = result;
          isSimulate.value = true;
          location.reload();
        } else {
          isSimulate.value = false;
        }
      }
      ;
      (async () => {
        // 获取列表后再自动签到
        if (tieba_store.BDUSS) {
          await fetchForums();
        }
        if (isComplete.value) {
          run(false);
        }
      })();
      return () => (0,external_Vue_namespaceObject.createVNode)("div", {
        "id": "inject-sign",
        "class": {
          'forums-hide': isForumsHide.value,
          cover: isCover.value,
          [state.size]: true
        }
      }, [(0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "control"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "disabled": state.loading,
        "type": "primary",
        "shadow": true,
        "onClick": () => run()
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u4E00\u952E\u7B7E\u5230")]
      }), (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "settings"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_checkbox_0, {
        "checked": isSimulate.value,
        "title": "\u6A21\u62DFAPP\u7B7E\u5230\u53EF\u4EE5\u83B7\u5F97\u4E0EAPP\u76F8\u540C\u7684\u7ECF\u9A8C\uFF0C\u6BD4\u7F51\u9875\u7B7E\u5230\u7ECF\u9A8C\u66F4\u591A\uFF0C\u4E5F\u63D0\u4F9B\u66F4\u591A\u529F\u80FD\uFF0C\u4F46\u9700\u8981BDUSS\uFF0C\u91CD\u65B0\u767B\u5F55\u540E\u9700\u8981\u518D\u6B21\u8F93\u5165\uFF0C\u8BF7\u7F51\u4E0A\u641C\u7D22\u83B7\u5F97\u65B9\u6CD5\uFF0C\u4E0D\u52FE\u9009\u5219\u901A\u8FC7\u7F51\u9875\u7B7E\u5230\uFF0C\u6B64\u65F6\u4E0D\u9700\u8981BDUSS",
        "onUpdate:checked": onSimulateChange
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u6A21\u62DFAPP")]
      }), (0,external_Vue_namespaceObject.createVNode)(src_components_checkbox_0, {
        "checked": isComplete.value,
        "onUpdate:checked": $event => isComplete.value = $event,
        "title": "\u4E0B\u6B21\u8FDB\u5165\u8D34\u5427\u65F6\u81EA\u52A8\u7B7E\u5230\uFF0C\u5EFA\u8BAE\u540C\u65F6\u52FE\u9009\u6A21\u62DFAPP"
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u81EA\u52A8\u7B7E\u5230")]
      }), state.likeForums.length > 0 && (0,external_Vue_namespaceObject.createVNode)(external_Vue_namespaceObject.Fragment, null, [(0,external_Vue_namespaceObject.createVNode)(src_components_checkbox_0, {
        "checked": isForumsHide.value,
        "onUpdate:checked": $event => isForumsHide.value = $event,
        "title": "\u5217\u8868\u5C06\u7F29\u5230\u5E95\u90E8"
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u9690\u85CF\u5217\u8868")]
      }), (0,external_Vue_namespaceObject.createVNode)(src_components_checkbox_0, {
        "checked": isCover.value,
        "onUpdate:checked": $event => isCover.value = $event,
        "title": "\u8986\u76D6\u5728\u9875\u9762\u4E0A\u663E\u793A"
      }, {
        default: () => [(0,external_Vue_namespaceObject.createTextVNode)("\u9632\u6B62\u906E\u6321")]
      })])])]), (0,external_Vue_namespaceObject.createVNode)(ui_ForumList, {
        "dataSource": state.likeForums,
        "size": state.size,
        "onClickSize": () => {
          state.size = sizeTick.next().value;
        }
      }, null)]);
    }
  });
}
;// ./src/scripts/tieba/index.ts





/**
 * todo：暂时不支持超过 200 个吧
 * 一次只能获取 200 个，
 * 而且通过接口没有办法区分吧是否被封，签到时不好处理
 */

function main() {
  if (!checker()) return;

  // 未登录时删除已有的 BDUSS
  if (!getElementsInPage().moreForum.length) {
    delete tieba_store.BDUSS;
    delete tieba_store.is_complete;
    return;
  }
  createUI();
}
main();
/******/ })()
;