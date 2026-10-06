import type { SiteDefinition } from '../../core/types'
import { articlePage } from './pages/article/page'

export const miyousheSite: SiteDefinition = {
  id: 'miyoushe',
  host: 'www.miyoushe.com',
  name: '米游社',
  pages: [articlePage],
}
