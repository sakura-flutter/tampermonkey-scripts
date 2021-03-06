// ==UserScript==
// @name         Element UI文档辅助
// @version      1.0.3
// @description  在Element UI文档中增加示例目录导航，同时支持v2与v3(element-plus)版本，类似于Ant右侧悬浮的导航
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @match        https://element-plus.gitee.io/*
// @match        https://element-plus.org/*
// @match        https://element.eleme.cn/*
// @match        https://element.eleme.io/*
// @require      https://cdn.jsdelivr.net/npm/vue@3/dist/vue.runtime.global.prod.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 451:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#catalogue-js{contain:content;position:fixed;right:20px;top:100px;z-index:1000}@media(min-width: 1500px){#catalogue-js{left:calc(50% + 1140px / 2 + 40px);right:auto}}#catalogue-js ul{border-left:1px solid #f0f0f0;font-size:12px;list-style:none;margin:0;padding-left:0}#catalogue-js li{border-left:1px solid transparent;color:rgba(0,0,0,.85);cursor:pointer;line-height:1.5;list-style:none;margin-left:-1px;overflow:hidden;padding:2px 0 2px 16px;text-overflow:ellipsis;transition:all .3s ease;white-space:nowrap;width:110px}#catalogue-js li:hover{border-left-color:#1890ff;color:#1890ff}", ""]);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
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
;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/compatibility.ts
/**
 * 兼容性检查
 * @param {object} param0 & param1 版本, notify
 * @return {boolean} 是否通过
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
    notify && window.Toast && Toast.error(`哎呀！遇到错误：不支持的浏览器版本(需要Chrome${chrome}或Firefox${firefox}以上~)，请更新浏览器版本 o(╥﹏╥)o`, 0);
  }

  return pass;
}
;// CONCATENATED MODULE: ./src/utils/vue-root.ts
function getVueRoot(rootContainer) {
  if (isVue2(rootContainer)) return getVue2Instance(rootContainer);
  if (isVue3(rootContainer)) return getVue3Instance(rootContainer);
  return {};
}

function isVue2(rootContainer) {
  return '__vue__' in rootContainer;
}

function isVue3(rootContainer) {
  // https://github.com/vuejs/vue-next/blob/a66e53a24f445b688eef6812ecb872dc53cf2702/packages/runtime-core/src/apiCreateApp.ts#L252
  return '__vue_app__' in rootContainer;
}

function getVue2Instance(rootContainer) {
  return {
    instance: rootContainer.__vue__
  };
}

function getVue3Instance(rootContainer) {
  return {
    app: rootContainer.__vue_app__,
    // dev mode下组件el有__vueParentComponent __vnode属性
    // https://github.com/vuejs/vue-next/blob/3867bb4c14131ef94098a62bffba97a5b7d1fe66/packages/runtime-core/src/renderer.ts#L767
    // https://github.com/vuejs/vue-next/blob/3867bb4c14131ef94098a62bffba97a5b7d1fe66/packages/runtime-core/src/renderer.ts#L763
    // _vnode.component.proxy获取实例，应该就是app.mount返回的
    // https://github.com/vuejs/vue-next/blob/a66e53a24f445b688eef6812ecb872dc53cf2702/packages/runtime-core/src/apiCreateApp.ts#L258
    // https://github.com/vuejs/vue-next/blob/3867bb4c14131ef94098a62bffba97a5b7d1fe66/packages/runtime-core/src/renderer.ts#L2198
    instance: rootContainer._vnode && rootContainer._vnode.component.proxy
  };
}


;// CONCATENATED MODULE: ./src/utils/log.ts
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn(...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/utils/mount-component.js
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
      app.unmount(root);
      document.body.removeChild(root);
    }

  };
}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/element-ui/catalogue.scss
var catalogue = __webpack_require__(451);
;// CONCATENATED MODULE: ./src/scripts/element-ui/catalogue.scss

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(catalogue/* default */.Z, options);



/* harmony default export */ const element_ui_catalogue = (catalogue/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/scripts/element-ui/catalogue.js


function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }







var _scope = _classPrivateFieldLooseKey("scope");

var _cat = _classPrivateFieldLooseKey("cat");

var _getElements = _classPrivateFieldLooseKey("getElements");

var _createUI = _classPrivateFieldLooseKey("createUI");

class Catalogue {
  constructor({
    scope
  }) {
    Object.defineProperty(this, _createUI, {
      value: _createUI2
    });
    Object.defineProperty(this, _getElements, {
      value: _getElements2
    });
    Object.defineProperty(this, _scope, {
      writable: true,
      value: ''
    });
    Object.defineProperty(this, _cat, {
      writable: true,
      value: (0,external_Vue_namespaceObject.ref)([])
    });
    _classPrivateFieldLooseBase(this, _scope)[_scope] = scope;

    _classPrivateFieldLooseBase(this, _createUI)[_createUI]();
  }

  update() {
    const els = _classPrivateFieldLooseBase(this, _getElements)[_getElements]();

    const cat = els.map(el => {
      const catItem = {
        id: el.id,
        text: ''
      }; // 仅显示文本节点内容

      el.childNodes.forEach(node => {
        if (node.nodeName === '#text') {
          catItem.text += node.nodeValue;
        }
      });
      catItem.text = catItem.text.trim();
      return catItem;
    });
    warn(els, cat);
    _classPrivateFieldLooseBase(this, _cat)[_cat].value = cat;
  }

}

var _getElements2 = function _getElements2() {
  return [...$$(_classPrivateFieldLooseBase(this, _scope)[_scope])];
};

var _createUI2 = function _createUI2() {
  const self = this;
  mountComponent({
    setup() {
      function intoView(item) {
        $('#' + item.id)?.scrollIntoView({
          block: 'center'
        });
      }

      return () => (0,external_Vue_namespaceObject.createVNode)("div", {
        "id": "catalogue-js"
      }, [(0,external_Vue_namespaceObject.createVNode)("ul", null, [_classPrivateFieldLooseBase(self, _cat)[_cat].value.map(item => (0,external_Vue_namespaceObject.createVNode)("li", {
        "key": item.id,
        "title": item.text,
        "onClick": () => intoView(item)
      }, [item.text]))])]);
    }

  });
};
;// CONCATENATED MODULE: ./src/scripts/element-ui/index.js








async function main() {
  if (!checker()) return;
  let instance = null; // 非国内链接打开较慢，防止未完成加载

  while (instance == null) {
    ({
      instance
    } = getVueRoot($('#app')));
    await sleep(500);
  }

  warn(instance); // element-plus 已支持

  if ($('#app').__vue_app__) return;
  const catalogue = new Catalogue({
    // 注意：选择器要同时兼容element与element plus文档
    scope: '.page-container .page-component__content section.element-doc > h3'
  });
  let unwatch = null;
  instance.$watch('$route', function (to, from) {
    (0,external_Vue_namespaceObject.nextTick)(() => {
      const target = $('.page-component__content');

      if (target && unwatch == null) {
        unwatch = watchDocs(target);
      } else if (!target) {
        unwatch?.();
        unwatch = null;
      }
    });
  }, {
    immediate: true
  });

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
})();

/******/ })()
;