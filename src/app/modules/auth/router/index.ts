import { RouteRecordRaw } from "vue-router";

const authRoutes: Array<RouteRecordRaw> = [
    {
        path : "/login",
        name : "login",
        meta : {
            guards : ['Login']
        },
        component : () => import('../pages/Login.vue') 
    },
]


export default authRoutes;