import { RouteRecordRaw } from "vue-router";

const dealerCarRoutes: Array<RouteRecordRaw> = [
            {
                path : "car-for-sale",
                name : "car-for-sale",
                component : () => import('../pages/CarForSale.vue')
            },
            {
                path : "car-for-sale/sell-my-car",
                name : "sell-my-car",
                component : () => import('../pages/SellMyCar.vue')
            },
            {
                path : "car-for-sale/sell-my-car/edit/:id",
                name : "dealer-car-edit",
                component : () => import('../pages/CarEdit.vue')
            }

]

export default dealerCarRoutes;
