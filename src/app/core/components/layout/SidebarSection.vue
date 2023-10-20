<template>
    <div class="w-[30%] absolute h-screen bg-red-500" v-if="props.isMenuOpen">

    </div>
</template>
<script setup lang="ts">
let props = defineProps({
    isMenuOpen :  Boolean
})
</script>