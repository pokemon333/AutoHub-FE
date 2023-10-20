<template>
    <div>
        <div>
            <select v-model="data.type">
                <option value="dealer">Dealer</option>
                <option value="brand">Brand</option>
            </select>
        </div>
        <div>
            <input type="text" v-model="data.name">
        </div>
        <div>
            <button @click="$emit('getFilteredCars',data)">
                submit
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
