import { $ } from '@monkey/shared/utils'
import type { Site } from '../types'

export const weibo: Site['parse'] = async () => {
  let link: string | null = ($('.open-url a[href]') as HTMLAnchorElement)?.href
  link ||= await fetch(location.href).then(response => response.headers.get('location'))

  return link
}
