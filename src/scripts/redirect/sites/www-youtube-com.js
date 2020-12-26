import { parse } from '@/utils/querystring'

export const youtube = () => ({
  link: parse().q,
})
