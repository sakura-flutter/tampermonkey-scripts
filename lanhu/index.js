// ==UserScript==
// @name         蓝湖 lanhu
// @version      1.4.0
// @description  自动填充填写过的产品密码(不是蓝湖账户)；查看打开过的项目；查看产品页面窗口改变后帮助侧边栏更新高度
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter/tampermonkey-scripts/commits/master/lanhu/index.js
// @license      GPL-3.0
// @compatible   chrome >= 80
// @compatible   firefox >= 75
// @noframes
// @match        https://lanhuapp.com/web/
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @grant        GM_addStyle
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=846237
// ==/UserScript==

/* global Vue Toast */

(function() {
    'use strict';
    const $ = document.querySelector.bind(document)

    const marks = new WeakSet()
    const app = $('.whole').__vue__

    createRecordedUI()
    app.$watch('$route', function(to, from) {
        // 无法知道页面是否渲染完毕，延时处理
        setTimeout(autofillPassword, 500)
        record()
    }, { immediate: true })

    /* 填充密码 */
    function autofillPassword() {
        if (!location.hash.startsWith('#/item/project/door')) return
        const queryString = location.hash.includes('?') ? location.hash.split('?')[1] : ''
        if (!queryString) return
        const pid = new URLSearchParams(queryString).get('pid')
        // 确认登录按钮   密码框
        const [confirmEl, passwordEl] = [
            $('#project-door .mu-raised-button-wrapper'),
            $('#project-door .pass input'),
        ]
        if (!pid || !confirmEl || !passwordEl) return

        const pidPassword = GM_getValue('passwords', {})[pid]
        if (pidPassword) {
            passwordEl.value = pidPassword
            Toast('密码已填写')
            confirmEl.click()
        }

        // 标记已添加事件的元素
        if (marks.has(confirmEl)) return
        marks.add(confirmEl)

        // 点击后保存密码
        confirmEl.addEventListener('mousedown', savePassword)
        // 回车键保存密码
        passwordEl.addEventListener('keydown', event => {
            if (event.keyCode !== 13) return
            savePassword()
        })

        function savePassword() {
            const savedPassword = GM_getValue('passwords', {})
            const password = passwordEl.value
            GM_setValue('passwords', {
                ...savedPassword,
                [pid]: password,
            })
        }
    }

    /* 更新侧边栏高度 */
    window.addEventListener('resize', throttle(function() {
        if (!location.hash.startsWith('#/item/project/product')) return
        const barEl = $('.flexible-bar')
        const modalEl = $('.flexible-modal')
        if (!barEl || !modalEl) return
        barEl.dispatchEvent(new MouseEvent('mousedown'))
        modalEl.dispatchEvent(new MouseEvent('mouseup'))
    }, 150))

    /* 记录看过的产品 */
    function record() {
        const queryString = location.hash.includes('?') ? location.hash.split('?')[1] : ''
        if (!queryString) return
        const hash = location.hash.split('?')[0]
        const pid = new URLSearchParams(queryString).get('pid')
        if (!pid) return

        const records = GM_getValue('records', [])
        let oldTitle = null
        records.find((item, index) => {
            if(item.pid === pid) {
                oldTitle = item.title
                records.splice(index, 1)
                return true
            }
        })
        // 优化标题显示：当前是无意义标题且有旧标题时优先使用旧标题
        const title = (['蓝湖', '...'].includes(document.title) && oldTitle) ? oldTitle : document.title
        records.push({
            pid,
            hash,
            queryString,
            title,
        })
        GM_setValue('records', records)
    }

    function createRecordedUI() {
        const PATH = 'https://lanhuapp.com/web/'

        const ui = new Vue({
            template: `
              <article id="inject-recorded-ui" @mouseenter="toggle(true)" @mouseleave="toggle(false)">
                <transition name="inject-slide-fade">
                  <transition-group v-show="reversed.length && (unhidden || recordsVisible)" tag="ul" name="inject-slide-hor-fade">
                    <li v-for="item in reversed" :key="item.pid">
                      <a :href="getHref(item)" :title="item.title" target="_blank">
                        <span>{{item.title}}</span>
                        <button title="移除" @click.prevent="deleteItem(item)">×</button>
                      </a>
                    </li>
                  </transition-group>
                </transition>
                <div style="text-align: center; padding-top: 8px;">
                  <button class="view-btn">打开最近项目</button>
                  <input style="margin-left: 6px;vertical-align:text-top;" v-model="unhidden" type="checkbox" title="固定显示" @change="unhiddenChange" />
                </div>
              </article>
            `,
            data() {
                return {
                    records: GM_getValue('records', []),
                    recordsVisible: false,
                    unhidden: GM_getValue('unhidden', false),
                }
            },
            computed: {
                reversed() {
                    return [...this.records].reverse()
                },
            },
            created() {
                GM_addValueChangeListener('records', (name, oldVal, newVal) => {
                    this.records = Object.freeze(newVal)
                })
                GM_addValueChangeListener('unhidden', (name, oldVal, newVal) => {
                    this.unhidden = newVal
                })
            },
            methods: {
                getHref(item) {
                    return PATH + item.hash + '?' + item.queryString
                },
                deleteItem(item) {
                    const newRecords = [...this.records]
                    newRecords.find((record, index) => {
                        if(record.pid === item.pid) {
                            newRecords.splice(index, 1)
                            return true
                        }
                    })
                    GM_setValue('records', newRecords)
                },
                toggle(visible) {
                    this.recordsVisible = visible
                },
                unhiddenChange() {
                    GM_setValue('unhidden', this.unhidden)
                },
            },
        }).$mount()
        document.body.appendChild(ui.$el)

        // 添加样式
        GM_addStyle(`
          |> {
             position: fixed;
             right: 3vw;
             bottom: 8vh;
             z-index: 1000;
             width: 220px;
             padding: 20px 20px 10px;
             transition: opacity .1s;
             opacity: .5;
          }
          |>:hover {
             opacity: 1;
          }
          |> ul::-webkit-scrollbar {
             width: 8px;
             height: 8px;
             background: #f2f2f2;
             padding-right: 2px;
          }
          |> ul::-webkit-scrollbar-thumb {
             border-radius: 3px;
             border: 0;
             background: #b4bbc5;
          }
          |> ul {
             padding: 5px;
             max-height: 40vh;
             overflow-x: hidden;
             background: rgb(251, 251, 251);
             box-shadow: 0 1px 6px rgba(0,0,0,.15);
          }
          |> li {
             transition: all .3s;
          }
          |> a {
             display: flex;
             align-items: center;
             line-height: 30px;
             padding: 0 5px;
             transition: background 0.1s ease-out;
          }
          |> a:hover {
             background: rgba(220, 237, 251, 0.64);
          }
          |> a span {
             flex: 1;
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
          }
          |> li button {
             width: 20px;
             line-height: 20px;
             border: none;
             border-radius: 50%;
             color: #ababab;
             box-shadow: 0 1px 1px rgba(0,0,0,.15);
             cursor: pointer;
          }
          |> .view-btn {
             padding: 4px 12px;
             color: #fff;
             background:#3385ff;
             box-shadow:0 1px 6px rgba(0,0,0,.2);
             border: none;
             border-radius: 2px;
          }

          /* 动画1 */
          |> .inject-slide-fade-enter-active, |> .inject-slide-fade-leave-active {
             transition: all .1s;
          }
          |> .inject-slide-fade-enter, |> .inject-slide-fade-leave-to {
             transform: translateY(5px);
             opacity: 0;
          }
          /* 动画2 group */
          |> .inject-slide-hor-fade-move {
             transition: all .8s;
          }
          |> .inject-slide-hor-fade-enter, |> .inject-slide-hor-fade-leave-to {
             opacity: 0;
             transform: translateX(30px);
          }
          |> .inject-slide-hor-fade-active {
             position: absolute;
          }
        `.replace(/\|\>/g, '#inject-recorded-ui'))
    }

    function throttle(fn, delay) {
        var t = null,
            begin = new Date().getTime();

        return function (...args) {
            var _self = this,
                cur = new Date().getTime();

            clearTimeout(t);

            if (cur - begin >= delay) {
                fn.apply(_self, args);
                begin = cur;
            } else {
                t = setTimeout(function () {
                    fn.apply(_self, args);
                }, delay);
            }
        }
    }
})();