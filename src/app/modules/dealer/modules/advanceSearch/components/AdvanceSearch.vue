<template>
    <div  v-if="isAdvanceSearchMenuOpen" class="lg:w-6/12 lg:h-full lg:px-14 bg-slate-300   w-full h-[88vh] overflow-y-auto  form-scroll fixed ">
        <!-- header and toggle button -->
        <div class=" md:ms-20 md:me-2 md:my-6 my-5 mx-2 flex items-center    justify-between">
            <h1 class="text-3xl text-secondary-700">Advance Search</h1>
            <div
                v-if="isAdvanceSearchMenuOpen"
                class="flex  rounded-md  cursor-pointer  justify-center   border-red-800  w-8 h-8  border   items-center ">
                <advanceFilter class="w-4 h-4 " @click="() => $emit('toggle-menu')"
                    :class="false ? 'fill-gray-100' : 'fill-secondary-700'" />
            </div>
        </div>

        <div class="md:pl-20 md:pr-32 px-2">
            <!--Brand-->
            <div >
                <div class="">
                    <button type="button"
                        class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Brand</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
                          
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div class=" py-2 space-y-2  grid grid-cols-2" >
                        <div class="px-2 flex space-x-2 items-center" >
                            <input type="checkbox" >
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Model -->
            <div >
                <div class="">
                    <button type="button"
                        class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                        aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Model</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            :class="modelDropDown ? 'rotate-180' : ''" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div class=" py-2 space-y-2 grid grid-cols-2" >
                        <div class="px-2 flex space-x-2 items-center">
                            <input type="checkbox">
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </div>

            <!-- division -->
            <div class="">
                <div class="">
                    <button 
                        class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                        aria-controls="dropdown-example" 
                        data-collapse-toggle="dropdown-example"
                    >
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                        <svg 
                            class="w-3 h-3" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none"
                            :class="divisionDropDown ? 'rotate-180' : ''" viewBox="0 0 10 6">
                            <path 
                                stroke="currentColor" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div class=" py-2 space-y-2" >
                        <div class="px-2 flex space-x-2" >
                            <input type="checkbox">
                            <h1></h1>
                        </div>
                    </div>
                </div>
            </div>

        

            <!-- condition -->
            <div class="mt-4">
                <label for="">Condition</label>
                <div class="mt-2 flex space-x-3">
                    <div class="flex space-x-1 ">
                        <input 
                            type="checkbox" 
                            value="new" 
                            v-model="condition"
                        >
                        <h1>New</h1>
                    </div>
                    <div class="flex space-x-1 ">
                        <input 
                            type="checkbox" 
                            value="used"
                            v-model="condition"
                        >
                        <h1>Used</h1>
                    </div>
                </div>
            </div>



            <!-- price -->
            <div class="mt-4">
                <label for="">Price</label>
                <div class="h-10 flex space-x-1 mt-2  items-center">
                    <div class="w-1/2 h-full">
                        <input 
                            v-model="minPrice"
                            type="text" 
                            class="w-full h-full rounded-md border border-gray-500 px-2 bg-slate-300" 
                            placeholder="min">
                    </div>
                    <div>
                        <h1>-</h1>
                    </div>
                    <div class="w-1/2 h-full">
                        <input 
                            v-model="maxPrice"
                            type="text" 
                            class="w-full h-full rounded-md border border-gray-500 px-2 bg-slate-300" 
                            placeholder="max"
                        >
                    </div>
                </div>
            </div>



            <div class="mt-4 flex justify-center">
                <button class="bg-red-700 py-1 lg:block hidden px-4 rounded-md text-white">
                    Search
                </button>
                <button class="bg-red-700 py-1 px-4 max-lg:block lg:hidden  rounded-md text-white" >
                    Search
                </button>
            </div>
        </div>
    
    </div>
</template>

<script setup>

import {ref , onMounted , computed  } from 'vue'
import  advanceFilter  from 'asset@/icon/advance-filter.svg';
import apiService from 'core@/services/apiService'
import useAdvanceServiceController from 'dealerAdvanceSearch@/api/advanceSearchController'


const advanceSearchController = useAdvanceServiceController()
const { getResources  } = advanceSearchController
const minPrice     = ref('')
const maxPrice     = ref('')
const condition    = ref('')
const originalData = ref([])
let   dataArry      = computed(()=> originalData.value)


const filterData = ref({
    condiftion : condition.value,
    minPrice   : minPrice.value,
    maxPrice   : maxPrice.value,
})


async function prePareReource (){
    try {
      let response = await getResources(3)
      originalData.value = response.data.data
    } catch (error) {
        console.log(error.message);
    }
}


onMounted(() => {
    prePareReource()
});

defineProps([
    'isAdvanceSearchMenuOpen'
])

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