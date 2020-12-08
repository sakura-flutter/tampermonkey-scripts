import { reactive, watchEffect } from 'vue'
import { mountComponent } from '@/utils/mount-component'
import { useExpose } from '@/composition/use-expose'
import { useGMvalue } from '@/composition/use-gm-value'
import globalStore from '@/store'
import { Button } from '@/components'
import './control.scss'

// 宽屏开关 options: store<store>, execute要执行的函数，visible是否可见(后续用show hide控制)，silent是否显示通知
export default function createControl(options) {
  const { store, execute = () => {}, visible = true, silent = false } = options

  const { instance } = mountComponent({
    setup() {
      const state = reactive({
        // 总开关
        uiVisible: useGMvalue('ui_visible', true).value,
        visible,
        loose: store.loose || false,
      })

      function notify() {
        (globalStore.notify_enabled ?? true) && Toast('已宽屏处理')
      }
      function toggle() {
        store.enabled = !store.enabled
        location.reload()
      }

      useExpose({
        notify,
        show: () => { state.visible = true },
        hide: () => { state.visible = false },
      })

      if (store.enabled) {
        watchEffect(() => {
          store.loose = state.loose
          document.documentElement.classList[state.loose ? 'add' : 'remove']('inject-widescreen-loose-js')
        })
        execute()
        !silent && notify()
      }

      return () => (
        <div class="inject-widescreen-js">
          <Button
            v-show={state.uiVisible && state.visible}
            title="注意：页面会被刷新"
            type="primary"
            shadow
            onClick={toggle}
          >
            {store.enabled ? '已开启' : '关闭'}
          </Button>
          {store.enabled && <label title="勾选后不再限制最大宽度，酌情使用">
            <input
              v-model={state.loose}
              type="checkbox"
            />
              更宽
          </label>}
        </div>
      )
    },
  })

  return instance
}
