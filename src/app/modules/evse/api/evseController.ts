import ApiService from '@/app/core/services/apiService'

import { AxiosResponse } from 'axios'

interface EvseController {
    getEvses() : Promise<AxiosResponse>
    getDetail(id:string) : Promise<AxiosResponse>
}

export default function EvseController() : EvseController{

    function getEvses(): Promise<AxiosResponse>{
        return ApiService.get('evses')
    }

    function getDetail(id:string|string[]): Promise<AxiosResponse>{
        return ApiService.get('evses/'+id)
    }

    return {
        getEvses,
        getDetail
    }
}