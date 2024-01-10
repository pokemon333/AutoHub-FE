<!-- CustomSelect.vue -->
<template>
    <div class="relative mb-6">
      <label
        for="type"
        class="absolute -top-2 left-3 px-2 bg-white text-xs"
        :class="labelClass"
      >
        {{ title }}
      </label>
      <select
        v-model="selectedOption"
        @change="onChange"
        class="w-full h-12 rounded-md px-3 border border-gray-400"
        :class="selectClass"
      >
        <slot name="option"></slot>
      </select>
      <slot name="error"></slot>
    </div>
  </template>
  
  <script setup>
  
  import { defineProps, defineEmits ,ref } from 'vue';
  
  const props = defineProps({
    labelClass: String,
    selectClass: String,
    title: String,
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const selectedOption = ref(props.modelValue);
  
  function onChange() {
    emit('update:modelValue', selectedOption.value);
  }
  </script>
  