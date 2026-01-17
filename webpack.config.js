import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import semver from 'semver'
import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import StylelintPlugin from 'stylelint-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
// import { CopyPlugin } from 'copy-webpack-plugin'
import packageInfo from './package.json' with { type: 'json' }

const require = createRequire(import.meta.url)

/** 获取所有安装的依赖版本 */
function getPkgDepsVersion() {
  const deps = {
    ...packageInfo.devDependencies,
    ...packageInfo.dependencies,
  }
  for (const pkgName in deps) {
    if (Object.hasOwn(deps, pkgName)) {
      const semverVersion = deps[pkgName]
      deps[pkgName] = semver.coerce(semverVersion).version
    }
  }
  return deps
}

const depsVersion = getPkgDepsVersion()

function getScriptHeader(filename, argvMode) {
  const filepath = path.join(import.meta.dirname, './src/scripts-header', `${filename}.js`)
  const isProd = argvMode === 'production'
  return fs.existsSync(filepath) ? require(filepath).default(isProd, depsVersion) : ''
}

export default (env, argv) => ({
  devtool: false,
  entry: {
    lanhu: './src/scripts/lanhu',
    tieba: './src/scripts/tieba',
    widescreen: './src/scripts/widescreen',
    redirect: './src/scripts/redirect',
    pixiv: './src/scripts/pixiv',
    github: './src/scripts/github',
    bilibili: './src/scripts/bilibili',
    'view-ui': './src/scripts/view-ui',
    'element-ui': './src/scripts/element-ui',
    'mdn-web-docs': './src/scripts/mdn-web-docs',
    'google-redirect': './src/scripts/google-redirect',
    'playback-rate': './src/scripts/playback-rate',
    toast: './src/helpers/toast',
  },
  output: {
    path: path.join(import.meta.dirname, 'dist'),
    publicPath: '/',
  },
  externals: {
    vue: 'Vue',
    viewerjs: 'Viewer',
    'crypto-js/md5': 'CryptoJS.MD5',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.join(import.meta.dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: [/\.lazy\.s[ac]ss$/i, /\.string\.s[ac]ss$/i],
        use: ['style-loader', 'css-loader', 'postcss-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
      },
      {
        test: /\.lazy\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
          'css-loader',
          'postcss-loader',
          { loader: 'sass-loader', options: { api: 'modern' } },
        ],
      },
      {
        test: /\.string\.s[ac]ss$/i,
        use: ['css-loader', 'postcss-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 默认依赖 output path
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'mts', 'tsx', 'vue'],
      fix: true,
      failOnWarning: false,
      failOnError: false,
    }),
    new StylelintPlugin({
      fix: true,
    }),
    new webpack.BannerPlugin({
      banner: file => getScriptHeader(file.chunk.name, argv.mode),
      raw: true,
      entryOnly: true,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: path.join(import.meta.dirname, './src/helpers/toast.js') },
    //   ],
    // }),
  ],
  // 遵守 Greasy Fork 代码规定，不做最小化处理
  // https://greasyfork.org/zh-CN/help/code-rules
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: true,
          },
        },
      }),
    ],
  },
  devServer: {
    port: 8886,
    static: [
      {
        directory: path.resolve(import.meta.dirname, 'dist'),
      },
    ],
  },
})
