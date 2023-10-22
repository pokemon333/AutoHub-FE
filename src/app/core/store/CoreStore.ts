import {defineStore} from "pinia"
import { ref } from "vue"

export const  useCoreStore = defineStore('core',{
    state:() => ({
        isMenuOpen : ref(false) ,
    }),
   actions :{
        changeMenuState(state:boolean){
            this.isMenuOpen = state
        }
   },
   getters : {
   }
})