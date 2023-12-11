import {defineStore} from "pinia"

interface User {
    id : number
    name : string,
    email : string,
    approved : boolean,
    created_at : string
    deleted_at : string | null,
    updated_at : string | null,
    email_verified_at : string | null,
    roles : Array<{
        id : number
        title : string,
        pivot : object,
        created_at : string
        deleted_at : string | null,
        updated_at : string | null, 
    }>
}

export const  useUserStore = defineStore('user',{
    state:() => ({
        user : {},
        isLogin : false
    }),
   actions :{
       setUser(user : User){
           this.user = user
       },
       changeLoginStatus(status : boolean){
           this.isLogin = status
       }
   },
   getters : {
       getUser(state){
           return state.user
       },
       getLoginStatus(state){
            return state.isLogin;
       }
   },
   persist: true,
})