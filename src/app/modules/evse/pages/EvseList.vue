<template>
    <div class="lg:px-8 pl-5 h-28 flex items-center ">
        <div class="">
            <back @click="()=>router.push({name : 'cars'})"  class="cursor-pointer" fill="black"/>
        </div>
        <div class="lg:pl-8 pl-3">
            <h1 class="lg:text-2xl text-xl roboto font-[500]">Electronic Vehicle Supply Equipment </h1>
            <p class="lg:text-xl text-lg poppins">Station List</p>
        </div>
    </div>
    <div class=" lg:px-20 lg:grid-cols-3 md:grid-cols-2 px-5 grid gap-5  grid-cols-1">
        <EvseCard :evse="evse" v-for="evse in evses"/>
    </div>
</template>

<script lang="ts" setup>
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
onMounted(()=>{
    getData()
})
</script>
