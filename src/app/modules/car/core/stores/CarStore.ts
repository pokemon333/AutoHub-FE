import {defineStore} from "pinia"


export const  useCarStore = defineStore('car',{
    state:() => ({
        cars  : [],
    }),
   actions :{
        setCars(data:any) : void { 
            this.cars = data
        }
   },
   getters : {
        getCars(state : any ){
            return state.cars
        }
   } 
})