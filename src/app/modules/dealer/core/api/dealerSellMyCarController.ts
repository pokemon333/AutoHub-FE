import ApiService from '@/app/core/services/apiService.ts'
import { AxiosResponse } from 'axios'

interface dealerSellMyCarController {
    getResource(): Promise<AxiosResponse>
}

export default function DealerSellMyCarController() : dealerSellMyCarController{
    const getResource =  () => {
        return ApiService.get('cars/create/resources')
    }
    return {
        getResource,
    }

}