// ==UserScript==
// @name         论坛文章页宽屏
// @version      1.10.1
// @description  适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、segmentfault、哔哩哔哩、微博、豆瓣电影
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts/commits/master/aggregation/widescreen.js
// @license      GPL-3.0
// @compatible   chrome >= 80
// @compatible   firefox >= 75
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
// @match        https://movie.douban.com/subject/*
// @grant        unsafeWindow
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
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
        console.warn(...args)
    }

    // 主函数
    function main() {
        GM_registerMenuCommand('宽屏通知', function() {
            const nextStatus = !GM_getValue('notify_enabled', true)
            Toast.success(nextStatus ? '已开启通知' : '已关闭通知')
            GM_setValue('notify_enabled', nextStatus)
        })
        GM_registerMenuCommand('控制按钮', function() {
            const nextStatus = !GM_getValue('ui_visible', true)
            Toast.success(nextStatus ? '已显示按钮' : '已隐藏按钮')
            GM_setValue('ui_visible', nextStatus)
        })

        // 将之前is_open重新命名成enabled
        GM_listValues().forEach(key => {
            if (key.endsWith('_is_open')) {
                const modulename = key.split('_is_open')[0]
                GM_setValue(`${modulename}_enabled`, GM_getValue(key))
                GM_deleteValue(key)
            }
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
            ['zhihuHome', /www.zhihu.com/.test(url) && /^\/(follow|hot)?$/.test(pathname)],
            ['zhihuTopic', /www.zhihu.com\/topic\//.test(url)],
            ['juejin', /juejin.im\/post\//.test(url)],
            ['jianshu', /jianshu.com\/p\//.test(url)],
            ['baidu', /www.baidu.com\/s?/.test(url)],
            ['tieba', /tieba.baidu.com\/p\//.test(url)],
            ['tiebaForum', /tieba.baidu.com\/f/.test(url)],
            ['sogou', /www.sogou.com\/web?/.test(url)],
            ['segmentfault', /segmentfault.com/.test(url)],
            ['bilibili', /bilibili.com\/read\/cv/.test(url)],
            ['bilibiliDynamic', /t.bilibili.com/.test(url) && pathname === '/'],
            ['weibo', /weibo.com/.test(url)],
            ['doubanmovie', /movie.douban.com/.test(url)],
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
            unsafeWindow.document.addEventListener('readystatechange', () => {
                if ('It should not be enabled' || document.readyState !== 'interactive') return
                const { multi } = unsafeWindow.__ssr_data.detail.post_data
                const imgEls = $$('.container .album .img-wrap-inner img')
                if (multi.length !== imgEls.length) return
                imgEls.forEach((img, index) => {
                    img.src = multi[index].original_path
                })
            })

            GM_addStyle(`
              :root {
                --inject-page-width: 75vw;
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

              @media screen and (min-width: 1920px) {
                :root {
                   --inject-page-width: 1440px;
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
            window.addEventListener('DOMContentLoaded', () => {
                const process = new WeakSet()
                const observer = new MutationObserver(mutationsList => {
                    mutationsList.forEach(mutation => {
                        const { target, oldValue } = mutation
                        if (
                            process.has(target) ||
                            target.tagName !== 'IMG' ||
                            !oldValue.startsWith('data:image/') ||
                            // 与知乎同样的选择器判断
                            !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))
                        ) return
                        process.add(target)
                        // 替换原图
                        target.dataset.original && (target.src = target.dataset.original)
                    })
                })
                observer.observe($('.Post-RichTextContainer'), { subtree: true, attributeFilter: ['src'], attributeOldValue: true })
            })

            const defaultWidth = '690px'
            GM_addStyle(`
              :root {
                --inject-page-width: 75vw;
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
            window.addEventListener('DOMContentLoaded', () => {
                const process = new WeakSet()
                const observer = new MutationObserver(mutationsList => {
                    mutationsList.forEach(mutation => {
                        const { target, oldValue } = mutation
                        if (
                            process.has(target) ||
                            target.tagName !== 'IMG' ||
                            !oldValue.startsWith('data:image/') ||
                            // 不对非文章图片处理
                            !$('.ListShortcut').contains(target) ||
                            // 与知乎同样的选择器判断
                            !(target.classList.contains('lazy') && !target.classList.contains('data-thumbnail'))
                        ) return
                        process.add(target)
                        // 替换原图
                        target.dataset.original && (target.src = target.dataset.original)
                    })
                })
                // 查看全部回答时知乎会替换Question-mainColumn标签，只能往更父级监听
                observer.observe($('.QuestionPage'), { subtree: true, attributeFilter: ['src'], attributeOldValue: true })
            })

            const defaultWidth = '694px'
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

              @media screen and (min-width: 1750px) {
                :root {
                   --inject-page-width: 1300px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })

    // 首页
    handlers.set('zhihuHome', function() {
        const store = createStore('zhihu')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 91vw;
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

              @media screen and (min-width: 1490px) {
                :root {
                   --inject-page-width: 1360px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })

    // 话题
    handlers.set('zhihuTopic', function() {
        const store = createStore('zhihu')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 91vw;
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

              @media screen and (min-width: 1420px) {
                :root {
                   --inject-page-width: 1295px;
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
            const styleSheet = GM_addStyle(`
              :root {
                --inject-page-width: 75vw;
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
                if (document.head.contains(styleSheet)) return
                document.head.appendChild(styleSheet)
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
        const postlistSelector = '#j_p_postlist'

        function execute() {
            const replaceOriSrc = (function() {
                const process = new WeakSet()

                return function () {
                    const BDEImgEls = $$(`${postlistSelector} .BDE_Image`)
                    BDEImgEls.forEach(img => {
                        if (process.has(img)) return
                        process.add(img)
                        // 贴吧自身根据
                        // /^http:\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/ 判断是否相册，
                        // 后续chrome更改必须为https访问时可能需要更改这里的逻辑
                        if (/^http(s?):\/\/[^\/\?]*?\.baidu\.com[:8082]*\/(\w+)\/([^\/\?]+)\/([^\/\?]+)\/(\w+?)\.(?:webp|jpg|jpeg)/.test(img.src)) {
                            const protocol = img.src.match(/^(https?:\/\/)/)[0]
                            img.src = `${protocol}tiebapic.baidu.com/forum/pic/item/${img.src.split('/').slice(-1)[0]}`
                            // 不能直接用css：贴吧根据宽高判断,用css宽高auto时若图片未加载宽高获取到0 导致无法查看大图
                            img.style.cssText += 'max-width: 100%; width: auto !important; height: auto; max-height: 130vh;'
                        }

                    })
                }
            })()

            unsafeWindow.document.addEventListener('readystatechange', () => {
                if (document.readyState !== 'interactive') return
                // 替换原图
                replaceOriSrc()
                const observer = new MutationObserver(mutationsList => {
                    mutationsList.forEach(mutation => {
                        const { target } = mutation
                        if (target.id !== postlistSelector.slice(1)) return
                        replaceOriSrc()
                    })
                })
                observer.observe($('.left_section'), { childList: true, subtree: true })
            })

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
                .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-down, .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-up, .l_post_bright .d_post_content_main .core_reply_wrapper .user-hide-post-action {
                   right: 180px !important;
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

    /* ===搜狗搜索===start */
    handlers.set('sogou', function() {
        const store = createStore('sogou')
        function execute() {
            const defaultWidth = '550px'
            const horCenter = 'margin-left: auto; margin-right: auto; padding-left: 0; width: var(--inject-page-width) !important;'
            GM_addStyle(`
              :root {
                --inject-page-width: 80vw;
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

              @media screen and (min-width: 1670px) {
                :root {
                   --inject-page-width: 1340px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===搜狗搜索===end */

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
    // 专栏
    handlers.set('bilibili', function() {
        const store = createStore('bilibili')
        function execute() {
            // 页面整体往左
            const offsetLeft = '-5vw'
            GM_addStyle(`
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

    // 动态
    handlers.set('bilibiliDynamic', function() {
        const store = createStore('bilibili')
        function execute() {
            GM_addStyle(`
              :root {
                --inject-page-width: 85vw;
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

              @media screen and (min-width: 1710px) {
                :root {
                   --inject-page-width: 1454px;
                }
              }
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===bilibili===end */

    /* ===微博===start */
    handlers.set('weibo', function() {
        const store = createStore('weibo')
        const uiControl = createWidescreenControl({ store, visible: false, silent: true })
        let proxyConfig;
        execute()

        function execute() {
            unsafeWindow.document.addEventListener('readystatechange', () => {
                if (!unsafeWindow.$CONFIG) return
                if (proxyConfig && proxyConfig === unsafeWindow.$CONFIG) return

                const handler = {
                    set(target, property, value) {
                        const oldVal = target[property]
                        target[property] = value
                        if (property === 'location' && value !== oldVal) {
                            log('script：reinsert styleSheet')
                            addStyle()
                        }
                        return true
                    },
                }
                proxyConfig = new Proxy(unsafeWindow.$CONFIG, handler)
                unsafeWindow.$CONFIG = proxyConfig

                addStyle()
            });
        }

        const addStyle = (function () {
            let styleSheet;

            return function () {
                const { $CONFIG } = unsafeWindow
                const classnamePrefix = 'inject-ws-'
                const getClassname = classname => `${classnamePrefix}${classname}`

                styleSheet && styleSheet.remove()
                ;[...document.body.classList.values()].forEach(item => {
                    if (item.startsWith(classnamePrefix)) {
                        document.body.classList.remove(item)
                    }
                })

                const pages = {
                    // 首页(含特别关注)、我的收藏、我的赞、好友圈
                    mainpage: {
                        test: /^v6.*_content_home$/.test($CONFIG.location) || /v6_(fav|likes_outbox|content_friends)/.test($CONFIG.location),
                        use: doMainPage,
                    },
                    // 用户资料页、相册、管理中心、粉丝
                    profilepage: {
                        test:/^page_.*_(home|photos|manage|myfollow)$/.test($CONFIG.location),
                        use: doProfilePage,
                    },
                    // 微博详情
                    singleweibo: {
                        test: /^page_.*_single_weibo$/.test($CONFIG.location),
                        use: doSingleWBPage,
                    },
                }
                const target = Object.entries(pages).find(([, { test }]) => test)
                log(target, $CONFIG.location)
                if (!target) return
                uiControl.show()
                if (!store.enabled) return

                styleSheet = target[1].use(getClassname(target[0]))
                document.body.classList.add(getClassname(target[0]))
                uiControl.notify()
            }

        })()

        function doMainPage(classname) {
            return GM_addStyle(`
                :root {
                  --inject-page-width: 75vw;
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

                @media screen and (min-width: 1770px) {
                  :root {
                     --inject-page-width: 1330px;
                  }
                }
                `.replace(/\|\>/g, `.${classname}`))
        }

        function doProfilePage(classname) {
            return GM_addStyle(`
                :root {
                  --inject-page-width: 75vw;
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
                  }
                  |> .WB_frame_c {
                     margin-right: 0;
                     width: calc(100% - 320px);
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

                @media screen and (min-width: 1770px) {
                  :root {
                     --inject-page-width: 1330px;
                  }
                }
                `.replace(/\|\>/g, `.${classname}`))
        }

        function doSingleWBPage(classname) {
            return GM_addStyle(`
                :root {
                  --inject-page-width: 75vw;
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

                @media screen and (min-width: 1770px) {
                  :root {
                     --inject-page-width: 1330px;
                  }
                }
                `.replace(/\|\>/g, `.${classname}`))
        }

    })
    /* ===微博===end */

    /* ===豆瓣电影===start */
    handlers.set('doubanmovie', function() {
        const store = createStore('doubanmovie')
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
            `)
        }

        createWidescreenControl({ store, execute })
    })
    /* ===豆瓣电影===end */

    // 存储
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
                    // 默认开启
                    if (value == null && property === 'enabled') {
                        value = true
                    }
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
        cursor: pointer;
        background: #3385ff;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        transition: opacity .3s;
      }
      .inject-widescreen-js:hover {
        opacity: 1;
      }
    `)

    // 宽屏开关 options: store<store>, execute要执行的函数，visible是否可见(后续用show hide控制)，silent是否显示通知
    function createWidescreenControl(options) {
        const { store, execute = () => {}, visible = true, silent = false } = options
        const buttonComponent = new Vue({
            template: `
              <button
                class="inject-widescreen-js"
                v-show="uiVisible && visible"
                title="注意：页面会被刷新"
                @click="toggle"
              >
               {{ enabled ? '已开启' : '关闭' }}
              </button>
            `,
            data() {
                return {
                    // 总开关
                    uiVisible: GM_getValue('ui_visible', true),
                    visible,
                    enabled: store.enabled,
                }
            },
            created() {
                GM_addValueChangeListener('ui_visible', (name, oldVal, newVal) => {
                    this.uiVisible = newVal
                })

                if (store.enabled) {
                    execute()
                    !silent && this.notify()
                }
            },
            methods: {
                // export-api
                show() {
                    this.visible = true
                },
                hide() {
                    this.visible = false
                },
                notify() {
                    GM_getValue('notify_enabled', true) && Toast('已宽屏处理')
                },
                // private-api
                toggle() {
                    store.enabled = !this.enabled
                    location.reload()
                }
            },
        }).$mount()
        function appendToBody() {
            document.body.appendChild(buttonComponent.$el)
        }
        document.body ? appendToBody() : window.addEventListener('DOMContentLoaded', appendToBody)

        return {
            show: buttonComponent.show,
            hide: buttonComponent.hide,
            notify: buttonComponent.notify,
        }
    }

    main()

})();