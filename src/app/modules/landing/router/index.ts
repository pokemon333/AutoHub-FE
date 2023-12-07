import { RouteRecordRaw } from "vue-router";

const landingRoutes : Array<RouteRecordRaw> = [
    {
        path : "",
        name : 'landing',
        component : ()=> import("landing@/pages/LandingPage.vue")
    }
]


export default landingRoutes;