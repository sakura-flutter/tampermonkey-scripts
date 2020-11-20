import { banciyuan } from './bcy-net'
import { weixin } from './mp-weixin-qq-com'
import { zhihuZhuanlan } from './zhuanlan-zhihu-com'
import { zhihuQuestion, zhihuHome, zhihuTopic } from './zhihu-com'
import { juejin } from './juejin-im'
import { jianshu } from './jianshu-com'
import { baidu } from './www-baidu-com'
import { tieba, tiebaForum } from './tieba-baidu-com'
import { sougou } from './www-sogou-com'
import { segmentfault } from './segmentfault-com'
import { bilibili } from './www-bilibili-com'
import { bilibiliDynamic } from './t-bilibili-com'
import { doubanMovie } from './movie-douban-com'
import { toutiao } from './www-toutiao-com'
import { weibo } from './weibo-com'
import { weiboDynamic } from './d-weibo-com'

const { host, pathname } = location

const sites = [
  {
    name: '半次元',
    namespace: 'banciyuan',
    test: /bcy\.net\/item\/detail\//,
    use: banciyuan,
  },
  {
    name: '微信',
    namespace: 'weixin',
    test: /mp\.weixin\.qq\.com\/s/,
    use: weixin,
  },
  {
    name: '知乎专栏',
    namespace: 'zhihu',
    test: /zhuanlan\.zhihu\.com\/p\//,
    use: zhihuZhuanlan,
  },
  {
    name: '知乎问答',
    namespace: 'zhihu',
    test: /zhihu\.com\/question\//,
    use: zhihuQuestion,
  },
  {
    name: '知乎',
    namespace: 'zhihu',
    test: /www\.zhihu\.com/.test(host) && /^\/(follow|hot)?$/.test(pathname),
    use: zhihuHome,
  },
  {
    name: '知乎话题',
    namespace: 'zhihu',
    test: /www\.zhihu\.com\/topic\//,
    use: zhihuTopic,
  },
  {
    name: '掘金',
    namespace: 'juejin',
    test: /juejin\.cn\/post\//,
    use: juejin,
  },
  {
    name: '简书',
    namespace: 'jianshu',
    test: /jianshu\.com\/p\//,
    use: jianshu,
  },
  {
    name: '百度',
    namespace: 'baidu',
    test: /www\.baidu\.com\/s?/,
    use: baidu,
  },
  {
    name: '贴吧',
    namespace: 'tieba',
    test: /tieba\.baidu\.com\/p\//,
    use: tieba,
  },
  {
    name: '贴吧吧页',
    namespace: 'tieba',
    test: /tieba\.baidu\.com\/f/,
    use: tiebaForum,
  },
  {
    name: '搜狗',
    namespace: 'sougou',
    test: /www\.sogou\.com\/web?/,
    use: sougou,
  },
  {
    name: 'segmentfault',
    namespace: 'segmentfault',
    test: /segmentfault\.com/,
    use: segmentfault,
  },
  {
    name: 'bilibili',
    namespace: 'bilibili',
    test: /www\.bilibili\.com\/read\/cv/,
    use: bilibili,
  },
  {
    name: 'bilibili动态',
    namespace: 'bilibili',
    test: /t\.bilibili\.com/.test(host) && pathname === '/',
    use: bilibiliDynamic,
  },
  {
    name: '豆瓣电影',
    namespace: 'doubanmovie',
    test: /movie\.douban\.com/,
    use: doubanMovie,
  },
  {
    name: '头条',
    namespace: 'toutiao',
    test: /www\.toutiao\.com/,
    use: toutiao,
  },
  {
    name: '微博',
    namespace: 'weibo',
    test: /\/\/weibo.com/,
    use: weibo,
  },
  {
    name: '微博动态',
    namespace: 'weibo',
    test: /d\.weibo\.com/,
    use: weiboDynamic,
  },
]

export default sites
