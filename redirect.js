// ==UserScript==
// @name         redirect 外链跳转
// @version      1.10.0
// @description  自动跳转(重定向)到目标链接，免去点击步骤。适配了简书、知乎、微博、QQ邮箱、QQPC、印象笔记、贴吧、CSDN、YouTube、微信、微信开放社区、开发者知识库、豆瓣
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts
// @license      GPL-3.0
// @compatible   chrome Latest
// @compatible   firefox Latest
// @compatible   edge Latest
// @run-at       document-start
// @match        *://www.jianshu.com/go-wild*
// @match        *://link.zhihu.com/*
// @match        *://t.cn/*
// @match        *://mail.qq.com/cgi-bin/*
// @match        *://c.pc.qq.com/middlem.html*
// @match        *://app.yinxiang.com/OutboundRedirect.action*
// @match        *://jump2.bdimg.com/safecheck/*
// @match        *://link.csdn.net/*
// @match        *://www.youtube.com/redirect*
// @match        *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi*
// @match        *://developers.weixin.qq.com/community/middlepage/href*
// @match        *://www.itdaan.com/link/*
// @match        *://www.douban.com/link2/*
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
;// CONCATENATED MODULE: ./src/utils/log.js
const isDebug = "production" !== 'production';

function warn(...args) {
  isDebug && console.warn(...args);
}

function table(...args) {
  isDebug && console.table(...args);
}


;// CONCATENATED MODULE: ./src/utils/ready-state.js

/**
 * 在tampermonkey中，DOMContentLoaded监听后会被缓存，总是会执行
 * readyState的值会因为脚本加载时间可能被抛弃没有版本被监听到
 *
 * 基于上面原因，pool中的状态区分先后顺序
 * 靠后定义的会自动将靠前定义的但没有监听到的执行一次，但实际上不再是原来的状态
 */

const pool = new Map([['loading', []], ['interactive', []], ['DOMContentLoaded', []], // 扩展状态
['complete', []], ['load', []] // 扩展状态
]);

const execute = readyState => {
  for (const [state, functions] of pool) {
    while (functions.length) {
      functions.shift()();
    }

    if (readyState === state) break;
  }
};

warn('document.readyState', document.readyState);
execute(document.readyState);
document.readyState !== 'complete' && document.addEventListener('readystatechange', () => execute(document.readyState));
window.addEventListener('DOMContentLoaded', () => {
  // 确认tampermonkey中脚本真正加载状态
  execute(document.readyState === 'complete' ? 'complete' : 'DOMContentLoaded');
});
window.addEventListener('load', () => execute('load'));

const wrapper = (readyState, fn) => new Promise(resolve => {
  pool.get(readyState).push(function () {
    resolve(fn?.());
  });
});

