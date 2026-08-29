import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '蓝湖 工具箱',
      description: '自动填充填写过的产品密码(不是蓝湖账户)；快捷查看打开过的项目',
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      $extra: [
        ['compatible', 'chrome Latest'],
        ['compatible', 'firefox Latest'],
        ['compatible', 'edge Latest'],
      ],
      noframes: true,
      match: ['https://lanhuapp.com/web/'],
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
