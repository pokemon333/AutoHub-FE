import ApiService from '@/app/core/services/apiService.ts'
import { AxiosResponse } from 'axios'

interface dealerSellMyCarController {
    getResource(): Promise<AxiosResponse>
    firstStepValidation(data:Object): Promise<AxiosResponse>,
    secondStepValidation(data:Object): Promise<AxiosResponse>,
    thirdStepValidation(data:Object): Promise<AxiosResponse>,
    formSubmit(data:Object): Promise<AxiosResponse>,
    formEditSubmit(id:string|number,data:Object):Promise<AxiosResponse>,
    getEditResource(id:string|number) : Promise<AxiosResponse>,
    removeImage(id:string|number): Promise<AxiosResponse>
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

    const getEditResource = (id:string | number) => {
        return ApiService.get(`dealer/cars/edit/${id}/resource`)
    }

    const formSubmit = (data:Object) =>{
        return ApiService.post('dealer/cars/create',data)
    }

    const formEditSubmit = (id:number | string,data:Object) =>{
        return ApiService.patch('dealer/cars/edit/'+id,data)
    }

    const removeImage = (id:number|string) =>{
        return ApiService.post('dealer/cars/edit/removeImage/'+id)
    }

    
    return {
        getResource,
        firstStepValidation,
        secondStepValidation,
        thirdStepValidation,
        formSubmit,
        getEditResource,
        removeImage,
        formEditSubmit
    }

}
