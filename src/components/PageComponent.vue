<script setup>
import store from "../store";

console.log(store.getters['userRole'])

const props = defineProps({
  title: String,
});
</script>

<template>
  <div>
    <h3>{{ store.getters['userRole'] }}</h3>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>

<style></style>
