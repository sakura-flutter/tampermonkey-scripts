import { $ } from '@/utils/selector'
import { parse } from '@/utils/querystring'
import { weibo } from './t-cn'
import { weixin } from './weixin110-qq-com'
import { doc360 } from './www-360doc-com'
import { pixiv } from './www-pixiv-net'
import type { Site } from '../types'

const sites: Site[] = [
  {
    name: '简书',
    test: 'www.jianshu.com/go-wild',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '知乎',
    test: 'link.zhihu.com/',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '微博',
    test: /^t\.cn\//,
    readyState: 'interactive',
    use: weibo,
  },
  {
    name: '微博', // 不同规则
    test: 'weibo.cn/sinaurl',
    use: () => ({
      link: parse().toasturl || parse().u,
    }),
  },
  {
    name: 'QQ邮箱',
    test: [
      /^mail\.qq\.com\/cgi-bin\/readtemplate/, // 好像不用登录也可以
      /^mail\.qq\.com\/cgi-bin\/mail_spam/, // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转
    ],
    use: () => ({
      link: parse().url || parse().gourl,
    }),
  },
  {
    name: 'QQPC',
    test: 'c.pc.qq.com/middlem.html',
    use: () => ({
      query: 'pfurl',
    }),
  },
  {
    // 被阻止访问
    name: 'QQPC2',
    test: 'c.pc.qq.com/pc.html',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: 'QQNT',
    test: 'c.pc.qq.com/ios.html',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '腾讯文档',
    test: 'docs.qq.com/scenario/link.html',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '印象笔记',
    test: /^app\.yinxiang\.com\/OutboundRedirect/,
    use: () => ({
      query: 'dest',
    }),
  },
  {
    name: '贴吧',
    test: /^jump2?\.bdimg\.com\/safecheck/, // 以前的地址没有 2
    readyState: 'interactive',
    use: () => ({
      selector: '.warning_info a:nth-of-type(1)[href]',
      attr: 'href',
    }),
  },
  {
    name: 'CSDN',
    test: 'link.csdn.net/',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: 'YouTube',
    test: 'www.youtube.com/redirect',
    use: () => ({
      query: 'q',
    }),
  },
  {
    name: '微信',
    test: /^weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
    readyState: 'interactive',
    use: weixin,
  },
  {
    name: '微信开放社区',
    test: 'developers.weixin.qq.com/community/middlepage/href',
    use: () => ({
      query: 'href',
    }),
  },
  {
    name: '开发者知识库',
    test: /^www\.itdaan.com\/link\//,
    readyState: 'interactive',
    use: () => ({
      selector: '.safety-url',
    }),
  },
  {
    name: '豆瓣',
    test: 'www.douban.com/link2/',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '个人图书馆',
    test: /^www\.360doc.com\/content\//,
    readyState: 'interactive',
    use: doc360,
  },
  {
    name: 'Pixiv',
    test: 'www.pixiv.net/jump.php',
    use: pixiv,
  },
  {
    name: '搜狗',
    test: /^m\.sogou\.com.*tc$/,
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: 'Google',
    test: /^www\.google\..{2,7}url$/,
    use: () => ({
      link: parse().url || parse().q,
    }),
  },
  {
    name: '站长之家',
    test: 'www.chinaz.com/go.shtml',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: 'OSCHINA',
    test: 'www.oschina.net/action/GoToLink',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '掘金',
    test: 'link.juejin.cn/',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: 'pc6下载站',
    test: 'www.pc6.com/goread.html',
    use: () => ({
      query: 'gourl',
    }),
  },
  {
    name: '爱发电',
    test: 'afdian.net/link',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: 'Gitee',
    test: 'gitee.com/link',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '天眼查',
    test: 'www.tianyancha.com/security',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '爱企查',
    test: 'aiqicha.baidu.com/safetip',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '企查查',
    test: 'www.qcc.com/web/transfer-link',
    use: () => ({
      query: 'link',
    }),
  },
  {
    name: '优设网',
    test: 'link.uisdc.com/',
    use: () => ({
      query: 'redirect',
    }),
  },
  {
    name: '51CTO',
    test: 'blog.51cto.com/transfer',
    use: () => ({
      link: location.search.slice(1),
    }),
  },
  {
    name: '力扣',
    test: 'leetcode.cn/link/',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '花瓣网',
    test: 'huaban.com/go',
    readyState: 'interactive',
    use: () => {
      const nextData = JSON.parse(($('#__NEXT_DATA__') as HTMLScriptElement).textContent!)
      return {
        link: nextData.props.pageProps?.data.link,
      }
    },
  },
  {
    name: '飞书',
    test: 'security.feishu.cn/link/safety',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: 'Epic',
    test: /^redirect\.epicgames\.com\//,
    use: () => ({
      query: 'redirectTo',
    }),
  },
  {
    name: 'Steam',
    test: 'steamcommunity.com/linkfilter/',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '语雀',
    test: /\.yuque\.com\/r\/goto(\/?)$/,
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '牛客网',
    test: 'hd.nowcoder.com/link.html',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '哔哩哔哩',
    test: 'game.bilibili.com/linkfilter/',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '少数派',
    test: 'sspai.com/link',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '5ch',
    test: 'jump.5ch.net/',
    use: () => ({
      link: location.search.slice(1),
    }),
  },
  {
    name: '金山文档',
    test: 'www.kdocs.cn/office/link',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '石墨文档',
    test: 'shimo.im/outlink/black',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: 'urlshare',
    test: 'google.urlshare.cn/umirror_url_check',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '酷安',
    test: 'www.coolapk.com/link',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '网盘分享',
    test: 'wpfx.org/go/',
    use: () => ({
      query: 'url',
    }),
  }, {
    name: '腾讯云开发者社区',
    test: 'cloud.tencent.com/developer/tools/blog-entry',
    use: () => ({
      query: 'target',
    }),
  },
]

export default sites
