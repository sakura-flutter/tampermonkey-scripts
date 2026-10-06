import type { SiteDefinition } from '../../core/types'
import { dynamicPage } from './pages/dynamic/page'

export const weiboDynamicSite: SiteDefinition = {
  id: 'weibo',
  host: 'd.weibo.com',
  name: '微博动态',
  pages: [dynamicPage],
}
