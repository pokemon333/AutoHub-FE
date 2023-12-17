import  axios  from "axios";
import tokenService  from "./tokenService.ts";

const ApiService = axios.create({
    baseURL: import.meta.env.VITE_API_ROUTE 
});

ApiService.interceptors.request.use(
    config => {
      const token = tokenService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  );

export default ApiService