<template>
    <nav class="bg-primary-900 max-w-container flex z-40 w-full fixed top-0 justify-between md:px-8 px-2 items-center h-[12vh]">
        <div class="w-40 flex items-center justify-between space-x-4">
            <div @click="$emit('toggleSideBar')"  class="rounded-full cursor-pointer flex justify-center items-center min-w-9 min-h-9 border text-white border-white">
                <MenuLogo :class="rotate" @click="rotateMenu" class="transition duration-300 ease-in" />
            </div>  
            <div @click="()=>router.push({name: 'landing'})" class="cursor-pointer  h-full">
                <img :src="imageUrl" class="h-10 cursor-pointer" alt="">
            </div>
        </div>
        <div class="flex space-x-4 items-center">
            <CustomButton  
                text="EVSE" 
                class="bg-primary-400"
                @click="()=>router.push({name: 'evse'})" 
            >
                <ChargingStation />
            </CustomButton>
            <CustomButton 
                v-if="!loginStatus" 
                text="Login"
                class="bg-primary-500"
                @click="()=>router.push({name: 'login'})"
            >
                <Login/>
            </CustomButton>
            <Profile   
                v-if="loginStatus" 
                @click="()=>router.push({name: 'dealer-profile'})"
            />
        </div>
    </nav>
</template>

<script setup  >

import { ref,computed } from 'vue'
import { useRouter } from 'vue-router'
import MenuLogo from 'asset@/icon/menu.svg'
import imageUrl from 'asset@/img/logo.png' 
// import { icon } from '@fortawesome/fontawesome-svg-core'
import ChargingStation from 'asset@/icon/charging-station.svg'
import CustomButton from "core@/components/CustomButton.vue"
import Login from "asset@/icon/login.svg"
import {useUserStore} from "core@/store/UserStore"
import Profile from "core@/components/profile.vue"

let userStore = useUserStore()
let rotate = ref('')
let router = useRouter()
let loginStatus = computed(()=>userStore.getLoginStatus)

let rotateMenu = () =>{
    rotate.value = rotate.value == 'rotate-90' ? '' : 'rotate-90'
}
</script>