<template>
    <div>
        <div class="relative">
            <label for="type" class="absolute px-2 -top-2 left-3  bg-gray-200 text-xs">Search Type</label>
            <select v-model="data.type" name="type" class="w-full border bg-gray-200  border-gray-500  peer h-12 rounded-md px-3">
                <option value="dealer" class="bg-gray-200" >Dealer</option>
                <option value="brand" class="bg-gray-200">Brand</option>
            </select>
        </div>
        <div class="relative">
            <label for="type" class="absolute -top-2 left-3 px-2  bg-gray-200 text-xs">Name</label>
            <input type="text" @keyup.enter="$emit('getFilteredCars',data)" class="w-full h-12 rounded-md px-3 bg-gray-200 border border-gray-500"  v-model="data.name" placeholder="Type to search">
        </div>
        <div v-if="!loading" >
            <button @click="$emit('getFilteredCars',data)" class="w-full h-12 rounded-md bg-red-600 text-white">
                Search
            </button>
        </div>
        <div v-if="loading"  >
            <button  class="w-full flex justify-center items-center space-x-2  h-12 rounded-md bg-red-600 text-white">
                <img :src="loadingImg" width="28" height="28" class="animate-spin"> 
                <span>Loading...</span>
            </button> 
        </div>
    </div>
</template>

<script setup   >
import {ref,onMounted} from 'vue'
import loadingImg from 'asset@/img/loading.png'

let props = defineProps([
  'loading'
])

let data  = ref({
    name : '',
    type : ''
}) 

onMounted(() => {
    data.value.type = 'dealer'
})

</script>
