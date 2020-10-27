import { createApp, getCurrentInstance, toRefs, reactive, computed } from 'vue'
import { useGMvalue } from '@/composition/use-gm-value'
import './styles.scss'

/* eslint-disable camelcase */

export function createUI({
  store,
  runByBDUSS,
  runByWeb,
}) {
  const app = createApp({
    render() {
      const {
        loading,
        isComplete,
        isForumsHide,
        isCover,
        isReverse,
        counter,
        likeForums,
        diaplayForums,
        run,
        setComplete,
        setForumsHide,
        setCover,
        onSimulateChange,
        onReverseChange,
      } = this

      return (
        <div id="inject-sign" class={{ 'forums-hide': isForumsHide, cover: isCover }}>
          <div class="control">
            <button
              disabled={loading}
              onClick={run}
            >
              一键签到
            </button>
            <div class="label-wrap">
              <label title="模拟APP签到可以获得与APP相同的经验，比网页签到经验更多，也提供更多功能，但需要BDUSS，重新登录后需要再次输入，请网上搜索获得方法，不勾选则通过网页签到，此时不需要BDUSS">
                <input
                  checked={this.isSimulate}
                  type="checkbox"
                  onChange={onSimulateChange}
                />
                模拟APP
              </label>
              <label title="下次进入贴吧时自动签到，建议同时勾选模拟APP">
                <input
                  checked={isComplete}
                  type="checkbox"
                  onChange={event => setComplete(event.target.checked)}
                />
                自动签到
              </label>
              {
                likeForums.length > 0 && (
                  <>
                    <label title="列表将缩到底部">
                      <input
                        checked={this.isForumsHide}
                        type="checkbox"
                        onChange={event => setForumsHide(event.target.checked)}
                      />
                      隐藏列表
                    </label>
                    <label title="覆盖在页面上显示">
                      <input
                        checked={this.isCover}
                        type="checkbox"
                        onChange={event => setCover(event.target.checked)}
                      />
                      防止遮挡
                    </label>
                  </>
                )
              }
            </div>
          </div>

          {
            likeForums.length > 0 && <div class="forums-container">
              <button class="reverse-btn" onClick={onReverseChange}>
                {isReverse ? '已倒序' : '普通'}
                <span title="已签/总数">
                  {counter.sign}/{counter.total}
                </span>
              </button>
              <ul>
                {
                  diaplayForums.map(item => (
                    <li key={item.forum_id}>
                      <span title={item.level_name}>
                        {item.user_level}级{item.is_sign ? ' √' : ''}{item.sign_bonus_point ? ('+' + item.sign_bonus_point) : ''}
                      </span>
                      <a
                        href={'/f?kw=' + item.forum_name}
                        title={item.forum_name}
                        target="_blank"
                      >
                        {item.forum_name}
                      </a>
                      <span title={'距离升级' + (item.levelup_score - item.user_exp)}>
                        {item.user_exp}/{item.levelup_score}
                      </span>
                    </li>
                  ))
                }
              </ul>
            </div>
          }
        </div>
      )
    },
    setup() {
      const internalInstance = getCurrentInstance()
      const state = reactive({
        loading: false,
        isSimulate: false,
        isReverse: store.is_reverse || false,
        likeForums: [],
      })
      const { value: isComplete, setValue: setComplete } = useGMvalue('is_complete', false)
      const { value: isForumsHide, setValue: setForumsHide } = useGMvalue('is_forums_hide', false)
      const { value: isCover, setValue: setCover } = useGMvalue('is_cover', false)
      const diaplayForums = computed(() => {
        return state.isReverse ? Object.freeze([...state.likeForums].reverse()) : state.likeForums
      })
      const counter = computed(() => {
        return {
          total: state.likeForums.length,
          sign: state.likeForums.filter(({ is_sign }) => is_sign).length,
        }
      })

      // 勾选模拟APP并且确认有BDUSS 才算开启
      if (store.is_simulate && store.BDUSS) {
        state.isSimulate = true
      }
      if (isComplete.value) {
        run()
      }

      function run() {
        state.loading = true
        ;(state.isSimulate ? runByBDUSS : runByWeb)(internalInstance.ctx).finally(() => {
          state.loading = false
        })
      }
      function setLikeForums(forums) {
        state.likeForums = [...forums]
      }
      function updateLikeForum(fid, forum) {
        const index = state.likeForums.findIndex(item => +fid === +item.forum_id)
        if (index === -1) return
        const target = {
          ...state.likeForums[index],
          ...forum,
        }
        if (forum.sign_bonus_point) {
          target.user_exp = Number(target.user_exp) + Number(forum.sign_bonus_point)
        }
        state.likeForums.splice(index, 1, target)
      }
      // 未签到的靠前
      function checkUnsign() {
        state.likeForums.sort((a, b) => {
          if (!a.is_sign && b.is_sign) return -1
          return 0
        })
      }
      function onSimulateChange({ target: { checked } }) {
        store.is_simulate = checked
        if (!checked) return

        const { BDUSS } = store
        const result = window.prompt('请输入F12->Application->Cookies中的BDUSS', BDUSS || undefined)
        if (result) {
          store.BDUSS = result
          location.reload()
        } else {
          state.isSimulate = false
          store.is_simulate = false
        }
      }
      function onReverseChange() {
        state.isReverse = !state.isReverse
        store.is_reverse = state.isReverse
      }

      return {
        ...toRefs(state),
        isComplete,
        isForumsHide,
        isCover,
        diaplayForums,
        counter,
        run,
        setLikeForums,
        updateLikeForum,
        checkUnsign,
        setComplete,
        setForumsHide,
        setCover,
        onSimulateChange,
        onReverseChange,
      }
    },
  })
  const rootContainer = document.createElement('div')
  const ui = app.mount(rootContainer)
  document.body.appendChild(rootContainer)

  return {
    setLikeForums: ui.setLikeForums,
    updateLikeForum: ui.updateLikeForum,
    checkUnsign: ui.checkUnsign,
  }
}
