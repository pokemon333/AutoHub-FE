<template>
    <div class="lg:px-8 pl-5 h-28 flex items-center ">
        <div class="">
            <Back @click="()=>router.push({name : 'cars'})"  class="cursor-pointer w-5 " fill="black"/>
        </div>
        <div class="lg:pl-8 pl-3">
            <h1 class="lg:text-3xl text-2xl roboto font-[500]">Fuel Station</h1>
        </div>
    </div>
    <div class="lg:px-8 px-5 " >
        <div class="flex">
            <div 
                v-for="tab in tabs" 
                @click="handleTabChange(tab)" 
                :key="tab.name" 
                :class="currentTab == tab.value ? 'bg-gray-200 border-b border-gray-400 rounded-t-sm' : 'bg-white shadow-inner ' "
                class=" flex justify-center items-center w-32   cursor-pointer lg:text-md sm:text-sm text-xs  px-4 h-10 ">
                <p>
                    {{ tab.name}}
                </p>
            </div>
        </div>
        <div class="bg-gray-200 lg:p-4 md:p-4 p-4 md:flex md:justify-between">
           <div class=" md:w-1/2 ">
                <h1 class="lg:text-xl text-lg">{{currentHeader}}</h1>
                <p class=" text-md">{{currentSubHeader}}</p>
           </div>
           <div class="md:w-1/2 flex  space-x-2 justify-end items-center pr-2 mt-3" >
                <input 
                    v-model="state.searchWord"
                    @keyup="searchByState"
                    type="text" 
                    :placeholder="currentTabName+' Name'" 
                    class="md:w-60 w-full px-2 h-10 rounded-sm border border-secondary-500 bg-gray-200 " 
                /> 
                <!-- <button @click="searchWithNearBy" class="text-white flex justify-center space-x-2 bg-secondary-500 p-2 rounded-sm" >
                    <FuelStation fill="white" class="w-5 h-5"/>
                    <h1>
                        NearBy                   
                    </h1>
                </button> -->
           </div>
        </div>
        <div v-if="loading" class="w-full h-[60vh] bg-gray-200 ">
            <PageLoading/>
        </div>
        <div v-if="!loading" class="w-full lg:grid-cols-3 md:grid-cols-2 grid px-4 gap-5 max-h-[60vh] overflow-y-auto form-scroll bg-gray-200 py-2 grid-cols-1">
            <EvseCard :evse="evse" :current-location="currentLocation" v-for="(evse,index) in evses" :key="index"/>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { PageLoading , EvseCard } from 'evse@/services/getEvseComponent.ts'
import {Back ,FuelStation} from 'evse@/services/getEvseSvg'
import evseController from 'evse@/api/evseController'
import { useRouter } from 'vue-router'
import { haversineDistance } from 'evse@/services/locationServices.ts'

import { mapActions } from 'pinia'
let router = useRouter()
let controller = evseController();
let { getEvses  }  = controller
let evses = ref([]);
let originalData = []
let loading = ref(false)
let currentTabName = ref('Evse')



let state  = ref({
    latitude : null,
    longitude : null,
    kilometer : null,
    type  : '',
    searchWord : ''
})

let currentHeader = ref('Electronic Vehicle Supply Equipment')
let currentSubHeader = ref("Station Lists")
let currentTab = ref("evse")

let currentLocation = ref({
    latitude : '',
    longitude : ''
})



function textSearch(text) {
    let inputKeywordLower = state.value.searchWord.toLowerCase()
    const regex = new RegExp(inputKeywordLower, 'i');
    if (regex.test(text.toLowerCase())) {
        return true;
    }else{
        return false;
    }
}


let handleTabChange = (tab) =>{
    currentTab.value = tab.value
    currentTabName.value = tab.name
    currentHeader.value = tab.header 
    currentSubHeader.value = tab.sub_header
    searchByState()
}

let searchByState  = () => {
    loading.value = true
    let filteredData = originalData.filter((evse) =>{ 
                                              return evse.type  ==  currentTab.value && textSearch(evse.title);
                                            })
    evses.value = filteredData;
    loading.value = false
}

let getData = async () =>{
    loading.value = true
    let res = await getEvses();
    originalData = await res.data.data
    await searchByState()
    loading.value = false
}


// let searchWithNearBy = () => {
//     loading.value = true
//     let filteredData = originalData.filter((evse) =>{ 
//                                                 if (evse.latitude && evse.longitude) {
//                                                     let lat1 = currentLocation.value.latitude;
//                                                     let lon1 = currentLocation.value.longitude
//                                                     let lat2 = evse.latitude;
//                                                     let lon2 = evse.longitude;
//                                                     let distance  = haversineDistance(lat1,lon1,lat2,lon2)
//                                                     return distance < 800;
//                                                 }
//                                             })
//     evses.value = filteredData;
//     loading.value = false
// }

let tabs = ref([
  {
    name : "Evse",
    value: "evse",
    header : "EV Supply Equipment",
    sub_header : "Station Lists"
  },
  {
    name : "Petrol Station",
    value: "petrol",
    header : "Petrol Stations",
    sub_header : "Station Lists"
  },
  {
    name : "Gas Station",
    value: "gas",
    header : "CNG Gas Stations",
    sub_header : "Station Lists"
  }
])



onMounted(()=>{
    getData()
})





// navigator.geolocation.getCurrentPosition(async (position)=>{
//     currentLocation.value.latitude  = await  position.coords.latitude
//     currentLocation.value.longitude = await position.coords.longitude
// });

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
