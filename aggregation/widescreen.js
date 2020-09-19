// ==UserScript==
// @name         论坛文章页宽屏
// @version      1.3.0
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、segmentfault、哔哩哔哩
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter
// @compatible   chrome >= 80
// @compatible   firefox >= 75
// @run-at       document-start
// @match        https://bcy.net/item/detail/*
// @match        https://mp.weixin.qq.com/s*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://juejin.im/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.baidu.com/s?*
// @match        https://www.baidu.com/
// @match        https://tieba.baidu.com/p/*
// @match        https://tieba.baidu.com/f?*
// @match        https://segmentfault.com/a/*
// @match        https://segmentfault.com/q/*
// @match        https://www.bilibili.com/read/*
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
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
        GM_registerMenuCommand('宽屏通知', function() {
            const nextStatus = !GM_getValue('notify_enabled', true)
            Toast.success(nextStatus ? '已开启通知' : '已关闭通知')
            GM_setValue('notify_enabled', nextStatus)
        })

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
            ['bcy', /bcy.net\/item\/detail/.test(url)],
            ['mpWeixin', /mp.weixin.qq.com\/s/.test(url)],
            ['zhihu', /zhuanlan.zhihu.com\/p\//.test(url)],
            ['zhihuQuestion', /zhihu.com\/question\//.test(url)],
            ['juejin', /juejin.im\/post\//.test(url)],
            ['jianshu', /jianshu.com\/p\//.test(url)],
            ['baidu', /www.baidu.com\/s?/.test(url)],
            ['tieba', /tieba.baidu.com\/p\//.test(url)],
            ['tiebaForum', /tieba.baidu.com\/f?/.test(url)],
            ['segmentfault', /segmentfault.com/.test(url)],
            ['bilibili', /bilibili.com/.test(url)],
        ]
        // 返回匹配的页面
        return sites
            .filter(item => item[1])
            .map(item => item[0])
    }

    // 对应网页要执行的操作操作
    const handlers = new Map()

    /* ===半次元===start */
    handlers.set('bcy', function() {
        const store = createStore('bcy')
        function execute() {
            GM_addStyle(`
              @media (min-width: 1580px) {
                .container .row {
                   width: 75vw;
                }
                .container .row .col-big {
                   flex: .97;
                }
                /* 文章头部信息 */
                .detail-main header {
                   width: auto !important;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===半次元===end */

    /* ===微信文章===start */
    handlers.set('mpWeixin', function() {
        const store = createStore('mpWeixin')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 90vw;
              }
              /* 文章宽屏 */
              .rich_media_area_primary_inner { max-width: 100vw !important; }
              /* 二维码位置 */
              #js_pc_qr_code .qr_code_pc { position: fixed; top: 25vh; right: 3vw; opacity: .4;}
              #js_pc_qr_code .qr_code_pc:hover { opacity: 1;}
              @media screen and (min-width: 1024px) {
                .rich_media_area_primary_inner { max-width: var(--inject-page-width) !important; }
                #js_pc_qr_code .qr_code_pc { position: fixed; top: 25vh; right: 3vw; }
              }

              @media screen and (min-width: 1250px) {
                :root {
                   --inject-page-width: 1150px;
                }
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
    // 知乎专栏
    handlers.set('zhihu', function() {
        const store = createStore('zhihu')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 75vw;
              }
              @media screen and (min-width: 1000px) {
                .Post-NormalMain .Post-Header, .Post-NormalMain>div, .Post-NormalSub>div {
                   width: var(--inject-page-width);
                }
                /* 左侧悬浮按钮 */
                .Post-SideActions {
                  left: calc(50% - (var(--inject-page-width) / 2) - 120px);
                }
              }

              @media screen and (min-width: 1500px) {
                :root {
                   --inject-page-width: 1120px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })

    // 知乎问答
    handlers.set('zhihuQuestion', function() {
        const store = createStore('zhihu')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 75vw;
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
                   width: auto;
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
              }

              @media screen and (min-width: 1750px) {
                :root {
                   --inject-page-width: 1300px;
                }
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
              :root {
                --inject-page-width: 82vw;
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

              @media screen and (min-width: 1500px) {
                :root {
                   --inject-page-width: 1230px;
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
              :root {
                --inject-page-width: 85vw;
              }
              /* 简书文章 */
              @media screen and (min-width: 1250px) {
                [role=main] {
                   width: var(--inject-page-width);
                }
                [role=main] > div:first-child {
                   flex: 1;
                   width: auto;
                }
                /* 左侧悬浮按钮 */
                #__next > div:last-child {
                   left: calc(50% - (var(--inject-page-width) / 2) - 80px);
                }
              }

              @media screen and (min-width: 1500px) {
                :root {
                   --inject-page-width: 1280px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===简书===end */

    /* ===百度搜索===start */
    handlers.set('baidu', function() {
        const store = createStore('baidu')
        function execute() {
            const styleEl = GM_addStyle(`
              :root {
                --inject-page-width: 75vw;
              }
              @media screen and (min-width: 1460px) {
                /* 顶部搜索 */
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
                }
                /* 仅对新闻流处理宽屏 */
                .container_new {
                   width: var(--inject-page-width) !important;
                }
                /* 左侧搜索结果 */
                .container_new #content_left {
                   width: calc(var(--inject-page-width) - 450px) !important;
                }
                /* [tpl*=img_address]忽略图片区域，防止宽屏后排版混乱(搜索：樱花) */
                .container_new #content_left > div:not([tpl*=img_address]) {
                   width: 100% !important;
                }
                .container_new #content_left .new-pmd .c-span9 {
                   width: 75%;
                }
                .container_new #content_left .c-group-wrapper .c-group {
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
                .container_new #content_left .new-pmd .c-span9 {
                   width: 81%;
                }
              }
              @media screen and (min-width: 1730px) {
                :root {
                   --inject-page-width: 1300px;
                }
              }
            `)
            // 搜索时百度会清除文档这里需要将样式重新插入
            function redo() {
                if (document.head.contains(styleEl)) return
                document.head.appendChild(styleEl)
            }
            window.addEventListener('DOMContentLoaded', () => {
                const { jQuery } = unsafeWindow
                jQuery(document).ajaxSuccess((event, xhr, settings) => {
                    if (!settings.url.startsWith('/s?')) return
                    redo()
                })
            })
            window.addEventListener('popstate', redo)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===百度搜索===end */

    /* ===贴吧===start */
    handlers.set('tieba', function() {
        const store = createStore('tieba')
        function execute() {
            GM_addStyle(`
              /* 帖子 */
              :root {
                --inject-page-width: 80vw;
              }
              @media screen and (min-width: 1390px) {
                #container {
                   width: var(--inject-page-width);
                }
                #container > .content {
                   width: 100%;
                }
                .nav_wrap, .p_thread, .pb_content, .core_title_wrap_bright, .l_post_bright, .core_reply_wrapper, .l_post_bright .core_reply_wrapper, .pb_footer {
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
                   left: calc(50% + (var(--inject-page-width) / 2) + 12px);
                   right: auto;
                   margin-left: 0;
                }
              }
              @media screen and (min-width: 1500px) {
                :root {
                   --inject-page-width: 1250px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })

    // 贴吧吧页
    handlers.set('tiebaForum', function() {
        const store = createStore('tieba')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 80vw;
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
                   background: none;
                }
                #content_wrap {
                   width: calc(100% - 248px);
                   border-right: 1px solid #eee;
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

              @media screen and (min-width: 1500px) {
                :root {
                   --inject-page-width: 1250px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===贴吧===end */

    /* ===segmentfault===start */
    handlers.set('segmentfault', function() {
        const store = createStore('segmentfault')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 82vw;
              }
              /* 专栏/问答 */
              @media (min-width: 1390px) {
                .container, .container-lg, .container-md, .container-sm, .container-xl {
                   max-width: var(--inject-page-width);
                }
              }

              @media screen and (min-width: 1650px) {
                :root {
                  --inject-page-width: 1350px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===segmentfault===end */

    /* ===bilibili===start */
    handlers.set('bilibili', function() {
        const store = createStore('bilibili')
        function execute() {
            // 页面整体往左
            const offsetLeft = '-5vw'
            GM_addStyle(`
              /* 专栏 */
              :root {
                --inject-page-width: 50vw;
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
                .article-holder img.loaded {
                   width: auto !important;
                   height: auto !important;
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

              @media screen and (min-width: 1830px) {
                :root {
                   --inject-page-width: 915px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===bilibili===end */

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
                if (store.is_open) {
                    execute()
                    GM_getValue('notify_enabled', true) && Toast('已宽屏处理')
                }
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