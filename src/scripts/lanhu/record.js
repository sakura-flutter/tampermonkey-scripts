import { reactive, computed, Transition, TransitionGroup } from 'vue'
import * as qs from '@/utils/querystring'
import { mountComponent } from '@/utils/mount-component'
import { useGMvalue } from '@/composables/use-gm-value'
import { Button } from '@/components'
import './record.scss'

const Icon = <svg t="1602929080634" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4117" width="10" height="10"><path d="M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z" p-id="4118"></path></svg>

/* 记录看过的产品 */
function createRecorder() {
  createUI()

  /* 记录函数 */
  function record() {
    const { pid } = qs.parse()
    if (!pid) return

    const records = GM_getValue('records', [])
    let oldTitle = null
    records.find((item, index) => {
      if (item.pid === pid) {
        oldTitle = item.title
        records.splice(index, 1)
        return true
      }
      return false
    })
    // 优化标题显示：当前是无意义标题且有旧标题时优先使用旧标题
    const title = (['蓝湖', '...'].includes(document.title) && oldTitle) ? oldTitle : document.title
    records.push({
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
        records: useGMvalue('records', []),
        unhidden: useGMvalue('unhidden', false),
        passwords: useGMvalue('passwords', {}),
      })
      const reversed = computed(() => [...state.records].reverse())

      function deleteItem(item) {
        const ectype = [...state.records]
        const index = ectype.findIndex(record => record.pid === item.pid)
        ectype.splice(index, 1)
        state.records = ectype
      }
      function copy(action, item) {
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
      function setRecordsVisible(visible) {
        state.recordsVisible = visible
      }
      function setMoreActionsVisible(visible) {
        state.moreActionsVisible = visible
      }

      return () => (
        <article
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
                class={{ 'more-actions': state.moreActionsVisible }}
                tag="ul"
                name="inject-slide-hor-fade"
                appear
              >
                {reversed.value.map(item => (
                  <li class={{ 'has-pwd': !!state.passwords[item.pid] }} key={item.pid}>
                    <a
                      href={item.href}
                      title={item.title}
                      target="_blank">
                      {item.title}
                    </a>
                    <div class="actions" onMouseenter={() => { setMoreActionsVisible(true) }}>
                      <Button title="移除" round onClick={() => { deleteItem(item) }}>×</Button>
                      <Button
                        v-show={state.moreActionsVisible}
                        title="左击复制链接和密码；右击复制密码"
                        round
                        onClick={() => { copy('all', item) }}
                        onContextmenu={event => {
                          event.preventDefault()
                          copy('pwd', item)
                        }}
                      >
                        {Icon}
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

export {
  createRecorder,
}
