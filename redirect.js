// ==UserScript==
// @name         redirect 外链跳转
// @version      1.47.0
// @description  自动跳转(重定向)到目标链接，免去点击步骤。适配了简书、知乎、微博、QQ邮箱、QQPC、QQNT、印象笔记、贴吧、CSDN、YouTube、微信、微信开放社区、开发者知识库、豆瓣、个人图书馆、Pixiv、搜狗、Google、站长之家、OSCHINA、掘金、腾讯文档、pc6下载站、爱发电、Gitee、天眼查、爱企查、企查查、优设网、51CTO、力扣、花瓣网、飞书、Epic、Steam、语雀、牛客网、哔哩哔哩、少数派、5ch、金山文档、石墨文档、urlshare、酷安、网盘分享
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
// @match        *://weibo.cn/sinaurl*
// @match        *://mail.qq.com/cgi-bin/*
// @match        *://c.pc.qq.com/middlem.html*
// @match        *://c.pc.qq.com/pc.html*
// @match        *://c.pc.qq.com/ios.html*
// @match        *://app.yinxiang.com/OutboundRedirect.action*
// @match        *://jump.bdimg.com/safecheck/*
// @match        *://jump2.bdimg.com/safecheck/*
// @match        *://link.csdn.net/*
// @match        *://www.youtube.com/redirect*
// @match        *://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi*
// @match        *://developers.weixin.qq.com/community/middlepage/href*
// @match        *://www.itdaan.com/link/*
// @match        *://www.douban.com/link2/*
// @match        *://www.360doc.com/content/*
// @match        *://www.pixiv.net/jump.php*
// @match        *://m.sogou.com/*/tc*
// @match        *://m.sogou.com*/tc*
// @match        *://www.chinaz.com/go.shtml*
// @match        *://www.oschina.net/action/GoToLink*
// @match        *://link.juejin.cn/*
// @match        *://docs.qq.com/scenario/link.html*
// @match        *://www.pc6.com/goread.html*
// @match        *://afdian.net/link*
// @match        *://gitee.com/link*
// @match        *://www.tianyancha.com/security*
// @match        *://aiqicha.baidu.com/safetip*
// @match        *://www.qcc.com/web/transfer-link*
// @match        *://link.uisdc.com/*
// @match        *://blog.51cto.com/transfer*
// @match        *://leetcode.cn/link*
// @match        *://huaban.com/go*
// @match        *://security.feishu.cn/link/safety*
// @match        *://redirect.epicgames.com/*
// @match        *://steamcommunity.com/linkfilter/*
// @match        *://www.yuque.com/r/goto*
// @match        *://hd.nowcoder.com/link.html*
// @match        *://game.bilibili.com/linkfilter/*
// @match        *://sspai.com/link*
// @match        *://jump.5ch.net/*
// @match        *://www.kdocs.cn/office/link*
// @match        *://shimo.im/outlink/black*
// @match        *://google.urlshare.cn/umirror_url_check*
// @match        *://www.coolapk.com/link*
// @match        *://wpfx.org/go*
// @match        *://cloud.tencent.com/developer/tools/blog-entry*
// @include      /^https?:\/\/www\.google\..{2,7}url/
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
var __webpack_exports__ = {};

// NAMESPACE OBJECT: ./src/utils/ready-state.ts
var ready_state_namespaceObject = {};
__webpack_require__.r(ready_state_namespaceObject);
__webpack_require__.d(ready_state_namespaceObject, {
  "DOMContentLoaded": () => (DOMContentLoaded),
  "complete": () => (complete),
  "interactive": () => (interactive),
  "load": () => (load),
  "loading": () => (loading)
});

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


;// CONCATENATED MODULE: ./src/utils/ready-state.ts
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

if (document.readyState !== 'complete') {
  document.addEventListener('readystatechange', () => execute(document.readyState));
  window.addEventListener('DOMContentLoaded', () => execute('DOMContentLoaded'));
}

window.addEventListener('load', () => execute('load'));

const wrapper = (readyState, fn) => new Promise(resolve => {
  pool.get(readyState).push(function () {
    resolve(fn?.());
  }); // 立即检查一下

  execute();
});

