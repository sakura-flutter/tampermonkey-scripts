/* Toast */

import { createVNode, defineComponent, render, isVNode, onMounted, reactive, Transition } from 'vue'

window.Toast = function(options, duration) {
  if (typeof options === 'string' || isVNode(options)) {
    options = { content: options }
  }
  options.duration = duration ?? options.duration

  const container = document.createElement('div')
  const ToastConstructor = defineComponent({
    props: {
      content: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'info',
        validator: value => ['info', 'success', 'warning', 'error'].includes(value),
      },
      closable: {
        type: Boolean,
        default: null,
      },
      duration: {
        type: Number,
        default: 3000, // 0时不会自动关闭
      },
    },
    setup(props, context) {
      const { expose } = context
      const state = reactive({
        closable: (props.duration === 0 && props.closable == null) ? true : props.closable, // 0时 closable 默认打开
        visible: false,
      })

      onMounted(() => {
        state.visible = true
        if (props.duration > 0) {
          setTimeout(close, props.duration)
        }
      })

      const close = () => {
        state.visible = false
      }

      const onAfterLeave = () => {
        // 销毁
        render(null, container)
        container.remove()
      }

      expose({
        close,
      })

      return () => (
        <Transition name="inject-toast-slide-fade" appear onAfterLeave={onAfterLeave}>
          {state.visible && (
            <div class="inject-toast">
              <div class={['inject-toast-content', `inject-toast-content--${props.type}`]}>
                <div class="inject-toast-content-text">{props.content}</div>
                {state.closable && <button class="inject-toast-content-close" onClick={close}>×</button>}
              </div>
            </div>
          )}
        </Transition>
      )
    },
  })

  // toast
  const vm = createVNode(ToastConstructor, options)
  render(vm, container)
  insertElementInContainer(container)

  return vm
}

;['info', 'success', 'warning', 'error'].forEach(type => {
  Toast[type] = function(options, duration) {
    if (typeof options === 'string' || isVNode(options)) {
      options = { content: options }
    }
    options = {
      ...options,
      type,
    }
    return Toast(options, duration)
  }
})

function safeAppendElement(cb) {
  document.body ? cb() : window.addEventListener('DOMContentLoaded', cb)
}

function insertElementInContainer(elememnt) {
  function getContainer() {
    const classname = 'inject-toast-container'
    let containerEl = document.querySelector('.' + classname)
    if (containerEl == null) {
      containerEl = document.createElement('div')
      containerEl.classList.add(classname)
      document.body.appendChild(containerEl)
    }
    return containerEl
  }
  safeAppendElement(() => {
    getContainer().appendChild(elememnt)
  })
}

;(function addStyle() {
  const styleEl = document.createElement('style')
  styleEl.appendChild(document.createTextNode(`
    .inject-toast-container {
      position: fixed;
      z-index: 99999;
      top: 80px;
      right: 0;
      left: 0;
      pointer-events: none;
      text-align: center;
    }
    .inject-toast {
      contain: content;
      max-height: 100vh;
      transition: all .3s ease-in-out;
    }
    |> {
      pointer-events: auto;
      display: inline-flex;
      justify-content: center;
      margin-bottom: 10px;
      padding: 8px 16px;
      max-width: 90vw;
      font-size: 14px;
      line-height: 1.5em;
      border: 1px solid;
      box-shadow: 0 2px 3px rgba(0,0,0,.1);
    }
    |>--info {
      color: #2e8bf0;
      background: #f0faff;
      border-color: #d4eeff;
    }
    |>--success {
      color: #19bf6c;
      background: #edfff3;
      border-color: #bbf2cf;
    }
    |>--warning {
      color: #f90;
      background: #fff9e6;
      border-color: #ffe7a3;
    }
    |>--error {
      color: #ed3f13;
      background: #ffefe6;
      border-color: #ffcfb8;
    }
    |>-text {
      flex: auto;
    }
    |>-close {
      flex: none;
      width: 20px;
      margin: 0 -8px 0 10px;
      padding: 0;
      font-size: 16px;
      color: #ababab;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    /* 动画 */
    .inject-toast-slide-fade-enter-active,
    .inject-toast-slide-fade-leave-active {
      transition: all .3s;
     }
    .inject-toast-slide-fade-enter-from {
      transform: translateY(-50%);
      opacity: 0;
    }
    .inject-toast-slide-fade-leave-to {
      transform: translateY(50%);
      max-height: 0;
      padding: 0;
      opacity: 0;
    }
  `.replace(/\|>/g, '.inject-toast-content')))

  // fix: tampermonkey 偶尔会获取不到 head
  safeAppendElement(() => {
    document.head.appendChild(styleEl)
  })
})()
