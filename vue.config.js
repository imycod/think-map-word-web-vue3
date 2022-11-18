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
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      }
    },
    plugins: [
      ...ElementPlusNeedsResolve,
    ]
  },
})
