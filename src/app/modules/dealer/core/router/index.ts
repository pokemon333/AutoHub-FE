import { RouteRecordRaw } from "vue-router";
import dealerCarRoutes from "dealer@/modules/car/router/index.ts"
const dealerRoutes: Array<RouteRecordRaw> = [
    {
        path : "/dealer",
        name : "dealer",
        meta : {
            guards : ["Auth"]
        },
        children : [
            {
                path : "profile",
                name : "dealer-profile",
                component : () => import('../pages/DealerProfile.vue')
            },
            ...dealerCarRoutes
       ]
    },
]


export default dealerRoutes;
