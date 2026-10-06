import type { SiteDefinition } from '../../core/types'
import { articlePage } from './pages/article/page'

export const toutiaoSite: SiteDefinition = {
  id: 'toutiao',
  host: 'www.toutiao.com',
  name: '头条',
  pages: [articlePage],
}
