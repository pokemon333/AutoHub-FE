<template>
    <section class="h-[700px] flex  ">
        <div class="w-6/12 h-full flex  flex-col ">
            <h1 class="text-[46px] ml-20   pt-10">Comprehensive</h1>
            <h1  class="  ml-20 p-0 text-[96px] text-secondary-500 font-[300]">Marketplace&nbsp;!</h1>
            <div style="clip-path: polygon(0 0, 100% 0%, 97% 100%, 0% 100%);" class="h-20 w-[88%] bg-red-600">
                <h1 class=" pl-20 text-[48px] text-white font-[600]">Explore Now</h1>
            </div>
            <div class="pl-10 mt-6">
                <SearchForm class=" bg-primary-50/40 border-b-2 border-primary-200 flex flex-col justify-between p-12 h-80 w-[70%] rounded-lg" @get-filtered-cars="filterCars"/> 
            </div>
        </div>
        <div class="w-6/12  h-full">
            <img class="object-cover w-full h-full"  src="https://assetsforlife.co.uk/wp-content/uploads/2022/02/buying-property-concept-man-uniform-giving-keys-black-man-1024x683.jpg" alt="" style="clip-path: polygon(26% 0, 100% 0, 100% 100%, 0% 100%);">
        </div>
    </section>
</template>


<script setup lang="ts">

import { SearchForm } from 'landing@/services/getLandingPageComponent'
import  CarController  from 'car@/core/api/carController'
import { FilterData  } from 'car@/core/api/carController';
import { useCarStore } from 'car@/core/stores/CarStore';

let carController = CarController();
let {getCars} = carController

let filterCars = async (data : FilterData)=>{
                            let res = await getCars(data)
                            let carStore = useCarStore()
                            let cars =  res.data.data
                            carStore.setCars(cars)
                        }
                        
</script>
