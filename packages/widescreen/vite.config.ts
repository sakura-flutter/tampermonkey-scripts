import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

const matches = [
  'https://mp.weixin.qq.com/s*',
  'https://www.zhihu.com/*',
  'https://zhuanlan.zhihu.com/p/*',
  'https://juejin.cn/post/*',
  'https://www.jianshu.com/p/*',
  'https://tieba.baidu.com/*',
  'https://segmentfault.com/a/*',
  'https://segmentfault.com/q/*',
  'https://www.bilibili.com/read/cv*',
  'https://www.bilibili.com/opus/*',
  'https://t.bilibili.com/*',
  'https://space.bilibili.com/*',
  'https://weibo.com/*',
  'https://www.weibo.com/*',
  'https://d.weibo.com/*',
  'https://s.weibo.com/*',
  'https://www.douban.com/gallery/*',
  'https://www.douban.com/note/*',
  'https://movie.douban.com/subject/*',
  'https://movie.douban.com/review/*',
  'https://www.toutiao.com/*',
  'https://crates.io/*',
  'https://www.miyoushe.com/ys/article/*',
]

const includes = [/^https:\/\/www\.google\..{2,7}search/]

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '网页宽屏',
      description:
        '适配了微信公众号、知乎、掘金、简书、贴吧、segmentfault、哔哩哔哩、微博、豆瓣、今日头条、Google、crates.io、米游社原神',
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
  }),
)
