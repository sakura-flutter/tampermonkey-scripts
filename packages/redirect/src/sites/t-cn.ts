import { $ } from '@monkey/shared/utils'

export const weibo = async () => {
  let link: string | null = ($('.open-url a[href]') as HTMLAnchorElement)?.href
  link ||= await fetch(location.href).then(response => response.headers.get('location'))

  return {
    link,
  }
}
