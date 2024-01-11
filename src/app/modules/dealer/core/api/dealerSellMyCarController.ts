import ApiService from '@/app/core/services/apiService.ts'
import { AxiosResponse } from 'axios'

interface dealerSellMyCarController {
    getResource(): Promise<AxiosResponse>
    firstStepValidation(data:Object): Promise<AxiosResponse>,
    secondStepValidation(data:Object): Promise<AxiosResponse>,
    thirdStepValidation(data:Object): Promise<AxiosResponse>
    formSubmit(data:Object): Promise<AxiosResponse>
}

export default function DealerSellMyCarController() : dealerSellMyCarController{
    const getResource =  () => {
        return ApiService.get('cars/create/resources')
    }

    const firstStepValidation = (data:Object) => {
        return ApiService.post('car-first-validation',data)
    }

    const secondStepValidation = (data:Object) => {
        return ApiService.post('car-second-validation',data)
    }

    const thirdStepValidation = (data:Object) => {
        return ApiService.post('car-third-validation',data)
    }

    const formSubmit = (data:Object) =>{
        return ApiService.post('dealer/cars/create',data)
    }

    return {
        getResource,
        firstStepValidation,
        secondStepValidation,
        thirdStepValidation,
        formSubmit
    }

}