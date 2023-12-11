<template>
        <div class=" py-1 border  cursor-pointer border-secondary-500 text-white flex items-center justify-between px-3 rounded-md">
            <slot></slot>
            <p class="ml-2 hidden md:block">
                {{ text }}
            </p>
        </div>
</template>

<script setup> 
defineProps([
    'text',
    'icon'
])
</script>