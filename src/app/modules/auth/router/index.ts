import { RouteRecordRaw } from "vue-router";

const carRoutes: Array<RouteRecordRaw> = [
    {
        path : "/login",
        name : "login",
        component : () => import('auth@/pages/Login.vue') 
    },
]


export default carRoutes;