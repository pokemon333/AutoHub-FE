import axios  from 'axios'
import { AxiosResponse } from 'axios'

export interface FilterData{
    type : string | null,
    name : string | null
}

interface CarController {
    getCars(data:FilterData) : Promise<AxiosResponse>
}

export default function CarController() : CarController{

    function getCars(data:FilterData): Promise<AxiosResponse>{
        return axios.get('http://localhost:8000/api/v1/cars?type='+data.type+'&&'+'name='+data.name)
    }

    return {
        getCars,
    }
}