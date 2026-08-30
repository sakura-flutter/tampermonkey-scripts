import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import autoprefixer from 'autoprefixer'
import vueJsx from '@vitejs/plugin-vue-jsx'
import lazyCss from '@monkey/vite-plugin-lazy-css'
import monkey, { type MonkeyOption } from 'vite-plugin-monkey'
import type { ConfigEnv, UserConfig } from 'vite'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const browsers = ['chrome130', 'edge130', 'firefox140']
const cssBrowsers = ['Chrome >= 130', 'Edge >= 130', 'Firefox >= 140']

function readPackageManifest(packageRoot: string): { name?: string } {
  const manifestPath = path.join(packageRoot, 'package.json')

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`[vite-userscript] 无法找到脚本包的 package.json：${manifestPath}`)
  }

  return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { name?: string }
}

/**
 * 去掉 @scope/ 前缀得到脚本名
 */
function resolveScriptName(name: string): string {
  return name.replace(/^@[^/]+\//, '')
}

type UserScriptOption = Omit<MonkeyOption, 'entry'> & Partial<Pick<MonkeyOption, 'entry'>>

export function defineUserScriptConfig(
  env: ConfigEnv,
  configUrl: string | URL,
  scriptOption: UserScriptOption,
): UserConfig {
  const packageRoot = path.dirname(fileURLToPath(configUrl))
  const manifestPath = path.join(packageRoot, 'package.json')
  const { name } = readPackageManifest(packageRoot)

  if (!name?.startsWith('@monkey/')) {
    throw new Error(`[vite-userscript] package.json 的 name 必须使用 @monkey/ 作用域：${manifestPath}`)
  }

  // 先简单覆盖下
  if (env.mode !== 'production') {
    process.env.NODE_ENV = env.mode
  }

  const scriptName = resolveScriptName(name)
  const monkeyOption: MonkeyOption = {
    ...scriptOption,
    entry: scriptOption.entry ? path.resolve(packageRoot, scriptOption.entry) : path.join(packageRoot, 'src/index.ts'),
    build: {
      ...scriptOption.build,
      fileName: scriptOption.build?.fileName ?? `${scriptName}.js`,
    },
  }

  return {
    root: packageRoot,
    // resolve: {
    //   alias: {
    //     '@': path.resolve(packageRoot, 'src'),
    //   },
    // },
    css: {
      postcss: { plugins: [autoprefixer({ overrideBrowserslist: cssBrowsers })] },
    },
    build: {
      outDir: path.resolve(repositoryRoot, 'dist'),
      emptyOutDir: false,
      target: browsers,
      minify: false,
      cssMinify: false,
    },
    plugins: [lazyCss(), vueJsx(), monkey(monkeyOption)],
  }
}
