import { parse } from '@/utils/querystring'
import type { Site } from '../types'

const { atob } = window

export const weixin: Site['use'] = () => {
  const { main_type, midpagecode } = parse()

  /**
   * main_type 貌似是旧的规则
   */
  switch (main_type) {
    case '2': {
      const url = new URL(location.href)
      // 转为 1 可还原链接
      url.searchParams.set('main_type', '1')
      location.replace(url.href)
      return {}
    }
    case '1':
      break
  }

  /**
   * midpagecode 似乎是新的规则
   */
  const MAGIC_KEY = atob(
    atob(
      'Tmpjek56ZGhNbUZrWWpRMFpURTNZekZpTUdGa1lqSTBZalZqWmpKaVpERXlZek0wWkRsaU5UWmxNRFpqWTJRMlpHUTBZekk1TVdJME1qTmlOV0prTjJabU5tUmhZbVJqTlRVM1l6azVNbVkxWkRZd1pEZzVNbUkyT0Rjd1pqYzBOakV3TldNM05HRmhNalJqTXpBMk0yUTNOR1ExT1dJMFlXVTFOVFF6WldJM1lqSmtObVUwT1dOak1qYzNNMkZsTVRjM01UWTNNemcwTmpRM04ySmpOalppTTJNelltUTNPVE5sWkRJNFpEZGhaVE5rTnpZeE0yUm1ZVGRpWW1ReQ==',
    ),
  )
  if (midpagecode && midpagecode !== MAGIC_KEY && !(window as any).cgiData?.url) {
    const url = new URL(location.href)
    // 会还原链接
    url.searchParams.set('midpagecode', MAGIC_KEY)
    location.replace(url.href)
    return {}
  }

  return {
    // 如果解析得到，会出现在页面这里
    selector: '.weui-msg__text-area .ui-ellpisis-content p',
  }
}
