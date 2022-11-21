import { createRouter, createWebHashHistory } from "vue-router"

import Home from '@/views/index.vue'
import LunchBox from "@/views/lunch-box.vue"

const routes = [
    { path: '/', component: Home },
    {
        path: '/lunchbox',
        component: (resolve) => require(['@/views/lunch-box.vue'], resolve)
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
