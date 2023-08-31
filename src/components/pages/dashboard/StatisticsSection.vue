<script setup>
import { ref, onMounted } from "vue";
import axiosClient from "../../../axios";
import QuiclStatisticsCard from '@/components/QuiclStatisticsCard.vue';

const elevesWhoPaid = ref(0);
const elevesCompletedPayment = ref(0);
const elevesNotCompletedPayment = ref(0);
const numberOfPayments = ref(0);

onMounted(async () => {
  const data = await fetchData();

  elevesWhoPaid.value = data.todaysPaymentsCount;
  elevesCompletedPayment.value = data.todaysCompletedPaymentsCount;
  // Calculate the number of eleves who completed service
//   const completedServiceCount = data.todaysPayments.reduce((count, payment) => {
//     return payment.type === 'service' ? count + 1 : count;
//   }, 0);
  elevesNotCompletedPayment.value = data.todaysNotCompletedPaymentsCount;

  // Calculate the total number of payments
  numberOfPayments.value = data.todaysPayments.length;
});

async function fetchData() {
  try {
    const response = await axiosClient.get("/comptable/paiements");
    const paiementsData = response.data;

    // Get the current month's payments
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const todaysPayments = paiementsData.filter((payment) => {
      const paymentDate = new Date(payment.created_at);
      return (
        paymentDate.getMonth() + 1 === currentMonth &&
        paymentDate.getFullYear() === currentYear
      );
    });

    const todaysPaymentsCount = todaysPayments.length;
    const todaysCompletedPaymentsCount = todaysPayments.filter(
      (payment) => payment.status === "Completed"
    ).length;


    const todaysNotCompletedPaymentsCount = todaysPayments.filter(
      (payment) => payment.status === "Not completed"
    ).length;

    return {
      todaysPaymentsCount,
      todaysCompletedPaymentsCount,
      todaysNotCompletedPaymentsCount,
      todaysPayments: todaysPayments,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      todaysPaymentsCount: 0,
      todaysCompletedPaymentsCount: 0,
      todaysNotCompletedPaymentsCount: 0,
      todaysPayments: [],
    };
  }
}
</script>

<template>
  <section class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
    <h2 class="sr-only">Quick statistics</h2>

    <!-- Eleves who paid card -->
    <QuiclStatisticsCard
      title="Eleves who paid"
      :result="elevesWhoPaid"
      icon="mdi:account-group-outline"
    />

    <!-- Eleves who completed payment card -->
    <QuiclStatisticsCard
      title="Eleves who completed payment"
      :result="elevesCompletedPayment"
      icon="mdi:eye-outline"
    />

    <QuiclStatisticsCard
      title="Eleves who not completed payments"
      :result="elevesNotCompletedPayment"
      icon="mdi:cart-outline"
    />

    <!-- Number of payments card -->
    <QuiclStatisticsCard
      title="Number of payments"
      :result="numberOfPayments"
      icon="mdi:chart-pie"
    />
  </section>
</template>
