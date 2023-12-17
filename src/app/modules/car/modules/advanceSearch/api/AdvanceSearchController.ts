import ApiService from '@/app/core/services/apiService.ts'

import { AxiosResponse } from 'axios'


interface AdvanceSearchController {
    getResources() : Promise<AxiosResponse>
    getFilteredData(filter:Filter) :  Promise<AxiosResponse>
}

interface Filter {
    brand: (string | null)[];
    condition: (string | null)[];
    dealer: (string | null)[];
    division: (string | null)[];
    maxPrice: (string | number | null);
    minPrice: (string | number | null);
    model: (string | null)[];
    year: (string | number | null)[];
}


export default function AdvanceSearchController() : AdvanceSearchController{

    function getResources(): Promise<AxiosResponse>{
        return ApiService.get('advance-search-resources')
    }

    function getFilteredData (filter : Filter) : Promise<AxiosResponse>{
        return ApiService.post('advance-search-filter',filter)
    }

    return {
        getResources,
        getFilteredData
    }
}