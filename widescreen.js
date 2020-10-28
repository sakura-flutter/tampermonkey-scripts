// ==UserScript==
// @name         论坛文章页宽屏
// @version      1.14.0
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、搜狗搜索、segmentfault、哔哩哔哩、微博、豆瓣电影、今日头条
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts/commits/master/src/aggregation/widescreen.js
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
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
// @match        https://juejin.im/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.baidu.com/s?*
// @match        https://www.baidu.com/
// @match        https://www.sogou.com/web*
// @match        https://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/f?*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/cv*
// @match        https://t.bilibili.com/*
// @match        https://weibo.com/*
// @match        https://d.weibo.com/*
// @match        https://movie.douban.com/subject/*
// @match        https://www.toutiao.com/*
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://cdn.jsdelivr.net/npm/vue@3.0.2/dist/vue.runtime.global.prod.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=862073
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

// CONCATENATED MODULE: external "Vue"
const external_Vue_namespaceObject = Vue;
// CONCATENATED MODULE: ./src/utils/index.js
/**
 * 解析url上的参数
 * @param {string} href 或 带有参数格式的string；有search则不再hash
 * @return {object}
 */
function parseURL(href = location.href) {
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
function stringifyURL(obj) {
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&');
}
function throttle(fn, delay) {
  var t = null;
  var begin = new Date().getTime();
  return function (...args) {
    var _self = this;

    var cur = new Date().getTime();
    clearTimeout(t);

    if (cur - begin >= delay) {
      fn.apply(_self, args);
      begin = cur;
    } else {
      t = setTimeout(function () {
        fn.apply(_self, args);
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
 * 有些脚本是在document-start执行的，安全地获得document
 * @param {fn} cb
 */

function documentLoaded(cb) {
  document.body ? cb() : window.addEventListener('DOMContentLoaded', cb);
}
/**
 * 延时
 * @param {number} ms 毫秒数
 */

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function toFormData(params = {}) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(params)) {
    formData.append(key, value);
  }

  return formData;
}
// CONCATENATED MODULE: ./src/composition/use-gm-value.js

/**
 * 同GM_getValue且在生命周期内自动GM_addValueChangeListener与GM_removeValueChangeListener，亦提供GM_setValue
 * 暂不提供GM_deleteValue
 * @param {string} name
 * @param {any} defaultValue
 */

function useGMvalue(name, defaultValue) {
  const state = (0,external_Vue_namespaceObject.reactive)({
    value: GM_getValue(name, defaultValue),
    old: undefined,
    name
  });
  (0,external_Vue_namespaceObject.onUnmounted)(() => {
    GM_removeValueChangeListener(id);
  });
  const id = GM_addValueChangeListener(name, (name, oldVal, newVal) => {
    state.value = newVal;
    state.old = oldVal;
  });

  function setValue(val) {
    GM_setValue(name, val);
  }

  return { ...(0,external_Vue_namespaceObject.toRefs)(state),
    setValue
  };
}
// CONCATENATED MODULE: ./src/aggregation/widescreen.js



const isDebug = false;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function log(...args) {
  if (!isDebug) return;
  console.warn(...args);
} // 主函数


function main() {
  GM_registerMenuCommand('宽屏通知', function () {
    const nextStatus = !GM_getValue('notify_enabled', true);
    Toast.success(nextStatus ? '已开启通知' : '已关闭通知');
    GM_setValue('notify_enabled', nextStatus);
  });
  GM_registerMenuCommand('控制按钮', function () {
    const nextStatus = !GM_getValue('ui_visible', true);
    Toast.success(nextStatus ? '已显示按钮' : '已隐藏按钮');
    GM_setValue('ui_visible', nextStatus);
  }); // 将之前is_open重新命名成enabled

  GM_listValues().forEach(key => {
    if (key.endsWith('_is_open')) {
      const modulename = key.split('_is_open')[0];
      GM_setValue(`${modulename}_enabled`, GM_getValue(key));
      GM_deleteValue(key);
    }
  });
  if (!checkCompatibility()) return;
  const sites = checkWebsites();
  sites.find(site => {
    const hanlder = handlers.get(site);
    log(site);
    hanlder && hanlder();
    return site;
  });
} // 兼容性判断


function checkCompatibility() {
  const {
    userAgent
  } = window.navigator;
  const chromeVersion = userAgent.match(/Chrome\/(\d+)/) && userAgent.match(/Chrome\/(\d+)/)[1];
  const firefoxVersion = userAgent.match(/Firefox\/(\d+)/) && userAgent.match(/Firefox\/(\d+)/)[1];
  let pass = false;

  if (chromeVersion && chromeVersion >= 80) {
    pass = true;
  } else if (firefoxVersion && firefoxVersion >= 75) {
    pass = true;
  }

  if (!pass) {
    GM_getValue('notify_enabled', true) && Toast.warning('宽屏脚本：哎呀！不支持的浏览器版本，请更新浏览器版本 o(╥﹏╥)o');
  }

  return pass;
} // 检查网站


function checkWebsites() {
  const {
    origin,
    pathname
  } = location;
  const url = origin + pathname; // 格式[ ['xx', true|false], ]

  const sites = [['bcy', /bcy.net\/item\/detail/.test(url)], ['mpWeixin', /mp.weixin.qq.com\/s/.test(url)], ['zhihu', /zhuanlan.zhihu.com\/p\//.test(url)], ['zhihuQuestion', /zhihu.com\/question\//.test(url)], ['zhihuHome', /www.zhihu.com/.test(url) && /^\/(follow|hot)?$/.test(pathname)], ['zhihuTopic', /www.zhihu.com\/topic\//.test(url)], ['juejin', /juejin.im\/post\//.test(url)], ['jianshu', /jianshu.com\/p\//.test(url)], ['baidu', /www.baidu.com\/s?/.test(url)], ['tieba', /tieba.baidu.com\/p\//.test(url)], ['tiebaForum', /tieba.baidu.com\/f/.test(url)], ['sogou', /www.sogou.com\/web?/.test(url)], ['segmentfault', /segmentfault.com/.test(url)], ['bilibili', /bilibili.com\/read\/cv/.test(url)], ['bilibiliDynamic', /t.bilibili.com/.test(url) && pathname === '/'], ['weibo', /\/\/weibo.com/.test(url)], ['weiboDynamic', /d.weibo.com/.test(url)], ['doubanmovie', /movie.douban.com/.test(url)], ['toutiao', /www.toutiao.com/.test(url)]]; // 返回匹配的页面

  return sites.filter(item => item[1]).map(item => item[0]);
} // 对应网页要执行的操作操作


const handlers = new Map();
/* ===半次元===start */

handlers.set('bcy', function () {
  const store = createStore('bcy');

  function execute() {
    unsafeWindow.document.addEventListener('readystatechange', () => {
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
    GM_addStyle(`
      :root {
        --inject-page-width: min(75vw, 1440px);
      }
      @media (min-width: 1580px) {
        .container .row {
          width: var(--inject-page-width);
        }
        .container .row .col-big {
          flex: .97;
        }
        /* 文章头部信息 */
        .detail-main header {
          width: auto !important;
        }
        /* 相册 */
        .container .row .col-big .album {
          width: 100%;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===半次元===end */

/* ===微信文章===start */

handlers.set('mpWeixin', function () {
  const store = createStore('mpWeixin');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(90vw, 1150px);
      }
      @media screen and (min-width: 750px) {
        /* 文章宽屏 */
        .rich_media_area_primary_inner {
          max-width: var(--inject-page-width) !important;
          margin-left: auto;
          margin-right: auto;
        }
        /* 二维码位置 */
        #js_pc_qr_code .qr_code_pc {
          position: fixed;
          top: 25vh;
          right: 3vw;
          opacity: .2;
        }
        #js_pc_qr_code .qr_code_pc:hover {
          opacity: 1;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===微信文章===end */

/* ===知乎===start */
// 知乎专栏

handlers.set('zhihu', function () {
  const store = createStore('zhihu');

  function execute() {
    window.addEventListener('DOMContentLoaded', () => {
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
    const defaultWidth = '690px';
    GM_addStyle(`
      :root {
        --inject-page-width: min(75vw, 1120px);
      }
      @media screen and (min-width: 1000px) {
        .Post-NormalMain .Post-Header, .Post-NormalMain>div, .Post-NormalSub>div {
          width: var(--inject-page-width);
        }
        /* 内容图片 */
        .ztext .content_image, .ztext .origin_image {
          max-width: ${defaultWidth};
        }
        /* 左侧悬浮按钮 */
        .Post-SideActions {
          left: calc(50% - (var(--inject-page-width) / 2) - 120px);
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
}); // 知乎问答

handlers.set('zhihuQuestion', function () {
  const store = createStore('zhihu');

  function execute() {
    window.addEventListener('DOMContentLoaded', () => {
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
    const defaultWidth = '694px';
    GM_addStyle(`
      :root {
        --inject-page-width: min(75vw, 1300px);
      }
      @media screen and (min-width: 1350px) {
        .QuestionHeader-content, .QuestionHeader-footer {
          width: var(--inject-page-width);
          margin-left: auto;
          margin-right: auto;
        }
        .QuestionHeader-footer-inner {
          width: auto;
        }
        .QuestionHeader-footer-main {
          padding-left: 0;
        }
        .QuestionHeader-main {
          width: 0;
          flex: 1;
        }
        .Question-main {
          width: var(--inject-page-width);
        }
        .Question-main .ListShortcut {
          flex: 1;
        }
        .Question-mainColumn {
          flex: 1;
          width: auto;
          padding-right: 10px;
        }
        /* 内容图片 */
        .ztext .content_image, .ztext .origin_image {
          max-width: ${defaultWidth};
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
}); // 首页

handlers.set('zhihuHome', function () {
  const store = createStore('zhihu');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(91vw, 1360px);
      }
      @media screen and (min-width: 1100px) {
        .Topstory-container {
          width: var(--inject-page-width);
        }
        /* 内容 */
        .Topstory-mainColumn {
          flex: 1;
        }
        /* 右侧 */
        .GlobalSideBar {
          width: 296px;
          flex: initial;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
}); // 话题

handlers.set('zhihuTopic', function () {
  const store = createStore('zhihu');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(91vw, 1295px);
      }
      @media screen and (min-width: 1100px) {
        .ContentLayout {
          width: var(--inject-page-width);
        }
        /* 内容 */
        .ContentLayout-mainColumn {
          flex: 1;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===知乎===end */

/* ===掘金===start */

handlers.set('juejin', function () {
  const store = createStore('juejin');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(82vw, 1230px);
      }
      /* 掘金文章 */
      @media screen and (min-width: 1300px) {
        .main-container {
          max-width: var(--inject-page-width);
        }
        .main-container .main-area {
          width: calc(100% - 21rem);
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===掘金===end */

/* ===简书===start */

handlers.set('jianshu', function () {
  const store = createStore('jianshu');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(85vw, 1280px);
      }
      /* 简书文章 */
      @media screen and (min-width: 1250px) {
        [role=main] {
          width: var(--inject-page-width);
        }
        [role=main] > div:first-child {
          flex: 1;
        }
        /* 左侧悬浮按钮 */
        #__next > div:last-child {
          left: calc(50% - (var(--inject-page-width) / 2) - 80px);
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===简书===end */

/* ===百度搜索===start */

handlers.set('baidu', function () {
  const store = createStore('baidu');

  function execute() {
    const defaultWidth = '560px';
    const styleSheet = GM_addStyle(`
      :root {
        --inject-page-width: min(75vw, 1300px);
      }
      @media screen and (min-width: 1460px) {
        /* 顶部搜索 */
        #head {
          background-color: #ffffffd1;
          backdrop-filter: blur(10px);
        }
        .head_wrapper .s_form {
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          width: -moz-fit-content;
        }
        /* 搜索tab */
        .s_tab {
          padding-left: 0 !important;
        }
        .s_tab {
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          width: -moz-fit-content;
        }
        /* 搜索内容 */
        #container {
          margin-left: auto !important;
          margin-right: auto !important;
          width: var(--inject-page-width) !important;
        }
        /* 左侧搜索结果 */
        #content_left {
          width: calc(var(--inject-page-width) - 450px) !important;
        }
        /* [tpl*=img_address]忽略图片区域，防止宽屏后排版混乱(搜索：樱花) */
        #content_left > div:not([tpl*=img_address]) {
          width: 100% !important;
        }
        /* 视频宽度限制(搜索：路人女主的养成方法) */
        .op-bk-polysemy-video__wrap {
          width: ${defaultWidth} !important;
        }
        #content_left .new-pmd .c-span9 {
          width: 75%;
        }
        #content_left .c-group-wrapper .c-group {
          width: 95% !important;
        }
        /* 分页 */
        .page-inner {
          margin-left: auto;
          margin-right: auto;
          padding-left: 0 !important;
          width: var(--inject-page-width);
        }
        /* 页脚 */
        .foot-inner {
          margin-left: auto;
          margin-right: auto;
          width: var(--inject-page-width);
        }
        #foot .foot-inner #help {
          padding-left: 0 !important;
        }
      }

      @media screen and (min-width: 1680px) {
        #content_left .new-pmd .c-span9 {
          width: 81%;
        }
      }
    `); // 搜索时百度会清除文档这里需要将样式重新插入

    function redo() {
      if (document.head.contains(styleSheet)) return;
      document.head.appendChild(styleSheet);
    }

    window.addEventListener('DOMContentLoaded', () => {
      const {
        jQuery
      } = unsafeWindow;
      jQuery(document).ajaxSuccess((event, xhr, settings) => {
        if (!settings.url.startsWith('/s?')) return;
        redo();
      });
    });
    window.addEventListener('popstate', redo);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===百度搜索===end */

/* ===贴吧===start */

handlers.set('tieba', function () {
  const store = createStore('tieba');
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

    unsafeWindow.document.addEventListener('readystatechange', () => {
      if (document.readyState !== 'interactive') return; // 替换原图

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
    GM_addStyle(`
      /* 帖子 */
      :root {
        --inject-page-width: min(80vw, 1250px);
      }
      @media screen and (min-width: 1390px) {
        #container {
          width: var(--inject-page-width);
        }
        #container > .content {
          width: 100%;
        }
        .nav_wrap, .p_thread, .pb_content, .core_title_wrap_bright, .core_reply_wrapper, .l_post_bright .core_reply_wrapper, .pb_footer {
          width: 100%;
        }
        .core_title_absolute_bright {
          width: calc(var(--inject-page-width) - 240px);
        }
        /* 内容区域 */
        .pb_content {
          display: flex;
          background-size: 100%;
        }
        .pb_content::after {
          content: none;
        }
        /* 点击展开，查看完整图片 */
        .pb_content .replace_div {
          width: fit-content !important;
          width: -moz-fit-content !important;
        }
        .pb_content .replace_div .replace_tip {
          width: 100% !important;
        }
        /* 楼区域 */
        .left_section {
          flex: 1;
          border-right: 2px solid #e4e6eb;
        }
        /* 楼层 广告会覆盖宽度 使用important */
        .l_post_bright {
          display: flex;
          width: 100% !important;
        }
        .l_post_bright .d_post_content_main {
          flex: 1;
          width: 0;
        }
        /* 修正楼层回复中小按钮位置 */
        .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-down,
        .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-up,
        .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-action {
          right: 180px !important;
        }
        /* 右侧悬浮按钮 */
        .tbui_aside_float_bar {
          left: calc(50% + (var(--inject-page-width) / 2) + 12px);
          right: auto;
          margin-left: 0;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
}); // 贴吧吧页

handlers.set('tiebaForum', function () {
  const store = createStore('tieba');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(80vw, 1250px);
      }
      @media screen and (min-width: 1390px) {
        /* 头部信息 */
        .head_main .head_middle, .head_main .head_content {
          width: var(--inject-page-width) !important;
        }
        /* 内容区域 */
        .content, .foot {
          width: var(--inject-page-width);
        }
        /* 这里的border实际上是这里的背景图 */
        .forum_content {
          background: #fff;
        }
        #content_wrap {
          width: calc(100% - 248px);
          border-right: 1px solid #eee;
        }
        /* 每条帖子 */
        .threadlist_detail {
          display: flex;
        }
        .threadlist_detail .pull_left {
          flex: 1;
        }
        .threadlist_detail .pull_left .threadlist_abs {
          width: 97%;
        }
        /* 发帖区域 */
        .frs_content_footer_pagelet {
          width: auto !important;
        }
        .tb_rich_poster_container {
          margin-left: 0 !important;
        }
        /* 右侧悬浮按钮 */
        .tbui_aside_float_bar {
          left: calc(50% + (var(--inject-page-width) / 2) + 12px) !important;
          right: auto;
          margin-left: 0 !important;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===贴吧===end */

/* ===搜狗搜索===start */

handlers.set('sogou', function () {
  const store = createStore('sogou');

  function execute() {
    const defaultWidth = '550px';
    const horCenter = 'margin-left: auto; margin-right: auto; padding-left: 0; width: var(--inject-page-width) !important;';
    GM_addStyle(`
      :root {
        --inject-page-width: min(80vw, 1340px);
      }
      @media screen and (min-width: 1200px) {
        /* 头部注意滚动处理 */
        .header .header-box {
          position: relative;
          padding: 0 5px 45px;
          ${horCenter}
        }
        .header,
        .header.headsearch .header-box {
          padding-bottom: 0;
        }
        .header .header-box .logo {
          top: -8px;
        }
        .headsearch {
          background-color: #ffffffd1;
          backdrop-filter: blur(10px);
        }
        /* 搜索结果 */
        #wrapper {
          display: flex;
          ${horCenter}
        }
        #main {
          flex: 1;
          width: 0;
          max-width: none;
          padding-right: 74px;
        }
        #main .results {
          width: auto;
        }
        #main .results > .vrwrap,
        #main .results > .rb {
          width: auto !important;
        }
        /* 特殊搜索结果恢复原本宽度 */
        .special-wrap,
        .vrPicBox {
          box-sizing: border-box;
          width: ${defaultWidth};
        }
        /* 底部 */
        .hintBox,
        #pagebar_container,
        #s_footer > div {
          ${horCenter}
        }
        #s_footer {
          .padding-left: 0;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===搜狗搜索===end */

/* ===segmentfault===start */

handlers.set('segmentfault', function () {
  const store = createStore('segmentfault');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(82vw, 1350px);
      }
      /* 专栏/问答 */
      @media (min-width: 1390px) {
        .container, .container-lg, .container-md, .container-sm, .container-xl {
          max-width: var(--inject-page-width);
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===segmentfault===end */

/* ===bilibili===start */
// 专栏

handlers.set('bilibili', function () {
  const store = createStore('bilibili');

  function execute() {
    // 页面整体往左
    const offsetLeft = '-5vw';
    GM_addStyle(`
      :root {
        --inject-page-width: min(50vw, 915px);
      }
      @media screen and (min-width: 1350px) {
        /* 文章 */
        .page-container {
          width: var(--inject-page-width) !important;
          max-width: none !important;
          padding-right: 0 !important;
          /* 左边显得空洞，往左偏移一点 */
          left: ${offsetLeft};
        }
        .article-holder, .head-container {
          width: var(--inject-page-width);
          max-width: none !important;
        }
        .banner-img-holder {
          width: auto !important;
          max-width: 100%;
        }
        /* 右侧up主等信息 */
        .up-info-holder {
          margin-left: 0 !important;
        }
        .up-info-holder .fixed-box {
          left: calc(50% + (var(--inject-page-width) / 2) + ${offsetLeft} + 50px);
          margin-left: 0 !important;
          /* 避免动画太突兀 */
          transition: transform .2s;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
}); // 动态

handlers.set('bilibiliDynamic', function () {
  const store = createStore('bilibili');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(85vw, 1454px);
      }
      @media screen and (min-width: 1380px) {
        /* 容器 */
        .home-content {
          width: var(--inject-page-width) !important;
        }
        .center-panel {
          width: calc(100% - 524px)  !important;
        }
        /* item */
        .main-content {
          width: auto !important;
          margin-right: 20px;
        }
        .live-container,
        .video-container,
        .bangumi-container,
        .shop-panel {
          width: auto !important;
        }
        .video-container .text-area {
          width: calc(100% - 233px) !important;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===bilibili===end */

/* ===微博===start */

handlers.set('weibo', function () {
  const store = createStore('weibo');
  const uiControl = createWidescreenControl({
    store,
    visible: false,
    silent: true
  });
  execute();

  function execute() {
    let proxyConfig;
    unsafeWindow.document.addEventListener('readystatechange', () => {
      // 是否启用新版微博
      if ($('#app') && $('#app').__vue__) {
        WbNewVersion();
        return;
      }

      if (!unsafeWindow.$CONFIG) return;
      if (proxyConfig && proxyConfig === unsafeWindow.$CONFIG) return;
      const handler = {
        set(target, property, value) {
          const oldVal = target[property];
          target[property] = value;

          if (property === 'location' && value !== oldVal) {
            log('script：reinsert styleSheet');
            addStyle();
          }

          return true;
        }

      };
      proxyConfig = new Proxy(unsafeWindow.$CONFIG, handler);
      unsafeWindow.$CONFIG = proxyConfig;
      addStyle();
    });
  } // 新版


  const WbNewVersion = once(() => {
    const store = createStore('weibo');
    const uiControl = createWidescreenControl({
      store,
      visible: false,
      silent: true
    });

    const app = $('#app').__vue__;

    let styleSheet;
    log('新版本', app);
    const pageStyleMap = new Map([// 首页、首页左侧分组、博主主页、自定义主页、微博详情、at我的、评论、赞、我的关注、粉丝、收藏、赞、热门内容、相关用户、实时微博、[我关注的、视频、图片、话题]、热门微博、热门榜单、话题榜、热搜榜
    [['home', 'mygroups', 'profile', 'customProfile', 'bidDetail', 'atWeibo', 'cmtInbox', 'likeInbox', 'follow', 'collect', 'like', 'sweiboDefault', 'suserDefault', 'sweibo', 'weibo', 'list', 'topic', 'search'], () => {
      return GM_addStyle(`
          :root {
            --inject-page-width: min(90vw, 1380px);
          }
          @media screen and (min-width: 1340px) {
            [class*=Frame_content] {
              max-width: none;
              width: var(--inject-page-width);
            }
            /* 内容 */
            [class*=Frame_main],
            [class*=Main_full] {
              flex-grow: 1;
            }
            /* 列表中固定图片宽度，避免太大 */
            .woo-box-wrap[class*=picture_inlineNum3] {
              max-width: 409px;
            }
            /* 列表4张图 */
            .u-col-4.woo-box-wrap {
              max-width: 546px;
            }
            /* 列表中视频 */
            [class*=content_row] [class*=card-video_videoBox] {
              max-width: 540px;
            }
            /* 返回顶部按钮 */
            [class*=Index_backTop] {
              left: calc(50% + var(--inject-page-width) / 2 + var(--frame-mod-gap-space));
              margin-left: 0;
              transform: translateX(0);
            }
          }
        `);
    }], // 视频详情
    [['Playdetail'], () => {
      return GM_addStyle(`
          :root {
            --inject-page-width: min(91vw);
          }
          @media screen and (min-width: 1450px) {
            [class*=Frame_content2] {
              max-width: none;
              width: var(--inject-page-width);
            }
            /* 左列 */
            [class*=Frame_main2] {
              flex-grow: 1;
              padding-right: 20px;
            }
          }
        `);
    }]]);
    const notify = once(() => {
      uiControl.notify();
    });
    app.$watch('$route', (to, from) => {
      styleSheet?.remove();
      log('route changed', to);
      uiControl.hide();

      for (const [routenames, fn] of pageStyleMap.entries()) {
        if (routenames.includes(to.name)) {
          uiControl.show();

          if (store.enabled) {
            styleSheet = fn();
            notify();
          }

          break;
        }
      }
    }, {
      immediate: true
    });
  });

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
      log(target, $CONFIG.location);
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
}); // 动态

handlers.set('weiboDynamic', function () {
  const store = createStore('weibo');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(77.5vw, 1330px);
      }
      @media screen and (min-width: 1300px) {
        .WB_frame {
          display: flex;
          width: var(--inject-page-width) !important;
        }
        /* 内容 */
        .WB_frame #plc_main {
          flex: 1;
          display: flex !important;
        }
        .WB_frame_c {
          flex: 1;
        }
        /* 微博类型 (更多-旅游 中出现) */
        .tab_box {
          display: flex;
        }
        .tab_box::after {
          content: none;
        }
        .tab_box .fr_box {
          flex: 1;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===微博===end */

/* ===豆瓣电影===start */

handlers.set('doubanmovie', function () {
  const store = createStore('doubanmovie');

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: 82vw;
      }
      @media screen and (min-width: 1300px) {
        #wrapper {
          width: var(--inject-page-width);
        }
        /* 内容 */
        #content .article {
          width: calc(100% - 360px);
        }
        /* 电影信息 */
        #content .article .subject {
          width: calc(100% - 175px);
        }
        #content .article #info {
          width: calc(100% - 160px);
          max-width: none;
        }
      }

      @media screen and (min-width: 1610px) {
        :root {
          --inject-page-width: 1318px;
        }
      }
    `);
  }

  createWidescreenControl({
    store,
    execute
  });
});
/* ===豆瓣电影===end */

/* ===今日头条===start */

handlers.set('toutiao', function () {
  const store = createStore('toutiao');
  unsafeWindow.document.addEventListener('readystatechange', () => {
    if (document.readyState !== 'interactive' || !unsafeWindow.Page) return;
    createWidescreenControl({
      store,
      execute
    });
  });

  function execute() {
    GM_addStyle(`
      :root {
        --inject-page-width: min(90vw, 1470px);
      }
      @media (min-width: 1350px) {
        .detail-content-wrapper {
          width: var(--inject-page-width);
        }
        /* 内容 */
        .detail-article-container {
          display: flex;
        }
        .article-content {
          flex: auto;
          margin-right: 60px;
        }
        /* 相关推荐 */
        .footer-feed {
          width: auto;
          margin-right: 60px;
        }
        .feedbox-wrapper {
          width: auto;
        }
      }
    `);
  }
});
/* ===今日头条===end */
// 存储

function createStore(sitename) {
  if (!sitename) throw new TypeError('缺少sitename，期望<string>');

  const getRealProp = property => `${sitename}_${property}`;

  const target = {};
  const handler = {
    get(target, property) {
      const realProp = getRealProp(property);
      let value = target[realProp];

      if (value == null) {
        value = GM_getValue(realProp); // 默认开启

        if (value == null && property === 'enabled') {
          value = true;
        }

        target[realProp] = value;
      }

      return value;
    },

    set(target, property, value) {
      const realProp = getRealProp(property);
      target[realProp] = value;
      GM_setValue(realProp, value);
      return true;
    },

    deleteProperty(target, property) {
      const realProp = getRealProp(property);
      const deleted = delete target[realProp];
      GM_deleteValue(realProp);
      return deleted;
    }

  };
  const store = new Proxy(target, handler);
  return store;
} // 宽屏开关 options: store<store>, execute要执行的函数，visible是否可见(后续用show hide控制)，silent是否显示通知


function createWidescreenControl(options) {
  const {
    reactive,
    toRefs
  } = Vue;
  const {
    store,
    execute = () => {},
    visible = true,
    silent = false
  } = options;
  const app = Vue.createApp({
    render() {
      const {
        uiVisible,
        visible,
        enabled,
        toggle
      } = this;
      return (0,external_Vue_namespaceObject.withDirectives)((0,external_Vue_namespaceObject.createVNode)("button", {
        "class": "inject-widescreen-js",
        "title": "注意：页面会被刷新",
        "onClick": toggle
      }, [enabled ? '已开启' : '关闭']), [[external_Vue_namespaceObject.vShow, uiVisible && visible]]);
    },

    setup() {
      const state = reactive({
        // 总开关
        uiVisible: useGMvalue('ui_visible', true).value,
        visible,
        enabled: store.enabled
      });

      if (store.enabled) {
        execute();
        !silent && notify();
      } // export-api


      function show() {
        state.visible = true;
      }

      function hide() {
        state.visible = false;
      }

      function notify() {
        GM_getValue('notify_enabled', true) && Toast('已宽屏处理');
      } // private-api


      function toggle() {
        store.enabled = !state.enabled;
        location.reload();
      }

      return { ...toRefs(state),
        show,
        hide,
        notify,
        toggle
      };
    }

  });
  const rootContainer = document.createElement('div');
  const buttonComponent = app.mount(rootContainer);
  documentLoaded(() => {
    document.body.appendChild(rootContainer);
  });
  return {
    show: buttonComponent.show,
    hide: buttonComponent.hide,
    notify: buttonComponent.notify
  };
}

main(); // 添加按钮样式

GM_addStyle(`
  .inject-widescreen-js {
    position: fixed;
    z-index: 99;
    top: 150px;
    right: 8vw;
    opacity: .5;
    border: none;
    color :#fff;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    background: #3385ff;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    transition: opacity .3s;
  }
  .inject-widescreen-js:hover {
    opacity: 1;
  }
`);
/******/ })()
;