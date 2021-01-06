// ==UserScript==
// @name         Pixiv 工具箱
// @version      1.0.0
// @description  增强P站查看原图功能
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @noframes
// @match        https://www.pixiv.net
// @match        https://www.pixiv.net/*
// @grant        window.onurlchange
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @resource     viewerCSS https://cdn.jsdelivr.net/npm/viewerjs@1/dist/viewer.min.css
// @require      https://cdn.jsdelivr.net/npm/viewerjs@1/dist/viewer.min.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/utils/selector.js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/log.js
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn(...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/scripts/pixiv/index.js
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }



/* global Viewer */

function main() {
  GM_addStyle(GM_getResourceText('viewerCSS')); // 背景暗一点

  GM_addStyle('.viewer-backdrop { background-color: rgb(0 0 0 / 0.8) }'); // eslint-disable-next-line no-new

  new Previewer('figure [role="presentation"] a img', {
    includePathname: /^\/artworks\/(\w)+/
  });
}

var _el = _classPrivateFieldLooseKey("el");

var _options = _classPrivateFieldLooseKey("options");

var _viewer = _classPrivateFieldLooseKey("viewer");

var _init = _classPrivateFieldLooseKey("init");

var _process = _classPrivateFieldLooseKey("process");

var _getArtworks = _classPrivateFieldLooseKey("getArtworks");

var _createOriginalImgEls = _classPrivateFieldLooseKey("createOriginalImgEls");

var _preview = _classPrivateFieldLooseKey("preview");

class Previewer {
  constructor(el, options) {
    Object.defineProperty(this, _preview, {
      value: _preview2
    });
    Object.defineProperty(this, _createOriginalImgEls, {
      value: _createOriginalImgEls2
    });
    Object.defineProperty(this, _getArtworks, {
      value: _getArtworks2
    });
    Object.defineProperty(this, _init, {
      value: _init2
    });
    Object.defineProperty(this, _el, {
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, _options, {
      writable: true,
      value: {
        includePathname: null
      }
    });
    Object.defineProperty(this, _viewer, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _process, {
      writable: true,
      value: function (event) {
        /* 这么多的判断多数是没有意义的
         * 只是为了日后可能失效，尽量避免影响原点击事件
         */
        if (!_classPrivateFieldLooseBase(this, _options)[_options].includePathname.test(location.pathname)) return;

        const artworks = _classPrivateFieldLooseBase(this, _getArtworks)[_getArtworks]();

        if (artworks.length === 0) return;
        let index = -1; // 比较5层深度应该足够了

        event.composedPath().slice(0, 5).find(target => {
          index = artworks.findIndex(artwork => artwork === target);
          return index > -1;
        });
        warn(event, index);
        if (index === -1) return;

        const originalArtworks = _classPrivateFieldLooseBase(this, _createOriginalImgEls)[_createOriginalImgEls](artworks);

        if (originalArtworks.length === 0) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation(); // 释放上一次

        _classPrivateFieldLooseBase(this, _viewer)[_viewer]?.destroy();
        _classPrivateFieldLooseBase(this, _viewer)[_viewer] = _classPrivateFieldLooseBase(this, _preview)[_preview](originalArtworks, {
          initialViewIndex: index
        });
      }
    });
    _classPrivateFieldLooseBase(this, _process)[_process] = _classPrivateFieldLooseBase(this, _process)[_process].bind(this);
    _classPrivateFieldLooseBase(this, _el)[_el] = el;
    Object.assign(_classPrivateFieldLooseBase(this, _options)[_options], options);

    _classPrivateFieldLooseBase(this, _init)[_init]();
  }

}

var _init2 = function _init2() {
  window.addEventListener('click', _classPrivateFieldLooseBase(this, _process)[_process], true);
  window.addEventListener('urlchange', info => {
    warn('urlchange', info);

    if (_classPrivateFieldLooseBase(this, _viewer)[_viewer]) {
      _classPrivateFieldLooseBase(this, _viewer)[_viewer].destroy();

      _classPrivateFieldLooseBase(this, _viewer)[_viewer] = null;
    }
  });
};

var _getArtworks2 = function _getArtworks2() {
  return [...$$(_classPrivateFieldLooseBase(this, _el)[_el])];
};

var _createOriginalImgEls2 = function _createOriginalImgEls2(imgEls) {
  /* 不要用reduce，webpack生成的代码太多 */
  const originalImgEls = [];

  for (const img of imgEls) {
    // 原图在其父级a标签href上
    const {
      parentNode
    } = img;
    if (parentNode.tagName !== 'A') continue;
    const image = new Image();
    image.src = parentNode.href;
    image.alt = img.alt;
    originalImgEls.push(image);
  }

  return originalImgEls;
};

var _preview2 = function _preview2(imgEls, viewerOpts) {
  const container = document.createElement('div');
  container.append(...imgEls);
  viewerOpts = Object.assign({
    navbar: imgEls.length > 1,
    loop: false,
    zoomRatio: 0.5,
    minZoomRatio: 0.1,

    viewed() {
      this.viewer.tooltip();
    }

  }, viewerOpts);
  const viewer = new Viewer(container, viewerOpts);
  viewer.show();
  warn('viewer:', container, viewer);
  return viewer;
};

main();
/******/ })()
;