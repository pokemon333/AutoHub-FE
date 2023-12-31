<template>
    <div class="lg:px-8 pl-5 h-28 flex items-center ">
        <div class="">
            <back @click="()=>router.push({name : 'cars'})"  class="cursor-pointer w-5 " fill="black"/>
        </div>
        <div class="lg:pl-8 pl-3">
      <h1 class="lg:text-2xl text-xl roboto font-[500]">{{currentHeader}}</h1>
      <p class="lg:text-xl text-lg poppins">{{currentSubHeader}}</p>
        </div>
    </div>
    <div class="lg:px-8 px-5 " >
        <div class="flex">
            <div 
                v-for="tab in tabs" 
                @click="handleTabChange(tab)" 
                :key="tab.name" 
                :class="currentTab == tab.value ? 'bg-gray-200 border-b border-gray-400 rounded-t-sm' : 'bg-white shadow-inner ' "
                class=" flex justify-center items-center  cursor-pointer w-28 h-10 ">
                <p>
                    {{ tab.name}}
                </p>
            </div>
        </div>
        <div class="bg-gray-200 lg:p-4 md:p-4 p-4">
            <h1 class="lg:text-xl text-lg">{{currentHeader}}</h1>
            <p class=" text-md">{{currentSubHeader}}</p>
        </div>
        <div class="w-full lg:grid-cols-3 md:grid-cols-2 grid px-4 gap-5 max-h-[60vh] overflow-y-auto form-scroll bg-gray-200 py-2   grid-cols-1">
          <EvseCard :evse="evse" v-for="evse in evses"/>
        </div>
    </div>
</template>

<script   setup>
import { ref, onMounted } from 'vue'
import  EvseCard  from 'evse@/components/EvseCard.vue'
import {Back } from 'evse@/services/getEvseSvg'
import evseController from 'evse@/api/evseController'
import { useRouter } from 'vue-router'

let router = useRouter()
let controller = evseController();
let { getEvses }  = controller
let evses = ref([]);
let getData = async () =>{
    let res = await getEvses();
    evses.value = await res.data.data
}

let currentHeader = ref('Electronic Vehicle Supply Equipment')
let currentSubHeader = ref("Station Lists")
let currentTab = ref("evse")

let tabs = ref([
  {
    name : "Evse",
    value: "evse",
    header : "Electronic Vehicles Supply Equipment",
    sub_header : "Station Lists"
  },
  {
    name : "Diesel",
    value: "diesel",
    header : "Diesel Vehicles Supply Equipment",
    sub_header : "Diesel Lists"
  },
  {
    name : "Gas",
    value: "gas",
    header : "Gas Vehicles Supply Equipment",
    sub_header : "Gas Lists"
  }
])


let handleTabChange = (tab) =>{
    currentTab.value = tab.value
    currentHeader.value = tab.header 
    currentSubHeader.value = tab.sub_header
}

onMounted(()=>{
    getData()
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
</style>
