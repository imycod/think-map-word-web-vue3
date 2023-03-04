// 我们不自觉的成为了小布尔乔亚,在这生活中苦并乐着
import { createApp } from 'vue'
import App from './App.vue'

import pinia from './stores/index.js'

// import {lunchbox} from "lunchboxjs";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import("./assets/css/index.less")

import echarts from '@/utils/import-loader/echarts.js'
import router from "@/routers/index.js"

import autoImportComponents from "@/components/auto-import.js"

const app = createApp(App)
autoImportComponents(app)


console.log('process.env-----',process.env);
// mockjs
// if (process.env.NODE_ENV === 'development') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }


app.config.globalProperties.$echarts = echarts

// app.use(lunchbox)
app.use(pinia)
app.use(router)
app.mount('#app')
