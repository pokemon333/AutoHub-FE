<template>
    <div class="lg:px-8 pl-5 h-28 flex items-center ">
        <div class="">
            <back @click="()=>$router.back()"  class="cursor-pointer" fill="black"/>
        </div>
        <div class="lg:pl-8 pl-3">
            <h1 class="lg:text-2xl text-xl roboto font-[500]">Electronic Vehicle Supply Equipment </h1>
            <p class="lg:text-xl text-lg poppins">Station List</p>
        </div>
    </div>
    <div class=" lg:px-20 lg:grid-cols-3 md:grid-cols-2 px-5 grid gap-5  grid-cols-1">
        <EvseCard :url="url" v-for="url in images"/>
    </div>
</template>

<script lang="ts" setup>
import {back } from 'evse@/services/getEvseSvg'
import { EvseCard} from 'evse@/services/getEvseComponent'
let images = [
    'https://s.alicdn.com/@sc04/kf/H42e58f0f46ad4b64a3c1f8ea51c5a982Q.jpg_720x720q50.jpg',
   ' https://techcrunch.com/wp-content/uploads/2016/12/2017-chevrolet-boltev-002_av-evse-rs2-final-image.jpg?w=730&crop=1',
   'https://cdn.globalso.com/jointevse/charging-station-32.jpg',
   'https://dam-assets.fluke.com/s3fs-public/styles/product_slideshow_main/public/F-fev100_10b_w.jpg'
]
</script>
