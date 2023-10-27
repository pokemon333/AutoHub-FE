<template>
    <div class=" pb-2  flex">
        <div class=" w-[7%] h-full pt-14 max-md:hidden flex  justify-center">
            <back @click="backToList" class="cursor-pointer"/>
        </div>
        <div class="h-full md:w-[93%] w-screen md:pt-6">
            <div class="md:flex">

                <div class=" md:w-7/12 md:pr-2 md:flex md:flex-col space-y-5">
                    <div class=" md:h-40 ">
                        <div class="flex flex-col space-y-2">
                            <h1 class="text-[30px]">{{ car.car_model?.car_brand?.name || '-' }} {{ car?.car_model?.name  || '-'}}</h1>
                            <div class="flex text-success-800 text-[25px] space-x-1">
                                <h1 class="font-bold">$</h1>
                                <h1>{{  car?.price || '-'}}</h1>
                            </div>
                            <h1 class="text-secondary-500 font-bold">{{car?.car_specification?.condition || '-'}}/{{ car?.is_soldout ? '/Sold Out/':'' }}..</h1>
                        </div>
                    </div>
                    <div class="w-full h-auto bg-red-500 " v-if="car">
                        <Carousel> 
                            <template v-slot:main>
                                <img alt="Big Image"  :src="currentImage" class="w-full  h-full object-full"/>
                            </template>
                            <template v-slot:images>
                                <div v-for="(image, index) in images" :key="index"
                                     class="pr-2 cursor-pointer"
                                    @click="">
                                    <img :src="image" alt="Thumbnail" @click="selectImage(index)" :class="currentIndex == index ? 'opacity-100 scale-125' : 'opacity-50'" style="min-width: 120px; min-height: 80px; max-width: 120; max-height: 80px;" class=" object-cover" />
                                </div>
                            </template>
                        </Carousel>
                    </div>
                </div>

                <div class="md:w-5/12 md:pr-9 md:flex flex-col space-y-5">
                    <div class="bg-primary-100/40  px-8 rounded-sm border-b border-b-primary-100  py-2">
                        <h1 class="text-[20px] font-[500]">Dealer Information</h1>
                        <div class="md:flex mt-1 flex-wrap">
                           <div class="flex px-3 ">
                                <div class=" flex  justify-end px-3 ">
                                    <ul class="list-disc flex flex-col space-y-1  font-[300]  roboto  ">
                                        <li>Name </li>
                                        <li>Social Link</li>
                                        <li>Address</li>
                                        <li>Phone </li>
                                    </ul>
                                </div>
                                <div class="pl-1 font-[500] flex flex-col space-y-1 roboto ">
                                    <h1>{{ car?.dealer?.user?.name || '-' }}</h1>
                                    <h1>{{ car?.dealer?.user?.email|| '-' }}</h1>
                                    <h1>{{ car?.dealer?.address || '-' }}</h1>
                                    <h1>{{ car?.dealer?.phone_number || '-' }}</h1>
                                </div>
                           </div>
                            <div class="md:w-1/4 flex md:items-end md:justify-end max-md:mt-2 text-white">
                                <button class="h-10 w-30 px-4 py-1 rounded-xl bg-secondary-700  text-[14px]">Call Now</button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-primary-100/40  px-8 rounded-sm border-b border-b-primary-100  py-2">
                        <h1 class="text-[20px] font-[500]">License Information</h1>
                        <div class="flex mt-1 px-5">
                                <ul class="list-disc flex flex-col space-y-1  font-[500]   ">
                                    <li>{{ car?.car_info?.license_status?.name || '-' }}</li>
                                    <li>{{ car?.car_info?.plate_division?.name  || '-'  }}</li>
                                    <li>{{ car?.car_info?.plate_color || '-'  }}</li>
                                    <li>{{ car?.car_info?.plate_number  || '-'  }}</li>
                                </ul>
                        </div>
                    </div>

                    <div class="bg-primary-100/40  px-8 rounded-sm border-b border-b-primary-100  pt-2 md:pb-28">
                        <h1 class="text-[20px] font-[500]">Car Information</h1>
                        <div class="md:flex mt-8">
                            <div class="md:w-8/12 pl-5">
                                <ul class="list-disc flex flex-col space-y-1  font-[500]   ">
                                    <li>{{ car?.car_model?.name  + ' model' || '-'  }} {{ car?.product_year?.name ? `( ${car?.product_year?.name})`: ''   }} </li>
                                    <li>Dynamic Premium ( full grade )</li>
                                    <li>{{ car?.car_specification?.engine_power || '-' }}</li>
                                    <li>{{car?.car_specification?.milage?.name || ''}}++ Kilo</li>
                                    <li>{{ car?.car_info?.color?.name || '-' }}</li>
                                    <li>{{car?.car_specification?.fuel_type?.name || ''}}</li>
                                    <li>50-55k Km</li>
                                </ul>
                            </div>
                            <div class="md:w-4/12 max-md:pl-5 max-md:mt-1">
                                    <ul class="list-disc flex flex-col space-y-1  font-[500]   ">
                                        <li>{{ car?.car_specification?.transmission  || '-'}}</li>
                                        <li>{{ car?.car_specification?.steering || '' }} Handed Drive</li>
                                        <li>2 owners before</li>
                                        <li>Saloon</li>
                                        <li>No Trim Name</li>
                                        <li>Edited 3 days ago</li>
                                        <li>#76949494</li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="bg-primary-100/40  px-8 mt-4 w-[97%]    rounded-sm border-b border-b-primary-100  py-2">
                <h1 class="text-[20px] font-[500]">Descriptions</h1>
                <div class="flex mt-1 px-5">
                   {{ car?.car_info?.descriptions || '-' }}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { onMounted , ref  } from 'vue';
import CarController from 'car@/core/api/carController';
import { useRoute ,useRouter  } from 'vue-router';
import { back } from 'car@/core/services/getCarCardSvg'
import Carousel from 'car@/core/components/Carousel.vue'

let carController = CarController()
let { getCarDetial } = carController
let route  = useRoute()
let router = useRouter()
let car = ref({})
let images = ref<any>([])
let currentIndex = ref(0)
let getData = async () => {
    let res = await  getCarDetial(route.params.id)
    car.value =  res.data.data
    let media = res.data.data.media
    await media.forEach(img => {        
        images.value.push(img.url);
    });    
    currentImage.value =  images.value[currentIndex.value]
}


let currentImage = ref<any>('')

let autoChangeImageSlide =async ()=>{
    setInterval(()=>{
        if (currentIndex.value  == images.value.length - 1) {
            currentIndex.value = 0            
        }else{
            currentIndex.value++
        }
        currentImage.value =  images.value[currentIndex.value]
    },3000)
}

let selectImage = (index)=>{
    currentIndex.value = index
    currentImage.value =  images.value[index]
}

let backToList =  () => {    
    router.push({name : 'cars'})
}

onMounted(()=>{
    getData();
    autoChangeImageSlide();
})

</script>