import {useUserStore}   from "core@/store/UserStore.ts";
import tokenService from 'core@/services/tokenService.ts'

const handle = (to,from,next)=>{
    const userStore = useUserStore();
    const isUserSet = Object.keys(userStore.user).length > 0
    /*
    *  if token is in local storage then redirect back to previous page
    *  if user is already set in pinia(state managment) then redirect back to previous page
    *  if both are not set then next to login
    */   
    if (isUserSet)  {
        return from.fullPath;
    }else{
        return 'passed'
    }
}

export default handle;