import { $ } from '@/utils/selector'
import { warn } from '@/utils/log'
import { getSupports, matchLang, isChinese, isEnglish, getLangMenus } from './utils'
import './style'

let docsLang = matchLang(location.pathname)
const supports = getSupports()
warn(docsLang)
warn(supports)

function main() {
  if (!supports.length) return

  window.addEventListener('urlchange', () => {
    docsLang = matchLang(location.pathname)
  })
  window.addEventListener('click', function listener(event) {
    if (!event.isTrusted) return

    const isInLangMenu = $('.languages-switcher-menu .language-menu')?.contains(event.target)
    if (isInLangMenu) {
      // 标记自行切换语言
      sessionStorage.setItem('hand-control-language', true)
      window.removeEventListener('click', listener, true)
    }
  }, true)

  setLocale()
  addLangButton()
}

function setLocale() {
  if (isChinese(docsLang)) return
  // 是否自行切换过语言
  if (sessionStorage.getItem('hand-control-language') === 'true') return

  for (const item of supports) {
    isChinese(matchLang(item)) && selectLang(item)
  }
}

function selectLang(value) {
  getLangMenus(buttons => {
    for (const button of buttons) {
      if (button.getAttribute('name') === value) {
        button.click()
        return false
      }
    }
  })
}

function addLangButton() {
  const values = [] // [0]中 [1]英 排序
  for (const item of supports) {
    const lang = matchLang(item)
    if (isChinese(lang)) {
      values[0] = item
    } else if (isEnglish(lang)) {
      values[1] = item
    }
  }
  if (isChinese(docsLang)) values[0] = docsLang
  if (isEnglish(docsLang)) values[1] = docsLang
  warn(values)
  if (values.filter(Boolean).length < 2) return

  // bug: 会出现一种进来时有翻译，换了另一篇后没翻译，这时按钮仍然显示的问题
  const button = document.createElement('button')
  button.innerText = '中-英'
  button.classList.add('button')
  button.classList.add('action')
  button.style.cssText = [
    'position: fixed',
    'right: 0',
    'bottom: 15vh',
    'line-height: 2em',
    'padding: 2px 10px',
    'font-size: 12px',
    'letter-spacing: 2px',
    'border: 1px solid var(--border-secondary)',
    'background-color: var(--button-bg)',
    'box-shadow: var(--shadow-01)',
  ].join(';')
  button.onclick = function() {
    sessionStorage.setItem('hand-control-language', true)
    selectLang(isChinese(docsLang) ? values[1] : values[0])
  }

  document.body.append(button)
}

main()
