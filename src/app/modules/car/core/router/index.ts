import { RouteRecordRaw } from "vue-router";


const carRoutes: Array<RouteRecordRaw> = [
    {
        path : "/cars",
        name : "cars",
        component : () => import('../pages/CarList.vue') 
    },
    {
        path : "/cars/:id/:type",
        name : "car-detail",
        meta : {
            guards : [ "DealerAccept"]
        },
        component : () => import('../pages/CarDetail.vue') 
    }
]


export default carRoutes;