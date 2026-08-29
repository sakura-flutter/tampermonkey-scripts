import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: 'Pixiv 工具箱',
      description: '增强P站查看原图功能；显示原图尺寸',
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
      match: ['https://www.pixiv.net', 'https://www.pixiv.net/*'],
    },
    build: {
      externalGlobals: {
        viewerjs: [
          'Viewer',
          version => `https://unpkg.com/viewerjs@${version}/dist/viewer${env.command === 'build' ? '.min' : ''}.js`,
        ],
      },
      externalResource: {
        'viewerjs/dist/viewer.css': pkg =>
          `https://unpkg.com/viewerjs@${pkg.version}/dist/viewer${env.command === 'build' ? '.min' : ''}.css`,
      },
    },
  }),
)
