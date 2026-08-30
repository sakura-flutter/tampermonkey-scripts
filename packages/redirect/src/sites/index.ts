import { $ } from '@monkey/shared/utils'
import { weibo } from './t-cn'
import { weixin } from './mp-weixin-qq-com'
import { weixin as weixin2 } from './weixin110-qq-com'
import { doc360 } from './www-360doc-com'
import { pixiv } from './www-pixiv-net'
import { linuxDo } from './linux-do'
import type { Site } from '../types'

const sites: Site[] = [
  {
    name: '简书',
    match: 'www.jianshu.com/go-wild',
    parse: ({ query }) => query.url,
  },
  {
    name: '知乎',
    match: 'link.zhihu.com/',
    parse: ({ query }) => query.target,
  },
  {
    name: '微博',
    match: /^t\.cn\//,
    readyState: 'interactive',
    parse: weibo,
  },
  {
    name: '微博', // 不同规则
    match: 'weibo.cn/sinaurl',
    parse: ({ query }) => query.toasturl || query.u,
  },
  {
    name: 'QQ邮箱',
    match: [
      'mail.qq.com/cgi-bin/readtemplate', // 好像不用登录也可以 gourl
      'mail.qq.com/cgi-bin/mail_spam', // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转 url
      'wx.mail.qq.com/xmspamcheck/xmsafejump', // url
    ],
    parse: ({ query }) => query.gourl || query.url,
  },
  {
    name: 'QQPC',
    match: /^c\.pc\.qq\.com\/middle(m|ct).html/,
    parse: ({ query }) => query.pfurl,
  },
  {
    // 被阻止访问
    name: 'QQNT',
    match: /^c\.pc\.qq\.com\/(pc|ios|android)\.html/,
    parse: ({ query }) => query.url,
  },
  {
    name: '腾讯文档',
    match: 'docs.qq.com/scenario/link.html',
    parse: ({ query }) => query.url,
  },
  {
    name: '印象笔记',
    match: /^app\.yinxiang\.com\/OutboundRedirect/,
    parse: ({ query }) => query.dest,
  },
  {
    name: '贴吧',
    match: /^jump2?\.bdimg\.com\/safecheck/, // 以前的地址没有 2
    readyState: 'interactive',
    parse: () => ({
      selector: '.warning_info a:nth-of-type(1)[href]',
      attr: 'href',
    }),
  },
  {
    name: 'CSDN',
    match: 'link.csdn.net/',
    parse: ({ query }) => query.target,
  },
  {
    name: 'YouTube',
    match: 'www.youtube.com/redirect',
    parse: ({ query }) => query.q,
  },
  {
    name: '微信',
    match: /^mp\.weixin\.qq\.com\/s\//,
    parse: weixin,
  },
  {
    name: '微信2',
    match: /^weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
    readyState: 'interactive',
    parse: weixin2,
  },
  {
    name: '微信3',
    match: /^mp\.weixin\.qq\.com\/mp\/readtemplate/,
    parse: ({ query }) => query.url,
  },
  {
    name: '企业微信',
    match: 'open.work.weixin.qq.com/wwopen/uriconfirm',
    parse: ({ query }) => query.uri,
  },
  {
    name: '微信开放社区',
    match: 'developers.weixin.qq.com/community/middlepage/href',
    parse: ({ query }) => query.href,
  },
  {
    name: '开发者知识库',
    match: /^www\.itdaan.com\/link\//,
    readyState: 'interactive',
    parse: () => ({
      selector: '.safety-url',
    }),
  },
  {
    name: '豆瓣',
    match: 'www.douban.com/link2/',
    parse: ({ query }) => query.url,
  },
  {
    name: '个人图书馆',
    match: /^www\.360doc.com\/content\//,
    readyState: 'interactive',
    parse: doc360,
  },
  {
    name: 'Pixiv',
    match: 'www.pixiv.net/jump.php',
    parse: pixiv,
  },
  {
    name: '搜狗',
    match: /^m\.sogou\.com.*tc$/,
    parse: ({ query }) => query.url,
  },
  {
    name: 'Google',
    match: /^www\.google\..{2,7}url$/,
    parse: ({ query }) => query.url || query.q,
  },
  {
    name: '站长之家',
    match: 'www.chinaz.com/go.shtml',
    parse: ({ query }) => query.url,
  },
  {
    name: 'OSCHINA',
    match: 'www.oschina.net/action/GoToLink',
    parse: ({ query }) => query.url,
  },
  {
    name: '掘金',
    match: 'link.juejin.cn/',
    parse: ({ query }) => query.target,
  },
  {
    name: 'pc6下载站',
    match: 'www.pc6.com/goread.html',
    parse: ({ query }) => query.gourl,
  },
  {
    name: '爱发电',
    match: ['afdian.net/link', 'afdian.com/link', 'ifdian.net/link'],
    parse: ({ query }) => query.target,
  },
  {
    name: 'Gitee',
    match: 'gitee.com/link',
    parse: ({ query }) => query.target,
  },
  {
    name: '天眼查',
    match: 'www.tianyancha.com/security',
    parse: ({ query }) => query.target,
  },
  {
    name: '爱企查',
    match: 'aiqicha.baidu.com/safetip',
    parse: ({ query }) => query.target,
  },
  {
    name: '企查查',
    match: 'www.qcc.com/web/transfer-link',
    parse: ({ query }) => query.link,
  },
  {
    name: '优设网',
    match: 'link.uisdc.com/',
    parse: ({ query }) => query.redirect,
  },
  {
    name: '51CTO',
    match: 'blog.51cto.com/transfer',
    parse: () => location.search.slice(1),
  },
  {
    name: '力扣',
    match: 'leetcode.cn/link/',
    parse: ({ query }) => query.target,
  },
  {
    name: '花瓣网',
    match: 'huaban.com/go',
    readyState: 'interactive',
    parse: () => {
      const nextData = JSON.parse(($('#__NEXT_DATA__') as HTMLScriptElement).textContent!)
      return nextData.props.pageProps?.data.link
    },
  },
  {
    name: '飞书',
    match: /security\.feishu\.cn\/link\/safety(\/block_template)?/,
    parse: ({ query }) => query.target || query.url,
  },
  {
    name: 'Epic',
    match: /^redirect\.epicgames\.com\//,
    parse: ({ query }) => query.redirectTo,
  },
  {
    name: 'Steam',
    match: 'steamcommunity.com/linkfilter/',
    parse: ({ query }) => query.url || query.u,
  },
  {
    name: '语雀',
    match: /\.yuque\.com\/r\/goto(\/?)$/,
    parse: ({ query }) => query.url,
  },
  {
    name: '牛客网',
    match: 'hd.nowcoder.com/link.html',
    parse: ({ query }) => query.target,
  },
  {
    name: '哔哩哔哩',
    match: ['game.bilibili.com/linkfilter/', 'www.bilibili.com/york/link-middle-page/pc'],
    parse: ({ query }) => query.url || query.redirect_url,
  },
  {
    name: '少数派',
    match: /^(niu\.)?sspai\.com\/link/, // 有两个域名
    parse: ({ query }) => query.target,
  },
  {
    name: '5ch',
    match: 'jump.5ch.net/',
    parse: () => location.search.slice(1),
  },
  {
    name: '金山文档',
    match: 'www.kdocs.cn/office/link',
    parse: ({ query }) => query.target,
  },
  {
    name: '石墨文档',
    match: 'shimo.im/outlink/black',
    parse: ({ query }) => query.url,
  },
  {
    name: 'urlshare',
    match: 'google.urlshare.cn/umirror_url_check',
    parse: ({ query }) => query.url,
  },
  {
    name: '酷安',
    match: 'www.coolapk.com/link',
    parse: ({ query }) => query.url,
  },
  {
    name: '网盘分享',
    match: 'wpfx.org/go/',
    parse: ({ query }) => query.url,
  },
  {
    name: '腾讯云开发者社区',
    match: 'cloud.tencent.com/developer/tools/blog-entry',
    parse: ({ query }) => query.target,
  },
  {
    name: '腾讯兔小巢',
    // 两个域名
    match: /^(support|txc)\.qq\.com\/products\/\d+\/link-jump$/,
    parse: ({ query }) => query.jump,
  },
  {
    name: '云栖社区',
    match: 'yq.aliyun.com/go/articleRenderRedirect',
    parse: ({ query }) => query.url,
  },
  {
    name: 'NodeSeek',
    match: 'www.nodeseek.com/jump',
    parse: ({ query }) => query.to,
  },
  {
    name: '亿企查',
    match: 'www.yiqicha.com/thirdPage',
    parse: ({ query }) => query.link,
  },
  {
    name: '异次元软件',
    match: 'www.iplaysoft.com/link/',
    readyState: 'interactive',
    parse: () => ({
      selector: '#targetUrl > a',
    }),
  },
  {
    name: 'HelloGitHub',
    match: 'hellogithub.com/periodical/statistics/click',
    parse: ({ query }) => query.target,
  },
  {
    name: '知更鸟',
    match: 'zmingcx.com/go.html',
    parse: ({ query }) => query.target,
  },
  {
    name: '巴哈姆特',
    match: 'ref.gamer.com.tw/redir.php',
    parse: ({ query }) => query.url,
  },
  {
    name: 'ABABTOOLS',
    match: 'ababtools.com/',
    parse: ({ query }) => query.url,
  },
  {
    name: '阿里云帮助中心',
    match: 'help.aliyun.com/redirect',
    parse: ({ query }) => query.targetUrl,
  },
  {
    name: 'LINUX DO',
    match: /^linux\.do\//,
    parse: linuxDo,
  },
]

export default sites
