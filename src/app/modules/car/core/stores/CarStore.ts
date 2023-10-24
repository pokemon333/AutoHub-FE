import {defineStore} from "pinia"


export const  useCarStore = defineStore('car',{
    state:() => ({
        cars  : [],
        count : ''
    }),
   actions :{
        setCars(data:any) : void { 
            this.cars = data
        }, 
        setCount(data:any) : void { 
            this.count = data
        }
   },
   getters : {
        getCars(state : any ){
            return state.cars
        }
   } 
})