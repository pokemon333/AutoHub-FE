import { RouteRecordRaw } from "vue-router";


const carRoutes: Array<RouteRecordRaw> = [
    {
        path : "/cars",
        name : "cars",
        component : () => import('../pages/CarList.vue') 
    }
]


export default carRoutes;