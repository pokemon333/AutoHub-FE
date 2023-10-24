<template>
    <section class="h-[700px] relative w-full  flex  justify-center ">
        <div class="md:w-6/12 md:h-full max-sm:mt-4 max-sm:py-2 h-10/12 w-10/12   max-sm:rounded-md  flex z-20 max-sm:absolute flex-col max-sm:bg-white ">
            <h1 class="md:text-[46px] md:ml-20 max-sm:ml-16 max-sm:text-[23px]  font-[400] pt-10">Comprehensive</h1>
            <h1  class=" md:text-[96px] md:ml-20 max-sm:ml-7 max-sm:text-[40px] p-0  text-secondary-500 font-[300]">Marketplace&nbsp;!</h1>
            <div class="md:landing-page-explore md:w-[88%] md:h-20 max-sm:h-16 flex items-center justify-center  bg-red-600 ">
                <h1 class="md:text-[48px] md:pl-20 max-sm:text-[30px]  text-white font-[600]">Explore Now</h1>
            </div>
            <div class="md:pl-10 max-sm:px-2  mt-6">
                <SearchForm class=" md:p-12 h-80 md:w-[70%] max-sm:p-8 bg-primary-50/40 border-b-2 border-primary-200 flex flex-col justify-between rounded-lg" @get-filtered-cars="filterCars"/> 
            </div>
        </div>
        <div class="md:w-6/12 w-[100%]   h-full">
            <img class="object-cover md:landing-page-img w-full h-full"  src="https://assetsforlife.co.uk/wp-content/uploads/2022/02/buying-property-concept-man-uniform-giving-keys-black-man-1024x683.jpg" alt="" >
        </div>
    </section>
</template>


<script setup lang="ts">

import { SearchForm } from 'landing@/services/getLandingComponent'
import  CarController  from 'car@/core/api/carController'
import { FilterData  } from 'car@/core/api/carController';
import { useCarStore } from 'car@/core/stores/CarStore';
import { useRouter } from 'vue-router';


let carController = CarController();
let {getCars} = carController
let router = useRouter()

let filterCars = async (data : FilterData) => {
                            let res = await getCars(data)
                            let carStore = useCarStore()
                            let cars =  res.data.data.cars
                            let count = res.data.data.count
                            carStore.setCars(cars)
                            carStore.setCount(count)
                            router.push({ name: 'cars'})
                        }
                        
</script>
