import { AxiosResponse } from 'axios';
import apiService from 'core@/services/apiService';
import tokenService from 'core@/services/tokenService'

let { setToken  } = tokenService
interface UserData {
    name : string
    password : string
}

interface authController{
    login(userData : UserData ) : void
    logout(): void
}


export default function useAuthController() : authController {
        function login (userData : UserData ){
            apiService.post('login', userData)
            .then((res : AxiosResponse )=> {
                let { token  } = res?.data
                setToken('token', token)
            })
            .catch((error : AxiosResponse)=>console.log('error',error))  
        }
        function logout (){
            apiService.get('logout')
            .then((res : AxiosResponse)=> console.log(res))
            .catch((error : AxiosResponse)=>console.log('error',error))
        }

        return {
            login,
            logout
        }
}
