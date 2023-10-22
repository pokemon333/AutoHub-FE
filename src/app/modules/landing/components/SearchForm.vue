<template>
    <div>
        <div class="relative">
            <label for="type" class="absolute -top-2 left-3 text-gray-500 bg-gray-200 text-xs">Search Type</label>
            <select v-model="data.type" name="type" class="w-full border border-primary-100  peer h-12 rounded-sm px-3">
                <option value="">Dealer/Brand</option>
                <option value="dealer">Dealer</option>
                <option value="brand">Brand</option>
            </select>
        </div>
        <div>
            <input type="text" class="w-full h-12 rounded-sm px-3 bg-gray-200 border border-gray-400"  v-model="data.name" placeholder="Type to search">
        </div>
        <div>
            <button @click="$emit('getFilteredCars',data)" class="w-full h-12 rounded-sm bg-red-600 text-white">
                Search
            </button>
        </div>
    </div>
</template>

<script setup lang="ts" >
import {ref} from 'vue'

interface Data {
    name : string,
    type: string
}

let data  = ref<Data>({
    name : '',
    type : ''
}) 

</script>
