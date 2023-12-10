import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import carRoutes from 'car@/core/router';
import landingRoutes from 'landing@/router';
import evseRoutes from 'evse@/router'
import authRoutes from "auth@/router"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: ()=> import("../components/layout/Main.vue"),
        children: [
            ...landingRoutes,
            ...carRoutes,
            ...evseRoutes,
        ],
    },
    ...authRoutes,
    {
        path : '/404',
        name : 'not-found',
        component : () => import('../components/404.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect : '/404'
    }
  
]

const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router;