import { createApp, nextTick, toRefs, reactive, computed } from 'vue'
import { useGMvalue } from '@/composition/use-gm-value'
import { Input, Button } from '@/components'
import './ui.scss'

/* eslint-disable camelcase */

export function createUI({
  store,
  runByBDUSS,
  runByWeb,
}) {
  // 兼容性：名称字段更换 middle -> normal
  if (store.size === 'middle') {
    store.size = 'normal'
  }

  const sizeTick = (function * () {
    const sizes = ['small', 'normal', 'large']
    let currSize = store.size ?? 'small'
    let index = sizes.findIndex(v => v === currSize)
    while (true) {
      (index >= sizes.length) && (index = 0)
      currSize = sizes[index++]
      store.size = currSize
      yield currSize
    }
  })()

  const app = createApp({
    setup() {
      const state = reactive({
        loading: false,
        size: sizeTick.next().value,
        isSimulate: false,
        isReverse: store.is_reverse || false,
        likeForums: [],
      })
      const { value: keyword, setValue: setKeyword } = useGMvalue('keyword', '')
      const { value: isComplete, setValue: setComplete } = useGMvalue('is_complete', false)
      const { value: isForumsHide, setValue: setForumsHide } = useGMvalue('is_forums_hide', false)
      const { value: isCover, setValue: setCover } = useGMvalue('is_cover', false)
      const diaplayForums = computed(() => {
        let ectype = [...state.likeForums]
        state.isReverse && ectype.reverse()
        if (keyword.value) {
          // 忽略大小写
          ectype = ectype.filter(forum => (forum.forum_name.toUpperCase()).includes(keyword.value.toUpperCase()))
        }
        return ectype
      })
      const counter = computed(() => ({
        total: state.likeForums.length,
        sign: state.likeForums.filter(({ is_sign }) => is_sign).length,
      }))

      // 勾选模拟APP并且确认有BDUSS 才算开启
      if (store.is_simulate && store.BDUSS) {
        state.isSimulate = true
      }
      // 自动签到
      if (isComplete.value) {
        run()
      }

      function run() {
        state.loading = true
        // TODO: 应该有更好的实现方法
        const exportApi = {
          updateLikeForum,
          checkUnsign,
        }
        ;(state.isSimulate ? runByBDUSS : runByWeb)(exportApi).finally(() => {
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
      function changeReverse() {
        state.isReverse = !state.isReverse
        store.is_reverse = state.isReverse
      }
      function changeSize() {
        state.size = sizeTick.next().value
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
          nextTick(() => {
            state.isSimulate = false
            store.is_simulate = false
          })
        }
      }

      return {
        ...toRefs(state),
        keyword,
        isComplete,
        isForumsHide,
        isCover,
        diaplayForums,
        counter,
        run,
        setLikeForums,
        updateLikeForum,
        checkUnsign,
        setKeyword,
        setComplete,
        setForumsHide,
        setCover,
        changeReverse,
        changeSize,
        onSimulateChange,
      }
    },
    render() {
      const {
        loading,
        size,
        keyword,
        isComplete,
        isForumsHide,
        isCover,
        isReverse,
        counter,
        likeForums,
        diaplayForums,
        run,
        setKeyword,
        setComplete,
        setForumsHide,
        setCover,
        changeReverse,
        changeSize,
        onSimulateChange,
      } = this
      function expTitle(item) {
        const MAX_EXP_DAILY = 8
        const needed = item.levelup_score - item.user_exp
        return `距离升级还需要${needed}经验，若每天+${MAX_EXP_DAILY}，还需要${Math.ceil(needed / MAX_EXP_DAILY)}天`
      }

      return (
        <div id="inject-sign" class={{ 'forums-hide': isForumsHide, cover: isCover, [size]: true }}>
          <div class="control">
            <Button
              disabled={loading}
              type="primary"
              shadow
              onClick={run}
            >
              一键签到
            </Button>
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
              <header class="top-btns">
                <Button class="reverse-btn" size="mini" onClick={changeReverse}>
                  {isReverse ? '已倒序' : '普通'}
                  <span title="已签/总数">
                    {counter.sign}/{counter.total}
                  </span>
                </Button>
                <Button class="resize-btn" size="mini" onClick={changeSize}>
                  大小
                </Button>
              </header>
              <ul class={{ [size]: true }}>
                {
                  diaplayForums.map(item => (
                    <li key={item.forum_id}>
                      <a
                        href={'/f?kw=' + item.forum_name}
                        title={item.forum_name}
                        target="_blank"
                      >
                        {item.forum_name}
                      </a>
                      <span class="signed">{item.is_sign ? ' √' : ''}</span>
                      <span class="level" title={item.level_name}>
                        {item.user_level}级
                      </span>
                      <span class="gain">{item.sign_bonus_point ? ('+' + item.sign_bonus_point) : ''}</span>
                      <span class="exp" title={expTitle(item)}>
                        {item.user_exp}/{item.levelup_score}
                      </span>
                    </li>
                  ))
                }
              </ul>
              {
                likeForums.length > 25 && <Input
                  value={keyword}
                  placeholder="搜索"
                  size="small"
                  scale
                  onInput={event => setKeyword(event.target.value)}
                />
              }
            </div>
          }
        </div>
      )
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
