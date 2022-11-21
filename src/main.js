import { createApp } from 'vue'
import App from './App.vue'
// import {lunchbox} from "lunchboxjs";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import("./assets/css/index.less")

import echarts from '@/utils/import-loader/echarts.js'
import router from "@/routers/index.js"

import autoImportComponents from "@/components/auto-import.js"

const app = createApp(App)
autoImportComponents(app)

app.config.globalProperties.$echarts = echarts

// app.use(lunchbox)
app.use(router)
app.mount('#app')
