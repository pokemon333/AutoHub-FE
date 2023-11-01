import ApiService from '@/app/core/services/apiService'

import { AxiosResponse } from 'axios'


interface AdvanceSearchController {
    getResources() : Promise<AxiosResponse>
}

export default function AdvanceSearchController() : AdvanceSearchController{

    function getResources(): Promise<AxiosResponse>{
        return ApiService.get('advance-search-resources')
    }

    return {
        getResources
    }
}