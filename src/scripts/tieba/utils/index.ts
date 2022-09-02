import { $$ } from '@/utils/selector'
import { parse } from '@/utils/querystring'
import type { PageData } from '../types'

export * from './request'
export * from './signature'

const jQuery: JQueryStatic = (unsafeWindow as any).jQuery

/**
 * 获取页面上的元素
 */
export function getElementsInPage() {
  const $moreforumEl = jQuery('#moreforum')
  // 必须先触发才能获取剩下的吧
  $moreforumEl.trigger('mouseenter')
  // 侧边的吧
  const likeUnsignEls = $$('#likeforumwraper .unsign') as NodeListOf<HTMLAnchorElement>
  const likeSignEls = $$('#likeforumwraper .sign') as NodeListOf<HTMLAnchorElement>
  // 查看更多的吧
  const alwayUnsignEls = $$('#alwayforum-wraper .unsign') as NodeListOf<HTMLAnchorElement>
  const alwaySignEls = $$('#alwayforum-wraper .sign') as NodeListOf<HTMLAnchorElement>
  // 关闭面板
  $moreforumEl.trigger('click')

  const unsigns = [...likeUnsignEls, ...alwayUnsignEls].map(element => {
    const fid = element.dataset.fid!
    const { kw } = parse(element.href)
    return { fid, kw, element }
  })

  const unsignsMap = unsigns.reduce((map, unsign) => {
    // id 与 吧名 作为 key
    return map
      .set(unsign.fid, unsign.element)
      .set(unsign.kw, unsign.element)
  }, new Map<string, HTMLAnchorElement>())

  return {
    /** 查看更多按钮 */
    moreForum: $moreforumEl,
    /** 未签到的元素 */
    unsigns,
    /** 签到的元素 */
    signs: [...likeSignEls, ...alwaySignEls],
    setSign(key: string) {
      // 替换成已签到样式
      unsignsMap.get(key)?.classList.replace('unsign', 'sign')
    },
  }
}

/**
 * 获取 PageData
 */
export function getPageData() {
  return (unsafeWindow as any).PageData as PageData
}
