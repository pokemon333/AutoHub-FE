<template>

        {{ isMenuOpen }}
    <div class="bg-primary-900 flex justify-between px-8 items-center h-20">
        <div class="w-40 flex items-center justify-between space-x-4">
            <div @click="changeMenuState" class="rounded-full flex justify-center items-center w-9 h-9 border text-white border-white">
                <MenuLogo />
            </div>
            <div class="">
                <img :src="imageUrl" class="h-14 w-22" alt="">
            </div>
        </div>
        <div>
            <div class=" py-1 bg-primary-400 border  border-secondary-500 text-white flex items-center justify-between px-3 rounded-md">
                <ChargingStation/>
                <p class="ml-2">
                    EVSE
                </p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import MenuLogo from 'asset@/icon/menu.svg'
import imageUrl from 'asset@/img/logo.png' 
import ChargingStation from 'asset@/icon/charging-station.svg'
import {useCoreStore } from "core@/store/CoreStore"
const coreStore  =  useCoreStore()
let isMenuOpen = coreStore.isMenuOpen

const changeMenuState = () => {
    coreStore.changeMenuState(!isMenuOpen)
}

</script>