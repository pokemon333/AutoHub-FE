<template>
    <div class="w-full h-[88%] bg-primary-50/10" :class="advanceFileter ? 'flex':''">
        <!-- advance filter form -->
        <div class=" p-10 bg-primary-50  max-lg:z-40 max-lg:h-screen max-lg:fixed" v-if="advanceFileter" :class="advanceFileter ? ' lg:w-6/12 w-screen order-2 ':'order-1 w-1/4'">
            <div class="flex justify-between  w-full  h-10">
                <h1 class="text-secondary-700 text-[25px]">Explore Specific</h1>
                <div @click="toggleSideBar" class="flex cursor-pointer justify-center  pt-2 border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                        <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
                </div> 
            </div>
            <div class=" flex flex-col space-y-10  w-full h-auto">
                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3 bg-primary-50 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-50  border-primary-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-primary-100" >Dealer</option>
                        <option value="brand" class="bg-primary-100">Brand</option>
                    </select>
                </div>
                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3 bg-primary-50 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-50  border-primary-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-primary-100" >Dealer</option>
                        <option value="brand" class="bg-primary-100">Brand</option>
                    </select>
                </div>

                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3 bg-primary-50 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-50  border-gray-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-gray-100" >Dealer</option>
                        <option value="brand" class="bg-gray-100">Brand</option>
                    </select>
                </div>

                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3 bg-primary-50 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-50  border-gray-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-gray-100" >Dealer</option>
                        <option value="brand" class="bg-gray-100">Brand</option>
                    </select>
                </div>
                <div class="flex justify-center">
                    <button class="lg:w-5/12 bg-red-500 rounded-md text-white py-2 w-full">
                        Submit
                    </button>
                </div>
            </div>
        </div>
        <!-- carlist part -->
        <div class="w-full   pt-4 " :class="advanceFileter ? 'order-1':'order-2'">    
            <div class="lg:pl-24 flex flex-wrap space-y-1 justify-between ">
                <div class="lg:order-1  lg:pb-0 lg:px-0  pb-2 px-2 flex flex-col justify-between "  :class="advanceFileter ?  'lg:w-5/12':'lg:w-[25%]'"> 
                    <!-- <div class="  flex  justify-center">
                        <back  class="cursor-pointer"/>
                    </div>    -->
                    <div>
                        <h1 class="lg:text-[24px] md:text-[3vw] text-[5vw] font-[500]">Search Cars In Myanmar</h1>
                        <h1 class="lg:text-[16px] md:text-[2vw] text-[4vw] font-[500]">{{ count }} {{ count == '1' ? 'car': 'cars' }} listings found in AutoHub</h1>
                    </div>
               </div>
               <div class="lg:order-3 lg:none flex ml-4 justify-end items-center px-3" v-if="!advanceFileter">
                   <div  @click="toggleSideBar" class="flex cursor-pointer   justify-center   border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                       <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
                   </div>
               </div> 
               <div  class="lg:order-2 lg:px-0  lg:ml-[70px] px-2 w-full " :class="advanceFileter ?  'lg:w-[46%] lg:mr-4 ':'lg:w-[60%] '" >
                    <input v-model="keyword" @keyup="overallSearch" type="text" class="h-16 border border-secondary-400 rounded-md px-3 w-full" placeholder="Overall Search ( Name or Dealer )">
                </div>
            </div>
            <div class="w-full h-[88%]  flex justify-center" :class="advanceFileter ?  'lg:justify-end ':'lg:justify-center'">
                <div class="lg:px-0 md:grid-cols-2 bg-primary-50/10  max-sm:grid-cols-1 grid gap-[4vw] px-2   overflow-y-auto  h-full scroll-auto " :class="advanceFileter? 'lg:w-[90%]  lg:grid-cols-2 ':'lg:w-[85%]  lg:grid-cols-3'"  >
                    <CarCard 
                    @car-detail="deatil(car.id)"
                    class="mt-8"
                    :car="car" 
                    v-for="car in data"
                    :key="car.id"
                    />
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref,onMounted, computed } from 'vue'
// import { AdvanceSearchForm } from 'car@/core/services/getCarListCompoent';
import { advanceFilter } from 'car@/core/services/getCarCardSvg';
import CarCard from 'car@/core/components/CarCard.vue';
import { useCarStore } from 'car@/core/stores/CarStore';
import { useRouter } from 'vue-router';
// import { back } from 'car@/core/services/getCarCardSvg'


let advanceFileter = ref<boolean>(false)
let router = useRouter();
let cars = ref<any>([])
let count = ref(0)
let keyword = ref('')
let carStore = useCarStore()

onMounted(()=>{
    cars.value  = carStore.cars   
    count.value  = carStore.count    
})

let data = computed(()=>cars.value)

let toggleSideBar = ()=>{
    advanceFileter.value = !advanceFileter.value
}

let deatil = (id : string) => {
    console.log(id);
    
    return router.push({name:"car-detail" , params : { id : id}})
}

let overallSearch = () =>{
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