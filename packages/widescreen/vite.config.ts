import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'
import { pageScopePlugin } from './plugins/page-scope'

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

export default defineConfig(env => {
  const baseConfig = defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '网页宽屏',
      description:
        '适配了微信公众号、知乎、掘金、简书、贴吧、segmentfault、哔哩哔哩、微博、豆瓣、今日头条、Google、crates.io、米游社原神',
      'run-at': 'document-start',
      noframes: true,
      match: matches,
      include: includes,
    },
  })

  const postcss = baseConfig.css?.postcss
  const postcssConfig =
    postcss && typeof postcss === 'object' && !Array.isArray(postcss) ? (postcss as { plugins?: unknown[] }) : undefined

  const css = {
    ...baseConfig.css,
    postcss: {
      ...postcssConfig,
      plugins: [pageScopePlugin(), ...(postcssConfig?.plugins ?? [])],
    },
  } as typeof baseConfig.css

  return {
    ...baseConfig,
    css,
  }
})
