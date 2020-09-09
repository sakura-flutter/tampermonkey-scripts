// ==UserScript==
// @name         蓝湖 lanhu
// @version      1.0.4
// @description  自动填充填写过的产品密码(不是蓝湖账户)；查看产品页面窗口改变后帮助侧边栏更新高度
// @author       sakura-flutter
// @namespace    https://github.com/sakura-flutter
// @compatible   chrome >= 80
// @compatible   firefox >= 75
// @run-at       document-start
// @match        https://lanhuapp.com/web/
// @grant        unsafeWindow
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://greasyfork.org/scripts/411093-toast/code/Toast.js?version=846237
// ==/UserScript==

/* global Toast */

(function() {
  'use strict';
  const $ = document.querySelector.bind(document)

  /* 填充密码 */
  const oldPushState = unsafeWindow.history.pushState
  unsafeWindow.history.pushState = function(...args) {
      oldPushState.apply(unsafeWindow.history, args)
      console.warn('pushState')
      setTimeout(autofillPassword, 500)
  }

  ;['DOMContentLoaded', 'popstate', 'hashchange'].forEach(eventname => {
      unsafeWindow.addEventListener(eventname, () => {
          console.warn(eventname)
          setTimeout(autofillPassword, 500)
      })
  })

  function autofillPassword() {
      if (!location.hash.startsWith('#/item/project/door')) return
      const queryString = location.hash.includes('?') ? location.hash.split('?')[1] : ''
      if (!queryString) return
      const pid = new URLSearchParams(queryString).get('pid')
      // 确认登录按钮   密码框
      const [confirmEl, passwordEl] = [
          $('#project-door .mu-raised-button-wrapper'),
          $('#project-door .pass input'),
      ]
      if (!pid || !confirmEl || !passwordEl) return

      const pidPassword = GM_getValue('passwords', {})[pid]
      if (pidPassword) {
          passwordEl.value = pidPassword
          Toast('密码已填写')
          confirmEl.click()
      }

      // 蓝湖刷新会重新跳转到输入密码页 pushState DOMContentLoaded popstate hashchange 可能会导致重复注册事件
      // 标记一下事件
      if (confirmEl.dataset.addedHandler) return
      confirmEl.dataset.addedHandler = '1'

      // 点击后保存密码
      confirmEl.addEventListener('mousedown', savePassword)
      // 回车键保存密码
      passwordEl.addEventListener('keydown', event => {
          if (event.keyCode !== 13) return
          savePassword()
      })

      function savePassword() {
          const savedPassword = GM_getValue('passwords', {})
          const password = passwordEl.value
          GM_setValue('passwords', {
              ...savedPassword,
              [pid]: password,
          })
      }
  }

  /* 更新侧边栏高度 */
  window.addEventListener('resize', throttle(function() {
      const barEl = $('.flexible-bar')
      const modalEl = $('.flexible-modal')
      if (!barEl || !modalEl) return
      barEl.dispatchEvent(new MouseEvent('mousedown'))
      modalEl.dispatchEvent(new MouseEvent('mouseup'))
  }, 150))



  function throttle(fn, delay) {
      var t = null,
          begin = new Date().getTime();

      return function (...args) {
          var _self = this,
              cur = new Date().getTime();

          clearTimeout(t);

          if (cur - begin >= delay) {
              fn.apply(_self, args);
              begin = cur;
          } else {
              t = setTimeout(function () {
                  fn.apply(_self, args);
              }, delay);
          }
      }
  }
})();