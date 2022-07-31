import { $, $$ } from '@/utils/selector'

export function matchLang(str: string) {
  // 匹配 pathname 或字符串
  // /en-US/docs/Web/API/ 或 en-US
  return str.match(/^\/?([\w-]+)/)?.[1]
}

export function isChinese(lang?: string) {
  return /zh-CN/i.test(lang!)
}

export function isEnglish(lang?: string) {
  return /en-US/i.test(lang!)
}

/**
 * 需要点击菜单才能获取支持的语言
 * 切换语言后菜单会自动关闭
 * callback 返回一个布尔确认操作完后是否自动关闭
 */
export async function getLangMenus(callback?: (buttons: HTMLButtonElement[]) => boolean | undefined) {
  const toggle = $('button.languages-switcher-menu') as HTMLElement
  // 存在没有翻译的情况
  if (toggle == null) return []

  toggle.click()
  // fix: 新版又被 mdn 改掉了，不知道为什么要放在 microtask 才能获取到 buttons
  // 由于改为 microtask，调用这个函数都要更改
  // https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent
  // 只有浏览器自己触发的事件才是放在一个 task（不是 microtask） 里执行的
  // 而人工合成（synthetic）的事件派发（dispatch）是同步执行的，包括执行 click() 和 dispatchEvent()
  await Promise.resolve()
  // 不要返回 NodeList，和空时返回同样的类型
  const buttons = [...$$('.language-menu button[name]')] as HTMLButtonElement[]
  const off = callback?.(buttons) ?? true
  off && toggle.click()
  return buttons
}

export async function getSupports() {
  const langs = (await getLangMenus()).map(button => button.getAttribute('name')!)
  return langs
}
