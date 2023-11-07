import {defineStore} from "pinia"


export const  useCarStore = defineStore('car',{
    state:() => ({
        cars  : [],
        count : '',
        type  : ''
    }),
   actions :{
        setCars(data:any) : void { 
            this.cars = data
        }, 
        setCount(data:any) : void { 
            this.count = data
        },
        setType(data:any) : void {
            this.type = data
        }
   },
   getters : {
        getCars(state : any ){
            return state.cars
        }
   } 
})