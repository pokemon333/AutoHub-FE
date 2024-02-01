import {useUserStore}   from "core@/store/UserStore.ts";
import useAuthController from 'auth@/api/authController.ts'
import tokenService from 'core@/services/tokenService.ts'
import { useRouter } from 'vue-router';

const handle = async (to,from,next)=>{
    const userStore = useUserStore();
    const isUserSet = Object.keys(userStore.user).length > 0
    
    /*
    *  If auth token is not in local storage and user is not set in pinia(state managment) then redirect to login
    */   
   
    if (!isUserSet && !tokenService.getToken())  {
        next({name:"login"});
    }
  
}

export default handle;