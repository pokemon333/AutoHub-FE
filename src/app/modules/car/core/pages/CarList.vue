<template>
    <div class="w-full h-[88%] bg-primary-50/10" :class="advanceFileter ? 'flex':''">
        <!-- advance filter form -->
        <div class=" p-10 bg-primary-100  z-50 h-screen max-lg:fixed" v-if="advanceFileter" :class="advanceFileter ? ' lg:w-6/12 w-screen order-2 ':'order-1 w-1/4'">
            <div class="flex justify-between  w-full  h-10">
                <h1 class="text-secondary-700 text-[25px]">Explore Specific</h1>
                <div @click="toggleSideBar" class="flex cursor-pointer justify-center  pt-2 border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                        <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
                </div> 
            </div>
            <div class=" flex flex-col space-y-10  w-full h-auto">
                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-100  border-primary-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-primary-100" >Dealer</option>
                        <option value="brand" class="bg-primary-100">Brand</option>
                    </select>
                </div>
                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-100  border-primary-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-primary-100" >Dealer</option>
                        <option value="brand" class="bg-primary-100">Brand</option>
                    </select>
                </div>

                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-100  border-gray-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-gray-100" >Dealer</option>
                        <option value="brand" class="bg-gray-100">Brand</option>
                    </select>
                </div>

                <div class="relative w-full mt-10">
                    <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
                    <select  name="type" class="w-full border bg-primary-100  border-gray-500  peer h-12 rounded-md px-3">
                        <option value="dealer" class="bg-gray-100" >Dealer</option>
                        <option value="brand" class="bg-gray-100">Brand</option>
                    </select>
                </div>
                <div class="">
                    <button class="bg-red-500 rounded-md text-white py-2 w-full">
                        submit
                    </button>
                </div>
            </div>
        </div>
        <!-- carlist part -->
        <div class="w-full   pt-4 " :class="advanceFileter ? 'order-1':'order-2'">    
            <div class="lg:pl-24 flex flex-wrap space-y-1 justify-between ">
                <div class="lg:order-1 lg:pb-0 lg:px-0  pb-2 px-2 flex flex-col justify-between "  :class="advanceFileter ?  'lg:w-5/12':'lg:w-[25%]'">    
                   <h1 class="lg:text-[24px] md:text-[3vw] text-[5vw] font-[500]">Search Cars In Myanmar</h1>
                   <h1 class="lg:text-[16px] md:text-[2vw] text-[4vw] font-[500]">{{ count }} {{ count == '1' ? 'car': 'cars' }} listings found in AutoHub</h1>
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
                <div class="md:grid-cols-2 max-sm:grid-cols-1 grid gap-[4vw]   overflow-y-auto  h-full scroll-auto " :class="advanceFileter? 'lg:w-[90%]  lg:grid-cols-2 ':'lg:w-[85%]  lg:grid-cols-3'"  >
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


