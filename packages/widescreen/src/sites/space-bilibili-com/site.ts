import type { SiteDefinition } from '../../core/types'
import { mochaPage } from './pages/mocha/page'

export const bilibiliSpaceSite: SiteDefinition = {
  id: 'bilibili',
  host: 'space.bilibili.com',
  name: '哔哩哔哩空间',
  pages: [mochaPage],
}
