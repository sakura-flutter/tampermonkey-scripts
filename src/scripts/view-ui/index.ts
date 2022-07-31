import { warn } from '@/utils/log'
import { $$ } from '@/utils/selector'
import './ui'

function main() {
  // 物料
  const storeBadge = '.navigate-item-badge-store'
  // pro
  const proBadge = '.navigate-item-badge-pro'
  const prefixSelector = '.app-left .ivu-menu '
  const selector = Array.from([storeBadge, proBadge], item => prefixSelector + item).join()
  const badgeEls = $$(selector) as NodeListOf<HTMLElement>

  warn(selector, badgeEls)

  badgeEls.forEach(el => {
    let { parentElement } = el
    while (parentElement) {
      const { tagName } = parentElement
      if (tagName === 'A' && parentElement.classList.contains('ivu-menu-item')) {
        // 添加标记
        parentElement.dataset.visible = 'hidden'
        break
      }
      if (tagName === 'BODY') break
      parentElement = parentElement.parentElement
    }
  })
}

setTimeout(main, 500)
