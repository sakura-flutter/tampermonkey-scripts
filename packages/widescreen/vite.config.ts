import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

const matches = [
  'https://bcy.net/item/detail/*',
  'https://mp.weixin.qq.com/s*',
  'https://zhuanlan.zhihu.com/p/*',
  'https://www.zhihu.com/question/*',
  'https://www.zhihu.com/',
  'https://www.zhihu.com/follow',
  'https://www.zhihu.com/hot*',
  'https://www.zhihu.com/topic*',
  'https://juejin.cn/post/*',
  'https://www.jianshu.com/p/*',
  'https://www.baidu.com/s*',
  'https://www.baidu.com/?*',
  'https://www.baidu.com/',
  'https://www.sogou.com/web*',
  'https://tieba.baidu.com/p/*',
  'https://tieba.baidu.com/f?*',
  'https://segmentfault.com/a/*',
  'https://segmentfault.com/q/*',
  'https://www.bilibili.com/read/cv*',
  'https://t.bilibili.com/*',
  'https://space.bilibili.com/*',
  'https://www.weibo.com/*',
  'https://weibo.com/*',
  'https://d.weibo.com/*',
  'https://www.douban.com/gallery/*',
  'https://www.douban.com/note/*',
  'https://movie.douban.com/subject/*',
  'https://movie.douban.com/review/*',
  'https://www.toutiao.com/*',
  'https://crates.io/crates/*',
  'https://bbs.mihoyo.com/*',
]

const includes = [/^https:\/\/www\.google\..{2,7}search/, /^https:\/\/blog\.csdn\.net\/(\w|-)+\/article\/details\//]

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '网页宽屏',
      description:
        '适配了半次元、微信公众号、知乎、掘金、简书、贴吧、百度搜索、搜狗搜索、segmentfault、哔哩哔哩、微博、豆瓣、今日头条、Google、CSDN、crates.io、米游社原神',
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      $extra: [
        ['compatible', 'chrome Latest'],
        ['compatible', 'firefox Latest'],
        ['compatible', 'edge Latest'],
      ],
      'run-at': 'document-start',
      noframes: true,
      match: matches,
      include: includes,
    },
    build: {
      externalGlobals: {
        vue: [
          'Vue',
          version =>
            `https://unpkg.com/vue@${version}/dist/vue.runtime.global${env.command === 'build' ? '.prod' : ''}.js`,
        ],
      },
    },
  }),
)
