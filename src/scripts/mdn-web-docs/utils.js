import { $, $$ } from '@/utils/selector'

export function matchLang(str) {
  // 匹配 pathname 或字符串
  // /en-US/docs/Web/API/ 或 en-US
  return str.match(/^\/?([\w-]+)/)?.[1]
}

export function isChinese(lang) {
  return /zh-CN/i.test(lang)
}

export function isEnglish(lang) {
  return /en-US/i.test(lang)
}

/**
 * 需要点击菜单才能获取支持的语言
 * 切换语言后菜单会自动关闭
 * callback 返回一个布尔确认操作完后是否自动关闭
 */
export function getLangMenus(callback) {
  const trigger = $('button.languages-switcher-menu')
  // 存在没有翻译的情况
  if (trigger == null) return []

  trigger.click()
  // 不要返回 NodeList，和空时返回同样的类型
  const buttons = [...$$('.language-menu button[name]')]
  const off = callback?.(buttons) ?? true
  off && trigger.click()
  return buttons
}

export function getSupports() {
  const langs = getLangMenus().map(button => button.getAttribute('name'))
  return langs
}
