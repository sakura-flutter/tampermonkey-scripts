import type { SiteDefinition } from '../../core/types'
import { articlePage } from './pages/article/page'

export const weixinSite: SiteDefinition = {
  id: 'weixin',
  host: 'mp.weixin.qq.com',
  name: '微信',
  pages: [articlePage],
}
