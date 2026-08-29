import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: 'Element UI文档辅助',
      description: '在Element UI文档中增加示例目录导航，同时支持v2与v3(element-plus)版本，类似于Ant右侧悬浮的导航',
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      $extra: [
        ['compatible', 'chrome Latest'],
        ['compatible', 'firefox Latest'],
        ['compatible', 'edge Latest'],
      ],
      match: [
        'https://element-plus.gitee.io/*',
        'https://element-plus.org/*',
        'https://element.eleme.cn/*',
        'https://element.eleme.io/*',
      ],
    },
    build: {
      externalGlobals: {
        vue: [
          'Vue',
          version =>
            `https://unpkg.com/vue@${version}/dist/vue.runtime.global${env.command === 'build' ? '.prod.min' : ''}.js`,
        ],
      },
    },
  }),
)
