<template>
      <div class="bg-white w-full h-[400px] rounded-lg border-2 border-primary-50/30  font-poppins">
        <div class="w-full relative">
            <div v-if="car?.car_info" class="py-1 px-2 rounded-lg text-white text-xs border-2 absolute bg-primary-500 bg-opacity-90 top-1 right-1 border-secondary-300">
               {{ car?.car_info?.plate_division }} / {{car?.car_info?.plate_number.slice(0,3)  + '*'.repeat(car?.car_info?.plate_number.length - 3) }}
            </div>
            <img class="object-cover w-full rounded-lg"  style="height: 200px;" :src="image" alt="car-img">
        </div>
        <div class="py-4 px-4  flex justify-between  items-center bg-white border-b-2 border-b-primary-100/30">

            <div class="relative inline-block group w-1/2">

                <div class="flex items-center" @click="()=>isModelOpen = !isModelOpen">
                    <h1 class="text-text-400 overflow-hidden w-full  text-card-title truncate  cursor-pointer">
                        {{ brand }} {{ model }} {{ year }} {{ trim_name ? '('+trim_name+')' : '' }}
                    </h1>
                    <h1 class="rotate-90 text-gray-500 text-md">
                        >
                    </h1>
                </div>

                <div  :class="isModelOpen ? 'opacity-100 bg-red-600' : 'opacity-0'" class=" bg-gray-800 whitespace-nowrap   text-white text-xs rounded-md px-2 py-1 absolute  left-[70%] botton-0 transform   transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {{ brand }} {{ model }} {{ year }} {{ trim_name ? '('+trim_name+')' : '' }}
                </div>
            </div>


            <h1 class=" font-roboto-price   text-card-price ">
                {{ price }} Lakhs
            </h1>
        </div>
        <div class="py-2 text-card-title flex flex-col space-y-4 px-6 border-b-2  border-b-primary-100/20 bg-primary-50/20 ">
            <div class="flex">
                <div class="w-1/2  space-y-2">
                    <div class="flex items-center space-x-2">
                        <condition/>
                        <h1 class="">
                            {{ car_condition  ?? '-'}}
                        </h1>
                    </div>
                    <div class="flex items-center space-x-2">
                        <transmission/>
                        <p class="">
                            {{ car_transmission ?? '-' }}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <fuelType/>
                        <p class="">
                            {{ fuel_type ?? '-'}}
                        </p>
                    </div>
                </div>
                <div class="w-1/2 space-y-2 pl-6">
                    <div class="flex items-center space-x-2">
                        <gear/>
                        <p class="">
                            {{ milage ??'-' }} KM
                        </p>
                    </div>
                    <div class="flex item-center space-x-2">
                        <lighting class="mx-1"/>
                        <p class="">
                            {{ engine_power ?? '-'}}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <steering/>
                        <p class="">
                            {{ car_steering ?? '-' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between text-card-title rounded-b-md  bg-primary-50/20 py-3 px-4">
            <button  @click="$emit('carDetail',car?.id)" class="bg-transparent hover:bg-secondary-500 w-[27%]  hover:text-white py-1    px-4 border border-secondary-500 hover:border-transparent rounded">
                Details
            </button>
            <button class="bg-primary-300 hover:bg-primary-500 w-[68%] text-white  flex items-center justify-center  space-x-4  px-4 rounded py-1">
                <div >
                    <edit  class="w-4 h-4"/>
                </div>
                <h1> Edit Information</h1>
            </button>
        </div>
    </div>
</template>

<!-- -->
<script setup>

    import { 
        condition,
        fuelType,
        steering,
        transmission,
        gear,
        lighting,
        edit
    } from 'dealer@/core/services/getCarCardSvg';
    
    import {ref} from 'vue'

    const props = defineProps({
        car: {},
    })

    let isModelOpen = ref(false);

    let image  = props?.car?.images[0]?.url
    let model  = props.car?.car_model?.name
    let year  = props.car?.product_year?.name
    let trim_name  = props?.car.trim_name
    let price  =  props?.car.price
    let car_condition  = props?.car?.car_specification?.condition
    let car_transmission   = props?.car?.car_specification?.transmission
    let fuel_type  = props?.car?.car_specification?.fuel_type.name
    let milage  = props?.car?.car_specification?.mileage.name
    let engine_power  = props?.car?.car_specification?.engine_power
    let car_steering  =  props?.car?.car_specification?.steering
    let brand = props?.car.car_model?.car_brand.name

</script>