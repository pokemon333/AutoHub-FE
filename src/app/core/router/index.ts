import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import carRoutes from 'car@/core/router';
import landingRoutes from 'landing@/router';
import evseRoutes from 'evse@/router'

const routes: Array<RouteRecordRaw> = [
    ...carRoutes,
    ...landingRoutes,
    ...evseRoutes
]
const router = createRouter({
    history: createWebHistory(),
    routes, 
})

export default router;