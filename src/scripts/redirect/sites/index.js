import { jianshu } from './www-jianshu-com'
import { zhihu } from './link-zhihu-com'
import { weibo } from './t-cn'
import { qqMail } from './mail-qq-com'
import { qqPC } from './c-pc-qq-com'
import { yinxiang } from './app-yinxiang-com'
import { tieba } from './jump2-bdimg-com'

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
    readyState: 'interactive',
    use: weibo,
  },
  {
    name: 'QQ邮箱',
    test: [
      /mail\.qq\.com\/cgi-bin\/readtemplate/, // 好像不用登录也可以
      /mail\.qq\.com\/cgi-bin\/mail_spam/, // 需要登录邮箱才可以，不过这里仍然可以帮忙跳转
    ],
    use: qqMail,
  },
  {
    name: 'QQPC',
    test: /c\.pc\.qq.com\/middlem\.html/,
    use: qqPC,
  },
  {
    name: '印象笔记',
    test: /app\.yinxiang\.com\/OutboundRedirect/,
    use: yinxiang,
  },
  {
    name: '贴吧',
    test: /jump2\.bdimg\.com\/safecheck/,
    readyState: 'interactive',
    use: tieba,
  },
]

export default sites
