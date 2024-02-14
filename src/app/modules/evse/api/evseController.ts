import ApiService from '@/app/core/services/apiService.ts'

import { AxiosResponse } from 'axios'


interface state {
    latidude: number,
    longitude: number,
    kilometer : number,
}

interface EvseController {
    getEvses() : Promise<AxiosResponse>
    getDetail(id:string) : Promise<AxiosResponse>
    getEvsesByLocation(state:state) : Promise<AxiosResponse>
}

export default function EvseController() : EvseController{

    function getEvses(): Promise<AxiosResponse>{
        return ApiService.get('evses')
    }

    function getDetail(id:string|string[]): Promise<AxiosResponse>{
        // console.log(id);
        return ApiService.get('evses/'+id)
    }

    function getEvsesByLocation(state:state): Promise<AxiosResponse>{
        return ApiService.get('evses/location/'+state.latidude+'/'+state.longitude+'/'+state.kilometer)
    }

    return {
        getEvses,
        getDetail,
        getEvsesByLocation
    }
}