import { defineConfig } from 'vite-plus'
import { defineUserScriptConfig } from '@monkey/vite-userscript'

export default defineConfig(env =>
  defineUserScriptConfig(env, import.meta.url, {
    userscript: {
      name: 'View UI v4 文档辅助',
      description: '(原iView)隐藏文档中菜单项：Pro、物料',
      match: ['*://v4.iviewui.com/*'],
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
