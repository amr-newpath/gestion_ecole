<template>
  <section class="grid grid-cols-1">
    <h2 class="sr-only">Payment Section</h2>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
        <div class="grid grid-cols-2 gap-6">
          <!-- Today's Payments -->
          <BaseCard no-header style="background-color: #f8ce03">
            <div class="p-2 grid grid-cols-1 gap-4">
              <!-- <Icon
                icon="mdi:account-plus-outline"
                aria-hidden="true"
                class="w-10 h-10 text-white"
              /> -->

              <Icon
                icon="ic:outline-payment"
                aria-hidden="true"
                class="w-10 h-10 text-white"
              />

              <div class="grid gap-2">
                <p
                  v-if="todaysPaymentsCount !== null"
                  class="text-3xl font-medium text-white"
                >
                  {{ todaysPaymentsCount }}
                </p>
                <p v-else>Loading...</p>
              </div>

              <p class="text-lg font-medium text-white">Today's Payments</p>
            </div>
          </BaseCard>

          <!-- Today's Completed Payments -->
          <BaseCard no-header style="background-color: #0096cb">
            <div class="p-2 grid grid-cols-1 gap-4">
              <Icon
                icon="mdi:chart-bar"
                aria-hidden="true"
                class="w-10 h-10 text-white"
              />

              <div class="grid gap-2">
                <p
                  v-if="todaysCompletedPaymentsCount !== null"
                  class="text-3xl font-medium text-white"
                >
                  {{ todaysCompletedPaymentsCount }}
                </p>
                <p v-else>Loading...</p>
              </div>

              <p class="text-lg font-medium text-white">
                Today's Completed Payments
              </p>
            </div>
          </BaseCard>
        </div>

        <!-- Earning card -->
        <BaseCard noHeader class="grid grid-cols-2">
          <div class="grid grid-cols-1 gap-4">
            <h4 class="text-2xl font-medium">Earning</h4>
            <p class="text-lg font-medium text-gray-500">This Month</p>
            <p class="text-2xl font-medium text-center text-green-400">
              + {{ earningAmount.toFixed(2) }} DHs
            </p>
            <p class="text-2xl font-medium text-gray-600">
              <!-- Fix to display as currency -->
            </p>
          </div>

          <!-- Donut chart -->
          <div class="w-full h-fullflex items-center justify-center">
            <div ref="earningChartEl"></div>
          </div>
        </BaseCard>
      </div>

      <!-- Bar chart -->
      <BaseCard title="Payments Per Day">
        <div ref="paymentsChartEl" style="height: 400px"></div>
      </BaseCard>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import ApexCharts from "apexcharts";
import BaseCard from "@/components/BaseCard.vue";
import { Icon } from "@iconify/vue";
import axiosClient from "../../../axios";

export default {
  components: {
    BaseCard,
    Icon,
  },
  data() {
    return {
      paiementsData: [],
      earningChartEl: null,
      paymentsChartEl: null,
      todaysPaymentsCount: ref(0),
      todaysCompletedPaymentsCount: ref(0),
      earningAmount: ref(0),
    };
  },
  async mounted() {
    const data = await this.fetchData();

    this.todaysPaymentsCount = ref(data.todaysPaymentsCount);
    this.todaysCompletedPaymentsCount = ref(data.todaysCompletedPaymentsCount);

    // Calculate the sum of prices for this month
    const prices = data.todaysPayments.map((payment) => payment.montant);
    const totalEarning = prices.reduce((total, price) => total + price, 0);
    this.earningAmount = ref(totalEarning);

    // Initialize and render charts
    this.initializeCharts();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axiosClient.get("/paiements");
        this.paiementsData = response.data;

        // Get the current month's payments
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const todaysPayments = this.paiementsData.filter((payment) => {
          const paymentDate = new Date(payment.created_at);
          return (
            paymentDate.getMonth() + 1 === currentMonth &&
            paymentDate.getFullYear() === currentYear
          );
        });

        const todaysPaymentsCount = todaysPayments.length;
        const todaysCompletedPaymentsCount = todaysPayments.filter(
          (payment) => {
            return payment.status === "Completed";
          },
        ).length;

        return {
          todaysPaymentsCount,
          todaysCompletedPaymentsCount,
          todaysPayments: todaysPayments,
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        return {
          todaysPaymentsCount: 0,
          todaysCompletedPaymentsCount: 0,
          todaysPayments: [],
        };
      }
    },
    async initializeCharts() {
      try {
        // const response = await axiosClient.get("/paiements");
        // const paiementsData = response.data;

        const paymentsPerDay = {};
        this.paiementsData.forEach((payment) => {
          const paymentDate = new Date(payment.created_at).toLocaleDateString();
          if (!paymentsPerDay[paymentDate]) {
            paymentsPerDay[paymentDate] = 1;
          } else {
            paymentsPerDay[paymentDate]++;
          }
        });

        const chartData = Object.entries(paymentsPerDay).map(
          ([date, count]) => ({
            x: new Date(date).getTime(),
            y: count,
          }),
        );

        const paymentsChart = new ApexCharts(this.$refs.paymentsChartEl, {
          chart: {
            type: "bar",
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            type: "datetime",
            categories: chartData.map((data) => data.x),
            labels: {
              format: "dd/MM",
            },
          },
          yaxis: {
            title: {
              text: "Number of Payments",
            },
          },
          series: [
            {
              name: "Payments",
              data: chartData.map((data) => data.y),
            },
          ],
        });
        paymentsChart.render();
      } catch (error) {
        console.error("Error fetching data for bar chart:", error);
      }
    },
  },
  onMounted() {
    this.fetchData();
    this.initializeCharts();
  },
};
</script>
