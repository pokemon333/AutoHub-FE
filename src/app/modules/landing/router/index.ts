import { RouteRecordRaw } from "vue-router";

const landingRoutes : Array<RouteRecordRaw> = [
    {
        path : "/",
        component : ()=> import("../pages/LandingPage.vue")
    }
]


export default landingRoutes;