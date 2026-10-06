import type { SiteDefinition } from '../../core/types'
import { cratePage } from './pages/crate/page'

export const cratesSite: SiteDefinition = {
  id: 'crates',
  host: 'crates.io',
  name: 'Crates.io',
  pages: [cratePage],
}
