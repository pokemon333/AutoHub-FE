<template>
    <!-- Dealer Car list section -->
    <div class="pt-2  mx-auto w-full ">
        <!-- Car for sales  wrapper-->
        <div class=" md:flex  md:justify-between  px-2 pt-3 pb-2 justify-between items-center ">
            <div class=" flex lg:justify-start justify-between items-center   md:w-6/12 w-full   ">
                <div class="md:ms-6 w-1/12 ">
                    <Back @click="this.$router.push({name : 'dealer-profile'})" class="fill-black w-[30px] h-[30px] "/>
                </div>
                <h1 
                    class="md:text-3xl md:me-0 me-12   text-3xl"
                    :class="isAdvanceSearchMenuOpen ? 'lg:ms-2' : ''"
                >
                    Car For Sales
                </h1>
                <div class="flex   items-center space-x-4">
                    <!-- Mobile-->
                    <button class="md:hidden bg-secondary-500 border border-secondary-800 w-8 flex items-center justify-center h-8  text-white rounded-md ">
                        <plus class="fill-white w-5 h-5 "/>
                    </button>

                    <!-- For table  button -->
                    <button class="md:block lg:hidden hidden   bg-secondary-500 border border-secondary-800 w-12 h-12  text-white rounded-full   ">
                        <plus class="fill-white w-5 h-5 mx-auto"/>
                    </button>

                    <!-- For desktop  button -->
                    <button class="bg-secondary-500 md:py-2 lg:block hidden  py-1 px-2 text-white rounded-md ">
                        Sell My Car
                    </button>
                    <div
                        @click="$emit('toggle-menu')"
                        class=" md:hidden flex    cursor-pointer  justify-center   border-red-800  md:w-4 md:h-4 w-8 h-8  border  rounded-md items-center ">
                        <advanceFilter class="w-4 h-4" 
                            :class="false ? 'fill-gray-100' : 'fill-secondary-700'" />
                    </div>
                </div>
            </div>
            <div class="flex  md:w-6/12 md:mt-0 w-full  mt-2  md:space-x-6 items-center justify-end   ">
                <input class="border border-gray-300 px-2 md:w-9/12 w-full  rounded-md h-14" type="text"
                    v-model="filterText" @keyup="overallSearch()" placeholder="Overall Search">
                <div
                    v-if="!isAdvanceSearchMenuOpen"
                    class="md:flex   md:rounded-full hidden  cursor-pointer  justify-center   border-red-800  w-10 h-10  border  rounded-md items-center ">
                    <advanceFilter class="w-5 h-5 " @click="() => $emit('toggle-menu')"
                        :class="false ? 'fill-gray-100' : 'fill-secondary-700'" />
                </div>
            </div>
        </div>

        <!-- Car list parts -->
        <div 
            class="py-2 grid overflow-y-auto form-scroll max-h-[70vh]"
            :class="isAdvanceSearchMenuOpen ? ' 2xl:grid-cols-3 lg:grid-cols-2 lg:pe-2 lg:ps-20 lg:gap-3 px-4' : ' 2xl:grid-cols-4  px-4  gap-3 grid-cols-1  lg:grid-cols-3 lg:gap-8 md:grid-cols-2 md:px-20 '"
        >
            <CarCard @car-detail="detail(car.id)" v-for="car in cars" :car="car" :key="car.id" />
        </div>

    </div>
</template>

<script setup>

import Back from 'asset@/icon/back.svg'
import Plus from 'asset@/icon/plus.svg'
import { ref,computed } from 'vue'
import  advanceFilter  from 'asset@/icon/advance-filter.svg';
import CarCard from 'dealer@/core/components/CarCard.vue';
import { onMounted } from 'vue'
import { useUserStore } from '@/app/core/store/UserStore';
import apiService from '@/app/core/services/apiService';
import { useRouter } from 'vue-router';
import {useCarStore } from 'dealer@/core/store/CarStore'



const router = useRouter();

const carStore        = useCarStore()

const userStore = useUserStore();

const originalData = computed(()=> carStore.cars);

const cars = ref([]);

const filterText = ref('');

defineProps([
    'isAdvanceSearchMenuOpen'
])

let detail = (id) => {
    return router.push({ name: "car-detail", params: { id: id } })
}

const getDealerCar = () => {
    apiService.get(`dealer/cars/${userStore.user.dealer_id}`).then(res => {
        carStore.setCars(res.data.data) 
        cars.value = carStore.cars
        console.log();
    })
}

const overallSearch = () => {
    let filteredCars = originalData.value.filter((car) => {
        let trim_name = car.trim_name ? car.trim_name : ''
        let nameString = car.car_model.car_brand.name + ' ' + car.car_model.name + ' ' + car.product_year.name + ' ' + trim_name;
        const regex = new RegExp(filterText.value.toLowerCase(), 'i');
        if (regex.test(nameString.toLowerCase())) {
            return car;
        };
    })
    if (filterText.value == '') {
        cars.value = originalData.value
    } else {
        cars.value = filteredCars
    }
}

onMounted(() => {
    getDealerCar();
})
</script>


<style scoped>
.form-scroll::-webkit-scrollbar {
    width: 4px;
}

/* Style the scrollbar thumb (the draggable part) */
.form-scroll::-webkit-scrollbar-thumb {
    background: rgb(182, 27, 45);
    border-radius: 5px;
    padding: 0;
}

/* Style the scrollbar track on Firefox */
.form-scroll::-webkit-scrollbar-track {
    background: transparent;
}

/* Style the scrollbar thumb on Firefox */
.form-scroll::-webkit-scrollbar-thumb:active {
    background: #8794a3;
}

/* Style the scrollbar thumb on Internet Explorer and Edge */
.form-scroll::-webkit-scrollbar-thumb:hover {
    background: #6a6f76;
}

/* Style the scrollbar track on Internet Explorer and Edge */
.form-scroll::-webkit-scrollbar-track:hover {
    background: #f1f1f1;
}


input[type=checkbox]:checked {
    accent-color: black;
    color: #ffffff !important;
}
</style>