<template>
  <div class="lg:w-full w-screen  flex flex-col relative  container">

      <div class="lg:w-full w-screen  relative pb-[59%] ">
        <transition name="slide" mode="out-in">
            <slot name="main" ></slot>
        </transition>
      </div>

      <div class="lg:w-full w-screen bg-gray-900 pb-2 pt-6   overflow-x-auto  ">
        <div class="flex space-x-4 p-2  w-full" ref="imageContainer">
          <slot name="images" ></slot>
        </div>
      </div>

  </div>
</template>
<script lang="ts" setup>



</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}


.fade-enter,
.fade-leave-to {
  opacity: 0;
}


.container {
  box-sizing: content-box;
}


.overflow-x-auto::-webkit-scrollbar {
  width: 0px;
  height: 5px;
}


/* Track (the area behind the thumb) */
.overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    padding-top: 10px;
    padding-bottom: 10px;
}


/* Thumb (the draggable part) */
.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 30px;
}

.scroll {
  scrollbar-width: 3px;
}

/* On hover, style the thumb */
.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}


</style>