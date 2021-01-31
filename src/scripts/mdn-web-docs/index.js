import { $ } from '@/utils/selector'
import { warn } from '@/utils/log'

function main() {
  window.addEventListener('click', event => {
    // 标记是否自行切换语言
    if (event.target === $('.language-menu button[type="submit"]')) {
      sessionStorage.setItem('hand-control-language', true)
    }
  }, true)

  const docsLang = matchLang(location.pathname)
  warn(docsLang)
  if (isChinese(docsLang)) return
  // 是否自行切换过语言
  if (sessionStorage.getItem('hand-control-language') === 'true') return

  const supports = getSupports()
  warn(supports)
  for (const item of supports) {
    isChinese(matchLang(item)) && location.replace(item)
  }
}

function matchLang(str) {
  // 匹配 pathname 或字符串
  // /en-US/docs/Web/API/ 或 en-us
  return str.match(/^\/?([\w-]+)/)?.[1]
}

function isChinese(lang) {
  return /zh-cn/i.test(lang)
}

function getSupports() {
  return [...$('#select_language').options].map(opt => opt.value)
}

main()
