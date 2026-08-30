import { $, log } from '@monkey/shared/utils'

export const doc360 = () => {
  ;($('#artContent') as HTMLElement).addEventListener(
    'click',
    event => {
      const { target } = event as any
      const href: string = target.href
      log.warn(target)
      if (target.nodeName !== 'A') return
      if (!href) return
      // 是否本站
      if (new RegExp(location.host).test(new URL(href).host)) return

      event.stopPropagation()
      window.open(href)
    },
    true,
  )
}
