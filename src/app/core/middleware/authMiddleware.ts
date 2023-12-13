import {useUserStore}   from "core@/store/UserStore";
import tokenService from 'core@/services/tokenService'
import { useRouter } from 'vue-router';

const handle = (to,from,next)=>{
    const router = useRouter();
    const userStore = useUserStore();
    const isUserSet = Object.keys(userStore.user).length > 0
    /*
    *  If auth token is not in local storage and user is not set in pinia(state managment) then redirect to login
    */   
    if (!isUserSet && !tokenService.getToken())  {
        router.push({name:"login"});
    }
}

export default handle;