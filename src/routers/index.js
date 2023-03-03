import {createRouter, createWebHistory } from "vue-router"

import MainLayout from "@/layout/main.vue"
import Home from '@/views/index.vue'
import Creator from "@/views/creator/index.vue"

const routes = [
    {
        path: '/creator',
        component: Creator
    },
    {
        path: '/lunchbox',
        component: (resolve) => require(['@/views/lunch-box.vue'], resolve)
    },
    {
        path: '/',
        redirect: '/home',
        component: MainLayout,
        children: [
            {path: '/home', component: Home},
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
