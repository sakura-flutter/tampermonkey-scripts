import type { SiteDefinition } from '../../core/types'
import { articlePage } from './pages/article/page'

export const jianshuSite: SiteDefinition = {
  id: 'jianshu',
  host: 'www.jianshu.com',
  name: '简书',
  pages: [articlePage],
}
