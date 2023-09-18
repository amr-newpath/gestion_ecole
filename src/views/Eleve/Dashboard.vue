<script setup>
import PageWrapper from "@/components/PageWrapper.vue";

import Button from "@/components/Button.vue";
import PlanningVue from "./Planning.vue";
import SeancesVue from "./Seances.vue";
import ProfsVue from "./Profs.vue";

// import { useStore } from 'vuex'

// const store = useStore()

// console.log(store.);
</script>

<template>
  <PageWrapper>
    <template #header>
      <div
        class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <h2 class="text-xl font-semibold leading-tight">Dashboard</h2>
      </div>
    </template>

    <!-- <StatisticsSection /> -->

    <div class="flex space-x-4">
      <SeancesVue />
      <PlanningVue />
    </div>

    <div class="-mt-10">
      <ProfsVue />
    </div>
  </PageWrapper>
</template>
