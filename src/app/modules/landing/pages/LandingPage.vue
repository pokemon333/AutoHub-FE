<template>
    <section class=" h-[88%]  relative w-full  flex  justify-center  items-center">
        <div class="lg:w-1/2 lg:h-full lg:rounded-none max-lg:absolute bg-white  w-3/4   rounded-md">
            <div class="lg:justify-start lg:mt-2 lg:ml-20 flex justify-center ">
                <h1 class="lg:leading-none  lg:text-[3vw] text-[5vw]">Comprehensive</h1>
            </div>
           <div class="lg:text-[7vw] lg:pl-1 lg:ml-28 pb-1 lg:mb-8 leading-none flex justify-center text-[9vw] text-secondary-500 font-[300] mb-2 ">
                <h1>Marketplace&nbsp;!</h1>
           </div>
            <div class="lg:text-[4vw] lg:justify-start lg:pl-20  lg:landing-page-explore lg:w-11/12 flex justify-center bg-red-600 font-[600] text-white p-auto items-center text-[7vw]">
                <h1 >Explore Now</h1>
            </div>
            <div class="lg:pt-3 lg:pb-2 lg:pr-32 lg:justify-start p-[4vw] flex justify-center items-center">
                <SearchForm class=" md:p-8 h-72 md:w-[70%] max-md:p-8 bg-primary-50/40 border-b-2 border-primary-200 flex flex-col justify-between rounded-lg" @get-filtered-cars="filterCars"/> 
            </div>
        </div>
        <div class="lg:w-1/2 w-full h-full">
            <img class="lg:landing-page-img object-cover  w-full h-full"  src="https://assetsforlife.co.uk/wp-content/uploads/2022/02/buying-property-concept-man-uniform-giving-keys-black-man-1024x683.jpg" alt="" >
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
