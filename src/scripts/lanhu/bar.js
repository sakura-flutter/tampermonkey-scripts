import { throttle } from '@/utils/base'
import { $ } from '@/utils/selector'

/* 更新侧边栏高度 */
function fixBarHeight() {
  window.addEventListener('resize', throttle(function() {
    if (!location.hash.startsWith('#/item/project/product')) return
    const barEl = $('.flexible-bar')
    const modalEl = $('.flexible-modal')
    if (!barEl || !modalEl) return
    barEl.dispatchEvent(new MouseEvent('mousedown'))
    modalEl.dispatchEvent(new MouseEvent('mouseup'))
  }, 150))
}

export {
  fixBarHeight,
}
