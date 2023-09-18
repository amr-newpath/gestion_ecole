<script setup>
import PageWrapper from "@/components/PageWrapper.vue";

import Button from "@/components/Button.vue";
import PlanningsVue from "./Plannings.vue";
import ListSeancesVue from "./GSSeances/ListSeances.vue";
import MatieresVue from "./Matieres.vue";
import AbsencesVue from "./Absences.vue";

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

    <div class="flex space-x-4">
      <ListSeancesVue />
      <PlanningsVue />
    </div>
    <div class="-mt-10">
      <MatieresVue />
    </div>
    <div class="-mt-24">
      <AbsencesVue />
    </div>
  </PageWrapper>
</template>
