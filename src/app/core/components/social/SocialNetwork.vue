<template>
  <button class="w-[80px] flex flex-col justify-center items-center" @click="handleShare">
    <!-- For icon -->
    <img :src="icon" class="w-10 h-10" />
    <h1 class=" text-sm">{{ text }}</h1>
  </button>
</template>

<script setup>

import { ref, watch, onMounted } from "vue";
import facebookIcon from "asset@/icon/facebook.png";
import gmailIcon from "asset@/icon/gmail.png";
import telegramIcon from "asset@/icon/telegram.png";
import messengerIcon from "asset@/icon/messenger.png";
import viberIcon from "asset@/icon/viber.png";
import twitterIcon from "asset@/icon/twitter.png";
import linkedinIcon from "asset@/icon/linkedin.png";


let url = ref("");
let icon = ref("");

let urlCollection = {
  gmail: {
    url: "mailto:?body=@u",
    icon: gmailIcon,
  },
  facebook: {
    url: "https://www.facebook.com/sharer/sharer.php?u=@u",
    icon : facebookIcon
  },
  linkedin: {
    url: "https://www.linkedin.com/sharing/share-offsite/?url=@u",
    icon: linkedinIcon
  },
  telegram: {
    url: "https://t.me/share/url?url=@u",
    icon: telegramIcon
  },
  twitter: {
    url: "https://twitter.com/intent/tweet?url=@u",
    icon:twitterIcon
  },
  viber: {
    url: "viber://forward?text=@u",
    icon:  viberIcon
  },
};

let props = defineProps({
  network: {
    type: String,
    default: "",
  },
  text : {
    type : String,
    default : ""
  },
  url: {
    type: String,
    default: "",
  },
});


function handleShare() {
  window.open(url.value, "_blank");
}

onMounted(() => {
  url.value = urlCollection[props.network].url.replace('@u', props.url);
  icon.value = urlCollection[props.network].icon
});
</script>
