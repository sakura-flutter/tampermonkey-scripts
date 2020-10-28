import { parseURL, throttle } from '@/utils'
import { useGMvalue } from '@/composition/use-gm-value'

const $ = document.querySelector.bind(document)
const marks = new WeakSet()

function main() {
  updateStorage()
  fixBarHeight()

  const app = $('.whole').__vue__
  if (!app) {
    console.warn('蓝湖脚本：获取vue失败')
    return
  }
  const recorder = createRecorder()

  app.$watch('$route', function(to, from) {
    autofillPassword()
    // 蓝湖title是动态获取的，可能有延时，延时处理
    setTimeout(recorder.record, 500)
  }, { immediate: true })
}

/* 填充密码 */
function autofillPassword() {
  // 停止上次观察
  autofillPassword.observer?.disconnect()
  if (!location.hash.startsWith('#/item/project/door')) return
  const { pid } = parseURL()
  if (!pid) return
  // 确认登录按钮
  let confirmEl = null
  // 密码框
  let passwordEl = null

  function savePassword() {
    const savedPassword = GM_getValue('passwords', {})
    const password = passwordEl.value
    GM_setValue('passwords', {
      ...savedPassword,
      [pid]: password,
    })
  }

  const observer = autofillPassword.observer = new MutationObserver((mutationsList, observer) => {
    let filled = false
    // eslint-disable-next-line no-unused-vars
    for (const _ of mutationsList) {
      const [hasConfirmEl, hasPasswordEl] = [
        $('#project-door .mu-raised-button-wrapper'),
        $('#project-door .pass input'),
      ]
      if (!hasConfirmEl || !hasPasswordEl) continue

      observer.disconnect()
      confirmEl = hasConfirmEl
      passwordEl = hasPasswordEl

      const pidPassword = GM_getValue('passwords', {})[pid]
      // 确保本次内只进行一次操作
      if (filled === false && pidPassword) {
        filled = true
        passwordEl.value = pidPassword
        Toast('密码已填写')
        confirmEl.click()
      }

      // 标记已添加事件的元素
      if (marks.has(confirmEl)) break
      marks.add(confirmEl)

      // 点击后保存密码
      confirmEl.addEventListener('mousedown', savePassword)
      // 回车键保存密码
      passwordEl.addEventListener('keydown', event => {
        if (event.keyCode !== 13) return
        savePassword()
      })
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

/* 更新侧边栏高度 */
function fixBarHeight() {
  window.addEventListener('resize', throttle(function() {
    if (!location.hash.startsWith('#/item/project/product')) return
    const barEl = $('.flexible-bar')
    const modalEl = $('.flexible-modal')
    if (!barEl || !modalEl) return
    barEl.dispatchEvent(new MouseEvent('mousedown'))
    modalEl.dispatchEvent(new MouseEvent('mouseup'))
  }, 150))
}

/* 记录看过的产品 */
function createRecorder() {
  // eslint-disable-next-line no-unused-vars
  const { Transition, TransitionGroup } = Vue

  const app = Vue.createApp({
    render() {
      const {
        reversed,
        recordsVisible,
        unhidden,
        moreActionsVisible,
        toggle,
        toggleMoreActions,
        deleteItem,
        copy,
        onUnhiddenChange,
      } = this

      return (
        <article
          id="inject-recorder-ui"
          onMouseenter={() => { toggle(true) }}
          onMouseleave={() => {
            toggle(false)
            toggleMoreActions(false)
          }}
        >
          <Transition name="inject-slide-fade">
            {/* vue2不需要这层节点，目前不清楚为什么vue3需要 */}
            <div v-show={reversed.length && (unhidden || recordsVisible)}>
              <TransitionGroup
                class={{ 'more-actions': moreActionsVisible }}
                tag="ul"
                name="inject-slide-hor-fade"
                appear
              >
                {
                  reversed.map(item => (
                    <li key={item.pid}>
                      <a
                        href={item.href}
                        title={item.title}
                        target="_blank">
                        {item.title}
                      </a>
                      <div class="actions" onMouseenter={() => { toggleMoreActions(true) }}>
                        <button title="移除" onClick={() => { deleteItem(item) }}>×</button>
                        <button
                          v-show={moreActionsVisible}
                          title="左击复制链接和密码；右击复制密码"
                          onClick={() => { copy('all', item) }}
                          onContextmenu={event => {
                            event.preventDefault()
                            copy('pwd', item)
                          }}
                        >
                          <svg t="1602929080634" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4117" width="10" height="10"><path d="M877.714286 0H265.142857c-5.028571 0-9.142857 4.114286-9.142857 9.142857v64c0 5.028571 4.114286 9.142857 9.142857 9.142857h566.857143v786.285715c0 5.028571 4.114286 9.142857 9.142857 9.142857h64c5.028571 0 9.142857-4.114286 9.142857-9.142857V36.571429c0-20.228571-16.342857-36.571429-36.571428-36.571429zM731.428571 146.285714H146.285714c-20.228571 0-36.571429 16.342857-36.571428 36.571429v606.514286c0 9.714286 3.885714 18.971429 10.742857 25.828571l198.057143 198.057143c2.514286 2.514286 5.371429 4.571429 8.457143 6.285714v2.171429h4.8c4 1.485714 8.228571 2.285714 12.571428 2.285714H731.428571c20.228571 0 36.571429-16.342857 36.571429-36.571429V182.857143c0-20.228571-16.342857-36.571429-36.571429-36.571429zM326.857143 905.371429L228.457143 806.857143H326.857143v98.514286zM685.714286 941.714286H400V779.428571c0-25.257143-20.457143-45.714286-45.714286-45.714285H192V228.571429h493.714286v713.142857z" p-id="4118"></path></svg>
                        </button>
                      </div>
                    </li>
                  ))
                }
              </TransitionGroup>
            </div>
          </Transition>
          <div class="control">
            <button class="view-btn">打开最近项目</button>
            <input
              checked={this.unhidden}
              type="checkbox"
              title="固定显示"
              onChange={onUnhiddenChange}
            />
          </div>
        </article>
      )
    },
    setup() {
      const { toRefs, reactive, computed } = Vue

      const state = reactive({
        recordsVisible: false,
        moreActionsVisible: false,
      })
      const { value: records, setValue: setRecords } = useGMvalue('records', [])
      const { value: unhidden, setValue: setUnhidden } = useGMvalue('unhidden', false)
      const reversed = computed(() => [...records.value].reverse())

      function deleteItem(item) {
        const newRecords = [...records.value]
        newRecords.find((record, index) => {
          if (record.pid === item.pid) {
            newRecords.splice(index, 1)
            return true
          }
        })
        setRecords(newRecords)
      }
      function copy(action, item) {
        let copyString = ''
        const password = GM_getValue('passwords', {})[item.pid]
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
      function toggle(visible) {
        state.recordsVisible = visible
      }
      function toggleMoreActions(visible) {
        state.moreActionsVisible = visible
      }
      function onUnhiddenChange(event) {
        setUnhidden(event.target.checked)
      }

      return {
        ...toRefs(state),
        records,
        unhidden,
        reversed,
        deleteItem,
        copy,
        toggle,
        toggleMoreActions,
        onUnhiddenChange,
      }
    },
  })
  const rootContainer = document.createElement('div')
  app.mount(rootContainer)
  document.body.appendChild(rootContainer)

  /* 记录函数 */
  function record() {
    const { pid } = parseURL()
    if (!pid) return

    const records = GM_getValue('records', [])
    let oldTitle = null
    records.find((item, index) => {
      if (item.pid === pid) {
        oldTitle = item.title
        records.splice(index, 1)
        return true
      }
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

  // 添加样式
  GM_addStyle(`
    |> {
        position: fixed;
        right: 1.5vw;
        bottom: 8vh;
        z-index: 1000;
        width: 240px;
        padding: 30px 30px 10px;
        opacity: .5;
        transition: opacity .1s;
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
    |> ul.more-actions {
        width: 204px;
    }
    |> ul {
        width: 180px;
        padding: 5px;
        max-height: 40vh;
        overflow-x: hidden;
        background: rgb(251, 251, 251);
        box-shadow: 0 1px 6px rgba(0,0,0,.15);
        transition: width .1s;
    }
    |> li {
        display: flex;
        align-items: center;
        padding: 0 5px;
        transition: all .3s, background 0.1s ease-out;
    }
    |> li:hover {
        background: rgba(220, 237, 251, 0.64);
    }
    |> li a {
        width: 132px;
        flex: none;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    |> li .actions {
        flex: 1 0 auto;
    }
    |> li button {
        width: 20px;
        line-height: 20px;
        border: none;
        border-radius: 50%;
        color: #ababab;
        box-shadow: 0 1px 1px rgba(0,0,0,.15);
        background: #fff;
        cursor: pointer;
    }
    |> li button:nth-of-type(n+2) {
        margin-left: 4px;
    }
    |> .control {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 8px;
    }
    |> .control input {
        margin-left: 6px;
    }
    |> .view-btn {
        padding: 4px 12px;
        color: #fff;
        background: #3385ff;
        box-shadow:0 1px 6px rgba(0,0,0,.2);
        border: none;
        border-radius: 2px;
    }
    |> svg {
        fill: currentColor;
    }

    /* 动画1 */
    |> .inject-slide-fade-enter-active, |> .inject-slide-fade-leave-active {
        transition: all .1s;
    }
    |> .inject-slide-fade-enter-from,
    |> .inject-slide-fade-leave-to {
        transform: translateY(5px);
        opacity: 0;
    }
    /* 动画2 group */
    |> .inject-slide-hor-fade-move {
        transition: all .8s;
    }
    |> .inject-slide-hor-fade-enter-from,
    |> .inject-slide-hor-fade-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    |> .inject-slide-hor-fade-active {
        position: absolute;
    }
  `.replace(/\|>/g, '#inject-recorder-ui'))

  return {
    record,
  }
}

// 将已保存的旧格式替换为新数据格式
function updateStorage() {
  const records = GM_getValue('records')
  if (!records) return
  let hasDiff = false
  const newRecords = records.map(record => {
    if (record.href) return record
    hasDiff = true
    const PATH = 'https://lanhuapp.com/web/'
    const { hash, queryString, ...rest } = record
    return {
      href: PATH + hash + '?' + queryString,
      ...rest,
    }
  })
  if (hasDiff) {
    GM_setValue('records', newRecords)
  }
}

main()
