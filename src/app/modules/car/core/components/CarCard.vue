<template>
    <div class="bg-white w-[339px] rounded-md border-2 border-primary-50/30  font-poppins">
        <div class="w-full">
            <img class="object-fit w-full rounded-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-r36Agi_i2Omb5rbsqzwVKuQwADxO6OrSfJM0cyQVA&s" alt="car-img">
        </div>
        <div class="py-4 px-4  flex justify-between bg-white border-b-2 border-b-primary-100/30">
            <h1 class=" text-text-400 text-card-title ">
                The BMW x6 2023 ()
            </h1>
            <h1 class="text-success-800 font-roboto font-extabold text-card-price ">
                3000 Lakhs
            </h1>
        </div>
        <div class="py-2 text-card-title flex flex-col space-y-4 px-6 border-b-2  border-b-primary-100/20 bg-primary-50/20 ">
            <div class="flex">
                <div class="w-1/2  space-y-2">
                    <div class="flex items-center space-x-2">
                        <condition/>
                        <h1 class="">
                            140-145 KM
                        </h1>
                    </div>
                    <div class="flex items-center space-x-2">
                        <transmission/>
                        <p class="">
                            140-145 KM
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <fuelType/>
                        <p class="">
                            140-145 KM
                        </p>
                    </div>
                </div>
                <div class="w-1/2 space-y-2">
                    <div class="flex items-center space-x-2">
                        <gear/>
                        <p class="">
                            140-145 KM
                        </p>
                    </div>
                    <div class="flex item-center space-x-2">
                        <lighting class="mx-1"/>
                        <p class="">
                            140-145 KM
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <steering/>
                        <p class="">
                            Left-steering
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between text-card-title rounded-b-md  bg-primary-50/20 py-3 px-4">
            <button class="bg-transparent hover:bg-secondary-500 w-[27%]  hover:text-white py-1    px-4 border border-secondary-500 hover:border-transparent rounded">
                Details
            </button>
            <button class="bg-primary-300 hover:bg-primary-500 w-[68%] text-white   px-4 rounded py-1">
                <font-awesome-icon icon="phone" class="text-sm mr-2" />
                Aye Aye Cho
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { 
    condition,
    fuelType,
    steering,
    transmission,
    gear,
    lighting
} from 'car@/core/services/getCarCardSvg';
</script>