// ==UserScript==
// @name         论坛文章页宽屏
// @version      1.0.0
// @description  适配了微信公众号、知乎、掘金、简书，贴吧
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter
// @compatible   chrome >= 80
// @compatible   firefox >= 75
// @run-at       document-start
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://juejin.im/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://tieba.baidu.com/p/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=847261
// ==/UserScript==

/* global Vue Toast */

(function() {
  'use strict'

  const isDebug = false

  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

  function log(...args) {
      if (!isDebug) return
      console.log(...args)
  }

  // 主函数
  function main() {
      const sites = checkWebsites()
      sites.forEach(site => {
          const hanlder = handlers.get(site)
          log(site)
          hanlder && hanlder()
      })
  }

  // 检查网站
  function checkWebsites() {
      const { origin, pathname } = location
      const url = origin + pathname
      // 格式[ ['xx', true|false], ]
      const sites = [
          ['mpWeixin', /mp.weixin.qq.com\/s/.test(url)],
          ['zhihu', /zhuanlan.zhihu.com\/p\//.test(url) || /zhihu.com\/question\//.test(url)],
          ['juejin', /juejin.im\/post\//.test(url)],
          ['jianshu', /jianshu.com\/p\//.test(url)],
          ['tieba', /tieba.baidu.com\/p\//.test(url)],
      ]
      // 返回匹配的页面
      return sites
          .filter(item => item[1])
          .map(item => item[0])
  }

  // 对应网页要执行的操作操作
  const handlers = new Map()

  /* ===微信文章===start */
  handlers.set('mpWeixin', function() {
      const store = createStore('mpWeixin')
      function execute() {
          GM_addStyle(`
          /* 文章宽屏 */
          .rich_media_area_primary_inner { max-width: 100vw !important; }
          /* 二维码位置 */
          #js_pc_qr_code .qr_code_pc { position: fixed; top: 25vh; right: 3vw; opacity: .4;}
          #js_pc_qr_code .qr_code_pc:hover { opacity: 1;}
          @media screen and (min-width: 1024px) {
            .rich_media_area_primary_inner { max-width: 75vw !important; }
            #js_pc_qr_code .qr_code_pc { position: fixed; top: 25vh; right: 3vw; }
          }
        `)

          window.addEventListener('DOMContentLoaded', () => {
              // 文章图片宽高（仅对大图处理）
              const imgEls = $$('.rich_media_area_primary_inner img')
              imgEls.forEach(img => {
                  img.addEventListener('load', () => {
                      // 页面本身对图片有宽高处理，延时后再处理
                      setTimeout(() => {
                          const width = parseFloat(getComputedStyle(img).width)
                          if (width >= 400) {
                              img.style.cssText += 'width: auto !important; height: auto !important;'
                          }
                      },16)
                  })
              })
          })
      }

      createWidescreenControl({ store, execute })
  })
  /* ===微信文章===end */

  /* ===知乎===start */
  handlers.set('zhihu', function() {
      const store = createStore('zhihu')
      function execute() {
          GM_addStyle(`
          /* 知乎专栏 */
          .Post-NormalMain .Post-Header, .Post-NormalMain>div, .Post-NormalSub>div {
             width: 65vw;
             min-width: 690px;
          }
          .Post-SideActions { left: calc((100vw - 82vw)/2); }
          /* 知乎问答 */
          .QuestionHeader-content, .QuestionHeader-footer {
             width: 75vw;
             min-width: 1000px;
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
             width: auto;
             flex: 1;
          }
          .Question-main {
             width: 75vw;
             min-width: 1000px;
          }
          .Question-main .ListShortcut {
             flex: 1;
          }
          .Question-mainColumn {
             flex: 1;
             width: auto;
             padding-right: 10px;
          }
        `)
      }

      createWidescreenControl({ store, execute })
  })
  /* ===知乎===end */

  /* ===掘金===start */
  handlers.set('juejin', function() {
      const store = createStore('juejin')
      function execute() {
          GM_addStyle(`
          /* 掘金文章 */
          @media screen and (min-width: 1300px) {
            .main-container {
               max-width: 75vw;
            }
            .main-container .main-area {
               width: calc(100% - 21rem);
            }
          }
        `)
      }

      createWidescreenControl({ store, execute })
  })
  /* ===掘金===end */

  /* ===简书===start */
  handlers.set('jianshu', function() {
      const store = createStore('jianshu')
      function execute() {
          GM_addStyle(`
          /* 简书文章 */
          @media screen and (min-width: 1250px) {
            [role=main] > div:first-child {
               flex: 1;
               width: auto;
            }
          }
          @media screen and (min-width: 1250px) {
            [role=main] {
               width: 85vw;
            }
            #__next > div:last-child {
               left: 30px;
            }
          }
          @media screen and (min-width: 1450px) {
            [role=main] {
               width: 75vw;
            }
            #__next > div:last-child {
               left: 7vw;
            }
          }
        `)
      }

      createWidescreenControl({ store, execute })
  })
  /* ===简书===end */

  /* ===贴吧===start */
  handlers.set('tieba', function() {
      const store = createStore('tieba')
      function execute() {
          GM_addStyle(`
          /* 帖子 */
          @media screen and (min-width: 1390px) {
            #container {
               width: 70vw;
            }
            #container > .content {
               width: 100%;
            }
            .nav_wrap, .p_thread, .pb_content, .core_title_wrap_bright, .l_post_bright, .core_reply_wrapper, .l_post_bright .core_reply_wrapper, .pb_footer {
               width: 100%;
            }
            .core_title_absolute_bright {
               width: calc(70vw - 240px);
            }
            /* 内容区域 */
            .pb_content {
               display: flex;
               background-size: 100%;
            }
            .pb_content::after {
               content: none;
            }
            /* 楼区域 */
            .left_section {
               flex: 1;
               border-right: 2px solid #e4e6eb;
            }
            /* 楼层 */
            .l_post_bright {
               display: flex;
            }
            .l_post_bright .d_post_content_main{
               width: auto;
               flex: 1;
            }
            /* 右侧悬浮按钮 */
            .tbui_aside_float_bar {
               left: auto;
               right: 11vw;
               margin-left: 0;
            }
          }
        `)
      }

      createWidescreenControl({ store, execute })
  })
  /* ===贴吧===end */

  // 存储 以网站作为模块
  function createStore(sitename) {
      if (!sitename) throw new TypeError('缺少sitename，期望<string>')
      const getRealProp = property => `${sitename}_${property}`
    const target = {}
    const handler = {
        get(target, property) {
            const realProp = getRealProp(property)
            let value = target[realProp]
            if (value == null) {
                value = GM_getValue(realProp)
                target[realProp] = value
            }
            return value
        },
        set(target, property, value) {
            const realProp = getRealProp(property)
            target[realProp] = value
            GM_setValue(realProp, value)
            return true
        },
        deleteProperty(target, property) {
            const realProp = getRealProp(property)
            const deleted = delete target[realProp]
            GM_deleteValue(realProp)
            return deleted
        },
    }
    const store = new Proxy(target, handler)
    return store
  }

  // 添加按钮样式
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
      background: #3385ff;
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      transition: opacity .3s;
    }
    .inject-widescreen-js:hover {
      opacity: 1;
    }
  `)
  // 宽屏开关 options: store<store>, execute要执行的函数
  function createWidescreenControl(options) {
      const { store, execute } = options
      const buttonComponent = new Vue({
          template: `
          <button
            class="inject-widescreen-js"
            title="注意：页面会被刷新"
            @click="toggle"
          >
           {{ isOpen ? '已开启' : '关闭' }}
          </button>
        `,
          data() {
              return {
                  isOpen: store.is_open || false,
              }
          },
          beforeCreate() {
              store.is_open && (execute(), Toast('已宽屏处理'))
          },
          methods: {
              async toggle() {
                  store.is_open = !this.isOpen
                  location.reload()
              }
          },
      }).$mount()
      window.addEventListener('DOMContentLoaded', () => {
          document.body.appendChild(buttonComponent.$el)
      })
  }

  main()

})();