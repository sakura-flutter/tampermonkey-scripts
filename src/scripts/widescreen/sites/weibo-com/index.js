import { once } from '@/utils'
import { $ } from '@/utils/selector'
import { warn } from '@/utils/log'
const homeStyles = require('./home.string.scss').default.toString()
const playDetailStyles = require('./play-detail.string.scss').default.toString()

export const weibo = ({ store, createControl }) => ({
  handler() {
    const uiControl = createControl({ store, visible: false, silent: true })
    execute()

    function execute() {
      let proxyConfig
      document.addEventListener('readystatechange', () => {
        // 是否启用新版微博
        if ($('#app') && $('#app').__vue__) {
          WbNewVersion()
          return
        }
        if (!unsafeWindow.$CONFIG) return
        if (proxyConfig && proxyConfig === unsafeWindow.$CONFIG) return

        const handler = {
          set(target, property, value) {
            const oldVal = target[property]
            target[property] = value
            if (property === 'location' && value !== oldVal) {
              warn('script：reinsert styleSheet')
              addStyle()
            }
            return true
          },
        }
        proxyConfig = new Proxy(unsafeWindow.$CONFIG, handler)
        unsafeWindow.$CONFIG = proxyConfig

        addStyle()
      })
    }

    /* 新版========start */
    const WbNewVersion = once(() => {
      const uiControl = createControl({ store, visible: false, silent: true })
      const app = $('#app').__vue__
      let styleSheet
      warn('新版本', app)
      const pageStyleMap = new Map([
        // 首页、首页左侧分组、博主主页、博主主页(名称)、自定义主页、微博详情、at我的、评论、赞、我的关注、粉丝、收藏、赞、热门内容、相关用户、实时微博、[我关注的、视频、图片、话题]、热门微博、热门榜单、话题榜、热搜榜
        [['home', 'mygroups', 'profile', 'nameProfile', 'customProfile', 'bidDetail', 'atWeibo', 'cmtInbox', 'likeInbox', 'follow', 'collect', 'like', 'sweiboDefault', 'suserDefault', 'sweibo', 'weibo', 'list', 'topic', 'search'], () => GM_addStyle(homeStyles)],
        // 视频详情
        [['Playdetail'], () => GM_addStyle(playDetailStyles)],
      ])

      const notify = once(() => {
        uiControl.notify()
      })
      app.$watch('$route', (to, from) => {
        styleSheet?.remove()
        warn('route changed', to)
        uiControl.hide()
        for (const [routenames, fn] of pageStyleMap.entries()) {
          if (routenames.includes(to.name)) {
            uiControl.show()
            if (store.enabled) {
              styleSheet = fn()
              notify()
            }
            break
          }
        }
      }, { immediate: true })
    })
    /* 新版========end */

    /* 旧版(保留，不再更新) */
    const addStyle = (function() {
      let styleSheet

      return function() {
        const { $CONFIG } = unsafeWindow
        const classnamePrefix = 'inject-ws-'
        const getClassname = classname => `${classnamePrefix}${classname}`

        styleSheet?.remove()
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
          // 用户资料页、相册、管理中心、粉丝、服务、财经专家、热门话题
          profilepage: {
            test: /^page_.*_(home|photos|manage|myfollow|service|expert|topic)$/.test($CONFIG.location),
            use: doProfilePage,
          },
          // 微博详情
          singleweibo: {
            test: /^page_.*_single_weibo$/.test($CONFIG.location),
            use: doSingleWBPage,
          },
        }
        const target = Object.entries(pages).find(([, { test }]) => test)
        warn(target, $CONFIG.location)
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
      `.replace(/\|>/g, `.${classname}`))
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
      `.replace(/\|>/g, `.${classname}`))
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
      `.replace(/\|>/g, `.${classname}`))
    }
  },
})
