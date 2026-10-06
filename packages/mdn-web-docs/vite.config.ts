import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: 'MDN 文档辅助',
      description: '在提供中文语言的页面自动切换为中文',
      noframes: true,
      grant: ['window.onurlchange'],
      match: ['https://developer.mozilla.org/*'],
    },
  }),
)
