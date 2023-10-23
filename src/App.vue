<template>
  <div id="app" class="h-screen">
    <!-- <CarCard/> -->
    <NavbarSection @toggle-side-bar="toggleSideBar"/>
    <SidebarSection :is-menu-open="isMenuOpen"/>
    <router-view></router-view>
  </div>
</template>


<script setup lang="ts">
import NavbarSection from 'core@/components/layout/NavbarSection.vue';
import SidebarSection from "core@/components/layout/SidebarSection.vue"
import { ref } from "vue"
let isMenuOpen = ref(false);
let toggleSideBar = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

