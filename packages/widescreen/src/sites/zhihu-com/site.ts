import type { SiteDefinition } from '../../core/types'
import { homePage } from './pages/home/page'
import { questionPage } from './pages/question/page'
import { topicPage } from './pages/topic/page'

export const zhihuSite: SiteDefinition = {
  id: 'zhihu',
  host: 'www.zhihu.com',
  name: '知乎',
  pages: [homePage, questionPage, topicPage],
}
