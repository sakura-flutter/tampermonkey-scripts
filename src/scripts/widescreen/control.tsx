import { reactive, watchEffect } from 'vue'
import { mountComponent } from '@/utils/mount-component'
import { useGMvalue } from '@/composables/use-gm-value'
import globalStore from '@/store'
import Button from '@/components/button'
import './control.scss'

const noop = () => {}

interface ControlOptions {
  store: Record<string, any>
  /** 要执行的函数 */
  execute?(): void
  /** 是否可见(后续用show hide控制) */
  visible?: boolean
  /** 是否显示通知 */
  silent?: boolean
}

/** 宽屏开关 */
export default function createControl(options: ControlOptions) {
  const { store, execute = noop, visible = true, silent = false } = options

  const { instance } = mountComponent({
    setup(_, { expose }) {
      const state = reactive({
        // 总开关
        uiVisible: useGMvalue('ui_visible', true),
        visible,
        loose: store.loose || false,
      })

      function notify() {
        ;(globalStore.notify_enabled ?? false) && Toast('已宽屏处理')
      }
      function toggle() {
        store.enabled = !store.enabled
        location.reload()
      }

      expose({
        notify,
        show: () => {
          state.visible = true
        },
        hide: () => {
          state.visible = false
        },
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
        <>
          {state.uiVisible && state.visible && (
            <div class="inject-widescreen-js">
              <Button title="注意：页面会被刷新" type="primary" shadow onClick={toggle}>
                {store.enabled ? '已开启' : '关闭'}
              </Button>
              {store.enabled && (
                <label title="勾选后不再限制最大宽度，酌情使用">
                  <input v-model={state.loose} type="checkbox" />
                  更宽
                </label>
              )}
            </div>
          )}
        </>
      )
    },
  })

  return instance as unknown as {
    notify(): void
    show(): void
    hide(): void
  }
}