const loading = fn => wrapper('loading', fn);
const interactive = fn => wrapper('interactive', fn);
const DOMContentLoaded = fn => wrapper('DOMContentLoaded', fn);
const complete = fn => wrapper('complete', fn);
const load = fn => wrapper('load', fn);
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
;// CONCATENATED MODULE: ./src/utils/selector.js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/www-jianshu-com.js
const jianshu = () => ({
  query: 'url'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/link-zhihu-com.js
const zhihu = () => ({
  query: 'target'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/t-cn.js
const weibo = () => ({
  selector: '.open-url a[href]',
  attr: 'href'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/mail-qq-com.js

const qqMail = () => ({
  link: parse().url || parse().gourl
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/c-pc-qq-com.js
const qqPC = () => ({
  query: 'pfurl'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/app-yinxiang-com.js
const yinxiang = () => ({
  query: 'dest'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/jump2-bdimg-com.js
const tieba = () => ({
  selector: '.warning_info a:nth-of-type(1)[href]',
  attr: 'href'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/link-csdn-net.js
const csdn = () => ({
  query: 'target'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/www-youtube-com.js
const youtube = () => ({
  query: 'q'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/weixin110-qq-com.js
/* eslint-disable camelcase */

const weixin = () => {
  const {
    main_type
  } = parse();

  switch (main_type) {
    case '1':
      return {
        selector: '.weui-msg__text-area .ui-ellpisis-content p'
      };

    case '2':
      {
        const url = new URL(location); // 转为1可还原链接

        url.searchParams.set('main_type', '1');
        location.replace(url.toString());
      }
  }

  return {};
};
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/developers-weixin-qq-com.js
const weixinDevelopers = () => ({
  query: 'href'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/www-itdaan-com.js
const itdaan = () => ({
  selector: '.safety-url'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/www-douban-com.js
const douban = () => ({
  query: 'url'
});
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/index.js













const sites = [{
  name: '简书',
  test: /www\.jianshu\.com\/go-wild/,
  use: jianshu
}, {
  name: '知乎',
  test: /link\.zhihu\.com/,
  use: zhihu
}, {
  name: '微博',
  test: /t\.cn\//,
  readyState: 'interactive',
  use: weibo
}, {
  name: 'QQ邮箱',
  test: [/mail\.qq\.com\/cgi-bin\/readtemplate/, // 好像不用登录也可以
  /mail\.qq\.com\/cgi-bin\/mail_spam/ // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转
  ],
  use: qqMail
}, {
  name: 'QQPC',
  test: /c\.pc\.qq.com\/middlem\.html/,
  use: qqPC
}, {
  name: '印象笔记',
  test: /app\.yinxiang\.com\/OutboundRedirect/,
  use: yinxiang
}, {
  name: '贴吧',
  test: /jump2\.bdimg\.com\/safecheck/,
  readyState: 'interactive',
  use: tieba
}, {
  name: 'CSDN',
  test: /link\.csdn\.net/,
  use: csdn
}, {
  name: 'YouTube',
  test: /www\.youtube\.com\/redirect/,
  use: youtube
}, {
  name: '微信',
  test: /weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
  readyState: 'interactive',
  use: weixin
}, {
  name: '微信开放社区',
  test: /developers\.weixin\.qq\.com\/community\/middlepage\/href/,
  use: weixinDevelopers
}, {
  name: '开发者知识库',
  test: /www\.itdaan.com\/link/,
  readyState: 'interactive',
  use: itdaan
}, {
  name: '豆瓣',
  test: /www\.douban.com\/link2\//,
  use: douban
}];
/* harmony default export */ const redirect_sites = (sites);
;// CONCATENATED MODULE: ./src/scripts/redirect/index.js
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }








var _sites = _classPrivateFieldLooseKey("sites");

var _includes = _classPrivateFieldLooseKey("includes");

var _parse = _classPrivateFieldLooseKey("parse");

var _ensure = _classPrivateFieldLooseKey("ensure");

class App {
  constructor(sites) {
    Object.defineProperty(this, _ensure, {
      value: _ensure2
    });
    Object.defineProperty(this, _parse, {
      value: _parse2
    });
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
    const briefURL = location.origin + location.pathname;

    _classPrivateFieldLooseBase(this, _sites)[_sites].forEach(async site => {
      const {
        name,
        test,
        use
      } = site;
      if (!_classPrivateFieldLooseBase(this, _includes)[_includes](test, briefURL)) return;
      const {
        readyState: state
      } = site;
      if (state) await ready_state_namespaceObject[state]();

      const redirection = _classPrivateFieldLooseBase(this, _parse)[_parse](use);

      table({
        name,
        briefURL,
        redirection
      });
      redirection && location.replace(redirection);
    });
  }

}

var _includes2 = function _includes2(test, url) {
  return [].concat(test).some(item => {
    if (item instanceof RegExp) return item.test(url);
    if (typeof item === 'boolean') return item;
    return false;
  });
};

var _parse2 = function _parse2(use) {
  const {
    query,
    link,
    selector,
    attr
  } = use();
  let redirection = null;

  if (query) {
    redirection = parse()[query];
  } else if (link) {
    redirection = isFunction(link) ? link() : link;
  } else if (selector) {
    redirection = $(selector)?.[attr ?? 'innerText'];
  }

  redirection && (redirection = _classPrivateFieldLooseBase(this, _ensure)[_ensure](redirection.trim()));
  return redirection;
};

var _ensure2 = function _ensure2(url) {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (error) {
    warn(error); // 修复某些链接没有protocol导致跳转不正确
    // https://greasyfork.org/zh-CN/scripts/416338-redirect-自动跳转到目标链接/discussions/69178

    const protocol = 'http:';
    url = protocol + '//' + url;
  }

  return url;
};

new App(redirect_sites).boot();
/******/ })()
;