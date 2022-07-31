import { onMounted, nextTick, ref, reactive, computed, watch, Transition, TransitionGroup } from 'vue'
import * as qs from '@/utils/querystring'
import { mountComponent } from '@/utils/mount-component'
import { useGMvalue } from '@/composables/use-gm-value'
import store from '@/store'
import Button from '@/components/button'
import type { RecordType, PasswordType } from './types'
import './record.scss'

/* 记录看过的产品 */
function createRecorder() {
  GM_registerMenuCommand('显示/隐藏 最近项目', function() {
    const next = !(store.recorder_visible ?? true)
    !next && Toast('已隐藏', 1000)
    store.recorder_visible = next
  })

  createUI()

  function record() {
    const { pid } = qs.parse()
    if (!pid) return

    const records = GM_getValue<RecordType[]>('records', [])
    let old: RecordType | undefined
    records.find((item, index) => {
      if (item.pid === pid) {
        old = item
        records.splice(index, 1)
        return true
      }
      return false
    })
    // 优化标题显示：当前是无意义标题且有旧标题时优先使用旧标题
    const title = (['蓝湖', '...'].includes(document.title) && old?.title) ? old.title : document.title
    records.push({
      ...old,
      pid,
      title,
      href: location.href,
    })
    GM_setValue('records', records)
  }

  return {
    record,
  }
}

function createUI() {
  mountComponent({
    setup() {
      const state = reactive({
        recordsVisible: false,
        moreActionsVisible: false,
        // 初始宽度
        width: 160,
        records: useGMvalue<RecordType[]>('records', [], { deep: true }),
        unhidden: useGMvalue('unhidden', false),
        passwords: useGMvalue<PasswordType>('passwords', {}),
      })
      const recorderVisible = useGMvalue('recorder_visible', true)
      const lisRef = ref<HTMLElement[]>([])
      const reversed = computed(() => [...state.records].reverse())

      onMounted(() => {
        watch(
          [
            () => state.recordsVisible,
            () => state.moreActionsVisible,
            () => state.records,
            () => state.unhidden,
            recorderVisible,
          ],
          () => {
            nextTick(() => {
              const [first] = lisRef.value
              if (first) {
                const width = [...first.children].reduce((totalWidth, el) => totalWidth + el.getBoundingClientRect().width, 0)
                state.width = 5 + width // 左边距
              }
            })
          }, { immediate: true, flush: 'post' })
      })

      function deleteItem(item: RecordType) {
        const index = state.records.findIndex(record => record.pid === item.pid)
        index > -1 && state.records.splice(index, 1)
      }

      function copy(action: 'all' | 'pwd', item: RecordType) {
        let copyString = ''
        const password = state.passwords[item.pid]
        if (action === 'all') {
          copyString += `${item.title}`
          password && (copyString += ` (密码：${password})`)
          copyString += `\n${item.href}`
        } else if (action === 'pwd') {
          if (password) {
            copyString += password
          } else {
            Toast.warning('没有密码！')
          }
        }

        if (!copyString) return
        GM_setClipboard(copyString, 'text')
        Toast.success('复制成功')
      }

      function editCustomTitle(item: RecordType) {
        // 取消时不操作
        let result = window.prompt('输入自定义标题，不填则会使用原标题', item.customTitle || item.title || undefined)
        result &&= result.trim()
        if (result === '') {
          delete item.customTitle
        } else if (result) {
          item.customTitle = result
        }
      }

      function setRecordsVisible(visible: boolean) {
        state.recordsVisible = visible
      }
      function setMoreActionsVisible(visible: boolean) {
        state.moreActionsVisible = visible
      }

      return () => (
        <article
          v-show={recorderVisible.value}
          id="inject-recorder-ui"
          onMouseenter={() => { setRecordsVisible(true) }}
          onMouseleave={() => {
            setRecordsVisible(false)
            setMoreActionsVisible(false)
          }}
        >
          <Transition name="inject-slide-fade">
            {/* vue2不需要这层节点，目前不清楚为什么vue3需要 */}
            <div v-show={reversed.value.length && (state.unhidden || state.recordsVisible)}>
              <TransitionGroup
                tag="ul"
                name="inject-slide-hor-fade"
                appear
              >
                {reversed.value.map((item, index) => (
                  <li
                    class={{ 'has-pwd': !!state.passwords[item.pid] }}
                    style={{ width: `${state.width}px` }}
                    key={item.pid}
                    ref={(el) => { el && (lisRef.value[index] = (el as HTMLElement)) }}
                  >
                    <a
                      href={item.href}
                      title={item.customTitle || item.title}
                      target="_blank"
                    >
                      {item.customTitle || item.title}
                    </a>
                    <div class="actions" onMouseenter={() => { setMoreActionsVisible(true) }}>
                      <Button title="移除" round onClick={() => { deleteItem(item) }}>×</Button>
                      <Button
                        v-show={state.moreActionsVisible}
                        title="左击复制链接和密码；右击复制密码"
                        round
                        onClick={() => { copy('all', item) }}
                        onContextmenu={(event: Event) => {
                          event.preventDefault()
                          copy('pwd', item)
                        }}
                      >
                        {IconCopy}
                      </Button>
                      <Button
                        v-show={state.moreActionsVisible}
                        title="添加自定义标题"
                        round
                        onClick={() => { editCustomTitle(item) }}
                      >
                        {IconEdit}
                      </Button>
                    </div>
                  </li>
                ))}
              </TransitionGroup>
            </div>
          </Transition>
          <div class="control">
            <Button class="view-btn" type="primary" shadow>打开最近项目</Button>
            <input
              v-model={state.unhidden}
              type="checkbox"
              title="固定显示"
            />
          </div>
        </article>
      )
    },
  })
}

