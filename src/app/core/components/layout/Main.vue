<template>
    <div class="h-screen w-full ">
        <NavbarSection @toggle-side-bar="toggleSideBar"/>
        <div class="h-[12vh]" name="nav-bar-filler-div"></div>
        <SidebarSection :is-menu-open="isMenuOpen"/>
        <router-view></router-view>
    </div>
</template>

<script setup>
import NavbarSection from 'core@/components/layout/NavbarSection.vue';
import SidebarSection from "core@/components/layout/SidebarSection.vue"
import { ref } from "vue"
let isMenuOpen = ref(false);
let toggleSideBar = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>