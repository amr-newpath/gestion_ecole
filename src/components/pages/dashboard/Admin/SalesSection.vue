<template>
  <section class="grid grid-cols-1">
    <h2 class="sr-only">Payment Section</h2>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
        <div class="grid grid-cols-2 gap-6">
          <!-- Today's Payments -->
          <BaseCard no-header style="background-color: #f8ce03;">
            <div class="p-2 grid grid-cols-1 gap-4">
              <Icon
                icon="mdi:account-plus-outline"
                aria-hidden="true"
                class="w-10 h-10 text-white"
              />

              <div class="grid gap-2">
                <p class="text-base font-medium text-green-700">+1%</p>
                <p class="text-3xl font-medium text-white">{{ todaysPaymentsCount }}</p>
              </div>

              <p class="text-sm font-medium text-white">Today's Payments</p>
            </div>
          </BaseCard>

          <!-- Today's Completed Payments -->
          <BaseCard no-header style="background-color: #0096cb;">
            <div class="p-2 grid grid-cols-1 gap-4">
              <Icon
                icon="mdi:chart-bar"
                aria-hidden="true"
                class="w-10 h-10 text-white"
              />

              <div class="grid gap-2">
                <p class="text-base font-medium text-green-300">+4%</p>
                <p class="text-3xl font-medium text-white">{{ todaysCompletedPaymentsCount }}</p>
              </div>

              <p class="text-sm font-medium text-white">Today's Completed Payments</p>
            </div>
          </BaseCard>
        </div>

        <!-- Earning card -->
        <BaseCard noHeader class="grid grid-cols-2">
          <div class="grid grid-cols-1 gap-4">
            <h4 class="text-2xl font-medium">Earning</h4>
            <p class="text-lg font-medium text-gray-500">This Month</p>
            <p class="text-base font-medium text-green-400">+{{ earningPercentage }}%</p>
            <p class="text-2xl font-medium text-gray-600">${{ earningAmount }}</p>
          </div>

          <!-- Donut chart -->
          <div class="w-full h-full flex items-center justify-center">
            <div ref="earningChartEl"></div>
          </div>
        </BaseCard>
      </div>

      <!-- Bar chart -->
      <BaseCard title="Payments completed" :actions="[{ title: 'View', to: '#' }]">
        <div ref="salesChartEl"></div>
      </BaseCard>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ApexCharts from "apexcharts";
import BaseCard from "@/components/BaseCard.vue";
import { Icon } from "@iconify/vue";
import axiosClient from "../../../axios"; // Import the axios library

const earningChartEl = ref(null);
const salesChartEl = ref(null);

// Fetch data from the API endpoints
async function fetchData() {
  try {
    const response = await axiosClient.get("/comptable/paiements"); // Replace with your API endpoint
    const paiementsData = response.created_at; // Assuming paiements endpoint returns an array of objects

    // Process the data to calculate statistics
    const todaysPayments = paiementsData.filter(payment => {
      // Replace this with your date filtering logic
      return payment.date === new Date().toISOString().split("T")[0];
    });

    const todaysPaymentsCount = todaysPayments.length;

    // ... similar processing for other data ...

    // Donut chart for Earning
    let earningChart = new ApexCharts(earningChartEl.value, {
      // ... chart options ...
    });
    earningChart.render();

    // Bar chart for Payments completed
    let salesChart = new ApexCharts(salesChartEl.value, {
      // ... chart options ...
    });
    salesChart.render();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

onMounted(() => {
  fetchData();
});
</script>
