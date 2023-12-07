import { RouteRecordRaw } from "vue-router";


const carRoutes: Array<RouteRecordRaw> = [
    {
        path : "/cars",
        name : "cars",
        component : () => import('car@/core/pages/CarList.vue') 
    },
    {
        path : "/cars/:id",
        name : "car-detail",
        component : () => import('car@/core/pages/CarDetail.vue') 
    }
]


export default carRoutes;