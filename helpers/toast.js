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
      }, options)

      const toast = new Vue({
          template: `
           <transition name="fade" appear @before-enter="beforeEnter" @enter="enter" @leave="leave" @after-leave="afterLeave">
             <div
               :style="colour"
               style="position:fixed; z-index:99999; top:80px; left:50%; padding:8px 16px; font-size:14px; box-shadow:0 2px 3px rgba(0,0,0,.1); transition:all .3s ease-in-out;"
               v-if="visible"
               v-html="content"
             >
             </div>
           </transition>
         `,
          data() {
              return {
                  content: options.content,
                  type: options.type,
                  visible: true,
              }
          },
          computed: {
              // 颜色
              colour() {
                  switch(this.type) {
                      case 'info':
                          return {
                              color: '#2e8bf0',
                              background: '#f0faff',
                              border: '1px solid #d4eeff',
                          }
                      case 'success':
                          return {
                              color: '#19bf6c',
                              background: '#edfff3',
                              border: '1px solid #bbf2cf',
                          }
                      case 'warning':
                          return {
                              color: '#f90',
                              background: '#fff9e6',
                              border: '1px solid #ffe7a3',
                          }
                      case 'error':
                          return {
                              color: '#ed3f13',
                              background: '#ffefe6',
                              border: '1px solid #ffcfb8',
                          }
                  }
              }
          },
          methods: {
              // export-api
              // 关闭
              close() {
                  this.visible = false
              },
              beforeEnter(el) {
                  el.style.opacity = 0
                  el.style.transform = 'translate(-50%, -10%)'
              },
              enter(el, done) {
                  setTimeout(() => {
                      el.style.opacity = 1
                      el.style.transform = 'translate(-50%, 0)'
                  })
              },
              leave(el, done) {
                  el.style.opacity = 0
                  el.style.transform = 'translate(-50%, 30%)'
                  setTimeout(done, 300)
              },
              afterLeave () {
                  this.$destroy()
                  this.$el.parentNode.removeChild(this.$el)
              },
          },
      }).$mount()
      document.body.appendChild(toast.$el)

      if (options.duration > 0) {
          setTimeout(() => {
              toast.visible = false
          }, options.duration)
      }

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

})();