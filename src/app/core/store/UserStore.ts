import {defineStore} from "pinia"

interface User {
    id : number
    name : string,
    email : string,
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
        isLogin : false,
        token : null
    }),
   actions :{
       reset(){
            this.user = {}
            this.isLogin = false
       },
       setUser(user : User){
           this.user = user
       },
       setToken(token:string){
            this.token = token
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
       },
       getToken(state){
            return state.token
       }
   },
   persist : true
})