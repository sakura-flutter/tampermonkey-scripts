/* eslint-disable camelcase */
import { parse } from '@/utils/querystring'

export const weixin = () => {
  const { main_type } = parse()
  switch (main_type) {
    case '1':
      return {
        selector: '.weui-msg__text-area .ui-ellpisis-content p',
      }
    case '2': {
      const url = new URL(location)
      // 转为1可还原链接
      url.searchParams.set('main_type', '1')
      location.replace(url.toString())
    }
  }

  return {}
}
