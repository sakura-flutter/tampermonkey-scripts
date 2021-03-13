import { jianshu } from './www-jianshu-com'
import { zhihu } from './link-zhihu-com'
import { weibo } from './t-cn'
import { qqMail } from './mail-qq-com'
import { qqPC } from './c-pc-qq-com'
import { yinxiang } from './app-yinxiang-com'
import { tieba } from './jump2-bdimg-com'
import { csdn } from './link-csdn-net'
import { youtube } from './www-youtube-com'
import { weixin } from './weixin110-qq-com'
import { weixinDevelopers } from './developers-weixin-qq-com'
import { itdaan } from './www-itdaan-com'
import { douban } from './www-douban-com'
import { doc360 } from './www-360doc-com'
import { pixiv } from './www-pixiv-net'

const sites = [
  {
    name: '简书',
    test: /^www\.jianshu\.com\/go-wild$/,
    use: jianshu,
  },
  {
    name: '知乎',
    test: /^link\.zhihu\.com\/$/,
    use: zhihu,
  },
  {
    name: '微博',
    test: /^t\.cn\//,
    readyState: 'interactive',
    use: weibo,
  },
  {
    name: 'QQ邮箱',
    test: [
      /^mail\.qq\.com\/cgi-bin\/readtemplate/, // 好像不用登录也可以
      /^mail\.qq\.com\/cgi-bin\/mail_spam/, // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转
    ],
    use: qqMail,
  },
  {
    name: 'QQPC',
    test: /^c\.pc\.qq.com\/middlem\.html$/,
    use: qqPC,
  },
  {
    name: '印象笔记',
    test: /^app\.yinxiang\.com\/OutboundRedirect/,
    use: yinxiang,
  },
  {
    name: '贴吧',
    test: /^jump2\.bdimg\.com\/safecheck/,
    readyState: 'interactive',
    use: tieba,
  },
  {
    name: 'CSDN',
    test: /^link\.csdn\.net\/$/,
    use: csdn,
  },
  {
    name: 'YouTube',
    test: /^www\.youtube\.com\/redirect$/,
    use: youtube,
  },
  {
    name: '微信',
    test: /^weixin110\.qq\.com\/cgi-bin\/mmspamsupport-bin\/newredirectconfirmcgi/,
    readyState: 'interactive',
    use: weixin,
  },
  {
    name: '微信开放社区',
    test: /^developers\.weixin\.qq\.com\/community\/middlepage\/href$/,
    use: weixinDevelopers,
  },
  {
    name: '开发者知识库',
    test: /^www\.itdaan.com\/link\//,
    readyState: 'interactive',
    use: itdaan,
  },
  {
    name: '豆瓣',
    test: /^www\.douban.com\/link2/,
    use: douban,
  },
  {
    name: '个人图书馆',
    test: /^www\.360doc.com\/content\//,
    readyState: 'interactive',
    use: doc360,
  },
  {
    name: 'Pixiv',
    test: /^www\.pixiv\.net\/jump.php$/,
    use: pixiv,
  },
]

export default sites
