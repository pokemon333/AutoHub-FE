<template>
  <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
  </Carousel>

  <Carousel
    id="thumbnails"
    :items-to-show="4"
    :wrap-around="true"
    v-model="currentSlide"
    ref="carousel"
  >
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
    </Slide>
  </Carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
let currentSlide = ref<number | string>(0)
let slideTo = (val : string | number) => {
    currentSlide.value =  val
}

</script>
