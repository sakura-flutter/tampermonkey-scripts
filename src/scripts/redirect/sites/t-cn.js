import { $ } from '@/utils/selector'

export const weibo = async () => {
  let link = $('.open-url a[href]')?.href
  link ||= await fetch(location.href).then(response => response.headers.get('location'))

  return {
    link,
  }
}
