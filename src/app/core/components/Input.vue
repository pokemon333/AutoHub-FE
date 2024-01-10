<template>
    <div class="relative mb-6">
      <label
        for="type"
        class="absolute -top-2 left-3 px-2 bg-white text-xs"
        :class="labelClass"
      >
        {{ title }}
      </label>
      <input
        :value="modelValue"
        @input="onInput"
        :type="type"
        class="w-full h-12 rounded-md px-3 border border-gray-400"
        :placeholder="placeholder"
        :class="inputClass"
      />
      <slot></slot>
    </div>
  </template>
  
  <script setup>

  import { defineProps } from 'vue';
  
  const props = defineProps({
    type:{
      type:String,
      default:'text'
    },
    labelClass : String,
    inputClass  : String,
    title : String,
    placeholder : String,
    modelValue : {
        type: String,
        default:''
    },
  });
  const emit = defineEmits(['update:modelValue'])

    function onInput(event) {
    emit('update:modelValue', event.target.value)
    }
  </script>
  