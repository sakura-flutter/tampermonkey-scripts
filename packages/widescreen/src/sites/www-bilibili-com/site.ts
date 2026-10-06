import type { SiteDefinition } from '../../core/types'
import { articlePage } from './pages/article/page'
import { opusPage } from './pages/opus/page'

export const bilibiliSite: SiteDefinition = {
  id: 'bilibili',
  host: 'www.bilibili.com',
  name: '哔哩哔哩',
  pages: [articlePage, opusPage],
}
