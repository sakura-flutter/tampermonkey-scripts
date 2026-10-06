import type { SiteDefinition } from '../../core/types'
import { tvPage, articlePage, homePage } from './pages'

export const weiboSite: SiteDefinition = {
  id: 'weibo',
  host: 'weibo.com',
  name: '微博',
  pages: [tvPage, articlePage, homePage],
}

export const wwwWeiboSite: SiteDefinition = {
  id: 'weibo',
  host: 'www.weibo.com',
  name: '微博',
  pages: [tvPage, articlePage, homePage],
}
