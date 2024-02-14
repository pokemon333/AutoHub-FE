import resolver from 'core@/services/middlewareResolveService.ts'
import {useUserStore}   from "core@/store/UserStore.ts";
import useAuthController from 'auth@/api/authController.ts'
import tokenService from 'core@/services/tokenService.ts'
// import { useRouter } from 'vue-router';

const initMiddleWare = (router) => {

    router.beforeEach(async (to, from , next ) => {
        const userStore = useUserStore();
        let { getUser }  = useAuthController()
        if(tokenService.getToken()){
            try{
                let res = await getUser();
                let {user} = res?.data
                userStore.setUser(user)
                userStore.changeLoginStatus(true)
            }catch(e){
                tokenService.removeToken();
                next({name:"login"});
            }
        }
        resolver(to,from,next)
    })
}

export default initMiddleWare;