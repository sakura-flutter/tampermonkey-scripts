import { reactive } from 'vue'
import { useGMvalue } from '@/composables/use-gm-value'
import store from '../store'
import { mountComponent } from '@/utils/mount-component'
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

      function run() {
        if (state.loading) {
          Toast('签到中')
          return
        }
        if (getElementsInPage().unsigns.length === 0) {
          Toast.success('所有贴吧已经签到')
          return
        }

        let mode: SignMode
        if (isSimulate.value) {
          if (!store.BDUSS) {
            Toast.error('请先输入 BDUSS 或 BDUSS_BFESS')
            return
          }
          mode = 'app'
        } else {
          mode = 'web'
        }

        state.loading = true
        const toast = Toast('开始签到，请等待', 0)
        new Adapter({
          BDUSS: store.BDUSS,
          onSuccess({ element, fid, data }) {
            // 替换成已签到样式
            element.classList.replace('unsign', 'sign')
            if (fid && data) {
              updateLikeForum(fid, data)
            }
          },
        })
          .sign(mode)
          .then(failCount => {
            failCount
              ? Toast.warning(`签到成功，失败${failCount}个`, 0)
              : Toast.success('签到成功')
            sort()
          })
          .finally(() => {
            toast.close()
            state.loading = false
          })
      }

      function updateLikeForum(fid: LikeForumData['forum_id'] | string, forum: Partial<LikeForumData>) {
        const index = state.likeForums.findIndex(item => +fid === +item.forum_id)
        if (index === -1) return
        const target = {
          ...state.likeForums[index],
          ...forum,
        }
        if (forum.sign_bonus_point) {
          target.user_exp = String(Number(target.user_exp) + Number(forum.sign_bonus_point))
        }
        state.likeForums.splice(index, 1, target)
      }

      // 未签到的靠前
      function sort() {
        state.likeForums.sort((a, b) => {
          if (!a.is_sign && b.is_sign) return -1
          return 0
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

      if (store.BDUSS) {
        mergeLikeForum().then(forums => {
          state.likeForums = forums
          sort()
        }).catch(error => {
          console.error(error)
          Toast.error('获取贴吧列表失败。。请刷新重试~', 0)
        })
      }

      // 自动签到
      if (isComplete.value) {
        run()
      }

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
              onClick={run}
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
