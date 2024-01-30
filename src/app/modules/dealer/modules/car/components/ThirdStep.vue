<template>
    <div class="grid md:grid-cols-2 grid-cols-1 md:gap-6">
      <Select
        :labelClass="errors?.fuel_type_id? 'text-red-500': ''"
        :selectClass="errors?.fuel_type_id? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.fuel_type_id" class="text-red-600">{{ getValidationMessage(errors?.fuel_type_id) }}</span>
        </template>
      </Select> 
      <Select
        :labelClass="errors?.milage_id ? 'text-red-500': ''"
        :selectClass="errors?.milage_id? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.milage_id" class="text-red-600">{{ getValidationMessage(errors?.milage_id) }}</span>
        </template>
      </Select> 
      <Select
        :labelClass="errors?.condition? 'text-red-500': ''"
        :selectClass="errors?.condition? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.condition" class="text-red-600">{{ getValidationMessage(errors?.condition) }}</span>
        </template>
      </Select> 
      <Input
          :labelClass="errors?.engine_power? 'text-red-500': ''"
          :inputClass="errors?.engine_power? 'border border-red-500' : ''"
          v-model="thirdStep.engine_power"
          class="md:col-span-1 col-span-2"
          title="Engine Power"
      >
          <span v-if="errors?.engine_power" class="text-red-600 text-sm">{{ getValidationMessage(errors?.engine_power) }}</span>
      </Input>
      <Select
        :labelClass="errors?.steering? 'text-red-500': ''"
        :selectClass="errors?.steering? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.steering" class="text-red-600">{{ getValidationMessage(errors?.steering) }}</span>
        </template>
      </Select> 
      <Select
        :labelClass="errors?.transmission? 'text-red-500': ''"
        :selectClass="errors?.transmission? 'border border-red-500' : ''"
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
        <template v-slot:error>
          <span v-if="errors?.transmission" class="text-red-600">{{ getValidationMessage(errors?.transmission) }}</span>
        </template>
      </Select> 
    </div>
    <div class="flex justify-between">
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
              v-if="!loading && !isEdit"
              @click="handleNext"
              class="bg-secondary-500 cursor-pointer  px-2 py-1  rounded-sm text-white"
          >
            Create Car Listing 
          </button>
          <button 
              v-if="!loading && isEdit"
              @click="handleNext"
              class="bg-secondary-500 cursor-pointer  px-2 py-1  rounded-sm text-white"
          >
            Edit Car Info 
          </button>
      </div>
    </div>
</template>

<script setup>

  import loadingImg from 'asset@/img/loading.png'
  import Select from "core@/components/Select.vue";
  import Input from "core@/components/Input.vue"
  import {ref ,watch} from 'vue'
  import DealerSellMyCarController from 'dealer@/modules/car/api/dealerSellMyCarController.ts'

  let {thirdStepValidation} = DealerSellMyCarController()

  let props = defineProps({
      thirdStepResource : {
        type : Object,
        default : {}
      },
      thirdStepEdit : {
        type : Object,
        default : {

        }
      },
      isEdit : {
        type : Boolean,
        default  : false
      }
  })

  let emit = defineEmits([
    'handleStepChange',
    'setThirdStepState',
    'handleFormSubmit'
  ])


  let handleBack = () =>{
    emit('handleStepChange','second')      
  }

  let getValidationMessage = (data) =>{
      return data[0];
  }

  let loading = ref(false)
  
  let thirdStep = ref({
      fuel_type_id:'',
      engine_power:'',
      steering:'',
      transmission:'',
      milage_id:'',
      condition:''
  })

  let errors = ref(null)
  
  let handleNext = async () =>{
    loading.value = true
    errors.value = null
    let isSuccess  = false
    console.log(thirdStep.value);
    try{
      let res =  await thirdStepValidation(thirdStep.value)
      if(res.status == 200){
        isSuccess = true
        emit('setThirdStepState',thirdStep.value)
        emit('handleFormSubmit')
        loading.value = false 
      }
    }catch(error){
      errors.value = error.response.data.errors ;
      console.log(errors.value);
    }
    if(!isSuccess){
      loading.value = false
    }
  }

  watch(() => props.thirdStepEdit, (newVal) => {
      if(Object.keys(newVal) != 0 ){
        thirdStep.value = newVal;
      }
  });

</script>
