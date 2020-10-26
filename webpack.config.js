const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

function getScriptHeader(filename, argvMode) {
  const filepath = path.join(__dirname, './src/script-header', `${filename}.js`)
  const isProd = argvMode === 'production'
  return fs.existsSync(filepath) ? require(filepath)(isProd) : ''
}

module.exports = (env, argv) => ({
  devtool: false,
  entry: {
    lanhu: './src/lanhu',
    widescreen: './src/aggregation/widescreen',
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  externals: {
    vue: 'Vue',
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 默认依赖output path
    new webpack.BannerPlugin({
      banner: file => getScriptHeader(file.chunk.name, argv.mode),
      raw: true,
      entryOnly: true,
    }),
  ],
  // 遵守Greasy Fork代码规定，不做最小化处理
  // https://greasyfork.org/zh-CN/help/code-rules
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: true,
        },
      },
    })],
  },
})
