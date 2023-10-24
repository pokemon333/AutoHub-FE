<template>
    <div class="w-full h-[88%] bg-primary-50/10 ">
        
        <div class="md:flex  h-full ">
             <div class=" pt-6  pr-8 h-full relative  " :class="advanceFileter ?  'w-8/12':'w-full'">
                 <div class="w-full flex pl-28 justify-between">
                     <div class=" flex flex-col justify-between "  :class="advanceFileter ?  'w-6/12':'w-[26%]'">    
                         <h1 class="text-[24px] font-[500]">Search Cars In Myanmar</h1>
                         <h1 class="text-[16px] font-[500]">{{ count }} {{ count == '1' ? 'car': 'cars' }} listings found in AutoHub</h1>
                     </div>
                     <div :class="advanceFileter ?  'w-[47%]':'w-[59%] ml-20'" >
                        <!-- <button @click="overallSearch">ddd</button> -->
                         <input v-model="keyword" @keyup="overallSearch" type="text" class="h-16 border border-secondary-400 rounded-md px-3 w-full" placeholder="Overall Search">
                     </div>
                     <div class="w-[8%]  flex justify-end items-center px-3" v-if="!advanceFileter">
                        <div  @click="toggleSideBar" class="flex cursor-pointer   justify-center   border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                            <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
                        </div>
                     </div>
                 </div>
                 <div class=" flex flex-wrap justify-between mt-8 pl-28  overflow-y-auto  h-[83%] scroll-auto " :class="advanceFileter ?  '':'pr-24'"  >
                     <div v-for="car in cars" class="mt-4" >
                         <CarCard :car="car"/>
                     </div>
                 </div>
             </div>
             <div class=" bg-primary-50/20 flex justify-center pt-[33px]"  :class="advanceFileter ?  'w-[35%]':'w-1/12'" v-if="advanceFileter">
                <div  class=" w-8/12">
                    <h1 class="text-secondary-700 text-[25px]">Explore Specific</h1>
                    <div class="flex flex-col items-center justify-around space-y-10">
                        <div class="relative w-full mt-10">
                            <label for="type" class="absolute px-2 -top-2 left-3  bg-gray-200 text-xs">Search Type</label>
                            <select  name="type" class="w-full border bg-gray-200  border-gray-500  peer h-12 rounded-md px-3">
                                <option value="dealer" class="bg-gray-200" >Dealer</option>
                                <option value="brand" class="bg-gray-200">Brand</option>
                            </select>
                        </div>
                        <div class="relative w-full mt-10">
                            <label for="type" class="absolute px-2 -top-2 left-3  bg-gray-200 text-xs">Search Type</label>
                            <select  name="type" class="w-full border bg-gray-200  border-gray-500  peer h-12 rounded-md px-3">
                                <option value="dealer" class="bg-gray-200" >Dealer</option>
                                <option value="brand" class="bg-gray-200">Brand</option>
                            </select>
                        </div>
                        <div class="relative w-full mt-10">
                            <label for="type" class="absolute px-2 -top-2 left-3  bg-gray-200 text-xs">Search Type</label>
                            <select  name="type" class="w-full border bg-gray-200  border-gray-500  peer h-12 rounded-md px-3">
                                <option value="dealer" class="bg-gray-200" >Dealer</option>
                                <option value="brand" class="bg-gray-200">Brand</option>
                            </select>
                        </div>
                        <div class="relative w-full">
                            <label for="type" class="absolute px-2 -top-2 left-3  bg-gray-200 text-xs">Search Type</label>
                            <select  name="type" class="w-full border bg-gray-200  border-gray-500  peer h-12 rounded-md px-3">
                                <option value="dealer" class="bg-gray-200" >Dealer</option>
                                <option value="brand" class="bg-gray-200">Brand</option>
                            </select>
                        </div>
                        <div class="relative w-full">
                            <label for="type" class="absolute px-2 -top-2 left-3  bg-gray-200 text-xs">Search Type</label>
                            <select  name="type" class="w-full border bg-gray-200  border-gray-500  peer h-12 rounded-md px-3">
                                <option value="dealer" class="bg-gray-200" >Dealer</option>
                                <option value="brand" class="bg-gray-200">Brand</option>
                            </select>
                        </div>
                        <button class="bg-secondary-400 rounded-md py-1 px-3 shadow-md text-white">Search</button>
                    </div>
                </div>
                <div @click="toggleSideBar" class="flex cursor-pointer justify-center  pt-2 border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                        <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
                </div>
             </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref,onMounted } from 'vue'
// import { AdvanceSearchForm } from 'car@/core/services/getCarListCompoent';
import { advanceFilter } from 'car@/core/services/getCarCardSvg';
import CarCard from 'car@/core/components/CarCard.vue';
import { useCarStore } from 'car@/core/stores/CarStore';


let advanceFileter = ref<boolean>(false)
let cars = ref([])
let count = ref('')
let keyword = ref('')
let carStore = useCarStore()

onMounted(()=>{
    cars.value = carStore.cars  
    count.value  = carStore.count    
})

let toggleSideBar = ()=>{
    advanceFileter.value = !advanceFileter.value
}

let overallSearch = () =>{
    let inputkeyword = keyword.value.toLowerCase(); 
    if (inputkeyword.length == 0) {
        cars.value = []
        cars.value = carStore.cars  
    }else{
        cars.value = []
        cars.value = carStore.cars.filter(car => {
        let { car_model, car_specification  , price , product_year ,trim_name  } = car
        let { condition , transmission , fuel_type,milage ,engine_power ,steering } = car_specification
        let { car_brand } = car_model
        let trim = trim_name ? trim_name : ''
        let firstStep = car_brand.name + ' ' + car_model.name + ' ' + product_year.name +' '+ trim
        console.log(firstStep.toLowerCase().split(" ").includes(inputkeyword));
        
        if (firstStep.toLowerCase().split(" ").includes(inputkeyword)) {  
            return car;
        }else if(price.includes(inputkeyword)){
            return car;
        }
    });
    
    }
    
}
</script>