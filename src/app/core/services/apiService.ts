import  axios  from "axios";
import tokenService  from "./tokenService.ts";
import { useUserStore } from "../store/UserStore.ts";

const ApiService = axios.create({
    baseURL: import.meta.env.VITE_API_ROUTE 
});

ApiService.interceptors.request.use(
    config => {
      const token = tokenService.getToken();
      const userStore = useUserStore();
      const stateToken = userStore.getToken
      if(stateToken!= null || stateToken != ""){
        config.headers.Authorization = `Bearer ${stateToken}`;
      }else if(token){
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
  );

export default ApiService