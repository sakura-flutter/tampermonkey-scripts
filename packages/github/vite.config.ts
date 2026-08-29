import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: { '': 'GitHub 工具箱', en: 'GitHub ToolBox' },
      description: { '': '添加用 VS Code 阅读代码按钮(github1s)', en: 'Read code with VS Code(github1s)' },
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      $extra: [
        ['compatible', 'chrome Latest'],
        ['compatible', 'firefox Latest'],
        ['compatible', 'edge Latest'],
      ],
      noframes: true,
      grant: ['window.onurlchange'],
      match: ['https://github.com/*'],
    },
  }),
)
