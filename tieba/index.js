// ==UserScript==
// @name         百度贴吧签到
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @description  网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~
// @author       sakura-flutter
// @license      GPL-3.0
// @compatible   chrome >= 80
// @compatible   firefox >= 75
// @run-at       document-end
// @match        https://tieba.baidu.com/index.html
// @match        https://tieba.baidu.com
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @connect      tieba.baidu.com
// @require      https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js
// @require      https://cdn.jsdelivr.net/npm/md5/dist/md5.min.js
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=847261
// ==/UserScript==

/* global Vue MD5 Toast */

(function() {
    'use strict'
    // true|false 开启后会打开日志
    const isDebug = false

    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    function log(...args) {
        if (!isDebug) return
        console.log(...args)
    }

    function main() {
        const store = createStore()
        const jQuery = unsafeWindow.jQuery
        const $moreforumEl = jQuery('#moreforum')
        // 模拟的app版本
        const fakeVersion = '11.8.8.0'
        // 未登录时删除已有的BDUSS
        if (!$moreforumEl.length) {
            delete store.BDUSS
            delete store.tiebaMain_BDUSS
            delete store.is_complete
            return
        }

        let ui = null
        if (store.BDUSS) {
            getLikeForums().then(likeForums => {
                ui = createUI()
                ui.setLikeForums(likeForums)
                ui.checkUnsign()
            }).catch(e => {
                ui = createUI()
                Toast.error('获取贴吧列表失败。。请刷新重试~')
            })
        } else {
            ui = createUI()
        }

        function createUI() {
            const ui = new Vue({
                template: `
                  <div>
                    <div style="position:fixed; z-index:500; top:80px; right:150px;">
                      <button
                         style="padding:10px; font-size:14px; color:#fff; background:#3385ff; box-shadow:0 1px 6px rgba(0,0,0,.2);"
                         :disabled="loading"
                         @click="run"
                      >
                        一键签到
                      </button>
                      <p style="margin-top:10px; text-align:center;" title="模拟APP签到可以获得与APP相同的经验，比网页签到经验更多，也提供更多功能，但需要BDUSS，重新登录后需要再次输入，请网上搜索获得方法，不勾选则通过网页签到，此时不需要BDUSS">
                        <input style="vertical-align:text-top;" v-model="isSimulate" type="checkbox" @change="simulateChange" /> 模拟APP
                      </p>
                      <p style="text-align:center;" title="下次进入贴吧时自动签到，建议同时勾选模拟APP">
                        <input style="vertical-align:text-top;" v-model="isComplete" type="checkbox" /> 自动签到
                      </p>
                    </div>
                    <div style="position:fixed; z-index:2; top:200px; right:10px; width:19vw; min-width:280px; box-shadow:0 1px 6px rgba(0,0,0,.2); background:#fafafa; padding:5px;" v-if="likeForums.length">
                       <button style="display:block; text-align:center; width:100%;" @click="reverseChange">{{isReverse ? '已倒序' : '普通'}}  <span title="已签/总数">{{counter.sign}}/{{counter.total}}</span></button>
                       <ul style="max-height:65vh; overflow-x:hidden;">
                         <li style="display:flex; border-bottom:1px solid rgba(221, 221, 221, .5);" v-for="item in diaplayForums" :key="item.forum_id">
                           <span style="width:56px;" :title="item.level_name">{{item.user_level}}级{{item.is_sign ? ' √' : ''}}{{item.sign_bonus_point ? ('+' + item.sign_bonus_point) : ''}}</span>
                           <a style="flex:1; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;" :href="'/f?kw=' + item.forum_name" :title="item.forum_name" target="_blank">{{item.forum_name}}</a>
                           <span style="width:80px" :title="'距离升级' + (item.levelup_score - item.user_exp)">{{item.user_exp}}/{{item.levelup_score}}</span>
                         </li>
                       </ul>
                     </div>
                  </div>
                `,
                data() {
                    return {
                        loading: false,
                        isSimulate: false,
                        isReverse: store.is_reverse || false,
                        likeForums: [],
                    }
                },
                computed: {
                    isComplete: {
                        get(){
                            return store.is_complete || false
                        },
                        set(val) {
                            store.is_complete = val
                        },
                    },
                    diaplayForums() {
                        const { isReverse, likeForums } = this
                        return isReverse ? Object.freeze([...likeForums].reverse()) : likeForums
                    },
                    counter() {
                        const { likeForums } = this
                        return {
                            total: likeForums.length,
                            sign: likeForums.filter(({ is_sign }) => is_sign).length,
                        }
                    },
                },
                created() {
                    if (store.is_simulate && store.BDUSS) {
                        this.isSimulate = true
                    }
                    if (this.isComplete) {
                        this.run()
                    }
                },
                methods:{
                    run() {
                        this.loading = true
                        ;(this.isSimulate ? runByBDUSS : runByWeb)(this).finally(() => {
                            this.loading = false
                        })
                    },
                    simulateChange({ target: { checked } }) {
                        store.is_simulate = checked
                        if (!checked) return

                        const { BDUSS } = store
                        const result = window.prompt("请输入F12->Application->Cookies中的BDUSS", BDUSS ? BDUSS : undefined)
                        if (result) {
                            store.BDUSS = result
                            location.reload()
                        } else {
                            this.$nextTick(() => {
                                this.isSimulate = false
                                store.is_simulate = false
                            })
                        }
                    },
                    reverseChange() {
                        this.isReverse = !this.isReverse
                        store.is_reverse = this.isReverse
                    },
                    setLikeForums(forums) {
                        this.likeForums = Object.freeze([...forums])
                    },
                    updateLikeForum(fid, forum) {
                        const { likeForums } = this
                        const index = likeForums.findIndex(item => +fid === +item.forum_id)
                        if (index === -1) return
                        const target = {
                            ...likeForums[index],
                            ...forum,
                            is_sign: true,
                        }
                        if (forum.sign_bonus_point) {
                            target.user_exp = Number(target.user_exp) + Number(forum.sign_bonus_point)
                        }
                        const ectype = [...likeForums]
                        ectype.splice(index, 1, target)
                        this.likeForums = Object.freeze(ectype)
                    },
                    // 未签到的靠前
                    checkUnsign() {
                        const ectype = [...this.likeForums]
                        ectype.sort((a, b) => {
                            if (!a.is_sign && b.is_sign) return -1
                            return 0
                        })
                        this.likeForums = Object.freeze(ectype)
                    },
                },
            }).$mount()
            document.body.appendChild(ui.$el)
            return ui
        }

        // 模拟APP参数
        function makeFakeParams(obj) {
            return Object.assign({
                // 以下可选参数 为了模拟更加真实
                _client_type: 4, // 不要更改
                _client_version: fakeVersion,
                _phone_imei: '0'.repeat(15),
                model: 'HUAWEI P40', // HUAWEI加油 ヾ(◍°∇°◍)ﾉﾞ
                net_type: 1,
                stErrorNums: 1,
                stMethod: 1,
                stMode: 1,
                stSize: 320,
                stTime: 117,
                stTimesNum: 1,
                timestamp: Date.now(),
            }, obj)
        }

        // 贴吧参数签名函数 isFake true时会加入模拟APP参数
        function signature(payload, isFake = true) {
            if (isFake) {
                payload = makeFakeParams(payload)
            }
            // 提交内容所有name-value按照name的字典序升序排列
            const sortKeys = Object.keys(payload).sort()
            // 所有内容按照key=value拼接
            let str = sortKeys.reduce((acc, key) => (acc += `${key}=${payload[key]}`), '')
            // 拼接后补充
            str += 'tiebaclient!!!'
            // 最后以UTF-8编码进行MD5
            return MD5(str)
        }

        // 界面上无法获得失效的贴吧，这里调用接口获取所有关注的贴吧
        async function getLikeForums() {
            const { BDUSS } = store
            const tbs = unsafeWindow.PageData && unsafeWindow.PageData.tbs
            const req2 = makeFakeParams({
                BDUSS,
                tbs,
            })
            const [ like1, like2Map ] = await Promise.all([
                request.post('/mo/q/newmoindex').then(response => response.json()).then(data => data.data.like_forum),
                GMRequest.post('http://c.tieba.baidu.com/c/f/forum/like', utils.URL.stringify({
                    ...req2,
                    sign: signature(req2),
                }), {
                    headers: {
                        'User-agent': `bdtb for Android ${fakeVersion}`,
                        'Accept': '',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept-Encoding': 'gzip',
                        'Cookie': 'ka=open',
                    }
                }).then(data => data.forum_list).then(forum_list => forum_list.reduce((acc, val) => (acc[val.id] = val, acc), {})),
            ])

            // 融合数据
            like1.forEach(forum => {
                const { forum_id } = forum
                const like2Forum = like2Map[forum_id]
                if (!like2Forum) return
                Object.assign(forum, {
                    levelup_score: like2Forum.levelup_score,
                    level_name: like2Forum.level_name,
                    slogan: like2Forum.slogan,
                })
            })
            // 经验降序
            like1.sort((a, b) => b.user_exp - a.user_exp)
            return like1
        }

        // 通过BDUSS签到 获得经验与客户端签到相同
        async function runByBDUSS(ui) {
            // 贴吧必须先触发才能获取剩下贴吧
            $moreforumEl.trigger(new MouseEvent('mouseenter'))
            // 侧边元素
            const likeUnsignEls = $$('#likeforumwraper .unsign')
            // 查看更多元素
            const alwayUnsignEls = $$('#alwayforum-wraper .unsign')
            // 关闭面板
            $moreforumEl.trigger(new Event('click'))
            const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]
            // 需要重新签到元素（失败时尝试重签）
            const resignEls = []
            if (!allUnsignEls.length) {
                Toast.success('所有贴吧已经签到')
                return
            }
            const toast = Toast.info({
                content: '开始签到，请等待',
                duration: 0,
            })

            // 签到
            function doSign(data) {
                const { BDUSS } = store
                const { tbs, fid, kw } = data
                const params = makeFakeParams({
                    // 以下4个参数 + 下面sign参数 是必选的
                    BDUSS,
                    tbs,
                    fid,
                    kw,
                })

                return GMRequest.post('http://c.tieba.baidu.com/c/c/forum/sign', utils.URL.stringify({
                    ...params,
                    sign: signature(params),
                }), {
                    headers: {
                        'User-agent': `bdtb for Android ${fakeVersion}`,
                        'Accept': '',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept-Encoding': 'gzip',
                        'Cookie': 'ka=open',
                    }
                })
            }

            const tbs = unsafeWindow.PageData && unsafeWindow.PageData.tbs
            const queue = new Queue({
                tasks: allUnsignEls.map(current => {
                    return async function () {
                        const { kw } = utils.URL.parse(current.href)
                        const { fid } = current.dataset
                        try {
                            const response = await doSign({ tbs, kw, fid })
                            const { error_code, error, user_info } = response
                            // 贴吧成功码为0 还会出现code为0但error的情况
                            if (error_code !== '0' || error) throw response
                            ui.updateLikeForum(fid, user_info)
                            // 替换已签到样式
                            current.classList.replace('unsign', 'sign')
                        } catch (e) {
                            console.error(e)
                            // 重签
                            resignEls.push(current)
                        }
                        // 客户端签到可以将延时缩短，随机延时一下 50ms以上
                        const ms = parseInt(Math.random() * 20 + 50)
                        await utils.sleep(ms)
                    }
                })
            })
            await queue.run()

            let failCount = 0

            // 重签
            while(resignEls.length) {
                const current = resignEls.shift()
                const { kw } = utils.URL.parse(current.href)
                const { fid } = current.dataset
                try {
                    const response = await doSign({ tbs, kw, fid })
                    const { error_code, error, user_info } = response
                    if (error_code !== '0' || error) throw response
                    ui.updateLikeForum(fid, user_info)
                    current.classList.replace('unsign', 'sign')
                } catch (e) {
                    console.error(e)
                    failCount++
                    Toast.error(`${decodeURIComponent(kw)} 签到失败`)
                }
                await utils.sleep(500)
            }

            toast.close()
            failCount
                ? Toast.warning({
                content: `签到成功，失败${failCount}个`,
                duration: 0,
            })
            : Toast.success('签到成功')
            ui.checkUnsign()
        }


        // 网页签到 经验没客户端那么多 但不需要获得BDUSS只需贴吧已登录即可
        async function runByWeb() {
            // 贴吧必须先触发才能获取剩下贴吧
            $moreforumEl.trigger(new MouseEvent('mouseenter'))
            // 侧边元素
            const likeUnsignEls = $$('#likeforumwraper .unsign')
            // 查看更多元素
            const alwayUnsignEls = $$('#alwayforum-wraper .unsign')
            // 关闭面板
            $moreforumEl.trigger(new Event('click'))
            const allUnsignEls = [...likeUnsignEls, ...alwayUnsignEls]
            // 需要重新签到元素（失败时尝试重签）
            const resignEls = []
            if (!allUnsignEls.length) {
                Toast.success('所有贴吧已经签到')
                return
            }
            const toast = Toast.info({
                content: '开始签到，请等待',
                duration: 0,
            })
            // 签到
            function doSign(data) {
                return request.post('/sign/add', {
                    ie: 'utf-8',
                    ...data,
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    }
                }).then(response => response.json())
            }
            while(allUnsignEls.length) {
                const current = allUnsignEls.shift()
                const { kw } = utils.URL.parse(current.href)
                try {
                    const response = await doSign({ kw })
                    const { no } = response
                    // 贴吧成功码为0
                    if (no !== 0) throw response
                    // 替换已签到样式
                    current.classList.replace('unsign', 'sign')
                } catch (e) {
                    console.error(e)
                    // 重签
                    resignEls.push(current)
                }
                // 网页签到不能太短，否则很容易出现验证码(ಥ﹏ಥ) 验证码2150040
                const ms = parseInt(Math.random() * 500 + 500)
                await utils.sleep(ms)
            }

            let failCount = 0
            // 重签
            while(resignEls.length) {
                const current = resignEls.shift()
                const { kw } = utils.URL.parse(current.href)
                try {
                    const response = await doSign({ kw })
                    const { no } = response
                    if (no !== 0) throw response
                    current.classList.replace('unsign', 'sign')
                } catch (e) {
                    console.error(e)
                    failCount++
                    Toast.error(`${decodeURIComponent(kw)} 签到失败`)
                }
                await utils.sleep(500)
            }

            toast.close()
            failCount
                ? Toast.warning({
                content: `签到成功，失败${failCount}个`,
                duration: 0,
            })
            : Toast.success('签到成功')
        }
    }

    // GM请求
    function GMRequest(url, options) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                ...options,
                url,
                onload(res) {
                    try {
                        resolve(JSON.parse(res.response))
                    } catch (e) {
                        resolve(res.response)
                    }
                },
                onerror: reject,
            });
        })
    }
    GMRequest.post = function(url, data, options) {
        return GMRequest(url, {
            ...options,
            data,
            method: 'POST',
        })
    }

    // 请求
    function request(url, options) {
        return fetch(url, {
            ...options,
        })
    }
    request.post = function(url, data, options = {}) {
        options.headers = Object.assign({}, options.headers)
        if (data) {
            let body = data
            if (options.headers['Content-Type'].includes('application/x-www-form-urlencoded') && Object.prototype.toString.call(data) === '[object Object]') {
                body = utils.URL.stringify(data)
            }
            if (options.headers['Content-Type'].includes('application/json') && Object.prototype.toString.call(data) === '[object Object]') {
                body = JSON.stringify(data)
            }
            options.body = body
        }

        return request(url, {
            ...options,
            method: 'POST',
        })
    }

    // 存储
    function createStore() {
        const target = {}
        const handler = {
            get(target, property) {
                let value = target[property]
                if (value == null) {
                    value = GM_getValue(property)
                    target[property] = value
                }
                // 兼容之前版本tiebaMain_BDUSS字段
                if (property === 'BDUSS' && value == null) {
                    value = GM_getValue('tiebaMain_BDUSS')
                    if (value) {
                        store[property] = value
                    }
                }
                return value
            },
            set(target, property, value) {
                target[property] = value
                GM_setValue(property, value)
                return true
            },
            deleteProperty(target, property) {
                const deleted = delete target[property]
                GM_deleteValue(property)
                return deleted
            },
        }
        const store = new Proxy(target, handler)
        return store
    }

    // 工具
    const utils = {
        // url解析
        URL: {
            parse() {},
            stringify() {},
        },
        // 转formdata
        toFormData() {},
        // 延时
        async sleep() {},
    }

    utils.URL.parse = function(string) {
        const url = new URL(string)
        const searchParams = new URLSearchParams(url.search)
        return [...searchParams.entries()].reduce((acc, [key, value]) => (acc[key] = value, acc), {})
    }
    utils.URL.stringify = function(obj) {
        return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join('&')
    }
    utils.toFormData = function(params = {}) {
        const formData = new FormData()
        for (const [key, value] of Object.entries(params)) {
            formData.append(key, value)
        }
        return formData
    }
    utils.sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    class Queue {
        // 默认同时进行5个任务，大于5个签到失败的概率好像大点了！
        constructor({ tasks, limit = 5 }) {
            this._tasks = [...tasks]
            this._limit = limit
            // 当前执行数
            this._count = 0
            // 任务数
            this._tasksCount = tasks.length
            // 已完成数
            this._finishedCount = 0
        }
        run() {
            return new Promise(resolve => {
                if (this._tasksCount === 0) {
                    resolve()
                    return
                }

                const { _tasks } = this
                const _run = function () {
                    const idle = Math.min(_tasks.length, this._limit - this._count)
                    for (let i = 0; i < idle; i++) {
                        this._count++
                        const task = _tasks.shift()
                        task().finally(() => {
                            this._count--
                            this._finishedCount++
                            if(this._finishedCount < this._tasksCount) {
                                _run()
                            } else {
                                resolve()
                            }
                        })
                    }
                }.bind(this)

                _run()
            })
        }
    }

    main()

})();