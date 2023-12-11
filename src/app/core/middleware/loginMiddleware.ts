import {useUserStore}   from "core@/store/UserStore";
import tokenService from 'core@/services/tokenService'
import { useRouter } from 'vue-router';

const handle = (to,from,next)=>{
    const router = useRouter();
    const userStore = useUserStore();
    const isUserSet = Object.keys(userStore.user).length > 0
    /*
    *  if token is in local storage then redirect back to previous page
    *  if user is already set in pinia(state managment) then redirect back to previous page
    *  if both are not set then next to login
    */   
    if (isUserSet && tokenService.getToken())  {
        router.push(from.fullPath);
    }
}

export default handle;