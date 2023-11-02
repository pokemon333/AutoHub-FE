<template>
    <div class="pt-4 pb-4 lg:px-14  ">
        <!-- Search Input and Dropdown -->
        <div class=" w-1/2">
            <select  name="type" class="w-full border bg-primary-50/70 mt-2  border-gray-500   peer h-10 rounded-md px-3">
                <option value="dealer" style="background-color:#BDBDBD;">Dealer</option>
                <option value="brand" style="background-color:#BDBDBD;">Brand</option>
            </select>
        </div>

          <!-- Brand -->
        <div class="mt-4">
            <label for="">Brand</label>
            <div class="mt-2">
                <button type="button" @click="()=>brandDropDown = !brandDropDown" class="flex items-center border border-gray-500  w-full p-2 text-base text-gray-900 transition duration-75 rounded-md group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div class=" py-2 space-y-2" v-if="brandDropDown">
                    <div class="px-2 flex space-x-2" v-for="(brand,index) in brands" :key="index">
                        <input type="checkbox" :value="brand?.name" v-model="checkedBrand[index]" @change="filterModel">
                        <h1>{{ brand?.name }}</h1>
                    </div>
                </div>
           </div>
        </div>

          <!-- Model -->
        <div class="mt-4">
            <label for="">Model</label>
           <div class="mt-2">
                <button type="button" @click="()=>divisionDropDown = !divisionDropDown" class="flex items-center border border-gray-500  w-full p-2 text-base text-gray-900 transition duration-75 rounded-md group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div class=" py-2 space-y-2" v-if="divisionDropDown">
                    <div class="px-2 flex space-x-2" v-for="division in divisions">
                        <input type="checkbox" :value="division?.id">
                        <h1>{{ division?.name }}</h1>
                    </div>
                </div>
           </div>
        </div>

          <!-- Year -->
        <div class="mt-4">
            <label for="">Year</label>
           <div class="mt-2">
                <button type="button" @click="()=>divisionDropDown = !divisionDropDown" class="flex items-center border border-gray-500  w-full p-2 text-base text-gray-900 transition duration-75 rounded-md group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div class=" py-2 space-y-2" v-if="divisionDropDown">
                    <div class="px-2 flex space-x-2" v-for="division in divisions">
                        <input type="checkbox" :value="division?.id">
                        <h1>{{ division?.name }}</h1>
                    </div>
                </div>
           </div>
        </div>

        <!-- condition -->
        <div class="mt-4">
            <label for="">Condition</label>
            <div class="mt-2 flex space-x-3">
                <div class="flex space-x-1 ">
                    <input type="checkbox" value="new">
                    <h1>New</h1>
                </div>
                <div class="flex space-x-1 ">
                    <input type="checkbox" value="used">
                    <h1>Used</h1>
                </div>
            </div>
        </div>

       

        <!-- price -->
        <div class="mt-4">
            <label for="">Price</label>
            <div class="h-10 flex space-x-1 mt-2  items-center">
                <div class="w-1/2 h-full">
                    <input type="text" class="w-full h-full rounded-md border border-gray-500 px-2 bg-primary-50/70" placeholder="min">
                </div>
                <div>
                    <h1>-</h1>
                </div>
                <div class="w-1/2 h-full">
                    <input type="text" class="w-full h-full rounded-md border border-gray-500 px-2 bg-primary-50/70" placeholder="max">
                </div>
            </div>
        </div>

         <!-- division -->
         <div class="mt-4">
            <label for="">Division</label>
           <div class="mt-2">
                <button type="button" @click="()=>divisionDropDown = !divisionDropDown" class="flex items-center border border-gray-500  w-full p-2 text-base text-gray-900 transition duration-75 rounded-md group" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <div class=" py-2 space-y-2" v-if="divisionDropDown">
                    <div class="px-2 flex space-x-2" v-for="division in divisions">
                        <input type="checkbox" :value="division?.id">
                        <h1>{{ division?.name }}</h1>
                    </div>
                </div>
           </div>
        </div>

        <div class="mt-4 flex justify-center">
            <button class="bg-red-500 py-1 px-4 rounded-md text-white">
                Search  
            </button>
        </div>

    </div>
</template>


<script setup lang="ts">

import  AdvanceSearchController from 'advanceSearch@/api/AdvanceSearchController'
import { onMounted  , ref } from 'vue';

let advanceSearchController = AdvanceSearchController();
let brands      =  ref([]);
let models      =  ref([]);
let years       =  ref([]);
let dealers     =  ref([]);
let divisions   =  ref([]);
let divisionDropDown = ref(false);
let brandDropDown = ref(false);
let checkedBrand = ref(Array(brands.value.length).fill(''));
// let ModelDropDown = ref(false);
// let YearDropDown = ref(false);

// let filteredModels = ref([]);
// let filteredYears = ref([]);

let filterModel = () => {
    console.log(checkedBrand.value)
}

let getResource = async () => {
    try {
        const res = await advanceSearchController.getResources();
        let data =  await res.data.data
        brands.value    = await data.brands;
        models.value    = await data.models;
        years.value     = await data.years;
        dealers.value   = await data.dealers;
        divisions.value = await data.divisions;
        console.log(brands.value);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

onMounted(()=>{
        getResource();
})
</script>