<script setup>
import PageComponent from '../../components/PageComponent.vue';


</script>

<template>
  <div>
    <PageComponent title="Parent Dashboard" />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>