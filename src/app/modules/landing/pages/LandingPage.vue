<template>
    <SearchForm @get-filtered-cars="filterCars"/> 
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
