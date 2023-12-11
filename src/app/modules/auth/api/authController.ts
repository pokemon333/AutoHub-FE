import { AxiosResponse } from 'axios';
import apiService from 'core@/services/apiService';
import tokenService from 'core@/services/tokenService'
import { useUserStore  } from '@/app/core/store/UserStore';
let { setToken  } = tokenService
let userStore = useUserStore()
interface UserData {
    name : string
    password : string
}

interface authController{
    login(userData : UserData ) : void
    logout(): void
    getUser() : void
}


export default function useAuthController() : authController {
        function getUser(){
            apiService.get('user')
            .then((res : AxiosResponse)=> {
                let user = res?.data.data
                userStore.setUser(user)
                userStore.changeLoginStatus(true)
            })
            .catch((error : AxiosResponse)=>console.log('error',error))
        }

        function login (userData : UserData ){
            apiService.post('login', userData)
            .then((res : AxiosResponse )=> {
                let { token  } = res?.data.data
                setToken(token)
                getUser();
            })
            .catch((error : AxiosResponse)=>console.log('error',error))  
        }


        function logout (){
            apiService.post('logout')
            .then((res : AxiosResponse)=> console.log(res))
            .catch((error : AxiosResponse)=>console.log('error',error))
        }

       

        return {
            login,
            logout,
            getUser
        }
}
