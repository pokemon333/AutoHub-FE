import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import carRoutes from 'car@/core/router/index.ts';
import landingRoutes from 'landing@/router/index.ts';
import evseRoutes from 'evse@/router/index.ts'
import initMiddleware from "core@/middleware/coreMiddleware.ts"
import authRoutes from '@/app/modules/auth/router/index.ts';
import dealerRoutes from 'dealer@/core/router/index.ts';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: ()=> import("../components/layout/Main.vue"), 
        children: [
            ...landingRoutes,
            ...carRoutes,
            ...dealerRoutes,
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

initMiddleware(router);

export default router;