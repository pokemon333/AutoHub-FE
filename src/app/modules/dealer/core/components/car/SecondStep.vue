<template>
    <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6">
      <Select
        v-model="secondStep.license_status_id"
        class="md:col-span-1 col-span-2 text-sm"
        title="License Status"
      >
        <template v-slot:option>
            <option  value=""  >Select  License Status</option>
            <option v-for="license in secondStepResource.licenseStatus" :value="license.id" :key="license.id">
                {{ license.name }}
            </option>
        </template>
      </Select> 
      <Select
        v-model="secondStep.plate_color"
        class="md:col-span-1 col-span-2 text-sm"
        title="Plate Color"
      >
        <template v-slot:option>
            <option  value="">Select Plate Color</option>
            <option v-for="(color,key ) in secondStepResource.plateColor" :value="key" :key="key">
                {{ color }}
            </option>
        </template>
      </Select> 
      <Select
        v-model="secondStep.plate_division_id"
        class="md:col-span-1 col-span-2 text-sm"
        title="Plate Division"
      >
        <template v-slot:option>
            <option  value="">Select Plate Division</option>
            <option v-for="division in secondStepResource.plateDivision" :value="division.id" :key="division.id">
                {{ division.name}}
            </option>
        </template>
      </Select> 
      <Input
          v-model="secondStep.plate_number"
          class="md:col-span-1 col-span-2"
          title="Plate Number"
      />
      <Select
        v-model="secondStep.color_id"
        class=" md:col-span-1 col-span-2 text-sm"
        title="Color"
      >
        <template v-slot:option>
            <option  value="">Select Color</option>
            <option v-for="color in secondStepResource.color" :value="color.id" :key="color.id">
                {{ color.name }}
            </option>
        </template>
      </Select> 
      <Input
          v-model="secondStep.vehicleid"
          class="md:col-span-1 col-span-2"
          title="Vehicle ID"
      />

      <div class="relative col-span-2 mb-6">
        <label
          for="type"
          class="absolute -top-2 left-3 px-2 bg-white text-xs"
          :class="labelClass"
        >
            Description
        </label>
        <textarea 
            v-model="secondStep.descriptions" 
            class=" rounded-md w-full border border-primary-100 h-24"
        >
        </textarea>
        <button @click="()=>console.log(secondStep)">
            click
        </button>
      </div>
    
  </div>
</template>
<script setup>
  import Select from "core@/components/Select.vue";
  import Input from "core@/components/Input.vue"
  import {ref} from 'vue'
  let porps = defineProps({
      secondStepResource : {
        type : Object,
        default : {}
      }
  })

  let secondStep = ref({
      color_id : '',
      vehicleid:'',
      license_status_id:'',
      plate_division_id:'',
      plate_color: '',
      plate_number:'',
      descriptions : ''
  })
</script>
