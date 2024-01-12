<template>
    <div class="w-full bg-primary-50/10 h-[88%] " :class="advanceFileter ? 'flex' : ''">
        <!-- advance filter form -->
        <div class=" lg:pr-1  lg:h-full  lg:pl-2 pl-2 pr-2 pt-8 min:h-fit h-fit sticky top-[12%]  bg-slate-300  max-lg:z-40 max-lg:min-h-screen max-lg:fixed"
            :class="advanceFileter ? ' lg:w-6/12  w-screen order-2 block ' : 'order-1 w-1/4 hidden'">
            <div class="flex justify-between  w-full  h-10">
                <h1 class="lg:ml-14 md:ml-20 text-secondary-700 text-[25px]">Explore Specific</h1>
                <div @click="toggleSideBar"
                    class="flex cursor-pointer justify-center  pt-2 border-red-800  w-10 h-10  border  rounded-full items-center "
                    :class="advanceFileter ? 'bg-secondary-700 ' : ''">
                    <advanceFilter class="w-5 h-5" :class="advanceFileter ? 'fill-gray-100' : 'fill-secondary-700'" />
                </div>
            </div>
            <div class="w-full lg:h-[91%] lg:pt-2 overflow-y-auto  h-screen">
                <AdvanceSearchForm @setCar="setCar" @loading="() => loading = !loading" @toggleSideBar="toggleSideBar" />
            </div>
        </div>
        <!-- carlist part -->
        <div class="w-full h-full  pt-4 " :class="advanceFileter ? 'order-1' : 'order-2'">
            <div class="lg:pl-24 flex flex-wrap space-y-1 justify-between ">
                <div class="lg:order-1  lg:pb-0 lg:px-0  pb-2 px-2 flex flex-col justify-between "
                    :class="advanceFileter ? 'lg:w-5/12' : 'lg:w-[25%]'">
                    <div>
                        <h1 class="lg:text-[24px] md:text-[3vw] text-[5vw] font-[500]">Search Cars In Myanmar</h1>
                        <h1 class="lg:text-[16px] md:text-[2vw] text-[4vw] font-[500]">{{ count }} {{ count == '1' ? 'car' :
                            'cars' }} listings found in AutoHub</h1>
                    </div>
                </div>
                <div class="lg:order-3 lg:none flex ml-4 justify-end items-center px-3" v-if="!advanceFileter">
                    <div @click="toggleSideBar"
                        class="flex cursor-pointer   justify-center   border-red-800  w-10 h-10  border  rounded-full items-center "
                        :class="advanceFileter ? 'bg-secondary-700 ' : ''">
                        <advanceFilter class="w-5 h-5" :class="advanceFileter ? 'fill-gray-100' : 'fill-secondary-700'" />
                    </div>
                </div>
                <div class="lg:order-2 lg:px-0  lg:ml-[70px] px-2 w-full "
                    :class="advanceFileter ? 'lg:w-[46%] lg:mr-4 ' : 'lg:w-[60%] '">
                    <input v-model="keyword" @keyup="overallSearch" type="text"
                        class="lg:h-16 md:h-14 h-12 border border-secondary-400 rounded-md px-3 w-full"
                        placeholder="Overall Search ( Name or Dealer )">
                </div>
            </div>
            <div class="w-full h-[82%] mt-8 flex  justify-center"
                :class="advanceFileter ? 'lg:justify-end pr-2 ' : 'lg:justify-center'">
                <PageLoading v-if="loading" class="h-full" />
                <div v-if="cars.length == 0 && !loading && !fetchAllData"
                    class="w-full h-full flex items-center justify-center ">
                    <noCarFound/>
                </div>
                <div v-if="fetchAllData"
                    class="w-full h-full flex items-center justify-center ">
                    No car found! ,getting all data...
                </div>
                <div v-if="!loading && cars.length != 0 && !fetchAllData"
                    class="lg:px-0 md:grid-cols-2    max-sm:grid-cols-1 grid lg:gap-x-4 lg:gap-y-4 md:gap-x-2 md:gap-y-2 gap-y-2  px-2 form-scroll  overflow-y-auto  h-full overflow-x-hidden "
                    :class="advanceFileter ? 'lg:w-[90%]  lg:grid-cols-2 ' : 'lg:w-[85%]  lg:grid-cols-3'">
                    <CarCard @car-detail="deatil(car.id)" :car="car" v-for="car in data"
                        :key="car.id" />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup >

import { ref, onMounted, computed } from 'vue'
import { advanceFilter } from 'car@/core/services/getCarCardSvg';
import CarCard from 'car@/core/components/CarCard.vue';
import { useCarStore } from 'car@/core/stores/CarStore';
import { useRouter } from 'vue-router';
import { AdvanceSearchForm } from '../services/getCarCompoent';
import PageLoading from '@/app/core/components/PageLoading.vue';
import CarController from 'car@/core/api/carController'
import noCarFound from '@/assets/icon/nocarfound.svg'

let advanceFileter = ref(false)
let router = useRouter();
let cars = ref([])
let count = ref(0)
let keyword = ref('')
let carStore = useCarStore()
let loading = ref(true)
let fetchAllData = ref(false)
let carController = CarController();
let { getCars } = carController

onMounted(() => {
    if (carStore.cars.length != 0) {
        cars.value = carStore.cars
        count.value = carStore.count
    } else {
        fetchAllData.value = true
        setTimeout(()=>{
            fetchAllData.value  = false
        },3000)
        fetchData()
    }

    loading.value = false
})

let data = computed(() => cars.value)

let fetchData = async () => {
    let res = await getCars({ type: "dealer", name: '' });
    let carStore = useCarStore()
    let carsFromRes = await res.data.data.cars
    let countFromRes = await res.data.data.count
    cars.value = carsFromRes
    count.value = countFromRes
    carStore.setCars(carsFromRes)
    carStore.setCount(countFromRes)
}

let setCar = (car) => {
    cars.value = car.cars,
    count.value = car.count
    carStore.setCars(car.cars)
    carStore.setCount(car.count)
}
let toggleSideBar = () => {
    advanceFileter.value = !advanceFileter.value
}

let deatil = (id) => {
    return router.push({ name: "car-detail", params: { id: id,type :'user' } })
}

let overallSearch = () => {
    let inputKeyword = keyword.value.toLowerCase();
    cars.value = '';
    if (inputKeyword.length === 0) {
        cars.value = carStore.cars;
        count.value = cars.value.length;
    } else {
        let inputKeywordLower = inputKeyword.toLowerCase();

        let filteredCars = carStore.cars.filter((car) => {
            let { car_model, product_year, trim_name, dealer } = car;
            let { car_brand } = car_model;
            let trim = trim_name || '';
            let firstStep = car_brand.name + ' ' + car_model.name + ' ' + product_year.name + ' ' + trim;
            const regex = new RegExp(inputKeywordLower, 'i');
            if (regex.test(firstStep.toLowerCase()) || regex.test(dealer.user.name.toLowerCase())) {
                return car; 
            }
        });

        cars.value = filteredCars;
        count.value = filteredCars.length;
    }


}
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
    background: rgb(182, 27, 45);
    border-radius: 5px;
    padding: 0;
}

/* Style the scrollbar thumb on Internet Explorer and Edge */
.form-scroll::-webkit-scrollbar-thumb:hover {
    background: rgb(182, 27, 45);
    border-radius: 5px;
    padding: 0;
}

/* Style the scrollbar track on Internet Explorer and Edge */
.form-scroll::-webkit-scrollbar-track:hover {
    background: rgb(182, 27, 45);
    border-radius: 5px;
    padding: 0;
}
</style>
