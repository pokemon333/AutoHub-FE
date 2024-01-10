<template>
  <div class="max-w-[800px] shadow-lg p-8 rounded" style="background-color:#FCF9F9;border:0.5px solid #fcd7d7">

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
          :class="step == 2 || step == 3 ? 'border-secondary-500' : 'border-secondary-50/75'"
      ></div>

      <div class="flex items-center space-x-2 cursor-pointer">
        <div
          class="border-2  w-4 h-4 bg-white rounded-full"
          :class="step == 2 || step == 3 ? 'border-secondary-500' : 'border-secondary-50/75'"
        ></div>
        <h1 class="text-3xl">02</h1>
        <div>
          <h1 class="text-xs">License</h1>
          <h1 class="text-xs">Information</h1>
        </div>
      </div>
      <!-- divider  -->
      <div 
      class="border-2 h-0 w-32 rounded-full md:block hidden "
      :class="step == 3 ? 'border-secondary-500' : 'border-secondary-50/75'"
      ></div>

      <div class="flex items-center space-x-2 cursor-pointer">
        <div
          class="border-2 border-red-500 w-4 h-4 bg-white rounded-full"
          :class="step == 3? 'border-secodary-500' : 'border-secondary-50/75'"
          
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
    <div >
        <div v-if="step == 1" >
            <slot name="first"></slot>
        </div> 
        <div v-if="step == 2" >
            <slot name="second"></slot>
        </div> 
        <div v-if="step == 3"  >
            <slot name="third"></slot>
        </div> 
    </div>

    <!-- footer -->
    <div 
     class="flex mt-4 mx-8"
     :class="step== 1 ? 'justify-end': 'justify-between'"
    >
        <button 
            v-if="step != 1" 
            @click="handleBack"
            class="bg-gray-500/75 cursor-pointer  px-2 py-1  w-20 rounded-sm text-white"
        >
            Back
        </button>
        <button  
            v-if="step != 3"
            @click="handleNext"
            class="px-2 py-1  bg-red-500 w-20  cursor-pointer rounded-sm text-white"
        >
            Next
        </button>
        <button  
            v-if="step == 3"
            @click="handleSubmit"
            class="bg-red-500 px-2 py-1  cursor-pointer rounded-sm text-white"
        >
            Create Car Listing
        </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"

let header =  {
    "1" : {
        title: "Car Information",
        sub_title:"Enter Your Car Details"
    },
    "2" : {
        title: "License  Information",
        sub_title:"Enter Your License Details"
    },
    "3" : {
        title: "Car Specifications",
        sub_title:"Enter Your Car Specifications Details"
    },
}
     
 
let step = ref(1) 

let handleNext = () =>{
    step.value = step.value + 1
}

let handleBack= () =>{
    step.value = step.value - 1
}

let handleSubmit= () =>{
    
}
</script>