const loading = fn => wrapper('loading', fn);
const interactive = fn => wrapper('interactive', fn);
const DOMContentLoaded = fn => wrapper('DOMContentLoaded', fn);
const complete = fn => wrapper('complete', fn);
const load = fn => wrapper('load', fn);
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

  return Object.fromEntries(new URLSearchParams(search));
}
function stringify(obj) {
  return Object.entries(obj) // 过滤 undefined，保留 null 且转成 ''
  .filter(([, value]) => value !== undefined).map(([key, value]) => `${key}=${value ?? ''}`).join('&');
}
;// CONCATENATED MODULE: ./src/utils/selector.ts
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/t-cn.ts

const weibo = async () => {
  let link = $('.open-url a[href]')?.href;
  link || (link = await fetch(location.href).then(response => response.headers.get('location')));
  return {
    link
  };
};
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/weixin110-qq-com.ts
/* eslint-disable camelcase */

const {
  atob
} = window;
const weixin = () => {
  const {
    main_type,
    midpagecode
  } = parse();
  /**
   * main_type 貌似是旧的规则
   */

  switch (main_type) {
    case '2':
      {
        const url = new URL(location.href); // 转为 1 可还原链接

        url.searchParams.set('main_type', '1');
        location.replace(url.href);
        return {};
      }

    case '1':
      break;
  }
  /**
   * midpagecode 似乎是新的规则
   */


  const MAGIC_KEY = atob(atob('Tmpjek56ZGhNbUZrWWpRMFpURTNZekZpTUdGa1lqSTBZalZqWmpKaVpERXlZek0wWkRsaU5UWmxNRFpqWTJRMlpHUTBZekk1TVdJME1qTmlOV0prTjJabU5tUmhZbVJqTlRVM1l6azVNbVkxWkRZd1pEZzVNbUkyT0Rjd1pqYzBOakV3TldNM05HRmhNalJqTXpBMk0yUTNOR1ExT1dJMFlXVTFOVFF6WldJM1lqSmtObVUwT1dOak1qYzNNMkZsTVRjM01UWTNNemcwTmpRM04ySmpOalppTTJNelltUTNPVE5sWkRJNFpEZGhaVE5rTnpZeE0yUm1ZVGRpWW1ReQ=='));

  if (midpagecode && midpagecode !== MAGIC_KEY && !window.cgiData?.url) {
    const url = new URL(location.href); // 会还原链接

    url.searchParams.set('midpagecode', MAGIC_KEY);
    location.replace(url.href);
    return {};
  }

  return {
    // 如果解析得到，会出现在页面这里
    selector: '.weui-msg__text-area .ui-ellpisis-content p'
  };
};
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/www-360doc-com.ts


const doc360 = () => {
  $('#artContent').addEventListener('click', event => {
    const {
      target
    } = event;
    const href = target.href;
    warn(target);
    if (target.nodeName !== 'A') return;
    if (!href) return; // 是否本站

    if (new RegExp(location.host).test(new URL(href).host)) return;
    event.stopPropagation();
    window.open(href);
  }, true);
  return {};
};
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/www-pixiv-net.ts

const pixiv = () => {
  let link; // 链接居然是直接拼在url上的
  // https://www.pixiv.net/jump.php?https%3A%2F%2Fwww.huawei.com%2Fcn%2Fcorporate-information

  for (const [key, value] of Object.entries(parse())) {
    try {
      link || (link = new URL(key).href);
    } catch {}

    try {
      link || (link = new URL(value).href);
    } catch {}
  }

  return {
    link
  };
};
;// CONCATENATED MODULE: ./src/scripts/redirect/sites/index.ts






