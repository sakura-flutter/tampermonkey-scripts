import { warn } from '@/utils/log'
import type { Site } from '../types'

export const weixin: Site['use'] = () => {
  window.addEventListener('click', event => {
    const target = event.target as HTMLElement
    warn(target)
    if (target.nodeName !== 'A') return
    if (target.id !== 'js_view_source') return

    const link = (unsafeWindow as any).msg_source_url as string

    if (link) {
      event.stopPropagation()
      event.preventDefault()
      event.stopImmediatePropagation()
      window.open(link)
    }
  }, true)

  return {}
}
