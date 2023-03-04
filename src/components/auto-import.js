// import camelCase from "lodash/camelCase"
// import upperFirst from "lodash/upperFirst"
// import remove from "lodash/remove"
// import xor from "lodash/xor"
import { camelCase,upperFirst,remove,xor } from "lodash-es"

// 全部文件目录  ['./lunchbox/xxx.vue','./element-ui/xxx.vue',...]
const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /(.*?)\.(vue)$/
)
// 要移除的文件目录 lunchbox ['./lunchbox/xxx.vue']
const lunchboxComponent = require.context('./', true, /lunchbox\/(.*?)\.(vue)$/)

export default function autoImportComponents(app) {
    /// ////////////////////////////////////////////////////////////////////////////
    /// 全局通用组件注册
    /// 通用组件注册前缀名
    /// ////////////////////////////////////////////////////////////////////////////

    // 取完交集后剩下要全局注册的文件
    const registerComponents=xor(requireComponent.keys(), lunchboxComponent.keys())
    console.log('registerComponents---',registerComponents)
    remove(registerComponents, (file) => file !== './auto-import.js').forEach(fileName => {
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
