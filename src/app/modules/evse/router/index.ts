import { RouteRecordRaw } from "vue-router";

const landingRoutes : Array<RouteRecordRaw> = [
    {
        path : "/evses",
        name : 'evse',
        component : ()=> import("evse@/pages/EvseList.vue")
    },
    {
        path : "/evses/:id",
        name : 'evse-detail',
        component : ()=> import("evse@/pages/EvseDetail.vue")
    }
]


export default landingRoutes;