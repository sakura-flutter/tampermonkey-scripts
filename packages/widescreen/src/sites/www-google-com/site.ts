import type { SiteDefinition } from '../../core/types'
import { searchPage } from './pages/search/page'

const GOOGLE_HOST_PATTERN = /^www\.google\.(?:[a-z]{2,3}\.)?[a-z]{2,3}$/i
const currentHost = location.hostname

// The candidate host is copied from the current URL and is then compared with
// the route host using the core's exact-equality matcher. No subdomain is inherited.
export const googleSites: SiteDefinition[] = GOOGLE_HOST_PATTERN.test(currentHost)
  ? [
      {
        id: 'google',
        host: currentHost,
        name: '谷歌',
        pages: [searchPage],
      },
    ]
  : []
