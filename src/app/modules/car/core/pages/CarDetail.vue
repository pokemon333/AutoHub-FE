<template>
    <PageLoading v-if="loading"/>
    <div class=" pb-2  flex"  v-if="!loading">
        <div class=" lg:w-[7%]  h-full pt-14 max-lg:hidden flex  justify-center">
            <back @click="backToList" class="cursor-pointer w-11 h-11 " fill="black"/>
        </div>
        <div class=" lg:w-[93%] w-screen lg:pt-6 h-full">
            <div class="lg:flex lg:w-full w-screen">

                <div class=" lg:w-7/12  lg:justify-between lg:pr-2 lg:flex lg:flex-col lg:space-y-5 w-full">

                    <div class="lg:w-5/12 lg:h-40 ">
                        <div class="flex  w-full">

                            <div class="lg:hidden lg:mr-0 lg:ml-0 mr-4 ml-1 flex justify-center items-center">
                                <back @click="backToList" class="w-10 h-10 cursor-pointer" fill="black"/>
                            </div>

                            <div class="flex  lg:w-full justify-between">
                                <div class="flex flex-col space-y-1 pb-2">
                                    <h1 class="text-[30px]">{{ car.car_model?.car_brand?.name || '-' }} {{ car?.car_model?.name  || '-'}}</h1>
                                    <div class="flex text-success-800 text-[25px] space-x-1">
                                        <h1 class="font-bold">{{ parseInt( car?.price)  || '-'}}</h1>
                                        <h1>Lakhs</h1>
                                    </div>
                                    <h1 class="text-secondary-500 font-bold">{{  car?.car_specification?.condition.charAt(0).toUpperCase() + car?.car_specification?.condition.slice(1) || '-'}}</h1>
                                    <div class="text-gray-700/80 text-xs mt-2">
                                        <div class="flex"  v-if="!checkEdited(car?.created_at,car?.updated_at)">
                                            <h1 class="font-bold">Added at : </h1>
                                            <h1>&nbsp;{{car?.created_at ? formatDate(car?.created_at) + '&nbsp;( '+dateDifference(car?.created_at)+' )' : ''}}</h1>
                                        </div>
                                        <div class="flex" v-if="checkEdited(car?.created_at,car?.updated_at)">
                                            <h1 class="font-bold">Edited at :</h1>
                                            <h1>&nbsp;{{car?.updated_at ? formatDate(car?.updated_at) + '&nbsp;( '+dateDifference(car?.updated_at)+' )' : ''}}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="lg:w-full w-screen "  v-if="car">
                        <Carousel> 
                            <template v-slot:main>
                                <img alt="Big Image"  :src="currentImage" class=" w-full h-full aspect-video  object-cover  absolute"/>
                            </template>
                            <template v-slot:images class="carousel-image-container">
                                <div v-for="(image, index) in images" :key="index"
                                    :id="'image-'+index"
                                     class="pr-2 cursor-pointer"
                                    @click="">
                                    <img :src="image" alt="Thumbnail" @click="selectImage(index)" :class="currentIndex == index ? 'opacity-100 scale-125' : 'opacity-50'" style="min-width: 120px; min-height: 80px; max-width: 120; max-height: 80px;" class=" object-cover" />
                                </div>
                            </template>
                        </Carousel>
                    </div>

                </div>

                <div class="lg:w-5/12 lg:pr-9  flex-col lg:mt-0 mt-4 space-y-5">
                    <div class="bg-primary-100/40   pl-8 rounded-sm border-b border-b-primary-100  py-2">
                        <h1 class="text-[20px] font-[500]">Dealer Information</h1>
                        <div class="lg:flex mt-1  flex-wrap">
                           <div class="flex px-3 ">
                                <div class=" flex  justify-end px-3 ">
                                    <ul class="list-disc flex flex-col space-y-1  font-[100]    ">
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
                            <div class="lg:w-4/12 flex lg:items-end mt-2 lg:justify-end  max-lg:mt-2 text-white">
                                <button @click="initiatePhoneCall(car?.dealer?.phone_number)" class="lg:h-10 lg:rounded-xl h-8  w-30 px-4   rounded-md bg-secondary-700  text-[14px]">Call Now</button>
                            </div>
                        </div>
                    </div>

                    <div class="bg-primary-100/40  px-8 rounded-sm border-b border-b-primary-100  py-2">
                        <h1 class="text-[20px] roboto font-[500]">License Information</h1>
                        <div class="flex mt-1 px-5 ">
                                <ul class="list-disc roboto flex flex-col space-y-1  font-[500]   ">
                                    <li>{{ car?.car_info?.license_status?.name || '-' }}</li>
                                    <li>{{ car?.car_info?.plate_division?.name  || '-'  }}</li>
                                    <li>{{ car?.car_info?.plate_color || '-'  }}</li>
                                    <li>{{car?.car_info?.plate_number.slice(0,3)  + '*'.repeat(car?.car_info?.plate_number.length - 3) }}</li>
                                </ul>
                        </div>
                    </div>

                    <div class="bg-primary-100/40 lg:h-[28vw]  pl-8 rounded-sm border-b border-b-primary-100  pt-2 ">
                        <h1 class="text-[20px] font-[500] roboto">Car Information</h1>
                        <div class="lg:flex mt-3">
                            <div class="lg:w-8/12 pl-5">
                                <ul class="list-disc roboto flex flex-col space-y-[0.3vw]  font-[500]   ">
                                    <li>{{ car?.car_model?.car_brand?.name  || '-' }} {{ car?.car_model?.name  || '-' }} {{ car?.product_year?.name }} {{ car?.trim_name ? '('+car?.trim_name+')' : '' }}</li>
                                    <li>{{ car?.car_specification?.transmission  || '-'}}</li>
                                    <li>{{ car?.car_specification?.engine_power || '-' }}</li>
                                    <li>{{ car?.car_specification?.steering || '' }} Handed Drive</li>
                                    <li>{{car?.car_specification?.fuel_type?.name || ''}}</li>
                                    <li>{{car?.car_specification?.milage?.name+' Km' || ''}}</li>
                                    <li>{{ car?.car_info?.color?.name || '-' }}</li>
                                    <li>{{ car?.car_info?.vehicleid || '-' }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- descriptions -->
            <div class="lg:w-[97%] bg-primary-100/40  px-8 mt-4     rounded-sm border-b border-b-primary-100  py-2">
                <h1 class="text-[20px] font-[500] roboto">Descriptions</h1>
                <div class="flex mt-1 px-5 roboto">
                   {{ car?.car_info?.descriptions || '-' }}
                </div>
            </div>
        </div>
    </div>
  <div class="hidden">
    <a href="" id="call-now"></a>
  </div>

</template>


<script setup>

import { onMounted , ref, watch ,nextTick } from 'vue';
import CarController from 'car@/core/api/carController';
import { useRoute ,useRouter  } from 'vue-router';
import { back } from 'car@/core/services/getCarCardSvg'
import Carousel from 'car@/core/components/Carousel.vue'
import PageLoading from 'core@/components/PageLoading.vue'

let carController = CarController()
let { getCarDetial } = carController
let route  = useRoute()
let router = useRouter()
let car = ref({})
let images = ref([])
let currentIndex = ref(0)
let loading = ref(false)

let getData = async () => {
    loading.value = true
    let res = await  getCarDetial(route.params.id)
    car.value =  res.data.data
    let media = res.data.data.media
    await media.forEach(img  => {        
        images.value.push(img.url);
    });    
    currentImage.value =  images.value[currentIndex.value]
    loading.value = false
}


let currentImage = ref('')

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

let scrollCurrentElementToCenter = () => {
   
}

let selectImage = (index)=>{
    currentIndex.value = index
    currentImage.value =  images.value[index]
}

let backToList =  () => {    
    router.back()
}

let formatDate = (date) =>{
    const dateParts = date.split(" ")[0].split("-");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    return  formattedDate;
}

let  dateDifference = (date) =>  {
    const currentDate = new Date();
    const inputDate = new Date(date)    
    const timeDifference = currentDate - inputDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference === 0) {
        return "Today";
    } else if (daysDifference > 0) {
        return `${daysDifference} days ago`;
    } 
}

let checkEdited = (create,update) =>{
   return create == update ? false : true;
}

function initiatePhoneCall(phoneNumber) {
    let callNow = document.getElementById('call-now')
    callNow.href = 'tel:' + phoneNumber
    callNow.click()
}

watch(()=> currentIndex.value,()=>{
  nextTick().then(()=>{
    let container = document.getElementById('image-container')
    let selectedImage =  document.getElementById('image-'+currentIndex.value)
    const scrollPosition = selectedImage.offsetLeft - (container.offsetWidth - selectedImage.offsetWidth) / 2;
    container.scrollLeft = scrollPosition;
  })
})

onMounted(()=>{
    scrollCurrentElementToCenter()
    getData();
    autoChangeImageSlide();
})

</script>
