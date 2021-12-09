import { jianshu } from './www-jianshu-com'
import { zhihu } from './link-zhihu-com'
import { weibo } from './t-cn'
import { weibo as weibo2 } from './weibo-cn'
import { qqMail } from './mail-qq-com'
import { qqPC } from './c-pc-qq-com'
import { qqDocs } from './docs-qq-com'
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
import { sogou } from './m-sogou-com'
import { google } from './www-google-com'
import { chinaz } from './www-chinaz-com'
import { oschina } from './www-oschina-net'
import { juejin } from './link-juejin-cn'
import { pc6 } from './www-pc6-com'
import { afdian } from './afdian-net'
import { gitee } from './gitee-com'

const sites = [
  {
    name: '简书',
    test: 'www.jianshu.com/go-wild',
    use: jianshu,
  },
  {
    name: '知乎',
    test: 'link.zhihu.com/',
    use: zhihu,
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
    use: weibo2,
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
    test: 'c.pc.qq.com/middlem.html',
    use: qqPC,
  },
  {
    name: '腾讯文档',
    test: 'docs.qq.com/scenario/link.html',
    use: qqDocs,
  },
  {
    name: '印象笔记',
    test: /^app\.yinxiang\.com\/OutboundRedirect/,
    use: yinxiang,
  },
  {
    name: '贴吧',
    test: /^jump2?\.bdimg\.com\/safecheck/, // 以前的地址没有 2
    readyState: 'interactive',
    use: tieba,
  },
  {
    name: 'CSDN',
    test: 'link.csdn.net/',
    use: csdn,
  },
  {
    name: 'YouTube',
    test: 'www.youtube.com/redirect',
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
    test: 'developers.weixin.qq.com/community/middlepage/href',
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
    test: 'www.douban.com/link2/',
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
    test: 'www.pixiv.net/jump.php',
    use: pixiv,
  },
  {
    name: '搜狗',
    test: /^m\.sogou\.com.*tc$/,
    use: sogou,
  },
  {
    name: 'Google',
    test: /^www\.google\..{2,7}url$/,
    use: google,
  },
  {
    name: '站长之家',
    test: 'www.chinaz.com/go.shtml',
    use: chinaz,
  },
  {
    name: 'OSCHINA',
    test: 'www.oschina.net/action/GoToLink',
    use: oschina,
  },
  {
    name: '掘金',
    test: 'link.juejin.cn/',
    use: juejin,
  },
  {
    name: 'pc6下载站',
    test: 'www.pc6.com/goread.html',
    use: pc6,
  },
  {
    name: '爱发电',
    test: 'afdian.net/link',
    use: afdian,
  },
  {
    name: 'Gitee',
    test: 'gitee.com/link',
    use: gitee,
  },
]

export default sites
