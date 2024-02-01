<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue'
import LinkPreview from 'asset@/img/link-preview.jpg'

useSeoMeta({ 
            ogTitle :"AutoHub Myanamr" ,
            ogImage: LinkPreview,
            ogDescription: 'One Stop Car Sales' ,
        })
</script>




