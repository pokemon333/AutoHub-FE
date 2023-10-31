import  axios  from "axios";

const ApiService = axios.create({
    baseURL: 'https://admin.autohubmyanmar.com/api/v1/'
});

export default ApiService