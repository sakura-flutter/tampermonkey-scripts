import { jianshu } from './www-jianshu-com'
import { zhihu } from './link-zhihu-com'
import { weibo } from './t-cn'

const sites = [
  {
    name: '简书',
    test: /www\.jianshu\.com\/go-wild/,
    use: jianshu,
  },
  {
    name: '知乎',
    test: /link\.zhihu\.com/,
    use: zhihu,
  },
  {
    name: '微博',
    test: /t\.cn\//,
    use: weibo,
  },
]

export default sites
