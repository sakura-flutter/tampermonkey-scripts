// ==UserScript==
// @name         Pixiv 工具箱
// @version      1.4.0
// @description  增强P站查看原图功能；显示原图尺寸
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
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
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/utils/log.ts
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/scripts/pixiv/previewer.js
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }



/* global Viewer */

GM_addStyle(GM_getResourceText('viewerCSS'));
GM_addStyle(['.viewer-backdrop { background-color: rgb(0 0 0 / 0.8) }', // 背景暗一点
'.viewer-container .viewer-title { text-shadow: 1px 1px 1px #000 }', // 添加标题阴影 在图片是白底时显示得清楚点
'.viewer-container .viewer-navbar ul, .viewer-container .viewer-navbar li { width: 66px; height: 110px }' // 加大导航栏
].join(''));

var _el = _classPrivateFieldLooseKey("el");

var _viewer = _classPrivateFieldLooseKey("viewer");

var _options = _classPrivateFieldLooseKey("options");

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
      value: null
    });
    Object.defineProperty(this, _viewer, {
      writable: true,
      value: null
    });
    Object.defineProperty(this, _options, {
      writable: true,
      value: {
        includePathname: null
      }
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
        event.stopImmediatePropagation();
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

function _init2() {
  window.addEventListener('click', _classPrivateFieldLooseBase(this, _process)[_process], true);
  window.addEventListener('urlchange', info => {
    warn('urlchange', info);
    _classPrivateFieldLooseBase(this, _viewer)[_viewer]?.hide();
  });
}

function _getArtworks2() {
  return [...$$(_classPrivateFieldLooseBase(this, _el)[_el])];
}

function _createOriginalImgEls2(imgEls) {
  return imgEls.reduce((acc, img) => {
    const {
      parentNode
    } = img; // 原图在其父级a标签href上

    if (parentNode.tagName === 'A') {
      const image = new Image();
      image.src = parentNode.href;
      image.alt = img.alt;
      acc.push(image);
    }

    return acc;
  }, []);
}

function _preview2(imgEls, viewerOpts) {
  const self = this;
  const container = document.createElement('div');
  container.append(...imgEls);
  viewerOpts = Object.assign({
    navbar: imgEls.length > 1,
    loop: false,
    zoomRatio: 0.5,
    minZoomRatio: 0.1,
    maxZoomRatio: 1.5,

    viewed() {
      this.viewer.tooltip();
    },

    // 销毁
    hide() {
      _classPrivateFieldLooseBase(self, _viewer)[_viewer] = null;
    },

    hidden() {
      this.viewer.destroy();
    }

  }, viewerOpts);
  const viewer = new Viewer(container, viewerOpts);
  viewer.show();
  warn('viewer:', container, viewer);
  return viewer;
}
;// CONCATENATED MODULE: ./src/utils/visibility-state.js
// 页面 visible 时执行 setInterval
// 参数同 setInterval，返回终止函数
function onVisible(callback, delay = 500, ...rest) {
  let intervalId;

  function listener() {
    clearInterval(intervalId);
    if (document.visibilityState === 'hidden') return; // eslint-disable-next-line node/no-callback-literal

    callback(...rest);
    intervalId = setInterval(callback, delay, ...rest);
  }

  listener();
  document.addEventListener('visibilitychange', listener);
  return function abort() {
    clearInterval(intervalId);
    document.removeEventListener('visibilitychange', listener);
  };
}
;// CONCATENATED MODULE: ./src/scripts/pixiv/pixels.js


function attachPixels(el, options) {
  options = Object.assign({
    includePathname: null
  }, options);
  const ws = new WeakSet();
  onVisible(() => {
    if (!options.includePathname.test(location.pathname)) return;
    $$(el).forEach(img => {
      if (ws.has(img)) return; // 获取原尺寸

      let [width, height] = [img.getAttribute('width'), img.getAttribute('height')];
      if (width === null || height === null) return;
      [width, height] = [+width, +height];
      img.parentElement.style.position = 'relative';
      const elem = createPixelsElement(img.parentElement);
      elem.innerText = `${width} × ${height} (${calcRectCoincide(width, height).percent})`;
      ws.add(img);
    });
  });
}

function createPixelsElement(parentElement) {
  const classname = 'artwork-pixels';

  for (const child of parentElement.children) {
    if (child.classList.contains(classname)) return child;
  } // 没有则插入一个


  const elem = document.createElement('span');
  elem.classList.add(classname);
  elem.style = ['position: absolute', 'z-index: 1', 'top: 32px', 'right: 8px', 'padding: 0 4px', 'border-radius: 8px', 'font-size: 12px', 'line-height: initial', 'color: #fff', 'background: rgb(0 0 0 / 0.32)'].join(';');
  parentElement.prepend(elem);
  return elem;
} // 计算图片与屏幕吻合度


function calcRectCoincide(width, height) {
  const {
    width: sw,
    height: sh
  } = window.screen;
  const rectRate = width / height;
  const screenRate = sw / sh;
  let rate;

  if (rectRate >= screenRate) {
    rate = screenRate / rectRate;
  } else {
    rate = rectRate / screenRate;
  } // 图片小于屏幕尺寸，降低值


  if (width < sw && height < sh) {
    rate *= width / sw * (height / sh);
  } // 符合屏幕比例且超过屏幕尺寸的图片，提高值
  // 接近比例也算符合


  if (rate >= 0.99) {
    if (width > sw) {
      rate *= width / sw;
    } else if (height > sh) {
      rate *= height / sh;
    }
  }

  return {
    rate,
    percent: (rate * 100).toFixed(0) + '%'
  };
}
;// CONCATENATED MODULE: ./src/scripts/pixiv/index.js

 // eslint-disable-next-line no-new

new Previewer('figure [role="presentation"] a img', {
  includePathname: /^\/artworks\/(\w)+/
});
attachPixels('figure [role="presentation"] a img', {
  includePathname: /^\/artworks\/(\w)+/
});
/******/ })()
;