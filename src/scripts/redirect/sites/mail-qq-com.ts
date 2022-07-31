import { parse } from '@/utils/querystring'

export const qqMail = () => ({
  link: parse().url || parse().gourl,
})
