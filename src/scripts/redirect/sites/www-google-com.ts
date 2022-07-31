import { parse } from '@/utils/querystring'

export const google = () => ({
  link: parse().url || parse().q,
})
