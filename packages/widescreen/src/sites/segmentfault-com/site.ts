import type { SiteDefinition } from '../../core/types'
import { qPage } from './pages/q/page'

export const segmentfaultSite: SiteDefinition = {
  id: 'segmentfault',
  host: 'segmentfault.com',
  name: 'SegmentFault',
  pages: [qPage],
}
