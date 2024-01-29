<template>
  <div
    class="max-w-[800px] shadow-lg p-8 rounded"
    style="background-color: #fcf9f9; border: 0.5px solid #fcd7d7"
  >
    <!-- Stepper header -->
    <div class="flex md:items-center items-start md:space-x-4 md:space-y-0 space-y-4 justify-between">

      <div 
        class="flex items-center space-x-2 cursor-pointer"
        :class="step =='first' ? '' : 'md:flex hidden'"
      >
        <div
          class="border-2 border-red-500 w-4 h-4 bg-white rounded-full"
        ></div>
        <h1 class="text-3xl">01</h1>
        <div>
          <h1 class="text-xs">Car</h1>
          <h1 class="text-xs">Information</h1>
        </div>
      </div>

      <!-- divider  -->
      <div
        class="border-2 h-0 w-32 rounded-full md:block hidden"
        :class="
          step == 'second' || step == 'third'
            ? 'border-secondary-500'
            : 'border-secondary-50/75'
        "
      ></div>

      <div 
          class="flex items-center space-x-2 cursor-pointer"
          :class="step =='second' ? '' : 'md:flex hidden'"
      >
        <div
          class="border-2 w-4 h-4 bg-white rounded-full"
          :class="
            step == 'second' || step == 'third'
              ? 'border-secondary-500'
              : 'border-secondary-50/75'
          "
        ></div>
        <h1 class="text-3xl">02</h1>
        <div>
          <h1 class="text-xs">License</h1>
          <h1 class="text-xs">Information</h1>
        </div>
      </div>
      <!-- divider  -->
      <div
        class="border-2 h-0 w-32 rounded-full md:block hidden"
        :class="
          step == 'third' ? 'border-secondary-500' : 'border-secondary-50/75'
        "
      ></div>

      <div 
          class="flex items-center space-x-2 cursor-pointer"
          :class="step =='third' ? '' : 'md:flex hidden'"
      >
        <div
          class="border-2 border-red-500 w-4 h-4 bg-white rounded-full"
          :class="
            step == 'third' ? 'border-secodary-500' : 'border-secondary-50/75'
          "
        ></div>
        <h1 class="text-3xl">03</h1>
        <div>
          <h1 class="text-xs">Car</h1>
          <h1 class="text-xs">Specifications</h1>
        </div>
      </div>

      

    </div>

    <!-- header -->
    <div class="space-y-2 mb-7 mt-8">
      <h1 class="text-2xl">{{ header[step].title }}</h1>
      <h1 class="text-xs">{{ header[step].sub_title }}</h1>
    </div>

    <!-- Content Section -->
    <div>
      <div v-show="step == 'first'">
        <slot
          name="first"
          :setFirstStepState="setFirstStepState"
          :handleStepChange="handleStepChange"
        ></slot>
      </div>
      <div v-show="step == 'second'">
        <slot
          name="second"
          :setSecondStepState="setSecondStepState"
          :handleStepChange="handleStepChange"
        ></slot>
      </div>
      <div v-show="step == 'third'">
        <slot
          name="third"
          :handleFormSubmit="handleFormSubmit"
          :setThirdStepState="setThirdStepState"
          :handleStepChange="handleStepChange"
        ></slot>
      </div>
    </div>

    <slot name="footer"></slot>
  </div>
</template>

<script setup>

      import { ref, onMounted } from "vue";
      import DealerSellMyCarController from 'dealer@/modules/car/api/dealerSellMyCarController.ts'

      let {formSubmit,formEditSubmit} = DealerSellMyCarController()

      let header = {
        first: {
          title: "Car Information",
          sub_title: "Enter Your Car Details",
        },
        second: {
          title: "License  Information",
          sub_title: "Enter Your License Details",
        },
        third: {
          title: "Car Specifications",
          sub_title: "Enter Your Car Specifications Details",
        },
      };

      let props = defineProps({
        isEdit : {
          type : Boolean,
          default : false
        },
        ids : {
          type : Object,
          default : {}
        }
      })

      let firstStep = ref({});
      let secondStep = ref({});
      let thirdStep = ref({});

      let setFirstStepState = (data) => (firstStep.value = data);
      let setSecondStepState = (data) => (secondStep.value = data);
      let setThirdStepState = (data) => (thirdStep.value = data);
      
      let emit = defineEmits([
        'handlePopUp'
      ])
      

      let handleFormSubmit =  async () => {
        let data = { ...firstStep.value, ...secondStep.value, ...thirdStep.value};
        if(props.isEdit){
          try{
            let res = await  formEditSubmit(props.ids.car_id,{...data,ids: props.ids })
            if (res.status) {
              emit('handlePopUp',true)
            }
          }catch(error){
            console.log(error);
          }
        }else{
          try{
            let res = await  formSubmit(data)
            if (res.status) {
              emit('handlePopUp',true)
            }
          }catch(error){
            console.log(error);
          }
        }
       
      };

      let step = ref("first");

      let handleStepChange = (stepValue) => {
        step.value = stepValue;
      };
</script>
