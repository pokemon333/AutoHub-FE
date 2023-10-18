<template>
  <div id="app">
    <NavbarSection/>
    <router-view></router-view>
  </div>
</template>


<script setup lang="ts">
import NavbarSection from 'core@/components/layout/NavbarSection.vue';
</script>

