import type { SiteDefinition } from '../../core/types'
import { homePage } from './pages/home/page'

export const weiboSearchSite: SiteDefinition = {
  id: 'weibo',
  host: 's.weibo.com',
  name: '微博搜索',
  pages: [homePage],
}
