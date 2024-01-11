<template>
    <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6">
      <Select
        :labelClass="errors?.license_status_id? 'text-red-500': ''"
        :selectClass="errors?.license_status_id? 'border border-red-500' : ''"
        v-model="secondStep.license_status_id"
        class="md:col-span-1 col-span-2 text-sm"
        title="License Status"
      >
        <template v-slot:option>
            <option  
              value=""  
            >
              Select  License Status
            </option>
            <option 
              v-for="license in secondStepResource.licenseStatus" 
              :value="license.id" 
              :key="license.id"
            >
                {{ license.name  }}
            </option>
        </template>
        <template v-slot:error>
          <span v-if="errors?.license_status_id" class="text-red-600">{{ getValidationMessage(errors?.license_status_id) }}</span>
        </template>
      </Select> 
      <Select
        :labelClass="errors?.plate_color? 'text-red-500': ''"
        :selectClass="errors?.plate_color? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.plate_color" class="text-red-600">{{ getValidationMessage(errors?.plate_color ) }}</span>
        </template>
      </Select> 
      <Select
        :labelClass="errors?.plate_division_id? 'text-red-500': ''"
        :selectClass="errors?.plate_division_id? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.plate_division_id" class="text-red-600">{{ getValidationMessage(errors?.plate_division_id)}}</span>
        </template>
      </Select> 
      <Input
          :labelClass="errors?.plate_number? 'text-red-500': ''"
          :inputClass="errors?.plate_number? 'border border-red-500' : ''"
          v-model="secondStep.plate_number"
          class="md:col-span-1 col-span-2"
          title="Plate Number"
      >
        <span v-if="errors?.plate_number" class="text-red-600">{{ getValidationMessage(errors?.plate_number) }}</span>
      </Input>
      <Select
        :labelClass="errors?.color_id? 'text-red-500': ''"
        :selectClass="errors?.color_id? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.color_id" class="text-red-600">{{ getValidationMessage(errors?.color_id)  }}</span>
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
            class=" rounded-md w-full border p-4 text-ms border-primary-100 h-24"
        >
        </textarea>
      </div>
  </div>
  <div class="flex justify-between ">
    <button 
        @click="handleBack"
        class="bg-primary-500/50 cursor-pointer  px-2 py-1  w-20 rounded-sm text-white"
    >
      Back
    </button>
    <div>
          <div
            v-if="loading"
            class="bg-secondary-500 cursor-pointer  flex justify-center items-center px-2 py-1  w-20 rounded-sm text-white"
          >
            <img :src="loadingImg" width="24" height="24" class="animate-spin"> 
          </div>
          <button 
              v-if="!loading"
              @click="handleNext"
              class="bg-secondary-500 cursor-pointer  px-2 py-1  w-20 rounded-sm text-white"
          >
            Next 
          </button>
    </div>
  </div>
</template>
<script setup>

  import loadingImg from 'asset@/img/loading.png'
  import Select from "core@/components/Select.vue";
  import Input from "core@/components/Input.vue"
  import {ref} from 'vue'
  import DealerSellMyCarController from 'dealer@/core/api/dealerSellMyCarController.ts'

  let {secondStepValidation} = DealerSellMyCarController()

  let porps = defineProps({
      secondStepResource : {
        type : Object,
        default : {}
      }
  })

  let loading = ref(false)

  let emit = defineEmits([
    'handleStepChange',
    'setSecondStepState'
  ])
  
  let getValidationMessage = (data) =>{
      return data[0];
  }

  let errors = ref(null)

  let secondStep = ref({
      color_id : '',
      vehicleid:'',
      license_status_id:'',
      plate_division_id:'',
      plate_color: '',
      plate_number:'',
      descriptions : ''
  })

  let handleNext = async () =>{
      loading.value = true
      errors.value = null
      try{
        let res =  await secondStepValidation(secondStep.value)
        if (res.status) {
         emit('handleStepChange','third')
         emit('setSecondStepState', secondStep.value)
        }
      }catch(error){
        errors.value = error.response.data.errors ;
      }
      loading.value = false 
  }

  let handleBack = () =>{
      emit('handleStepChange','first')
  }
</script>
