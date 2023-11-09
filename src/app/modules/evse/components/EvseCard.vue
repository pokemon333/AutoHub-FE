<template>
   <div class="rounded-md shadow-md">
        <div class="h-32 relative">
            <img class="w-full h-full rounded-t-md brightness-[.65] object-center" :src="url" alt="">
            <div class="absolute w-full h-full text-white top-0 flex flex-col space-y-1 justify-center px-8">
                <h1 class="text-xl poppins">Silvia EVSE Station</h1>
                <p class="text-xs font-[30] poppins">open 9:00 AM  to 12:00 AM</p>
            </div>
        </div>
        <div class="h-16 flex rounded-b-md items-center space-x-10 justify-center  bg-primary-25 ">
            <div class="">
                <button  class="bg-transparent  hover:bg-secondary-500  hover:text-white py-1    px-4 border border-secondary-500 hover:border-transparent rounded">
                    Details
                </button>
            </div>
            <div class="">
                <button class="bg-primary-300 hover:bg-primary-500  text-white  flex items-center justify-center  px-4 rounded py-1">
                    View in Map
                </button>
            </div>
        </div>
   </div>
</template>

<script lang="ts" setup>
import  { defineProps} from 'vue'
const props = defineProps({
  url: String
})
</script>