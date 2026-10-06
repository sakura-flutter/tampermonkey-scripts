import type { SiteDefinition } from '../../core/types'
import { fPage } from './pages/f/page'
import { pPage } from './pages/p/page'

export const tiebaSite: SiteDefinition = {
  id: 'tieba',
  host: 'tieba.baidu.com',
  name: '百度贴吧',
  pages: [pPage, fPage],
}
