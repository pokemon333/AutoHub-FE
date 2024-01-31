<template>
  <button class="w-6 h-6" @click="handleShare">
    <!-- For icon -->
    <img :src="icon" class="w-full h-full" />
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
    url: "mailto:?subject=@t&body=@u%0D%0A@d",
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
    url: "https://t.me/share/url?url=@u&text=@t%0D%0A@d",
    icon: telegramIcon
  },
  twitter: {
    url: "https://twitter.com/intent/tweet?text=@t&url=@u&hashtags=@h@tu",
    icon:twitterIcon
  },
  viber: {
    url: "viber://forward?text=@t%0D%0A@u%0D%0A@d",
    icon:  viberIcon
  },
};

let props = defineProps({
  network: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
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
