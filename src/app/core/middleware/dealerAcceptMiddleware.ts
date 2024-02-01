import {useUserStore}   from "core@/store/UserStore.ts";
import tokenService from 'core@/services/tokenService.ts'

const handle = (to,from,next)=>{
    const userStore = useUserStore();
    const isUserSet = Object.keys(userStore.user).length > 0
    if(to.params.type == 'dealer'){
        if(!isUserSet && !tokenService.getToken()){
            next(from.fullPath);
        }
    }
}

export default handle;