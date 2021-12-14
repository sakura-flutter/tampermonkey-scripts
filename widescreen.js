// ==UserScript==
// @name         网页宽屏
// @version      2.15.2
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、搜狗搜索、segmentfault、哔哩哔哩、微博、豆瓣、今日头条、Google、CSDN、crates.io、米游社原神
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-start
// @noframes
// @match        https://bcy.net/item/detail/*
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/follow
// @match        https://www.zhihu.com/hot*
// @match        https://www.zhihu.com/topic*
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.baidu.com/s*
// @match        https://www.baidu.com/?*
// @match        https://www.baidu.com/
// @match        https://www.sogou.com/web*
// @match        https://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/f?*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://t.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://www.weibo.com/*
// @match        https://weibo.com/*
// @match        https://d.weibo.com/*
// @match        https://www.douban.com/gallery/*
// @match        https://www.douban.com/note/*
// @match        https://movie.douban.com/subject/*
// @match        https://movie.douban.com/review/*
// @match        https://www.toutiao.com/*
// @match        https://crates.io/crates/*
// @match        https://bbs.mihoyo.com/*
// @include      /^https:\/\/www\.google\..{2,7}search/
// @include      /^https:\/\/blog\.csdn\.net\/(\w|-)+\/article\/details\//
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://cdn.jsdelivr.net/npm/vue@3/dist/vue.runtime.global.prod.min.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=994674
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
___CSS_LOADER_EXPORT___.push([module.id, ".skr-button{border:1px solid;border-radius:2px;box-shadow:var(--skr-button-box-shadow);cursor:pointer;line-height:1.5715;transition:var(--skr-button-transition)}.skr-button:hover{filter:brightness(1.15)}.skr-button:focus:not(:focus-visible){outline:0}.skr-button--primary{background-color:var(--skr-primary-color);border-color:var(--skr-primary-color);color:var(--skr-text-inverse-color)}.skr-button--default{background-color:var(--skr-white-color);border-color:var(--skr-border-color);color:var(--skr-text-primary-color)}.skr-button--default:hover{border-color:currentColor;color:var(--skr-primary-color);filter:brightness(1)}.skr-button--round{border-radius:50%}.skr-button--shadow{box-shadow:var(--skr-box-shadow-normal)}.skr-button--mini{font-size:12px;padding:2px 7px}.skr-button--small{font-size:12px;padding:4px 8px}.skr-button--normal{font-size:14px;padding:4px 15px}.skr-button--large{font-size:15px;padding:10px 20px}", ""]);
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

