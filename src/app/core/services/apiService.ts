import  axios  from "axios";
import tokenService  from "./tokenService";


const ApiService = axios.create({
    baseURL: 'http://autohub.test/api/v1/'
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