import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: 'Dark Mode 暗黑模式',
      description: '将网页变更为暗黑显示，不适合有背景图的网站',
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      $extra: [
        ['compatible', 'chrome >= Latest'],
        ['compatible', 'firefox >= Latest'],
      ],
      'run-at': 'document-start',
      match: ['*://*/*'],
    },
  }),
)
