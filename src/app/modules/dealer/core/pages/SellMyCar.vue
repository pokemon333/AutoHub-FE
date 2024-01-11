<template>
  <div class="md:px-20 px-2 h-[100vh] w-full">
    <!-- Header section         -->
    <div class="pt-4 md:flex pb-6">
      <div class="md:w-1/2">
        <div class="flex items-center space-x-4">
          <back class="w-8 h-8" fill="black" />
          <h1 class="text-3xl">Sell My Car</h1>
        </div>
        <h1 class="mt-4 ps-12 font-bold text-[13px]">
          Create your car listing by filling out the following form
        </h1>
      </div>
      <div
        class="md:w-1/2 flex md:items-start items-center md:justify-end space-x-4 md:m-0 md:p-0 pt-4"
      >
        <h1 class="text-sm">Dealer name -</h1>
        <h1 class="font-bold">Mg Mg</h1>
      </div>
    </div>

    <!-- Form section -->
    <div class="">
      <Stepper class="mt-6 border-b-2 pb-4">
        <template 
            v-slot:first="{handleStepChange,setFirstStepState}
        ">
          <FirstStep 
            @handleStepChange="handleStepChange"
            @setFirstStepState="setFirstStepState"
            :firstStepResource="resources?.firstStep"
          />
        </template>
        <template 
           v-slot:second="{handleStepChange,setSecondStepState}"
        >
          <SecondStep 
            @handleStepChange="handleStepChange"
            @setSecondStepState="setSecondStepState"
            :secondStepResource="resources?.secondStep"
          />
        </template>
        <template 
            v-slot:third="{handleStepChange , setThirdStepState ,handleFormSubmit}"
        >
          <ThirdStep 
            @handleFormSubmit="handleFormSubmit"
            @handleStepChange="handleStepChange"
            @setThirdStepState="setThirdStepState"
            :thirdStepResource="resources?.thirdStep"
          />
        </template>
      </Stepper>
    </div>
  </div>
</template>

<script setup>

    import { back } from "dealer@/core/services/getSellMyCarSvg";
    import Stepper from "dealer@/core/components/Stepper.vue";
    import FirstStep from "dealer@/core/components/car/FirstStep.vue";
    import SecondStep from "dealer@/core/components/car/SecondStep.vue";
    import ThirdStep from "dealer@/core/components/car/ThirdStep.vue";
    import DealerSellMyCarController from "dealer@/core/api/dealerSellMyCarController.ts"
    import {ref , onMounted}  from "vue" 


    let resources = ref()
    let { getResource }= DealerSellMyCarController()
  
    let getPreRequirementData =  async  () =>{
        let res = await  getResource()
        resources.value = res.data.data
    }


    onMounted(() => {
      getPreRequirementData()
    })

</script>
