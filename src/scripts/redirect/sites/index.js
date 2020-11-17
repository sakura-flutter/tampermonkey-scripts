import { jianshu } from './www-jianshu-com'
import { zhihu } from './link-zhihu-com'

const sites = [
  {
    name: '简书',
    // https://www.jianshu.com/go-wild?ac=2&url=https://www.huawei.com/cn/corporate-information
    test: /www\.jianshu\.com\/go-wild/,
    use: jianshu,
  },
  {
    name: '知乎',
    // http://link.zhihu.com/?target=https://www.huawei.com/cn/corporate-information
    test: /link\.zhihu\.com/,
    use: zhihu,
  },
]

export default sites
