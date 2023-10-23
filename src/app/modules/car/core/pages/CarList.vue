<template>
   <div class="md:flex ">
        <div class="w-full pt-6 pl-28 pr-8 bg-green-300 relative">
            <div class="w-full flex ">
                <div class="w-6/12 flex flex-col justify-between  `${{ true ? 'bg-slate-400' : 'bg-amber-700'}}`">    
                    <h1 class="text-[24px] font-[500]">Search Cars In Myanmar</h1>
                    <h1 class="text-[16px] font-[500]">547 cars listings found in AutoHub</h1>
                </div>
                <div class="w-6/12 pl-9">
                    <input type="text" class="h-16 border border-secondary-400 rounded-md px-3 w-full" placeholder="Overall Search">
                </div>
            </div>
            <div class=" flex flex-wrap justify-between mt-8 overflow-y-auto  h-screen scroll-auto " >
                <div v-for="item in 12" class="mt-4 sc" >
                    <CarCard/>
                </div>
            </div>
        </div>
        <div class="w-7/12 bg-blue-300 flex justify-center pt-[33px]" >
            <div class="flex justify-center  w-10 h-10 bg-primary-50/30 border border-secondary-500 rounded-full items-center ">
                <advanceFilter/>
            </div>
        </div>
   </div>
</template>


<script setup lang="ts">
// import { ref } from 'vue'
// import { AdvanceSearchForm } from 'car@/core/services/getCarListCompoent';
import { advanceFilter } from 'car@/core/services/getCarCardSvg';
import CarCard from 'car@/core/components/CarCard.vue';
// let advanceFileter = ref(false);
// let advanceFormHandling = (element) => {
//     if (element == 'search') {
//         return advanceFileter ? ''
//     }
// }

</script>