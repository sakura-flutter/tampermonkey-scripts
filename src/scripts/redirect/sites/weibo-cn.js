import { parse } from '@/utils/querystring'

export const weibo = () => ({
  link: parse().toasturl || parse().u,
})
