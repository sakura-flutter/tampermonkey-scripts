import { $$ } from '@/utils/selector'
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
  // 查看更多的吧
  const alwayUnsignEls = $$('#alwayforum-wraper .unsign') as NodeListOf<HTMLAnchorElement>
  // 关闭面板
  $moreforumEl.trigger('click')

  return {
    /** 查看更多按钮 */
    moreForum: $moreforumEl,
    /** 未签到的元素 */
    unsigns: [...likeUnsignEls, ...alwayUnsignEls],
  }
}

/**
 * 获取 PageData
 */
export function getPageData() {
  return (unsafeWindow as any).PageData as PageData
}
