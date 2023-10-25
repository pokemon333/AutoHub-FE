<template>
    <div class=" h-[88%] flex ">
        <div class=" w-[7%] h-full pt-10 flex justify-center">
            <back/>
        </div>
        <div class="h-ful w-[93%] pt-10 flex">
            <div class=" w-7/12">
                <div class="w-full">
                    <Carousel/>
                </div>
            </div>
            <div class="w-5/12 pr-9 flex flex-col space-y-5">
                <div class="bg-primary-100/30  px-8 rounded-sm border-b border-b-primary-300  py-2">
                    <h1 class="text-[20px] font-[500]">Dealer Information</h1>
                     <div class="flex mt-1">
                        <div class="w-1/4 flex justify-end px-3 font-roboto">
                            <ul class="list-disc flex flex-col space-y-1    ">
                                <li>Name </li>
                                <li>Social Link</li>
                                <li>Address</li>
                                <li>Phone </li>
                            </ul>
                        </div>
                        <div class="w-2/4 pl-1 font-[500] flex flex-col space-y-1 font-roboto">
                            <h1>Jhon Doe</h1>
                            <h1>jhondoe@gmail.com</h1>
                            <h1>Yangon</h1>
                            <h1>098393795060</h1>
                        </div>
                        <div class="w-1/4 flex items-end justify-end text-white">
                            <button class="h-10 w-30 px-4 py-1 rounded-xl bg-secondary-700 font-roboto text-[14px]">Call Now</button>
                        </div>
                     </div>
                </div>
                <div class="bg-primary-100/30  px-8 rounded-sm border-b border-b-primary-300  py-2">
                    <h1 class="text-[20px] font-[500]">License Information</h1>
                     <div class="flex mt-1 px-5">
                            <ul class="list-disc flex flex-col space-y-1  font-[500]   ">
                                <li>With License</li>
                                <li>YGN</li>
                                <li>Black</li>
                                <li>7k******</li>
                            </ul>
                     </div>
                </div>
                <div class="bg-primary-100/30  px-8 rounded-sm border-b border-b-primary-300  pt-2 pb-10">
                    <h1 class="text-[20px] font-[500]">Car Information</h1>
                     <div class="flex mt-8">
                        <div class="w-8/12 pl-5">
                            <ul class="list-disc flex flex-col space-y-1  font-[500]   ">
                                <li>With License</li>
                                <li>YGN</li>
                                <li>Black</li>
                                <li>7k******</li>
                            </ul>
                        </div>
                        <div class="w-4/12 mt-1 px-5">
                                <ul class="list-disc flex flex-col space-y-1  font-[500]   ">
                                    <li>With License</li>
                                    <li>YGN</li>
                                    <li>Black</li>
                                    <li>7k******</li>
                                </ul>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

import { onMounted , ref  } from 'vue';
import CarController from 'car@/core/api/carController';
import { useRoute  } from 'vue-router';
import { back } from 'car@/core/services/getCarCardSvg'
import Carousel from 'car@/core/components/Carousel.vue'

let carController = CarController()
let { getCarDetial } = carController
let route  = useRoute()
let car = ref({})
let getData = async () => {
    let res = await  getCarDetial(route.params.id)
    car.value =  res.data.data
}
onMounted(()=>{
     getData();
})

</script>