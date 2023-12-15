<template>
    <div  v-if="isAdvanceSearchMenuOpen" class="lg:w-6/12   lg:relative bg-slate-300   w-full h-[88vh] overflow-y-auto  form-scroll fixed ">
        <!-- header and toggle button -->
        <div class="lg:ms-10 md:ms-20 md:me-2 md:my-7 my-5 mx-2 flex items-center  justify-between">
            <h1 class="text-3xl text-secondary-700">Explore Specific</h1>
            <div
                v-if="isAdvanceSearchMenuOpen"
                class="flex md:rounded-full md:w-10 md:h-10  w-8 h-8   rounded-md  cursor-pointer  justify-center   border-red-800    border   items-center ">
                <div class="icon-wrapper w-5 h-5">
                    <advanceFilter 
                        @click="() => $emit('toggle-menu')"
                        :class="false ? 'fill-gray-100' : 'fill-secondary-700'" 
                    />
                </div>
            </div>
        </div>

        <div class="lg:pl-10 lg:pr-20 md:pl-20 md:pr-32 px-2">
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
                        <div 
                            v-for="(brand,index) in brandArray"
                            :key="index"
                            class="px-2 flex space-x-2 items-center" 
                        >
                            <input
                                @change="brandChecked" 
                                :value="brand.id"
                                v-model="filterData.brands"
                                type="checkbox" 
                            >
                            <h1>{{ brand.name }}</h1>
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
                        <div 
                            v-for="(model,index) in modelArray"
                            :key="index"
                            class="px-2 flex space-x-2 items-center"
                        >
                            <input 
                                :value="model.id"
                                v-model="filterData.models"
                                type="checkbox"
                            >
                            <h1>{{ model.name }}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <!-- division -->
            <div class="">
                <div class="">
                    <button 
                        @click="divisionDropDown = !divisionDropDown"
                        class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                        aria-controls="dropdown-example" 
                        data-collapse-toggle="dropdown-example"
                    >
                        <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                        <svg 
                            class="w-3 h-3" 
                            :class="divisionDropDown ? 'rotate-180' : ''"
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none"
                            viewBox="0 0 10 6">
                            <path 
                                stroke="currentColor" 
                                stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2"
                                d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    <div 
                        v-if="divisionDropDown"

                        class=" py-2 space-y-2 grid grid-cols-2" 
                    >
                        <div 
                            v-for="(division,index) in divisionArray"
                            :key="index"
                            class="px-2 flex items-center space-x-2" 
                        >
                            <input 
                                :value="division.id"
                                v-model="filterData.divisions"
                                type="checkbox"
                            >
                            <h1>{{ division.name }}</h1>
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
                            v-model="filterData.condition"
                        >
                        <h1>New</h1>
                    </div>
                    <div class="flex space-x-1 ">
                        <input 
                            type="checkbox" 
                            value="used"
                            v-model="filterData.condition"
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
                            v-model="filterData.minPrice"
                            type="text" 
                            class="w-full h-full rounded-md border border-gray-500 px-2 bg-slate-300" 
                            placeholder="min">
                    </div>
                    <div>
                        <h1>-</h1>
                    </div>
                    <div class="w-1/2 h-full">
                        <input 
                            v-model="filterData.maxPrice"
                            type="text" 
                            class="w-full h-full rounded-md border border-gray-500 px-2 bg-slate-300" 
                            placeholder="max"
                        >
                    </div>
                </div>
            </div>



            <div class="mt-4 flex justify-center">
                <button 
                    @click="submit"
                    class="bg-red-700 py-1 lg:block hidden px-4 rounded-md text-white"
                >
                    Search
                </button>
                <button 
                    @click="submit"
                    class="bg-red-700 py-1 px-4 max-lg:block lg:hidden  rounded-md text-white" 
                >
                    Search
                </button>
            </div>
        </div>
    
    </div>
</template>

<script setup>

    import {ref , onMounted , computed  } from 'vue'
    import  advanceFilter  from 'asset@/icon/advance-filter.svg';
    import useAdvanceServiceController from 'dealerAdvanceSearch@/api/advanceSearchController'
    import {useUserStore} from 'core@/store/UserStore'
    import helpers from 'core@/helper/helper'
    import apiService from 'core@/services/apiService'
    import {useCarStore } from 'dealer@/core/store/CarStore'

    const advanceSearchController = useAdvanceServiceController()
    const { getResources  } = advanceSearchController
    const userStore = useUserStore()
    const dealerId        = userStore.user.dealer_id
    const { sortByName } = helpers
    const carStore        = useCarStore()
    //drop down section
    const brandDropDown = ref(true)
    const modelDropDown = ref(true)
    const divisionDropDown = ref(true)

    // data binding section
    const originalData = ref([])
    let   modelArray   = ref([])
    let   brandArray   = ref([])
    let divisionArray  = ref([])

    const filterData = ref({
        divisions   : [],
        brands      : [],
        models      : [],
        condition   : [],
        minPrice    : 0,
        maxPrice    : 0,
    })

    const brandChecked = () =>{
        modelArray.value = [],
        modelArray.value = originalData.value.models.filter((model)=>{
                                if (filterData.value.brands.includes(model.car_brand_id)){
                                    return model
                                }
                            }).sort(sortByName())
    }

    async function prePareReource (){
        try {
        let response = await getResources(dealerId)
        originalData.value = await response.data.data
        brandArray.value    = await response.data.data.brands.sort(sortByName())
        divisionArray.value = await response.data.data.divisions.sort(sortByName())
        } catch (error) {
            console.log(error.message);
        }
    }


    const submit   = () => {
        apiService.post(`dealer/cars/filter/${dealerId}`,filterData.value).then((res) => {
            carStore.setCars(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    onMounted(() => {
        prePareReource()
    });

    defineProps([
        'isAdvanceSearchMenuOpen'
    ])

</script>


