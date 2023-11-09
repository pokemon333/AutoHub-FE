<template>
    <nav class="bg-primary-900 flex z-40 w-full fixed top-0 justify-between md:px-8 px-2 items-center h-[12%]">
        <div class="w-40 flex items-center justify-between space-x-4">
            <div @click="$emit('toggleSideBar')"  class="rounded-full cursor-pointer flex justify-center items-center min-w-9 min-h-9 border text-white border-white">
                <MenuLogo :class="rotate" @click="rotateMenu" class="transition duration-300 ease-in" />
            </div>  
            <div @click="()=>router.push({name: 'landing'})" class="cursor-pointer h-auto p-1">
                <img :src="imageUrl" class="h-full w-3/4 cursor-pointer" alt="">
            </div>
        </div>
        <div>
            <div @click="()=>router.push({name: 'evse'})" class=" py-1 bg-primary-400 border  cursor-pointer border-secondary-500 text-white flex items-center justify-between px-3 rounded-md">
                <ChargingStation/>
                <p class="ml-2">
                    EVSE
                </p>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MenuLogo from 'asset@/icon/menu.svg'
import imageUrl from 'asset@/img/logo.png' 
import ChargingStation from 'asset@/icon/charging-station.svg'
let rotate = ref('')
let router = useRouter()
let rotateMenu = () =>{
    rotate.value = rotate.value == 'rotate-90' ? '' : 'rotate-90'
}
</script>