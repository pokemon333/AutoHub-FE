<template>
    <Transition name="fade" tag="aside">
        <aside  class="  h-screen fixed top-[12%] w-full  z-50 bg-white/40 opacity-3 " v-if="props.isMenuOpen"  >
            <div class="lg:w-[28%] md:w-[40%] md:pl-20 md:pt-20 pt-10  w-[60%] pl-5 flex flex-col justify-between    pb-40  h-screen bg-primary-900" >
                <div v-for="sideBarItem in sideBarItems" class="text-white md:font-[60px]  cursor-pointer  md:text-[20px]">
                    <h1>{{ sideBarItem.name }}</h1>
                </div>
            </div>
        </aside>
    </Transition>
</template>

<script setup lang="ts">
import sideBarItems from 'core@/services/sideBarItems'
let props = defineProps({
    isMenuOpen :  Boolean
})
</script>
<style>
.fade-enter-active{
   animation: fade 1s;
} 
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter{
    background-color: aqua;
    opacity: 100;
}
.fade-leave-to {                            
  opacity: 0;
}

@keyframes fade{
    0% {
       opacity: 0;
    }
    50% {
      opacity: 50;
    }
    100% {
       opacity: 100;
    }
}
  
</style>