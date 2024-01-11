<template>
  <div
    class="max-w-[800px] shadow-lg p-8 rounded"
    style="background-color: #fcf9f9; border: 0.5px solid #fcd7d7"
  >
    <!-- Stepper header -->
    <div class="md:flex items-center md:space-x-4 md:space-y-0 space-y-4">
      <div class="flex items-center space-x-2 cursor-pointer">
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

      <div class="flex items-center space-x-2 cursor-pointer">
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

      <div class="flex items-center space-x-2 cursor-pointer">
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
      import DealerSellMyCarController from 'dealer@/core/api/dealerSellMyCarController.ts'

      let {formSubmit} = DealerSellMyCarController()

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

      let firstStep = ref({});
      let secondStep = ref({});
      let thirdStep = ref({});

      let setFirstStepState = (data) => (firstStep.value = data);
      let setSecondStepState = (data) => (secondStep.value = data);
      let setThirdStepState = (data) => (thirdStep.value = data);

      let handleFormSubmit =  async () => {
        console.log('form submittied');
        let data = { ...firstStep.value, ...secondStep.value, ...thirdStep.value };
        console.log(data);
        try{
          let res = await  formSubmit(data)
          console.log(res);
        }catch(error){
          console.log(error);
        }
      };
      let step = ref("first");

      let handleStepChange = (stepValue) => {
        step.value = stepValue;
      };
</script>
