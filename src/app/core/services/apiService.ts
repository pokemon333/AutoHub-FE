import  axios  from "axios";

const ApiService = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
});

export default ApiService