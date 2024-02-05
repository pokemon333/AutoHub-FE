<template>

   <!-- Social Share Popup -->
  <div 
      v-if="shareDialog"
      class="fixed flex justify-center items-center  w-full h-full bg-primary-300/40 z-30"
  >
      <SocialShare
        @close="toggleShareDialog"
        :url="url"
      />
  </div>
 
  
  <div class="flex relative">
    <DealerCarListSection
      @toggleMenu="toggleMenu"
      :isAdvanceSearchMenuOpen="isAdvanceSearchMenuOpen"
    />
    <AdvanceSearch
      @toggleMenu="toggleMenu"
      :isAdvanceSearchMenuOpen="isAdvanceSearchMenuOpen"
    />
  </div>


</template>

<script setup>
import SocialShare from "core@/components/social/SocialShare.vue";
import DealerCarListSection from "dealer@/modules/car/components/DealerCarListSection.vue";
import AdvanceSearch from "dealerAdvanceSearch@/components/AdvanceSearch.vue";
import { ref , provide } from "vue";

let shareDialog = ref(false)
let url   =  ref('')
let toggleShareDialog = () => {
  shareDialog.value = !shareDialog.value
}
provide('toggleShareDialog',toggleShareDialog);
provide('url',url)

let isAdvanceSearchMenuOpen = ref(false);

let toggleMenu = () => {
  isAdvanceSearchMenuOpen.value = !isAdvanceSearchMenuOpen.value;
};


</script>
