import { createApp, reactive, toRefs } from 'vue'
import * as readyState from '@/utils/ready-state'
import { useGMvalue } from '@/composition/use-gm-value'
import globalStore from '@/store'
import { Button } from '@/components'
import './control.scss'

// 宽屏开关 options: store<store>, execute要执行的函数，visible是否可见(后续用show hide控制)，silent是否显示通知
export default function createControl(options) {
  const { store, execute = () => {}, visible = true, silent = false } = options

  const app = createApp({
    setup() {
      const state = reactive({
        // 总开关
        uiVisible: useGMvalue('ui_visible', true).value,
        visible,
        enabled: store.enabled,
      })
      if (store.enabled) {
        execute()
        !silent && notify()
      }

      // export-api
      function show() {
        state.visible = true
      }
      function hide() {
        state.visible = false
      }
      function notify() {
        (globalStore.notify_enabled ?? true) && Toast('已宽屏处理')
      }
      // private-api
      function toggle() {
        store.enabled = !state.enabled
        location.reload()
      }

      return {
        ...toRefs(state),
        show,
        hide,
        notify,
        toggle,
      }
    },
    render() {
      const { uiVisible, visible, enabled, toggle } = this

      return (
        <Button
          class="inject-widescreen-js"
          v-show={uiVisible && visible}
          title="注意：页面会被刷新"
          type="primary"
          shadow
          onClick={toggle}
        >
          {enabled ? '已开启' : '关闭'}
        </Button>
      )
    },
  })
  const rootContainer = document.createElement('div')
  const buttonComponent = app.mount(rootContainer)
  readyState.DOMContentLoaded(() => {
    document.body.appendChild(rootContainer)
  })

  return {
    show: buttonComponent.show,
    hide: buttonComponent.hide,
    notify: buttonComponent.notify,
  }
}