/***/ 9354:
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
___CSS_LOADER_EXPORT___.push([module.id, ":root{--skr-primary-color: #2878ff;--skr-primary-lighten-color: rgba(24, 144, 255, 0.2);--skr-white-color: #fff;--skr-transition-duration-fast: 0.1s;--skr-transition-duration-normal: 0.3s;--skr-box-shadow-lighten: 0 1px 6px rgba(0, 0, 0, 0.15);--skr-box-shadow-normal: 0 1px 6px rgba(0, 0, 0, 0.2);--skr-border-color: #d9d9d9;--skr-text-primary-color: #303133;--skr-text-regular-color: #666;--skr-text-secondary-color: #909399;--skr-text-inverse-color: var(--skr-white-color);--skr-button-transition: all var(--skr-transition-duration-normal);--skr-button-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);--skr-ripple-color: rgb(138 218 255 / 20%)}.inject-widescreen-js{align-items:center;contain:layout;display:flex;flex-direction:column;opacity:.5;position:fixed;right:7vw;top:150px;transition:opacity var(--skr-transition-duration-normal);z-index:99}.inject-widescreen-js label{align-items:center;bottom:0;cursor:pointer;display:flex;font-size:14px;margin:0;padding:0;position:absolute;transform:translateY(-10px);transition:transform var(--skr-transition-duration-normal);z-index:-1}.inject-widescreen-js:hover{opacity:1}.inject-widescreen-js:hover label{transform:translateY(100%)}.inject-widescreen-js button{background-image:none !important}.inject-widescreen-js input{margin:0 2px 0 0}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6534:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1320px){:root{--inject-page-width:min(82vw, 1330px)}.inject-widescreen-loose-js{--inject-page-width:82vw}.root-page-container>.mhy-article-page{display:flex;width:var(--inject-page-width)}.root-page-container>.mhy-article-page .mhy-layout__main{flex:1;padding-right:20px}.root-page-container .mhy-article-actions{margin-left:calc(var(--inject-page-width)/2*-1);transform:translate(calc(-100% - 10px))}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3528:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1580px){:root{--inject-page-width:min(75vw, 1440px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.container .row{width:var(--inject-page-width)}.container .row .col-big{flex:.97}.detail-main header{width:auto !important}.container .row .col-big .album{width:100%}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3880:
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
___CSS_LOADER_EXPORT___.push([module.id, "html body{height:auto}#csdn-toolbar{position:sticky !important;top:0;z-index:1}#passportbox,.login-mark{display:none !important}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4379:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(82vw, 1400px)}.inject-widescreen-loose-js{--inject-page-width:82vw}body>main>div:first-of-type{width:var(--inject-page-width)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8343:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(77.5vw, 1330px)}.inject-widescreen-loose-js{--inject-page-width:77.5vw}.WB_frame{display:flex;width:var(--inject-page-width) !important}.WB_frame #plc_main{display:flex !important;flex:1}.WB_frame_c{flex:1}.tab_box{display:flex}.tab_box::after{content:none}.tab_box .fr_box{flex:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5502:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1250px){:root{--inject-page-width:min(85vw, 1280px)}.inject-widescreen-loose-js{--inject-page-width:85vw}#__next>div:last-child{left:calc(50% - var(--inject-page-width)/2 - 80px)}#__next [role=main]{width:var(--inject-page-width)}#__next [role=main]>div:first-child{flex:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5032:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1400px){:root{--inject-page-width:min(82vw, 1300px)}.inject-widescreen-loose-js{--inject-page-width:82vw}#juejin .main-container{max-width:var(--inject-page-width) !important}#juejin .main-container .main-area{width:calc(100% - 25rem - 20px)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6587:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(82vw, 1318px)}.inject-widescreen-loose-js{--inject-page-width:82vw}#wrapper{width:var(--inject-page-width) !important}#content .article{width:calc(100% - 360px)}#content .article .subject{width:calc(100% - 175px)}#content .article .subject #info{max-width:none;width:calc(100% - 160px)}#content .article #related-pic>ul{width:675px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5811:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 750px){:root{--inject-page-width:min(90vw, 1150px)}.inject-widescreen-loose-js{--inject-page-width:90vw}.rich_media_area_primary_inner{margin-left:auto;margin-right:auto;max-width:var(--inject-page-width) !important}#js_pc_qr_code .qr_code_pc{opacity:.2;position:fixed;right:3vw;top:25vh}#js_pc_qr_code .qr_code_pc:hover{opacity:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3250:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1390px){:root{--inject-page-width:min(82vw, 1350px)}.inject-widescreen-loose-js{--inject-page-width:82vw}.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:var(--inject-page-width)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 158:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 900px){:root{--inject-page-width:min(75vw, 1039px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.detail-card{width:var(--inject-page-width) !important}.main-content{padding-right:10px;width:auto !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3338:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1380px){:root{--inject-page-width:min(85vw, 1454px)}.inject-widescreen-loose-js{--inject-page-width:85vw}.home-content{width:var(--inject-page-width) !important}.center-panel{width:calc(100% - 524px) !important}.main-content{margin-right:20px;width:auto !important}.live-container,.video-container,.bangumi-container,.shop-panel{width:auto !important}.video-container .text-area{width:calc(100% - 233px) !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8191:
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
___CSS_LOADER_EXPORT___.push([module.id, ".mocha-strawberry{bottom:50px;position:fixed;right:70px;z-index:1}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 778:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1390px){:root{--inject-page-width:min(80vw, 1250px)}.inject-widescreen-loose-js{--inject-page-width:80vw}.head_main .head_middle,.head_main .head_content{width:var(--inject-page-width) !important}.content,.foot{width:var(--inject-page-width)}.forum_content{background:#fff}#content_wrap{border-right:1px solid #eee;width:calc(100% - 248px)}.threadlist_detail{display:flex}.threadlist_detail .pull_left{flex:auto}.threadlist_detail .pull_left .threadlist_abs{width:97%}.frs_content_footer_pagelet{width:auto !important}.tb_rich_poster_container{margin-left:0 !important}.tbui_aside_float_bar{left:calc(50% + var(--inject-page-width)/2 + 12px) !important;margin-left:0 !important;right:auto}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2257:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1390px){:root{--inject-page-width:min(80vw, 1250px)}.inject-widescreen-loose-js{--inject-page-width:80vw}#container{width:var(--inject-page-width)}#container>.content{width:100%}.nav_wrap,.p_thread,.pb_content,.core_title_wrap_bright,.core_reply_wrapper,.l_post_bright .core_reply_wrapper,.pb_footer{width:100%}.core_title_absolute_bright{width:calc(var(--inject-page-width) - 240px)}.pb_content{background-size:100%;display:flex}.pb_content::after{content:none}.pb_content .replace_div{width:-moz-fit-content !important;width:fit-content !important}.pb_content .replace_div .replace_tip{width:100% !important}.left_section{border-right:2px solid #e4e6eb;flex:1}.l_post_bright{display:flex;width:100% !important}.l_post_bright .d_post_content_main{flex:1;width:0}.l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-down,.l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-up,.l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-action{right:180px !important}.tbui_aside_float_bar{left:calc(50% + var(--inject-page-width)/2 + 12px);margin-left:0;right:auto}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7028:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1150px){:root{--inject-page-width:min(90vw, 1380px)}.inject-widescreen-loose-js{--inject-page-width:90vw}#articleRoot .WB_frame{width:var(--inject-page-width)}#articleRoot #plc_main{max-width:100%;width:auto}#articleRoot .WB_frame_a,#articleRoot .WB_artical{max-width:100%;width:auto}#articleRoot .main_toppic{margin-left:auto;margin-right:auto}#articleRoot .WB_editor_iframe_new{width:auto}.B_artical [node-type=sidebar]>.W_gotop{left:calc(50% + var(--inject-page-width)/2);margin-left:0}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5258:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1340px){:root{--inject-page-width:min(90vw, 1380px)}.inject-widescreen-loose-js{--inject-page-width:90vw}[class*=Frame_content]{max-width:none;width:var(--inject-page-width)}[class*=Frame_main],[class*=Main_full]{flex-grow:1}.woo-box-wrap[class*=picture_inlineNum3]{max-width:409px}.u-col-4.woo-box-wrap{max-width:546px}[class*=content_row] [class*=card-video_videoBox]{max-width:540px}[class*=content_row] [class*=card-article_pic]{max-width:540px}[class*=Index_backTop]{left:calc(50% + var(--inject-page-width)/2 + var(--frame-mod-gap-space));margin-left:0;transform:translateX(0)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8184:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1450px){:root{--inject-page-width:min(91vw, 91vw)}.inject-widescreen-loose-js{--inject-page-width:91vw}[class*=Frame_content2]{max-width:none;width:var(--inject-page-width)}[class*=Frame_main2]{flex-grow:1;padding-right:20px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 632:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1460px){:root{--inject-page-width:min(75vw, 1300px)}.inject-widescreen-loose-js{--inject-page-width:75vw}#head:not(.s-skin-hasbg){backdrop-filter:blur(10px);background-color:#ffffffd1}}@media screen and (min-width: 1460px)and (max-width: 1920px){.head_wrapper .s_form{margin-left:auto;margin-right:auto;width:-moz-fit-content;width:fit-content}}@media screen and (min-width: 1460px){.s_tab{margin-left:auto;margin-right:auto;padding-left:0 !important;width:-moz-fit-content;width:fit-content}}@media screen and (min-width: 1460px){#container{margin-left:auto !important;margin-right:auto !important;width:var(--inject-page-width) !important}}@media screen and (min-width: 1460px){#content_left{width:calc(var(--inject-page-width) - 450px) !important}#content_left>div:not([tpl*=img_address]){width:100% !important}#content_left .op-bk-polysemy-video__wrap{width:560px !important}#content_left .wenda-abstract-img-wrap-new{height:auto}#content_left .c-group-wrapper .result-op,#content_left .c-group-wrapper .c-group{width:95% !important}#content_left .new-pmd .c-span9{width:75%}}@media screen and (min-width: 1460px)and (min-width: 1680px){#content_left .new-pmd .c-span9{width:81%}}@media screen and (min-width: 1460px){#content_left .new-pmd .c-span12{width:100%}}@media screen and (min-width: 1460px){.page-inner{margin-left:auto;margin-right:auto;padding-left:0 !important;width:var(--inject-page-width)}}@media screen and (min-width: 1460px){.foot-inner{margin-left:auto;margin-right:auto;width:var(--inject-page-width)}}@media screen and (min-width: 1460px){#foot .foot-inner #help{padding-left:0 !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5927:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1120px){:root{--inject-page-width:min(83vw, 1160px)}.inject-widescreen-loose-js{--inject-page-width:83vw}#app .article-detail{width:var(--inject-page-width)}#app #article-content .img-box img[data-type=preview]{height:auto !important;max-width:100%;width:auto !important}#app .right-side-bar{margin-left:calc(var(--inject-page-width) + 25px);transition-property:bottom}#app .activty-image .card-image{margin:auto}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5201:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1300px){:root{--inject-page-width:min(82vw, 1318px)}.inject-widescreen-loose-js{--inject-page-width:82vw}#wrapper{width:var(--inject-page-width) !important}#content .grid-16-8 .article{width:calc(100% - 360px) !important}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2797:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1450px){:root{--inject-page-width:min(82vw, 1330px)}.inject-widescreen-loose-js{--inject-page-width:82vw}body .lEXIrb{max-width:none !important}body #center_col{width:calc(var(--inject-page-width) - 480px)}body #rso .g{width:100%}body #rso .g .IsZvec{max-width:none}body #rso .g .kp-blk{width:100%}body #rso .g .kno-ftr{margin-right:0}body #rso g-section-with-header{width:652px}body #rhs{margin-left:calc(var(--inject-page-width) - 240px)}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3471:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1200px){:root{--inject-page-width:min(80vw, 1340px)}.inject-widescreen-loose-js{--inject-page-width:80vw}.hintBox,#pagebar_container,#s_footer>div,#wrapper,.header .header-box{margin-left:auto;margin-right:auto;padding-left:0;width:var(--inject-page-width) !important}.header .header-box{padding:0 5px 45px;position:relative}.header .header-box .logo{top:-8px}.header,.header.headsearch .header-box{padding-bottom:0}.headsearch{backdrop-filter:blur(10px);background-color:#ffffffd1}#wrapper{display:flex}#main{flex:1;max-width:none;padding-right:74px;width:0}#main .results{width:auto}#main .results>.vrwrap,#main .results>.rb{width:auto !important}.special-wrap,.vrPicBox{box-sizing:border-box;width:550px}#s_footer{padding-left:0}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5186:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1350px){:root{--inject-page-width:min(88vw, 1470px)}.inject-widescreen-loose-js{--inject-page-width:88vw}.article-detail-container{width:var(--inject-page-width) !important}.article-detail-container>.main{width:calc(var(--inject-page-width) - 298px - 60px - 96px) !important}.article-detail-container>.main .ttp-comment-block{width:auto}.article-detail-container .detail-end-feed{margin-left:auto;margin-right:auto;max-width:676px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1131:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1100px){:root{--inject-page-width:min(91vw, 1360px)}.inject-widescreen-loose-js{--inject-page-width:91vw}.Topstory-container{width:var(--inject-page-width)}.Topstory-mainColumn{flex:1}.GlobalSideBar{flex:initial;width:296px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7231:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1350px){:root{--inject-page-width:min(75vw, 1300px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.QuestionHeader-content,.QuestionHeader-footer{margin-left:auto;margin-right:auto;padding-left:0;width:var(--inject-page-width)}.QuestionHeader-footer-inner{width:auto}.QuestionHeader-footer-main{padding-left:0}.QuestionHeader-main{flex:1;width:0}.Question-main{width:var(--inject-page-width)}.Question-main>.ListShortcut{flex:1}.Question-main>.ListShortcut>.Question-mainColumn[data-zop-questionanswerlist]{padding-right:10px;width:auto}.Question-main>.Question-mainColumn{flex:1;padding-right:10px}.ztext .content_image,.ztext .origin_image{max-width:694px}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 486:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1100px){:root{--inject-page-width:min(91vw, 1295px)}.inject-widescreen-loose-js{--inject-page-width:91vw}.ContentLayout{width:var(--inject-page-width)}.ContentLayout-mainColumn{flex:1}}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9123:
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
___CSS_LOADER_EXPORT___.push([module.id, "@media screen and (min-width: 1000px){:root{--inject-page-width:min(75vw, 1120px)}.inject-widescreen-loose-js{--inject-page-width:75vw}.Post-NormalMain .Post-Header,.Post-NormalMain>div,.Post-NormalSub>div{width:var(--inject-page-width)}.Post-NormalMain .Post-Header .AuthorInfo{max-width:none;width:0}.ztext .content_image,.ztext .origin_image{max-width:690px}.Post-SideActions{left:calc(50% - var(--inject-page-width)/2 - 120px)}}", ""]);
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
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// NAMESPACE OBJECT: ./src/utils/ready-state.js
var ready_state_namespaceObject = {};
__webpack_require__.r(ready_state_namespaceObject);
__webpack_require__.d(ready_state_namespaceObject, {
  "DOMContentLoaded": () => (DOMContentLoaded),
  "complete": () => (complete),
  "interactive": () => (interactive),
  "load": () => (load),
  "loading": () => (loading)
});

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
;// CONCATENATED MODULE: ./src/utils/log.ts
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn('%c      warn      ', 'background: #ffa500; padding: 1px; color: #fff;', ...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/utils/ready-state.js
/**
 * readyState 因为脚本加载时机不一定监听到所有变化
 * 所以 pool 中的状态区分先后顺序
 * 靠后定义的会自动将靠前定义的但没有监听到的执行一次，但实际上不再是原来的状态
 */

const pool = new Map([['loading', []], ['interactive', []], ['DOMContentLoaded', []], // 扩展状态
['complete', []], ['load', []] // 扩展状态，不一定可以监听到
]);
let currentState = document.readyState;

const execute = (readyState = currentState) => {
  currentState = readyState;

  for (const [state, functions] of pool) {
    while (functions.length) {
      functions.shift()();
    }

    if (readyState === state) break;
  }
};

warn('document.readyState', currentState);
execute();

if (document.readyState !== 'complete') {
  document.addEventListener('readystatechange', () => execute(document.readyState));
  window.addEventListener('DOMContentLoaded', () => execute('DOMContentLoaded'));
}

window.addEventListener('load', () => execute('load'));

const wrapper = (readyState, fn) => new Promise(resolve => {
  pool.get(readyState).push(function () {
    resolve(fn?.());
  }) // 边界情况，加载完还有回调添加也执行一下
  ;
  ['complete', 'load'].includes(currentState) && execute();
});

const loading = fn => wrapper('loading', fn);
const interactive = fn => wrapper('interactive', fn);
const DOMContentLoaded = fn => wrapper('DOMContentLoaded', fn);
const complete = fn => wrapper('complete', fn);
const load = fn => wrapper('load', fn);
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

/* harmony default export */ const src_store = (createStore());

;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/bcy-net/index.lazy.scss
var index_lazy = __webpack_require__(3528);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/bcy-net/index.lazy.scss

      var exported = {};

      
      
      
      
      
      
      
      
      if (index_lazy/* default */.Z && index_lazy/* default.locals */.Z.locals) {
              exported.locals = index_lazy/* default.locals */.Z.locals;
            }
            

var refs = 0;
var update;
var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

exported.use = function(insertOptions) {
  options.options = insertOptions || {};

  if (!(refs++)) {
    update = injectStylesIntoStyleTag_default()(index_lazy/* default */.Z, options);
  }

  return exported;
};
exported.unuse = function() {
  if (refs > 0 && !--refs) {
    update();
    update = null;
  }
};




       /* harmony default export */ const bcy_net_index_lazy = (exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/bcy-net/index.js



const banciyuan = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      interactive(() => {
        // eslint-disable-next-line no-constant-condition
        if (true) return;
        const {
          multi
        } = unsafeWindow.__ssr_data.detail.post_data;
        const imgEls = $$('.container .album .img-wrap-inner img');
        if (multi.length !== imgEls.length) return;
        imgEls.forEach((img, index) => {
          img.src = multi[index].original_path;
        });
      });
      bcy_net_index_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/mp-weixin-qq-com/index.lazy.scss
var mp_weixin_qq_com_index_lazy = __webpack_require__(5811);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/mp-weixin-qq-com/index.lazy.scss

      var index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (mp_weixin_qq_com_index_lazy/* default */.Z && mp_weixin_qq_com_index_lazy/* default.locals */.Z.locals) {
              index_lazy_exported.locals = mp_weixin_qq_com_index_lazy/* default.locals */.Z.locals;
            }
            

var index_lazy_refs = 0;
var index_lazy_update;
var index_lazy_options = {};

index_lazy_options.styleTagTransform = (styleTagTransform_default());
index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
index_lazy_options.domAPI = (styleDomAPI_default());
index_lazy_options.insertStyleElement = (insertStyleElement_default());

index_lazy_exported.use = function(insertOptions) {
  index_lazy_options.options = insertOptions || {};

  if (!(index_lazy_refs++)) {
    index_lazy_update = injectStylesIntoStyleTag_default()(mp_weixin_qq_com_index_lazy/* default */.Z, index_lazy_options);
  }

  return index_lazy_exported;
};
index_lazy_exported.unuse = function() {
  if (index_lazy_refs > 0 && !--index_lazy_refs) {
    index_lazy_update();
    index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_mp_weixin_qq_com_index_lazy = (index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/mp-weixin-qq-com/index.js



const weixin = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      interactive(() => {
        // 原图处理
        $$('img').forEach(img => {
          const dataSrc = img.dataset.src;
          if (!dataSrc) return;
          const url = new URL(dataSrc);
          url.pathname = url.pathname.replace('/640', '/');
          img.dataset.src = url.href;
        });
      });
      sites_mp_weixin_qq_com_index_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhuanlan-zhihu-com/index.lazy.scss
var zhuanlan_zhihu_com_index_lazy = __webpack_require__(9123);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhuanlan-zhihu-com/index.lazy.scss

      var zhuanlan_zhihu_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (zhuanlan_zhihu_com_index_lazy/* default */.Z && zhuanlan_zhihu_com_index_lazy/* default.locals */.Z.locals) {
              zhuanlan_zhihu_com_index_lazy_exported.locals = zhuanlan_zhihu_com_index_lazy/* default.locals */.Z.locals;
            }
            

var zhuanlan_zhihu_com_index_lazy_refs = 0;
var zhuanlan_zhihu_com_index_lazy_update;
var zhuanlan_zhihu_com_index_lazy_options = {};

zhuanlan_zhihu_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
zhuanlan_zhihu_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      zhuanlan_zhihu_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
zhuanlan_zhihu_com_index_lazy_options.domAPI = (styleDomAPI_default());
zhuanlan_zhihu_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

zhuanlan_zhihu_com_index_lazy_exported.use = function(insertOptions) {
  zhuanlan_zhihu_com_index_lazy_options.options = insertOptions || {};

  if (!(zhuanlan_zhihu_com_index_lazy_refs++)) {
    zhuanlan_zhihu_com_index_lazy_update = injectStylesIntoStyleTag_default()(zhuanlan_zhihu_com_index_lazy/* default */.Z, zhuanlan_zhihu_com_index_lazy_options);
  }

  return zhuanlan_zhihu_com_index_lazy_exported;
};
zhuanlan_zhihu_com_index_lazy_exported.unuse = function() {
  if (zhuanlan_zhihu_com_index_lazy_refs > 0 && !--zhuanlan_zhihu_com_index_lazy_refs) {
    zhuanlan_zhihu_com_index_lazy_update();
    zhuanlan_zhihu_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_zhuanlan_zhihu_com_index_lazy = (zhuanlan_zhihu_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhuanlan-zhihu-com/index.js



const zhihuZhuanlan = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      DOMContentLoaded(() => {
        const process = new WeakSet();
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const {
              target,
              oldValue
            } = mutation;
            if (process.has(target) || target.tagName !== 'IMG' || !oldValue.startsWith('data:image/') || // 与知乎同样的选择器判断
            !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))) return;
            process.add(target); // 替换原图

            target.dataset.original && (target.src = target.dataset.original);
          });
        });
        observer.observe($('.Post-RichTextContainer'), {
          subtree: true,
          attributeFilter: ['src'],
          attributeOldValue: true
        });
      });
      sites_zhuanlan_zhihu_com_index_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhihu-com/question.lazy.scss
var question_lazy = __webpack_require__(7231);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/question.lazy.scss

      var question_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (question_lazy/* default */.Z && question_lazy/* default.locals */.Z.locals) {
              question_lazy_exported.locals = question_lazy/* default.locals */.Z.locals;
            }
            

var question_lazy_refs = 0;
var question_lazy_update;
var question_lazy_options = {};

question_lazy_options.styleTagTransform = (styleTagTransform_default());
question_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      question_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
question_lazy_options.domAPI = (styleDomAPI_default());
question_lazy_options.insertStyleElement = (insertStyleElement_default());

question_lazy_exported.use = function(insertOptions) {
  question_lazy_options.options = insertOptions || {};

  if (!(question_lazy_refs++)) {
    question_lazy_update = injectStylesIntoStyleTag_default()(question_lazy/* default */.Z, question_lazy_options);
  }

  return question_lazy_exported;
};
question_lazy_exported.unuse = function() {
  if (question_lazy_refs > 0 && !--question_lazy_refs) {
    question_lazy_update();
    question_lazy_update = null;
  }
};




       /* harmony default export */ const zhihu_com_question_lazy = (question_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/question.js



const zhihuQuestion = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      DOMContentLoaded(() => {
        const process = new WeakSet();
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const {
              target,
              oldValue
            } = mutation;
            if (process.has(target) || target.tagName !== 'IMG' || !oldValue.startsWith('data:image/') || // 不对非文章图片处理
            !$('.ListShortcut').contains(target) || // 与知乎同样的选择器判断
            !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))) return;
            process.add(target); // 替换原图

            target.dataset.original && (target.src = target.dataset.original);
          });
        }); // 查看全部回答时知乎会替换Question-mainColumn标签，只能往更父级监听

        observer.observe($('.QuestionPage'), {
          subtree: true,
          attributeFilter: ['src'],
          attributeOldValue: true
        });
      });
      zhihu_com_question_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhihu-com/home.lazy.scss
var home_lazy = __webpack_require__(1131);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/home.lazy.scss

      var home_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (home_lazy/* default */.Z && home_lazy/* default.locals */.Z.locals) {
              home_lazy_exported.locals = home_lazy/* default.locals */.Z.locals;
            }
            

var home_lazy_refs = 0;
var home_lazy_update;
var home_lazy_options = {};

home_lazy_options.styleTagTransform = (styleTagTransform_default());
home_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      home_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
home_lazy_options.domAPI = (styleDomAPI_default());
home_lazy_options.insertStyleElement = (insertStyleElement_default());

home_lazy_exported.use = function(insertOptions) {
  home_lazy_options.options = insertOptions || {};

  if (!(home_lazy_refs++)) {
    home_lazy_update = injectStylesIntoStyleTag_default()(home_lazy/* default */.Z, home_lazy_options);
  }

  return home_lazy_exported;
};
home_lazy_exported.unuse = function() {
  if (home_lazy_refs > 0 && !--home_lazy_refs) {
    home_lazy_update();
    home_lazy_update = null;
  }
};




       /* harmony default export */ const zhihu_com_home_lazy = (home_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/home.js

const zhihuHome = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: zhihu_com_home_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/zhihu-com/topic.lazy.scss
var topic_lazy = __webpack_require__(486);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/topic.lazy.scss

      var topic_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (topic_lazy/* default */.Z && topic_lazy/* default.locals */.Z.locals) {
              topic_lazy_exported.locals = topic_lazy/* default.locals */.Z.locals;
            }
            

var topic_lazy_refs = 0;
var topic_lazy_update;
var topic_lazy_options = {};

topic_lazy_options.styleTagTransform = (styleTagTransform_default());
topic_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      topic_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
topic_lazy_options.domAPI = (styleDomAPI_default());
topic_lazy_options.insertStyleElement = (insertStyleElement_default());

topic_lazy_exported.use = function(insertOptions) {
  topic_lazy_options.options = insertOptions || {};

  if (!(topic_lazy_refs++)) {
    topic_lazy_update = injectStylesIntoStyleTag_default()(topic_lazy/* default */.Z, topic_lazy_options);
  }

  return topic_lazy_exported;
};
topic_lazy_exported.unuse = function() {
  if (topic_lazy_refs > 0 && !--topic_lazy_refs) {
    topic_lazy_update();
    topic_lazy_update = null;
  }
};




       /* harmony default export */ const zhihu_com_topic_lazy = (topic_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/topic.js

const zhihuTopic = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: zhihu_com_topic_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/zhihu-com/index.js




// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/juejin-cn/index.lazy.scss
var juejin_cn_index_lazy = __webpack_require__(5032);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/juejin-cn/index.lazy.scss

      var juejin_cn_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (juejin_cn_index_lazy/* default */.Z && juejin_cn_index_lazy/* default.locals */.Z.locals) {
              juejin_cn_index_lazy_exported.locals = juejin_cn_index_lazy/* default.locals */.Z.locals;
            }
            

var juejin_cn_index_lazy_refs = 0;
var juejin_cn_index_lazy_update;
var juejin_cn_index_lazy_options = {};

juejin_cn_index_lazy_options.styleTagTransform = (styleTagTransform_default());
juejin_cn_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      juejin_cn_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
juejin_cn_index_lazy_options.domAPI = (styleDomAPI_default());
juejin_cn_index_lazy_options.insertStyleElement = (insertStyleElement_default());

juejin_cn_index_lazy_exported.use = function(insertOptions) {
  juejin_cn_index_lazy_options.options = insertOptions || {};

  if (!(juejin_cn_index_lazy_refs++)) {
    juejin_cn_index_lazy_update = injectStylesIntoStyleTag_default()(juejin_cn_index_lazy/* default */.Z, juejin_cn_index_lazy_options);
  }

  return juejin_cn_index_lazy_exported;
};
juejin_cn_index_lazy_exported.unuse = function() {
  if (juejin_cn_index_lazy_refs > 0 && !--juejin_cn_index_lazy_refs) {
    juejin_cn_index_lazy_update();
    juejin_cn_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_juejin_cn_index_lazy = (juejin_cn_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/juejin-cn/index.js

const juejin = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_juejin_cn_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/crates-io/index.lazy.scss
var crates_io_index_lazy = __webpack_require__(4379);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/crates-io/index.lazy.scss

      var crates_io_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (crates_io_index_lazy/* default */.Z && crates_io_index_lazy/* default.locals */.Z.locals) {
              crates_io_index_lazy_exported.locals = crates_io_index_lazy/* default.locals */.Z.locals;
            }
            

var crates_io_index_lazy_refs = 0;
var crates_io_index_lazy_update;
var crates_io_index_lazy_options = {};

crates_io_index_lazy_options.styleTagTransform = (styleTagTransform_default());
crates_io_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      crates_io_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
crates_io_index_lazy_options.domAPI = (styleDomAPI_default());
crates_io_index_lazy_options.insertStyleElement = (insertStyleElement_default());

crates_io_index_lazy_exported.use = function(insertOptions) {
  crates_io_index_lazy_options.options = insertOptions || {};

  if (!(crates_io_index_lazy_refs++)) {
    crates_io_index_lazy_update = injectStylesIntoStyleTag_default()(crates_io_index_lazy/* default */.Z, crates_io_index_lazy_options);
  }

  return crates_io_index_lazy_exported;
};
crates_io_index_lazy_exported.unuse = function() {
  if (crates_io_index_lazy_refs > 0 && !--crates_io_index_lazy_refs) {
    crates_io_index_lazy_update();
    crates_io_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_crates_io_index_lazy = (crates_io_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/crates-io/index.js

const crates = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_crates_io_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/jianshu-com/index.lazy.scss
var jianshu_com_index_lazy = __webpack_require__(5502);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/jianshu-com/index.lazy.scss

      var jianshu_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (jianshu_com_index_lazy/* default */.Z && jianshu_com_index_lazy/* default.locals */.Z.locals) {
              jianshu_com_index_lazy_exported.locals = jianshu_com_index_lazy/* default.locals */.Z.locals;
            }
            

var jianshu_com_index_lazy_refs = 0;
var jianshu_com_index_lazy_update;
var jianshu_com_index_lazy_options = {};

jianshu_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
jianshu_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      jianshu_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
jianshu_com_index_lazy_options.domAPI = (styleDomAPI_default());
jianshu_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

jianshu_com_index_lazy_exported.use = function(insertOptions) {
  jianshu_com_index_lazy_options.options = insertOptions || {};

  if (!(jianshu_com_index_lazy_refs++)) {
    jianshu_com_index_lazy_update = injectStylesIntoStyleTag_default()(jianshu_com_index_lazy/* default */.Z, jianshu_com_index_lazy_options);
  }

  return jianshu_com_index_lazy_exported;
};
jianshu_com_index_lazy_exported.unuse = function() {
  if (jianshu_com_index_lazy_refs > 0 && !--jianshu_com_index_lazy_refs) {
    jianshu_com_index_lazy_update();
    jianshu_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_jianshu_com_index_lazy = (jianshu_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/jianshu-com/index.js

const jianshu = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_jianshu_com_index_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-baidu-com/index.js


const styles = __webpack_require__(632)/* ["default"].toString */ .Z.toString();

const baidu = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      const styleSheet = GM_addStyle(styles);
      interactive(() => {
        const template = document.createElement('template');
        template.appendChild(styleSheet); // 搜索时百度会清除head这里将样式插入一次到body

        document.body.insertAdjacentElement('afterbegin', template);
      });
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/tieba-baidu-com/p.lazy.scss
var p_lazy = __webpack_require__(2257);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/p.lazy.scss

      var p_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (p_lazy/* default */.Z && p_lazy/* default.locals */.Z.locals) {
              p_lazy_exported.locals = p_lazy/* default.locals */.Z.locals;
            }
            

var p_lazy_refs = 0;
var p_lazy_update;
var p_lazy_options = {};

p_lazy_options.styleTagTransform = (styleTagTransform_default());
p_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      p_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
p_lazy_options.domAPI = (styleDomAPI_default());
p_lazy_options.insertStyleElement = (insertStyleElement_default());

p_lazy_exported.use = function(insertOptions) {
  p_lazy_options.options = insertOptions || {};

  if (!(p_lazy_refs++)) {
    p_lazy_update = injectStylesIntoStyleTag_default()(p_lazy/* default */.Z, p_lazy_options);
  }

  return p_lazy_exported;
};
p_lazy_exported.unuse = function() {
  if (p_lazy_refs > 0 && !--p_lazy_refs) {
    p_lazy_update();
    p_lazy_update = null;
  }
};




       /* harmony default export */ const tieba_baidu_com_p_lazy = (p_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/p.js



const tieba = ({
  store,
  createControl
}) => ({
  handler() {
    const postlistSelector = '#j_p_postlist';

    function execute() {
      const replaceOriSrc = function () {
        const process = new WeakSet();
        return function () {
          const BDEImgEls = $$(`${postlistSelector} .BDE_Image`);
          BDEImgEls.forEach(img => {
            if (process.has(img)) return;
            process.add(img); // 贴吧自身根据
            // /^http:\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/ 判断是否相册，
            // 后续chrome更改必须为https访问时可能需要更改这里的逻辑
            // eslint-disable-next-line no-useless-escape

            if (/^http(s?):\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/.test(img.src)) {
              const protocol = img.src.match(/^(https?:\/\/)/)[0];
              img.src = `${protocol}tiebapic.baidu.com/forum/pic/item/${img.src.split('/').slice(-1)[0]}`; // 不能直接用css：贴吧根据宽高判断,用css宽高auto时若图片未加载宽高获取到0 导致无法查看大图

              img.style.cssText += 'max-width: 100%; width: auto !important; height: auto; max-height: 130vh;';
            }
          });
        };
      }();

      interactive(() => {
        // 替换原图
        replaceOriSrc();
        const observer = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const {
              target
            } = mutation;
            if (target.id !== postlistSelector.slice(1)) return;
            replaceOriSrc();
          });
        });
        observer.observe($('.left_section'), {
          childList: true,
          subtree: true
        });
      });
      tieba_baidu_com_p_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/tieba-baidu-com/f.lazy.scss
var f_lazy = __webpack_require__(778);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/f.lazy.scss

      var f_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (f_lazy/* default */.Z && f_lazy/* default.locals */.Z.locals) {
              f_lazy_exported.locals = f_lazy/* default.locals */.Z.locals;
            }
            

var f_lazy_refs = 0;
var f_lazy_update;
var f_lazy_options = {};

f_lazy_options.styleTagTransform = (styleTagTransform_default());
f_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      f_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
f_lazy_options.domAPI = (styleDomAPI_default());
f_lazy_options.insertStyleElement = (insertStyleElement_default());

f_lazy_exported.use = function(insertOptions) {
  f_lazy_options.options = insertOptions || {};

  if (!(f_lazy_refs++)) {
    f_lazy_update = injectStylesIntoStyleTag_default()(f_lazy/* default */.Z, f_lazy_options);
  }

  return f_lazy_exported;
};
f_lazy_exported.unuse = function() {
  if (f_lazy_refs > 0 && !--f_lazy_refs) {
    f_lazy_update();
    f_lazy_update = null;
  }
};




       /* harmony default export */ const tieba_baidu_com_f_lazy = (f_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/f.js

const tiebaForum = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: tieba_baidu_com_f_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/tieba-baidu-com/index.js



// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-sogou-com/index.lazy.scss
var www_sogou_com_index_lazy = __webpack_require__(3471);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-sogou-com/index.lazy.scss

      var www_sogou_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (www_sogou_com_index_lazy/* default */.Z && www_sogou_com_index_lazy/* default.locals */.Z.locals) {
              www_sogou_com_index_lazy_exported.locals = www_sogou_com_index_lazy/* default.locals */.Z.locals;
            }
            

var www_sogou_com_index_lazy_refs = 0;
var www_sogou_com_index_lazy_update;
var www_sogou_com_index_lazy_options = {};

www_sogou_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
www_sogou_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      www_sogou_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
www_sogou_com_index_lazy_options.domAPI = (styleDomAPI_default());
www_sogou_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

www_sogou_com_index_lazy_exported.use = function(insertOptions) {
  www_sogou_com_index_lazy_options.options = insertOptions || {};

  if (!(www_sogou_com_index_lazy_refs++)) {
    www_sogou_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_sogou_com_index_lazy/* default */.Z, www_sogou_com_index_lazy_options);
  }

  return www_sogou_com_index_lazy_exported;
};
www_sogou_com_index_lazy_exported.unuse = function() {
  if (www_sogou_com_index_lazy_refs > 0 && !--www_sogou_com_index_lazy_refs) {
    www_sogou_com_index_lazy_update();
    www_sogou_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_www_sogou_com_index_lazy = (www_sogou_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-sogou-com/index.js

const sougou = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_www_sogou_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/segmentfault-com/index.lazy.scss
var segmentfault_com_index_lazy = __webpack_require__(3250);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/segmentfault-com/index.lazy.scss

      var segmentfault_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (segmentfault_com_index_lazy/* default */.Z && segmentfault_com_index_lazy/* default.locals */.Z.locals) {
              segmentfault_com_index_lazy_exported.locals = segmentfault_com_index_lazy/* default.locals */.Z.locals;
            }
            

var segmentfault_com_index_lazy_refs = 0;
var segmentfault_com_index_lazy_update;
var segmentfault_com_index_lazy_options = {};

segmentfault_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
segmentfault_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      segmentfault_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
segmentfault_com_index_lazy_options.domAPI = (styleDomAPI_default());
segmentfault_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

segmentfault_com_index_lazy_exported.use = function(insertOptions) {
  segmentfault_com_index_lazy_options.options = insertOptions || {};

  if (!(segmentfault_com_index_lazy_refs++)) {
    segmentfault_com_index_lazy_update = injectStylesIntoStyleTag_default()(segmentfault_com_index_lazy/* default */.Z, segmentfault_com_index_lazy_options);
  }

  return segmentfault_com_index_lazy_exported;
};
segmentfault_com_index_lazy_exported.unuse = function() {
  if (segmentfault_com_index_lazy_refs > 0 && !--segmentfault_com_index_lazy_refs) {
    segmentfault_com_index_lazy_update();
    segmentfault_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_segmentfault_com_index_lazy = (segmentfault_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/segmentfault-com/index.js

const segmentfault = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_segmentfault_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-bilibili-com/index.lazy.scss
var www_bilibili_com_index_lazy = __webpack_require__(5927);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-bilibili-com/index.lazy.scss

      var www_bilibili_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (www_bilibili_com_index_lazy/* default */.Z && www_bilibili_com_index_lazy/* default.locals */.Z.locals) {
              www_bilibili_com_index_lazy_exported.locals = www_bilibili_com_index_lazy/* default.locals */.Z.locals;
            }
            

var www_bilibili_com_index_lazy_refs = 0;
var www_bilibili_com_index_lazy_update;
var www_bilibili_com_index_lazy_options = {};

www_bilibili_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
www_bilibili_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      www_bilibili_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
www_bilibili_com_index_lazy_options.domAPI = (styleDomAPI_default());
www_bilibili_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

www_bilibili_com_index_lazy_exported.use = function(insertOptions) {
  www_bilibili_com_index_lazy_options.options = insertOptions || {};

  if (!(www_bilibili_com_index_lazy_refs++)) {
    www_bilibili_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_bilibili_com_index_lazy/* default */.Z, www_bilibili_com_index_lazy_options);
  }

  return www_bilibili_com_index_lazy_exported;
};
www_bilibili_com_index_lazy_exported.unuse = function() {
  if (www_bilibili_com_index_lazy_refs > 0 && !--www_bilibili_com_index_lazy_refs) {
    www_bilibili_com_index_lazy_update();
    www_bilibili_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_www_bilibili_com_index_lazy = (www_bilibili_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-bilibili-com/index.js



const bilibili = ({
  store,
  createControl
}) => ({
  handler() {
    function execute() {
      /* 替换为原图 */
      // 稍微延时，待哔哩哔哩处理图片
      DOMContentLoaded(() => {
        $$('#article-content .img-box img[data-type="preview"][data-src]').forEach(img => {
          const {
            src
          } = img.dataset;
          const original = src.replace(/@[0-9a-z]+_[0-9a-z]+_/i, '@');
          img.dataset.src = original;
        });
      });
      sites_www_bilibili_com_index_lazy.use();
    }

    createControl({
      store,
      execute
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/t-bilibili-com/index.lazy.scss
var t_bilibili_com_index_lazy = __webpack_require__(3338);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/index.lazy.scss

      var t_bilibili_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (t_bilibili_com_index_lazy/* default */.Z && t_bilibili_com_index_lazy/* default.locals */.Z.locals) {
              t_bilibili_com_index_lazy_exported.locals = t_bilibili_com_index_lazy/* default.locals */.Z.locals;
            }
            

var t_bilibili_com_index_lazy_refs = 0;
var t_bilibili_com_index_lazy_update;
var t_bilibili_com_index_lazy_options = {};

t_bilibili_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
t_bilibili_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      t_bilibili_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
t_bilibili_com_index_lazy_options.domAPI = (styleDomAPI_default());
t_bilibili_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

t_bilibili_com_index_lazy_exported.use = function(insertOptions) {
  t_bilibili_com_index_lazy_options.options = insertOptions || {};

  if (!(t_bilibili_com_index_lazy_refs++)) {
    t_bilibili_com_index_lazy_update = injectStylesIntoStyleTag_default()(t_bilibili_com_index_lazy/* default */.Z, t_bilibili_com_index_lazy_options);
  }

  return t_bilibili_com_index_lazy_exported;
};
t_bilibili_com_index_lazy_exported.unuse = function() {
  if (t_bilibili_com_index_lazy_refs > 0 && !--t_bilibili_com_index_lazy_refs) {
    t_bilibili_com_index_lazy_update();
    t_bilibili_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_t_bilibili_com_index_lazy = (t_bilibili_com_index_lazy_exported);

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
;// CONCATENATED MODULE: ./src/utils/dom.ts
function parseToDOM(str) {
  const div = document.createElement('div');

  if (typeof str === 'string') {
    div.innerHTML = str;
  }

  return div.childNodes;
}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/t-bilibili-com/mocha-official-gifts.lazy.scss
var mocha_official_gifts_lazy = __webpack_require__(8191);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/mocha-official-gifts.lazy.scss

      var mocha_official_gifts_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (mocha_official_gifts_lazy/* default */.Z && mocha_official_gifts_lazy/* default.locals */.Z.locals) {
              mocha_official_gifts_lazy_exported.locals = mocha_official_gifts_lazy/* default.locals */.Z.locals;
            }
            

var mocha_official_gifts_lazy_refs = 0;
var mocha_official_gifts_lazy_update;
var mocha_official_gifts_lazy_options = {};

mocha_official_gifts_lazy_options.styleTagTransform = (styleTagTransform_default());
mocha_official_gifts_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      mocha_official_gifts_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
mocha_official_gifts_lazy_options.domAPI = (styleDomAPI_default());
mocha_official_gifts_lazy_options.insertStyleElement = (insertStyleElement_default());

mocha_official_gifts_lazy_exported.use = function(insertOptions) {
  mocha_official_gifts_lazy_options.options = insertOptions || {};

  if (!(mocha_official_gifts_lazy_refs++)) {
    mocha_official_gifts_lazy_update = injectStylesIntoStyleTag_default()(mocha_official_gifts_lazy/* default */.Z, mocha_official_gifts_lazy_options);
  }

  return mocha_official_gifts_lazy_exported;
};
mocha_official_gifts_lazy_exported.unuse = function() {
  if (mocha_official_gifts_lazy_refs > 0 && !--mocha_official_gifts_lazy_refs) {
    mocha_official_gifts_lazy_update();
    mocha_official_gifts_lazy_update = null;
  }
};




       /* harmony default export */ const t_bilibili_com_mocha_official_gifts_lazy = (mocha_official_gifts_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/mocha-official-gifts.js





load(async () => {
  const MochaId = '212535360';

  if (location.href.includes('space.bilibili.com/' + MochaId)) {
    youAreNotAlone();
    return;
  }

  await sleep(1000);
  const uploader = $('.main-content .user-name a[href]')?.href;
  if (!uploader) return;
  const isMocha = uploader.match(/\/(\d+)\//)?.[1] === MochaId;
  if (!isMocha) return;
  youAreNotAlone();
});

function youAreNotAlone() {
  t_bilibili_com_mocha_official_gifts_lazy.use();
  document.body.append(parseToDOM(strawberry)[0]);
}
/*
  墨茶最爱吃的
  🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓
  🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓
  🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓🍓
*/


const strawberry = '<svg class="mocha-strawberry" t="1611323249307" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3471" width="200" height="200"><path d="M799 780c-27.5 27.5-100.4 64.8-188.8 97.1 1.6-0.6 3.3-1.2 4.9-1.8-24.2-40.7-66.3-22.5-91.9-58.4-25.6-35.9 72.6-132.4 10.2-205S403.5 576 348 571.8c-55.5-4.3-114.5-75.2-147.8-120.5-13.9-18.9-20.7-54.3-23.8-89 17.6-41.9 37-78 56.7-104.7 2.6 32.6 19.6 94.1 64.7 102.9 117 23.1 184.3-39.1 256.3-6.8 17.7 7.9 29.5 22.5 38 40.8 13.9 29.6 19.6 68.9 29 105.2 9.2 35.4 21.9 68.1 49.1 86.4 64.5 43.2 132.2 49.4 187.3 9.6 3.9-2.8 7.7-5.8 11.4-9 11.4 86.1-26.6 150.1-69.9 193.3z" fill="#F9724C" p-id="3472"></path><path d="M615.2 875.3c-51.8 19.1-104.7 35.2-158.5 47.7-53.5 12.4-108.3 21.7-163.4 22.7-31 0.6-62.7-1.3-92.6-10 6 1.7 12.9 4.4 19.1 3.7 5-0.6 9.9-1.4 14.8-2.6 10.2-2.4 20.1-6.2 29.4-11.2 21.8-11.6 40.8-29.7 54.5-50.2 22.8-34.3 8.2-74.7-10.6-107.1-26.5-45.7-62.2-85.5-94.1-127.3-14.6-19.1-28.1-37.9-36.5-60.6-8-21.7-12.2-44.6-14.2-67.5-4-44.3-0.3-89.2 6.8-132.9 1-6.2 4.1-12 6.6-17.8 2.4 26.4 5.7 55.1 17.8 79.1 6.1 12 15.4 22.6 23.7 33.1 8.5 10.7 17.3 21.1 26.6 31.1 18 19.5 37.9 38.1 60.9 51.5 11.1 6.5 23.3 11.7 36.1 13.9 13.8 2.3 28 1 41.8-0.4 28-2.9 56.3-7.5 84.2-1 25.6 6 47.4 21.2 64.5 40.7 18 20.5 24.8 46 21.6 73-3.3 27.7-15 53.3-24.8 79.1-4.6 12.2-9.9 25.3-10 38.5-0.2 12.9 8.1 22.7 18.2 29.8 20.4 14.4 48.2 13.2 67 30.7 4.3 4.2 8 8.9 11.1 14z" fill="#ED4233" p-id="3473"></path><path d="M316.5 878.4c-14 19.3-31.6 36.3-52.8 47.5-10.5 5.5-21.8 9.6-33.4 11.9-5.1 1-10.7 2.4-15.8 1.4-6.2-1.2-12.4-3-18.5-4.9-21.7-6.9-41.9-18.1-56.7-35.8-15-18-24.2-40.2-30.3-62.6-13.1-47.9-13.6-99-10.4-148.3 3.3-50.4 11.3-100.5 22.4-149.7 12.4-54.9 29-108.6 49.4-161 0 3.9-1.3 8.2-1.9 12-0.6 4.2-1.2 8.4-1.8 12.7-1.2 8.9-2.2 17.9-3 26.9-1.7 18.9-2.5 37.9-2.1 56.9 0.7 36.2 5.6 73.4 20.5 106.7 7.4 16.5 18 30.7 28.9 45.1 11.1 14.7 22.6 29.2 34 43.6 22.2 28.2 45.1 56.4 63.1 87.5 9.7 16.7 18.3 34.8 21.3 54.1 3.1 19.9-1.1 39.7-12.9 56z" fill="#D10305" p-id="3474"></path><path d="M869 586.6c-21.1 18.3-46.9 30.9-74.7 34.5-28.2 3.6-56.8-1.9-82.9-12.7-24.7-10.3-50-24.3-65.3-47-15.9-23.6-23-52.2-29.3-79.6-6.4-28-11.4-57-22.9-83.5-5.1-11.8-11.8-23-21.1-31.9-9.4-9-21.1-14.6-33.6-18.1-28.7-8-58.4-2.6-87 3.4-29.1 6.1-58.2 12.5-88.1 13.8-15 0.7-30.1 0.1-45.1-1.6-13.7-1.6-27.9-3.3-39.9-10.7-22.2-13.8-34.1-40.2-40.6-64.6-1.8-6.9-3.3-13.8-4.3-20.9-0.4-2.8-1.5-6.5-1.1-9.2 0.3-2.1 1.8-3.4 3.1-5.2 8.7-11.3 18.4-21.5 29-31 21-19 44.3-35.6 70.2-47.1 26.7-11.8 55.6-17.8 84.8-17.3 29.2 0.5 58 7.3 85.2 17.7 54.5 20.9 103 55.3 147.2 92.9 44.4 37.8 86.1 79.6 122.6 125.1 36.3 45.2 68.4 95.7 84.9 151.6 4 13.6 7.1 27.5 8.9 41.4z" fill="#F7B696" p-id="3475"></path><path d="M621.2 499.7c-22.3 2.4-37.4 2.1-37.4 2.1s-10.2-48.5 8.4-107.4c13.9 29.7 19.6 68.9 29 105.3z" fill="#ED4233" p-id="3476"></path><path d="M870.8 606.2c-4.4-3.3-8.8-6.9-13.1-10.5-47.8-40.3-92.7-100.2-92.7-151.8-38.7 38.7-103 51.6-143.7 55.9-9.4-36.4-15.1-75.6-29-105.2 8.5-26.8 22.9-55.8 47.1-83.4-101.2 0-150.5-92.4-178.2-148.6 0.5 0.1 1 0.2 1.4 0.3 1.3 0.3 2.7 0.6 4 0.9 0.6 0.1 1.2 0.3 1.7 0.4 1.6 0.4 3.3 0.8 4.9 1.2 0.5 0.1 1 0.2 1.4 0.4 2 0.5 4.1 1.1 6.2 1.7 0.7 0.2 1.3 0.4 2 0.6 2.1 0.6 4.2 1.3 6.3 1.9 0.7 0.2 1.4 0.4 2.1 0.7 1.1 0.4 2.3 0.8 3.4 1.2 0.8 0.3 1.7 0.6 2.5 0.9 2.6 0.9 5.3 1.9 7.9 2.9 1 0.4 2.1 0.8 3.1 1.2 2.6 1 5.2 2.1 7.8 3.2 1 0.4 2.1 0.9 3.1 1.3 0.2 0.1 0.3 0.1 0.5 0.2 0.9 0.4 1.9 0.8 2.9 1.3 1.4 0.6 2.7 1.2 4.1 1.9 1.2 0.6 2.4 1.1 3.6 1.7 1.2 0.6 2.4 1.1 3.6 1.7 1.3 0.6 2.5 1.2 3.8 1.9 1.1 0.5 2.1 1.1 3.2 1.6 2.6 1.3 5.3 2.8 8 4.2 1.3 0.7 2.5 1.4 3.8 2.1 0.1 0.1 0.3 0.2 0.4 0.2 1.1 0.6 2.3 1.3 3.4 1.9 1.2 0.7 2.4 1.4 3.6 2 0.1 0.1 0.2 0.1 0.2 0.1 2.5 1.5 5.1 3 7.7 4.5 1.4 0.8 2.8 1.7 4.2 2.5 1.2 0.7 2.4 1.5 3.6 2.2 2.6 1.6 5.2 3.3 7.9 5l5.1 3.3c1 0.7 1.9 1.3 2.9 1.9 1.3 0.9 2.7 1.8 4 2.7s2.7 1.9 4 2.8c2.7 1.9 5.4 3.8 8.1 5.8 0.2 0.2 0.4 0.3 0.7 0.5 1.1 0.8 2.3 1.7 3.4 2.5 1.4 1 2.7 2 4.1 3 1.4 1 2.8 2.1 4.1 3.1 1.1 0.9 2.3 1.8 3.4 2.6 0.3 0.2 0.6 0.5 0.9 0.7 1.3 1 2.7 2.1 4 3.1l0.2 0.2c1.3 1.1 2.7 2.1 4 3.2 1.4 1.1 2.8 2.3 4.2 3.4 1.4 1.1 2.7 2.2 4.1 3.3 0.2 0.2 0.4 0.3 0.7 0.5 1.3 1 2.5 2.1 3.8 3.2 1.4 1.2 2.9 2.4 4.3 3.6 1.4 1.2 2.9 2.4 4.3 3.7 1.4 1.2 2.9 2.5 4.3 3.7 1.4 1.3 2.9 2.5 4.4 3.8s2.9 2.6 4.4 3.9c2.9 2.6 5.8 5.2 8.7 7.9 0.1 0.1 0.2 0.2 0.4 0.3 2.7 2.5 5.5 5 8.2 7.6l0.5 0.5c3 2.8 6 5.7 9 8.6 1.4 1.4 2.9 2.8 4.3 4.1l0.3 0.3c2.7 2.6 5.4 5.3 8.2 8l1 1 4.6 4.6c3.5 3.5 7 7.1 10.4 10.6 0.9 0.9 1.7 1.8 2.5 2.6 0.8 0.9 1.7 1.7 2.5 2.6 2.5 2.6 5 5.2 7.4 7.8 0.1 0.1 0.2 0.3 0.4 0.4 1.5 1.6 2.9 3.2 4.4 4.7 1.6 1.7 3.2 3.5 4.7 5.2 0.8 0.9 1.5 1.7 2.3 2.6 2.3 2.5 4.6 5.1 6.8 7.6 0.7 0.8 1.5 1.7 2.2 2.5s1.5 1.7 2.2 2.5c11.4 13.3 21.9 26.2 31.3 38.9 0.6 0.7 1.1 1.5 1.6 2.2 9.3 12.5 17.6 24.7 25 36.6 0.4 0.7 0.9 1.4 1.3 2 0.5 0.7 0.9 1.5 1.4 2.2 0.8 1.3 1.6 2.7 2.4 4 1.7 2.8 3.3 5.5 4.8 8.3 3.1 5.5 6.1 10.9 8.9 16.2 0.7 1.3 1.4 2.7 2 4 1.4 2.7 2.7 5.3 3.9 7.9 0.6 1.2 1.1 2.4 1.7 3.5 0.1 0.3 0.3 0.5 0.4 0.8 0.4 0.8 0.8 1.7 1.1 2.5 0.3 0.6 0.6 1.2 0.8 1.8 0.5 1 0.9 2 1.4 3.1 0.5 1.2 1 2.3 1.5 3.5s1 2.4 1.5 3.5c0.3 0.8 0.6 1.5 0.9 2.3 0.4 0.9 0.7 1.8 1.1 2.7 0.4 1.1 0.9 2.3 1.3 3.4 0.5 1.3 1 2.5 1.4 3.8 0.9 2.5 1.8 5 2.6 7.5 0.4 1.1 0.7 2.2 1.1 3.3 0.1 0.2 0.1 0.3 0.2 0.5 0.4 1.2 0.8 2.4 1.1 3.5v0.1c0.3 0.8 0.5 1.7 0.8 2.5 0.2 0.6 0.4 1.3 0.6 1.9 0.3 1 0.6 1.9 0.8 2.9 0.3 1.2 0.7 2.3 1 3.4 0 0.1 0.1 0.2 0.1 0.4 0.6 2.3 1.2 4.5 1.7 6.7 1.2 4.8 2.2 9.6 3.1 14.3 0.2 1.2 0.4 2.3 0.6 3.5 0.2 1.1 0.4 2.3 0.6 3.4 0.2 1.1 0.4 2.3 0.5 3.4 0.2 1.1 0.3 2.3 0.5 3.4 1 6.5 1.6 13 1.9 19.4z" fill="#F9724C" p-id="3477"></path><path d="M773.1 282.7c56-33.2 84.3-95.3 85.7-98.4 4.1-9.1 0-19.9-9.2-23.9-9.1-4.1-19.9 0-23.9 9.2-0.1 0.2-8.6 19-25.3 40.3-12.6 16-31.9 36-57 47.5C671.9 74.2 523.7 95 427.5 105.7c24.6 45.7 71.7 174.8 191.3 174.8-77.1 88.1-55.5 190.7-55.5 190.7s121.4 1.8 181.1-58c0 84.4 120.2 190.9 176.4 197.9 3-89.4 23.5-269.7-147.7-328.4z" fill="#91AB48" p-id="3478"></path><path d="M800.4 209.8c16.7-21.3 25.2-40.1 25.3-40.3 4.1-9.1 14.8-13.2 23.9-9.1 3 1.3 5.4 3.3 7.2 5.8 0.1-0.2 0.2-0.4 0.2-0.5 3.9-8.8 0-19.1-8.8-23.1-8.8-3.9-19.1 0-23.1 8.8-0.1 0.2-8.3 18.3-24.4 38.8-12.1 15.5-30.8 34.7-54.9 45.8C677 59.6 534.2 79.6 441.6 89.9c2.1 3.9 4.4 8.5 6.9 13.5 95.6-10.3 228.5-16.3 295 154 25-11.6 44.4-31.5 56.9-47.6zM794.1 268c-6.5 5.3-13.5 10.2-21 14.7C868.6 315.4 904.5 386 917 457.5c-6.9-72.9-33.8-150.4-122.9-189.5zM273.4 213.6c-2.8 2.8-5.5 5.8-8.3 9 50.9-46.5 112.7-75.2 190.9-61-4-7.2-7.6-14.2-10.9-20.9-70-4.9-125.6 26.8-171.7 72.9z" fill="#FFFFFF" p-id="3479"></path><path d="M911.2 431c-0.3 24.1-6.3 42-23.5 42-53 0-67.3-87.7-96.7-59s-52.2-18.5-62.4-29.7-63.2 1-90.9-37.8c-27.7-38.7 46-97.9 28.2-130.5S522.4 182.6 551 132.4c7.4-13 23-20.4 41.9-24.1 58.6 16 114.3 56.5 150.5 149 25.1-11.5 44.4-31.5 57-47.5 16.7-21.3 25.2-40.1 25.3-40.3 4.1-9.1 14.8-13.2 23.9-9.1 9.1 4.1 13.2 14.8 9.2 23.9-1.4 3.1-29.7 65.2-85.7 98.4 83.7 28.7 121.6 86.4 138.1 148.3z" fill="#A6BF4C" p-id="3480"></path><path d="M270 213.3c2.9 0 5.8-1.2 7.8-3.3 56.7-56.8 116.8-78.8 183.8-67.4 3.1 1.4 6.8 1.4 9.9-0.3 0.8-0.4 1.5-0.9 2.1-1.5 1.9-1.6 3.3-3.8 3.8-6.5 0.5-2.9-0.1-5.8-1.7-8.2-0.4-0.6-0.9-1.2-1.4-1.7-5.3-9.8-10-19.3-14.2-27.7l-2.1-4.3c-0.8-1.7-1.6-3.3-2.4-4.9 33.6-3.7 77.4-7.8 119-0.6 50.2 8.7 89.4 32.1 119.9 71.4 2 2.7 5.2 4.3 8.7 4.3 2.5 0 4.8-0.8 6.8-2.4 2.3-1.7 3.8-4.3 4.2-7.1 0.4-2.9-0.4-5.9-2.2-8.3-34.2-44.2-78.3-70.2-134.8-79.8-47.6-8-95.4-2.7-133.8 1.7l-5.9 0.7c-3.5 0.3-6.6 2.5-8.5 5.6-1.8 3.1-1.9 7-0.2 10.4l0.1 0.1c2.3 4.2 4.7 9.2 7.5 14.9l3.4 6.9c2 4.1 4.2 8.5 6.5 13.1-66.8-5.8-127.3 19.2-184.1 76l-0.1 0.1c-4.1 4.3-4.1 11.2 0 15.4 2.1 2.2 4.9 3.4 7.9 3.4zM841.6 671.9c-2.5-1.5-5.4-2-8.3-1.3-2.9 0.7-5.3 2.5-6.8 4.9-9.9 16.3-22.3 31.9-36.9 46.5-17.7 17.7-58.5 41.3-111.9 64.7-56.6 24.8-122.5 47.4-185.5 63.6-72.1 18.6-138.1 28.5-191 28.6H300c-59.9 0-102.2-12-125.9-35.6-18.1-18.1-30.8-46.7-37.7-85-6.5-36.1-7.8-79.5-3.7-129.1 7.5-91.4 33-198.3 68.2-286.1 1.2-2.8 1.2-5.8 0-8.5s-3.3-4.8-6-5.9c-2.7-1.1-5.7-1.1-8.4 0-2.7 1.2-4.8 3.3-5.9 6-36 89.7-62.1 199-69.7 292.5-4.2 51.6-2.9 96.9 4 134.8 7.7 42.8 22.4 75.3 43.8 96.7 28 27.9 75.6 42.1 141.4 42.1h0.2l0.4 0.1h0.6c54.8-0.2 122.7-10.4 196.4-29.4 131.1-33.9 266.2-92.8 307.5-134.1 15.9-15.9 29.4-32.9 40.1-50.5 3.1-5.1 1.5-11.8-3.7-15zM913.9 381.1c-9.8-32.5-25.1-60.5-45.4-83-19.4-21.6-43.8-38.9-72.7-51.5 46-35.5 69.1-87.3 69.4-87.9 6.4-14.3-0.1-31.3-14.4-37.7-6.8-3.1-14.6-3.3-21.9-0.6-7 2.7-12.7 8.1-15.8 15v0.1c-0.9 1.8-8.7 18.4-23.1 36.7-10.7 13.7-28.3 32.3-51 42.7-2.7 1.2-4.7 3.5-5.7 6.2-1 2.8-0.9 5.8 0.4 8.4 1.2 2.7 3.5 4.7 6.2 5.7 2.8 1 5.8 0.9 8.4-0.4 26.7-12.3 46.9-33.5 59.1-49.2 15.6-19.9 24.1-37.6 25.8-41.1l0.1-0.1c0.8-1.7 2-2.8 3.6-3.5 1.2-0.5 3-0.8 5 0.1 3.3 1.5 4.7 5.3 3.3 8.6l-0.1 0.2c-4.7 10.1-30.7 61.6-78.3 89.9-3.6 2.2-5.7 6.3-5.3 10.5 0.4 4.3 3.1 7.9 7.4 9.4 34.2 11.7 62.3 29.6 83.4 53.3 18.2 20.3 31.9 45.6 40.8 75.1 16.4 54.7 13.8 115.1 11.9 159.1-0.1 1.9-0.2 3.8-0.2 5.7-11.3-3.7-24.6-10.8-39-20.6-4.9-3.3-11.7-2-15.2 2.9l-0.1 0.1c-3.3 4.9-2 11.7 3 15.2 23.1 15.7 44 25 60.5 27.1h1.3c2.4 0 4.8-0.8 6.8-2.3l0.3-0.2c2.3-1.9 3.7-4.8 3.9-7.9v-0.2c0.1-5.3 0.3-11 0.6-17.1l0.1-2.4c1.8-45.7 4.4-108.2-13.1-166.3z" fill="#934A19" p-id="3481"></path></svg>';
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/t-bilibili-com/detail.lazy.scss
var detail_lazy = __webpack_require__(158);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/detail.lazy.scss

      var detail_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (detail_lazy/* default */.Z && detail_lazy/* default.locals */.Z.locals) {
              detail_lazy_exported.locals = detail_lazy/* default.locals */.Z.locals;
            }
            

var detail_lazy_refs = 0;
var detail_lazy_update;
var detail_lazy_options = {};

detail_lazy_options.styleTagTransform = (styleTagTransform_default());
detail_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      detail_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
detail_lazy_options.domAPI = (styleDomAPI_default());
detail_lazy_options.insertStyleElement = (insertStyleElement_default());

detail_lazy_exported.use = function(insertOptions) {
  detail_lazy_options.options = insertOptions || {};

  if (!(detail_lazy_refs++)) {
    detail_lazy_update = injectStylesIntoStyleTag_default()(detail_lazy/* default */.Z, detail_lazy_options);
  }

  return detail_lazy_exported;
};
detail_lazy_exported.unuse = function() {
  if (detail_lazy_refs > 0 && !--detail_lazy_refs) {
    detail_lazy_update();
    detail_lazy_update = null;
  }
};




       /* harmony default export */ const t_bilibili_com_detail_lazy = (detail_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/detail.js


const bilibiliDynamicDetail = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: t_bilibili_com_detail_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/t-bilibili-com/index.js

const bilibiliDynamic = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_t_bilibili_com_index_lazy.use
    });
  }

});

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/space-bilibili-com/index.js

const bilibiliSpace = ({
  store,
  createControl
}) => ({
  handler() {}

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-douban-com/index.lazy.scss
var www_douban_com_index_lazy = __webpack_require__(5201);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-douban-com/index.lazy.scss

      var www_douban_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (www_douban_com_index_lazy/* default */.Z && www_douban_com_index_lazy/* default.locals */.Z.locals) {
              www_douban_com_index_lazy_exported.locals = www_douban_com_index_lazy/* default.locals */.Z.locals;
            }
            

var www_douban_com_index_lazy_refs = 0;
var www_douban_com_index_lazy_update;
var www_douban_com_index_lazy_options = {};

www_douban_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
www_douban_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      www_douban_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
www_douban_com_index_lazy_options.domAPI = (styleDomAPI_default());
www_douban_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

www_douban_com_index_lazy_exported.use = function(insertOptions) {
  www_douban_com_index_lazy_options.options = insertOptions || {};

  if (!(www_douban_com_index_lazy_refs++)) {
    www_douban_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_douban_com_index_lazy/* default */.Z, www_douban_com_index_lazy_options);
  }

  return www_douban_com_index_lazy_exported;
};
www_douban_com_index_lazy_exported.unuse = function() {
  if (www_douban_com_index_lazy_refs > 0 && !--www_douban_com_index_lazy_refs) {
    www_douban_com_index_lazy_update();
    www_douban_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_www_douban_com_index_lazy = (www_douban_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-douban-com/index.js

const douban = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_www_douban_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/movie-douban-com/subject.lazy.scss
var subject_lazy = __webpack_require__(6587);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/movie-douban-com/subject.lazy.scss

      var subject_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (subject_lazy/* default */.Z && subject_lazy/* default.locals */.Z.locals) {
              subject_lazy_exported.locals = subject_lazy/* default.locals */.Z.locals;
            }
            

var subject_lazy_refs = 0;
var subject_lazy_update;
var subject_lazy_options = {};

subject_lazy_options.styleTagTransform = (styleTagTransform_default());
subject_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      subject_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
subject_lazy_options.domAPI = (styleDomAPI_default());
subject_lazy_options.insertStyleElement = (insertStyleElement_default());

subject_lazy_exported.use = function(insertOptions) {
  subject_lazy_options.options = insertOptions || {};

  if (!(subject_lazy_refs++)) {
    subject_lazy_update = injectStylesIntoStyleTag_default()(subject_lazy/* default */.Z, subject_lazy_options);
  }

  return subject_lazy_exported;
};
subject_lazy_exported.unuse = function() {
  if (subject_lazy_refs > 0 && !--subject_lazy_refs) {
    subject_lazy_update();
    subject_lazy_update = null;
  }
};




       /* harmony default export */ const movie_douban_com_subject_lazy = (subject_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/movie-douban-com/subject.js

const doubanSubject = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: movie_douban_com_subject_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/movie-douban-com/review.js
// 貌似样式一样的，直接用subject的吧

const doubanReview = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: movie_douban_com_subject_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/movie-douban-com/index.js


// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-toutiao-com/index.lazy.scss
var www_toutiao_com_index_lazy = __webpack_require__(5186);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-toutiao-com/index.lazy.scss

      var www_toutiao_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (www_toutiao_com_index_lazy/* default */.Z && www_toutiao_com_index_lazy/* default.locals */.Z.locals) {
              www_toutiao_com_index_lazy_exported.locals = www_toutiao_com_index_lazy/* default.locals */.Z.locals;
            }
            

var www_toutiao_com_index_lazy_refs = 0;
var www_toutiao_com_index_lazy_update;
var www_toutiao_com_index_lazy_options = {};

www_toutiao_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
www_toutiao_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      www_toutiao_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
www_toutiao_com_index_lazy_options.domAPI = (styleDomAPI_default());
www_toutiao_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

www_toutiao_com_index_lazy_exported.use = function(insertOptions) {
  www_toutiao_com_index_lazy_options.options = insertOptions || {};

  if (!(www_toutiao_com_index_lazy_refs++)) {
    www_toutiao_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_toutiao_com_index_lazy/* default */.Z, www_toutiao_com_index_lazy_options);
  }

  return www_toutiao_com_index_lazy_exported;
};
www_toutiao_com_index_lazy_exported.unuse = function() {
  if (www_toutiao_com_index_lazy_refs > 0 && !--www_toutiao_com_index_lazy_refs) {
    www_toutiao_com_index_lazy_update();
    www_toutiao_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_www_toutiao_com_index_lazy = (www_toutiao_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-toutiao-com/index.js

const toutiao = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_www_toutiao_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/weibo-com/article.lazy.scss
var article_lazy = __webpack_require__(7028);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/weibo-com/article.lazy.scss

      var article_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (article_lazy/* default */.Z && article_lazy/* default.locals */.Z.locals) {
              article_lazy_exported.locals = article_lazy/* default.locals */.Z.locals;
            }
            

var article_lazy_refs = 0;
var article_lazy_update;
var article_lazy_options = {};

article_lazy_options.styleTagTransform = (styleTagTransform_default());
article_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      article_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
article_lazy_options.domAPI = (styleDomAPI_default());
article_lazy_options.insertStyleElement = (insertStyleElement_default());

article_lazy_exported.use = function(insertOptions) {
  article_lazy_options.options = insertOptions || {};

  if (!(article_lazy_refs++)) {
    article_lazy_update = injectStylesIntoStyleTag_default()(article_lazy/* default */.Z, article_lazy_options);
  }

  return article_lazy_exported;
};
article_lazy_exported.unuse = function() {
  if (article_lazy_refs > 0 && !--article_lazy_refs) {
    article_lazy_update();
    article_lazy_update = null;
  }
};




       /* harmony default export */ const weibo_com_article_lazy = (article_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/weibo-com/article.js

const weiboArticle = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: weibo_com_article_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/weibo-com/index.js




const homeStyles = __webpack_require__(5258)/* ["default"].toString */ .Z.toString();

const playDetailStyles = __webpack_require__(8184)/* ["default"].toString */ .Z.toString();


const weibo = ({
  store,
  createControl
}) => ({
  handler() {
    const uiControl = createControl({
      store,
      visible: false,
      silent: true
    });
    execute();

    function execute() {
      let proxyConfig;
      document.addEventListener('readystatechange', () => {
        // 是否启用新版微博
        if ($('#app') && $('#app').__vue__) {
          WbNewVersion();
          return;
        }

        if (!unsafeWindow.$CONFIG) return;
        if (proxyConfig && proxyConfig === unsafeWindow.$CONFIG) return;
        const handler = {
          set(target, property, value, receiver) {
            const oldVal = target[property];
            const succeeded = Reflect.set(target, property, value, receiver);

            if (property === 'location' && value !== oldVal) {
              warn('script：reinsert styleSheet');
              addStyle();
            }

            return succeeded;
          }

        };
        proxyConfig = new Proxy(unsafeWindow.$CONFIG, handler);
        unsafeWindow.$CONFIG = proxyConfig;
        addStyle();
      });
    }
    /* 新版========start */


    const WbNewVersion = once(() => {
      const uiControl = createControl({
        store,
        visible: false,
        silent: true
      });

      const app = $('#app').__vue__;

      let styleSheet;
      warn('新版本', app);
      const pageStyleMap = new Map([[['home', // 首页
      'mygroups', // 首页左侧分组
      'profile', // 博主主页
      'nameProfile', // 博主主页(名称)
      'customProfile', // 自定义主页
      'bidDetail', // 微博详情
      'atWeibo', // 消息 at我的
      'cmtInbox', // 消息 评论
      'likeInbox', // 消息 赞
      'follow', // 我的关注、我的粉丝
      'myFollowTab', // 我的关注tab栏
      'fav', // 我的收藏
      'like', // 我的赞
      'weibo', // 热门微博
      'list', // 热门榜单
      'topic', // 话题榜
      'search', // 热搜榜
      'searchResult' // 搜索结果
      ], () => GM_addStyle(homeStyles)], [['Playdetail' // 视频详情
      ], () => GM_addStyle(playDetailStyles)]]);
      const notify = once(() => {
        uiControl.notify();
      });
      app.$watch('$route', (to, from) => {
        styleSheet?.remove();
        warn('route changed', to);
        uiControl.hide();

        for (const [routenames, addStyle] of pageStyleMap.entries()) {
          if (routenames.includes(to.name)) {
            uiControl.show();

            if (store.enabled) {
              styleSheet = addStyle();
              notify();
            }

            break;
          }
        }
      }, {
        immediate: true
      });
    });
    /* 新版========end */

    /* 旧版(保留，不再更新) */

    const addStyle = function () {
      let styleSheet;
      return function () {
        const {
          $CONFIG
        } = unsafeWindow;
        const classnamePrefix = 'inject-ws-';

        const getClassname = classname => `${classnamePrefix}${classname}`;

        styleSheet?.remove();
        [...document.body.classList.values()].forEach(item => {
          if (item.startsWith(classnamePrefix)) {
            document.body.classList.remove(item);
          }
        });
        const pages = {
          // 首页(含特别关注)、我的收藏、我的赞、好友圈
          mainpage: {
            test: /^v6.*_content_home$/.test($CONFIG.location) || /v6_(fav|likes_outbox|content_friends)/.test($CONFIG.location),
            use: doMainPage
          },
          // 用户资料页、相册、管理中心、粉丝、服务、财经专家、热门话题
          profilepage: {
            test: /^page_.*_(home|photos|manage|myfollow|service|expert|topic)$/.test($CONFIG.location),
            use: doProfilePage
          },
          // 微博详情
          singleweibo: {
            test: /^page_.*_single_weibo$/.test($CONFIG.location),
            use: doSingleWBPage
          }
        };
        const target = Object.entries(pages).find(([, {
          test
        }]) => test);
        warn(target, $CONFIG.location);
        if (!target) return;
        uiControl.show();
        if (!store.enabled) return;
        styleSheet = target[1].use(getClassname(target[0]));
        document.body.classList.add(getClassname(target[0]));
        uiControl.notify();
      };
    }();

    function doMainPage(classname) {
      return GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            display: flex;
            width: var(--inject-page-width) !important;
          }
          /* 内容 */
          |> #plc_main {
            display: flex !important;
            flex: 1;
            width: auto !important;
          }
          |> .WB_main_c {
            flex: 1;
          }
          /* 微博类型 */
          |> .tab_box {
            display: flex;
          }
          |> .tab_box::after {
            content: none;
          }
          |> .tab_box .fr_box {
            flex: 1;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2));
            margin-left: 0 !important;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
    }

    function doProfilePage(classname) {
      return GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            width: var(--inject-page-width) !important;
          }
          |> .WB_frame_a, .WB_frame_a_fix {
            width: 100%;
          }
          /* 内容 */
          |> #plc_main {
            width: 100% !important;
            display: flex;
          }
          /* 这里修复特殊博主页右边距 */
          |> #plc_main > div:last-child {
            margin-right: 0;
          }
          /* 特殊博主页评论 */
          |> .WB_frame_c .input_simple_wrap .inputfunc_simple_wrap {
            width: calc(100% - 80px);
          }
          |> .WB_frame_c {
            flex: 1;
          }
          /* 右侧悬浮时间线 */
          |> .WB_timeline {
            left: calc(50% + (var(--inject-page-width) / 2) + 10px);
            margin-left: 0;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2));
            margin-left: 0 !important;
          }
          /* 个人资料 管理中心 */
          |> .WB_frame_a_fix {
            display: flex;
            justify-content: center;
          }
          |> .WB_frame_a_fix > .PCD_admin_content {
            float: none;
            margin-left: 18px;
          }
          |> .WB_frame_a_fix > .PCD_admin_content .PCD_admin_content {
            float: none;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
    }

    function doSingleWBPage(classname) {
      return GM_addStyle(`
        :root {
          --inject-page-width: min(75vw, 1330px);
        }
        @media screen and (min-width: 1300px) {
          |> .WB_frame {
            width: var(--inject-page-width) !important;
          }
          /* 内容 */
          |> #plc_main {
            display: flex !important;
            width: auto !important;
          }
          |> #plc_main .WB_frame_c {
            flex: 1;
          }
          /* 返回顶部按钮 */
          |> .W_gotop {
            left: calc(50% + (var(--inject-page-width) / 2) - 19px);
            margin-left: 0 !important;
          }
        }
      `.replace(/\|>/g, `.${classname}`));
    }
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/d-weibo-com/index.lazy.scss
var d_weibo_com_index_lazy = __webpack_require__(8343);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/d-weibo-com/index.lazy.scss

      var d_weibo_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (d_weibo_com_index_lazy/* default */.Z && d_weibo_com_index_lazy/* default.locals */.Z.locals) {
              d_weibo_com_index_lazy_exported.locals = d_weibo_com_index_lazy/* default.locals */.Z.locals;
            }
            

var d_weibo_com_index_lazy_refs = 0;
var d_weibo_com_index_lazy_update;
var d_weibo_com_index_lazy_options = {};

d_weibo_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
d_weibo_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      d_weibo_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
d_weibo_com_index_lazy_options.domAPI = (styleDomAPI_default());
d_weibo_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

d_weibo_com_index_lazy_exported.use = function(insertOptions) {
  d_weibo_com_index_lazy_options.options = insertOptions || {};

  if (!(d_weibo_com_index_lazy_refs++)) {
    d_weibo_com_index_lazy_update = injectStylesIntoStyleTag_default()(d_weibo_com_index_lazy/* default */.Z, d_weibo_com_index_lazy_options);
  }

  return d_weibo_com_index_lazy_exported;
};
d_weibo_com_index_lazy_exported.unuse = function() {
  if (d_weibo_com_index_lazy_refs > 0 && !--d_weibo_com_index_lazy_refs) {
    d_weibo_com_index_lazy_update();
    d_weibo_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_d_weibo_com_index_lazy = (d_weibo_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/d-weibo-com/index.js

const weiboDynamic = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,
      execute: sites_d_weibo_com_index_lazy.use
    });
  }

});
;// CONCATENATED MODULE: ./src/utils/querystring.ts
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/www-google-com/index.lazy.scss
var www_google_com_index_lazy = __webpack_require__(2797);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-google-com/index.lazy.scss

      var www_google_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (www_google_com_index_lazy/* default */.Z && www_google_com_index_lazy/* default.locals */.Z.locals) {
              www_google_com_index_lazy_exported.locals = www_google_com_index_lazy/* default.locals */.Z.locals;
            }
            

var www_google_com_index_lazy_refs = 0;
var www_google_com_index_lazy_update;
var www_google_com_index_lazy_options = {};

www_google_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
www_google_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      www_google_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
www_google_com_index_lazy_options.domAPI = (styleDomAPI_default());
www_google_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

www_google_com_index_lazy_exported.use = function(insertOptions) {
  www_google_com_index_lazy_options.options = insertOptions || {};

  if (!(www_google_com_index_lazy_refs++)) {
    www_google_com_index_lazy_update = injectStylesIntoStyleTag_default()(www_google_com_index_lazy/* default */.Z, www_google_com_index_lazy_options);
  }

  return www_google_com_index_lazy_exported;
};
www_google_com_index_lazy_exported.unuse = function() {
  if (www_google_com_index_lazy_refs > 0 && !--www_google_com_index_lazy_refs) {
    www_google_com_index_lazy_update();
    www_google_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_www_google_com_index_lazy = (www_google_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/www-google-com/index.js


const google = ({
  store,
  createControl
}) => ({
  handler() {
    if (parse().tbm) return; // 选择了tab搜索时终止

    createControl({
      store,
      execute: sites_www_google_com_index_lazy.use
    });
  }

});
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/blog-csdn-net/index.lazy.scss
var blog_csdn_net_index_lazy = __webpack_require__(3880);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/blog-csdn-net/index.lazy.scss

      var blog_csdn_net_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (blog_csdn_net_index_lazy/* default */.Z && blog_csdn_net_index_lazy/* default.locals */.Z.locals) {
              blog_csdn_net_index_lazy_exported.locals = blog_csdn_net_index_lazy/* default.locals */.Z.locals;
            }
            

var blog_csdn_net_index_lazy_refs = 0;
var blog_csdn_net_index_lazy_update;
var blog_csdn_net_index_lazy_options = {};

blog_csdn_net_index_lazy_options.styleTagTransform = (styleTagTransform_default());
blog_csdn_net_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      blog_csdn_net_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
blog_csdn_net_index_lazy_options.domAPI = (styleDomAPI_default());
blog_csdn_net_index_lazy_options.insertStyleElement = (insertStyleElement_default());

blog_csdn_net_index_lazy_exported.use = function(insertOptions) {
  blog_csdn_net_index_lazy_options.options = insertOptions || {};

  if (!(blog_csdn_net_index_lazy_refs++)) {
    blog_csdn_net_index_lazy_update = injectStylesIntoStyleTag_default()(blog_csdn_net_index_lazy/* default */.Z, blog_csdn_net_index_lazy_options);
  }

  return blog_csdn_net_index_lazy_exported;
};
blog_csdn_net_index_lazy_exported.unuse = function() {
  if (blog_csdn_net_index_lazy_refs > 0 && !--blog_csdn_net_index_lazy_refs) {
    blog_csdn_net_index_lazy_update();
    blog_csdn_net_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_blog_csdn_net_index_lazy = (blog_csdn_net_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/blog-csdn-net/index.js

const csdn = ({
  store,
  createControl
}) => ({
  handler() {
    createControl({
      store,

      execute() {
        // 关闭登录弹窗
        document.cookie = `unlogin_scroll_step=${Date.now()};domain=.csdn.net;path=/`;
        sites_blog_csdn_net_index_lazy.use();
      }

    });
  }

});
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/sites/bbs-mihoyo-com/index.lazy.scss
var bbs_mihoyo_com_index_lazy = __webpack_require__(6534);
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/bbs-mihoyo-com/index.lazy.scss

      var bbs_mihoyo_com_index_lazy_exported = {};

      
      
      
      
      
      
      
      
      if (bbs_mihoyo_com_index_lazy/* default */.Z && bbs_mihoyo_com_index_lazy/* default.locals */.Z.locals) {
              bbs_mihoyo_com_index_lazy_exported.locals = bbs_mihoyo_com_index_lazy/* default.locals */.Z.locals;
            }
            

var bbs_mihoyo_com_index_lazy_refs = 0;
var bbs_mihoyo_com_index_lazy_update;
var bbs_mihoyo_com_index_lazy_options = {};

bbs_mihoyo_com_index_lazy_options.styleTagTransform = (styleTagTransform_default());
bbs_mihoyo_com_index_lazy_options.setAttributes = (setAttributesWithoutAttributes_default());

      bbs_mihoyo_com_index_lazy_options.insert = insertBySelector_default().bind(null, "head");
    
bbs_mihoyo_com_index_lazy_options.domAPI = (styleDomAPI_default());
bbs_mihoyo_com_index_lazy_options.insertStyleElement = (insertStyleElement_default());

bbs_mihoyo_com_index_lazy_exported.use = function(insertOptions) {
  bbs_mihoyo_com_index_lazy_options.options = insertOptions || {};

  if (!(bbs_mihoyo_com_index_lazy_refs++)) {
    bbs_mihoyo_com_index_lazy_update = injectStylesIntoStyleTag_default()(bbs_mihoyo_com_index_lazy/* default */.Z, bbs_mihoyo_com_index_lazy_options);
  }

  return bbs_mihoyo_com_index_lazy_exported;
};
bbs_mihoyo_com_index_lazy_exported.unuse = function() {
  if (bbs_mihoyo_com_index_lazy_refs > 0 && !--bbs_mihoyo_com_index_lazy_refs) {
    bbs_mihoyo_com_index_lazy_update();
    bbs_mihoyo_com_index_lazy_update = null;
  }
};




       /* harmony default export */ const sites_bbs_mihoyo_com_index_lazy = (bbs_mihoyo_com_index_lazy_exported);

;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/bbs-mihoyo-com/index.js



const mihoyoBBS = ({
  store,
  createControl
}) => ({
  handler() {
    function replaceImgURL() {
      onVisible(() => {
        // 文章中的图片原图显示
        $$('.mhy-article-page__content .ql-image-box img:not([replaced=true])').forEach(img => {
          const original = img.getAttribute('large');
          if (!original) return;
          img.src = original;
          img.setAttribute('replaced', 'true'); // 标记
        });
      });
    }

    createControl({
      store,

      execute() {
        replaceImgURL();
        sites_bbs_mihoyo_com_index_lazy.use();
      }

    });
  }

});
;// CONCATENATED MODULE: ./src/scripts/widescreen/sites/index.js






















const sites = [{
  name: '半次元',
  namespace: 'banciyuan',
  test: /^bcy\.net\/item\/detail\//,
  use: banciyuan
}, {
  name: '微信',
  namespace: 'weixin',
  test: /^mp\.weixin\.qq\.com\/s/,
  use: weixin
}, {
  name: '知乎专栏',
  namespace: 'zhihu',
  test: /^zhuanlan\.zhihu\.com\/p\//,
  use: zhihuZhuanlan
}, {
  name: '知乎问答',
  namespace: 'zhihu',
  test: /^www\.zhihu\.com\/question\//,
  use: zhihuQuestion
}, {
  name: '知乎',
  namespace: 'zhihu',
  test: /^www\.zhihu\.com\/(follow|hot)?$/,
  use: zhihuHome
}, {
  name: '知乎话题',
  namespace: 'zhihu',
  test: /^www\.zhihu\.com\/topic\//,
  use: zhihuTopic
}, {
  name: '掘金',
  namespace: 'juejin',
  test: /^juejin\.cn\/post\//,
  use: juejin
}, {
  name: 'Crates.io',
  namespace: 'crates',
  test: /^crates\.io\/crates\//,
  use: crates
}, {
  name: '简书',
  namespace: 'jianshu',
  test: /^www\.jianshu\.com\/p\//,
  use: jianshu
}, {
  name: '百度',
  namespace: 'baidu',
  test: /^www\.baidu\.com\/s?$/,
  use: baidu
}, {
  name: '贴吧',
  namespace: 'tieba',
  test: /^tieba\.baidu\.com\/p\//,
  use: tieba
}, {
  name: '贴吧吧页',
  namespace: 'tieba',
  test: /^tieba\.baidu\.com\/f$/,
  use: tiebaForum
}, {
  name: '搜狗',
  namespace: 'sougou',
  test: /^www\.sogou\.com\/web$/,
  use: sougou
}, {
  name: 'segmentfault',
  namespace: 'segmentfault',
  test: /^segmentfault\.com\/(a|q)\//,
  use: segmentfault
}, {
  name: 'bilibili',
  namespace: 'bilibili',
  test: /^www\.bilibili\.com\/read\/cv/,
  use: bilibili
}, {
  name: 'bilibili 动态',
  namespace: 'bilibili',
  test: /^t\.bilibili\.com\/$/,
  use: bilibiliDynamic
}, {
  name: 'bilibili 动态详情',
  namespace: 'bilibili',
  test: /^t\.bilibili\.com\/\d+$/,
  use: bilibiliDynamicDetail
}, {
  name: 'bilibili 空间',
  namespace: 'bilibili',
  test: /^space\.bilibili\.com\/212535360$/,
  use: bilibiliSpace
}, {
  name: '豆瓣',
  namespace: 'douban',
  test: [/^www\.douban\.com\/gallery\/$/, /^www\.douban\.com\/gallery\/topic\/.+?/, /^www\.douban\.com\/note\/.+?/],
  use: douban
}, {
  name: '豆瓣电影 详情',
  namespace: 'doubanmovie',
  test: /^movie\.douban\.com\/subject\//,
  // 与剧评相关 movie.douban.com/subject/${id}/${xxx}
  use: doubanSubject
}, {
  name: '豆瓣电影 剧评详情',
  namespace: 'doubanmovie',
  test: /^movie\.douban\.com\/review\//,
  use: doubanReview
}, {
  name: '头条',
  namespace: 'toutiao',
  test: /^www\.toutiao\.com\/(a|i)\d+\/?$/,
  // a6884536349483860492、i6971382481899536933
  use: toutiao
}, {
  name: '微博',
  namespace: 'weibo',
  test: /^(www\.)?weibo.com\//,
  use: weibo
}, {
  name: '微博文章',
  namespace: 'weibo',
  test: /^(www\.)?weibo.com\/ttarticle\/p\/show$/,
  use: weiboArticle
}, {
  name: '微博动态',
  namespace: 'weibo',
  test: /^d\.weibo\.com\//,
  use: weiboDynamic
}, {
  name: '谷歌',
  namespace: 'google',
  test: /^www\.google\..{2,7}search$/,
  // 应该足够覆盖各个域名
  use: google
}, {
  name: 'CSDN',
  namespace: 'csdn',
  test: /^blog\.csdn\.net\/(\w|-)+\/article\/details\//,
  use: csdn
}, {
  name: '米游社',
  namespace: 'mihoyoBBS',
  // ys|bh2|bh3|wd|dby 对应：原神 崩坏2 崩坏3 未定 大别野
  // 只用到原神，暂不对其它作处理
  test: /^bbs.mihoyo.com\/(ys)\/article\//,
  use: mihoyoBBS
}];
/* harmony default export */ const widescreen_sites = (sites);
;// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
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
;// CONCATENATED MODULE: ./src/composables/use-expose.js
/*
  引用：https://github.com/youzan/vant/blob/dev/src/composables/use-expose.ts
*/
 // expose public api

function useExpose(apis) {
  const instance = (0,external_Vue_namespaceObject.getCurrentInstance)();

  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
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
var v_ripple = __webpack_require__(8443);
;// CONCATENATED MODULE: ./src/directives/v-ripple/index.scss

      
      
      
      
      
      
      
      
      

var v_ripple_options = {};

v_ripple_options.styleTagTransform = (styleTagTransform_default());
v_ripple_options.setAttributes = (setAttributesWithoutAttributes_default());

      v_ripple_options.insert = insertBySelector_default().bind(null, "head");
    
v_ripple_options.domAPI = (styleDomAPI_default());
v_ripple_options.insertStyleElement = (insertStyleElement_default());

var v_ripple_update = injectStylesIntoStyleTag_default()(v_ripple/* default */.Z, v_ripple_options);




       /* harmony default export */ const directives_v_ripple = (v_ripple/* default */.Z && v_ripple/* default.locals */.Z.locals ? v_ripple/* default.locals */.Z.locals : undefined);

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

;// CONCATENATED MODULE: ./src/components/button/index.js




const prefixCls = 'skr-button'; // button type非default时覆盖一层白色

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
      "class": [prefixCls, `${prefixCls}--${props.type}`, {
        [`${prefixCls}--round`]: props.round,
        [`${prefixCls}--shadow`]: props.shadow
      }, `${prefixCls}--${props.size}`]
    }, [slots.default()]), [[(0,external_Vue_namespaceObject.resolveDirective)("ripple"), rippleOptions.value]]);
  }

});
/* harmony default export */ const src_components_button_0 = (Button);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/scripts/widescreen/control.scss
var control = __webpack_require__(9354);
;// CONCATENATED MODULE: ./src/scripts/widescreen/control.scss

      
      
      
      
      
      
      
      
      

var control_options = {};

control_options.styleTagTransform = (styleTagTransform_default());
control_options.setAttributes = (setAttributesWithoutAttributes_default());

      control_options.insert = insertBySelector_default().bind(null, "head");
    
control_options.domAPI = (styleDomAPI_default());
control_options.insertStyleElement = (insertStyleElement_default());

var control_update = injectStylesIntoStyleTag_default()(control/* default */.Z, control_options);




       /* harmony default export */ const widescreen_control = (control/* default */.Z && control/* default.locals */.Z.locals ? control/* default.locals */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/scripts/widescreen/control.js







 // 宽屏开关 options: store<store>, execute要执行的函数，visible是否可见(后续用show hide控制)，silent是否显示通知

function createControl(options) {
  const {
    store,
    execute = () => {},
    visible = true,
    silent = false
  } = options;
  const {
    instance
  } = mountComponent({
    setup() {
      const state = (0,external_Vue_namespaceObject.reactive)({
        // 总开关
        uiVisible: useGMvalue('ui_visible', true),
        visible,
        loose: store.loose || false
      });

      function notify() {
        (src_store.notify_enabled ?? false) && Toast('已宽屏处理');
      }

      function toggle() {
        store.enabled = !store.enabled;
        location.reload();
      }

      useExpose({
        notify,
        show: () => {
          state.visible = true;
        },
        hide: () => {
          state.visible = false;
        }
      });

      if (store.enabled) {
        (0,external_Vue_namespaceObject.watchEffect)(() => {
          store.loose = state.loose;
          document.documentElement.classList[state.loose ? 'add' : 'remove']('inject-widescreen-loose-js');
        });
        execute();
        !silent && notify();
      }

      return () => (0,external_Vue_namespaceObject.createVNode)(external_Vue_namespaceObject.Fragment, null, [state.uiVisible && state.visible && (0,external_Vue_namespaceObject.createVNode)("div", {
        "class": "inject-widescreen-js"
      }, [(0,external_Vue_namespaceObject.createVNode)(src_components_button_0, {
        "title": "注意：页面会被刷新",
        "type": "primary",
        "shadow": true,
        "onClick": toggle
      }, {
        default: () => [store.enabled ? '已开启' : '关闭']
      }), store.enabled && (0,external_Vue_namespaceObject.createVNode)("label", {
        "title": "勾选后不再限制最大宽度，酌情使用"
      }, [(0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("input", {
        "onUpdate:modelValue": $event => state.loose = $event,
        "type": "checkbox"
      }, null), [[external_Vue_namespaceObject.vModelCheckbox, state.loose]]), (0,external_Vue_namespaceObject.createTextVNode)("\u66F4\u5BBD")])])]);
    }

  });
  return instance;
}
;// CONCATENATED MODULE: ./src/scripts/widescreen/index.js
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }






 // 主函数

function main() {
  if (!checker()) return;
  GM_registerMenuCommand('宽屏通知', function () {
    const nextStatus = !(src_store.notify_enabled ?? false);
    Toast.success(nextStatus ? '已开启通知' : '已关闭通知');
    src_store.notify_enabled = nextStatus;
  });
  GM_registerMenuCommand('控制按钮', function () {
    const nextStatus = !(src_store.ui_visible ?? true);
    Toast.success(nextStatus ? '已显示按钮' : '已隐藏按钮');
    src_store.ui_visible = nextStatus;
  });
  new App(widescreen_sites).boot();
}

var _sites = /*#__PURE__*/_classPrivateFieldLooseKey("sites");

var _includes = /*#__PURE__*/_classPrivateFieldLooseKey("includes");

class App {
  constructor(sites) {
    Object.defineProperty(this, _includes, {
      value: _includes2
    });
    Object.defineProperty(this, _sites, {
      writable: true,
      value: []
    });
    _classPrivateFieldLooseBase(this, _sites)[_sites] = sites;
  }

  boot() {
    const briefURL = location.host + location.pathname;

    _classPrivateFieldLooseBase(this, _sites)[_sites].forEach(async site => {
      const {
        name,
        namespace,
        test,
        use
      } = site;
      if (!_classPrivateFieldLooseBase(this, _includes)[_includes](test, briefURL)) return;
      const {
        readyState: state
      } = site;
      if (state) await ready_state_namespaceObject[state]();
      const config = use({
        createControl: createControl,
        store: widescreen_createStore(namespace)
      });
      warn(name);
      config.handler();
    });
  }

} // 存储


function _includes2(test, url) {
  return [].concat(test).some(item => {
    if (item instanceof RegExp) return item.test(url);
    if (typeof item === 'boolean') return item;
    return false;
  });
}

function widescreen_createStore(namespace) {
  if (!namespace) throw new TypeError('缺少namespace，期望<string>');
  const handler = {
    get(target, property) {
      let value = target[property];

      if (property === 'enabled') {
        // 默认开启
        value ?? (value = true);
      }

      return value;
    }

  };
  const store = new Proxy(createStore(namespace), handler);
  return store;
}

main();
})();

/******/ })()
;