import ApiService from '@/app/core/services/apiService'

import { AxiosResponse } from 'axios'

export interface FilterData{
    type : string | null,
    name : string | null
}

interface CarController {
    getCars(data:FilterData) : Promise<AxiosResponse>
    getCarDetial(id:string | string[]) : Promise<AxiosResponse>
}

export default function CarController() : CarController{

    function getCars(data:FilterData): Promise<AxiosResponse>{
        return ApiService.get('cars?type='+data.type+'&&'+'name='+data.name)
    }

    function getCarDetial(id:string| string[]) : Promise<AxiosResponse>{
        return ApiService.get('/cars/'+ id)
    }

    return {
        getCars,
        getCarDetial
    }
}