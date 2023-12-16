import  axios  from "axios";
import tokenService  from "./tokenService";

const ApiService = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
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