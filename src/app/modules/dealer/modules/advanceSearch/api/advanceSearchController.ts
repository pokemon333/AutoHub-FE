import ApiService from '@/app/core/services/apiService.ts'

import { AxiosResponse } from 'axios'


interface AdvanceSearchController {
    getResources(id: number | string) : Promise<AxiosResponse>
    getFilteredData(filter:Filter) :  Promise<AxiosResponse>
}

interface Filter {
    brand: (string | null)[];
    condition: (string | null)[];
    division: (string | null)[];
    maxPrice: (string | number | null);
    minPrice: (string | number | null);
    model: (string | null)[];
}


export default function AdvanceSearchController() : AdvanceSearchController{

    function getResources(id : number | string ): Promise<AxiosResponse>{
        return ApiService.get(`dealer/resource/${id}`)
    }

    function getFilteredData (filter : Filter) : Promise<AxiosResponse>{
        return ApiService.post('',filter)
    }

    return {
        getResources,
        getFilteredData
    }
}