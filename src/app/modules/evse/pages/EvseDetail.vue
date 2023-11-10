<template>
    <div class="pb-4">
        <div class="w-full pb-[35%]  relative ">
            <img class="w-full h-full absolute object-cover " :src="evse?.image?.url"  alt="">
        </div>
        <div class=" lg:px-32 md:px-20 px-4 py-12 pb-4  bg-white text-primary-300">
            <div class="lg:space-x-4 space-x-2 flex ">
                <Back @click="()=>router.push({name : 'evse'})" class="w-10 h-10 cursor-pointer " style="fill:#5F5F5F"/>
                <h1 class="lg:text-4xl md:text-2xl text-2xl poppins  font-[500]">{{ evse?.title }}</h1>
            </div>
            <div class="lg:text-2xl text-md mt-2  font-[200]">
              <h1> Open - {{ evse?.open_time }} To {{ evse?.close_time }} AM</h1>
            </div>
            <div class=" max-sm:text-sm mt-8 border-s-2 border-primary-300 p-3">
               {{ evse?.descriptions }}
            </div>
            <div class="md:flex mt-5 w-full">
                <div class="flex space-x-4 md:w-44  items-center ">
                    <Phone style="fill:#5F5F5F"/>
                    <h1 class="roboto">Phone Number</h1>
                </div>
                <h1 class="max-md:mt-2 max-md:ml-8 poppion">{{ evse?.phone }}</h1>
            </div>
            <div class="md:flex  mt-4 w-full">
                <div class="flex space-x-4 md:w-44 items-center ">
                    <Address style="fill:#5F5F5F"/> 
                    <h1 class="roboto">Address</h1>
                </div>
                <h1 class="max-md:mt-2 max-md:ml-8 poppion">{{ evse?.address }}</h1>
            </div>
            <!-- <div class="flex space-x-12 mt-8 ">
                <div class="flex flex-col space-y-4 ">
                    <div class="flex space-x-4 ">
                        <Phone style="fill:#5F5F5F"/>
                        <h1 class="roboto">Phone Number</h1>
                    </div>
                    <h1 class="poppion">{{ evse?.phone }}</h1>
                </div>
                <div class="flex flex-col space-y-4 ">
                    <div class="flex space-x-4">
                        <Address style="fill:#5F5F5F"/> 
                        <h1 class="roboto">Address</h1>
                    </div>
                    <h1 class="poppion">{{ evse?.address }}</h1>
                </div>
            </div> -->
        </div>
        <div class="lg:px-32 md:px-20 px-4 mt-8  w-full">
            <div class="w-full lg:h-[450px] md:h-[300px] h-[450px]" v-html="map"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted , ref } from 'vue';
import {Back,Phone,Address} from 'evse@/services/getEvseSvg'
import evseController from 'evse@/api/evseController'
import { useRouter ,useRoute  } from 'vue-router';
let router = useRouter();
let route  = useRoute();
let controller = evseController();
let { getDetail } = controller;
let id  = String(route.params.id)
let evse = ref({})
let map  = ref('');

    


let getData = async ()=>{
    let res = await getDetail(id)
    evse.value = await res.data.data 
    map.value  = await res.data.data.map.replace(/width="[^"]*"/, `width="100%"`).replace(/height="[^"]*"/, `height="100%"`)   
}
onMounted(()=>{
    getData()
})
</script>
