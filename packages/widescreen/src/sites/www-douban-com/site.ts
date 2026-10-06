import type { SiteDefinition } from '../../core/types'
import { galleryPage } from './pages/gallery/page'
import { galleryTopicPage } from './pages/gallery-topic/page'
import { notePage } from './pages/note/page'

export const doubanSite: SiteDefinition = {
  id: 'douban',
  host: 'www.douban.com',
  name: '豆瓣',
  pages: [galleryPage, galleryTopicPage, notePage],
}
