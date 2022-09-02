import { reactive } from 'vue'
import { useGMvalue } from '@/composables/use-gm-value'
import store from '../store'
import { mountComponent } from '@/utils/mount-component'
import { error as logError } from '@/utils/log'
import { mergeLikeForum } from '../api'
import { Adapter, type SignMode } from '../sign'
import { getElementsInPage } from '../utils'
import Checkbox from '@/components/checkbox'
import Button from '@/components/button'
import ForumList from './ForumList'
import type { LikeForumData } from '../types'
import './index.scss'

const sizeTick = (function * () {
  const sizes = ['small', 'normal', 'large'] as const
  let currSize = store.size ?? 'small'
  let index = sizes.findIndex(v => v === currSize)
  while (true) {
    (index >= sizes.length) && (index = 0)
    currSize = sizes[index++]
    store.size = currSize
    yield currSize
  }
})()

export function createUI() {
  mountComponent({
    setup() {
      const state = reactive({
        loading: false,
        size: sizeTick.next().value,
        likeForums: [] as LikeForumData[],
      })
      const isSimulate = useGMvalue('is_simulate', false)
      const isForumsHide = useGMvalue('is_forums_hide', false)
      const isComplete = useGMvalue('is_complete', false)
      const isCover = useGMvalue('is_cover', false)
      const toastTime = useGMvalue<number | undefined>('toast_time', undefined)
      let setSign: (key: string) => void

      function run(toastVisible = true) {
        if (state.loading) {
          Toast('签到中')
          return
        }

        const { unsigns, signs, setSign: _setSign } = getElementsInPage()
        setSign = _setSign

        if (unsigns.length === 0) {
          const now = new Date()
          // 避免每次都提示
          if (toastVisible || toastTime.value === undefined || new Date(toastTime.value).getDate() < now.getDate()) {
            Toast.success('所有吧已签到')
          }
          toastTime.value = +now
          return
        }

        let mode: SignMode
        if (isSimulate.value) {
          if (!store.BDUSS) {
            Toast.error('请先输入 BDUSS 或 BDUSS_BFESS')
            return
          }
          // 签了 20 个以上视为用过批量签到
          if (signs.length >= 20) {
            mode = 'app'
          } else {
            mode = 'fast'
          }
        } else {
          mode = 'web'
        }

        state.loading = true
        const toast = Toast('开始签到，请等待', 0)
        new Adapter({
          unsigns,
          BDUSS: store.BDUSS,
          onSuccess({ fid, kw, data }) {
            const key = fid || kw
            if (key) setSign(key)
            if (fid && data) updateLikeForum(fid, data)
          },
        })
          .sign(mode)
          .then(async () => {
            if (store.BDUSS) await fetchForums()
            // 以页面为准，因为有时签到失败但实际上是成功的
            const failList = getElementsInPage().unsigns
            const length = failList.length
            if (length > 0) {
              Toast.warning(`签到成功，失败${length}个：${failList.map(v => v.kw).join('、')}`, 0)
            } else {
              Toast.success('签到成功')
            }
          })
          .finally(() => {
            toast.close()
            state.loading = false
          })
      }

      function updateLikeForum(fid: LikeForumData['forum_id'] | string, forum: Partial<LikeForumData>) {
        const found = state.likeForums.find(item => +fid === +item.forum_id)
        if (!found) return
        if (forum.sign_bonus_point) {
          found.user_exp = String(Number(found.user_exp) + Number(forum.sign_bonus_point))
        }
        Object.assign(found, forum)
      }

      // 未签到的靠前
      function sort() {
        state.likeForums.sort((a, b) => {
          if (!a.is_sign && b.is_sign) return -1
          return 0
        })
      }

      function fetchForums() {
        return mergeLikeForum().then(forums => {
          state.likeForums = forums
          sort()
          forums.forEach(forum => {
            // 签到可能失败，以这里为准
            if (forum.is_sign === 1) {
              setSign?.(forum.forum_name)
            }
          })
        }).catch(error => {
          // 爆炸了也没什么需要处理的，这里就不抛了
          logError.force(error)
          Toast.error('获取贴吧列表失败。。请刷新重试~', 0)
        })
      }

      function onSimulateChange(checked: boolean) {
        if (checked === false) {
          isSimulate.value = checked
          return
        }

        const { BDUSS } = store
        const result = window.prompt('请输入 F12 -> 应用(Application) -> Cookies 中的【BDUSS 或 BDUSS_BFESS】', BDUSS || undefined)
        if (result) {
          store.BDUSS = result
          isSimulate.value = true
          location.reload()
        } else {
          isSimulate.value = false
        }
      }

      (async () => {
        // 获取列表后再自动签到
        if (store.BDUSS) {
          await fetchForums()
        }
        if (isComplete.value) {
          run(false)
        }
      })()

      return () => (
        <div
          id="inject-sign"
          class={{
            'forums-hide': isForumsHide.value,
            cover: isCover.value,
            [state.size]: true,
          }}
        >
          <div class="control">
            <Button
              disabled={state.loading}
              type="primary"
              shadow
              onClick={() => run()}
            >
              一键签到
            </Button>
            <div class="settings">
              <Checkbox
                checked={isSimulate.value}
                title="模拟APP签到可以获得与APP相同的经验，比网页签到经验更多，也提供更多功能，但需要BDUSS，重新登录后需要再次输入，请网上搜索获得方法，不勾选则通过网页签到，此时不需要BDUSS"
                onUpdate:checked={onSimulateChange}
              >
                模拟APP
              </Checkbox>
              <Checkbox v-model:checked={isComplete.value} title="下次进入贴吧时自动签到，建议同时勾选模拟APP">
                自动签到
              </Checkbox>
              {
                state.likeForums.length > 0 && (
                  <>
                    <Checkbox v-model:checked={isForumsHide.value} title="列表将缩到底部">
                      隐藏列表
                    </Checkbox>
                    <Checkbox v-model:checked={isCover.value} title="覆盖在页面上显示">
                      防止遮挡
                    </Checkbox>
                  </>
                )
              }
            </div>
          </div>

          <ForumList
            dataSource={state.likeForums}
            size={state.size}
            onClickSize={() => {
              state.size = sizeTick.next().value
            }}
          />
        </div>
      )
    },
  })
}
