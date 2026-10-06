import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: 'bilibili 工具箱',
      description: '长按 S 键倍速播放',
      noframes: true,
      match: ['https://www.bilibili.com/video/*', 'https://www.bilibili.com/bangumi/play/*'],
    },
  }),
)
