import { AxiosResponse } from 'axios';
import apiService from 'core@/services/apiService.ts';
import tokenService from 'core@/services/tokenService.ts'
import { useUserStore  } from '@/app/core/store/UserStore.ts';
import { useRouter } from 'vue-router';


interface UserData {
    name : string
    password : string
}

interface authController{
    login(userData : UserData ) : Promise<AxiosResponse> 
    logout(): void
    getUser() : Promise<AxiosResponse> 
}


export default function useAuthController() : authController {
    
        let router = useRouter();
        let userStore = useUserStore()
        let { setToken , removeToken  } = tokenService

        function getUser(){
            return apiService.get('user')
        }

        function login (userData : UserData ) {
           return  apiService.post('login', userData)
        }

        function logout (){
            const currentRoute = router.currentRoute.value;
            const isDealerRoute = currentRoute.path.startsWith('/dealer');
            apiService.post('logout')
            .then((res : AxiosResponse) => {
                if (res.data.success) {
                    removeToken()
                    userStore.reset();
                    if (isDealerRoute) {
                        router.push({name:'landing'})
                    }
                }
            })
            .catch((error : any) =>{
                console.log(error.response.data);
            })
        }

        return {
            login,
            logout,
            getUser
        }
}
