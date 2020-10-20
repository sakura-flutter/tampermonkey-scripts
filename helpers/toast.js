/* Toast 可以直接Toast[type] 调用 */

/* global Vue Toast */

(function() {
  'use strict'

  window.Toast = function(options) {
    if (typeof options === 'string') {
      options = { content: options }
    }
    // 参数
    options = Object.assign({
      content: '',
      type: 'info',
      duration: 3000, // 0不会自动关闭
      closable: false,
    }, options)

    const { createApp, onMounted, ref } = Vue
    const rootContainer = document.createElement('div')
    const app = createApp({
      template: `
        <transition name="inject-toast-slide-fade" appear @after-leave="afterLeave">
          <div class="inject-toast" v-if="visible">
            <div class="inject-toast-content" :class="'inject-toast-content--' + type">
              <div class="inject-toast-content-text" v-html="content"></div>
              <button class="inject-toast-content-close" v-if="closable" @click="close">×</button>
            </div>
          </div>
        </transition>
      `,
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
        const afterLeave = () => {
          app.unmount(rootContainer)
          rootContainer.remove()
        }

        return {
          content,
          type,
          closable,
          visible,
          close,
          afterLeave,
        }
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
    Toast[type] = function(options) {
      if (typeof options === 'string') {
        options = { content: options }
      }
      options = {
        ...options,
        type,
      }
      return Toast(options)
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
        text-align: center;
      }
      .inject-toast {
        max-height: 100vh;
        transition: all .3s ease-in-out;
      }
      |> {
        display: inline-flex;
        justify-content: center;
        margin-bottom: 10px;
        padding: 8px 16px;
        font-size: 14px;
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
      .inject-toast-content-text {
        flex: auto;
      }
      .inject-toast-content-close {
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
})()
