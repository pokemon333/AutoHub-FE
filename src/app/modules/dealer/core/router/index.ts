import { RouteRecordRaw } from "vue-router";

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
            {
                path : "car-for-sale",
                name : "car-for-sale",
                component : () => import('../pages/CarForSale.vue')
            }
        ]
    },
]


export default dealerRoutes;