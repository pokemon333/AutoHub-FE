import { RouteRecordRaw } from "vue-router";

const landingRoutes : Array<RouteRecordRaw> = [
    {
        path : "/evses",
        name : 'evse',
        component : ()=> import("../pages/EvseList.vue")
    },
    {
        path : "/evses/:id",
        name : 'evse-detail',
        component : ()=> import("../pages/EvseDetail.vue")
    }
]

export default landingRoutes;