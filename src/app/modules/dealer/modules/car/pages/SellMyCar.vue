<template>
  <!-- Pop Up -->
  <div
    class="fixed flex justify-center items-center w-full h-[90vh] bg-gray-800/50 z-10"
    v-if="popup"
  >
    <div
      class="p-10 flex flex-col justify-center items-center space-y-8 bg-white rounded-md"
    >
      <img :src="logoImageUrl" class="w-40" />
      <div class="flex flex-col justify-center items-center">
        <img
          :src="success"
          class="w-20 h-20"
          loop
          onload="this.removeAttribute('loop')"
        />
        <h1
          class="text-4xl text-green-500 drop-shadow-md drop-shadow-secondary-500"
        >
          Success!
        </h1>
        <h1 class="text-xs mt-3">Thank You For Dealing Car Creation</h1>
      </div>
      <button
        @click="goToLists"
        class="py-2 px-4 rounded-md bg-red-500 text-white"
      >
        Car Lists
      </button>
    </div>
  </div>

  <div class="md:px-20 px-2 min-h-[100vh] w-full">
    <!-- Header section         -->
    <div class="pt-4 md:flex pb-6">
      <div class="md:w-1/2">
        <div class="flex items-center space-x-4">
          <back
            class="w-8 h-8 cursor-pointer"
            fill="black"
            @click="goToLists"
          />
          <h1 class="text-3xl">Sell My Car</h1>
        </div>
        <h1 class="mt-4 ps-12 font-bold text-[13px]">
          Create your car listing by filling out the following form
        </h1>
      </div>
      <div
        class="md:w-1/2 flex md:items-start md:px-0 px-12 items-center md:justify-end space-x-4 md:m-0 md:p-0 pt-4"
      >
        <h1 class="text-sm">Dealer name -</h1>
        <h1 class="font-bold">{{ getUserName() }}</h1>
      </div>
    </div>

    <!-- Form section -->
    <div class="">
      <Stepper class="mt-6 border-b-2 pb-4" @handlePopUp="handlePopUp">
        <template
          v-slot:first="{
            handleStepChange,
            setFirstStepState,
            handleFormSubmit,
          }"
        >
          <FirstStep
            @handleFormSubmit="handleFormSubmit"
            @handleStepChange="handleStepChange"
            @setFirstStepState="setFirstStepState"
            :firstStepResource="resources?.firstStep"
          />
        </template>
        <template
          v-slot:second="{
            handleStepChange,
            setSecondStepState,
            handleFormSubmit,
          }"
        >
          <SecondStep
            @handleFormSubmit="handleFormSubmit"
            @handleStepChange="handleStepChange"
            @setSecondStepState="setSecondStepState"
            :secondStepResource="resources?.secondStep"
          />
        </template>
        <template
          v-slot:third="{
            handleStepChange,
            setThirdStepState,
            handleFormSubmit,
          }"
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
import {
  back,
  success,
  logoImageUrl,
} from "dealer@/modules/car/services/getSellMyCarSvg";
import Stepper from "dealer@/modules/car/components/Stepper.vue";
import FirstStep from "dealer@/modules/car/components/FirstStep.vue";
import SecondStep from "dealer@/modules/car/components/SecondStep.vue";
import ThirdStep from "dealer@/modules/car/components/ThirdStep.vue";
import DealerSellMyCarController from "dealer@/modules/car/api/dealerSellMyCarController.ts";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/app/core/store/UserStore";

const userStore = useUserStore();
let router = useRouter();
let resources = ref();
let { getResource } = DealerSellMyCarController();
let getPreRequirementData = async () => {
  let res = await getResource();
  resources.value = res.data.data;
};

let popup = ref(false);

let handlePopUp = (condition) => {
  popup.value = condition;
};

let getUserName = () => {
  return userStore.getUser.name;
};

let goToLists = () => {
  router.push({ name: "car-for-sale" });
};

onMounted(() => {
  getPreRequirementData();
});
</script>