const sites = [{
  name: '简书',
  test: 'www.jianshu.com/go-wild',
  use: () => ({
    query: 'url'
  })
}, {
  name: '知乎',
  test: 'link.zhihu.com/',
  use: () => ({
    query: 'target'
  })
}, {
  name: '微博',
  test: /^t\.cn\//,
  readyState: 'interactive',
  use: weibo
}, {
  name: '微博',
  // 不同规则
  test: 'weibo.cn/sinaurl',
  use: () => ({
    link: parse().toasturl || parse().u
  })
}, {
  name: 'QQ邮箱',
  test: [/^mail\.qq\.com\/cgi-bin\/readtemplate/, // 好像不用登录也可以
  /^mail\.qq\.com\/cgi-bin\/mail_spam/ // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转
  ],
  use: () => ({
    link: parse().url || parse().gourl
  })
}, {
  name: 'QQPC',
  test: 'c.pc.qq.com/middlem.html',
  use: () => ({
    query: 'pfurl'
  })
}, {
  // 被阻止访问
  name: 'QQPC2',
  test: 'c.pc.qq.com/pc.html',
  use: () => ({
    query: 'url'
  })
}, {
  name: 'QQNT',
  test: 'c.pc.qq.com/ios.html',
  use: () => ({
    query: 'url'
  })
}, {
  name: '腾讯文档',
  test: 'docs.qq.com/scenario/link.html',
  use: () => ({
    query: 'url'
  })
}, {
  name: '印象笔记',
  test: /^app\.yinxiang\.com\/OutboundRedirect/,
  use: () => ({
    query: 'dest'
  })
}, {
  name: '贴吧',
  test: /^jump2?\.bdimg\.com\/safecheck/,
  // 以前的地址没有 2
  readyState: 'interactive',
  use: () => ({
    selector: '.warning_info a:nth-of-type(1)[href]',
    attr: 'href'
  })
}, {
  name: 'CSDN',
  test: 'link.csdn.net/',
  use: () => ({
    query: 'target'
  })
}, {
  name: 'YouTube',
  test: 'www.youtube.com/redirect',
  use: () => ({
    query: 'q'
  })
}, {
  name: '微信',
  test: /^weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
  readyState: 'interactive',
  use: weixin
}, {
  name: '微信开放社区',
  test: 'developers.weixin.qq.com/community/middlepage/href',
  use: () => ({
    query: 'href'
  })
}, {
  name: '开发者知识库',
  test: /^www\.itdaan.com\/link\//,
  readyState: 'interactive',
  use: () => ({
    selector: '.safety-url'
  })
}, {
  name: '豆瓣',
  test: 'www.douban.com/link2/',
  use: () => ({
    query: 'url'
  })
}, {
  name: '个人图书馆',
  test: /^www\.360doc.com\/content\//,
  readyState: 'interactive',
  use: doc360
}, {
  name: 'Pixiv',
  test: 'www.pixiv.net/jump.php',
  use: pixiv
}, {
  name: '搜狗',
  test: /^m\.sogou\.com.*tc$/,
  use: () => ({
    query: 'url'
  })
}, {
  name: 'Google',
  test: /^www\.google\..{2,7}url$/,
  use: () => ({
    link: parse().url || parse().q
  })
}, {
  name: '站长之家',
  test: 'www.chinaz.com/go.shtml',
  use: () => ({
    query: 'url'
  })
}, {
  name: 'OSCHINA',
  test: 'www.oschina.net/action/GoToLink',
  use: () => ({
    query: 'url'
  })
}, {
  name: '掘金',
  test: 'link.juejin.cn/',
  use: () => ({
    query: 'target'
  })
}, {
  name: 'pc6下载站',
  test: 'www.pc6.com/goread.html',
  use: () => ({
    query: 'gourl'
  })
}, {
  name: '爱发电',
  test: 'afdian.net/link',
  use: () => ({
    query: 'target'
  })
}, {
  name: 'Gitee',
  test: 'gitee.com/link',
  use: () => ({
    query: 'target'
  })
}, {
  name: '天眼查',
  test: 'www.tianyancha.com/security',
  use: () => ({
    query: 'target'
  })
}, {
  name: '爱企查',
  test: 'aiqicha.baidu.com/safetip',
  use: () => ({
    query: 'target'
  })
}, {
  name: '企查查',
  test: 'www.qcc.com/web/transfer-link',
  use: () => ({
    query: 'link'
  })
}, {
  name: '优设网',
  test: 'link.uisdc.com/',
  use: () => ({
    query: 'redirect'
  })
}, {
  name: '51CTO',
  test: 'blog.51cto.com/transfer',
  use: () => ({
    link: location.search.slice(1)
  })
}, {
  name: '力扣',
  test: 'leetcode.cn/link/',
  use: () => ({
    query: 'target'
  })
}, {
  name: '花瓣网',
  test: 'huaban.com/go',
  readyState: 'interactive',
  use: () => {
    const nextData = JSON.parse($('#__NEXT_DATA__').textContent);
    return {
      link: nextData.props.pageProps?.data.link
    };
  }
}, {
  name: '飞书',
  test: 'security.feishu.cn/link/safety',
  use: () => ({
    query: 'target'
  })
}, {
  name: 'Epic',
  test: /^redirect\.epicgames\.com\//,
  use: () => ({
    query: 'redirectTo'
  })
}, {
  name: 'Steam',
  test: 'steamcommunity.com/linkfilter/',
  use: () => ({
    query: 'url'
  })
}, {
  name: '语雀',
  test: 'www.yuque.com/r/goto',
  use: () => ({
    query: 'url'
  })
}, {
  name: '牛客网',
  test: 'hd.nowcoder.com/link.html',
  use: () => ({
    query: 'target'
  })
}, {
  name: '哔哩哔哩',
  test: 'game.bilibili.com/linkfilter/',
  use: () => ({
    query: 'url'
  })
}, {
  name: '少数派',
  test: 'sspai.com/link',
  use: () => ({
    query: 'target'
  })
}, {
  name: '5ch',
  test: 'jump.5ch.net/',
  use: () => ({
    link: location.search.slice(1)
  })
}, {
  name: '金山文档',
  test: 'www.kdocs.cn/office/link',
  use: () => ({
    query: 'target'
  })
}, {
  name: '石墨文档',
  test: 'shimo.im/outlink/black',
  use: () => ({
    query: 'url'
  })
}, {
  name: 'urlshare',
  test: 'google.urlshare.cn/umirror_url_check',
  use: () => ({
    query: 'url'
  })
}, {
  name: '酷安',
  test: 'www.coolapk.com/link',
  use: () => ({
    query: 'url'
  })
}, {
  name: '网盘分享',
  test: 'wpfx.org/go/',
  use: () => ({
    query: 'url'
  })
}, {
  name: '腾讯云开发者社区',
  test: 'cloud.tencent.com/developer/tools/blog-entry',
  use: () => ({
    query: 'target'
  })
}];
/* harmony default export */ const redirect_sites = (sites);
;// CONCATENATED MODULE: ./src/scripts/redirect/index.ts
function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }







