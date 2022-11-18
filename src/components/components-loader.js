/*
 * @Author: lpj 1248708823@qq.com
 * @Date: 2022-05-11 15:40:13
 * @LastEditors: lpj 1248708823@qq.com
 * @LastEditTime: 2022-06-27 14:37:36
 * @FilePath: \college-teaching\src\components\components-loader.ts
 */
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import remove from "lodash/remove"

const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /(.*?)\.(vue|js)$/
)
//  /gok-(.*?)\.(vue|js)$/
export default function autoImportComponents(app) {
    /// ////////////////////////////////////////////////////////////////////////////
    /// 全局通用组件注册
    /// 通用组件注册前缀名 gok****
    /// ////////////////////////////////////////////////////////////////////////////
    remove(requireComponent.keys(), (files) => files !== './components-loader.js').forEach(fileName => {
        const componentConfig = requireComponent(fileName)
        const componentName = upperFirst(
            // 获取和目录深度无关的文件名
            camelCase(
                fileName
                    ?.split('/')
                    ?.pop()
                    ?.replace(/\.\w+$/, '')
            )
        )
        // 全局注册组件
        app.component(
            componentName,
            // 如果这个组件选项是通过 `export default` 导出的，
            // 那么就会优先使用 `.default`，
            // 否则回退到使用模块的根。
            componentConfig.default || componentConfig
        )
    })
}
