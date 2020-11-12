/* Toast 可以直接Toast[type] 调用 */

/* global Vue Toast */

;(function() {
  'use strict'

  window.Toast = function(options, duration) {
    if (typeof options === 'string') {
      options = { content: options }
    }
    // 参数
    options = Object.assign({
      content: '',
      type: 'info',
    }, options)
    // 0时不会自动关闭 默认3s
    options.duration = duration ?? options.duration ?? 3000
    // 0时 closable默认打开
    if (options.duration === 0 && options.closable == null) {
      options.closable = true
    }

    const { createApp, Transition, onMounted, ref } = Vue
    const rootContainer = document.createElement('div')
    const app = createApp({
      setup() {
        const content = ref(options.content)
        const type = ref(options.type)
        const closable = ref(options.closable)
        const visible = ref(false)

        onMounted(() => {
          visible.value = true
          if (options.duration > 0) {
            setTimeout(close, options.duration)
          }
        })
        // export-api
        const close = () => {
          visible.value = false
        }
        // private-api
        const onAfterLeave = () => {
          app.unmount(rootContainer)
          rootContainer.remove()
        }

        return {
          content,
          type,
          closable,
          visible,
          close,
          onAfterLeave,
        }
      },
      render() {
        const { h } = Vue
        const { visible, type, content, closable, close, onAfterLeave } = this
        return h(Transition, { name: 'inject-toast-slide-fade', appear: true, onAfterLeave }, {
          default: () => (
            visible &&
            h('div', { class: 'inject-toast' },
              h('div', { class: ['inject-toast-content', `inject-toast-content--${type}`] }, {
                default: () => [
                  h('div', { class: 'inject-toast-content-text', innerHTML: content }),
                  closable && h('button', { class: 'inject-toast-content-close', onClick: close }, '×'),
                ],
              }),
            )
          ),
        })
      },
    })

    const toast = app.mount(rootContainer)
    insertElementInContainer(rootContainer)

    return {
      // 关闭
      close: toast.close,
    }
  }

  ;['info', 'success', 'warning', 'error'].forEach(type => {
    Toast[type] = function(options, duration) {
      if (typeof options === 'string') {
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
    if (!insertElementInContainer.el) {
      const el = insertElementInContainer.el = document.createElement('div')
      el.classList.add('inject-toast-container')
      safeAppendElement(() => { document.body.appendChild(el) })
    }
    const { el } = insertElementInContainer
    el.appendChild(elememnt)
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
    safeAppendElement(() => {
      document.head.appendChild(styleEl)
    })
  })()
// eslint-disable-next-line semi
})();