function hidePage() {
  interactive(() => {
    document.body.style.cssText = 'display:none !important;';
  });
}

var _sites = /*#__PURE__*/_classPrivateFieldLooseKey("sites");

var _includes = /*#__PURE__*/_classPrivateFieldLooseKey("includes");

var _parse = /*#__PURE__*/_classPrivateFieldLooseKey("parse");

var _ensure = /*#__PURE__*/_classPrivateFieldLooseKey("ensure");

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
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _sites)[_sites] = sites;
  }

  boot() {
    const briefURL = location.host + location.pathname;

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
      const redirection = await _classPrivateFieldLooseBase(this, _parse)[_parse](use);
      table({
        name,
        briefURL,
        redirection
      });
      if (!redirection) return;
      location.replace(redirection); // 为什么要这样做？
      // 只是为了避免被问“哎！怎么好像没有跳转啊？！”的烦恼（实际上跳转了只是外链打开慢）(x_x)

      hidePage();
    });
  }

}

function _includes2(test, url) {
  return [].concat(test).some(item => {
    if (typeof item === 'string') return item === url;
    if (item instanceof RegExp) return item.test(url);
    return false;
  });
}

async function _parse2(use) {
  const {
    query,
    link,
    selector,
    attr
  } = await use();
  let redirection;

  if (query) {
    redirection = parse()[query];
  } else if (link) {
    redirection = link;
  } else if (selector) {
    redirection = $(selector)?.[attr ?? 'innerText'];
  }

  redirection && (redirection = _classPrivateFieldLooseBase(this, _ensure)[_ensure](redirection.trim()));
  return redirection;
}

function _ensure2(url) {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (error) {
    warn(error); // 修复某些链接没有 protocol 导致跳转不正确
    // https://greasyfork.org/zh-CN/scripts/416338-redirect-外链跳转/discussions/69178

    const protocol = 'http:';
    url = protocol + '//' + url;
  }

  return url;
}

new App(redirect_sites).boot();
/******/ })()
;