import  axios  from "axios";
// let production = 'https://admin.autohubmyanmar.com/api/v1/'
let local = 'http://localhost:8000/api/v1/'
const ApiService = axios.create({
    baseURL: local
});

export default ApiService