import { parse } from '@/utils/querystring'

export const jianshu = () => ({
  link: parse().url,
})
