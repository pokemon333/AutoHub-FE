<template>
    <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6">
      <Select
        v-model="thirdStep.fuel_type_id"
        class="md:col-span-1 col-span-2 text-sm"
        title="Fuel Type"
      >
        <template v-slot:option>
            <option  value=""  >Select  Fuel Type</option>
            <option v-for="fuelType in thirdStepResource.fuelType" :value="fuelType.id" :key="fuelType.id">
                {{ fuelType.name }}
            </option>
        </template>
      </Select> 
      <Select
        v-model="thirdStep.milage_id"
        class="md:col-span-1 col-span-2 text-sm"
        title="Mileage"
      >
        <template v-slot:option>
            <option  value="">Select Mileage</option>
            <option v-for="mileage in thirdStepResource.mileage" :value="mileage.id" :key="mileage.id">
                {{ mileage.name }}
            </option>
        </template>
      </Select> 
      <Select
        v-model="thirdStep.condition"
        class="md:col-span-1 col-span-2 text-sm"
        title="Condition"
      >
        <template v-slot:option>
            <option  value="">Select Condition</option>
            <option v-for="(condition,key) in thirdStepResource.condition" :value="key" :key="key">
                {{ condition }}
            </option>
        </template>
      </Select> 
      <Input
          v-model="thirdStep.engine_power"
          class="md:col-span-1 col-span-2"
          title="Engine Power"
      />
      <Select
        v-model="thirdStep.steering"
        class="md:col-span-1 col-span-2 text-sm"
        title="Steering"
      >
        <template v-slot:option>
            <option  value="">Select Steering</option>
            <option v-for="(steering,key) in thirdStepResource.steering" :value="key" :key="key">
                {{ steering }}
            </option>
        </template>
      </Select> 
      <Select
        v-model="thirdStep.transmission"
        class="md:col-span-1 col-span-2 text-sm"
        title="Transmission"
      >
        <template v-slot:option>
            <option  value="">Select Transmission</option>
            <option v-for="(transmission,key) in thirdStepResource.transmission" :value="key" :key="key">
                {{ transmission}}
            </option>
        </template>
      </Select> 
      <button @click="()=>console.log(thirdStep)">
          click
       </button>
    </div>
</template>

<script setup>

  import Select from "core@/components/Select.vue";
  import Input from "core@/components/Input.vue"
  import {ref } from 'vue'

  let porps = defineProps({
      thirdStepResource : {
        type : Object,
        default : {}
      }
  })
  
  let thirdStep = ref({
      fuel_type_id:'',
      engine_power:'',
      steering:'',
      transmission:'',
      milage_id:'',
      condition:''
  })
</script>
