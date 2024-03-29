const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')

const ElementPlusNeedsResolve = [
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
]

module.exports = defineConfig({
  lintOnSave: false,　　//关闭语法检查
  transpileDependencies: true,
  publicPath:'./',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: '@mdx-js/loader',
              /** @type {import('@mdx-js/loader').Options} */
              options: {}
            }
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      }
    },
    plugins: [
      ...ElementPlusNeedsResolve,
    ]
  },
  devServer:{
    // onBeforeSetupMiddleware: ({ app }) => require('./mock/mock-server.js')
  }
})
