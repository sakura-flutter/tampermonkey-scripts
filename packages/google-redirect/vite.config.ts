import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '谷歌重定向',
      description: 'hk -> jp',
      'run-at': 'document-start',
      noframes: true,
      match: ['https://www.google.com.hk/search*'],
    },
  }),
)
