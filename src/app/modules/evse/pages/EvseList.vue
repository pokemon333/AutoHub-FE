<template>
    <div class="lg:px-8 pl-5 h-28 flex items-center ">
        <div class="">
            <Back @click="()=>router.push({name : 'cars'})"  class="cursor-pointer md:w-5  w-4" fill="black"/>
        </div>
        <div class="lg:pl-8 pl-3">
            <h1 class="lg:text-3xl text-2xl roboto font-[500]">Fuel Station</h1>
        </div>
    </div>
    <div class="lg:px-8 px-5  " >

        <div class="flex">
            <div 
                v-for="(tab , index) in tabs" 
                @click="handleTabChange(tab,index)" 
                :key="tab.name" 
                :class="currentTab == tab.value ? 'bg-gray-200 border-b border-gray-400 rounded-t-sm' : 'bg-white shadow-inner ' "
                class=" flex justify-center items-center w-32   cursor-pointer lg:text-md sm:text-sm text-xs  px-4 h-10 ">
                <p>
                    {{ tab.name}}
                </p>
            </div>
        </div>

        <div class="w-full   flex justify-between bg-gray-200">

            <div class="pl-4 py-4 flex  md:space-x-6">

                <div class="flex space-x-4">
                    <div v-if="mode == 'nearby'">
                        <Back @click="modeChange"  class="cursor-pointer w-3 pt-2"  fill="black"/>
                    </div>
                    <div >
                        <h1 class="lg:text-xl text-md">{{currentHeader}}</h1>
                        <p class=" text-md">{{currentSubHeader}}</p>
                    </div>
                </div>

                <div>
                    <input 
                        v-model="state.searchWord"
                        @keyup="searchByStateAndMode"
                        type="text" 
                        :placeholder="currentTabName+' Name'" 
                        class="md:w-60 md:flex hidden   px-2 h-10 rounded-sm border border-secondary-500 bg-gray-200 " 
                    /> 
                </div>

            </div>

            <div class="flex items-center ">

                <!-- <button @click="modeChange"  v-if="mode == 'normal'"  class="text-white  px-4 py-2 mr-4  flex justify-center space-x-2 bg-secondary-500  rounded-md" >
                    <img :src="FuelStation" class="w-5 h-5" />
                    <h1>
                        NearBy                   
                    </h1>
                </button> -->

                <div 
                    v-if="mode == 'nearby'"
                    class=" py-4 w-full hidden  justify-end md:flex items-center"
                >
                        <span class="ml-2">{{ evses.length }} shop found around</span>
                        <input 
                            type="number"
                            min="0"
                            @keyup="searchByStateAndMode"
                            v-model="state.kilometer"
                            class="w-14 h-8 border p-2 mx-3  border-gray-500"
                        />
                        <span>km</span>
                </div>

            </div>

        </div>

        <div class=" w-fill px-4 md:hidden py-2 bg-gray-200">
            <input 
                    v-model="state.searchWord"
                    @keyup="searchByStateAndMode"
                    type="text" 
                    :placeholder="currentTabName+' Name'" 
                    class="w-full   px-2 h-10 rounded-sm border border-secondary-500 bg-gray-200 " 
            /> 
        </div>

        <div class=" w-full px-4 md:hidden pb-4 bg-gray-200">   
            <div 
                v-if="mode == 'nearby'"
                class="py-2 md:w-2/4 w-full  flex items-center"
            >
                <span class="ml-2">{{ evses.length }} shop found around</span>
                <input 
                    type="number"
                    min="0"
                    @keyup="searchByStateAndMode"
                    v-model="state.kilometer"
                    class="w-10 h-8 border p-2 mx-3  border-gray-500"
                />
                <span>km</span>
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
let mode = ref('normal')
let tabIndex = ref(0)
let state  = ref({
    kilometer : 15,
    type  : '',
    searchWord : ''
})

let currentHeader = ref('EV Supply Equipment')
let currentSubHeader = ref("Station Lists")
let currentTab = ref("evse")

let currentLocation = ref({
    latitude : '',
    longitude : ''
})

let tabs = ref([
  {
    name : "Evse",
    value: "evse",
    header : "EV Supply Equipment",
    sub_header : "Station Lists",
    near_by_header : "NearBy ( evse ) "
  },
  {
    name : "Petrol Station",
    value: "petrol",
    header : "Petrol Stations",
    sub_header : "Station Lists",
    near_by_header : "NearBy ( petrol ) "
  },
  {
    name : "Gas Station",
    value: "gas",
    header : "CNG Gas Stations",
    sub_header : "Station Lists",
    near_by_header : "NearBy ( gas ) "
  }
])

function textSearch(text) {
    let inputKeywordLower = state.value.searchWord.toLowerCase()
    const regex = new RegExp(inputKeywordLower, 'i');
    if (regex.test(text.toLowerCase())) {
        return true;
    }else{
        return false;
    }
}


let searchWithNearBy = (evse) => {
                                    if (evse.latitude && evse.longitude) {
                                        let lat1 = currentLocation.value.latitude;
                                        let lon1 = currentLocation.value.longitude
                                        let lat2 = evse.latitude;
                                        let lon2 = evse.longitude;
                                        let distance  = haversineDistance(lat1,lon1,lat2,lon2)
                                        return  distance < state.value.kilometer;
                                    }else{
                                        return false 
                                    }
                                }


let handleTabChange = (tab,index) =>{
    currentTab.value = tab.value
    tabIndex.value  = index
    currentTabName.value = tab.name
    if(mode.value == "normal"){
        currentHeader.value = tab.header 
    }else{
        currentHeader.value = tab.near_by_header
    }
    currentSubHeader.value = tab.sub_header
    searchByStateAndMode()
}

let searchByStateAndMode  = () => {
    loading.value = true
    let filteredData = originalData.filter((evse) =>{ 
                                                      let firstFilter =  evse.type  ==  currentTab.value 
                                                            && textSearch(evse.title)  
                                                        let secondFilter = searchWithNearBy(evse)
                                                        if(mode.value == 'normal' ) {
                                                            return firstFilter
                                                        }else{
                                                            return firstFilter && secondFilter
                                                        }
                                            })
    
    evses.value = filteredData;
    loading.value = false
}

let getData = async () =>{
    loading.value = true
    let res = await getEvses();
    originalData = await res.data.data
    searchByStateAndMode()
    loading.value = false
}




let modeChange = () =>{
    if (currentLocation.value.latitude && currentLocation.value.longitude) {
        mode.value == "normal" ? mode.value = "nearby" : mode.value = "normal"
        handleTabChange(tabs.value[tabIndex.value],tabIndex.value)
    }else{
        alert('Location accept is required to use this feature')
    }
}


let locationAccept = () =>{
    navigator.geolocation.getCurrentPosition(async (position)=>{
        currentLocation.value.latitude  = await  position.coords.latitude
        currentLocation.value.longitude = await position.coords.longitude
    });
}

onMounted(()=>{
    getData()
    locationAccept()
})




//Get the current loaction of device


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
