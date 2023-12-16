<template>
    <div class="h-screen w-full ">
        <NavbarSection @toggle-side-bar="toggleSideBar" :rotate="rotate"/>
        <div class="h-[12vh]" name="nav-bar-filler-div"></div>
        <SidebarSection @toggle-side-bar="toggleSideBar" :is-menu-open="isMenuOpen"/>
        <router-view></router-view>
    </div>
</template>

<script setup>
import NavbarSection from 'core@/components/layout/NavbarSection.vue';
import SidebarSection from "core@/components/layout/SidebarSection.vue"
import { ref } from "vue"

let rotate = ref('')

let isMenuOpen = ref(false);
let toggleSideBar = () => {
  rotate.value = rotate.value == '' ? 'rotate-90' : ''
  isMenuOpen.value = !isMenuOpen.value
}

</script>