const IconCopy = <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4117" width="10" height="10"><path d="M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z" p-id="4118"></path></svg>

const IconEdit = <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3701" width="10" height="10"><path d="M989.29 161.53L861.47 33.71a90.1 90.1 0 0 0-127.28 0l-69.53 69.53a89.24 89.24 0 0 0-4.29 4.64 29.14 29.14 0 0 0-2.85 2.5L16.83 751.06c-0.35 0.35-0.69 0.71-1 1.07l-0.45 0.52-0.51 0.59-0.54 0.69c-0.12 0.15-0.24 0.3-0.35 0.46s-0.37 0.52-0.56 0.78l-0.28 0.41-0.53 0.81c-0.08 0.14-0.17 0.28-0.26 0.42s-0.31 0.54-0.46 0.82l-0.27 0.47-0.4 0.77-0.27 0.55c-0.11 0.24-0.22 0.48-0.32 0.72s-0.19 0.43-0.28 0.65-0.17 0.43-0.26 0.64l-0.28 0.75c-0.07 0.19-0.13 0.38-0.19 0.57s-0.19 0.56-0.27 0.84l-0.15 0.5c-0.08 0.31-0.17 0.61-0.24 0.92s-0.08 0.32-0.11 0.47q-0.12 0.48-0.21 1l-0.09 0.48c-0.06 0.32-0.11 0.64-0.16 1s0 0.37-0.07 0.55-0.08 0.59-0.11 0.9 0 0.49 0 0.74l-0.06 0.72V987a30 30 0 0 0 30 30h209.77a29.87 29.87 0 0 0 19.06-6.84 30.13 30.13 0 0 0 5-4l604-604 36.69-36.69a30.35 30.35 0 0 0 2.5-2.85 89.24 89.24 0 0 0 4.64-4.29l69.53-69.53a90.1 90.1 0 0 0-0.05-127.27zM236.25 957H68.05V784.7l574-574L812.29 381z m710.62-710.62l-69.53 69.53a30.19 30.19 0 0 1-42.43 0L707.09 188.09a30.19 30.19 0 0 1 0-42.43l69.53-69.53a30 30 0 0 1 42.42 0L946.87 204a30 30 0 0 1 0 42.38z" p-id="3702"></path></svg>

export {
  createRecorder,
}
