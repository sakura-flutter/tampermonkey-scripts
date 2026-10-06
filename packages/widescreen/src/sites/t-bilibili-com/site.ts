import type { SiteDefinition } from '../../core/types'
import { homePage } from './pages/home/page'

export const bilibiliDynamicSite: SiteDefinition = {
  id: 'bilibili',
  host: 't.bilibili.com',
  name: '哔哩哔哩动态',
  pages: [homePage],
}
