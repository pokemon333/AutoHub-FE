<template>
    <div class="pt-4 pb-4   lg:h-full lg:px-14 md:pl-20 md:pr-32  h-[75%] overflow-y-auto  form-scroll">
        <!-- Search Input and Dropdown -->
        <div class=" w-1/2">
            <select @change="mainFilterChange" name="type" v-model="mainFilterType"
                class="w-full border bg-slate-300 mt-2  border-primary-100   peer h-10 rounded-md px-3">
                <option value="dealer" style="background-color:#cbd5e1;">Dealer</option>
                <option value="brand" style="background-color:#cbd5e1;">Brand</option>
            </select>
        </div>


        <!-- spacer -->
        <div class="mt-3"></div>

        <!-- Dealer -->
        <div v-if="dealersData.length">
            <div class="">
                <button type="button" @click="() => dealerDropDown = !dealerDropDown"
                    class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Dealer</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        :class="dealerDropDown ? 'rotate-180' : ''" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div class=" py-2 space-y-2  " v-if="dealerDropDown">
                    <div class="px-2 flex space-x-2 items-center" v-for="(dealer, index) in dealersData" :key="index">
                        <input type="checkbox" :value="dealer.name" v-model="checkedDealers" @change="dealerChecked">
                        <h1>{{ dealer.name }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <!--Brand-->
        <div v-if="filteredBrands.length != 0">
            <div class="">
                <button type="button" @click="() => brandDropDown = !brandDropDown"
                    class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Brand</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        :class="brandDropDown ? 'rotate-180' : ''" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div class=" py-2 space-y-2  grid grid-cols-2" v-if="brandDropDown">
                    <div class="px-2 flex space-x-2 items-center" v-for="(brand, index) in filteredBrands" :key="index">
                        <input type="checkbox" :value="brand.name" v-model="checkedBrands" @change="brandChecked">
                        <h1>{{ brand.name }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <!-- Model -->
        <div v-if="filteredModels.length">
            <div class="">
                <button type="button" @click="() => modelDropDown = !modelDropDown"
                    class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Model</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        :class="modelDropDown ? 'rotate-180' : ''" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div class=" py-2 space-y-2 grid grid-cols-2" v-if="modelDropDown">
                    <div class="px-2 flex space-x-2 items-center" v-for="model in filteredModels">
                        <input type="checkbox" :value="model?.name" @change="modelChecked" v-model="checkedModels">
                        <h1>{{ model?.name }}</h1>
                    </div>
                </div>
            </div>
        </div>

        <!-- division -->
        <div class="">
            <div class="">
                <button type="button" @click="() => divisionDropDown = !divisionDropDown"
                    class="flex items-center border-b border-b-white bg-secondary-700 w-full py-1 pr-2 text-base text-white transition duration-75  group"
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <span class="flex-1 ml-3 text-left whitespace-nowrap">Division</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        :class="divisionDropDown ? 'rotate-180' : ''" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div class=" py-2 space-y-2" v-if="divisionDropDown">
                    <div class="px-2 flex space-x-2" v-for="division in divisions">
                        <input type="checkbox" :value="division?.name" v-model="checkedDivision">
                        <h1>{{ division?.name }}</h1>
                    </div>
                </div>
            </div>
        </div>



        <!-- condition -->
        <div class="mt-4">
            <label for="">Condition</label>
            <div class="mt-2 flex space-x-3">
                <div class="flex space-x-1 ">
                    <input type="checkbox" value="new" v-model="condition">
                    <h1>New</h1>
                </div>
                <div class="flex space-x-1 ">
                    <input type="checkbox" value="used" v-model="condition">
                    <h1>Used</h1>
                </div>
            </div>
        </div>



        <!-- price -->
        <div class="mt-4">
            <label for="">Price</label>
            <div class="h-10 flex space-x-1 mt-2  items-center">
                <div class="w-1/2 h-full">
                    <input type="number" min="0" v-model="minPrice"
                        class="w-full h-full rounded-md border border-gray-500 px-2 bg-slate-300" placeholder="min">
                </div>
                <div>
                    <h1>-</h1>
                </div>
                <div class="w-1/2 h-full">
                    <input type="number" min="0" v-model="maxPrice"
                        class="w-full h-full rounded-md border border-gray-500 px-2 bg-slate-300" placeholder="max">
                </div>
            </div>
        </div>



        <div class="mt-4 flex justify-center">
            <button class="bg-red-700 py-1 lg:block hidden px-4 rounded-md text-white" @click="formsubmit">
                Search
            </button>
            <button class="bg-red-700 py-1 px-4 max-lg:block lg:hidden  rounded-md text-white" @click="mobileSubmit">
                Search
            </button>
        </div>

    </div>
</template>


<script setup  >

import AdvanceSearchController from 'advanceSearch@/api/AdvanceSearchController'
import { useCarStore } from 'car@/core/stores/CarStore';
import { onMounted, ref, computed, defineEmits } from 'vue';
const emit = defineEmits(['setCar', 'loading', 'toggleSideBar'])
let advanceSearchController = AdvanceSearchController();
let brands = ref([]);
let dealers = ref([]);
let divisions = ref([]);
let dealersData = ref([]);
let minPrice = ref(0);
let maxPrice = ref(0);
let mainFilterType = ref('');
let condition = ref([]);
let carStore = useCarStore();

let divisionDropDown = ref(true);
let brandDropDown = ref(true);
let dealerDropDown = ref(true);
let modelDropDown = ref(true);

let checkedBrands = ref([]);
let checkedModels = ref([]);
let checkedDealers = ref([]);
let checkedDivision = ref([]);

let filteredBrands = ref([]);
let filteredModels = ref([]);

let resetCheckedValues = () => {
    checkedBrands.value = [];
    checkedDealers.value = [];
    checkedModels.value = [];
}

let resetDropDown = () => {
    brandDropDown.value = true;
    dealerDropDown.value = true;
    modelDropDown.value = true;
}

let submitdata = computed(() => ({
    dealer: dealersData.value.map(dealer => {
        if (checkedDealers.value.includes(dealer.name)) {
            return dealer.name;
        }
    }),
    brand: filteredBrands.value.map(brand => {
        if (checkedBrands.value.includes(brand.name)) {
            return brand.name;
        }
    }),
    model: filteredModels.value.map(model => {
        if (checkedModels.value.includes(model.name)) {
            return model.name;
        }
    }),

    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    condition: condition.value,
    division: checkedDivision.value
}));

let mainFilterChange = (e) => {
    let filter = e.target.value
    if (filter == 'brand') {
        filteredBrands.value = brands.value
        resetDropDown()
        resetCheckedValues()
        dealersData.value = [];
        filteredModels.value = [];
    } else {
        dealersData.value = dealers.value
        resetDropDown()
        resetCheckedValues()
        filteredBrands.value = [];
        filteredModels.value = [];
    }
}


let brandChecked = () => {
    const uniqueModelNames = new Set();

    if (mainFilterType.value == 'brand') {
        brands.value.map((brand) => {
            if (checkedBrands.value.includes(brand.name)) {
                brand.carModelWithYear.map((model) => {
                    uniqueModelNames.add(model.name)
                })
            }
        })
    } else {
        dealers.value.map((dealer) => {
            if (checkedDealers.value.includes(dealer.name)) {
                dealer.models.map((model) => {
                    if (checkedBrands.value.includes(model.car_brand.name)) {
                        uniqueModelNames.add(model.name)
                    }
                })
            }
        });
    }
    checkedModels.value = []
    filteredModels.value = Array.from(uniqueModelNames).sort().map((name) => ({ name }));
}

let dealerChecked = () => {
    const uniqueBrandNames = new Set();

    dealers.value.map((dealer) => {
        if (checkedDealers.value.includes(dealer.name)) {
            dealer.models.forEach((model) => {
                uniqueBrandNames.add(model.car_brand.name);
            });
        }
    });
    checkedBrands.value = []
    filteredModels.value = []
    filteredBrands.value = Array.from(uniqueBrandNames).sort().map((name) => ({ name }));
}


let getResource = async () => {
    try {
        const res = await advanceSearchController.getResources();
        let data = await res.data.data
        brands.value = await data.brands.sort((a, b) => a.name.localeCompare(b.name));
        dealers.value = await data.dealers.sort((a, b) => a.name.localeCompare(b.name));
        divisions.value = await data.divisions;
        if (carStore.type) {
            mainFilterType.value = carStore.type
        } else {
            mainFilterType.value = 'dealer'
        }
        if (carStore.type == 'brand') {
            filteredBrands.value = brands.value
        } else {
            dealersData.value = dealers.value
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }

}

let mobileSubmit = () => {
    emit('toggleSideBar')
    formsubmit()
}

let formsubmit = async () => {
    emit('loading')
    try {
        let res = await advanceSearchController.getFilteredData(submitdata.value);
        let data = await res.data.data;
        let cars = data.cars;
        let count = data.count;
        emit('setCar', { cars, count });
        emit('loading')
    } catch (error) {
        console.log('An error occurred', error);
    }
}


onMounted(() => {
    getResource();
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