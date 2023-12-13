import { AxiosResponse } from 'axios';
import apiService from 'core@/services/apiService';
import tokenService from 'core@/services/tokenService'
import { useUserStore  } from '@/app/core/store/UserStore';
import { useRouter } from 'vue-router';

let { setToken , removeToken  } = tokenService
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
    
        let router = useRouter();

        function getUser(){
            apiService.get('user')
            .then((res : AxiosResponse)=> {
                let user = res?.data.data
                userStore.setUser(user)
                userStore.changeLoginStatus(true)
            })
            .catch((error : AxiosResponse)=>console.log('error',error))
        }

        function login (userData : UserData ) {
            apiService.post('login', userData)
            .then((res : AxiosResponse )=> {
               if(res.data.success){
                    let { token  } = res?.data.data
                    setToken(token)
                    getUser();
                    router.go(-1)
               }
            })
            .catch((error : AxiosResponse)=>console.log('error',error))  
        }

        function logout (){
            const currentRoute = router.currentRoute.value;
            const isDealerRoute = currentRoute.path.startsWith('/dealer');
            apiService.post('logout')
            .then((res : AxiosResponse)=>{
                if (res.data.success) {
                    removeToken()
                    userStore.reset();
                    if (isDealerRoute) {
                        router.push({name:'login'})
                    }
                }
            })
            .catch((error : AxiosResponse) => console.log('error',error))
        }

        return {
            login,
            logout,
            getUser
        }
}
