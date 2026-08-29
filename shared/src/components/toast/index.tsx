import {
  computed,
  createVNode,
  defineComponent,
  isVNode,
  onBeforeUnmount,
  onMounted,
  ref,
  render,
  Transition,
} from 'vue'
import type { VNode, PropType } from 'vue'
import './index.scss'

const toastTypes = ['info', 'success', 'warning', 'error'] as const
const prefixCls = 'skr-toast'
const containerCls = `${prefixCls}-container`

export type ObjectToastOptions = {
  content: string | VNode
  type?: (typeof toastTypes)[number]
  closable?: boolean
  /** 默认 3s，0 时不会自动关闭 */
  duration?: number
}

export type ToastOptions = ObjectToastOptions['content'] | ObjectToastOptions

function normalizeOptions(options: ToastOptions, duration: ObjectToastOptions['duration']) {
  const normalized = typeof options === 'string' || isVNode(options) ? { content: options } : { ...options }
  normalized.duration = duration ?? normalized.duration
  return normalized
}

const ToastComponent = defineComponent({
  props: {
    content: {
      type: [String, Object] as PropType<ObjectToastOptions['content']>,
      default: '',
    },
    type: {
      type: String as PropType<ObjectToastOptions['type']>,
      validator: (value: any) => toastTypes.includes(value),
      default: 'info',
    },
    closable: {
      type: Boolean as PropType<ObjectToastOptions['closable']>,
      default: null,
    },
    duration: {
      type: Number as PropType<Required<ObjectToastOptions>['duration']>,
      default: 3000,
    },
    onClosed: Function as PropType<() => void>,
  },
  setup(props, { expose }) {
    const visible = ref(false)
    const closable = computed(() => (props.duration === 0 && props.closable == null ? true : props.closable))
    let timer: ReturnType<typeof setTimeout> | undefined

    const close = () => {
      if (timer !== undefined) {
        clearTimeout(timer)
        timer = undefined
      }
      visible.value = false
    }

    onMounted(() => {
      visible.value = true
      if (props.duration > 0) {
        timer = setTimeout(close, props.duration)
      }
    })

    onBeforeUnmount(() => {
      if (timer !== undefined) clearTimeout(timer)
    })

    expose({ close })

    return () => (
      <Transition name={`${prefixCls}-slide-fade`} appear onAfterLeave={() => props.onClosed?.()}>
        {visible.value && (
          <div class={prefixCls}>
            <div class={[`${prefixCls}-content`, `${prefixCls}-content--${props.type}`]}>
              <div class={`${prefixCls}-content-text`}>{props.content}</div>
              {closable.value && (
                <button class={`${prefixCls}-content-close`} onClick={close}>
                  ×
                </button>
              )}
            </div>
          </div>
        )}
      </Transition>
    )
  },
})

const Toast = function (_opts: ToastOptions, duration?: ObjectToastOptions['duration']) {
  const options = normalizeOptions(_opts, duration)
  const container = document.createElement('div')

  const toastVNode = createVNode(ToastComponent, {
    ...options,
    onClosed: () => {
      // 销毁
      render(null, container)
      container.remove()
    },
  })
  render(toastVNode, container)
  insertElementInContainer(container)

  return {
    close: toastVNode.component!.exposed!.close as () => void,
  }
}

toastTypes.forEach(type => {
  ;(Toast as any)[type] = function (_opts: ToastOptions, duration?: ObjectToastOptions['duration']) {
    const options = {
      ...normalizeOptions(_opts, duration),
      type,
    }
    return Toast(options, duration)
  }
})

function safeAppendElement(cb: () => void) {
  document.body ? cb() : window.addEventListener('DOMContentLoaded', cb)
}

function insertElementInContainer(element: Element) {
  safeAppendElement(() => {
    let container = document.querySelector(`.${containerCls}`)
    if (container == null) {
      container = document.createElement('div')
      container.classList.add(containerCls)
      document.body.appendChild(container)
    }
    container.appendChild(element)
  })
}

export type ToastApi = {
  info: typeof Toast
  success: typeof Toast
  warning: typeof Toast
  error: typeof Toast
} & typeof Toast

export default Toast as ToastApi
