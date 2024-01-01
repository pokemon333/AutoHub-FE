<template>
   <div class="rounded-md shadow-md">
        <div class="h-32 relative">
            <img class="w-full h-full rounded-t-md brightness-[.65] object-cover" :src="evse?.image?.url" alt="">
            <div class="absolute w-full h-full text-white top-0 flex flex-col space-y-1 justify-center px-8">
                <h1 class="text-xl poppins">{{ evse?.title }}</h1>
                <p class="text-xs font-[30] poppins">open {{ evse?.open_time }}  to {{ evse?.close_time }}</p>
            </div>
        </div>
        <div class="h-16 flex rounded-b-md items-center space-x-10 justify-center  bg-primary-25 ">
            <div class="">
                <button @click="()=> router.push({name : 'evse-detail',params : {id : evse?.id}})"  class="bg-transparent  hover:bg-secondary-500  hover:text-white py-1    px-4 border border-secondary-500 hover:border-transparent rounded">
                    Details
                </button>
            </div>
       
            <div class="">
                <button  @click="handleMap" class="bg-primary-300 hover:bg-primary-500  text-white  flex items-center justify-center  px-4 rounded py-1">
                    View in Map
                </button>
            </div>
        </div>
   </div>
</template>

<script   setup>
import  { defineProps} from 'vue'
import { useRouter } from 'vue-router';

const props = defineProps({
  evse: Object,
  currentLocation : Object
})  

let handleMap = () =>{
    if (props.evse.latitude && props.evse.longitude ) {
        generateGoogleMapDirectionUrl()
    }else{
        goToGoogleMap(props.evse.link)
    }
}
let generateGoogleMapDirectionUrl = () =>{
    console.log(props.currentLocation);
    let url =  `https://www.google.com/maps/dir/${props.currentLocation.latitude},${props.currentLocation.longitude}/${props.evse.latitude},${props.evse.longitude}`;
    goToGoogleMap(url)
}

let router = useRouter();
let goToGoogleMap = (link) => {
    window.open(link);
}
</script>