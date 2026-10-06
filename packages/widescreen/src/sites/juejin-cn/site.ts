import type { SiteDefinition } from '../../core/types'
import { postPage } from './pages/post/page'

export const juejinSite: SiteDefinition = {
  id: 'juejin',
  host: 'juejin.cn',
  name: '掘金',
  pages: [postPage],
}
