<template>
    <div class="w-full h-[88%] bg-primary-50/10 ">
        <div class="md:flex  h-full">
             <div class=" pt-6 pl-28 pr-8 h-full relative" :class="advanceFileter ?  'w-8/12':'w-full'">
                 <div class="w-full flex  ">
                     <div class=" flex flex-col justify-between"  :class="advanceFileter ?  'w-6/12':'w-4/12'">    
                         <h1 class="text-[24px] font-[500]">Search Cars In Myanmar</h1>
                         <h1 class="text-[16px] font-[500]">547 cars listings found in AutoHub</h1>
                     </div>
                     <div :class="advanceFileter ?  'w-6/12 pl-7':'w-8/12'">
                         <input type="text" class="h-16 border border-secondary-400 rounded-md px-3 w-full" placeholder="Overall Search">
                     </div>
                 </div>
                 <div class=" flex flex-wrap justify-between mt-8 overflow-y-auto  h-[83%] scroll-auto "  >
                     <div v-for="item in 12" class="mt-4   " >
                         <CarCard/>
                     </div>
                 </div>
             </div>
             <div class=" bg-primary-50/20 flex justify-center pt-[33px]"  :class="advanceFileter ?  'w-4/12':'w-1/12'">
                <div v-if="advanceFileter" class=" w-8/12">
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
                     <advanceFilter :class="advanceFileter ?  'fill-black':''"/>
                 </div>
             </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
// import { AdvanceSearchForm } from 'car@/core/services/getCarListCompoent';
import { advanceFilter } from 'car@/core/services/getCarCardSvg';
import CarCard from 'car@/core/components/CarCard.vue';
let advanceFileter = ref<boolean>(true);
let toggleSideBar = ()=>{
    advanceFileter.value = !advanceFileter.value
}

</script>