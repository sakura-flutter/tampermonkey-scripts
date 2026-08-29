import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: '百度贴吧签到',
      description: '网页版签到或模拟客户端签到，模拟客户端可获得与客户端相同经验并且签到速度更快~',
      author: 'sakura-flutter',
      namespace: 'https://github.com/sakura-flutter/tampermonkey-scripts',
      license: 'MIT',
      $extra: [
        ['compatible', 'chrome Latest'],
        ['compatible', 'firefox Latest'],
        ['compatible', 'edge Latest'],
      ],
      'run-at': 'document-end',
      match: ['https://tieba.baidu.com/index.html', 'https://tieba.baidu.com/'],
      connect: ['tieba.baidu.com'],
    },
    build: {
      externalGlobals: {
        'crypto-js/md5': [
          'CryptoJS.MD5',
          version => `https://unpkg.com/crypto-js@${version}/core.js`,
          version => `https://unpkg.com/crypto-js@${version}/md5.js`,
        ],
        vue: [
          'Vue',
          version =>
            `https://unpkg.com/vue@${version}/dist/vue.runtime.global${env.command === 'build' ? '.prod' : ''}.js`,
        ],
      },
    },
  }),
)
