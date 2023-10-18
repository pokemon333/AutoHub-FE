import { RouteRecordRaw } from "vue-router";


const carRoutes: Array<RouteRecordRaw> = [
    {
        path : "/cars/lists",
        component : () => import('../pages/CarList.vue') 
    }
]


export default carRoutes;