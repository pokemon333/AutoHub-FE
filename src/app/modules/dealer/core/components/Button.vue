<template>
    <div class="h-full flex justify-center items-center rounded-md text-center p-2 text-white cursor-pointer bg-primary-500">
        <div class="flex  items-center justify-center">
            {{ text }}
            <div v-if="isLoading" class="w-1/2 ms-2 "> 
                <img :src="loading"   class="w-[25px] h-[25px] animate-spin">
            </div> 
        </div>
    </div>
</template>
<script setup>
import loading from 'asset@/img/loading.png'
defineProps({
    text: {
        type: String,
        default: ""
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})
</script>
