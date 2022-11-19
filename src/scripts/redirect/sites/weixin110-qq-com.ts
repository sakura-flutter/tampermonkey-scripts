/* eslint-disable camelcase */
import { parse } from '@/utils/querystring'
import type { Site } from '../types'

export const weixin: Site['use'] = () => {
  const { main_type } = parse()
  switch (main_type) {
    case '2': {
      const url = new URL(location.href)
      // 转为 1 可还原链接
      url.searchParams.set('main_type', '1')
      location.replace(url.href)
      return {}
    }
    case '1':
    default:
      return {
        selector: '.weui-msg__text-area .ui-ellpisis-content p',
      }
  }
}
