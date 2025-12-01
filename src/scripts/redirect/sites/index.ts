import { $ } from '@/utils/selector'
import { parse } from '@/utils/querystring'
import { weibo } from './t-cn'
import { weixin } from './mp-weixin-qq-com'
import { weixin as weixin2 } from './weixin110-qq-com'
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
      'mail.qq.com/cgi-bin/readtemplate', // 好像不用登录也可以 gourl
      'mail.qq.com/cgi-bin/mail_spam', // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转 url
      'wx.mail.qq.com/xmspamcheck/xmsafejump', // url
    ],
    use: () => ({
      link: parse().gourl || parse().url,
    }),
  },
  {
    name: 'QQPC',
    test: /^c\.pc\.qq\.com\/middle(m|ct).html/,
    use: () => ({
      query: 'pfurl',
    }),
  },
  {
    // 被阻止访问
    name: 'QQNT',
    test: /^c\.pc\.qq\.com\/(pc|ios|android)\.html/,
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
    test: /^mp\.weixin\.qq\.com\/s\//,
    use: weixin,
  },
  {
    name: '微信2',
    test: /^weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
    readyState: 'interactive',
    use: weixin2,
  },
  {
    name: '微信3',
    test: /^mp\.weixin\.qq\.com\/mp\/readtemplate/,
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: '企业微信',
    test: 'open.work.weixin.qq.com/wwopen/uriconfirm',
    use: () => ({
      query: 'uri',
    }),
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
    test: [
      'afdian.net/link',
      'afdian.com/link',
      'ifdian.net/link',
    ],
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
    test: /security\.feishu\.cn\/link\/safety(\/block_template)?/,
    use: () => ({
      link: parse().target || parse().url,
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
      link: parse().url || parse().u,
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
    test: /^(niu\.)?sspai\.com\/link/, // 有两个域名
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
  },
  {
    name: '腾讯云开发者社区',
    test: 'cloud.tencent.com/developer/tools/blog-entry',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '腾讯兔小巢',
    // 两个域名
    test: /^(support|txc)\.qq\.com\/products\/\d+\/link-jump$/,
    use: () => ({
      query: 'jump',
    }),
  },
  {
    name: '云栖社区',
    test: 'yq.aliyun.com/go/articleRenderRedirect',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: 'NodeSeek',
    test: 'www.nodeseek.com/jump',
    use: () => ({
      query: 'to',
    }),
  },
  {
    name: '亿企查',
    test: 'www.yiqicha.com/thirdPage',
    use: () => ({
      query: 'link',
    }),
  },
  {
    name: '异次元软件',
    test: 'www.iplaysoft.com/link/',
    readyState: 'interactive',
    use: () => ({
      selector: '#targetUrl > a',
    }),
  },
  {
    name: 'HelloGitHub',
    test: 'hellogithub.com/periodical/statistics/click',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '知更鸟',
    test: 'zmingcx.com/go.html',
    use: () => ({
      query: 'target',
    }),
  },
  {
    name: '巴哈姆特',
    test: 'ref.gamer.com.tw/redir.php',
    use: () => ({
      query: 'url',
    }),
  },
  {
    name: 'ABABTOOLS',
    test: 'ababtools.com/',
    use: () => ({
      query: 'url',
    }),
  },
]

export default sites
