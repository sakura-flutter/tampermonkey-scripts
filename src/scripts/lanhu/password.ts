import * as qs from '@/utils/querystring'
import { $ } from '@/utils/selector'
import type { PasswordType } from './types'

const marks = new WeakSet()
let observer: MutationObserver | null = null

/* 填充密码 */
function autofill() {
  // 停止上次观察
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (!location.hash.startsWith('#/item/project/door')) return
  const { pid, pwd } = qs.parse()
  // 有些链接自带密码 如果保存过密码但链接自带新密码会有问题
  if (!pid || pwd) return

  // 确认登录按钮
  let confirmEl: HTMLButtonElement | null = null
  // 密码框
  let passwordEl: HTMLInputElement | null = null

  function savePassword() {
    const savedPassword = GM_getValue('passwords', {})
    const password = passwordEl!.value
    GM_setValue('passwords', {
      ...savedPassword,
      [pid]: password,
    })
  }

  observer = new MutationObserver((mutationsList, observer) => {
    let filled = false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of mutationsList) {
      const [hasConfirmEl, hasPasswordEl] = [
        $('#project-door .mu-raised-button-wrapper') as HTMLButtonElement,
        $('#project-door .pass input') as HTMLInputElement,
      ]
      if (!hasConfirmEl || !hasPasswordEl) continue

      observer.disconnect()
      confirmEl = hasConfirmEl
      passwordEl = hasPasswordEl

      const pidPassword = GM_getValue<PasswordType>('passwords', {})[pid]
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

export {
  autofill,
}
