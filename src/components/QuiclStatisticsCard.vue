<template>
    <BaseCard :actions="actions" class="relative flex flex-col transform transition-transform hover:scale-105">
      <template #header>
        <div class="flex items-center justify-center h-16 w-16 rounded-md bg-blue-100 dark:bg-gray-800">
          <Icon :icon="icon" aria-hidden="true" class="w-8 h-8 text-blue-600" />
        </div>
      </template>
  
      <div class="flex-grow flex flex-col justify-center items-center space-y-2">
        <div class="text-3xl font-semibold">{{ result }}</div>
        <div class="text-base font-medium text-gray-500">{{ title }}</div>
      </div>
    </BaseCard>
  </template>
  
  <script setup>
  import { Icon } from "@iconify/vue";
  import BaseCard from "@/components/BaseCard.vue";
  
  const props = defineProps({
    title: String,
    result: [String, Number],
    actions: {
      type: Array,
      default: [],
    },
    icon: {
      type: String,
      default: "mdi:chart-bar",
    },
  });
  </script>
  
  <style scoped>
  .BaseCard {
    transition: transform 0.2s ease-in-out;
  }
  .BaseCard:hover {
    transform: scale(1.05);
  }
  </style>
  