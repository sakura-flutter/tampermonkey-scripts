import type { SiteDefinition } from '../../core/types'
import { reviewPage } from './pages/review/page'
import { subjectPage } from './pages/subject/page'

export const movieDoubanSite: SiteDefinition = {
  id: 'douban',
  host: 'movie.douban.com',
  name: '豆瓣电影',
  pages: [subjectPage, reviewPage],
}
