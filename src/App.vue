<template>
  <div id="app">
    <!-- <CarCard/> -->
    <NavbarSection/>
    <SidebarSection/>
    <router-view></router-view>
  </div>
</template>


<script setup lang="ts">
import NavbarSection from 'core@/components/layout/NavbarSection.vue';
import SidebarSection from "core@/components/layout/SidebarSection.vue"
// import CarCard from './app/modules/car/core/components/CarCard.vue';
</script>

