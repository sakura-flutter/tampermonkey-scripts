import type { SiteDefinition } from '../../core/types'
import { articlePage } from './pages/article/page'

export const zhuanlanSite: SiteDefinition = {
  id: 'zhihu',
  host: 'zhuanlan.zhihu.com',
  name: '知乎专栏',
  pages: [articlePage],
}
