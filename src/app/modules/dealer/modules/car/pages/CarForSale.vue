<template>
   <div class="flex relative">
      <DealerCarListSection 
         @toggleMenu="toggleMenu" 
         :isAdvanceSearchMenuOpen="isAdvanceSearchMenuOpen"/>
      <AdvanceSearch  
         @toggleMenu="toggleMenu"  
         :isAdvanceSearchMenuOpen="isAdvanceSearchMenuOpen"/>
   </div>
</template>

<script setup>

import DealerCarListSection from 'dealer@/modules/car/components/DealerCarListSection.vue'
import AdvanceSearch from 'dealerAdvanceSearch@/components/AdvanceSearch.vue'
import { ref } from 'vue'


let isAdvanceSearchMenuOpen = ref(false);
let toggleMenu  = () =>{ 
   isAdvanceSearchMenuOpen.value = !isAdvanceSearchMenuOpen.value
}


</script>
