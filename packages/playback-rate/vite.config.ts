import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '视频倍速播放快捷键',
      description:
        '为网页视频添加统一的倍速播放快捷键：→ 方向键点按快进、长按倍速，← 方向键后退；长按 3 倍速，双击长按 6 倍速。适配了哔哩哔哩、抖音、小红书、知乎、微博、X、Facebook、Instagram、YouTube、腾讯视频、爱奇艺、优酷、PPTV、芒果TV、乐视视频、搜狐视频、咪咕视频、今日头条、极客时间',
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      'run-at': 'document-start',
      match: [
        '*://www.bilibili.com/*',
        '*://www.douyin.com/*',
        '*://www.xiaohongshu.com/*',
        '*://www.zhihu.com/*',
        '*://*.weibo.com/*',
        '*://x.com/*',
        '*://www.facebook.com/*',
        '*://www.instagram.com/*',
        '*://www.youtube.com/*',
        '*://v.qq.com/*',
        '*://www.iqiyi.com/*',
        '*://www.youku.com/*',
        '*://v.youku.com/*',
        '*://www.pptv.com/*',
        '*://v.pptv.com/*',
        '*://www.mgtv.com/*',
        '*://tv.le.com/*',
        '*://www.le.com/*',
        '*://tv.sohu.com/*',
        '*://www.miguvideo.com/*',
        '*://www.toutiao.com/*',
        '*://time.geekbang.org/*',
      ],
    },
  }),
)
