<template>
    <div class="bg-white w-[339px] rounded-md border-2 border-primary-50/30  font-poppins">
        <div class="w-full ">
            <img class="object-cover w-full rounded-lg"  style="height: 200px;" :src="image" alt="car-img">
        </div>
        <div class="py-4 px-4  flex justify-between bg-white border-b-2 border-b-primary-100/30">
            <h1 class=" text-text-400 text-card-title ">
                {{ brand }} {{ model }} {{ year }} {{ trim_name ? '('+trim_name+')' : '' }}
            </h1>
            <h1 class=" font-roboto   text-card-price ">
                {{ price }} Lakhs
            </h1>
        </div>
        <div class="py-2 text-card-title flex flex-col space-y-4 px-6 border-b-2  border-b-primary-100/20 bg-primary-50/20 ">
            <div class="flex">
                <div class="w-1/2  space-y-2">
                    <div class="flex items-center space-x-2">
                        <condition/>
                        <h1 class="">
                            {{ car_condition }}
                        </h1>
                    </div>
                    <div class="flex items-center space-x-2">
                        <transmission/>
                        <p class="">
                            {{ car_transmission }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <fuelType/>
                        <p class="">
                            {{ fuel_type}}
                        </p>
                    </div>
                </div>
                <div class="w-1/2 space-y-2 pl-6">
                    <div class="flex items-center space-x-2">
                        <gear/>
                        <p class="">
                            {{ milage }}
                        </p>
                    </div>
                    <div class="flex item-center space-x-2">
                        <lighting class="mx-1"/>
                        <p class="">
                            {{ engine_power}}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <steering/>
                        <p class="">
                            {{ car_steering }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between text-card-title rounded-b-md  bg-primary-50/20 py-3 px-4">
            <button class="bg-transparent hover:bg-secondary-500 w-[27%]  hover:text-white py-1    px-4 border border-secondary-500 hover:border-transparent rounded">
                Details
            </button>
            <button class="bg-primary-300 hover:bg-primary-500 w-[68%] text-white  flex items-center justify-center  px-4 rounded py-1">
                <font-awesome-icon icon="phone" class="text-sm mr-2" />
                {{ dealer_name }}
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

const props = defineProps({
  car: {},
})

let image = props?.car.media[0].url
let model = props.car?.car_model?.name
let year = props.car?.product_year?.name
let trim_name = props?.car.trim_name
let price =  props?.car.price
let car_condition = props?.car?.car_specification?.condition
let car_transmission   = props?.car?.car_specification?.transmission
let fuel_type = props?.car?.car_specification?.fuel_type.name
let milage = props?.car?.car_specification?.milage.name
let engine_power = props?.car?.car_specification?.engine_power
let car_steering =  props?.car?.car_specification?.steering
let dealer_name = props?.car.dealer.user.name
let brand = props?.car.car_model?.car_brand.name
</script>