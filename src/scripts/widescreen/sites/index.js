import { banciyuan } from './bcy-net'
import { weixin } from './mp-weixin-qq-com'
import { zhihuZhuanlan } from './zhuanlan-zhihu-com'
import { zhihuQuestion, zhihuHome, zhihuTopic } from './zhihu-com'
import { juejin } from './juejin-cn'
import { crates } from './crates-io'
import { jianshu } from './jianshu-com'
import { baidu } from './www-baidu-com'
import { tieba, tiebaForum } from './tieba-baidu-com'
import { sougou } from './www-sogou-com'
import { segmentfault } from './segmentfault-com'
import { bilibili } from './www-bilibili-com'
import { bilibiliDynamic, bilibiliDynamicDetail } from './t-bilibili-com'
import { bilibiliSpace } from './space-bilibili-com'
import { douban } from './www-douban-com'
import { doubanSubject, doubanReview } from './movie-douban-com'
import { toutiao } from './www-toutiao-com'
import { weibo, weiboArticle } from './weibo-com'
import { weiboDynamic } from './d-weibo-com'
import { google } from './www-google-com'
import { csdn } from './blog-csdn-net'
import { mihoyoBBS } from './bbs-mihoyo-com'

const sites = [
  {
    name: '半次元',
    namespace: 'banciyuan',
    test: /^bcy\.net\/item\/detail\//,
    use: banciyuan,
  },
  {
    name: '微信',
    namespace: 'weixin',
    test: /^mp\.weixin\.qq\.com\/s/,
    use: weixin,
  },
  {
    name: '知乎专栏',
    namespace: 'zhihu',
    test: /^zhuanlan\.zhihu\.com\/p\//,
    use: zhihuZhuanlan,
  },
  {
    name: '知乎问答',
    namespace: 'zhihu',
    test: /^www\.zhihu\.com\/question\//,
    use: zhihuQuestion,
  },
  {
    name: '知乎',
    namespace: 'zhihu',
    test: /^www\.zhihu\.com\/(follow|hot)?$/,
    use: zhihuHome,
  },
  {
    name: '知乎话题',
    namespace: 'zhihu',
    test: /^www\.zhihu\.com\/topic\//,
    use: zhihuTopic,
  },
  {
    name: '掘金',
    namespace: 'juejin',
    test: /^juejin\.cn\/post\//,
    use: juejin,
  },
  {
    name: 'Crates.io',
    namespace: 'crates',
    test: /^crates\.io\/crates\//,
    use: crates,
  },
  {
    name: '简书',
    namespace: 'jianshu',
    test: /^www\.jianshu\.com\/p\//,
    use: jianshu,
  },
  {
    name: '百度',
    namespace: 'baidu',
    test: /^www\.baidu\.com\/s?$/,
    use: baidu,
  },
  {
    name: '贴吧',
    namespace: 'tieba',
    test: /^tieba\.baidu\.com\/p\//,
    use: tieba,
  },
  {
    name: '贴吧吧页',
    namespace: 'tieba',
    test: /^tieba\.baidu\.com\/f$/,
    use: tiebaForum,
  },
  {
    name: '搜狗',
    namespace: 'sougou',
    test: /^www\.sogou\.com\/web$/,
    use: sougou,
  },
  {
    name: 'segmentfault',
    namespace: 'segmentfault',
    test: /^segmentfault\.com\/(a|q)\//,
    use: segmentfault,
  },
  {
    name: 'bilibili',
    namespace: 'bilibili',
    test: /^www\.bilibili\.com\/read\/cv/,
    use: bilibili,
  },
  {
    name: 'bilibili 动态',
    namespace: 'bilibili',
    test: /^t\.bilibili\.com\/$/,
    use: bilibiliDynamic,
  },
  {
    name: 'bilibili 动态详情',
    namespace: 'bilibili',
    test: /^t\.bilibili\.com\/\d+$/,
    use: bilibiliDynamicDetail,
  },
  {
    name: 'bilibili 空间',
    namespace: 'bilibili',
    test: /^space\.bilibili\.com\/212535360$/,
    use: bilibiliSpace,
  },
  {
    name: '豆瓣',
    namespace: 'douban',
    test: [
      /^www\.douban\.com\/gallery\/$/,
      /^www\.douban\.com\/gallery\/topic\/.+?/,
      /^www\.douban\.com\/note\/.+?/,
    ],
    use: douban,
  },
  {
    name: '豆瓣电影 详情',
    namespace: 'doubanmovie',
    test: /^movie\.douban\.com\/subject\//, // 与剧评相关 movie.douban.com/subject/${id}/${xxx}
    use: doubanSubject,
  },
  {
    name: '豆瓣电影 剧评详情',
    namespace: 'doubanmovie',
    test: /^movie\.douban\.com\/review\//,
    use: doubanReview,
  },
  {
    name: '头条',
    namespace: 'toutiao',
    test: /^www\.toutiao\.com\/(article|w)\/\d+\/?$/, // article/6884536349483860492、话题 w/1732500407565326
    use: toutiao,
  },
  {
    name: '微博',
    namespace: 'weibo',
    test: /^(www\.)?weibo.com\//,
    use: weibo,
  },
  {
    name: '微博文章',
    namespace: 'weibo',
    test: /^(www\.)?weibo.com\/ttarticle\/p\/show$/,
    use: weiboArticle,
  },
  {
    name: '微博动态',
    namespace: 'weibo',
    test: /^d\.weibo\.com\//,
    use: weiboDynamic,
  },
  {
    name: '谷歌',
    namespace: 'google',
    test: /^www\.google\..{2,7}search$/, // 应该足够覆盖各个域名
    use: google,
  },
  {
    name: 'CSDN',
    namespace: 'csdn',
    test: /^blog\.csdn\.net\/(\w|-)+\/article\/details\//,
    use: csdn,
  },
  {
    name: '米游社',
    namespace: 'mihoyoBBS',
    // ys|bh2|bh3|wd|dby 对应：原神 崩坏2 崩坏3 未定 大别野
    // 只用到原神，暂不对其它作处理
    test: /^bbs.mihoyo.com\/(ys)\/article\//,
    use: mihoyoBBS,
  },
]

export default sites
