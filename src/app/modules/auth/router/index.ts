import { RouteRecordRaw } from "vue-router";

const carRoutes: Array<RouteRecordRaw> = [
    {
        path : "/login",
        name : "login",
        component : () => import('../pages/Login.vue') 
    },
]


export default carRoutes;