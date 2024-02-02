<template>
    <div
        class="max-h-full max-w-sm flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-lg"
    >
        <div class="flex justify-between">
        <h1 class="text-lg">Share</h1>
        <div 
            @click="handleClose"
        >
            <img 
                class="w-4 h-4"
                :src="cancel" 
                alt="cancel button"
            >
        </div>
        </div>
    
        <div class="overflow-auto">
            <div class="space-x-2  flex">
                <SocialNetwork 
                    v-for="(network,index) in networks" 
                    :key="index"
                    class="flex-shrink-0" 
                    :url="url"
                    :network="network.network" 
                    :text="network.text" 
                />
            </div>
        </div>

        <div class="flex  justify-between">
            <input type="text" id="shareLink" 
                disabled 
                :value="url" 
                class="h-10 border w-52 border-primary-50 rounded-md shadow-md p-2" 
            />
            <button  @click="copyText" class="bg-secondary-500 w-32 p-2 rounded-md text-white">
                {{ btnText }}
            </button>
        </div>
    </div>
</template>

<script setup>
import SocialNetwork from "core@/components/social/SocialNetwork.vue";
import cancel from 'asset@/icon/cancel.png'
import {ref} from 'vue'

defineProps({
    url: {
        type: String,
        default : ""
    }
})

let emit = defineEmits([
    'close'
])

let btnText  = ref("Copy Link")
let networks = ref([
    {
        network : "facebook",
        text    : "Facebook"
    },
    {
        network : "viber",
        text    : "Viber"
    },
    {
        network : "gmail",
        text    : "Gmail"
    },
    {
        network : "linkedin",
        text    : "LinkedIn"
    },
    {
        network : "twitter",
        text :"Twitter"
    }
])

let handleClose = () => {
    emit('close')
}

let copyText = () =>{
    // Get the text field
   let copyText = document.getElementById("shareLink");

   // Select the text field
   copyText.select();
   copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
   navigator.clipboard.writeText(copyText.value);

   btnText.value = "Copied!"

   setTimeout(() => {
      btnText.value = "Copy Link"
   }, 2000);
}
</script>