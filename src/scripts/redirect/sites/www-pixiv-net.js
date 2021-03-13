import { parse } from '@/utils/querystring'

export const pixiv = () => {
  let link
  // 链接居然是直接拼在url上的
  // https://www.pixiv.net/jump.php?https%3A%2F%2Fwww.huawei.com%2Fcn%2Fcorporate-information
  for (const [key, value] of Object.entries(parse())) {
    try { link ||= new URL(key).href } catch {}
    try { link ||= new URL(value).href } catch {}
  }

  return {
    link,
  }
}
