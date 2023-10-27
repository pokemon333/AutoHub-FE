<template>
    <section class="h-[88%] relative w-full  flex  justify-center max-md:items-center ">
        <div class="md:w-6/12 md:h-full  max-md:mt-4 max-md:py-2 h-10/12 w-10/12   max-md:rounded-md  flex z-20 max-md:absolute flex-col max-md:bg-white ">
            <h1 class="md:text-[42px] leading-10 pt-2  pb-6 md:ml-20 max-md:flex max-md:justify-center max-md:text-[30px]  font-[400] ">Comprehensive</h1>
            <h1  class=" md:text-[90px]  leading-10  pb-3 md:ml-20 max-md:flex max-md:justify-center  max-md:text-[50px] m-0 p-0  text-secondary-500 font-[300]" >Marketplace&nbsp;!</h1>
            <div class="md:landing-page-explore md:w-[70%] md:h-16  max-md:h-16 flex items-center pb-3 max-md:justify-center mt-10  bg-red-600 ">
                <h1 class="md:text-[48px] md:pl-20 max-md:text-[30px]  text-white font-[600]">Explore Now</h1>
            </div>
            <div class="md:pl-10 max-md:px-2  mt-4">
                <SearchForm class=" md:p-8 h-72 md:w-[70%] max-md:p-8 bg-primary-50/40 border-b-2 border-primary-200 flex flex-col justify-between rounded-lg" @get-filtered-cars="filterCars"/> 
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
