import { zhihuSite } from './zhihu-com/site'
import { zhuanlanSite } from './zhuanlan-zhihu-com/site'
import { bilibiliSite } from './www-bilibili-com/site'
import { bilibiliDynamicSite } from './t-bilibili-com/site'
import { bilibiliSpaceSite } from './space-bilibili-com/site'
import { miyousheSite } from './www-miyoushe-com/site'
import { cratesSite } from './crates-io/site'
import { jianshuSite } from './jianshu-com/site'
import { juejinSite } from './juejin-cn/site'
import { weixinSite } from './mp-weixin-qq-com/site'
import { segmentfaultSite } from './segmentfault-com/site'
import { googleSites } from './www-google-com/site'
import { toutiaoSite } from './www-toutiao-com/site'
import { tiebaSite } from './tieba-baidu-com/site'
import { doubanSite } from './www-douban-com/site'
import { movieDoubanSite } from './movie-douban-com/site'
import { weiboSite, wwwWeiboSite } from './weibo-com/site'
import { weiboDynamicSite } from './d-weibo-com/site'
import { weiboSearchSite } from './s-weibo-com/site'

export default [
  zhihuSite,
  zhuanlanSite,
  bilibiliSite,
  bilibiliDynamicSite,
  bilibiliSpaceSite,
  miyousheSite,
  cratesSite,
  jianshuSite,
  juejinSite,
  weixinSite,
  segmentfaultSite,
  ...googleSites,
  toutiaoSite,
  tiebaSite,
  doubanSite,
  movieDoubanSite,
  weiboSite,
  wwwWeiboSite,
  weiboDynamicSite,
  weiboSearchSite,
]
