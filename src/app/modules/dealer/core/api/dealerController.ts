import ApiService from '@/app/core/services/apiService'
import useAuthController from 'auth@/api/authController'

let { getUser }  = useAuthController()

import { AxiosResponse } from 'axios'

interface userData{
    id: number | string | null,
    name : string | null,
    email : string | null,
    phone_number : string | null,
    address : string | null
}

interface dealerController {
    editProfile(data:userData ): Promise<AxiosResponse> | boolean
}

export default function DealerController() : dealerController{
    function editProfile(data : userData){
        let condition = false;
        let {id} = data
        ApiService.patch(`dealer/edit-profile/${id}`,data).then((res:AxiosResponse)=>{
            if (res.data.success) {
                condition = true
                getUser();
            }
        }).catch((res:AxiosResponse)=>{})
        return true;
    }
    return {
        editProfile,
    }
}