<!-- <div class="md:flex  h-full ">
            
    <div class=" pt-6    relative w-full bg-green-300  " :class="advanceFileter ?  'lg:w-8/12':'lg:w-full'">

        <div class="lg:flex lg:pl-24 max-lg:flex-col w-full">

            <div class="flex justify-between">
               <div class=" lg:pb-0 lg:px-0  pb-2 px-2 flex flex-col justify-between "  :class="advanceFileter ?  'lg:w-5/12':'lg:w-[25%]'">    
                   <h1 class="text-[24px] font-[500]">Search Cars In Myanmar</h1>
                   <h1 class="text-[16px] font-[500]">{{ count }} {{ count == '1' ? 'car': 'cars' }} listings found in AutoHub</h1>
               </div>
               <div class="lg:none flex     ml-4 justify-end items-center px-3" v-if="!advanceFileter">
                   <div  @click="toggleSideBar" class="flex cursor-pointer   justify-center   border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                       <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
                   </div>
               </div>
            </div>

            <div  class="lg:px-0  lg:ml-[70px] px-2 w-full " :class="advanceFileter ?  'lg:w-[43%] ':'lg:w-[58%] '" >
                <input v-model="keyword" @keyup="overallSearch" type="text" class="h-16 border border-secondary-400 rounded-md px-3 w-full" placeholder="Overall Search ( Name or Dealer )">
            </div>

            <div class="lg:flex  w-[8%]  hidden ml-4 justify-end items-center px-3" v-if="!advanceFileter">
               <div  @click="toggleSideBar" class="flex cursor-pointer   justify-center   border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                   <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
               </div>
            </div>

        </div>

        <div class="w-full h-[88%]  flex justify-center bg-red-400" :class="advanceFileter ?  'lg:justify-end ':'lg:justify-center'">
           <div class="md:grid-cols-2 max-sm:grid-cols-1 grid gap-[4vw]   overflow-y-auto  h-full scroll-auto " :class="advanceFileter? 'lg:w-[90%]  lg:grid-cols-2 ':'lg:w-[85%]  lg:grid-cols-3'"  >
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

    <div class=" max-lg:z-50  fixed z-50   max-lg:w-screen max-lg:h-screen  justify-center pt-[33px]  bg-primary-100"  :class="advanceFileter ?  'lg:w-[35%]':'lg:w-1/12'" v-if="advanceFileter">
       <div class="flex justify-between  w-full px-10 h-10">
           <h1 class="text-secondary-700 text-[25px]">Explore Specific</h1>
           <div @click="toggleSideBar" class="flex cursor-pointer justify-center  pt-2 border-red-800  w-10 h-10  border  rounded-full items-center " :class="advanceFileter ?  'bg-secondary-700 ':''">
                   <advanceFilter :class="advanceFileter ?  'fill-gray-100':'fill-secondary-700'"/>
           </div> 
       </div>
       <div class="px-10 flex flex-col space-y-10  w-full h-auto">
           <div class="relative w-full mt-10">
               <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
               <select  name="type" class="w-full border bg-primary-100  border-primary-500  peer h-12 rounded-md px-3">
                   <option value="dealer" class="bg-primary-100" >Dealer</option>
                   <option value="brand" class="bg-primary-100">Brand</option>
               </select>
           </div>
           <div class="relative w-full mt-10">
               <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
               <select  name="type" class="w-full border bg-primary-100  border-primary-500  peer h-12 rounded-md px-3">
                   <option value="dealer" class="bg-primary-100" >Dealer</option>
                   <option value="brand" class="bg-primary-100">Brand</option>
               </select>
           </div>

           <div class="relative w-full mt-10">
               <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
               <select  name="type" class="w-full border bg-primary-100  border-gray-500  peer h-12 rounded-md px-3">
                   <option value="dealer" class="bg-gray-100" >Dealer</option>
                   <option value="brand" class="bg-gray-100">Brand</option>
               </select>
           </div>

           <div class="relative w-full mt-10">
               <label for="type" class="absolute px-2 -top-2 left-3  bg-primary-100 text-xs">Search Type</label>
               <select  name="type" class="w-full border bg-primary-100  border-gray-500  peer h-12 rounded-md px-3">
                   <option value="dealer" class="bg-gray-100" >Dealer</option>
                   <option value="brand" class="bg-gray-100">Brand</option>
               </select>
           </div>
           <div class="">
               <button class="bg-red-500 rounded-md text-white py-2 w-full">
                   submit
               </button>
           </div>
       </div>
    </div>
</div> -->

<script setup lang="ts">
import { ref,onMounted, computed } from 'vue'
// import { AdvanceSearchForm } from 'car@/core/services/getCarListCompoent';
import { advanceFilter } from 'car@/core/services/getCarCardSvg';
import CarCard from 'car@/core/components/CarCard.vue';
import { useCarStore } from 'car@/core/stores/CarStore';
import { useRouter } from 'vue-router';


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
    let inputkeyword = keyword.value.toLowerCase();
    cars.value = '' 
    if (inputkeyword.length == 0) {
        cars.value = carStore.cars  
        count.value = cars.value.length
    }else{

        let inputKeywordLower = inputkeyword.toLowerCase();

        let filteredCars = carStore.cars.filter((car) => {
                                    let { car_model, product_year, trim_name, dealer } = car;
                                    let { car_brand } = car_model;
                                    let trim = trim_name || '';
                                    let firstStep = car_brand.name + ' ' + car_model.name + ' ' + product_year.name + ' ' + trim;

                                    return (
                                        firstStep.toLowerCase().split(' ').includes(inputKeywordLower) ||
                                        dealer.user.name.toLowerCase().includes(inputKeywordLower)
                                    );
                                });
        
        cars.value = filteredCars;
        count.value = filteredCars.length
    }
    
}
</script>