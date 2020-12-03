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
  const badgeEls = $$(selector)

  warn(selector, badgeEls)

  badgeEls.forEach(el => {
    let { parentNode } = el
    while (parentNode) {
      const { tagName } = parentNode
      if (tagName === 'A' && parentNode.classList.contains('ivu-menu-item')) {
        // 添加标记
        parentNode.classList.add('menu-item--hidden')
        break
      }
      if (tagName === 'BODY') break
      parentNode = parentNode.parentNode
    }
  })
}

setTimeout(main, 500)
